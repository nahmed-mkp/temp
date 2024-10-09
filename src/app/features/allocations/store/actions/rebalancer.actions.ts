import { Action } from '@ngrx/store';

import * as fromModels from '../../models/capitals.models';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum TradeNameAllocationRebalancerActionTypes {

    LOAD_TRADENAME_ALLOCATIONS = '[TradeNameAllocations] Load TradeName Allocations',
    LOAD_TRADENAME_ALLOCATIONS_COMPLETE = '[TradeNameAllocations] Load TradeName Allocations complete',
    LOAD_TRADENAME_ALLOCATIONS_FAILED = '[TradeNameAllocations] Load TradeName Allocations failed',

    SAVE_TRADENAME_ALLOCATIONS = '[TradeNameAllocations] Save TradeName Allocations',
    SAVE_TRADENAME_ALLOCATIONS_COMPLETE = '[TradeNameAllocations] Save TradeName Allocations complete',
    SAVE_TRADENAME_ALLOCATIONS_FAILED = '[TradeNameAllocations] Save TradeName Allocations failed'
}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */

export class LoadTradeNameAllocations implements Action {
    readonly type = TradeNameAllocationRebalancerActionTypes.LOAD_TRADENAME_ALLOCATIONS;

    constructor(public payload: string) { }
}

export class LoadTradeNameAllocationsComplete implements Action {
    readonly type = TradeNameAllocationRebalancerActionTypes.LOAD_TRADENAME_ALLOCATIONS_COMPLETE;

    constructor(public payload: any[]) { }
}

export class LoadTradeNameAllocationsFailed implements Action {
    readonly type = TradeNameAllocationRebalancerActionTypes.LOAD_TRADENAME_ALLOCATIONS_FAILED;

    constructor(public payload: string) { }
}

export class SaveTradeNameAllocations implements Action {
    readonly type = TradeNameAllocationRebalancerActionTypes.SAVE_TRADENAME_ALLOCATIONS;

    constructor(public payload: any[]) { }
}

export class SaveTradeNameAllocationsComplete implements Action {
    readonly type = TradeNameAllocationRebalancerActionTypes.SAVE_TRADENAME_ALLOCATIONS_COMPLETE;

    constructor(public payload: any[]) { }
}

export class SaveTradeNameAllocationsFailed implements Action {
    readonly type = TradeNameAllocationRebalancerActionTypes.SAVE_TRADENAME_ALLOCATIONS_FAILED;

    constructor(public payload: string) { }
}
/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type TradeNameAllocationRebalancerActions
    = LoadTradeNameAllocations
    | LoadTradeNameAllocationsComplete
    | LoadTradeNameAllocationsFailed

    | SaveTradeNameAllocations
    | SaveTradeNameAllocationsComplete
    | SaveTradeNameAllocationsFailed;

