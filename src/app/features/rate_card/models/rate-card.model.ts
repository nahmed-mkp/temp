export interface IRateByFundAndSecurity {
    AsOfDate: string;
    SID: number;
    SecurityName: string;
    SecurityType: string;
    Currency: string;
    'Opportunity Master Fund': number;
    'Enhanced Opportunity Master Fund': number;
    'BluePearl': number;
    'Alpha Port': number;
    'GMMK': number;

    'Opportunity Master Fund_override': number;
    'Enhanced Opportunity Master Fund_override': number;
    'BluePearl_override': number;
    'Alpha Port_override': number;
    'GMMK_override': number;
}

export interface IRateByFundAndBucket {
    AsOfDate: string;
    FundingTag: string;
    SecurityType: string;
    Currency: string;
    'Opportunity Master Fund': number;
    'Enhanced Opportunity Master Fund': number;
    'BluePearl': number;
    'Alpha Port': number;
    'GMMK': number;

    'Opportunity Master Fund_override': number;
    'Enhanced Opportunity Master Fund_override': number;
    'BluePearl_override': number;
    'Alpha Port_override': number;
    'GMMK_override': number;

    'Opportunity Master Fund_position': number;
    'Enhanced Opportunity Master Fund_position': number;
    'BluePearl_position': number;
    'Alpha Port_position': number;
    'GMMK_position': number;
}

export interface IRateByEquity {
    AsOfDate: string;
    SID: number;
    SecurityName: string;
    SecurityType: string;
    Currency: string;
    LongShort: string;

    'Opportunity Master Fund': number;
    'Enhanced Opportunity Master Fund': number;
    'BluePearl': number;
    'Alpha Port': number;
    'GMMK': number;

    'Opportunity Master Fund_override': number;
    'Enhanced Opportunity Master Fund_override': number;
    'BluePearl_override': number;
    'Alpha Port_override': number;
    'GMMK_override': number;

    'Opportunity Master Fund_position': number;
    'Enhanced Opportunity Master Fund_position': number;
    'BluePearl_position': number;
    'Alpha Port_position': number;
    'GMMK_position': number;
}

export interface IBucketRateUpdate { 
    AsOfDate: string;
    FundingTag: string;
    FundName: string;
    RateOverride?: number;
}

export interface ISecurityRateUpdate {
    AsOfDate: string;
    SID: number;
    FundName: string;
    RateOverride?: number;
}

export interface ISecurityEquityRateUpdate {
    AsOfDate: string;
    SID: number;
    FundName: string;
    LongShort: string;
    RateOverride?: number;
}

export interface IRateCard { 
    AsOfDate: string;
    SecurityName: string;
    SecurityType: string;
    Currency: string;
    'Alpha Port': string;
    'BluePearl': string;
    'Opportunity Master Fund': number;
    'Enhanced Opportunity Master Fund': number;
    'GMMK': number;
}

export interface IRateCardRequest {
    end_date: string;
    start_date: string;
    sid: number;
}

export interface IFundingCharge { 
    AsOfDate: string;
    FundName: string;
    PodName: string;
    CrossPodName: string;
    CrossFundName: string;
    TradeName: string;
    SecurityName: string;
    SecurityType: string;
    Currency: string;
    FundingRate: number;
    SettledMV: number;
    Haircut: number;
    HaircutAdjustedSettledMV: number;
    NumDays: number;
    FundingCharges: number;
    FundID: number;
    PodID: number;
    CrossPodID: number;
    CrossFundID: number;
    SecurityNameExcludingCP: string;
    ClientServicesTradeTheme: string;
    TID: number;
    SID: number;
    ID?: string;
}

export interface IFundingChargeRequest { 
    start_date: string;
    end_date: string;
    sid: number;
}


export interface ITimeseriesRequest extends IRateCardRequest{
    secName: string;
}