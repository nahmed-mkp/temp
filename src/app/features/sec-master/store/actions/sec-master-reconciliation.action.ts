import { Action } from '@ngrx/store';

import * as fromModels from '../../models';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum SecMasterReconciliationActionTypes {

    SET_ONLY_DIFFERENT_COLUMN_VISIBILITY = '[Sec Master] set only different column visibility',

    LOAD_RECONCILIATION = '[Sec Master] Load Reconciliation ',
    LOAD_RECONCILIATION_COMPLETE = '[Sec Master] Load Reconciliation complete',
    LOAD_RECONCILIATION_FAILED = '[Sec Master] Load Reconciliation Failed',

    PREPARE_LOAD_RECONCILIATION_SECURITY_DETAIL = '[Sec Master] Prepare Load Reconciliation Security detail',
    LOAD_RECONCILIATION_SECURITY_DETAIL = '[Sec Master] Load Reconciliation Security detail',
    LOAD_RECONCILIATION_SECURITY_DETAIL_COMPLETE = '[Sec Master] Load Reconciliation Security detail complete',
    LOAD_RECONCILIATION_SECURITY_DETAIL_FAILED = '[Sec Master] Load Reconciliation Security detail failed',
}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */

export class SetOnlyDifferentColumnVisibility implements Action {
    readonly type = SecMasterReconciliationActionTypes.SET_ONLY_DIFFERENT_COLUMN_VISIBILITY;

    constructor(public payload: boolean) {}
}








export class LoadReconciliation implements Action {
    readonly type = SecMasterReconciliationActionTypes.LOAD_RECONCILIATION;

    constructor(public payload: fromModels.ISecMasterRecInput) {}
}

export class LoadReconciliationComplete implements Action {
    readonly type = SecMasterReconciliationActionTypes.LOAD_RECONCILIATION_COMPLETE;

    constructor(public payload: any) { }
}

export class LoadReconciliationFailed implements Action {
    readonly type = SecMasterReconciliationActionTypes.LOAD_RECONCILIATION_FAILED;

    constructor(public payload: string) { }
}







export class PrepareLoadReconciliationSecurityDetail implements Action {
    readonly type = SecMasterReconciliationActionTypes.PREPARE_LOAD_RECONCILIATION_SECURITY_DETAIL;

    constructor(public payload: {securityName: string, match: boolean}) {}
}


export class LoadReconciliationSecurityDetail implements Action {
    readonly type = SecMasterReconciliationActionTypes.LOAD_RECONCILIATION_SECURITY_DETAIL;

    constructor(public payload: fromModels.ISecMasterRecInput) {}
}

export class LoadReconciliationSecurityDetailComplete implements Action {
    readonly type = SecMasterReconciliationActionTypes.LOAD_RECONCILIATION_SECURITY_DETAIL_COMPLETE;

    constructor(public payload: any) { }
}

export class LoadReconciliationSecurityDetailFailed implements Action {
    readonly type = SecMasterReconciliationActionTypes.LOAD_RECONCILIATION_SECURITY_DETAIL_FAILED;

    constructor(public payload: any) { }
}



/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type SecMasterReconciliationActions
    = SetOnlyDifferentColumnVisibility
    | LoadReconciliation
    | LoadReconciliationComplete
    | LoadReconciliationFailed

    | PrepareLoadReconciliationSecurityDetail
    | LoadReconciliationSecurityDetail
    | LoadReconciliationSecurityDetailComplete
    | LoadReconciliationSecurityDetailFailed;



