import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromDividend from '../reducers/dividend.reducer';


export const getDividendState = createSelector(
    fromFeature.getBlotterMasterState,
    (state: fromFeature.BlotterMasterState) => state.dividend
);




export const getDividendInfo = createSelector(
    getDividendState,
    fromDividend.getDividendInfo
);

export const getDividendInfoLoading = createSelector(
    getDividendState,
    fromDividend.getDividendInfoLoading
);

export const getDividendInfoLoaded = createSelector(
    getDividendState,
    fromDividend.getDividendInfoLoaded
);

export const getDividendInfoError = createSelector(
    getDividendState,
    fromDividend.getDividendInfoError
);











export const getDividendAllocationInfo = createSelector(
    getDividendState,
    fromDividend.getDividendAllocationInfo
);

export const getDividendAllocationInfoLoading = createSelector(
    getDividendState,
    fromDividend.getDividendAllocationInfoLoading
);

export const getDividendAllocationInfoLoaded = createSelector(
    getDividendState,
    fromDividend.getDividendAllocationInfoLoaded
);

export const getDividendAllocationInfoError = createSelector(
    getDividendState,
    fromDividend.getDividendAllocationInfoError
);








export const getUpdateDividendAllocationPending = createSelector(
    getDividendState,
    fromDividend.getUpdateDividendAllocationPending
);

export const getUpdateDividendAllocationFinished = createSelector(
    getDividendState,
    fromDividend.getUpdateDividendAllocationFinished
);

export const getUpdateDividendAllocationError = createSelector(
    getDividendState,
    fromDividend.getUpdateDividendAllocationError
);