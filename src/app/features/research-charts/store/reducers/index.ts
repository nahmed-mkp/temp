import { createFeatureSelector } from '@ngrx/store';

import * as fromRoot from './../../../../store';
import * as fromResearchCharts from './chart.reducer';

export interface ResearchChartsState {
    researchCharts: fromResearchCharts.State;
}

export interface State extends fromRoot.RootState {
    researchCharts: ResearchChartsState;
}

export const reducers = {
    researchCharts: fromResearchCharts.reducer
};

export const getResearchChartsFeatureState = createFeatureSelector<ResearchChartsState>('researchCharts');
