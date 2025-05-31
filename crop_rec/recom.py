import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report
import joblib

# Step 1: Load Dataset
df = pd.read_csv("Crop_recommendation.csv")  # Make sure the file is in your working directory

# Step 2: Preprocessing
X = df.drop('label', axis=1)
y = df['label']
label_encoder = LabelEncoder()
y_encoded = label_encoder.fit_transform(y)
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Step 3: Train-Test Split
X_train, X_test, y_train, y_test = train_test_split(X_scaled, y_encoded, test_size=0.2, random_state=42)

# Step 4: Train Model
model = RandomForestClassifier(n_estimators=200, random_state=42)
model.fit(X_train, y_train)

# Evaluation
y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
print(f"Model Accuracy: {accuracy * 100:.2f}%")
print("\nClassification Report:\n")
print(classification_report(y_test, y_pred, target_names=label_encoder.classes_))

# Step 5: Save Model Files
joblib.dump(model, "crop_model.pkl")
joblib.dump(scaler, "scaler.pkl")
joblib.dump(label_encoder, "label_encoder.pkl")

# Step 6: Interactive Prediction
def get_user_input():
    print("\n📝 Please enter the following values:")
    n = float(input("Enter Nitrogen content in soil (N): "))
    p = float(input("Enter Phosphorous content in soil (P): "))
    k = float(input("Enter Potassium content in soil (K): "))
    temp = float(input("Enter Temperature in Celsius: "))
    humidity = float(input("Enter Humidity (%): "))
    ph = float(input("Enter pH value of soil: "))
    rainfall = float(input("Enter Rainfall (in mm): "))
    
    return np.array([[n, p, k, temp, humidity, ph, rainfall]])

try:
    # Get input from user
    user_input = get_user_input()
    
    # Scale the input and make prediction
    scaled_input = scaler.transform(user_input)
    predicted_label = model.predict(scaled_input)
    predicted_crop = label_encoder.inverse_transform(predicted_label)
    
    print(f"\n🌱 Recommended Crop: {predicted_crop[0]}")

except ValueError:
    print("\n❌ Error: Please enter valid numerical values!")
except Exception as e:
    print(f"\n❌ An error occurred: {str(e)}")
