import { Action } from '@ngrx/store';

import * as fromModels from './../../models/subscription.models';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum SubscriptionActionTypes {

    SUBSCRIBE_TO_POSITIONS          = '[Subscription] Subscribe to positions',
    SUBSCRIBE_TO_POSITIONS_COMPLETE = '[Subscription] Subscribe to positions complete',
    SUBSCRIBE_TO_POSITIONS_FAILED   = '[Subscription] Subscribe to positions failed',

    // SUBSCRIBE_TO_EXECUTIONS          = '[Subscription] Subscribe to executions',
    // SUBSCRIBE_TO_EXECUTIONS_COMPLETE = '[Subscription] Subscribe to executions complete',
    // SUBSCRIBE_TO_EXECUTIONS_FAILED   = '[Subscription] Subscribe to executions failed',

    // SUBSCRIBE_TO_GROUPINGS           = '[Subscription] Subscribe to groupings',
    // SUBSCRIBE_TO_GROUPINGS_COMPLETE  = '[Subscription] Subscribe to groupings complete',
    // SUBSCRIBE_TO_GROUPINGS_FAILED    = '[Subscription] Subscribe to groupings failed',

    // SUBSCRIBE_TO_RISKS               = '[Subscription] Subscribe to groupings',
    // SUBSCRIBE_TO_RISKS_COMPLETE      = '[Subscription] Subscribe to groupings complete',
    // SUBSCRIBE_TO_RISKS_FAILED        = '[Subscription] Subscribe to groupings failed',
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful 
 * type checking in reducer functions.
 */
export class SubscribeToPositions implements Action {

    readonly type = SubscriptionActionTypes.SUBSCRIBE_TO_POSITIONS;

    constructor(public payload: fromModels.IPositionSubscriptionRequest) { }
}

export class SubscribeToPositionsComplete implements Action {
    readonly type = SubscriptionActionTypes.SUBSCRIBE_TO_POSITIONS_COMPLETE;

    constructor(public payload: any) { }
}

export class SubscribeToPositionsFailed implements Action {
    readonly type = SubscriptionActionTypes.SUBSCRIBE_TO_POSITIONS_FAILED;

    constructor(public payload: any) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type SubscriptionActions
    = SubscribeToPositions
    | SubscribeToPositionsComplete
    | SubscribeToPositionsFailed;

