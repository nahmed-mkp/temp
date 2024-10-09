export interface IInput {
    dates: string[];
    countries: ICountry[];
}

export interface ICountry {
    name: string;
    code: string;
}

export interface IMacroRun {
    asOfDate: string;
    countries: ICountry[];
}

export interface IChartGroupInput {
    asOfDate?: string;
    country: ICountry;
    chartGroup: string;
}
