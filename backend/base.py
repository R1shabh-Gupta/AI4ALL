import os
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
    if 'file' not in request.files:
        return jsonify({'error': 'Missing data'}), 400
    file = request.files['file']

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
