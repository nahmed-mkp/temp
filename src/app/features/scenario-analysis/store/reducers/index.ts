import { createFeatureSelector } from '@ngrx/store';
import * as fromRoot from './../../../../store';
import * as fromScenarioAnalysis from './scenario-analysis.reducer';

export interface ScenarioAnalysisState {
    scenarioAnalysis: fromScenarioAnalysis.State;
}

export interface State extends fromRoot.RootState {
    scenarioAnalysis: ScenarioAnalysisState;
}

export const reducers = {
    scenarioAnalysis: fromScenarioAnalysis.reducer
};

export const getScenarioAnalysisState = createFeatureSelector<ScenarioAnalysisState>('scenarioAnalysis');
