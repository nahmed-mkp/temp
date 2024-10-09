
/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */

export enum ForwardRatesActionTypes {

    LOAD_FORWARD_RATES_PREPROCESS = '[Market Data Rates] load forward rate preprocess',
    LOAD_FORWARD_RATES = '[Market Data Rates] load forward rate',
    LOAD_FORWARD_RATES_ADVANCE = '[Market Data Rates] load forward rate advance',
    LOAD_FORWARD_RATES_COMPLETE = '[Market Data Rates] load forward rate complete',
    LOAD_FORWARD_RATES_ADVANCE_COMPLETE = '[Market Data Rates] load forward rate advance complete',
    LOAD_FORWARD_RATES_FAILED = '[Market Data Rates] load forward rate failed',

    UPDATE_GROUP_ORDER = '[Market Data Rates] Update group order'

}

export class LoadForwardRatesPreprocess {
    readonly type = ForwardRatesActionTypes.LOAD_FORWARD_RATES_PREPROCESS;
}


export class LoadForwardRates {
    readonly type = ForwardRatesActionTypes.LOAD_FORWARD_RATES;
}

export class LoadForwardRatesAdvance {
    readonly type = ForwardRatesActionTypes.LOAD_FORWARD_RATES_ADVANCE;
}

export class LoadForwardRatesComplete {
    readonly type = ForwardRatesActionTypes.LOAD_FORWARD_RATES_COMPLETE;

    constructor(public payload: {date: string; result: any}) {}
}

export class LoadForwardRatesAdvanceComplete {
    readonly type = ForwardRatesActionTypes.LOAD_FORWARD_RATES_ADVANCE_COMPLETE;

    constructor(public payload: {date: string; result: any}) {}
}

export class LoadForwardRatesFailed {
    readonly type = ForwardRatesActionTypes.LOAD_FORWARD_RATES_FAILED;

    constructor(public payload: string) {}
}




export class UpdateGroupOrder {
    readonly type = ForwardRatesActionTypes.UPDATE_GROUP_ORDER;

    constructor(public payload: {type: string; result: string[]}) {}
}

export type ForwardRatesActions
    = LoadForwardRates
    | LoadForwardRatesAdvance
    | LoadForwardRatesComplete
    | LoadForwardRatesAdvanceComplete
    | LoadForwardRatesFailed
    | LoadForwardRatesPreprocess

    | UpdateGroupOrder;
