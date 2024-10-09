import { Action } from '@ngrx/store';
import * as fromModels from '../../models';


export enum CapitalFlowsActionTypes {

    LOAD_CAPITAL_FLOW_DATES = '[ClientSolutions] Load capital flows dates',
    LOAD_CAPITAL_FLOW_DATES_COMPLETE = '[ClientSolutions] Load capital flows dates complete',
    LOAD_CAPITAL_FLOW_DATES_FAILED = '[ClientSolutions] Load capital flows dates failed',

    LOAD_CAPITAL_FLOWS = '[ClientSolutions] Load capital flows',
    LOAD_CAPITAL_FLOWS_COMPLETE = '[ClientSolutions] Load capital flows complete',
    LOAD_CAPITAL_FLOWS_FAILED = '[ClientSolutions] Load Capital flows failed',

    LOAD_CAPITAL_FLOW_STATS = '[ClientSolutions] Load capital flow stats',
    LOAD_CAPITAL_FLOW_STATS_COMPLETE = '[ClientSolutions] Load capital flow stats complete',
    LOAD_CAPITAL_FLOW_STATS_FAILED = '[ClientSolutions] Load Capital flow stats failed',

    LOAD_PROJECTED_AUM = '[ClientSolutions] Load projected AUM',
    LOAD_PROJECTED_AUM_COMPLETE = '[ClientSolutions] Load projected AUM complete',
    LOAD_PROJECTED_AUM_FAILED = '[ClientSolutions] Load projected AUM failed',

    LOAD_CAPITAL_FLOW_FORM = '[ClientSolutions] Load capital flow form',
    LOAD_CAPITAL_FLOW_FORM_COMPLETE = '[ClientSolutions] Load capital flow form complete',
    LOAD_CAPITAL_FLOW_FORM_FAILED = '[ClientSolutions] Load capital flow form failed',

    ADD_CAPITAL_ACTIVITY = '[ClientSolutions] Add capital flow',
    ADD_CAPITAL_FLOW_COMPLETE = '[ClientSolutions] Add capital flow complete',
    ADD_CAPITAL_FLOW_FAILED = '[ClientSolutions] Add capital flow failed',

    UPDATE_CAPITAL_ACTIVITY = '[ClientSolutions] Update capital flow',
    UPDATE_CAPITAL_FLOW_COMPLETE = '[ClientSolutions] Update capital flow complete',
    UPDATE_CAPITAL_FLOW_FAILED = '[ClientSolutions] Update capital flow failed',

    DELETE_CAPITAL_ACTIVITY = '[ClientSolutions] Delete capital flow',
    DELETE_CAPITAL_FLOW_COMPLETE = '[ClientSolutions] Delete capital flow complete',
    DELETE_CAPITAL_FLOW_FAILED = '[ClientSolutions] Delete capital flow failed',

    SEND_CAPITAL_FLOW_EMAIL = '[ClientSolutions] Send capital flow email',
    SEND_CAPITAL_FLOW_EMAIL_COMPLETE = '[ClientSolutions] Send capital flow email complete',
    SEND_CAPITAL_FLOW_EMAIL_FAILED = '[ClientSolutions] Send capital flow email failed',

    GET_PERMISSIONS = '[ClientSolutions] Get can edit Capital Flows',
    GET_PERMISSIONS_COMPLETE = '[ClientSolutions] Get can edit Capital Flows complete',
    GET_PERMISSIONS_FAILED = '[ClientSolutions] Get can edit Capital Flows failed'

}

export class LoadCapitalFlowDates implements Action {
    readonly type = CapitalFlowsActionTypes.LOAD_CAPITAL_FLOW_DATES;
    constructor() { }
}

export class LoadCapitalFlowDatesComplete implements Action {
    readonly type = CapitalFlowsActionTypes.LOAD_CAPITAL_FLOW_DATES_COMPLETE;
    constructor(public payload: fromModels.DateRange) { }
}

export class LoadCapitalFlowDatesFailed implements Action {

    readonly type = CapitalFlowsActionTypes.LOAD_CAPITAL_FLOW_DATES_FAILED;

    constructor(public payload: string) { }
}

export class LoadCapitalFlows implements Action {

    readonly type = CapitalFlowsActionTypes.LOAD_CAPITAL_FLOWS;

    constructor(public payload: fromModels.DateRange) { }
}

export class LoadCapitalFlowsComplete implements Action {
    readonly type = CapitalFlowsActionTypes.LOAD_CAPITAL_FLOWS_COMPLETE;
    constructor(public payload: fromModels.CapitalFlow[]) { }
}

export class LoadCapitalFlowsFailed implements Action {
    readonly type = CapitalFlowsActionTypes.LOAD_CAPITAL_FLOWS_FAILED;
    constructor(public payload: string) { }
}


export class LoadCapitalFlowStats implements Action {

    readonly type = CapitalFlowsActionTypes.LOAD_CAPITAL_FLOW_STATS;

    constructor(public payload: fromModels.DateRange) { }
}

export class LoadCapitalFlowStatsComplete implements Action {
    readonly type = CapitalFlowsActionTypes.LOAD_CAPITAL_FLOW_STATS_COMPLETE;
    constructor(public payload: fromModels.CapitalFlowStats) { }
}

export class LoadCapitalFlowStatsFailed implements Action {
    readonly type = CapitalFlowsActionTypes.LOAD_CAPITAL_FLOW_STATS_FAILED;
    constructor(public payload: string) { }
}


export class LoadCapitalFlowProjectedAUM implements Action {

    readonly type = CapitalFlowsActionTypes.LOAD_PROJECTED_AUM;
}

export class LoadCapitalFlowProjectedAUMComplete implements Action {

    readonly type = CapitalFlowsActionTypes.LOAD_PROJECTED_AUM_COMPLETE;

    constructor(public payload: fromModels.ProjectedAUM) { }
}

export class LoadCapitalFlowProjectedAUMFailed implements Action {

    readonly type = CapitalFlowsActionTypes.LOAD_PROJECTED_AUM_FAILED;

    constructor(public payload: string) { }
}

export class LoadCapitalFlowForm implements Action {

    readonly type = CapitalFlowsActionTypes.LOAD_CAPITAL_FLOW_FORM;

    constructor() { }
}

export class LoadCapitalFlowFormComplete implements Action {

    readonly type = CapitalFlowsActionTypes.LOAD_CAPITAL_FLOW_FORM_COMPLETE;

    constructor(public payload: fromModels.CapitalFlowForm) { }
}

export class LoadCapitalFlowFormFailed implements Action {

    readonly type = CapitalFlowsActionTypes.LOAD_CAPITAL_FLOW_FORM_FAILED;

    constructor(public payload: string) { }
}


export class AddCapitalActivity implements Action {

    readonly type = CapitalFlowsActionTypes.ADD_CAPITAL_ACTIVITY;

    constructor(public payload: fromModels.CapitalActivity) { }
}

export class AddCapitalActivityComplete implements Action {
    readonly type = CapitalFlowsActionTypes.ADD_CAPITAL_FLOW_COMPLETE;
    constructor(public payload: fromModels.CapitalFlow[]) { }
}

export class AddCapitalActivityFailed implements Action {
    readonly type = CapitalFlowsActionTypes.ADD_CAPITAL_FLOW_FAILED;
    constructor(public payload: string) { }
}

export class UpdateCapitalActivity implements Action {

    readonly type = CapitalFlowsActionTypes.UPDATE_CAPITAL_ACTIVITY;

    constructor(public payload: fromModels.CapitalActivity) { }
}

export class UpdateCapitalActivityComplete implements Action {
    readonly type = CapitalFlowsActionTypes.UPDATE_CAPITAL_FLOW_COMPLETE;
    constructor(public payload: fromModels.CapitalFlow[]) { }
}

export class UpdateCapitalActivityFailed implements Action {
    readonly type = CapitalFlowsActionTypes.UPDATE_CAPITAL_FLOW_FAILED;
    constructor(public payload: string) { }
}

export class DeleteCapitalActivity implements Action {

    readonly type = CapitalFlowsActionTypes.DELETE_CAPITAL_ACTIVITY;

    constructor(public payload: fromModels.CapitalActivity) { }
}

export class DeleteCapitalActivityComplete implements Action {
    readonly type = CapitalFlowsActionTypes.DELETE_CAPITAL_FLOW_COMPLETE;
    constructor(public payload: fromModels.CapitalFlow[]) { }
}

export class DeleteCapitalActivityFailed implements Action {
    readonly type = CapitalFlowsActionTypes.DELETE_CAPITAL_FLOW_FAILED;
    constructor(public payload: string) { }
}

export class SendCapitalFlowEmail implements Action {
    readonly type = CapitalFlowsActionTypes.SEND_CAPITAL_FLOW_EMAIL;
    constructor() { }
}

export class SendCapitalFlowEmailComplete implements Action {
    readonly type = CapitalFlowsActionTypes.SEND_CAPITAL_FLOW_EMAIL_COMPLETE;
    constructor() { }
}

export class SendCapitalFlowEmailFailed implements Action {
    readonly type = CapitalFlowsActionTypes.SEND_CAPITAL_FLOW_EMAIL_FAILED;
    constructor(public payload: string) { }
}

export class CanEditCapitalFlows implements Action {
    readonly type = CapitalFlowsActionTypes.GET_PERMISSIONS;
    constructor() { }
}

export class CanEditCapitalFlowsComplete implements Action {
    readonly type = CapitalFlowsActionTypes.GET_PERMISSIONS_COMPLETE;
    constructor(public payload: boolean) { }
}

export class CanEditCapitalFlowsFailed implements Action {
    readonly type = CapitalFlowsActionTypes.GET_PERMISSIONS_FAILED;
    constructor(public payload: string) { }
}

export type CapitalFlowsActions
    = LoadCapitalFlowDates
    | LoadCapitalFlowDatesComplete
    | LoadCapitalFlowDatesFailed

    | LoadCapitalFlows
    | LoadCapitalFlowsComplete
    | LoadCapitalFlowsFailed

    | LoadCapitalFlowStats
    | LoadCapitalFlowStatsComplete
    | LoadCapitalFlowStatsFailed

    | LoadCapitalFlowProjectedAUM
    | LoadCapitalFlowProjectedAUMComplete
    | LoadCapitalFlowProjectedAUMFailed

    | LoadCapitalFlowForm
    | LoadCapitalFlowFormComplete
    | LoadCapitalFlowFormFailed

    | AddCapitalActivity
    | AddCapitalActivityComplete
    | AddCapitalActivityFailed

    | UpdateCapitalActivity
    | UpdateCapitalActivityComplete
    | UpdateCapitalActivityFailed

    | DeleteCapitalActivity
    | DeleteCapitalActivityComplete
    | DeleteCapitalActivityFailed

    | CanEditCapitalFlows
    | CanEditCapitalFlowsComplete
    | CanEditCapitalFlowsFailed

    | SendCapitalFlowEmail
    | SendCapitalFlowEmailComplete
    | SendCapitalFlowEmailFailed;
