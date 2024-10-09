export interface ICountry {
    countryOrEntity: string;
    defaultSelected: boolean;
    region: string;
}

export interface IRecord {
    cols: string[];
    data: CountryData[];
}

export interface CountryData {
    country: string;
    dates: string[];
    days: number[];
    logVals: number[][];
    vals: number[][];
}
