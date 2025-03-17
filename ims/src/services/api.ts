
import axios from 'axios';

// We can configure this based on environment
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // Add timeout to prevent hanging requests
  timeout: 10000,
});

// Add authorization header to requests when user is logged in
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Global error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    let errorMessage = 'An unexpected error occurred';
    
    if (error.response) {
      // Server responded with an error
      const status = error.response.status;
      const data = error.response.data;
      
      if (status === 401) {
        // Handle authentication errors
        errorMessage = 'Your session has expired. Please log in again.';
        // Redirect to login page or clear auth state
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      } else if (status === 403) {
        // Handle permission errors
        errorMessage = 'You do not have permission to perform this action';
      } else if (status === 404) {
        // Handle not found errors
        errorMessage = 'The requested resource was not found';
      } else if (status >= 400 && status < 500) {
        // Handle client errors
        errorMessage = data.message || 'Invalid request';
      } else if (status >= 500) {
        // Handle server errors
        errorMessage = 'Server error. Please try again later.';
      }
    } else if (error.request) {
      // Request was made but no response received
      errorMessage = 'No response from server. Please check your connection.';
      console.error('Network error:', error);
    }
    
    // Log the error instead of using toast directly
    console.error('API Error:', errorMessage);
    
    return Promise.reject(error);
  }
);

export default api;
