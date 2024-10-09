import { Action } from '@ngrx/store';
import * as fromModels from './../../models/drift-new.models';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum DriftNewActionTypes {
    
    LOAD_FUND_POD_TRADE_DRIFT = '[DriftNew] Load FPT Drift',
    LOAD_FUND_POD_TRADE_DRIFT_COMPLETE = '[DriftNew] Load FPT Drift Complete',
    LOAD_FUND_POD_TRADE_DRIFT_FAILED = '[DriftNew] Load FPT Drift Failed'
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful 
 * type checking in reducer functions.
 */
export class LoadFundPodTradeDrift implements Action {
    readonly type = DriftNewActionTypes.LOAD_FUND_POD_TRADE_DRIFT;

    constructor(public payload: fromModels.IDriftParams) { }
}

export class LoadFundPodTradeDriftComplete implements Action {
    readonly type = DriftNewActionTypes.LOAD_FUND_POD_TRADE_DRIFT_COMPLETE;

    constructor(public payload: any[]) { }
}

export class LoadFundPodTradeDriftFailed implements Action {
    readonly type = DriftNewActionTypes.LOAD_FUND_POD_TRADE_DRIFT_FAILED;

    constructor(public payload: any) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type DriftNewActions
    = LoadFundPodTradeDrift
    | LoadFundPodTradeDriftComplete
    | LoadFundPodTradeDriftFailed;
