export interface SizingItem {
    ann_vol: number;
    ATM_1mo_vol: number;
    security: string;
    liquidity: number;
    asset_class: string;
    size_5bps: number;
    size_10bps: number;
    size_20bps: number;
    size_25bps: number;
    size_50bps: number;
    id: number;
}

export interface SizingCapital {
    capital: number;
    cross_pod_name: string;
    id: number;
    default: boolean;
    Type: string;
}

export interface SizingResponse {
    update_time: string;
    payload: SizingItem[];
    default_columns: number[];
    capital_base: number;
}

export interface SizingSecurity {
    id?: number;
    name: string;
    mdid?: number;
    mdid2?: number;
    assetClass: string;
    liquidityRank: number;
    status?: string;
}

export interface DefaultSizingCapital {
    id: number;
    NTName: string;
    PodName: string;
    status?: string;
}
