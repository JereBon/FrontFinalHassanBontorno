import axios from 'axios';

// Usamos '/api' para que las peticiones pasen por el proxy de Next.js y eviten problemas de CORS
const API_URL = '/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para manejar errores o agregar tokens en el futuro
api.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export default api;