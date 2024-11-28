export interface WorkoutListDTO {
    id: number;
    personalId: number;
    name: string; // Nome do treino
    studentId: number;
    studentName: string; // Nome do aluno
    workoutDate: string; // Data do treino (ex: '2024-11-27')
  }