export type CustomerCode = {
    customerCode: string,
}
export type Periods = {
    period: number,
    month: number,
    year: number
}[]
export type CustomerPeriods = {
    customerCode: string;
    period: number;
    month: number;
    year: number;
}
export type PowerComsumption = {
    powerConsumptionGeneral: [];
    powerConsumptionDetail: [];
}