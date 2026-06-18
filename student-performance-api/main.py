from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import joblib
import pandas as pd
import traceback

app = FastAPI(title="Student Performance API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 1. LOAD MODEL DAN SCALER
model = joblib.load('model_terbaik.pkl') 
scaler = joblib.load('scaler.pkl')

class StudentInput(BaseModel):
    Hours_Studied: int
    Attendance: int
    Parental_Involvement: str
    Access_to_Resources: str
    Extracurricular_Activities: str
    Sleep_Hours: int
    Previous_Scores: int
    Motivation_Level: str
    Internet_Access: str
    Tutoring_Sessions: int
    Family_Income: str
    Teacher_Quality: str
    School_Type: str
    Peer_Influence: str
    Physical_Activity: int
    Learning_Disabilities: str
    Parental_Education_Level: str
    Distance_from_Home: str
    Gender: str

@app.post("/predict")
def predict_score(data: StudentInput):
    # PINDAHKAN TRY KE PALING ATAS
    try:
        input_dict = data.model_dump()
        
        ordinal_mapping = {
            'Parental_Involvement': {'Low': 0, 'Medium': 1, 'High': 2},
            'Access_to_Resources': {'Low': 0, 'Medium': 1, 'High': 2},
            'Motivation_Level': {'Low': 0, 'Medium': 1, 'High': 2},
            'Family_Income': {'Low': 0, 'Medium': 1, 'High': 2},
            'Teacher_Quality': {'Low': 0, 'Medium': 1, 'High': 2},
            'Peer_Influence': {'Negative': 0, 'Neutral': 1, 'Positive': 2},
            'Distance_from_Home': {'Near': 0, 'Moderate': 1, 'Far': 2},
            'Parental_Education_Level': {'High School': 0, 'College': 1, 'Postgraduate': 2}
        }
        
        for col, mapping in ordinal_mapping.items():
            input_dict[col] = mapping.get(input_dict[col], 0)
            
        input_dict['Extracurricular_Activities_Yes'] = 1 if input_dict.pop('Extracurricular_Activities') == 'Yes' else 0
        input_dict['Internet_Access_Yes'] = 1 if input_dict.pop('Internet_Access') == 'Yes' else 0
        input_dict['Learning_Disabilities_Yes'] = 1 if input_dict.pop('Learning_Disabilities') == 'Yes' else 0
        input_dict['School_Type_Public'] = 1 if input_dict.pop('School_Type') == 'Public' else 0
        input_dict['Gender_Male'] = 1 if input_dict.pop('Gender') == 'Male' else 0

        input_df = pd.DataFrame([input_dict])

        # AMBIL NAMA KOLOM DARI SCALER (Karena scaler yang membaca DataFrame terakhir)
        if hasattr(scaler, 'feature_names_in_'):
            expected_columns = scaler.feature_names_in_
        elif hasattr(model, 'feature_names_in_'):
            expected_columns = model.feature_names_in_
        else:
            # Fallback darurat jika keduanya tidak punya atribut
            expected_columns = input_df.columns

        # Paskan kolom
        for col in expected_columns:
            if col not in input_df.columns:
                input_df[col] = 0  
                
        input_df = input_df[expected_columns]
        
        # Scaling dan Predict
        input_scaled = scaler.transform(input_df)
        prediction = model.predict(input_scaled)
        
        final_score = min(round(float(prediction[0]), 2), 100)
        
        return {
            "status": "success",
            "predicted_exam_score": final_score
        }
        
    except Exception as e:
        # Jika ada error Python, kirim sebagai response JSON, jangan di-crash-kan
        error_details = traceback.format_exc()
        print(error_details) # Print di terminal backend untuk dianalisis
        return {
            "status": "error",
            "message": f"Server Backend Error: {str(e)}"
        }