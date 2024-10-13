import axios from 'axios';

// Base URL of the FastAPI deployment
const API_URL = 'https://web-production-fa4fe.up.railway.app';

const api = axios.create({
  baseURL: API_URL,
});

// Register a new user
export const registerUser = async (username, email, password) => {
  try {
    const response = await api.post('/register/', {
      username,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Login user
export const loginUser = async (username, password) => {
  try {
    const response = await api.post('/login/', {
      username,
      password,
    });
    return response.data; // should return { access_token, token_type }
  } catch (error) {
    throw error.response.data;
  }
};

// Get current user data (protected route)
export const getUserInfo = async (token) => {
  try {
    const response = await api.get('/users/me/', {
      headers: {
        Authorization: `Bearer ${token}`, // include JWT token in the Authorization header
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
