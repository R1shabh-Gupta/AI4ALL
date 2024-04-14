import os
from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import google.generativeai as genai
import PIL.Image
from dotenv import load_dotenv
import pandas as pd
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler, RobustScaler, MinMaxScaler
from sklearn.ensemble import IsolationForest
from sklearn.preprocessing import LabelEncoder



load_dotenv()
GEMINI_API = os.getenv("GEMINI_API")

app = Flask(__name__)
CORS(app)

#utility functions
def perform_eda(df):
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
    return df


@app.route("/test", methods=["POST"])
def test():
    try:
        data = request.get_json()
        question = data.get("text")

        if not question:
            return jsonify({"error": "Missing 'text' field in request"}), 400

        genai.configure(api_key=GEMINI_API)
        model = genai.GenerativeModel('gemini-pro')

        generatedCode_response = model.generate_content(f"""You are a machine learning engineer tasked with coding a class oriented program for a model appropriate for the requirements in {question}.
        Carefully analyze the requirements to identify and use the best possible combinations of the requirements and the tune all the mentioned hyperparameters.
        Provide a well oriented code for the model use the best the possible hypermarameters as mentioned write optimisation functions if required Ensure that your code is clear, concise, and class driven along with proper comments explaining classes Give only the code disregard everything else""")

        explanation_response = model.generate_content(
            f"Provide a step-by-step explanation of this python code -> // code start // {generatedCode_response} // code end // . Emphasize the code's functionality and highlight relevant metrics pertinent to the domain. Moreover, delineate the key metrics essential for evaluating performance within this specific context.")

        return jsonify({"generatedCode": generatedCode_response.text, "explanation": explanation_response.text})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/preprocessing", methods=["POST"])
def preprocessing():
    if 'CSVFile' not in request.files:
        return jsonify({'error': 'Missing Data'}), 400
    file = request.files['CSVFile']
    filename, extension = os.path.splitext(file.filename)
    if extension.lower() not in ['.csv']:
        return jsonify({'error': 'Uploaded file is not a csv file'})

    temp_upload_path = 'temp_upload.csv'
    file.save(temp_upload_path)
    df = pd.read_csv('temp_upload.csv')
    preprocessed_csv = prepreocess(df, perform_eda(df))
    temp_csv_file = 'preprocessed.csv'
    preprocessed_csv.to_csv(temp_csv_file, index=False)
    print(preprocessed_csv)
    os.remove(temp_upload_path)
    return send_file(temp_csv_file, as_attachment=True)

@app.route("/handlinput", methods=["POST"])
def handleinput():
    if 'file' not in request.files:
        return jsonify({'error': 'Missing Data'}), 400

    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400

    filename, extension = os.path.splitext(file.filename)

    if extension.lower() in ['.csv']:
        return jsonify({'type': 'csv'}), 200

    elif extension.lower() in ['.png', '.jpg', '.jpeg', '.svg']:
        return jsonify({'type': 'image'}), 200

    else:
        return jsonify({'error': 'Invalid file format'}), 400

@app.route("/generateprompt", methods=["POST"])
def generateprompt():
    if 'picture' not in request.files:
        return jsonify({'error': 'Missing data'}), 400
    file = request.files['picture']

    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400

    filename, extension = os.path.splitext(file.filename)

    allowed_extensions = ['.jpg', '.png', '.jpeg', '.csv', '.xslx']

    if extension.lower() not in allowed_extensions:
        return jsonify({'error': 'Invalid file format'}), 400
        # Retrieve all form data from the request
    form_data = request.form
    # Extract variables from form data
    domainName = form_data.get("domainName")
    additionalData = form_data.get("additionalData")
    modelType = form_data.get("modelType")
    isMissingValue = form_data.get("isMissingValue") == "true"
    isGPU = form_data.get("isGPU") == "true"

    # Processing CSV Files
    if extension.lower() == '.csv':
        metadata = {}
        data = pd.read_csv(file)
        metadata['columnList'] = data.columns.tolist() #returning properly
        metadata['shape'] = data.shape #returning propelry
        #metadata['info'] = data.info(verbose=True) #printing in terminal instead of returning
        categorical_columns = []
        for column in data.columns:
            if data[column].dtype == 'object' or pd.api.types.is_categorical_dtype(data[column]):
                categorical_columns.append(column)
        metadata['categoricalColumns'] = categorical_columns #returning properly
        numerical_columns = []
        for column in data.columns:
            if pd.api.types.is_numeric_dtype(data[column]):
                numerical_columns.append(column)
        metadata['numericalColumns'] = numerical_columns  #returning  properly
        columns_with_missing_values = data.columns[data.isna().any()].tolist()
        metadata['missingValues'] = columns_with_missing_values #returning properly

        #generation
#       texttoTextModel = genai.GenerativeModel('gemini-pro')
#        response_01 = texttoTextModel.generate_content(f"""
#           As a machine learning engineer tasked with analyzing and providing insights on the {response_01} in the domain of {domainName}, your objective is to suggest and explain a {modelType} model appropriate for the dataset, while also including {additionalData} as a necessary requirement in the output.
#
#            Firstly, carefully analyze the columns to identify and list all possible parameters. Then, provide a comprehensive explanation detailing the model to be used and the possible hyperparameters to be updated.
#
#           Ensure that your explanations are clear, concise, and informative, aiding in understanding the purpose and content of the model. Present your explanations in a text format to effectively present the information, focusing solely on the description and disregarding any extraneous details.""")

        finalResponse = metadata['columnList']



    elif extension.lower() in ['.png', '.jpg', 'jpeg', '.svg']:
        img = PIL.Image.open(file)

        genai.configure(api_key=GEMINI_API)
        imageToTextModel = genai.GenerativeModel('gemini-pro-vision')

        response_01 = imageToTextModel.generate_content(["""
            You are a data analyst tasked with analyzing a provided image containing data columns. Your objective is to explain and provide detailed information for each data column present in the image.

            Carefully analyze the image to identify and list all the data columns visible.

            For each data column identified, provide a comprehensive explanation detailing the type of data it represents and its significance within the dataset.

            Ensure that your explanations are clear, concise, and informative, helping to understand the purpose and content of each data column.

            Present your explanations in a text format to aid in presenting the dataset's information effectively.
            Give only the columns description disregard everything else
        """, img], stream=True)

        response_01.resolve()

        textToTextModel = genai.GenerativeModel('gemini-pro')
        response_02 = textToTextModel.generate_content(f"""
            As a machine learning engineer tasked with analyzing and providing insights on the {response_01} in the domain of {domainName}, your objective is to suggest and explain a {modelType} model appropriate for the dataset, while also including {additionalData} as a necessary requirement in the output.

            Firstly, carefully analyze the columns to identify and list all possible parameters. Then, provide a comprehensive explanation detailing the model to be used and the possible hyperparameters to be updated.

            Ensure that your explanations are clear, concise, and informative, aiding in understanding the purpose and content of the model. Present your explanations in a text format to effectively present the information, focusing solely on the description and disregarding any extraneous details.""")

        finalResponse = response_01.text + '\n \n' + response_02.text

    return jsonify({"message": finalResponse})


if __name__ == "__main__":
    app.run(debug=True)import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
import PIL.Image
from dotenv import load_dotenv
import pandas as pd


load_dotenv()
GEMINI_API = os.getenv("GEMINI_API")

app = Flask(__name__)
CORS(app)


@app.route("/test", methods=["POST"])
def test():
    try:
        data = request.get_json()
        question = data.get("text")

        if not question:
            return jsonify({"error": "Missing 'text' field in request"}), 400

        genai.configure(api_key=GEMINI_API)
        model = genai.GenerativeModel('gemini-pro')

        generatedCode_response = model.generate_content(f"""You are a machine learning engineer tasked with coding a class oriented program for a model appropriate for the requirements in {question}.
        Carefully analyze the requirements to identify and use the best possible combinations of the requirements and the tune all the mentioned hyperparameters.
        Provide a well oriented code for the model use the best the possible hypermarameters as mentioned write optimisation functions if required Ensure that your code is clear, concise, and class driven along with proper comments explaining classes Give only the code disregard everything else""")

        explanation_response = model.generate_content(
            f"Provide a step-by-step explanation of this python code -> // code start // {generatedCode_response} // code end // . Emphasize the code's functionality and highlight relevant metrics pertinent to the domain. Moreover, delineate the key metrics essential for evaluating performance within this specific context.")

        return jsonify({"generatedCode": generatedCode_response.text, "explanation": explanation_response.text})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/handlinput", methods=["POST"])
def handleinput():
    if 'file' not in request.files:
        return jsonify({'error': 'Missing Data'}), 400

    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400

    filename, extension = os.path.splitext(file.filename)

    if extension.lower() in ['.csv']:
        return jsonify({'type': 'csv'}), 200

    elif extension.lower() in ['.png', '.jpg', '.jpeg', '.svg']:
        return jsonify({'type': 'image'}), 200

    else:
        return jsonify({'error': 'Invalid file format'}), 400

@app.route("/generateprompt", methods=["POST"])
def generateprompt():
    if 'picture' not in request.files:
        return jsonify({'error': 'Missing data'}), 400
    file = request.files['picture']

    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400

    filename, extension = os.path.splitext(file.filename)

    allowed_extensions = ['.jpg', '.png', '.jpeg', '.csv', '.xslx']

    if extension.lower() not in allowed_extensions:
        return jsonify({'error': 'Invalid file format'}), 400
        # Retrieve all form data from the request
    form_data = request.form
    # Extract variables from form data
    domainName = form_data.get("domainName")
    additionalData = form_data.get("additionalData")
    modelType = form_data.get("modelType")
    isMissingValue = form_data.get("isMissingValue") == "true"
    isGPU = form_data.get("isGPU") == "true"

    # Processing CSV Files
    if extension.lower() == '.csv':
        metadata = {}
        data = pd.read_csv(file)
        metadata['columnList'] = data.columns.tolist() #returning properly
        metadata['shape'] = data.shape #returning propelry
        #metadata['info'] = data.info(verbose=True) #printing in terminal instead of returning
        categorical_columns = []
        for column in data.columns:
            if data[column].dtype == 'object' or pd.api.types.is_categorical_dtype(data[column]):
                categorical_columns.append(column)
        metadata['categoricalColumns'] = categorical_columns #returning properly
        numerical_columns = []
        for column in data.columns:
            if pd.api.types.is_numeric_dtype(data[column]):
                numerical_columns.append(column)
        metadata['numericalColumns'] = numerical_columns  #returning  properly
        columns_with_missing_values = data.columns[data.isna().any()].tolist()
        metadata['missingValues'] = columns_with_missing_values #returning properly

        #generation
#       texttoTextModel = genai.GenerativeModel('gemini-pro')
#        response_01 = texttoTextModel.generate_content(f"""
#           As a machine learning engineer tasked with analyzing and providing insights on the {response_01} in the domain of {domainName}, your objective is to suggest and explain a {modelType} model appropriate for the dataset, while also including {additionalData} as a necessary requirement in the output.
#
#            Firstly, carefully analyze the columns to identify and list all possible parameters. Then, provide a comprehensive explanation detailing the model to be used and the possible hyperparameters to be updated.
#
#           Ensure that your explanations are clear, concise, and informative, aiding in understanding the purpose and content of the model. Present your explanations in a text format to effectively present the information, focusing solely on the description and disregarding any extraneous details.""")

        finalResponse = "Output from prompt"



    elif extension.lower() in ['.png', '.jpg', 'jpeg', '.svg']:
        img = PIL.Image.open(file)

        genai.configure(api_key=GEMINI_API)
        imageToTextModel = genai.GenerativeModel('gemini-pro-vision')

        response_01 = imageToTextModel.generate_content(["""
            You are a data analyst tasked with analyzing a provided image containing data columns. Your objective is to explain and provide detailed information for each data column present in the image.

            Carefully analyze the image to identify and list all the data columns visible.

            For each data column identified, provide a comprehensive explanation detailing the type of data it represents and its significance within the dataset.

            Ensure that your explanations are clear, concise, and informative, helping to understand the purpose and content of each data column.

            Present your explanations in a text format to aid in presenting the dataset's information effectively.
            Give only the columns description disregard everything else
        """, img], stream=True)

        response_01.resolve()

        textToTextModel = genai.GenerativeModel('gemini-pro')
        response_02 = textToTextModel.generate_content(f"""
            As a machine learning engineer tasked with analyzing and providing insights on the {response_01} in the domain of {domainName}, your objective is to suggest and explain a {modelType} model appropriate for the dataset, while also including {additionalData} as a necessary requirement in the output.

            Firstly, carefully analyze the columns to identify and list all possible parameters. Then, provide a comprehensive explanation detailing the model to be used and the possible hyperparameters to be updated.

            Ensure that your explanations are clear, concise, and informative, aiding in understanding the purpose and content of the model. Present your explanations in a text format to effectively present the information, focusing solely on the description and disregarding any extraneous details.""")

        finalResponse = response_01.text + '\n \n' + response_02.text

    return jsonify({"message": finalResponse})


if __name__ == "__main__":
    app.run(debug=True)
