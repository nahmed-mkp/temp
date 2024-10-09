export interface ITradeName {
    CRDPrefix: string;
    TID: number;
    TradeName: string;
    TradeID: string;
    DateAdded: string;
    ModelStrategy: string;
    PortfolioManager: string;
    IsFXHedged: boolean;
    ExistsInCRD: boolean;
    CreateName: string;
    CreateDate: string;
    UpdateName: string;
    UpdateDate: string;

    NewTradeName?: string;
}

export interface ITaxLot {
    AsOfDate: string;
    FundId: string;
    FundName: string;
    ParentSID: number;
    Qty: number;
    SecurityName: string;
    TID: number;
    TradeDate: string;
    TradeID: string;
    TradeName: string;
}

export interface ITradeNameCounter {
    CRDPrefix: string;
    TradeID: string;
    TradeName: string;
}
