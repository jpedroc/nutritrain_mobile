import { LoginDTO } from '../models/LoginDTO';
import api from '../utils/BaseApi';

const AUTHENTICATION_URL = "/auth";

export const login = async (data: LoginDTO): Promise<string> => {
  try {
    const response = await api.post(AUTHENTICATION_URL + '/login', data);
    return response.data;
  } catch (error) {
    console.error('Erro na requisição POST:', error);
    throw error;
  }
}