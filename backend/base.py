from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
import PIL.Image
from dotenv import load_dotenv
load_dotenv()
import os
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

        generatedCode_response = model.generate_content("""Write fully formatted code in one block for a ML model for a dataset with
        Name: This column represents the name of the patient associated with the healthcare record.
        Age: The age of the patient at the time of admission, expressed in years.
        Gender: Indicates the gender of the patient, either "Male" or "Female."
        Blood Type: The patient's blood type, which can be one of the common blood types (e.g., "A+", "O-", etc.).
        Medical Condition: This column specifies the primary medical condition or diagnosis associated with the patient, such as "Diabetes," "Hypertension," "Asthma," and more.
        Date of Admission: The date on which the patient was admitted to the healthcare facility.
        Doctor: The name of the doctor responsible for the patient's care during their admission.
        Hospital: Identifies the healthcare facility or hospital where the patient was admitted.
        Insurance Provider: This column indicates the patient's insurance provider, which can be one of several options, including "Aetna," "Blue Cross," "Cigna," "UnitedHealthcare," and "Medicare."
        Billing Amount: The amount of money billed for the patient's healthcare services during their admission. This is expressed as a floating-point number.
        Room Number: The room number where the patient was accommodated during their admission.
        Admission Type: Specifies the type of admission, which can be "Emergency," "Elective," or "Urgent," reflecting the circumstances of the admission.
        Discharge Date: The date on which the patient was discharged from the healthcare facility, based on the admission date and a random number of days within a realistic range.
        Medication: Identifies a medication prescribed or administered to the patient during their admission. Examples include "Aspirin," "Ibuprofen," "Penicillin," "Paracetamol," and "Lipitor."
        Test Results: Describes the results of a medical test conducted during the patient's admission. Possible values include "Normal," "Abnormal," or "Inconclusive," indicating the outcome of the test.""")

        explanation_response = model.generate_content(f"Explain the code and the metrics to focus on for this domain: {generatedCode_response}")

        return jsonify({"generatedCode": generatedCode_response.text, "explanation": explanation_response.text})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/generateprompt", methods=["POST"])
def generateprompt():
    if 'picture' not in request.files:
      return jsonify({'error': 'Missing image data'}), 400
    image_file = request.files['picture']
    img = PIL.Image.open(image_file)

    genai.configure(api_key=GEMINI_API)
    model = genai.GenerativeModel('gemini-pro-vision')

    response = model.generate_content(["Analyze the provided image and extract the column names along with the first value of each column present in the image. Describe the process and accuracy of your extraction.", img], stream=True)

    response.resolve()
    print(response.text)
  
    return jsonify({"message": response.text})


if __name__ == "__main__":
    app.run(debug=True)
