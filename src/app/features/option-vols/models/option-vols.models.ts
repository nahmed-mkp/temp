export interface ITicker {
    ticker: string;
}

export interface IOptionVolRequest {
    ticker: string;
    deltas: number[];
    numExpiries: number;
    includeOTMOptions: boolean;
    volType: string; // 'monthly' or 'quarterly' or 'daily';
    capital: number;
    target?: number;
    targetNotional?: number;
    guid: string;
    useCache: boolean; // true
    templateType: string;

    expiries?: string[];
}

export interface IFutureMapping {
    futureRoot: string;
    benchmarkMnemonic: string;
}

export interface SizingCapital {
    capital: number;
    cross_pod_name: string;
    id: number;
    default: boolean;
    Type: string;
}
