export interface IBidlistParserExpression {
    Builder: string;
    ExpName: string;
    RegEx: string;
    SortOrder: number;
}

export interface IBidlistParserRequest {
    userInput: string;
    specifiedMethod: string;
    portfolioId?: number;
    portfolioGuid?: string;
}

export interface IBidlistParserResult {
    Cusip: string;
    ISIN: string;
    BlbgName: string;
    OrigFace: number;
    BidOrigFace: number;
    AskOrigFace: number;
    PortfolioId: number;
    PortfolioGuid: string;
}
