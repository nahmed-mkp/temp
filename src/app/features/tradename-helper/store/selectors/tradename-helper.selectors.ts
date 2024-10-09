import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromTradeNameHelper from '../reducers/tradename-helper.reducer';

const getTradeNameHelperState = createSelector(
    fromFeature.getTradeNameHelperFeatureState,
    (state: fromFeature.TradeNameHelperState) => state.tradeNameHelper
);

export const getTaxLots = createSelector(
    getTradeNameHelperState,
    fromTradeNameHelper.getTaxlots
);

export const getTaxLotsLoading = createSelector(
    getTradeNameHelperState,
    fromTradeNameHelper.getTaxlotsLoading
);

export const getTaxLotsLoaded = createSelector(
    getTradeNameHelperState,
    fromTradeNameHelper.getTaxlotsLoaded
);

export const getTaxLotsError = createSelector(
    getTradeNameHelperState,
    fromTradeNameHelper.getTaxlotsError
);

export const getTradeNames = createSelector(
    getTradeNameHelperState,
    fromTradeNameHelper.getTradeNames
);

export const getTradeNamesLoading = createSelector(
    getTradeNameHelperState,
    fromTradeNameHelper.getTradeNamesLoading
);

export const getTradeNamesLoaded = createSelector(
    getTradeNameHelperState,
    fromTradeNameHelper.getTradeNamesLoaded
);

export const getTradeNamesError = createSelector(
    getTradeNameHelperState,
    fromTradeNameHelper.getTradeNamesError
);

export const getTradeNameCounters = createSelector(
    getTradeNameHelperState,
    fromTradeNameHelper.getTradeNameCounters
);

export const getTradeNameCountersWithTaxLots = createSelector(
    getTaxLots,
    getTradeNameCounters,
    (taxLots, counters) => {
        const tradeIDs = taxLots.map(taxLot => taxLot.TradeID);
        const uniqueTradeIDs = tradeIDs.filter((value, idx) => {
            return tradeIDs.indexOf(value) === idx;
        });
        return counters.map((counter) => {
            let hasTaxLots = false;
            if (uniqueTradeIDs.indexOf(counter.TradeID) >= 0) {
                hasTaxLots = true;
            }
            return Object.assign({}, counter, {'HasTaxLots': hasTaxLots});
        });
    }
);

export const getTradeNameCountersLoading = createSelector(
    getTradeNameHelperState,
    fromTradeNameHelper.getTradeNameCountersLoading
);

export const getTradeNameCountersLoaded = createSelector(
    getTradeNameHelperState,
    fromTradeNameHelper.getTradeNameCountersLoaded
);

export const getTradeNameCountersError = createSelector(
    getTradeNameHelperState,
    fromTradeNameHelper.getTradeNameCountersError
);
