
import axios from 'axios';

// Mock API for frontend-only mode
const api = axios.create({
  baseURL: '/api/mock', // Placeholder
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
