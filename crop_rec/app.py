from typing import Any, Dict, Optional, Tuple, Union

import joblib
import numpy as np
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load the model and scalers
try:
    model = joblib.load("crop_model.pkl")
    scaler = joblib.load("scaler.pkl")
    label_encoder = joblib.load("label_encoder.pkl")
except Exception as e:
    print(f"Error loading models: {str(e)}")
    raise


def validate_input(
    data: Optional[Dict[str, Any]],
) -> Tuple[bool, Union[str, Dict[str, float]]]:
    if not data:
        return False, "No data provided"

    required_fields = [
        "Nitrogen",
        "Phosphorus",
        "Potassium",
        "Temperature",
        "Humidity",
        "pH",
        "Rainfall",
    ]
    cleaned_data = {}

    for field in required_fields:
        # Check for the field in both original and lowercase form
        value = data.get(field) or data.get(field.lower())
        if not value:
            return False, f"Missing required field: {field}"

        try:
            value = float(value)
            # Basic range validations
            if field == "pH" and (value < 0 or value > 14):
                return False, "pH must be between 0 and 14"
            if field == "Humidity" and (value < 0 or value > 100):
                return False, "Humidity must be between 0 and 100"
            if value < 0:
                return False, f"{field} cannot be negative"
            cleaned_data[field] = value
        except ValueError:
            return False, f"Invalid value for {field}"

    return True, cleaned_data


@app.route("/")
def index():
    return jsonify({"status": "ok", "message": "Crop Recommendation API is running"})


@app.route("/predict", methods=["POST"])
def predict():
    try:
        # Handle both JSON and form data
        if request.is_json:
            input_data = request.json
        else:
            input_data = request.form.to_dict()

        # Validate and clean inputs
        valid, result = validate_input(input_data)
        if not valid:
            return jsonify({"error": result}), 400

        # Check if result is a dict (cleaned data) or string (error message)
        if isinstance(result, str):
            return jsonify({"error": result}), 400

        # Create feature array from cleaned data
        features = np.array(
            [
                [
                    result[field]
                    for field in [
                        "Nitrogen",
                        "Phosphorus",
                        "Potassium",
                        "Temperature",
                        "Humidity",
                        "pH",
                        "Rainfall",
                    ]
                ]
            ]
        )

        # Scale features
        scaled_features = scaler.transform(features)

        # Make prediction
        prediction = model.predict(scaled_features)
        predicted_crop = label_encoder.inverse_transform(prediction)[0]

        # Calculate confidence score
        confidence_scores = model.predict_proba(scaled_features)[0]
        confidence = float(confidence_scores.max() * 100)

        return jsonify(
            {
                "crop": predicted_crop,
                "confidence": confidence,
                "message": f"{predicted_crop} is recommended for cultivation based on your soil and climate conditions",
            }
        )

    except Exception as e:
        return jsonify({"error": f"Prediction error: {str(e)}"}), 400


if __name__ == "__main__":
    app.run(debug=True, port=5000)
