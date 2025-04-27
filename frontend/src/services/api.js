import axios from "axios";

const BASE_URL = "http://localhost:5001";  // Updated Flask port

export const submitPrediction = async (formData) => {
  try {
    const response = await axios.post(`${BASE_URL}/predict`, formData);
    return response.data;
  } catch (error) {
    console.error("Error submitting prediction:", error);
    return { error: "Failed to submit prediction" };
  }
};

export const fetchPredictions = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/history`);
    return response.data;
  } catch (error) {
    console.error("Error fetching predictions:", error);
    return [];
  }
};

export const deleteAllPredictions = async () => {
  try {
    const response = await fetch(`${BASE_URL}/delete-all-predictions`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete predictions");
    }

    return await response.json();
  } catch (error) {
    console.error("Error deleting predictions:", error);
  }
};

export const fetchStats = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/stats`);
    return response.data;
  } catch (error) {
    console.error("Error fetching stats:", error);
    return null;
  }
};
