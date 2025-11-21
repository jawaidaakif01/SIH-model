import pandas as pd
from flask import Flask, request, jsonify
import joblib
import numpy as np


app = Flask(__name__)


print("Loading disease_model.pkl...")
disease_model = joblib.load("disease_model.pkl")
print("-> disease_model.pkl loaded successfully.")

print("Loading severity_model.pkl...")
severity_model = joblib.load("severity_model.pkl")
print("-> severity_model.pkl loaded successfully.")

print("Loading preprocessor.pkl...")
preprocessor = joblib.load("preprocessor.pkl")
print("-> preprocessor.pkl loaded successfully.")

print("Loading label_encoder_disease.pkl...")
le_disease = joblib.load("label_encoder_disease.pkl")
print("-> label_encoder_disease.pkl loaded successfully.")

print("Loading label_encoder_severity.pkl...")
le_severity = joblib.load("label_encoder_severity.pkl")
print("-> label_encoder_severity.pkl loaded successfully.")

print("All files loaded. Starting Flask server...")


categorical = ['Season', 'Water_Source', 'Toilet_Access', 
               'Waste_Disposal', 'Age_Group', 'Gender']
numeric = ['pH', 'Turbidity_NTU', 'TDS_mgL', 
           'Total_Coliform_CFU_100ml', 'Nitrate_mgL', 'Arsenic_mgL']

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.json 
        
  
        columns = [
            'Season', 'Water_Source', 'Toilet_Access', 'Waste_Disposal', 
            'Age_Group', 'Gender', 'pH', 'Turbidity_NTU', 'TDS_mgL', 
            'Total_Coliform_CFU_100ml', 'Nitrate_mgL', 'Arsenic_mgL'
        ]

       
        input_df = pd.DataFrame([data], columns=columns)

   
        X_processed = preprocessor.transform(input_df)
        
       

        disease_pred = disease_model.predict(X_processed)[0]
        severity_pred = severity_model.predict(X_processed)[0]

        disease_label = le_disease.inverse_transform([disease_pred])[0]
        severity_label = le_severity.inverse_transform([severity_pred])[0]

        return jsonify({
            "disease_prediction": disease_label,
            "severity_prediction": severity_label
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)
