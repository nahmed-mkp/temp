export interface IMarketDataSearch {
    searchTerm: string;
    searchOn?: string;
}

export interface IMarketDataBackfill {
    mdid: number;
    fromDate: Date;
    toDate: Date;
    useEODField?: boolean;
}

export interface IMarketDataDetailReq {
    sid: number;
    mdid?: number;
}

