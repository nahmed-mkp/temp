import { createSelector } from '@ngrx/store';

import * as fromPnlRec from '../reducers/rcpm-pnl-rec.reducer';
import * as fromFeature from '../reducers';

export const getPnlRecState = createSelector(
    fromFeature.getRCPMPnlRecState,
    (state: fromFeature.RCPMPnlRecState) => state.pnlRec
);

export const getActiveDate = createSelector(
    getPnlRecState,
    fromPnlRec.getActiveDate
);

export const getPnlRecData = createSelector(
    getPnlRecState,
    fromPnlRec.getPnlRecData
);

export const getPnlRecDataLoading = createSelector(
    getPnlRecState,
    fromPnlRec.getPnlRecDataLoading
);

export const getPnlRecDataLoaded = createSelector(
    getPnlRecState,
    fromPnlRec.getPnlRecDataLoaded
);

export const getPnlRecDataError = createSelector(
    getPnlRecState,
    fromPnlRec.getPnlRecDataError
);







export const getPricerRecData = createSelector(
    getPnlRecState,
    fromPnlRec.getPricerRecData
);

export const getPricerRecDataLoading = createSelector(
    getPnlRecState,
    fromPnlRec.getPricerRecDataLoading
);

export const getPricerRecDataLoaded = createSelector(
    getPnlRecState,
    fromPnlRec.getPricerRecDataLoaded
);

export const getPricerRecDataError = createSelector(
    getPnlRecState,
    fromPnlRec.getPricerRecDataError
);






export const getPosRecData = createSelector(
    getPnlRecState,
    fromPnlRec.getPosRecData
);

export const getPosRecDataLoading = createSelector(
    getPnlRecState,
    fromPnlRec.getPosRecDataLoading
);

export const getPosRecDataLoaded = createSelector(
    getPnlRecState,
    fromPnlRec.getPosRecDataLoaded
);

export const getPosRecDataError = createSelector(
    getPnlRecState,
    fromPnlRec.getPosRecDataError
);

