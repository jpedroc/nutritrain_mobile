import { LoginDTO } from '../models/LoginDTO';
import { UserDTO } from '../models/UserDTO';
import api from '../utils/BaseApi';

const AUTHENTICATION_URL = "/auth";

export const login = async (data: LoginDTO): Promise<string> => {
	try {
		const response = await api.post(AUTHENTICATION_URL + '/login', data);
		return response.data;
	} catch (error) {
		console.error('Erro ao logar:', error);
		throw error;
	}
}

export const register = async (data: UserDTO): Promise<void> => {
	try {
		const response = await api.post(AUTHENTICATION_URL + '/register', data);
		return response.data;
	} catch (error) {
		console.error('Erro ao registrar:', error);
		throw error;
	}
}