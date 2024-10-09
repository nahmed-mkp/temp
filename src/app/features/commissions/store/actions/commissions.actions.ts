import { Action } from '@ngrx/store';

import * as fromModels from '../../models';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */

export enum CommissionsActionTypes {

    LOAD_COMMISSIONS_SCHEDULE = '[Commissions] Load commissions schedule',
    LOAD_COMMISSIONS_SCHEDULE_COMPLETE = '[Commissions] Load commissions schedule complete',
    LOAD_COMMISSIONS_SCHEDULE_FAILED = '[Commissions] Load commissions schedule failed',

    DOWNLOAD_COMMISSIONS_SCHEDULE = '[Commissions] Download commissions',
    DOWNLOAD_COMMISSIONS_SCHEDULE_COMPLETE = '[Commissions] Download commissions complete',
    DOWNLOAD_COMMISSIONS_SCHEDULE_FAILED = '[Commissions] Download commissions failed',

    UPDATE_COMMISSIONS_SCHEDULE = '[Commissions] Update commissions schedule',
    UPDATE_COMMISSIONS_SCHEDULE_COMPLETE = '[Commissions] Update commissions schedule complete',
    UPDATE_COMMISSIONS_SCHEDULE_FAILED = '[Commissions] Update commissions schedule failed'

}



/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */
export class LoadCommissionsSchedule implements Action {
    readonly type = CommissionsActionTypes.LOAD_COMMISSIONS_SCHEDULE;

    constructor() { }
}

export class LoadCommissionsScheduleComplete implements Action {
    readonly type = CommissionsActionTypes.LOAD_COMMISSIONS_SCHEDULE_COMPLETE;

    constructor(public payload: fromModels.ICommission[]) { }
}

export class LoadCommissionsScheduleFailed implements Action {
    readonly type = CommissionsActionTypes.LOAD_COMMISSIONS_SCHEDULE_FAILED;

    constructor(public payload?: any) { }
}

export class DownloadCommissionsSchedule implements Action {
    readonly type = CommissionsActionTypes.DOWNLOAD_COMMISSIONS_SCHEDULE;

    constructor() { }
}

export class DownloadCommissionsScheduleComplete implements Action {
    readonly type = CommissionsActionTypes.DOWNLOAD_COMMISSIONS_SCHEDULE_COMPLETE ;
}

export class DownloadCommissionsScheduleFailed implements Action {
    readonly type = CommissionsActionTypes.DOWNLOAD_COMMISSIONS_SCHEDULE_FAILED;

    constructor(public payload?: any) { }
}


export class UpdateCommissionsSchedule implements Action {
    readonly type = CommissionsActionTypes.UPDATE_COMMISSIONS_SCHEDULE;

    constructor() { }
}

export class UpdateCommissionsScheduleComplete implements Action {
    readonly type = CommissionsActionTypes.UPDATE_COMMISSIONS_SCHEDULE_COMPLETE;

    constructor(public payload: fromModels.ICommission[]) { }
}

export class UpdateCommissionsScheduleFailed implements Action {
    readonly type = CommissionsActionTypes.UPDATE_COMMISSIONS_SCHEDULE_FAILED;

    constructor(public payload?: any) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type CommissionsActions
    = LoadCommissionsSchedule
    | LoadCommissionsScheduleComplete
    | LoadCommissionsScheduleFailed

    | UpdateCommissionsSchedule
    | UpdateCommissionsScheduleComplete
    | UpdateCommissionsScheduleFailed

    | DownloadCommissionsSchedule
    | DownloadCommissionsScheduleComplete
    | DownloadCommissionsScheduleFailed;

