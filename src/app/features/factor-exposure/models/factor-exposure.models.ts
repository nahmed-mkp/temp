export interface IFactorExposureParams {
    activeDate: string;
    activeGrouping: string;
}

export interface IFactorsTabData {
    data: string[],
    filename: string
}

export interface IGroupingTabData {
    columns: string[];
    data: {},
    grouping: string;
    countries: []
}
