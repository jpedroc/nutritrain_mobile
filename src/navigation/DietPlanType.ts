import { ProfilelInfoDTO } from "../models/ProfessionalInfoDTO";

export type DietPlanRootStackParamList = {
    DietPlanList: undefined;
    DietPlanDetail: {
        dietId: number;
        dietDescription: string;
        trainer: ProfilelInfoDTO | null;
    };
};
