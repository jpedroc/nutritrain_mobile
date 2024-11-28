import { Page } from '../models/Page';
import { WorkoutDetailDTO } from '../models/WorkoutDetailDTO';
import { WorkoutListDTO } from '../models/WorkoutListDTO';
import api from '../utils/BaseApi';
import { getUserId } from '../utils/TokenStorage';

const WORKOUT_URL = "/workout";
const EXERCISE_URL = "/exercise";

export const getTrainerWorkouts = async (pageNumber: number, size: number): Promise<Page<WorkoutListDTO>> => {
    try {
        const userId = await getUserId();
        const response = (await api.get(WORKOUT_URL + '/by-personal?page=' + pageNumber + '&size=' + size + '&sort=workoutDate,desc', { headers: { 'user_id': userId } }));
        return response.data; // Retorna os treinos no formato desejado
    } catch (error) {
        console.error('Erro ao buscar treinos:', error);
        throw error;
    }
};

export const getWorkoutDetail = async (workoutId: number): Promise<WorkoutDetailDTO[]> => {
    try {
        const response = await api.get(EXERCISE_URL + '/by-workout', { headers: { 'workout_id': workoutId } });
        return response.data;
    } catch (error) {
        throw error;
    }
}

