import { createFeatureSelector } from '@ngrx/store';

import * as fromRoot from './../../../../store';
import * as fromRiskSpan from './risk-span.reducer';

export interface RiskSpanState {
    riskSpan: fromRiskSpan.RiskSpanState;
}

export interface State extends fromRoot.RootState {
    riskSpan: RiskSpanState;
}

export const reducers = {
    riskSpan: fromRiskSpan.reducer
};

export const getRiskSpanFeatureState = createFeatureSelector<RiskSpanState>('riskSpan');
