import { createSelector } from '@ngrx/store';

import * as fromPnlAdjustments from '../reducers/pnl-adjustments.reducer';
import * as fromFeature from '../reducers';

export const getPnlAdjustmentsStateSlice = createSelector(
    fromFeature.getPnlAdjustmentsState,
    (state: fromFeature.PnlAdjustmentsState) => state.pnlAdjustments
);

export const getAdjustments = createSelector(
  getPnlAdjustmentsStateSlice,
    fromPnlAdjustments.getAdjustments
)

export const getAdjustmentsLoading = createSelector(
  getPnlAdjustmentsStateSlice,
    fromPnlAdjustments.getAdjustmentsLoading
)

export const getAdjustmentsLoaded = createSelector(
  getPnlAdjustmentsStateSlice,
    fromPnlAdjustments.getAdjustmentsLoaded
)

export const getAdjustmentsError = createSelector(
  getPnlAdjustmentsStateSlice,
    fromPnlAdjustments.getAdjustmentsError
);


export const getStartDate = createSelector(
  getPnlAdjustmentsStateSlice,
    fromPnlAdjustments.getStartDate
);

export const getEndDate = createSelector(
  getPnlAdjustmentsStateSlice,
    fromPnlAdjustments.getEndDate
);
