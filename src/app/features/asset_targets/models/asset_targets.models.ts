export interface IAssetTargetsParam {
    type: 'Latest' | 'Historical' | 'Testing';
    asOfDate?: Date;
    showLevels: boolean;
}

export interface IAssetTargetSecurity {
    securityID: number;
    name: string;
}

export interface IScenarioTargetUpdate {
    scenarioId: number;
    securityId: number;
    target: number;
}

export interface IScenarioProbabilityUpdate {
    scenarioId: number;
    probability: number;
}

export interface IOverridePayload {
    country: string,
    field: string,
    old_data: any,
    override_data: any
}

export interface ISortOrderUpdatePayload { 
    scenarioId: number;
    sortOrder: number;
}

export interface IHistoricalAssetTargetsReq {
    assetType: string, 
    date: Date
}

export interface IAssetTargetsTimeseriesReq {
    assetType: string, 
    date: Date
}

export interface ICalculatorInput {
    sectionTitle: string,  
    data: any
}