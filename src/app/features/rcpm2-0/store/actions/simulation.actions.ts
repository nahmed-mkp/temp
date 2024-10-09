import { Action } from '@ngrx/store';

import * as fromModels from './../../models/position.models';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */

export enum SimulationActionTypes {

    LOAD_DAILY_SIMULATION = '[Simulations] Load daily simulations',
    LOAD_DAILY_SIMULATION_COMPLETE = '[Simulations] Load daily simulations complete',
    LOAD_DAILY_SIMULATION_FAILED = '[Simulations] Load daily simulations failed',

    LOAD_MONTHLY_SIMULATION = '[Simulations] Load monthly simulations',
    LOAD_MONTHLY_SIMULATION_COMPLETE = '[Simulations] Load monthly simulations complete',
    LOAD_MONTHLY_SIMULATION_FAILED = '[Simulations] Load monthly simulations failed',

    LOAD_QUARTERLY_SIMULATION = '[Simulations] Load quarterly simulations',
    LOAD_QUARTERLY_SIMULATION_COMPLETE = '[Simulations] Load quarterly simulations complete',
    LOAD_QUARTERLY_SIMULATION_FAILED = '[Simulations] Load quarterly simulations failed',

}

export class LoadDailySimulations {
    readonly type = SimulationActionTypes.LOAD_DAILY_SIMULATION;
    constructor(public payload: fromModels.DataPath) { }
}

export class LoadDailySimulationsComplete {
    readonly type = SimulationActionTypes.LOAD_DAILY_SIMULATION_COMPLETE;
    constructor(public payload: {layout: string; data: any}) { }
}

export class LoadDailySimulationsFailed {

    readonly type = SimulationActionTypes.LOAD_DAILY_SIMULATION_FAILED;
    constructor(public payload: {layout: string; error: string}) { }
}




export class LoadMonthlySimulations {
    readonly type = SimulationActionTypes.LOAD_MONTHLY_SIMULATION;
    constructor(public payload: fromModels.DataPath) { }
}

export class LoadMonthlySimulationsComplete {
    readonly type = SimulationActionTypes.LOAD_MONTHLY_SIMULATION_COMPLETE;
    constructor(public payload: {layout: string; data: any}) { }
}

export class LoadMonthlySimulationsFailed {

    readonly type = SimulationActionTypes.LOAD_MONTHLY_SIMULATION_FAILED;
    constructor(public payload: {layout: string; error: string}) { }
}





export class LoadQuarterlySimulations {
    readonly type = SimulationActionTypes.LOAD_QUARTERLY_SIMULATION;
    constructor(public payload: fromModels.DataPath) { }
}

export class LoadQuarterlySimulationsComplete {
    readonly type = SimulationActionTypes.LOAD_QUARTERLY_SIMULATION_COMPLETE;
    constructor(public payload: {layout: string; data: any}) { }
}

export class LoadQuarterlySimulationsFailed {

    readonly type = SimulationActionTypes.LOAD_QUARTERLY_SIMULATION_FAILED;
    constructor(public payload: {layout: string; error: string}) { }
}





export type SimulationActions
    = LoadDailySimulations
    | LoadDailySimulationsComplete
    | LoadDailySimulationsFailed

    | LoadMonthlySimulations
    | LoadMonthlySimulationsComplete
    | LoadMonthlySimulationsFailed

    | LoadQuarterlySimulations
    | LoadQuarterlySimulationsComplete
    | LoadQuarterlySimulationsFailed;
