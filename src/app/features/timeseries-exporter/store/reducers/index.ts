import { createFeatureSelector } from '@ngrx/store';

import * as fromRoot from './../../../../store';
import * as fromTimeseriesExporter from './timeseries-exporter.reducer';
import * as fromSearch from './search.reducer';

export interface TimeseriesExporterState {
    timeseriesExporter: fromTimeseriesExporter.State;
    search: fromSearch.State;
}

export interface State extends fromRoot.RootState {
    timeseriesExporter: TimeseriesExporterState;
}

export const reducers = {
    timeseriesExporter: fromTimeseriesExporter.reducer,
    search: fromSearch.reducer
};

export const getTimeseriesExporterFeatureState = createFeatureSelector<TimeseriesExporterState>('timeseriesExporter');
