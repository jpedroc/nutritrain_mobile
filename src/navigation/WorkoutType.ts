// src/navigation/types.ts

import { ProfessionalInfoDTO } from "../models/ProfessionalInfoDTO";

export type RootStackParamList = {
    WorkoutList: undefined;
    WorkoutDetails: {
      workoutId: number;
      workoutName: string;
      workoutDate: string;
      trainer: ProfessionalInfoDTO; // Substitua pelo seu DTO correto
    };
  };
  