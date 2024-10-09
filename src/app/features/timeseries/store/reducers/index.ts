import { createFeatureSelector } from '@ngrx/store';

import * as fromRoot from './../../../../store';
import * as fromTimeseries from './timeseries.reducer';

export interface TimeseriesState {
    timeseries: fromTimeseries.State;
}

export interface State extends fromRoot.RootState {
    'timeseries': TimeseriesState;
}

export const reducers = {
    timeseries: fromTimeseries.reducer
};

export const getState = createFeatureSelector<TimeseriesState>('timeseries');
