import { LoginDTO } from '../models/LoginDTO';
import { Page } from '../models/Page';
import { UserDTO } from '../models/UserDTO';
import { WorkoutListDTO } from '../models/WorkoutListDTO';
import api from '../utils/BaseApi';
import { getUserId } from '../utils/TokenStorage';

const WORKOUT_URL = "/workout";

export const getTrainerWorkouts = async (pageNumber: number, size: number): Promise<Page<WorkoutListDTO>> => {
    try {
        const userId = await getUserId();
        const response = (await api.get(WORKOUT_URL + '/by-personal?page='+pageNumber+'&size='+size+'&sort=workoutDate,desc', { headers: { 'user_id': userId} }));
        return response.data; // Retorna os treinos no formato desejado
    } catch (error) {
        console.error('Erro ao buscar treinos:', error);
        throw error;
    }
};

