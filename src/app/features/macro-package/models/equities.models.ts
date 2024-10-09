export interface IEquitySector {
    name: string;
    description: string;
}

export interface IEquityIndexTimeseriesRequest {
    asOfDate: string;
    index: string;
}

export interface IEquitySectorTimeseriesRequest {
    asOfDate: string;
    index: string;
    sector: string;
}

export interface IEquitiesIndexTimeseriesResponse {
    index: string;
    fundamentals: any;
    vols?: any;
}

export interface IEquitySectorTimeseriesResponse {
    index: string;
    sector: string;
    fundamentals: any;
}
