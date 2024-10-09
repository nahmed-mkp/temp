import { createFeatureSelector } from '@ngrx/store';

import * as fromRoot from './../../../../store';
import * as fromDailyTracking from './daily-tracking.reducer';

export interface DailyTrackingState {
    main: fromDailyTracking.State;
}

export interface State extends fromRoot.RootState {
    dailyTracking: DailyTrackingState;
}

export const reducers = {
    main: fromDailyTracking.reducer
};

export const getDailyTrackingState = createFeatureSelector<DailyTrackingState>('dailyTracking');
