export interface TsySwap {
    change_px_ticks: string;
    change_tsy_yld: number;
    close_dv01: number;
    close_price: number;
    close_price_ticks: string;
    close_tsy_yield: number;
    maturity: number;
    realtime_swap_yield: number;
    realtime_tsy_px: number;
    realtime_tsy_px_ticks: string;
    realtime_tsyyield: number;
}

export interface TBAInputs {
    cc102: number;
    hedgeRatios: TBAHedgeRatios[];
}

export interface TBAHedgeRatios {
    name: string;
    hedgeRatio: number;
    convexity: number;
}

export interface ITrackingInput {
    asOfDate?: string;
    mode: string;
    useLegacy: boolean;
    useSOFR: boolean;
}


export interface IntradayRequest {
    dates: string[];
    expressions: string[];
}

export interface IntradayMetaData { 
    hierarchy: any;
    fieldMap: any;
}

export interface IntradayRequestAndMetaData {
    
    request: IntradayRequest;
    metaData: IntradayMetaData;
}

export interface EODRequest { 
    expressions: string[];
    startDate?: string;
    endDate?: string;
    useCumulative?: boolean;
}

export interface EODMetaData {
    hierarchy: any;
    fieldMap: any;
}

export interface EODRequestAndMetaData {
    request: EODRequest;
    metaData: EODMetaData;
}