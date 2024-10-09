import { createSelector } from '@ngrx/store';

import * as fromRoot from './../../../../store';
import * as fromFeature from './../reducers';
import * as fromEquities from './../reducers/equities-analytics.reducer';

/**
 * Equities Analytics
 */
export const getEquitiesAnalyticsState = createSelector(
    fromFeature.getMacroAnalyticsState,
    (state: fromFeature.MacroAnalyticsState) => state.equities
);

export const getEquitiesAnalyticsDates = createSelector(
    getEquitiesAnalyticsState,
    fromEquities.getDates
);

export const getEquitiesAnalyticsDatesLoading = createSelector(
    getEquitiesAnalyticsState,
    fromEquities.getDatesLoading
);

export const getEquitiesAnalyticsDatesLoaded = createSelector(
    getEquitiesAnalyticsState,
    fromEquities.getDatesLoaded
);

export const getEquitiesAnalyticsDatesError = createSelector(
    getEquitiesAnalyticsState,
    fromEquities.getDatesError
);

export const getEquitiesAnalyticsSelectedDate = createSelector(
    getEquitiesAnalyticsState,
    fromEquities.getSelectedDate
);

export const getEquitiySelectedTimeseriesId = createSelector(
    getEquitiesAnalyticsState,
    fromEquities.getSelectedTimeseriesId
);






export const getEquitiesAnalytics = createSelector(
    getEquitiesAnalyticsState,
    fromEquities.getAnalytics
);

export const getEquitiesAnalyticsUniqueColumnSetNames = createSelector(
    getEquitiesAnalytics,
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

export const getEquitiesAnalyticsLoadingStatus = createSelector(
    getEquitiesAnalyticsState,
    fromEquities.getAnalyticsLoading
);

export const getEquitiesAnalyticsLoadedStatus = createSelector(
    getEquitiesAnalyticsState,
    fromEquities.getAnalyticsLoaded
);

export const getEquitiesAnalyticsError = createSelector(
    getEquitiesAnalyticsState,
    fromEquities.getAnalyticsError
);




export const getIndexTimeseries = createSelector(
    getEquitiesAnalyticsState,
    fromEquities.getIndexTimeseries
);

export const getIndexTimeseriesLoadingStatus = createSelector(
    getEquitiesAnalyticsState,
    fromEquities.getIndexTimeseriesLoading
);

export const getIndexTimeseriesLoadedStatus = createSelector(
    getEquitiesAnalyticsState,
    fromEquities.getIndexTimeseriesLoaded
);

export const getIndexTimeseriesError = createSelector(
    getEquitiesAnalyticsState,
    fromEquities.getIndexTimeseriesError
);


export const getEquitySelectedTimeseries = createSelector(
    getEquitiySelectedTimeseriesId,
    getIndexTimeseries,
    (id, entity, props) => {
        if (id && entity && entity[id]) {
            return entity[id][props.mode];
        } else {
            return [];
        }
    }
);

export const getEquitySelectedTimeseriesPreview = createSelector(
    getIndexTimeseries,
    (timeseriesEntity, props) => {
        if (timeseriesEntity) {
            return timeseriesEntity[props.ticker][props.mode][props.target];
        } else {
            return [];
        }
    }
);






export const getSectorTimeseries = createSelector(
    getEquitiesAnalyticsState,
    fromEquities.getSectorTimeseries
);

export const getSectorTimeseriesLoadingStatus = createSelector(
    getEquitiesAnalyticsState,
    fromEquities.getSectorTimeseriesLoading
);

export const getSectorTimeseriesLoadedStatus = createSelector(
    getEquitiesAnalyticsState,
    fromEquities.getSectorTimeseriesLoaded
);

export const getSectorTimeseriesError = createSelector(
    getEquitiesAnalyticsState,
    fromEquities.getSectorTimeseriesError
);

export const getEquitySectorSelectedTimeseries = createSelector(
    getEquitiySelectedTimeseriesId,
    getSectorTimeseries,
    (id, entity) => {
        if (id && entity && entity[id]) {
            return entity[id];
        } else {
            return [];
        }
    }
);
