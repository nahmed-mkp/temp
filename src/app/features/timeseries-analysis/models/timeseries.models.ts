export interface ITimeseriesSearch {
    criteria: string;
    source?: string;
}

export interface IWatchlist {
    id: string;
    name: string;
    isShared: boolean;
}

export interface ITimeseries {
    id: number;
    source: string;
    expression: string;
    alias: string;
}

export interface ITimeseriesPreview extends ITimeseries {
    data: [number, number];
}