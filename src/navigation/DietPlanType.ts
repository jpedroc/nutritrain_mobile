import { ProfessionalInfoDTO } from "../models/ProfessionalInfoDTO";

export type DietPlanRootStackParamList = {
    DietPlanList: undefined;
    DietPlanDetail: {
        dietId: number;
        dietDescription: string;
        trainer: ProfessionalInfoDTO;
    };
};
