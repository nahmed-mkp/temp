import { createSelector } from '@ngrx/store';

import * as fromRoot from '../../../../store';
import * as fromFeature from '../reducers';
import * as fromCommodities from '../reducers/commodities-analytics.reducer';

/**
 * Commodities Analytics
 */
export const getCommoditiesAnalyticsState = createSelector(
    fromFeature.getMacroAnalyticsState,
    (state: fromFeature.MacroAnalyticsState) => state.commodities
);

export const getCommoditiesAnalyticsDates = createSelector(
    getCommoditiesAnalyticsState,
    fromCommodities.getDates
);

export const getCommoditiesAnalyticsDatesLoadingStatus = createSelector(
    getCommoditiesAnalyticsState,
    fromCommodities.getDatesLoading
);

export const getCommoditiesAnalyticsDatesLoadedStatus = createSelector(
    getCommoditiesAnalyticsState,
    fromCommodities.getDatesLoaded
);

export const getCommoditiesAnalyticsDatesError = createSelector(
    getCommoditiesAnalyticsState,
    fromCommodities.getDatesError
);

export const getCommoditiesAnalyticsSelectedDate = createSelector(
    getCommoditiesAnalyticsState,
    fromCommodities.getSelectedDate
);

export const getCommoditiesAnalytics = createSelector(
    getCommoditiesAnalyticsState,
    fromCommodities.getAnalytics
);


export const getCommoditiesAnalyticsLoadingStatus = createSelector(
    getCommoditiesAnalyticsState,
    fromCommodities.getAnalyticsLoading
);


export const getCommoditiesAnalyticsLoadedStatus = createSelector(
    getCommoditiesAnalyticsState,
    fromCommodities.getAnalyticsLoaded
);


export const getCommoditiesAnalyticsError = createSelector(
    getCommoditiesAnalyticsState,
    fromCommodities.getAnalyticsError
);


export const getCommoditiesAnalyticsUniqueColumnSetNames = createSelector(
    getCommoditiesAnalytics,
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



export const getCommoditiesAnalyticsTimeseries = createSelector(
    getCommoditiesAnalyticsState,
    fromCommodities.getTimeseries
);

export const getCommoditiesAnalyticsTimeseriesLoadedStatus = createSelector(
    getCommoditiesAnalyticsState,
    fromCommodities.getTimeseriesLoaded
);

export const getCommoditiesAnalyticsTimeseriesLoadingStatus = createSelector(
    getCommoditiesAnalyticsState,
    fromCommodities.getTimeseriesLoading
);

export const getCommoditiesAnalyticsTimeseriesError = createSelector(
    getCommoditiesAnalyticsState,
    fromCommodities.getTimeseriesError
);

export const getCommoditiesAnalyticsSelectedDateTimeseries = createSelector(
    getCommoditiesAnalyticsSelectedDate,
    getCommoditiesAnalyticsTimeseries,
    (selectedDate, timeseriesEntity) => {
        if (selectedDate && timeseriesEntity) {
            return timeseriesEntity[selectedDate];
        } else {
            return [];
        }
    }
);

export const getCommoditiesAnalyticsSelectedDateTimeseriesPreview = createSelector(
    getCommoditiesAnalyticsSelectedDate,
    getCommoditiesAnalyticsTimeseries,
    (selectedDate, timeseriesEntity, props) => {
        if (selectedDate && timeseriesEntity && props['target']) {
            return timeseriesEntity[selectedDate][props['target']];
        } else {
            return [];
        }
    }
);
