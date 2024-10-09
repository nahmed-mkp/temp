export interface AgencyPortfolioRequest {
    asOfDate: string; // '10-01-2019'
    pricingMode: 'live' | 'closing';
    displayMode: 'position' | 'security' | 'benchmark' | 'rolls';
}


export interface Position {
    Id: string;
    id?: string;
    BM1: string;
    BM2: string;
    BM3: string;
    BM4: string;
    BackfillFormula: string;
    BenchmarkName: string;
    BenchmarkPrice: number;
    BenchmarkPriceTicks: string;
    BenchmarkSID: number;
    BenchmarkType: string;
    Coupon: number;
    CurFaceLong: number;
    CurFaceShort: number;
    CurrentPrice: number;
    CurrentPriceTicks: string;
    Delta: number;
    Duration: number;
    Factor: number;

    FundId: number;
    FundName: string;

    FuturesId: number;
    FuturesRoot: number;
    HedgeRatio1: number;
    HedgeRatio2: number;
    HedgeRatio3: number;
    HedgeRatio4: number;
    HedgeRatioOverride: number;
    LastPrice: number;
    LastPriceTicks: string;
    MaturityDate: number;
    OrigFaceLong: number;
    OrigFaceShort: number;

    PodId: number;
    PodName: string;

    PriceChange: number;
    PriceChangeInTicks: string;
    RiskFreeRate: number;
    SID: number;
    SecurityName: string;
    SecurityType: string;
    SpreadDur: number;

    TID: number;
    Tenor: number;
    TenorBucket: string;
    TradeName: string;
    UserSortTag: string;
}

export interface Security {
    Id: string;
    id?: string;
    BM1: string;
    BM2: string;
    BM3: string;
    BM4: string;
    BackfillFormula: string;
    BenchmarkName: string;
    BenchmarkPrice: number;
    BenchmarkPriceTicks: string;
    BenchmarkSID: number;
    BenchmarkType: string;
    Coupon: number;
    CurFaceLong: number;
    CurFaceShort: number;
    CurrentPrice: number;
    CurrentPriceTicks: string;
    Delta: number;
    Duration: number;
    Factor: number;
    FirmCurFaceLong: number;
    FirmCurFaceShort: number;
    FirmOrigFaceLong: number;
    FirmOrigFaceShort: number;
    FuturesId: number;
    FuturesRoot: number;
    HedgeRatio1: number;
    HedgeRatio2: number;
    HedgeRatio3: number;
    HedgeRatio4: number;
    HedgeRatioOverride: number;
    LastPrice: number;
    LastPriceTicks: string;
    MaturityDate: number;
    OrigFaceLong: number;
    OrigFaceShort: number;
    PriceChange: number;
    PriceChangeInTicks: string;
    RiskFreeRate: number;
    SID: number;
    SecurityName: string;
    SecurityType: string;
    SpreadDur: number;
    Tenor: number;
    TenorBucket: string;
    UserSortTag: string;
}

// export interface Benchmark {
//     Id: string;
//     id?: string;
//     Benchmark: string;
//     CrossFund: string;
//     CurFaceLong: number;
//     CurFaceShort: number;
//     Factor: number;
//     FundId: number;
//     FundName: string;
//     HedgeRatioOrDelta: number;
//     OrigFaceLong: number;
//     OrigFaceShort: number;
//     PodGroup: string;
//     PodId: number;
//     PodName: string;
//     SID: number;
//     SecurityName: string;
//     TID: number;
//     TradeName: string;
// }

export interface BasicGridColumn {
    name: string;
    displayName?: string;
    type?: string;
    digit?: number;
    format?: string;
    aggFunc?: string;
    rowGroup?: boolean;
    pinned?: string;
    hide?: boolean;
    filter?: string;
    sort?: string;
    pivot?: boolean;
    enablePivot?: boolean;
    children?: any;
    cellClass?: any;
}

export interface Benchmark {
    BMCurFaceLong: number;
    BMCurFaceShort: number;
    BMOrigFaceLong: number;
    BMOrigFaceShort: number;
    Benchmark: string;
    CrossFund: string;
    Factor: number;
    FundId: number;
    FundName: string;
    HedgeRatioOrDelta: number;
    Id: string;
    PodGroup: string;
    PodId: number;
    PodName: string;
    SID: number;
    SecCurFaceLong: number;
    SecCurFaceShort: number;
    SecOrigFaceLong: number;
    SecOrigFaceShort: number;
    SecurityName: string;
    TID: number;
    TradeName: string;
}

export interface Layout {
    name: string;
    subCategory: string;
    layoutData: any;
    user?: string;
}

export interface RollRaw {
    Benchmark: string;
    Mon: string;
    Notional: number;
    SecType: string;
}