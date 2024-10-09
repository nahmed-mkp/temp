import { Action } from '@ngrx/store';

import * as fromModels from './../../models/chart.models';

export enum ResearchChartActionTypes {

    LOAD_CHART_PACKS = '[ResearchCharts] Load Chart Packs',
    LOAD_CHART_PACKS_COMPLETE = '[ResearchCharts] Load Chart Packs complete',
    LOAD_CHART_PACKS_FAILED = '[ResearchCharts] Load Chart Packs failed',

    LOAD_CHART_PACK = '[ResearchCharts] Load Chart Pack',
    LOAD_CHART_PACK_COMPLETE = '[ResearchCharts] Load Chart Pack complete',
    LOAD_CHART_PACK_FAILED = '[ResearchCharts] Load Chart Pack failed'
}

export class LoadChartPacks implements Action {
    readonly type = ResearchChartActionTypes.LOAD_CHART_PACKS;
}

export class LoadChartPacksComplete implements Action {
    readonly type = ResearchChartActionTypes.LOAD_CHART_PACKS_COMPLETE;

    constructor(public payload: fromModels.IChartPack[]) { }
}

export class LoadChartPacksFailed implements Action {

    readonly type = ResearchChartActionTypes.LOAD_CHART_PACKS_FAILED;

    constructor(public payload: string) { }
}

export class LoadChartPack implements Action {
    readonly type = ResearchChartActionTypes.LOAD_CHART_PACK;

    constructor(public payload: string) { }
}

export class LoadChartPackComplete implements Action {
    readonly type = ResearchChartActionTypes.LOAD_CHART_PACK_COMPLETE;

    constructor(public chartPack: string, public payload: fromModels.ISubChart[]) { }
}

export class LoadChartPackFailed implements Action {

    readonly type = ResearchChartActionTypes.LOAD_CHART_PACK_FAILED;

    constructor(public chartPack: string, public payload: string) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type ResearchChartActions
    = LoadChartPacks
    | LoadChartPacksComplete
    | LoadChartPacksFailed
    
    | LoadChartPack
    | LoadChartPackComplete
    | LoadChartPackFailed;

