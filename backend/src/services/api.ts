import axios from "axios";

export interface LoginData {
  email: string;
  password: string;
}

const API_URL = "http://localhost:5000/api";

// Register
export const registerUser = async ({ email, password }: { email: string; password: string }) => {
  try {
    const response = await axios.post(`${API_URL}/register`, { email, password });
    return response.data;
  } catch (error: any) {
    console.error("Registration error:", error.response?.data || error.message);
    return { error: error.response?.data?.error || error.message };
  }
};

// Login
export const loginUser = async ({ email, password }: LoginData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
  } catch (error: any) {
    console.error("Login error:", error.response?.data || error.message);
    return { error: error.response?.data?.error || error.message };
  }
};
