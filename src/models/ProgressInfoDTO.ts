import { LocalDate } from "js-joda";

export interface ProgressInfoDTO {
    id: number;
    date: LocalDate; 
    weight: number;
    bodyFatPercentage: number; 
    leanMass: number; 
}