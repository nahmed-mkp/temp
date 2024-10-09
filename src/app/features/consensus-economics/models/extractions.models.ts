export interface IExtractionRequest {
    asOfDate: string;
    frequency: string;
}

export interface IExtractionDataAnnual {
    dataDate: string;
    country: string;
    metricType: string;
    frequency: string;
    period: number;
    calcMethod: string;
    factorVariable: string;
    factorValue: number;
}

export interface IExtractionDataQuarterly {
    dataDate: string;
    country: string;
    metricType: string;
    frequency: string;
    period: number;
    quarter: string;
    calcMethod: string;
    factorVariable: string;
    factorValue: number;
}













