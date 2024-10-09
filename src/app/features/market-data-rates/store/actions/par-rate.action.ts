/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */

 export enum ParRateActionTypes {

    LOAD_PAR_RATE_PREPROCESS = '[Market Data Rates] load par rate preprocess',
    LOAD_PAR_RATE = '[Market Data Rates] load par rate',
    LOAD_PAR_RATE_COMPLETE = '[Market Data Rates] load par rate complete',
    LOAD_PAR_RATE_FAILED = '[Market Data Rates] load par rate failed',

    UPDATE_PAR_RATE_GROUP_ORDER = '[Market Data Rates] Update par rate group order'
 }



export class LoadParRatePreprocess {
    readonly type = ParRateActionTypes.LOAD_PAR_RATE_PREPROCESS;
}


export class LoadParRate {
    readonly type = ParRateActionTypes.LOAD_PAR_RATE;
}

export class LoadParRateComplete {
    readonly type = ParRateActionTypes.LOAD_PAR_RATE_COMPLETE;

    constructor(public payload: {date: string; result: any}) {}
}

export class LoadParRateFailed {
    readonly type = ParRateActionTypes.LOAD_PAR_RATE_FAILED;

    constructor(public payload: string) {}
}





export class UpdateParRateGroupOrder {
    readonly type = ParRateActionTypes.UPDATE_PAR_RATE_GROUP_ORDER;

    constructor(public payload: {type: string; result: string[]}) {}
}






export type ParRateActions
    = LoadParRate
    | LoadParRateComplete
    | LoadParRateFailed
    | LoadParRatePreprocess

    | UpdateParRateGroupOrder;
