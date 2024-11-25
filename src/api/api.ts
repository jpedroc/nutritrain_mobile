import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.0.156:8080', // Substitua pela URL do seu backend
  headers: {
    'Content-Type': 'application/json',
  }
});

export default api;