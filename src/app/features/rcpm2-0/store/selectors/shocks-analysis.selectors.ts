import { createSelector } from '@ngrx/store';

import * as fromShocks from '../reducers/shocks-analysis.reducer';
import * as fromFeature from '../reducers';

export const getShocksAnalysisState = createSelector(
    fromFeature.getRCPM2State,
    (state: fromFeature.RCPM2State) => state.shocks
);



export const getShockInfo = createSelector(
    getShocksAnalysisState,
    fromShocks.getShockInfo
);

export const getShockInfoLoading = createSelector(
    getShocksAnalysisState,
    fromShocks.getShockInfoLoading
);

export const getShockInfoLoaded = createSelector(
    getShocksAnalysisState,
    fromShocks.getShockInfoLoaded
);

export const getShockInfoError = createSelector(
    getShocksAnalysisState,
    fromShocks.getShockInfoError
);






export const getShockAssetClass = createSelector(
    getShocksAnalysisState,
    fromShocks.getShockAssetClass
);

export const getShockAssetClassLoading = createSelector(
    getShocksAnalysisState,
    fromShocks.getShockAssetClassLoading
);

export const getShockAssetClassLoaded = createSelector(
    getShocksAnalysisState,
    fromShocks.getShockAssetClassLoaded
);

export const getShockAssetClassError = createSelector(
    getShocksAnalysisState,
    fromShocks.getShockAssetClassError
);





export const getShockTriggerPending = createSelector(
    getShocksAnalysisState,
    fromShocks.getShockTriggerPending
);

export const getShockTriggerComplete = createSelector(
    getShocksAnalysisState,
    fromShocks.getShockTriggerComplete
);

export const getShockTriggerError = createSelector(
    getShocksAnalysisState,
    fromShocks.getShockTriggerError
);