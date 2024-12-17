import { LoginDTO } from '../models/LoginDTO';
import { ProfilelInfoDTO } from '../models/ProfessionalInfoDTO';
import { UserDTO, UserType } from '../models/UserDTO';
import api from '../utils/BaseApi';
import { getUserId } from '../utils/TokenStorage';

const AUTHENTICATION_URL = "/auth";

export const login = async (data: LoginDTO): Promise<{ userId: number, token: string }> => {
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

export const isAuthenticated = async (token: string): Promise<boolean> => {
	try {
		const response = await api.get(AUTHENTICATION_URL + '/is-authenticated', {
			headers: {
				'token': token
			}
		});
		return response.data;
	} catch (error) {
		throw error;
	}
}

export const getProfile = async(userType: UserType): Promise<ProfilelInfoDTO> => {
	try {
		const userId = await getUserId();
		const response = await api.get(AUTHENTICATION_URL + '/profile', {headers: {'user_id': userId, 'user_type': userType}});
		return response.data;
	} catch (error) {
        console.error('Erro ao perfil do usuário:', error);
        throw error;
    }
}