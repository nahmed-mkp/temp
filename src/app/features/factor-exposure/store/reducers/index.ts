import { createFeatureSelector } from '@ngrx/store';

import * as fromRoot from '../../../../store';
import * as fromFactorExposure from './factor-exposure.reducer';

export interface FactorExposureState {
    factorExposure: fromFactorExposure.FactorExposureState;
}

export interface State extends fromRoot.RootState {
    factorExposure: FactorExposureState
}


export const reducers = {
    factorExposure: fromFactorExposure.reducer
}

export const getFactorExposureState = createFeatureSelector<FactorExposureState>('factorExposure');