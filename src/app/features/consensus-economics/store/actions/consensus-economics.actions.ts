import { Action } from '@ngrx/store';

import * as fromModels from '../../models';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum ConsensusEconomicsActionTypes {

    LOAD_EXTRACTION_DATES = '[ConsensusEconomics] Load extraction dates',
    LOAD_EXTRACTION_DATES_COMPLETE = '[ConsensusEconomics] Load extraction dates complete',
    LOAD_EXTRACTION_DATES_FAILED = '[ConsensusEconomics] Load extraction dates failed',

    LOAD_CONSTITUENTS_DATES = '[ConsensusEconomics] Load extraction dates',
    LOAD_CONSTITUENTS_DATES_COMPLETE = '[ConsensusEconomics] Load extraction dates complete',
    LOAD_CONSTITUENTS_DATES_FAILED = '[ConsensusEconomics] Load extraction dates failed',

    LOAD_ANNUAL_EXTRACTIONS = '[ConsensusEconomics] Load annual extractions',
    LOAD_ANNUAL_EXTRACTIONS_COMPLETE = '[ConsensusEconomics] Load annual extractions complete',
    LOAD_ANNUAL_EXTRACTIONS_FAILED = '[ConsensusEconomics] Load annual extractions failed',

    LOAD_QUARTERLY_EXTRACTIONS = '[ConsensusEconomics] Load quarterly extractions',
    LOAD_QUARTERLY_EXTRACTIONS_COMPLETE = '[ConsensusEconomics] Load quarterly extractions complete',
    LOAD_QUARTERLY_EXTRACTIONS_FAILED = '[ConsensusEconomics] Load quarterly extractions failed',

    LOAD_ANNUAL_CONSTITUENTS = '[ConsensusEconomics] Load annual constituents',
    LOAD_ANNUAL_CONSTITUENTS_COMPLETE = '[ConsensusEconomics] Load annual constituents complete',
    LOAD_ANNUAL_CONSTITUENTS_FAILED = '[ConsensusEconomics] Load annual constituents failed',

    LOAD_QUARTERLY_CONSTITUENTS = '[ConsensusEconomics] Load quarterly constituents',
    LOAD_QUARTERLY_CONSTITUENTS_COMPLETE = '[ConsensusEconomics] Load quarterly constituents complete',
    LOAD_QUARTERLY_CONSTITUENTS_FAILED = '[ConsensusEconomics] Load quarterly constituents failed',
}


/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */
export class LoadExtractionDates implements Action {
    readonly type = ConsensusEconomicsActionTypes.LOAD_EXTRACTION_DATES;
}

export class LoadExtractionDatesComplete implements Action {
    readonly type = ConsensusEconomicsActionTypes.LOAD_EXTRACTION_DATES_COMPLETE;

    constructor(public payload: string[]) { }
}

export class LoadExtractionDatesFailed implements Action {
    readonly type = ConsensusEconomicsActionTypes.LOAD_EXTRACTION_DATES_FAILED;

    constructor(public payload: string) { }
}

export class LoadAnnualExtractions implements Action {
    readonly type = ConsensusEconomicsActionTypes.LOAD_ANNUAL_EXTRACTIONS;

    constructor(public payload: fromModels.IExtractionRequest) { }
}

export class LoadAnnualExtractionsComplete implements Action {
    readonly type = ConsensusEconomicsActionTypes.LOAD_ANNUAL_EXTRACTIONS_COMPLETE;

    constructor(public payload: fromModels.IExtractionDataAnnual[]) { }
}

export class LoadAnnualExtractionsFailed implements Action {
    readonly type = ConsensusEconomicsActionTypes.LOAD_ANNUAL_EXTRACTIONS_FAILED;

    constructor(public payload: string) { }
}

export class LoadQuarterlyExtractions implements Action {
    readonly type = ConsensusEconomicsActionTypes.LOAD_QUARTERLY_EXTRACTIONS;

    constructor(public payload: fromModels.IExtractionRequest) { }
}

export class LoadQuarterlyExtractionsComplete implements Action {
    readonly type = ConsensusEconomicsActionTypes.LOAD_QUARTERLY_EXTRACTIONS_COMPLETE;

    constructor(public payload: fromModels.IExtractionDataQuarterly[]) { }
}

export class LoadQuarterlyExtractionsFailed implements Action {
    readonly type = ConsensusEconomicsActionTypes.LOAD_QUARTERLY_EXTRACTIONS_FAILED;

    constructor(public payload: string) { }
}

export class LoadConstituentsDates implements Action {
    readonly type = ConsensusEconomicsActionTypes.LOAD_CONSTITUENTS_DATES;
}

export class LoadConstituentsDatesComplete implements Action {
    readonly type = ConsensusEconomicsActionTypes.LOAD_CONSTITUENTS_DATES_COMPLETE;

    constructor(public payload: string[]) { }
}

export class LoadConstituentsDatesFailed implements Action {
    readonly type = ConsensusEconomicsActionTypes.LOAD_CONSTITUENTS_DATES_FAILED;

    constructor(public payload: string) { }
}

export class LoadAnnualConstituents implements Action {
    readonly type = ConsensusEconomicsActionTypes.LOAD_ANNUAL_CONSTITUENTS;

    constructor(public payload: fromModels.IConstituentRequest) { }
}

export class LoadAnnualConstituentsComplete implements Action {
    readonly type = ConsensusEconomicsActionTypes.LOAD_ANNUAL_CONSTITUENTS_COMPLETE;

    constructor(public payload: fromModels.IConstituentDataAnnual[]) { }
}

export class LoadAnnualConstituentsFailed implements Action {
    readonly type = ConsensusEconomicsActionTypes.LOAD_ANNUAL_CONSTITUENTS_FAILED;

    constructor(public payload: string) { }
}

export class LoadQuarterlyConstituents implements Action {
    readonly type = ConsensusEconomicsActionTypes.LOAD_QUARTERLY_CONSTITUENTS;

    constructor(public payload: fromModels.IConstituentRequest) { }
}

export class LoadQuarterlyConstituentsComplete implements Action {
    readonly type = ConsensusEconomicsActionTypes.LOAD_QUARTERLY_CONSTITUENTS_COMPLETE;

    constructor(public payload: fromModels.IConstituentDataQuarterly[]) { }
}

export class LoadQuarterlyConstituentsFailed implements Action {
    readonly type = ConsensusEconomicsActionTypes.LOAD_QUARTERLY_CONSTITUENTS_FAILED;

    constructor(public payload: string) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type ConsensusEconomicsActions
    = LoadExtractionDates
    | LoadExtractionDatesComplete
    | LoadExtractionDatesFailed

    | LoadAnnualExtractions
    | LoadAnnualExtractionsComplete
    | LoadAnnualExtractionsFailed

    | LoadQuarterlyExtractions
    | LoadQuarterlyExtractionsComplete
    | LoadQuarterlyExtractionsFailed

    | LoadConstituentsDates
    | LoadConstituentsDatesComplete
    | LoadConstituentsDatesFailed

    | LoadAnnualConstituents
    | LoadAnnualConstituentsComplete
    | LoadAnnualConstituentsFailed

    | LoadQuarterlyConstituents
    | LoadQuarterlyConstituentsComplete
    | LoadQuarterlyConstituentsFailed;
