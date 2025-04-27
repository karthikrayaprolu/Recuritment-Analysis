from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
from pymongo import MongoClient

app = Flask(__name__)
CORS(app)

# Connect to MongoDB (Ensure database name is correct)
client = MongoClient("mongodb+srv://karthik13:karthik13@cluster0.0dmym.mongodb.net/")
db = client["recruitmentDB"]  # Use the correct database name
collection = db["predictions"]

# Load the trained model and scaler
model = joblib.load("recruitment_eligibility_model.pkl")
scaler = joblib.load("scaler.pkl")

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        required_features = [
            "CGPA", "Active Backlogs", "DS_Algo_Proficiency",
            "System_Design_Proficiency", "Internship_Duration",
            "Coding_Test_Score", "Communication_Grade",
            "Behavioral_Interview_Score", "Adaptability_Score",
            "Cultural_Fit_Score", "LeetCode_Solved"
        ]

        # Ensure all features exist and are numeric
        features = []
        for f in required_features:
            try:
                features.append(float(data.get(f, 0)))  # Convert to float, default to 0
            except ValueError:
                return jsonify({"error": f"Invalid value for {f}"}), 400

        # Scale and predict
        scaled_features = scaler.transform([features])
        prediction = model.predict(scaled_features)[0]
        result = "Eligible" if prediction == 1 else "Not Eligible"

        # Save the new prediction
        data["Eligibility"] = result
        collection.insert_one(data)

        return jsonify({"Eligibility": result})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/history', methods=['GET'])
def get_history():
    try:
        # Fetch all predictions and sort by _id in descending order (latest first)
        history = list(collection.find({}, {"_id": 0}).sort("_id", -1))
        return jsonify(history)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/delete-all-predictions', methods=['DELETE'])
def delete_all_predictions():
    try:
        result = collection.delete_many({})
        return jsonify({"message": "All predictions deleted", "deleted_count": result.deleted_count}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/stats', methods=['GET'])
def get_stats():
    try:
        total_candidates = collection.count_documents({})
        eligible_count = collection.count_documents({"Eligibility": "Eligible"})
        ineligible_count = total_candidates - eligible_count

        stats = {
            "totalCandidates": total_candidates,
            "eligibleCount": eligible_count,
            "ineligibleCount": ineligible_count
        }

        return jsonify(stats), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    
if __name__ == '__main__':
    print("🚀 Flask server running on http://localhost:5001")
    app.run(debug=True, port=5001)