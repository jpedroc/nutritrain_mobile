import { LocalDate } from 'js-joda'; 
import BigDecimal from 'js-big-decimal'; 

export class ProgressChartDTO {
    dates: LocalDate[];  // Lista de datas
    weights: BigDecimal[];  // Lista de pesos
    bodyFatPercentages: BigDecimal[];  // Lista de percentuais de gordura corporal
    leanMasses: BigDecimal[];  // Lista de massas magras

    constructor(
        dates: LocalDate[], 
        weights: BigDecimal[], 
        bodyFatPercentages: BigDecimal[], 
        leanMasses: BigDecimal[]
    ) {
        this.dates = dates;
        this.weights = weights;
        this.bodyFatPercentages = bodyFatPercentages;
        this.leanMasses = leanMasses;
    }
}
