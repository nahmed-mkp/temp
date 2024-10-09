import * as fromRoot from '../../../../store';
import { createFeatureSelector } from '@ngrx/store';

import * as fromDividend from './dividend.reducer';



export interface BlotterMasterState {
    dividend: fromDividend.DividendState;
}

export interface State extends fromRoot.RootState {
    'blotter': BlotterMasterState;
}


export const reducers = {
    dividend: fromDividend.reducer
}

export const getBlotterMasterState = createFeatureSelector<BlotterMasterState>('blotter');