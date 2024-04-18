import pandas as pd
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler, RobustScaler, MinMaxScaler
from sklearn.ensemble import IsolationForest
from sklearn.preprocessing import LabelEncoder
import re

# ------------------------------------------------------------------------
# Start of Functions for Preprocessing and Report Generation
# ------------------------------------------------------------------------

def perform_eda(df):
    """
    ------------------------------------------------------------------------
    Function to perform Exploratory Data Analysis (EDA) on a pandas DataFrame.

    Parameters:
        df (pandas DataFrame): The input DataFrame for EDA.

    Returns:
        dict: A dictionary containing the results of the EDA.

    Explanation:
    1. Check for missing values:
        - Check if there are any missing values in the DataFrame.

    2. Find all columns in the dataset:
        - Retrieve the names of all columns in the DataFrame.

    3. Bifurcate numerical and categorical columns:
        - Iterate through each column and categorize them as numerical or categorical based on their data type.

    4. Perform EDA on categorical columns:
        - Count the number of unique values for each categorical column.

    5. Perform EDA on numerical columns:
        - Determine the appropriate scaling technique for each numerical column based on its range and distribution.

    Returns a dictionary containing:
        - 'missing_values': Boolean indicating if there are missing values.
        - 'columns': List of all column names.
        - 'numerical_columns': List of numerical column names.
        - 'categorical_columns': List of categorical column names.
        - 'number_of_unique_values': Dictionary with categorical column names as keys and their respective number of unique values as values.
        - 'scaling_techniques': Dictionary with numerical column names as keys and their respective scaling techniques as values.

------------------------------------------------------------------------
"""

    eda_results = {}

    #cheking for missing values
    eda_results['missing_values'] = df.isnull().sum().any()

    #Finding all columns in the dataset
    columns = df.columns
    eda_results['columns'] = columns.tolist()

    #bifurcating numerical and categorical columns
    numerical_columns = []
    categorical_columns = []
    for column in columns:
        if df[column].dtype=='object':
              categorical_columns.append(column)
        else:
              numerical_columns.append(column)

    eda_results['numerical_columns'] = numerical_columns
    eda_results['categorical_columns'] = categorical_columns

    #eda on categorical columns
    number_of_unique_values = {}
    for column in categorical_columns:
        number_of_uniques = df[column].nunique()
        number_of_unique_values[column] = number_of_uniques
    eda_results['number_of_unique_values'] = number_of_unique_values

    #eda on numerical columns
    feature_scaler = {}
    for column in numerical_columns:
        min_val = df[column].min()
        max_val = df[column].max()
        range_val = max_val - min_val
        if range_val > 2000:
            feature_scaler[column] = StandardScaler()
        elif min_val >=0:
            feature_scaler[column] = MinMaxScaler()
        else:
            feature_scaler[column] = RobustScaler()

    eda_results['scaling_techniques'] = feature_scaler

    # correlation_matrix = df[numerical_cols].corr().abs()
    # upper_tri = correlation_matrix.where(np.triu(np.ones(correlation_matrix.shape), k=1).astype(bool))
    # high_correlation = upper_tri.stack().nlargest(5)  # Consider top 5 highest correlations
    # eda_results['high_correlation'] = high_correlation
    return eda_results

def prepreocess(df, eda_results):
    """
    ------------------------------------------------------------------------
    Function to preprocess a pandas DataFrame based on the results of Exploratory Data Analysis (EDA).

    Parameters:
        df (pandas DataFrame): The input DataFrame to be preprocessed.
        eda_results (dict): The dictionary containing the results of EDA.

    Returns:
        pandas DataFrame: The preprocessed DataFrame.

    Explanation:
    1. Handling missing values:
        - If missing values are detected in the DataFrame:
            - Impute missing values for numerical columns using the mean if the number of unique values is greater than 10.
            - Impute missing values for other columns using the mode.

    2. Feature Scaling:
        - Apply the appropriate scaling technique determined during EDA to numerical columns.

    3. Encoding:
        - Label encode categorical columns if the number of unique values is less than 10.

    4. Date Handling:
        - Identify columns containing date values based on predefined date patterns.
        - Convert identified date columns to datetime format.

    Returns the preprocessed DataFrame.

    ------------------------------------------------------------------------
    """

    #handling missing values
    if eda_results['missing_values']:
        imputer = SimpleImputer(strategy='mean')
        columns_to_impute_mean = []
        for column in eda_results['numerical_columns']:
            if df[column].nunique() >10:
                columns_to_impute_mean.append(column)
        df[columns_to_impute_mean] = imputer.fit_transform(df[columns_to_impute_mean])
        imputer = SimpleImputer(strategy='most_frequent')
        columns_to_impute_mode = [col for col in df.columns if col not in columns_to_impute_mean]
        df[columns_to_impute_mode] = imputer.fit_transform(df[columns_to_impute_mode])

    #Feature Scaling
    for column, scaler in eda_results['scaling_techniques'].items():
        df[column] = scaler.fit_transform(pd.DataFrame(df[column]))

    #encoding
    for column in eda_results['categorical_columns']:
        if df[column].nunique()<10:
            df[column] = LabelEncoder().fit_transform(df[column])

    #date handling
    date_patterns = [
    r'\b\d{4}-\d{2}-\d{2}\b',                           # YYYY-MM-DD
    r'\b\d{2}/\d{2}/\d{4}\b',                            # MM/DD/YYYY
    r'\b\d{2}-\d{2}-\d{4}\b',                            # MM-DD-YYYY
    r'\b\d{2}/\d{2}/\d{4}\b',                            # DD/MM/YYYY
    r'\b\d{8}\b',                                        # YYYYMMDD
    r'\b\d{2}-\w{3}-\d{4}\b',                            # DD-Mon-YYYY
    r'\b\d{1,2}\s+(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{4}\b',  # Day, Month Year
    r'\b\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2}:\d{2})?\b',     # ISO 8601 Date-Time
    r'\b(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{1,2},\s+\d{4}\b',  # Abbreviated Month Day, Year (e.g., Jan 1, 2022)
    r'\b(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{1,2}\s*,\s*\d{4}\b', # Abbreviated Month Day,Year (e.g., Jan 1,2022)
    r'\b\d{1,2}-\d{1,2}-\d{2}\b',                        # MM-DD-YY or DD-MM-YY
    r'\b\d{1,2}\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{2}\b',     # Day Mon YY (e.g., 1 Jan 22)
    r'\b(?:0?[1-9]|1[0-2])/(?:0?[1-9]|1\d|2\d|3[01])/\d{4}\b',  # MM/DD/YYYY or M/D/YYYY
    r'\b(?:0?[1-9]|1\d|2\d|3[01])/(?:0?[1-9]|1[0-2])/\d{4}\b',  # DD/MM/YYYY or D/M/YYYY
    r'\b(?:0?[1-9]|1[0-2])-(?:0?[1-9]|1\d|2\d|3[01])-\d{4}\b',  # MM-DD-YYYY or M-D-YYYY
    r'\b(?:0?[1-9]|1\d|2\d|3[01])-(?:0?[1-9]|1[0-2])-\d{4}\b',  # DD-MM-YYYY or D-M-YYYY
    r'\b(?:0?[1-9]|1[0-2])\.(?:0?[1-9]|1\d|2\d|3[01])\.\d{4}\b',  # MM.DD.YYYY or M.DD.YYYY
    r'\b(?:0?[1-9]|1\d|2\d|3[01])\.(?:0?[1-9]|1[0-2])\.\d{4}\b',  # DD.MM.YYYY or D.MM.YYYY
    r'\b(?:0?[1-9]|1[0-2])\s+(?:0?[1-9]|[12]\d|3[01]),\s+\d{4}\b',  # MM DD, YYYY or M DD, YYYY
    r'\b(?:0?[1-9]|1\d|2\d|3[01])\s+(?:0?[1-9]|1[0-2]),\s+\d{4}\b',  # DD MM, YYYY or D MM, YYYY
    r'\b(?:0?[1-9]|1[0-2])\s+(?:0?[1-9]|[12]\d|3[01])\s*,\s*\d{4}\b',  # MM DD YYYY or M DD YYYY
    r'\b(?:0?[1-9]|1\d|2\d|3[01])\s+(?:0?[1-9]|1[0-2])\s*,\s*\d{4}\b',  # DD MM YYYY or D MM YYYY
    r'\b(?:0?[1-9]|1[0-2])\s+[a-zA-Z]{3,}\s+\d{4}\b',  # MM MonthName YYYY or M MonthName YYYY
    r'\b(?:0?[1-9]|1\d|2\d|3[01])\s+[a-zA-Z]{3,}\s+\d{4}\b',  # DD MonthName YYYY or D MonthName YYYY
    r'\b[a-zA-Z]{3,}\s+(?:0?[1-9]|1[0-2])\s+\d{4}\b',  # MonthName MM YYYY
    r'\b[a-zA-Z]{3,}\s+(?:0?[1-9]|1\d|2\d|3[01])\s+\d{4}\b',  # MonthName DD YYYY
    r'\b(?:0?[1-9]|1[0-2])/[1-9]\d{3}\b',  # MM/YYYY or M/YYYY
    r'\b[1-9]\d{0,2}/(?:0?[1-9]|1[0-2])\b',  # YYYY/MM or YYYY/M
    ]
    datetime_columns = []
    for column in df.columns:
        if any(re.match(pattern,str(val)) for pattern in date_patterns for val in df[column]):
            try:
                df[column] = pd.to_datetime(df[column])
                datetime_columns.append(column)
            except:
                pass
    return df
