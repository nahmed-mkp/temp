export interface ISettlementLadderRequest {
    fundId: number;
    asOfDate: string;
    migrationDate: string;
}

export interface IFundRes {
    FundID: number;
    FundName: string;
}