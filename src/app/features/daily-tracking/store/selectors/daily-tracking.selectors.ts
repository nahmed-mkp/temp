import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromModel from '../../models';
import * as fromDailyTracking from '../reducers/daily-tracking.reducer';

const getDailyTrackingState = createSelector(
    fromFeature.getDailyTrackingState,
    (state: fromFeature.DailyTrackingState) => state.main
);

export const getDataLoadingState = createSelector(
    getDailyTrackingState,
    fromDailyTracking.getDataLoading
);

export const getDataLoadedState = createSelector(
    getDailyTrackingState,
    fromDailyTracking.getDataLoaded
);

export const getDataError = createSelector(
    getDailyTrackingState,
    fromDailyTracking.getDataError
);

export const getAsOfDate = createSelector(
    getDailyTrackingState,
    fromDailyTracking.getAsOfDate
);

export const getUseSOFR = createSelector(
    getDailyTrackingState,
    fromDailyTracking.getUseSOFR
);

export const getLegacyMode = createSelector(
    getDailyTrackingState,
    fromDailyTracking.getLegacyMode
);

export const getTsySwaps = createSelector(
    getDailyTrackingState,
    fromDailyTracking.getTsySwaps
);

export const getMbsRaws = createSelector(
    getDailyTrackingState,
    fromDailyTracking.getMbsRaws
);

export const getMbsRisks = createSelector(
    getDailyTrackingState,
    fromDailyTracking.getMbsRisks
);

export const getMbsOas = createSelector(
    getDailyTrackingState,
    fromDailyTracking.getMbsOas
);

export const getCSCloses = createSelector(
    getDailyTrackingState,
    fromDailyTracking.getCSCloses
);

export const getMode = createSelector(
    getDailyTrackingState,
    fromDailyTracking.getMode
);


// Intraday Metrics Selector

// OHLC
export const getOHLC = createSelector(
    getDailyTrackingState,
    fromDailyTracking.getOHLC
);

export const getOHLCLoading = createSelector(
    getDailyTrackingState,
    fromDailyTracking.getOHLCLoading
);

export const getOHLCLoaded = createSelector(
    getDailyTrackingState,
    fromDailyTracking.getOHLCLoaded
);

export const getOHLCError = createSelector(
    getDailyTrackingState,
    fromDailyTracking.getOHLCError
);

// Median By Time of Day

export const getMedianByTimeOfDay = createSelector(
    getDailyTrackingState,
    fromDailyTracking.getMedianByTimeOfDay
);

export const getMedianByTimeOfDayLoading = createSelector(
    getDailyTrackingState,
    fromDailyTracking.getMedianByTimeOfDayLoading
);

export const getMedianByTimeOfDayLoaded = createSelector(
    getDailyTrackingState,
    fromDailyTracking.getMedianByTimeOfDayLoaded
);

export const getMedianByTimeOfDayError = createSelector(
    getDailyTrackingState,
    fromDailyTracking.getMedianByTimeOfDayError
);


export const getTradewebExcelRestartingStatus = createSelector(
    getDailyTrackingState,
    fromDailyTracking.getTradewebExcelRestarting
);

export const getTradewebExcelRestartedStatus = createSelector(
    getDailyTrackingState,
    fromDailyTracking.getTradewebExcelRestarted
);

export const getTradewebExcelRestartErrorStatus = createSelector(
    getDailyTrackingState,
    fromDailyTracking.getTradewebExcelRestartError
);

// Intraday Plots

export const getTrackingIntrdayPlot = createSelector(
    getDailyTrackingState, 
    fromDailyTracking.getIntradayPlot
);

export const getTrackingIntrdayPlotLoading = createSelector(
    getDailyTrackingState,
    fromDailyTracking.getIntradayPlotLoading
);

export const getTrackingIntrdayPlotLoaded = createSelector(
    getDailyTrackingState,
    fromDailyTracking.getIntradayPlotLoaded
);

export const getTrackingIntrdayPlotError = createSelector(
    getDailyTrackingState,
    fromDailyTracking.getIntradayPlotError
);


// Intraday Metadata

export const getTrackingIntrdayMetadata = createSelector(
    getDailyTrackingState,
    fromDailyTracking.getIntradayMetadata
);

export const getTrackingIntrdayMetadataLoading = createSelector(
    getDailyTrackingState,
    fromDailyTracking.getIntradayPlotLoading
);

export const getTrackingIntrdayMetadataLoaded = createSelector(
    getDailyTrackingState,
    fromDailyTracking.getIntradayMetadataLoaded
);

export const getTrackingIntrdayMetadataError = createSelector(
    getDailyTrackingState,
    fromDailyTracking.getIntradayMetadataError
);


// Historical Plots

export const getTrackingHistoricalPlot = createSelector(
    getDailyTrackingState,
    fromDailyTracking.getHistoricalPlot
);

export const getTrackingHistoricalPlotLoading = createSelector(
    getDailyTrackingState,
    fromDailyTracking.getHistoricalPlotLoading
);

export const getTrackingHistoricalPlotLoaded = createSelector(
    getDailyTrackingState,
    fromDailyTracking.getHistoricalPlotLoaded
);

export const getTrackingHistoricalPlotError = createSelector(
    getDailyTrackingState,
    fromDailyTracking.getHistoricalPlotError
);