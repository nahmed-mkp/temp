import { createFeatureSelector } from '@ngrx/store';

import * as fromRoot from './../../../../store';
import * as fromBenchmarkMonitor from './benchmark-monitor.reducer';

export interface BenchmarkMonitorState {
    main: fromBenchmarkMonitor.State;
}

export interface state extends fromRoot.RootState {
    benchmarkMonitor: BenchmarkMonitorState;
}

export const reducers = {
    main: fromBenchmarkMonitor.reducer
}

export const getDailyTrackingState = createFeatureSelector<BenchmarkMonitorState>('benchmarkMonitor');