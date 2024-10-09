import { createFeatureSelector } from '@ngrx/store';

import * as fromRoot from './../../../../store';
import * as fromEventAnalysis from './event-analysis.reducers';

export interface EventAnalysisState {
    eventAnalysis: fromEventAnalysis.State
}

export interface state extends fromRoot.RootState {
    eventAnalysis: EventAnalysisState
}

export const reducers = {
    eventAnalysis: fromEventAnalysis.reducer
}

export const getEventAnalysisState = createFeatureSelector<EventAnalysisState>('eventAnalysis');