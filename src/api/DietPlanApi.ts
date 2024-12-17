import { DietPlanDetailDTO } from '../models/DietPlanDetailDTO';
import { DietPlanListDTO } from '../models/DietPlanListDTO';
import { Page } from '../models/Page';
import api from '../utils/BaseApi';
import { getUserId } from '../utils/TokenStorage';

const DIET_PLAN_URL = "/diet-plans";

export const getDietPlans = async (pageNumber: number, size: number): Promise<Page<DietPlanListDTO>> => {
    try {
        const userId = await getUserId();
        const response = (await api.get(DIET_PLAN_URL + '/student?page=' + pageNumber + '&size=' + size, { headers: { 'user_id': userId } }));
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar treinos:', error);
        throw error;
    }
};

export const getDietPlanDetail = async (dietPlanId: number): Promise<DietPlanDetailDTO> => {
    try {
        const userId = await getUserId();
        const response = (await api.get(DIET_PLAN_URL + '/' + dietPlanId + '/student/detail', { headers: { 'user_id': userId } }));
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar detalhe do plano alimentar:', error);
        throw error;
    }
};

