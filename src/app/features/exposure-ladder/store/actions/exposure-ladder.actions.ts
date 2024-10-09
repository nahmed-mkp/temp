import { Action } from '@ngrx/store';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */

 export enum ExposureLadderActionTypes {

    LOAD_EXPOSURE_AS_OF_DATES = '[Exposure Ladder] Load exposure as of dates',
    LOAD_EXPOSURE_AS_OF_DATES_COMPLETE = '[Exposure Ladder] Load exposure as of dates complete',
    LOAD_EXPOSURE_AS_OF_DATES_FAILED = '[Exposure Ladder] Load exposure as of dates failed',

    LOAD_EXPOSURE_LADDER = '[Exposure Ladder] Load exposure ladder',
    LOAD_EXPOSURE_LADDER_COMPLETE = '[Exposure Ladder] Load exposure ladder complete',
    LOAD_EXPOSURE_LADDER_FAILED = '[Exposure Ladder] Load exposure ladder failed',

 }

 export class LoadExposureLadder implements Action {
     readonly type = ExposureLadderActionTypes.LOAD_EXPOSURE_LADDER;
 }

 export class LoadExposureLadderComplete implements Action {
    readonly type = ExposureLadderActionTypes.LOAD_EXPOSURE_LADDER_COMPLETE;
    
    constructor(public payload: {asOfDate: string; data: any}) {}
}

export class LoadExposureLadderFailed implements Action {
    readonly type = ExposureLadderActionTypes.LOAD_EXPOSURE_LADDER_FAILED;

    constructor(public payload: string) { }
}

export class LoadExposureAsOfDates implements Action {
    readonly type = ExposureLadderActionTypes.LOAD_EXPOSURE_AS_OF_DATES;
}

export class LoadExposureAsOfDatesComplete implements Action {
   readonly type = ExposureLadderActionTypes.LOAD_EXPOSURE_AS_OF_DATES_COMPLETE;

   constructor(public payload: string[]) {}
}

export class LoadExposureAsOfDatesFailed implements Action {
   readonly type = ExposureLadderActionTypes.LOAD_EXPOSURE_AS_OF_DATES_FAILED;

   constructor(public payload: string) { }
}


export type ExposureLadderActions
    = LoadExposureLadder
    | LoadExposureLadderComplete
    | LoadExposureLadderFailed

    | LoadExposureAsOfDates
    | LoadExposureAsOfDatesComplete
    | LoadExposureAsOfDatesFailed;
