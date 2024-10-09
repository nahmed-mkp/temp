import { createSelector } from '@ngrx/store';

import * as fromParRate from '../reducers/par-rate.reducer';
import * as fromFeature from '../reducers';
import * as fromUi from './ui.selectors';
import * as _ from 'lodash';

export const getParRateState = createSelector(
    fromFeature.getMarketDateRatesState,
    (state: fromFeature.MarketDataRatesState) => state.parRate
);






export const getParRateLoadingStatus = createSelector(
    getParRateState,
    fromParRate.getParRateLoadingStatus
);

export const getParRateLoadedStatus = createSelector(
    getParRateState,
    fromParRate.getParRateLoadedStatus
);

export const getParRateError = createSelector(
    getParRateState,
    fromParRate.getParRateError
);







export const getSpreadEntity = createSelector(
    getParRateState,
    fromParRate.getSpreadEntity
);

export const getSelectedDateSpread = createSelector(
    getSpreadEntity,
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

export const getSpreadGroups = createSelector(
    getParRateState,
    fromParRate.getSpreadGroups
);

export const getSelectedDateSpreadGroups = createSelector(
    getSpreadGroups,
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

export const getSelectedDateSpreadViewHeight = createSelector(
    getSelectedDateSpread,
    entity => _getMinViewHeight(entity)
);










export const getSwapEntity = createSelector(
    getParRateState,
    fromParRate.getSwapEntity
);

export const getSelectedDateSwap = createSelector(
    getSwapEntity,
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

export const getSwapGroups = createSelector(
    getParRateState,
    fromParRate.getSwapGroups
);

export const getSelectedDateSwapGroups = createSelector(
    getSwapGroups,
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

export const getSelectedDateSwapViewHeight = createSelector(
    getSelectedDateSwap,
    entity => _getMinViewHeight(entity)
);








export const getTreasuryEntity = createSelector(
    getParRateState,
    fromParRate.getTreasuryEntity
);

export const getSelectedDateTreasury = createSelector(
    getTreasuryEntity,
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

export const getTreasuryGroups = createSelector(
    getParRateState,
    fromParRate.getTreasuryGroups
);

export const getSelectedDateTreasuryGroups = createSelector(
    getTreasuryGroups,
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

export const getSelectedDateTreasuryViewHeight = createSelector(
    getSelectedDateTreasury,
    entity => _getMinViewHeight(entity)
);









export const getParRateTimestamp = createSelector(
    getParRateState,
    fromParRate.getParRateTimestamp
);

export const getSelectedDateParRateTimeStamp = createSelector(
    getParRateTimestamp,
    fromUi.getSelectedDate,
    (entity, selectedDate) => {
        const dateString = selectedDate.toLocaleDateString().split('/').join('-');
        if (entity && entity[dateString]) {
            return entity[dateString];
        } else {
            return null;
        }
    }
)




// Utility -------------------------

function _getMinViewHeight(entity): string {
    let minHeight = 200;
    if (entity) {
        const flatData = Object.keys(entity).map(key => entity[key]);
        const maxRow = _.maxBy(flatData, data => data.length);
        if (maxRow && maxRow.length > 0) {
            minHeight = 18 * maxRow.length + 50;
        }
    }
    return minHeight + 'px';
}