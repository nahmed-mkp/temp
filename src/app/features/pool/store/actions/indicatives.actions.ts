import { Action } from '@ngrx/store';

import * as fromModels from '../../models/indicatives.models';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum IndicativesActionTypes {

    SET_LOAD_INDICATIVES_FROM_BIDLIST_ONOFF_SWITCH = '[Indicatives] set load indicative from bidlist on off switch',

    LOAD_INDICATIVES_FROM_USER_INPUT = '[Indicatives] Load indicatives from user input',
    LOAD_INDICATIVES_FROM_USER_INPUT_COMPLETE = '[Indicatives] Load indicatives from user input complete',
    LOAD_INDICATIVES_FROM_USER_INPUT_FAILED = '[Indicatives] Load indicatives from user input failed',

    LOAD_INDICATIVES_FROM_BIDLIST = '[Indicatives] Load indicatives from bid list',
    LOAD_INDICATIVES_FROM_BIDLIST_COMPLETE = '[Indicatives] Load indicatives from bid list complete',
    LOAD_INDICATIVES_FROM_BIDLIST_FAILED = '[Indicatives] Load indicatives from bid list failed',

    LOAD_INDICATIVES_FROM_SCENARIOS = '[Indicatives] Load indicatives from scenarios',
    LOAD_INDICATIVES_FROM_SCENARIOS_COMPLETE = '[Indicatives] Load indicatives from scenarios complete',
    LOAD_INDICATIVES_FROM_SCENARIOS_FAILED = '[Indicatives] Load indicatives from scenarios failed',
}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */


export class LoadIndicativesFromUserInput implements Action {
    readonly type = IndicativesActionTypes.LOAD_INDICATIVES_FROM_USER_INPUT;

    constructor(public payload: fromModels.IIndicativeRequest) { }
}

export class LoadIndicativesFromUserInputComplete implements Action {
    readonly type = IndicativesActionTypes.LOAD_INDICATIVES_FROM_USER_INPUT_COMPLETE;

    constructor(public payload: {portfolioId: string | number, securities: any[]}) { }
}

export class LoadIndicativesFromUserInputFailed implements Action {
    readonly type = IndicativesActionTypes.LOAD_INDICATIVES_FROM_USER_INPUT_FAILED;

    constructor(public payload: string) { }
}







export class LoadIndicativesFromBidlists implements Action {
    readonly type = IndicativesActionTypes.LOAD_INDICATIVES_FROM_BIDLIST;

    constructor(public payload: fromModels.IIndicativeRequest) { }
}

export class LoadIndicativesFromBidlistsComplete implements Action {
    readonly type = IndicativesActionTypes.LOAD_INDICATIVES_FROM_BIDLIST_COMPLETE;

    constructor(public payload: any[]) { }
}

export class LoadIndicativesFromBidlistsFailed implements Action {
    readonly type = IndicativesActionTypes.LOAD_INDICATIVES_FROM_BIDLIST_FAILED;

    constructor(public payload: string) { }
}

export class SetLoadIndicativesFromBidlistsOnOffSwitch implements Action {
    readonly type = IndicativesActionTypes.SET_LOAD_INDICATIVES_FROM_BIDLIST_ONOFF_SWITCH;

    constructor(public payload: boolean) {}
}






/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type IndicativesActions
    = LoadIndicativesFromUserInput
    | LoadIndicativesFromUserInputComplete
    | LoadIndicativesFromUserInputFailed

    | LoadIndicativesFromBidlists
    | LoadIndicativesFromBidlistsComplete
    | LoadIndicativesFromBidlistsFailed
    | SetLoadIndicativesFromBidlistsOnOffSwitch
    ;



