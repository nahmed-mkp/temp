import { createSelector } from '@ngrx/store';

import * as fromCurve from '../reducers/curve.reducer';
import * as fromFeature from '../reducers';
import * as fromUi from './ui.selectors';

export const getCurveState = createSelector(
    fromFeature.getMarketDateRatesState,
    (state: fromFeature.MarketDataRatesState) => state.curve
);








export const getCurves = createSelector(
    getCurveState,
    fromCurve.getCurve
);

export const getSelectedDateCurves = createSelector(
    getCurves,
    fromUi.getSelectedDate,
    (entity, selectedDate) => {
        const dateString = selectedDate.toLocaleDateString().split('/').join('-');
        if (entity && entity[dateString]) {
            return entity[dateString];
        } else {
            return {};
        }
    }
)

export const getCurveLoadingStatus = createSelector(
    getCurveState,
    fromCurve.getCurveLoadingStatus
);

export const getCurveLoadedStatus = createSelector(
    getCurveState,
    fromCurve.getCurveLoadedStatus
);

export const getCurveError = createSelector(
    getCurveState,
    fromCurve.getCurveError
);

export const getSelectedDateCurvesFalt = createSelector(
    getSelectedDateCurves,
    entity => {
        if (entity) {
            const resultArray = Object.keys(entity).map(key => {
                return {title: key, ...entity[key]}
            });
            resultArray.sort((curveA, curveB) => {
                return curveA.sortOrder - curveB.sortOrder;
            });
            return resultArray;
        } else {
            return [];
        }
    }
);