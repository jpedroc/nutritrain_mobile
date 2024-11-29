export interface WorkoutDetailDTO {
    id: number,
    name: string,
    series: number,
    repetitions: number,
    load: number,
    observations: string,
    execution?: string
}
