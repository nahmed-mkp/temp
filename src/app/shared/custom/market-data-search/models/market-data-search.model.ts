export class MarketDataProvider {
    id: string;
    name: string;
    baseUrl: string;
}

export class MarketDataSearchCriteria {
    text: string;
    provider: string;
    context: string;
}

export class MarketDataSearchResult {
    name: string;
    type: string;
    displayName: string;
    expression: string;
    provider: string;
    context: string;
    startDate?: string;
    endDate?: string;
}

export class MarketDataInput {
    expression: string;
    provider: string;
}

export class SecuritySearchCriteria {
    searchCriteria: string;
    count: number;
}

export class SecuritySearchCriteriaForTimeseriesExporter {
    searchCriteria: string;
    count: number;
}

export class SecuritySearchResult {
    SecurityName: string;
    BlbgName: string;
    Cusip: string;
    SID: number;
    SecurityType: string;
}

export class SecurityForTimeseriesExporter {
    name: string;
    sid: number;
}

export class MarketDataSearchCriteriaForTimeseriesExporter {
    searchCriteria: string;
    count: number;
    priceSource: string;
}

export class MarketDataForTimeseriesExporter {
    bloombergField: string;
    bloombergTicker: string;
    mdid: number;
    name: string;
    priceSource: string;
    sortOrder: number;
    type: string;
}


// -------------------------------------------------

export interface ISecuritySearch {
    text: string;
    numCount: number;
}
