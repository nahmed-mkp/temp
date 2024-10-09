import { createFeatureSelector } from '@ngrx/store';
import * as fromRoot from './../../../../store';
import * as fromScenarioManagment from './scenario-management.reducer';

export interface ScenarioManagementState {
    scenarioManagement: fromScenarioManagment.State;
}

export interface State extends fromRoot.RootState {
    'scenarioManagement': ScenarioManagementState;
}

export const reducers = {
    scenarioManagement: fromScenarioManagment.reducer
};

export const getState = createFeatureSelector<ScenarioManagementState>('scenarioManagement');
