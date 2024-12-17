// src/navigation/types.ts

import { ProfilelInfoDTO } from "../models/ProfessionalInfoDTO";

export type RootStackParamList = {
    WorkoutList: undefined;
    WorkoutDetails: {
      workoutId: number;
      workoutName: string;
      workoutDate: string;
      trainer: ProfilelInfoDTO | null; // Substitua pelo seu DTO correto
    };
  };
  