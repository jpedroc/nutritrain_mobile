import axios from 'axios';
import { getToken, removeToken } from './TokenStorage';
import { Alert } from 'react-native';

const api = axios.create({
  baseURL: 'http://192.168.0.156:8080', // Substitua pela URL do seu backend
  headers: {
    'Content-Type': 'application/json',
  }
});

// token interceptor
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

// error interceptor /*
api.interceptors.response.use(
  (response) => response, // Passa a resposta se não houver erro
  (error) => {
    if (axios.isAxiosError(error) && error.response) {
      if(error.response.data.status == 401) {
        removeToken();
      }

      const { message } = error.response.data;
      // Exibir mensagem de erro vinda do backend
      Alert.alert('Erro', message || 'Erro desconhecido.');
    } else {
      Alert.alert('Erro', 'Algo deu errado. Tente novamente.');
    }
    return Promise.reject(error); // Rejeita para tratamento posterior, se necessário
  }
);

export default api;