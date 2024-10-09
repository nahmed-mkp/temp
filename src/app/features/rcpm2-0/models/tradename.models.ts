export interface PortfolioManager {
    userID: number;
    name: string;
    ntName: string;
    emailDistribution: string;
    crdTradeIDPrefix: string;
    strategies: string[];
    defaultSelectedStrategy: string;
}

export interface INewTradeName {
    tradeName: string;
    allocStrategy: string;
    macroTheme: string;
    userSortTag3: string;
    isFXHedged: boolean;
    customAllocationReason?: string;
    allocations: IPodAllocation[];
}

export interface IPodAllocation {
    PodID: number;
    PctAlloc: number;
    AmtAlloc: number;
    Strategy: string;
}

export interface ITradeNameCreateResult {
    status: string;
    message: string;
}

export interface IMultiAllocTradeName {
    tid: number;
    tradeName: string;
    tradeID: string;
}

export interface IMultiAllocationSplit {
    tid: number;
    tradeID: string;
    tradeName: string;
    pctAlloc: number;
    amtAlloc: number;
    updated?: string;

}

export interface INewOrUpdateMultiAllocTradeName {
    tid?: number;
    tradeID?: string;
    tradeName: any;
    split: IMultiAllocationSplit[];
}
