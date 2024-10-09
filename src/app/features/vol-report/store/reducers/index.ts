import { createFeatureSelector } from '@ngrx/store';

import * as fromRoot from './../../../../store';
import * as fromVolReport from './vol-report.reducer';

export interface VolReportState {
    volReport: fromVolReport.State
}

export interface state extends fromRoot.RootState {
    volReport: VolReportState
}

export const reducers = {
    volReport: fromVolReport.reducer
}

export const getVolReportState = createFeatureSelector<VolReportState>('volReport');