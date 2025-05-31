import joblib
import numpy as np
from flask import Flask, jsonify, render_template, request
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


def validate_input(data):
    required_fields = [
        "Nitrogen",
        "Phosporus",
        "Potassium",
        "Temperature",
        "Humidity",
        "pH",
        "Rainfall",
    ]
    for field in required_fields:
        if field not in data:
            return False, f"Missing required field: {field}"
        try:
            value = float(data[field])
            # Basic range validations
            if field == "pH" and (value < 0 or value > 14):
                return False, "pH must be between 0 and 14"
            if field == "Humidity" and (value < 0 or value > 100):
                return False, "Humidity must be between 0 and 100"
            if value < 0:
                return False, f"{field} cannot be negative"
        except ValueError:
            return False, f"Invalid value for {field}"
    return True, None


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/predict", methods=["POST"])
def predict():
    try:
        # Validate inputs
        valid, error_message = validate_input(request.form)
        if not valid:
            return jsonify({"error": error_message}), 400

        # Get values from the request
        N = float(request.form["Nitrogen"])
        P = float(request.form["Phosporus"])
        K = float(request.form["Potassium"])
        temp = float(request.form["Temperature"])
        humidity = float(request.form["Humidity"])
        ph = float(request.form["pH"])
        rainfall = float(request.form["Rainfall"])

        # Create feature array
        features = np.array([[N, P, K, temp, humidity, ph, rainfall]])

        # Scale features
        scaled_features = scaler.transform(features)

        # Make prediction
        prediction = model.predict(scaled_features)
        predicted_crop = label_encoder.inverse_transform(prediction)[0]

        # Generate response
        result = f"{predicted_crop} is recommended for cultivation based on your soil and climate conditions"

        return jsonify({"result": result, "crop": predicted_crop, "confidence": "high"})

    except Exception as e:
        return jsonify({"error": f"Prediction error: {str(e)}"}), 400


if __name__ == "__main__":
    app.run(debug=True)
