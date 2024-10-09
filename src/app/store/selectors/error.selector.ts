import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromError from './../reducers/error.reducer';


export const getErrorCollection = createSelector(
    fromFeature.getErrorState,
    fromError.getErrorCollection
);

export const getPanelDisplay = createSelector(
    fromFeature.getErrorState,
    fromError.getPanelDisplay
);

