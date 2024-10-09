export interface IConstituentRequest {
    asOfDate: string;
    frequency: string;
}

export interface IConstituentDataAnnual {
    dataDate: string;
    country: string;
    metricType: string;
    constituent: string;
    frequency: string;
    period: number;
    calcMethod: string;
    factorVariable: string;
    factorValue: number;
}

export interface IConstituentDataQuarterly {
    dataDate: string;
    country: string;
    metricType: string;
    frequency: string;
    constituent: string;
    period: number;
    quarter: string;
    calcMethod: string;
    factorVariable: string;
    factorValue: number;
}
