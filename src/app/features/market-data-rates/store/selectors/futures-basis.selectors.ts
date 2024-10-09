import { createSelector } from '@ngrx/store';

import * as fromFuturesBasis from '../reducers/futures-basis.reducer';
import * as fromFeature from '../reducers';
import * as fromUi from './ui.selectors';

export const getFuturesBasisState = createSelector(
    fromFeature.getMarketDateRatesState,
    (state: fromFeature.MarketDataRatesState) => state.futuresBasis
);

export const getFuturesBasisMonitor = createSelector(
    getFuturesBasisState,
    fromFuturesBasis.getFuturesBasisMonitor
);

export const getFuturesBasisMonitorLoadingStatus = createSelector(
    getFuturesBasisState,
    fromFuturesBasis.getFuturesBasisMonitorLoadingStatus
);

export const getFuturesBasisMonitorLoadedStatus = createSelector(
    getFuturesBasisState,
    fromFuturesBasis.getFuturesBasisMonitorLoadedStatus
);

export const getFuturesBasisMonitorError = createSelector(
    getFuturesBasisState,
    fromFuturesBasis.getFuturesBasisMonitorError
);

// Subsection selector

export const getFuturesBasis_basicGroup = createSelector(
    getFuturesBasisMonitor,
    entity => {
        if (entity && entity['Basis']) {
            return Object.keys(entity['Basis']);
        } else {
            return [];
        }
    }
);

export const getFuturesBasis_basic = createSelector(
    getFuturesBasisMonitor,
    entity => entity && entity['Basis'] || {}
);

export const getFuturesBasis_cashManagementComparisonGroup = createSelector(
    getFuturesBasisMonitor,
    entity => {
        if (entity && entity['CashManagementComparison']) {
            return Object.keys(entity['CashManagementComparison']);
        } else {
            return [];
        }
    }
);

export const getFuturesBasis_cashManagementComparison = createSelector(
    getFuturesBasisMonitor,
    entity => entity && entity['CashManagementComparison'] || {}
);

export const getFuturesBasis_deliveryGroup = createSelector(
    getFuturesBasisMonitor,
    entity => {
        if (entity && entity['Delivery']) {
            return Object.keys(entity['Delivery']);
        } else {
            return [];
        }
    }
);

export const getFuturesBasis_delivery = createSelector(
    getFuturesBasisMonitor,
    entity => entity && entity['Delivery'] || {}
);

export const getFuturesBasis_netGroup = createSelector(
    getFuturesBasisMonitor,
    entity => {
        if (entity && entity['Net(32nd)']) {
            return Object.keys(entity['Net(32nd)']);
        } else {
            return [];
        }
    }
);

export const getFuturesBasis_net = createSelector(
    getFuturesBasisMonitor,
    entity => entity && entity['Net(32nd)'] || {}
);

export const getFuturesBasis_openInterestGroup = createSelector(
    getFuturesBasisMonitor,
    entity => {
        if (entity && entity['OpenInterest']) {
            return Object.keys(entity['OpenInterest']);
        } else {
            return [];
        }
    }
);

export const getFuturesBasis_openInterest = createSelector(
    getFuturesBasisMonitor,
    entity => entity && entity['OpenInterest'] || {}
);

export const getFuturesContractEntities = createSelector(
    getFuturesBasisState,
    fromFuturesBasis.getFuturesBasisContract
);

export const getFuturesContractLoading = createSelector(
    getFuturesBasisState,
    fromFuturesBasis.getFuturesBasisContractLoadingStatus
);

export const getFuturesContractLoaded = createSelector(
    getFuturesBasisState,
    fromFuturesBasis.getFuturesBasisContractLoadedStatus
);

export const getFuturesContractError = createSelector(
    getFuturesBasisState,
    fromFuturesBasis.getFuturesBasisContractError
);

export const getSelectedFuturesContractContract = createSelector(
    getFuturesContractEntities,
    fromUi.getSelectedFuturesTicker,
    (entities, selectedTicker) => {
        if (entities && entities[selectedTicker]) {
            return entities[selectedTicker];
        } else {
            return {};
        }
    }
);
