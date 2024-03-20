```python
import pandas as pd
from sklearn.tree import DecisionTreeClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

# Load the data
data = pd.read_csv('titanic.csv')

# Preprocess the data
data = data.dropna()
data['Sex'] = data['Sex'].astype('category')
data['Embarked'] = data['Embarked'].astype('category')

# Split the data into train and test sets
X_train, X_test, y_train, y_test = train_test_split(data.drop('Survived', axis=1),
                                                    data['Survived'],
                                                    test_size=0.25,
                                                    random_state=0)

# Create a Decision Tree Classifier
clf = DecisionTreeClassifier(max_depth=5,
                            min_samples_split=2,
                            min_samples_leaf=1,
                            max_features=None,
                            criterion='gini')

# Train the model
clf.fit(X_train, y_train)

# Evaluate the model
y_pred = clf.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
print('Accuracy:', accuracy)
```