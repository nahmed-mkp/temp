import { Action } from '@ngrx/store';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum CounterpartyExposureActionTypes {

    LOAD_COUNTERPARTIES = '[CounterpartyExposure] Load counterparties',
    LOAD_COUNTERPARTIES_COMPLETE = '[CounterpartyExposure] Load counterparties complete',

    LOAD_COUNTERPARTY_CDS_SPREADS = '[CounterpartyExposure] Load counterparty cds spreads',
    LOAD_COUNTERPARTY_CDS_SPREADS_COMPLETE = '[CounterpartyExposure] Load counterparty cds spreads complete',
    LOAD_COUNTERPARTY_CDS_SPREADS_FAILED = '[CounterpartyExposure] Load counterparty cds spreads failed'
}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */

export class LoadCounterpartyCDSSpreads implements Action {
    readonly type = CounterpartyExposureActionTypes.LOAD_COUNTERPARTY_CDS_SPREADS;

    constructor() { }
}

export class LoadCounterpartyCDSSpreadsComplete implements Action {
    readonly type = CounterpartyExposureActionTypes.LOAD_COUNTERPARTY_CDS_SPREADS_COMPLETE;

    constructor(public payload: any[]) { }
}

export class LoadCounterpartyCDSSpreadsFailed implements Action {
    readonly type = CounterpartyExposureActionTypes.LOAD_COUNTERPARTY_CDS_SPREADS_FAILED

    constructor(public payload: string) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type CounterpartyExposureActions
    = LoadCounterpartyCDSSpreads
    | LoadCounterpartyCDSSpreadsComplete
    | LoadCounterpartyCDSSpreadsFailed;
