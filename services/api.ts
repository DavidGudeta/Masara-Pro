
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Automatically inject token from localStorage
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('masara_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Global error handling (e.g., redirect on 401)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error('Session expired or unauthorized');
      // Potential logic: localStorage.removeItem('masara_token'); window.location.reload();
    }
    return Promise.reject(error);
  }
);

export default api;
