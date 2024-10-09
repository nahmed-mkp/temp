export interface PricingMethodUpdateReq {
    sid: number;
    methodType: string;
    methodName: string;
}

export interface SwapsDataReq {
    mode: 'live' | 'close';
    asOfDate: Date;
    assetClass: 'swaps';
}

export interface SwaptionsDataReq {
    mode: 'live' | 'close';
    asOfDate: Date;
    assetClass: 'swaptions';
}

export interface FxDataReq {
    mode: 'live' | 'close';
    asOfDate: Date;
    assetClass: 'fx';
}


export interface EquitiesDataReq {
    mode: 'live' | 'close';
    asOfDate: Date;
    assetClass: 'equities';
}

export interface FuturesDataReq {
    mode: 'live' | 'close';
    asOfDate: Date;
    assetClass: 'futures';
}

export interface TreasuriesDataReq {
    mode: 'live' | 'close';
    asOfDate: Date;
    assetClass: 'tsy';
}

export interface OptionsDataReq {
    mode: 'live' | 'close';
    asOfDate: Date;
    assetClass: 'options';
}

export interface MultiAssetOptionsDataReq {
    mode: 0 | 1;
    asOfDate: Date;
    assetClass: 'mao';
}

/**
 * Prevent server updates of securities that are being updated on the client
 */
export interface SecurityOwnershipReq {
    asOfDate: Date;
    sid: number;
}

/**
 * Manual marking
 */
export interface SwapUpdateReq {
    mark_at_price: number;
    name: string;
    mark_at_spread: number;
    mark_at_yield: number;
    sid: number;
    benchmark_name?: number;
    curve_shift?: number;
    mode?: 'live' | 'close';
    as_of_date?: string;
    securityType: string;
    assetClass: 'swaps';
}

export interface SwaptionUpdateReq {
    mark_at_price: number;
    curve_shift?: number;
    nvol_shift?: number;
    mark_at_nvol?: number;
    input_correlation: number;
    name: string;
    sid: number;
    mode?: 'live' | 'close';
    securityType: string;
    assetClass: 'swaptions';
}

export interface FxForwardUpdateReq {
    mark_at_price: number;
    name: string;
    sid: number;
    mode?: 'live' | 'close';
    securityType: string;
    assetClass: 'fx';
}

export interface OptionUpdateReq {
    as_of_date: string;
    input_price: number;
    input_price_adj: number;
    input_px_vol: number;
    input_px_vol_adj: number;
    input_correlation: number;
    correlation: number;
    close_price_method: string;
    intraday_price_method: string;
    name: string;
    sid: number;
    mode?: 'live' | 'close';
    assetClass: 'options';
    securityType: string;

    ref_future?: string;
    roll_spread?: number;
    input_div_yield?: number;
}

export interface FutureUpdateReq {
    as_of_date: string;
    input_price: number;
    name: string;
    sid: number;
    mode?: 'live' | 'close';
    assetClass: string;
}

export interface OptionPriceMethodUpdateReq {
    sid: number;
    name: string;
    close_price_method: string;
    intraday_price_method: string;
    as_of_date: string;
    mode?: 'live' | 'close';
    assetClass: 'options';
}

export interface MultiAssetOptionUpdateReq {
    as_of_date: string;
    mode?: 0 | 1;
    sid: number;
    sec_name: string;
    market_data_type: string;
    market_data_value: number;
}

export interface TreasuryUpdateReq {
    as_of_date: string;
    input_price: number;
    input_yield: number;
    mark_at_spread: number;
    name: string;
    sid: number;
    mode?: 'live' | 'close';
    assetClass: 'govt';
}

export interface IRvDataRes {
  SourceLastUpdate: string;
  SourceMDID: string;
  SourceName: string;
  Spread: number;
  TargetLastUpdate: string;
  TargetMDID: string;
  TargetName: string;
  Type: string;
}

export interface IRvDataUpdateReq{
  sourceMDID: string;
  targetMDID: string;
  spread: number;
  prevTargetMDID: number;
}

export interface IRvDataInsertReq{
  sourceMDID: string;
  targetMDID: string;
  spread: number;
}

export interface IMdidEnrichmentReq{
  previousSourceMdid: number;
  previousTargetMdid: number;
  sourceName: string;
  spread: number;
  targetName: string;
  type: string;
}

export interface IDataInputEnrichmentReq {
  sourceName: string;
  spread: number;
  targetName: string;
  type: string;
}

export interface IBVALBondPriceRes { 
    BVAL_ASK_PRICE: number;
    BVAL_ASK_SCORE: number;
    BVAL_ASK_YIELD: number;
    BVAL_BID_PRICE: number;
    BVAL_BID_SCORE: number;
    BVAL_BID_YIELD: number;
    BVAL_MID_PRICE: number;
    BVAL_MID_SCORE: number;
    BVAL_MID_YIELD: number;
    BvalSnapshot: string;
    Cusip: string;
    DLRequestId: string;
    Identifier: string;
    LQA_LIQUIDITY_SCORE: number;
    MarketSector: string;
    Name: string;
    PX_ASK: number;
    PX_BID: number;
    PX_MID: number;
    PricingSource: string;
    SID: number;
    SecurityType: string;
    SnapshotTimezone: string;
    SortOrder: number;
    YLD_CNV_ASK: number;
    YLD_CNV_BID: number;
    YLD_CNV_MID: number;
}

export interface IBVALPriceHistoryReq { 
    sid: number;
    field: string;
}

export interface IBVALSuggestion { 
    name: string;
    sid: number;
}

export interface IBVALProxyReq { 
    asOfDate: string;
    mode: string;
    sid: number;
    bval_proxy_sid: number;
}

export interface IBVALBondPriceHistoryRes { 
    Name: string;
    History: IBVALBondPriceRes[];
}