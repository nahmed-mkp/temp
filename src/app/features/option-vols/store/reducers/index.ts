import { createFeatureSelector } from '@ngrx/store';

import * as fromRoot from './../../../../store';
import * as fromOptionVols from './option-vols.reducer';

export interface OptionVolsState {
    optionVols: fromOptionVols.State;
}

export interface State extends fromRoot.RootState {
    optionVols: OptionVolsState;
}

export const reducers = {
    optionVols: fromOptionVols.reducer
};

export const getOptionVolsState = createFeatureSelector<OptionVolsState>('optionVols');
