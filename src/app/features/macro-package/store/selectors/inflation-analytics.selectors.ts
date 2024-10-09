import { createSelector } from '@ngrx/store';

import * as fromRoot from '../../../../store';
import * as fromFeature from '../reducers';
import * as fromInflation from '../reducers/inflation-analytics.reducer';

/**
 * Inflation Analytics
 */
export const getInflationAnalyticsState = createSelector(
    fromFeature.getMacroAnalyticsState,
    (state: fromFeature.MacroAnalyticsState) => state.inflation
);

export const getInflationAnalyticsDates = createSelector(
    getInflationAnalyticsState,
    fromInflation.getDates
);

export const getInflationAnalyticsDatesLoadingStatus = createSelector(
    getInflationAnalyticsState,
    fromInflation.getDatesLoading
);

export const getInflationAnalyticsDatesLoadedStatus = createSelector(
    getInflationAnalyticsState,
    fromInflation.getDatesLoaded
);

export const getInflationAnalyticsDatesError = createSelector(
    getInflationAnalyticsState,
    fromInflation.getDatesError
);

export const getInflationAnalyticsSelectedDate = createSelector(
    getInflationAnalyticsState,
    fromInflation.getSelectedDate
);

export const getInflationAnalytics = createSelector(
    getInflationAnalyticsState,
    fromInflation.getAnalytics
);


export const getInflationAnalyticsLoadingStatus = createSelector(
    getInflationAnalyticsState,
    fromInflation.getAnalyticsLoading
);


export const getInflationAnalyticsLoadedStatus = createSelector(
    getInflationAnalyticsState,
    fromInflation.getAnalyticsLoaded
);


export const getInflationAnalyticsError = createSelector(
    getInflationAnalyticsState,
    fromInflation.getAnalyticsError
);

export const getInflationAnalyticsUniqueColumnSetNames = createSelector(
    getInflationAnalytics,
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






export const getInflationAnalyticsTimeseries = createSelector(
    getInflationAnalyticsState,
    fromInflation.getTimeseries
);

export const getInflationAnalyticsTimeseriesLoadedStatus = createSelector(
    getInflationAnalyticsState,
    fromInflation.getTimeseriesLoaded
);

export const getInflationAnalyticsTimeseriesLoadingStatus = createSelector(
    getInflationAnalyticsState,
    fromInflation.getTimeseriesLoading
);

export const getInflationAnalyticsTimeseriesError = createSelector(
    getInflationAnalyticsState,
    fromInflation.getTimeseriesError
);

export const getInflationAnalyticsSelectedDateTimeseries = createSelector(
    getInflationAnalyticsSelectedDate,
    getInflationAnalyticsTimeseries,
    (selectedDate, timeseriesEntity) => {
        if (selectedDate && timeseriesEntity) {
            return timeseriesEntity[selectedDate];
        } else {
            return [];
        }
    }
);

export const getInflationAnalyticsSelectedDateTimeseriesPreview = createSelector(
    getInflationAnalyticsSelectedDate,
    getInflationAnalyticsTimeseries,
    (selectedDate, timeseriesEntity, props) => {
        if (selectedDate && timeseriesEntity && props['target']) {
            return timeseriesEntity[selectedDate][props['target']];
        } else {
            return [];
        }
    }
);
