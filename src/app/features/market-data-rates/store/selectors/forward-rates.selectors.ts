import { createSelector } from '@ngrx/store';

import * as fromForwardRates from '../reducers/forward-rates.reducer';
import * as fromFeature from '../reducers';
import * as fromUi from './ui.selectors';
import * as _ from 'lodash';

export const getForwardRatesState = createSelector(
    fromFeature.getMarketDateRatesState,
    (state: fromFeature.MarketDataRatesState) => state.forwardRates
);

// Main selector ---------------------------------------------


export const getForwardRate = createSelector(
    getForwardRatesState,
    fromForwardRates.getForwardRate
);

export const getForwardRateLoadingStatus = createSelector(
    getForwardRatesState,
    fromForwardRates.getForwardRateLoadingStatus
);

export const getForwardRateLoadedStatus = createSelector(
    getForwardRatesState,
    fromForwardRates.getForwardRateLoadedStatus
);

export const getForwardRateError = createSelector(
    getForwardRatesState,
    fromForwardRates.getForwardRateError
);


// Subsection selector ---------------------------------------------

export const getCentralBankOISRates = createSelector(
    getForwardRate,
    result => result && result['centralBankOISRates']
);

export const getForwardSwapRates = createSelector(
    getForwardRate,
    result => result && result['forwardSwapRates']
);

export const getOisYEPricing = createSelector(
    getForwardRate,
    result => result && result['oisYEPricing']
);

export const getOisQEForecast = createSelector(
    getForwardRate,
    result => result && result['oisQEForecast']
);


// ----------------------------------------------------------------

export const getCentralBankOISRateEntity = createSelector(
    getForwardRatesState,
    fromForwardRates.getCentralBankOISRateEntity
);

export const getSelectedDateCentralBankOISRate = createSelector(
    getCentralBankOISRateEntity,
    fromUi.getSelectedDate,
    (entity, selectedDate) => {
        const dateString = selectedDate.toLocaleDateString().split('/').join('-');
        if (entity && entity[dateString]) {
            return entity[dateString];
        } else {
            return {};
        }
    }
);

export const getCentralBankOISRateGroups = createSelector(
    getForwardRatesState,
    fromForwardRates.getCentralBankOISRateGroups
);

export const getSelectedDateCentralBankOISRateGroups = createSelector(
    getCentralBankOISRateGroups,
    fromUi.getSelectedDate,
    (entity, selectedDate) => {
        const dateString = selectedDate.toLocaleDateString().split('/').join('-');
        if (entity && entity[dateString]) {
            return entity[dateString];
        } else {
            return [];
        }
    }
);

export const getSelectedDateCentralBankOISRateViewHeight = createSelector(
    getSelectedDateCentralBankOISRate,
    entity => {
        let minHeight = 200;
        if (entity) {
            const flatData = Object.keys(entity).map(key => entity[key]);
            const maxRow = _.maxBy(flatData, data => data.length);
            if (maxRow && maxRow.length > 0) {
                minHeight = 21 * maxRow.length + 60;
            }
        }
        return minHeight + 'px';
    }
);

export const getForwardSwapRateEntity = createSelector(
    getForwardRatesState,
    fromForwardRates.getForwardSwapRateEntity
);

export const getSelectedDateForwardSwapRate = createSelector(
    getForwardSwapRateEntity,
    fromUi.getSelectedDate,
    (entity, selectedDate) => {
        const dateString = selectedDate.toLocaleDateString().split('/').join('-');
        if (entity && entity[dateString]) {
            return entity[dateString];
        } else {
            return {};
        }
    }
);

export const getForwardSwapRateGroups = createSelector(
    getForwardRatesState,
    fromForwardRates.getForwardSwapRateGroups
);

export const getSelectedDateForwardSwapRateGroups = createSelector(
    getForwardSwapRateGroups,
    fromUi.getSelectedDate,
    (entity, selectedDate) => {
        const dateString = selectedDate.toLocaleDateString().split('/').join('-');
        if (entity && entity[dateString]) {
            return entity[dateString];
        } else {
            return [];
        }
    }
);

export const getSelectedDateForwardSwapRateViewHeight = createSelector(
    getSelectedDateForwardSwapRate,
    entity => {
        let minHeight = 200;
        if (entity) {
            const flatData = Object.keys(entity).map(key => entity[key]);
            const maxRow = _.maxBy(flatData, data => data.length);
            if (maxRow && maxRow.length > 0) {
                minHeight = 18 * maxRow.length + 60;
            }
        }
        return minHeight + 'px';
    }
);

export const getOisYEPricingEntity = createSelector(
    getForwardRatesState,
    fromForwardRates.getOisYEPricingEntity
);

export const getSelectedDateOisYEPricing = createSelector(
    getOisYEPricingEntity,
    fromUi.getSelectedDate,
    (entity, selectedDate) => {
        const dateString = selectedDate.toLocaleDateString().split('/').join('-');
        if (entity && entity[dateString]) {
            return entity[dateString];
        } else {
            return {};
        }
    }
);

export const getOisYEPricingGroups = createSelector(
    getForwardRatesState,
    fromForwardRates.getOisYEPricingGroups
);

export const getSelectedDateOisYEPricingGroups = createSelector(
    getOisYEPricingGroups,
    fromUi.getSelectedDate,
    (entity, selectedDate) => {
        const dateString = selectedDate.toLocaleDateString().split('/').join('-');
        if (entity && entity[dateString]) {
            return entity[dateString];
        } else {
            return [];
        }
    }
);

export const getSelectedDateOisYEPricingViewHeight = createSelector(
    getSelectedDateOisYEPricing,
    entity => {
        let minHeight = 200;
        if (entity) {
            const flatData = Object.keys(entity).map(key => entity[key]);
            const maxRow = _.maxBy(flatData, data => data.length);
            if (maxRow && maxRow.length > 0) {
                minHeight = 18 * maxRow.length + 60;
            }
        }
        return minHeight + 'px';
    }
);

export const getForwardRatesTimestamp = createSelector(
    getForwardRatesState,
    fromForwardRates.getTimestamp
);

export const getSelectedDateForwardRatesTimestamp = createSelector(
    getForwardRatesTimestamp,
    fromUi.getSelectedDate,
    (entity, selectedDate) => {
        const dateString = selectedDate.toLocaleDateString().split('/').join('-');
        if (entity && entity[dateString]) {
            return entity[dateString];
        } else {
            return null;
        }
    }
);

export const getOisQEForecastEntity = createSelector(
    getForwardRatesState,
    fromForwardRates.getOisQEForecastEntity
);

export const getSelectedDateOisQEForecast = createSelector(
    getOisQEForecastEntity,
    fromUi.getSelectedDate,
    (entity, selectedDate) => {
        const dateString = selectedDate.toLocaleDateString().split('/').join('-');
        if (entity && entity[dateString]) {
            return entity[dateString];
        } else {
            return {};
        }
    }
);

export const getOisQEForecastGroups = createSelector(
    getForwardRatesState,
    fromForwardRates.getOisQEForecastGroups
);

export const getSelectedDateOisQEForecastGroups = createSelector(
    getOisQEForecastGroups,
    fromUi.getSelectedDate,
    (entity, selectedDate) => {
        const dateString = selectedDate.toLocaleDateString().split('/').join('-');
        if (entity && entity[dateString]) {
            return entity[dateString];
        } else {
            return [];
        }
    }
);

export const getSelectedDateOisQEForecastViewHeight = createSelector(
    getSelectedDateOisQEForecast,
    entity => {
        let minHeight = 200;
        if (entity) {
            const flatData = Object.keys(entity).map(key => entity[key]);
            const maxRow = _.maxBy(flatData, data => data.length);
            if (maxRow && maxRow.length > 0) {
                minHeight = 18 * maxRow.length + 45;
            }
        }
        return minHeight + 'px';
    }
);
