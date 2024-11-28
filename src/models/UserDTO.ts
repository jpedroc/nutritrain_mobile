// models/UserDTO.ts

export enum UserType {
    STUDENT = "STUDENT",
    NUTRITIONIST = "NUTRITIONIST",
    PERSONAL = "PERSONAL",
}

export enum Gender {
    FEMALE = "FEMALE",
    MALE = "MALE",
}

// Subtipo para informações de estudante
export interface StudentDTO {
    weight: number; // Peso do aluno
    height: number; // Altura do aluno
    objective: string; // Objetivo do aluno
    birthDate: Date; // Data de nascimento no formato "YYYY-MM-DD"
    gender: Gender; // Gênero do aluno
}

// DTO principal
export interface UserDTO {
    name: string; // Nome do usuário
    email: string; // Email do usuário
    password: string; // Senha do usuário
    type: UserType; // Tipo de usuário
    student?: StudentDTO; // Informações específicas de aluno (se tipo for STUDENT)
}
