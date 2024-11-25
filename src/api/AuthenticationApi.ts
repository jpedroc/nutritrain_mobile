import api from './api';

const AUTHENTICATION_URL = "/auth";

export const login = async (data: any ) => {
    try {
        const response = await api.post(AUTHENTICATION_URL + '/login', data); // Modifique o endpoint
        return response.data;
      } catch (error) {
        console.error('Erro na requisição POST:', error);
        throw error;
      }
}