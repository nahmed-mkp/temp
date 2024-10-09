export interface DirectionalityRequest {
    grouping: string;
    key: string;
    lookbacks: string[];
    fromDate: Date;
    isRolling: boolean;
    rollingDays: number;
    capital?: number;
    asOfDate: string; 
}

export interface DirectionalityInputs {
    horizons: string[];
    isRolling: boolean;
    lookback1: DirectionalityLookback[];
    lookback2: DirectionalityLookback[];
    nDayChange: number;
    showAsPct: boolean;
    useSigma: boolean;
}

export interface DirectionalityLookback {
    name: string;
    code: string;
}

export interface ScatterPlotRequest {
    grouping: string;
    key: string;
    lookback: string;
    fromDate: Date;
    isRolling: boolean;
    rollingDays: number;
    factor: number;
    asOfDate: string;
}

export interface regressionRequest {
    grouping?: string;
    lookbacks: string[];
    fromDate: Date;
    isRolling?: boolean;
    rollingDays: number;
    factors: number[];
}
