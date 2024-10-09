import { Action } from '@ngrx/store';

import * as fromModels from './../../models/leverage.models';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */

export enum LeverageActionTypes {

    SET_ACTIVE_DATE = '[Leverage] Sset Active Date',

    LOAD_LEVERAGE_DATE = '[Leverage] Load Leverage date',
    LOAD_LEVERAGE_DATE_COMPLETE = '[Leverage] Load Leverage date Complete',
    LOAD_LEVERAGE_DATE_FAILED = '[Leverage] Load Leverage date Failed',

    LOAD_LEVERAGE = '[Leverage] Load Leverage',
    LOAD_LEVERAGE_COMPLETE = '[Leverage] Load Leverage Complete',
    LOAD_LEVERAGE_FAILED = '[Leverage] Load Leverage Failed',

    LOAD_SUPPORTED_GROUPINGS = '[Leverage] Load Supported Groupings',
    LOAD_SUPPORTED_GROUPINGS_COMPLETE = '[Leverage] Load Supported Groupings Complete',
    LOAD_SUPPORTED_GROUPINGS_FAILED = '[Leverage] Load Supported Groupings Failed',
}

export class SetActiveDate {
    readonly type = LeverageActionTypes.SET_ACTIVE_DATE;

    constructor(public payload: Date) { }
}




export class LoadLeverageDate {
    readonly type = LeverageActionTypes.LOAD_LEVERAGE_DATE;
}

export class LoadLeverageDateComplete {
    readonly type = LeverageActionTypes.LOAD_LEVERAGE_DATE_COMPLETE;

    constructor(public payload: string[]) { }
}

export class LoadLeverageDateFailed {
    readonly type = LeverageActionTypes.LOAD_LEVERAGE_DATE_FAILED;

    constructor(public payload: string) { }
}






export class LoadSupportedGroupings {
    readonly type = LeverageActionTypes.LOAD_SUPPORTED_GROUPINGS;
}

export class LoadSupportedGroupingsComplete {
    readonly type = LeverageActionTypes.LOAD_SUPPORTED_GROUPINGS_COMPLETE;

    constructor(public payload: string[]) { }
}

export class LoadSupportedGroupingsFailed {
    readonly type = LeverageActionTypes.LOAD_SUPPORTED_GROUPINGS_FAILED;

    constructor(public payload: string) { }
}









export class LoadLeverage {
    readonly type = LeverageActionTypes.LOAD_LEVERAGE;

    constructor(public payload: fromModels.LeverageRequest) {}
}

export class LoadLeverageComplete {
    readonly type = LeverageActionTypes.LOAD_LEVERAGE_COMPLETE;

    constructor(public payload: any) { }
}

export class LoadLeverageFailed {
    readonly type = LeverageActionTypes.LOAD_LEVERAGE_FAILED;

    constructor(public payload: string) { }
}

export type LeverageActions
    = SetActiveDate

    | LoadLeverageDate
    | LoadLeverageDateComplete
    | LoadLeverageDateFailed

    | LoadSupportedGroupings
    | LoadSupportedGroupingsComplete
    | LoadSupportedGroupingsFailed

    | LoadLeverage
    | LoadLeverageComplete
    | LoadLeverageFailed;
