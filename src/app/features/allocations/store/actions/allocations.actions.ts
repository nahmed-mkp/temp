import { Action } from '@ngrx/store';

import * as fromModels from '../../models/allocations.models';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum AllocationActionTypes {

    LOAD_ALLOCATION_TRIGGERS = '[Allocation] Load allocation triggers',
    LOAD_ALLOCATION_TRIGGERS_COMPLETE = '[Agreements] Load allocation triggers complete',
    LOAD_ALLOCATION_TRIGGERS_FAILED = '[Agreements] Load allocation triggers failed',

    SELECT_ALLOCATION_TRIGGER = '[Agreements] Select allocation trigger'
}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */
export class LoadAllocationTriggers implements Action {
    readonly type = AllocationActionTypes.LOAD_ALLOCATION_TRIGGERS;
}

export class LoadAllocationTriggersComplete implements Action {
    readonly type = AllocationActionTypes.LOAD_ALLOCATION_TRIGGERS_COMPLETE;

    constructor(public payload: fromModels.IAllocationTrigger[]) { }
}

export class LoadAllocationTriggersFailed implements Action {
    readonly type = AllocationActionTypes.LOAD_ALLOCATION_TRIGGERS_FAILED;

    constructor(public payload: string) { }
}

export class SelectAllocationTrigger implements Action {
    readonly type = AllocationActionTypes.SELECT_ALLOCATION_TRIGGER;

    constructor(public payload: fromModels.IAllocationTrigger) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type AllocationActions
    = LoadAllocationTriggers
    | LoadAllocationTriggersComplete
    | LoadAllocationTriggersFailed

    | SelectAllocationTrigger;
