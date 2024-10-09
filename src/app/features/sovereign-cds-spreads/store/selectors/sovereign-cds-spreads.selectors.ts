import { createSelector } from '@ngrx/store';

import * as fromSovereignCdsSpreads from '../reducers/sovereign-cds-spreads.reducers';
import * as fromFeature from '../reducers';

export const getSovereignCdsSpreadsStateSlice = createSelector(
    fromFeature.getSovereignCdsFeedsState,
    (state: fromFeature.SovereignCdsFeedsState) => state.sovereignCdsSpreads
)

export const getAsOfDate = createSelector(
  getSovereignCdsSpreadsStateSlice,
  fromSovereignCdsSpreads.getAsOfDate
)

export const getSovereignCdsSpreads = createSelector(
  getSovereignCdsSpreadsStateSlice,
  fromSovereignCdsSpreads.getSovereignCdsSpreads
)

export const getSovereignCdsSpreadsLoading = createSelector(
  getSovereignCdsSpreadsStateSlice,
  fromSovereignCdsSpreads.getSovereignCdsSpreadsLoadingStatus
)

export const getSovereignCdsSpreadsLoaded = createSelector(
  getSovereignCdsSpreadsStateSlice,
  fromSovereignCdsSpreads.getSovereignCdsSpreadsLoadedStatus
)

export const getSovereignCdsSpreadsError = createSelector(
  getSovereignCdsSpreadsStateSlice,
  fromSovereignCdsSpreads.getSovereignCdsSpreadsErrorStatus
)