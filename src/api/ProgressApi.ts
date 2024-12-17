import { ProgressChartDTO } from '../models/ProgressChartDTO';
import { ProgressInfoDTO } from '../models/ProgressInfoDTO';
import api from '../utils/BaseApi';
import { getUserId } from '../utils/TokenStorage';

const PROGRESS_URL = "/progress";

export const getProgressChart = async (): Promise<ProgressChartDTO> => {
    try {
        const userId = await getUserId();
        const response = (await api.get(PROGRESS_URL + `/student/${userId}/chart`));
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar informações de gráfico:', error);
        throw error;
    }
};

export const getProgressInfo = async (): Promise<ProgressInfoDTO[]> => {
    try {
        const userId = await getUserId();
        const response = (await api.get(PROGRESS_URL + `/student/${userId}`));
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar informações de gráfico:', error);
        throw error;
    }
};




