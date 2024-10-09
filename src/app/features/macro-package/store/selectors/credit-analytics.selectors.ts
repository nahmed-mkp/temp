import { createSelector } from '@ngrx/store';

import * as fromRoot from '../../../../store';
import * as fromFeature from '../reducers';
import * as fromCredit from '../reducers/credit-analytics.reducer';

/**
 * Credit Analytics
 */
export const getCreditAnalyticsState = createSelector(
    fromFeature.getMacroAnalyticsState,
    (state: fromFeature.MacroAnalyticsState) => state.credit
);

export const getCreditAnalyticsCreditIndices = createSelector(
    getCreditAnalyticsState,
    fromCredit.getIndices
);

export const getCreditAnalyticsCreditIndicesLoadingStatus = createSelector(
    getCreditAnalyticsState,
    fromCredit.getIndicesLoading
);

export const getCreditAnalyticsCreditIndicesLoadedStatus = createSelector(
    getCreditAnalyticsState,
    fromCredit.getIndicesLoaded
);


export const getCreditAnalyticsCreditIndicesError = createSelector(
    getCreditAnalyticsState,
    fromCredit.getIndicesError
);

export const getCreditAnalyticsIndexConstituents = createSelector(
    getCreditAnalyticsState,
    fromCredit.getIndexConstituents
);

export const getCreditAnalyticsIndexConstituentsLoadingStatus = createSelector(
    getCreditAnalyticsState,
    fromCredit.getIndexConstituentsLoading
);
export const getCreditAnalyticsIndexConstituentsLoadedStatus = createSelector(
    getCreditAnalyticsState,
    fromCredit.getIndexConstituentsLoaded
);
export const getCreditAnalyticsIndexConstituentsError = createSelector(
    getCreditAnalyticsState,
    fromCredit.getIndexConstituentsError
);

export const getCreditAnalyticsSectorWeights = createSelector(
    getCreditAnalyticsState,
    fromCredit.getSectorWeights
);

export const getCreditAnalyticsSectorWeightsLoadingStatus = createSelector(
    getCreditAnalyticsState,
    fromCredit.getSectorWeightsLoading
);

export const getCreditAnalyticsSectorWeightsLoadedStatus = createSelector(
    getCreditAnalyticsState,
    fromCredit.getSectorWeightsLoaded
);

export const getCreditAnalyticsSectorWeightsError = createSelector(
    getCreditAnalyticsState,
    fromCredit.getSectorWeightsError
);

export const getCreditAnalyticsDates = createSelector(
    getCreditAnalyticsState,
    fromCredit.getDates
);

export const getCreditAnalyticsDatesLoadingStatus = createSelector(
    getCreditAnalyticsState,
    fromCredit.getDatesLoading
);

export const getCreditAnalyticsDatesLoadedStatus = createSelector(
    getCreditAnalyticsState,
    fromCredit.getDatesLoaded
);

export const getCreditAnalyticsDatesError = createSelector(
    getCreditAnalyticsState,
    fromCredit.getDatesError
);

export const getCreditAnalyticsSelectedDate = createSelector(
    getCreditAnalyticsState,
    fromCredit.getSelectedDate
);

export const getCreditAnalytics = createSelector(
    getCreditAnalyticsState,
    fromCredit.getAnalytics
);


export const getCreditAnalyticsLoadingStatus = createSelector(
    getCreditAnalyticsState,
    fromCredit.getAnalyticsLoading
);


export const getCreditAnalyticsLoadedStatus = createSelector(
    getCreditAnalyticsState,
    fromCredit.getAnalyticsLoaded
);


export const getCreditAnalyticsError = createSelector(
    getCreditAnalyticsState,
    fromCredit.getAnalyticsError
);


export const getCreditAnalyticsUniqueColumnSetNames = createSelector(
    getCreditAnalytics,
    (data) => {
        if (data && data.length > 0) {
            const columnNames = Object.keys(data[0]);
            const uniqueColumnSetNames = columnNames.filter(name => name.includes('High'))
            .map(name => name.split('High')[0]);
            return uniqueColumnSetNames;
        } else {
            return [];
        }
    }
);




export const getCreditAnalyticsTimeseries = createSelector(
    getCreditAnalyticsState,
    fromCredit.getTimeseries
);

export const getCreditAnalyticsTimeseriesLoadedStatus = createSelector(
    getCreditAnalyticsState,
    fromCredit.getTimeseriesLoaded
);

export const getCreditAnalyticsTimeseriesLoadingStatus = createSelector(
    getCreditAnalyticsState,
    fromCredit.getTimeseriesLoading
);

export const getCreditAnalyticsTimeseriesError = createSelector(
    getCreditAnalyticsState,
    fromCredit.getTimeseriesError
);

export const getCreditAnalyticsSelectedDateTimeseries = createSelector(
    getCreditAnalyticsSelectedDate,
    getCreditAnalyticsTimeseries,
    (selectedDate, timeseriesEntity) => {
        if (selectedDate && timeseriesEntity) {
            return timeseriesEntity[selectedDate];
        } else {
            return [];
        }
    }
);

export const getCreditAnalyticsSelectedDateTimeseriesPreview = createSelector(
    getCreditAnalyticsSelectedDate,
    getCreditAnalyticsTimeseries,
    (selectedDate, timeseriesEntity, props) => {
        if (selectedDate && timeseriesEntity && props['target']) {
            return timeseriesEntity[selectedDate][props['target']];
        } else {
            return [];
        }
    }
);
