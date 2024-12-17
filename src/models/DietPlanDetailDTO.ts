// Definindo os tipos dos alimentos
export interface Food {
    id: number;
    name: string;
    calories: number;
    protein: number;
    fat: number;
    fiber: number;
    sodium: number;
    carbohydrates: number;
    quantity: number;
    measure: MeasureType; // Pode ser "GRAMS", "UNIT", "MILLILITERS"
}

export enum MeasureType {
    GRAMS = 'g',
    UNIT = 'und',
    MILLILITERS = 'ml'
}

// Definindo as refeições
export interface DailyMeal {
    id: number;
    name: string;
    foods: Food[];
    totalCalories: number;
    totalProtein: number;
    totalFat: number;
    totalCarbohydrate: number;
    totalSodium: number;
    totalFiber: number;
    time: string; // Pode ser uma string com o horário no formato "09:07:04.088090200"
}

// DTO para o plano alimentar
export interface DietPlanDetailDTO {
    id: number;
    description: string;
    dailyMeals: DailyMeal[];
    totalCalories: number;
    totalProtein: number;
    totalFat: number;
    totalCarbohydrate: number;
    totalSodium: number;
    totalFiber: number;
}
