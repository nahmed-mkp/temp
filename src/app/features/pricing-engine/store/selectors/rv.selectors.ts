import { createSelector } from '@ngrx/store';
import * as fromFeature from '../reducers';
import * as fromRV from '../reducers/rv.reducer';

export const getRvState = createSelector(
    fromFeature.getPricingEngineFeatureState,
    (state: fromFeature.PricingEngineState) => state.rv
);

/* ============= AS OF DATE ================= */

export const getAsOfDate = createSelector(
    getRvState,
    fromRV.getAsOfDate
);

export const getMode = createSelector(
    getRvState,
    fromRV.getMode
);

/* ============== RV TRADE DATA ================= */

export const getRvData = createSelector(
    getRvState,
    fromRV.getRvTradeData
);

export const getRvDataLoading = createSelector(
    getRvState,
    fromRV.getRvTradeDataLoading
);

export const getRvDataLoaded = createSelector(
    getRvState,
    fromRV.getRvTradeDataLoaded
);

export const getRvDataError = createSelector(
    getRvState,
    fromRV.getRvTradeDataError
);

/* ============= SECURITY DETAIL ================= */

export const getSecurityDetail = createSelector(
    getRvState,
    fromRV.getSecurityDetail
);

export const getSecurityDetailLoading = createSelector(
    getRvState,
    fromRV.getSecurityDetailLoading
);

export const getSecurityDetailLoaded = createSelector(
    getRvState,
    fromRV.getSecurityDetailLoaded
);

export const getSecurityDetailError = createSelector(
    getRvState,
    fromRV.getSecurityDetailError
);

/* ============= RV TRADE DATA UPDATE ================= */

export const getRvTradeDataUpdatePending = createSelector(
    getRvState,
    fromRV.getRvTradeDataUpdatePending
);

export const getRvTradeDataUpdateComplete = createSelector(
    getRvState,
    fromRV.getRvTradeDataUpdateComplete
);

export const getRvTradeDataUpdateError = createSelector(
    getRvState,
    fromRV.getRvTradeDataUpdateError
);

/* ============= SECURITY SUGGESTIONS ================= */

export const getRvSecuritySuggestions = createSelector(
    getRvState,
    fromRV.getRvSecuritySuggestions
);

export const getRvSecuritySuggestionsLoading = createSelector(
    getRvState,
    fromRV.getRvSecuritySuggestionsLoading
);

export const getRvSecuritySuggestionsLoaded = createSelector(
    getRvState,
    fromRV.getRvSecuritySuggestionsLoaded
);

export const getRvSecuritySuggestionsError = createSelector(
    getRvState,
    fromRV.getRvSecuritySuggestionsError
);

/* ============= ENRICHED DATA ================= */

export const getMdidEnrichedData = createSelector(
    getRvState,
    fromRV.getMdidEnrichedData
);

export const getMdidEnrichedDataLoading = createSelector(
    getRvState,
    fromRV.getMdidEnrichedDataLoading
);

export const getMdidEnrichedDataLoaded = createSelector(
    getRvState,
    fromRV.getMdidEnrichedDataLoaded
);

export const getMdidEnrichedDataError = createSelector(
    getRvState,
    fromRV.getMdidEnrichedDataError
);

export const getUserInputEnrichedData = createSelector(
    getRvState,
    fromRV.getUserInputEnrichedData
);

export const getUserInputEnrichedDataLoading = createSelector(
    getRvState,
    fromRV.getUserInputEnrichedDataLoading
);

export const getUserInputEnrichedDataLoaded = createSelector(
    getRvState,
    fromRV.getUserInputEnrichedDataLoaded
);

export const getUserInputEnrichedDataError = createSelector(
    getRvState,
    fromRV.getUserInputEnrichedDataError
);

