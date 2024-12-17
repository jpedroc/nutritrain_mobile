export type DietPlanListDTO = {
    id: number,
    description: string,
    status: StatusEnum
}

export enum StatusEnum {
    ENABLED = "ENABLED",
    DISABLED = "DISABLED"
}