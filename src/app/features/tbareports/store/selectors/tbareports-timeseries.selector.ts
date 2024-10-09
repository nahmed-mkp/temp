import { createSelector } from '@ngrx/store';

import * as fromRoot from '../../../../store';
import * as fromFeature from '../reducers';
import * as fromTimeseries from '../reducers/tbareports-timeseries.reducer';

/**
 * TBA Reports Parsers
 */
export const getTimeseriesState = createSelector(
  fromFeature.getTbaReportsState,
  (state: fromFeature.TBAReportsState) => state.timeseries
);

// UI
export const getActiveMode = createSelector(
    getTimeseriesState,
    fromTimeseries.getActiveMode
)


// series
export const getTimeseriesIds = createSelector(
    getTimeseriesState,
    fromTimeseries.getTimeseriesIds
);

export const getTimeseriesEntities = createSelector(
    getTimeseriesState,
    fromTimeseries.getTimeseriesEntities
);

export const getSelectedId = createSelector(
    getTimeseriesState,
    fromTimeseries.getSelectedSeriesId
);

export const getTimeseriesLoadingStatus = createSelector(
    getTimeseriesState,
    fromTimeseries.getSeriesLoadingStatus
);

export const getTimeseriesLoadedStatus = createSelector(
    getTimeseriesState,
    fromTimeseries.getSeriesLoadedStatus
);

export const getTimeseriesErrorStatus = createSelector(
    getTimeseriesState,
    fromTimeseries.getSeriesError
);

export const getTimeseries = createSelector(
    getTimeseriesEntities,
    getTimeseriesIds,
    (entities, ids) => {
        return ids.map((id) => entities[id]);
    }
);

export const getSelectedTimeseries = createSelector(
    getTimeseriesEntities,
    getSelectedId,
    (entities, id) => {
        return entities[id];
    }
);


// Coupons
export const getCouponIds = createSelector(
    getTimeseriesState,
    fromTimeseries.getCouponIds
);

export const getCouponEntities = createSelector(
    getTimeseriesState,
    fromTimeseries.getCouponEntities
);

export const getCoupons = createSelector(
    getCouponEntities,
    getCouponIds,
    (entities, ids) => {
        return ids.map((id) => entities[id]);
    }
);

export const getCouponLoadingStatus = createSelector(
    getTimeseriesState,
    fromTimeseries.getCouponsLoadingStatus
);

export const getCouponLoadedStatus = createSelector(
    getTimeseriesState,
    fromTimeseries.getCouponsLoadedStatus
);

export const getCouponErrorStatus = createSelector(
    getTimeseriesState,
    fromTimeseries.getCouponsError
);

export const getSelectedCoupons = createSelector(
    getSelectedTimeseries,
    getCoupons,
    (series, coupons) => {
        if (series) {
            const couponIds = series.coupons.map((coupon) => coupon.id);
            return coupons.filter((coupon) => couponIds.indexOf(coupon.id) >= 0);
        }
    }
);

// Metric Types 
export const getMetricTypesEntities = createSelector(
    getTimeseriesState,
    fromTimeseries.getMetricTypesEntities
)

export const getMetricTypesLoadingStatus = createSelector(
    getTimeseriesState,
    fromTimeseries.getMetricTypesLoadingStatus
)

export const getMetricTypesLoadedStatus = createSelector(
    getTimeseriesState,
    fromTimeseries.getMetricTypesLoadedStatus
)

export const getMetricTypesError = createSelector(
    getTimeseriesState,
    fromTimeseries.getMetricTypesError
)

export const getSelectedMetricType = createSelector(
    getTimeseriesState,
    fromTimeseries.getSelectedMetricType
)





// plots
export const getSelectedPlotType = createSelector(
    getTimeseriesState,
    fromTimeseries.getSelectedPlotType
);

export const getPlotIds = createSelector(
    getTimeseriesState,
    fromTimeseries.getPlotIds
);

export const getPlotEntities = createSelector(
    getTimeseriesState,
    fromTimeseries.getPlotEntities
);

export const getPlots = createSelector(
    getPlotIds,
    getPlotEntities,
    ((ids, entities) => {
        return ids.map((id) => entities[id]);
    })
);

export const getPlotRenderError = createSelector(
    getTimeseriesState,
    fromTimeseries.getPlotRenderError
);


// caching
export const getOASCacheError = createSelector(
    getTimeseriesState,
    fromTimeseries.getOASCacheError
);

export const getOASCacheSuccess = createSelector(
    getTimeseriesState,
    fromTimeseries.getOASCacheSuccess
);

export const getOASCacheRefreshing = createSelector(
    getTimeseriesState,
    fromTimeseries.getOASCacheRefreshing
);

export const getTSYCacheError = createSelector(
    getTimeseriesState,
    fromTimeseries.getTSYCacheError
);

export const getTSYCacheSuccess = createSelector(
    getTimeseriesState,
    fromTimeseries.getTSYCacheSuccess
);

export const getTsyOASCacheRefreshing = createSelector(
    getTimeseriesState,
    fromTimeseries.getTsyOASCacheRefreshing
);


//tracker mode extra feature

export const getTrackerTimestamp = createSelector(
    getTimeseriesState,
    fromTimeseries.getTrackerTimestamp
);

export const getTrackerTimestampLoadingStatus = createSelector(
    getTimeseriesState,
    fromTimeseries.getTrackerTimestampLoading
);

export const getTrackerTimestampLoadedStatus = createSelector(
    getTimeseriesState,
    fromTimeseries.getTrackerTimestampLoaded
);

export const getTrackerTimestampError = createSelector(
    getTimeseriesState,
    fromTimeseries.getTrackerTimestampError
);


export const getTrackerDownloadingStatus = createSelector(
    getTimeseriesState,
    fromTimeseries.getTrackerDownloading
);

export const getTrackerDownloadedStatus = createSelector(
    getTimeseriesState,
    fromTimeseries.getTrackerDownloaded
);

export const getTrackerDownloadError = createSelector(
    getTimeseriesState,
    fromTimeseries.getTrackerDownloadError
);