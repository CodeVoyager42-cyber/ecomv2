// src/services/api.ts
import axios from "axios";
 



export interface RegisterData {
  email: string;
  password: string;
}

export interface SubscribeData {
  email: string;
}

export interface ContactData {
  fullName: string;
  email: string;
  message: string;
}

export interface LoginData {
  email: string;
  password: string;
}

// Base URL
const BASE_URL = "http://localhost:5000/api";

// Generic fetch helper
const postRequest = async (url: string, data: any) => {
  const response = await fetch(`${BASE_URL}${url}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return response.json();
};

// Register a new user
export const registerUser = (data: RegisterData) => postRequest("/register", data);

// Subscribe user
export const subscribeUser = (data: SubscribeData) => postRequest("/subscribe", data);

// Send contact message
export const sendMessage = (data: ContactData) => postRequest("/send-message", data);

export const loginUser = async ({ email, password }: LoginData) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, { email, password });
    return response.data;
  } catch (error: any) {
    console.error("Login error:", error.response?.data || error.message);
    return { error: error.response?.data?.error || error.message };
  }
};

// Get products
export const getProducts = async () => {
  const response = await fetch(`${BASE_URL}/products`);
  return response.json();
};
