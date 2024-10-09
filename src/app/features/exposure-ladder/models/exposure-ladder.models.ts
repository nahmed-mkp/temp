export interface IExposureLadderModel {
    AsOfDate: string;
    Currency: string;
    FundName: string;
    IsFxHedged: boolean,
    MaturityDate: string,
    NativeExposure: number,
    PodName: string;
    SecurityName: string,
    SettleDate: string,
    TradeNameWithId: string,
    USDExposure: number
}

export interface IExposureLadder {
    data: IExposureLadderModel[];
    settle_dates: string[];
}
