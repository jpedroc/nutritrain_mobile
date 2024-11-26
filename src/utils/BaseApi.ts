import axios from 'axios';
import { getToken } from './TokenStorage';

const api = axios.create({
  baseURL: 'http://192.168.0.156:8080', // Substitua pela URL do seu backend
  headers: {
    'Content-Type': 'application/json',
  }
});

api.interceptors.request.use(
  async (config) => {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;