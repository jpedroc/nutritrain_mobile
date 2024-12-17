import { ProfessionalInfoDTO } from "../models/ProfessionalInfoDTO";

export type DietPlanRootStackParamList = {
    DietPlanList: undefined;
    DietPlanDetails: {
        dietId: number;
        dietDescription: string;
        trainer: ProfessionalInfoDTO;
    };
};
