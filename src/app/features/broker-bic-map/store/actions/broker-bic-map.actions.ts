import { Action } from '@ngrx/store';

import * as fromModels from '../../models';


/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum BrokerBicMapActionTypes {
    LOAD_BROKER_LIST = '[BrokerBicMap] Load broker list',
    LOAD_BROKER_LIST_COMPLETE = '[BrokerBicMap] Load broker list complete',
    LOAD_BROKER_LIST_FAILIED = '[BrokerBicMap] Load broker list fail',

    // LOAD_BROKER_DETAIL = '[BrokerBicMap] Load broker detail',
    // LOAD_BROKER_DETAIL_COMPLETE = '[BrokerBicMap] Load broker detail complete',
    // LOAD_BROKER_DETAIL_FAILIED = '[BrokerBicMap] Load broker detail fail',

    UPDATE_BROKER_DETAIL = '[BrokerBicMap] Update broker detail',
    UPDATE_BROKER_DETAIL_COMPLETE = '[BrokerBicMap] Update broker detail complete',
    UPDATE_BROKER_DETAIL_FAILIED = '[BrokerBicMap] Update broker detail fail',
}


/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */

export class LoadBrokerList implements Action {
    readonly type = BrokerBicMapActionTypes.LOAD_BROKER_LIST;
}

export class LoadBrokerListComplete implements Action {
    readonly type = BrokerBicMapActionTypes.LOAD_BROKER_LIST_COMPLETE;

    constructor(public payload: fromModels.IBroker[]) { }
}

export class LoadBrokerListFailed implements Action {
    readonly type = BrokerBicMapActionTypes.LOAD_BROKER_LIST_FAILIED;

    constructor(public payload: string) { }
}






// export class LoadBrokerDetail implements Action {
//     readonly type = BrokerBicMapActionTypes.LOAD_BROKER_DETAIL;

//     constructor(public payload: string) { }
// }

// export class LoadBrokerDetailComplete implements Action {
//     readonly type = BrokerBicMapActionTypes.LOAD_BROKER_DETAIL_COMPLETE;

//     constructor(public payload: any) { }
// }

// export class LoadBrokerDetailFailed implements Action {
//     readonly type = BrokerBicMapActionTypes.LOAD_BROKER_DETAIL_FAILIED;

//     constructor(public payload: any) { }
// }






export class UpdateBrokerDetail implements Action {
    readonly type = BrokerBicMapActionTypes.UPDATE_BROKER_DETAIL;

    constructor(public payload: fromModels.IBroker) { }
}

export class UpdateBrokerDetailComplete implements Action {
    readonly type = BrokerBicMapActionTypes.UPDATE_BROKER_DETAIL_COMPLETE;

    constructor(public payload: fromModels.IBroker) { }
}

export class UpdateBrokerDetailFailed implements Action {
    readonly type = BrokerBicMapActionTypes.UPDATE_BROKER_DETAIL_FAILIED;

    constructor(public payload: string) { }
}









/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type BrokerBicMapActions
    = LoadBrokerList
    | LoadBrokerListComplete
    | LoadBrokerListFailed

    // | LoadBrokerDetail
    // | LoadBrokerDetailComplete
    // | LoadBrokerDetailFailed

    | UpdateBrokerDetail
    | UpdateBrokerDetailComplete
    | UpdateBrokerDetailFailed
    ;