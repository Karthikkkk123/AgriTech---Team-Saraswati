import logging
import os
import tempfile
from datetime import datetime
from typing import List, Optional

from fastapi import Body, FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from predict import SCRIPT_DIR, class_names, predict_disease

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Data Models
class CropBase(BaseModel):
    name: str
    variety: Optional[str] = None
    plot_size: Optional[str] = None
    sowing_date: Optional[str] = None
    expected_harvest: Optional[str] = None
    current_stage: Optional[str] = None
    notes: Optional[str] = None


class CropCreate(CropBase):
    pass


class CropUpdate(CropBase):
    progress: Optional[float] = None
    status: Optional[str] = None
    next_task: Optional[str] = None
    next_task_date: Optional[str] = None


class TaskBase(BaseModel):
    crop_id: str
    task_name: str
    task_date: str
    priority: str
    status: str = "pending"
    description: Optional[str] = None


# Disease information database
disease_info = {
    "Pepper bell Bacterial spot": {
        "severity": "High",
        "description": "A bacterial disease causing small, dark, raised spots on leaves and fruits of pepper plants.",
        "treatment": [
            "Remove infected leaves and fruits immediately",
            "Apply copper-based bactericide",
            "Increase air circulation between plants",
            "Avoid overhead watering",
        ],
        "prevention": [
            "Use disease-free seeds",
            "Practice crop rotation (3-4 years)",
            "Maintain proper plant spacing",
            "Keep foliage dry by using drip irrigation",
        ],
    },
    "Pepper bell healthy": {
        "severity": "None",
        "description": "The plant appears healthy with no visible signs of disease.",
        "treatment": [],
        "prevention": [
            "Maintain regular watering schedule",
            "Ensure proper fertilization",
            "Monitor for early signs of pests or disease",
            "Keep area weed-free",
        ],
    },
    "Potato Early blight": {
        "severity": "Moderate to High",
        "description": "Fungal disease causing dark brown spots with concentric rings on potato leaves.",
        "treatment": [
            "Remove infected leaves promptly",
            "Apply appropriate fungicide",
            "Improve air circulation",
            "Adjust watering schedule to keep leaves dry",
        ],
        "prevention": [
            "Use certified disease-free seed potatoes",
            "Practice crop rotation",
            "Maintain proper plant spacing",
            "Mulch to prevent soil splash",
        ],
    },
    "Potato Late blight": {
        "severity": "Severe",
        "description": "Highly destructive fungal disease causing dark, water-soaked spots on leaves and tubers.",
        "treatment": [
            "Remove and destroy infected plants immediately",
            "Apply protective fungicide",
            "Harvest remaining tubers if infection is widespread",
            "Improve drainage in the field",
        ],
        "prevention": [
            "Plant resistant varieties",
            "Avoid overhead irrigation",
            "Space plants for good air circulation",
            "Monitor weather conditions for blight-favorable conditions",
        ],
    },
    "Potato healthy": {
        "severity": "None",
        "description": "The potato plant shows normal, healthy growth with no signs of disease.",
        "treatment": [],
        "prevention": [
            "Maintain consistent watering schedule",
            "Monitor soil nutrition levels",
            "Scout regularly for early disease signs",
            "Practice good garden sanitation",
        ],
    },
    "Tomato Bacterial spot": {
        "severity": "High",
        "description": "Bacterial infection causing small, dark spots on leaves, stems, and fruits.",
        "treatment": [
            "Remove infected plant parts",
            "Apply copper-based bactericide",
            "Improve air circulation",
            "Avoid handling plants when wet",
        ],
        "prevention": [
            "Use disease-free seeds and transplants",
            "Rotate crops for 2-3 years",
            "Avoid overhead irrigation",
            "Keep garden free of debris",
        ],
    },
    "Tomato Early blight": {
        "severity": "Moderate",
        "description": "Fungal disease causing dark spots with concentric rings on lower leaves first.",
        "treatment": [
            "Remove affected leaves immediately",
            "Apply fungicide containing chlorothalonil or copper",
            "Ensure proper spacing between plants",
            "Adjust watering practices to keep leaves dry",
        ],
        "prevention": [
            "Rotate crops every 2-3 years",
            "Water at the base of plants",
            "Mulch around plants",
            "Use disease-resistant varieties",
        ],
    },
    "Tomato healthy": {
        "severity": "None",
        "description": "The tomato plant exhibits healthy growth with no signs of disease.",
        "treatment": [],
        "prevention": [
            "Maintain consistent watering",
            "Ensure proper nutrition",
            "Monitor for early signs of problems",
            "Keep garden area clean",
            "Use support structures for better air circulation",
        ],
    },
}


def get_disease_info(disease_name):
    # Default information if disease not found in database
    default_info = {
        "severity": "Unknown",
        "description": "Please consult a local agricultural expert for more information about this condition.",
        "treatment": [
            "Isolate affected plants",
            "Consider removing affected parts",
            "Consult local agricultural extension",
        ],
        "prevention": [
            "Practice crop rotation",
            "Maintain good garden hygiene",
            "Use disease-resistant varieties when possible",
        ],
    }

    info = disease_info.get(disease_name, default_info)

    # For healthy plants, ensure treatment list is empty
    if "healthy" in disease_name.lower():
        info["treatment"] = []

    return info


@app.post("/predict")
async def predict_plant_disease(file: UploadFile = File(...)):
    try:
        # Verify file type
        content_type = file.content_type or ""
        if not content_type.startswith("image/"):
            raise HTTPException(status_code=400, detail="File must be an image")

        # Create a temporary file to save the uploaded image
        with tempfile.NamedTemporaryFile(delete=False, suffix=".jpg") as temp_file:
            try:
                contents = await file.read()
                if not contents:
                    raise HTTPException(status_code=400, detail="Empty file")

                temp_file.write(contents)
                temp_file.flush()

                # Get the model path
                model_path = os.path.join(SCRIPT_DIR, "saved_models", "best_model.h5")

                if not os.path.exists(model_path):
                    logger.error(f"Model not found at {model_path}")
                    raise HTTPException(status_code=500, detail="Model file not found")

                # Make prediction
                logger.info(f"Processing image: {file.filename}")
                predicted_class, confidence = predict_disease(
                    model_path, temp_file.name, class_names
                )

                # Get disease information
                disease_name = predicted_class.replace("_", " ")
                info = get_disease_info(disease_name)
                is_healthy = "healthy" in disease_name.lower()

                # Prepare response based on plant health status
                response_data = {
                    "disease": "Healthy" if is_healthy else disease_name,
                    "confidence": round(confidence * 100, 2),
                    "severity": "None"
                    if is_healthy
                    else info.get("severity", "Unknown"),
                    "description": info.get("description", "No description available"),
                }

                # Add treatment and prevention based on health status
                if is_healthy:
                    response_data["prevention"] = info.get(
                        "prevention",
                        [
                            "Continue regular maintenance",
                            "Monitor for any changes",
                            "Follow good gardening practices",
                        ],
                    )
                else:
                    response_data["treatment"] = info.get(
                        "treatment",
                        [
                            "Isolate affected plants",
                            "Consider removing affected parts",
                            "Consult local agricultural extension",
                        ],
                    )
                    response_data["prevention"] = info.get(
                        "prevention",
                        [
                            "Practice crop rotation",
                            "Maintain good garden hygiene",
                            "Use disease-resistant varieties when possible",
                        ],
                    )

                return response_data

            except Exception as e:
                logger.error(f"Error processing image: {str(e)}")
                raise HTTPException(status_code=500, detail=str(e))
            finally:
                try:
                    os.unlink(temp_file.name)
                except Exception as e:
                    logger.error(f"Error deleting temporary file: {str(e)}")

    except Exception as e:
        logger.error(f"Error in predict endpoint: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))
