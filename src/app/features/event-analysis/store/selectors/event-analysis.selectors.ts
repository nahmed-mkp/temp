import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromEventAnalysis from '../reducers/event-analysis.reducers';
import * as fromUtils from '../../../../factories';

const getEventAnalysisState = createSelector(
    fromFeature.getEventAnalysisState,
    (state: fromFeature.EventAnalysisState) => state.eventAnalysis
);




/********************************************************************************/
/*                             MetaData Management                              */
/********************************************************************************/

export const getPreprocessingOptionsEntities = createSelector(
    getEventAnalysisState,
    fromEventAnalysis.getPreprocessingOptionsEntities
);

export const getPreprocessingOptionsLoadingStatus = createSelector(
    getEventAnalysisState,
    fromEventAnalysis.getPreprocessingOptionsLoading
);

export const getPreprocessingOptionsLoadedStatus = createSelector(
    getEventAnalysisState,
    fromEventAnalysis.getPreprocessingOptionsLoaded
);

export const getPreprocessingOptionsError = createSelector(
    getEventAnalysisState,
    fromEventAnalysis.getPreprocessingOptionsError
);



export const getCustomFunctionSetEntities = createSelector(
    getEventAnalysisState,
    fromEventAnalysis.getCustomFunctionSetEntities
);

export const getCustomFunctionSetLoadingStatus = createSelector(
    getEventAnalysisState,
    fromEventAnalysis.getCustomFunctionSetLoading
);

export const getCustomFunctionSetLoadedStatus = createSelector(
    getEventAnalysisState,
    fromEventAnalysis.getCustomFunctionSetLoaded
);

export const getCustomFunctionSetError = createSelector(
    getEventAnalysisState,
    fromEventAnalysis.getCustomFunctionSetError
);




export const getConfigurationChangedForMarketDataUI = createSelector(
    getEventAnalysisState,
    fromEventAnalysis.getConfigurationChangedForMarketDataUI
);

export const getConfigurationChangedForEventAnalysisUI = createSelector(
    getEventAnalysisState,
    fromEventAnalysis.getConfigurationChangedForEventAnalysisUI
)





/********************************************************************************/
/*                               Calendar Management                            */
/********************************************************************************/

export const getEventCalendarIds = createSelector(
    getEventAnalysisState,
    fromEventAnalysis.getEventCalendarIds
);

export const getEventCalendarsEntities = createSelector(
    getEventAnalysisState,
    fromEventAnalysis.getEventCalendarsEntities
);

export const getEventCalendarsDates = createSelector(
    getEventAnalysisState,
    fromEventAnalysis.getEventCalendarDates
);

export const getEventCalendersLoadingStatus = createSelector(
    getEventAnalysisState,
    fromEventAnalysis.getEventCalendersLoading
);

export const getEventCalendarsLoadedStatus = createSelector(
    getEventAnalysisState,
    fromEventAnalysis.getEventCalendarsLoaded
);

export const getEventCalendarsError = createSelector(
    getEventAnalysisState,
    fromEventAnalysis.getEventCalendarsError
);

export const getEventCalendars = createSelector(
    getEventCalendarIds,
    getEventCalendarsEntities,
    (ids, entities) => {
        const calenders = ids.map((id) => entities[id]);
        calenders.sort((calenderA, calenderB) => {
            if (calenderA.type === 'public') {
                if (calenderB.type === 'private') { return -1; }
                if (calenderB.type === 'public') { return calenderB.level - calenderA.level; }
            } else {
                if (calenderB.type === 'public') { return 1; }
                if (calenderB.type === 'private') { return calenderB.level - calenderA.level; }
            }
        });
        return calenders;
        // return ids.map((id) => entities[id]);
    }
);

/********************************************************************************/
/*                       Timeseries Analyses Management                         */
/********************************************************************************/

export const getTimeseriesAnalysisIds = createSelector(
    getEventAnalysisState,
    fromEventAnalysis.getTimeseriesAnalysisIds
);

export const getTimeseriesAnalysisEntities = createSelector(
    getEventAnalysisState,
    fromEventAnalysis.getTimeseriesAnalysisEntities
);

export const getTimesseriesAnalyses = createSelector(
    getTimeseriesAnalysisIds,
    getTimeseriesAnalysisEntities,
    (ids, entities) => {
        if (ids.length >= 1) { return ids.map(id => entities[id]); } else { return []; }
    }
);

export const getTimeseriesAnalysisLoadingStatus = createSelector(
    getEventAnalysisState,
    fromEventAnalysis.getTimeseriesAnalysisLoading
);

export const getTimeseriesAnalysisLoadedStatus = createSelector(
    getEventAnalysisState,
    fromEventAnalysis.getTimeseriesAnalysisLoaded
);

export const getTimeseriesAnalysisSavingStatus = createSelector(
    getEventAnalysisState,
    fromEventAnalysis.getTimeseriesAnalysisSaving
);

export const getTimeseriesAnalysisSavedStatus = createSelector(
    getEventAnalysisState,
    fromEventAnalysis.getTimeseriesAnalysisSaved
);

export const getTimeseriesAnalysisDeletingStatus = createSelector(
    getEventAnalysisState,
    fromEventAnalysis.getTimeseriesAnalysisDeleting
);

export const getTimeseriesAnalysisDeletedStatus = createSelector(
    getEventAnalysisState,
    fromEventAnalysis.getTimeseriesAnalysisDeleted
);

export const getTimeseriesAnalysisError = createSelector(
    getEventAnalysisState,
    fromEventAnalysis.getTimeseriesAnalysisError
);


/********************************************************************************/
/*                           Configuration Management                           */
/********************************************************************************/

export const getConfigurationIds = createSelector(
    getEventAnalysisState,
    fromEventAnalysis.getConfigurationsIds
);

export const getConfigurationEntities = createSelector(
    getEventAnalysisState,
    fromEventAnalysis.getConfigurationsEntities
);

// export const getEventAnalysisIds = createSelector(
//     getEventAnalysisState,
//     fromEventAnalysis.getEventAnalysisIds
// );

// export const getEventAnalysisEntities = createSelector(
//     getEventAnalysisState,
//     fromEventAnalysis.getEventAnalysisEntities
// );

// Active Section of the Store -----------------------------------------------------------

export const getActiveGuid = createSelector(
    getEventAnalysisState,
    fromEventAnalysis.getActiveGuid
);

export const getActiveCalenderId = createSelector(
    getEventAnalysisState,
    fromEventAnalysis.getActiveCalenderId
);

export const getSelectedEventAnalysisDate = createSelector(
    getEventAnalysisState,
    fromEventAnalysis.getSelectedEventAnalysisDate
);


export const getActiveTimeseriesAnalysis = createSelector(
    getTimeseriesAnalysisEntities,
    getActiveGuid,
    (entities, activeGuid) => {
        return entities[activeGuid];
    }
);






export const getActiveCalenderDate = createSelector(
    getActiveCalenderId,
    getEventCalendarsDates,
    (activeCalenderId, datesEntities) => datesEntities[activeCalenderId] || []
);

export const getActiveConfigurationSetting = createSelector(
    getActiveGuid,
    getConfigurationEntities,
    (activeGuid, entities) => entities[activeGuid] && entities[activeGuid].data
);

export const getActiveConfigurationLoadingStatus = createSelector(
    getActiveGuid,
    getConfigurationEntities,
    (activeGuid, entities) => entities[activeGuid] && entities[activeGuid].loading
);

export const getActiveConfigurationLoadedStatus = createSelector(
    getActiveGuid,
    getConfigurationEntities,
    (activeGuid, entities) => entities[activeGuid] && entities[activeGuid].loaded
);

export const getActiveConfigurationError = createSelector(
    getActiveGuid,
    getConfigurationEntities,
    (activeGuid, entities) => entities[activeGuid] && entities[activeGuid].error
);



/********************************************************************************/
/*                          Event Analysis Management                           */
/********************************************************************************/

export const getEventAnalysisIds = createSelector(
    getEventAnalysisState,
    fromEventAnalysis.getEventAnalysisIds
);

export const getEventAnalysisEntities = createSelector(
    getEventAnalysisState,
    fromEventAnalysis.getEventAnalysisEntities
);

export const getActiveEventAnalysisData = createSelector(
    getActiveGuid,
    getEventAnalysisEntities,
    (activeGuid, entities) => entities[activeGuid] && entities[activeGuid]
);

export const getEventPlotSeriesVisibility = createSelector(
    getEventAnalysisState,
    fromEventAnalysis.getEventPlotSeriesVisibility
);

export const getActiveEventAnalysisEventPlotData = createSelector(
    getActiveEventAnalysisData,
    getActiveConfigurationSetting,
    getEventPlotSeriesVisibility,
    (data, activeConfiguration, seriesVisibility) => {
        if (data) {
            const plotDataObject: any = {};
            plotDataObject.timeSeriesYaxisRange =
                getCustomAxisRangesForEachTimeseries(activeConfiguration.timeseriesAndFormulas, data.summaryStats, data.plotData[0].value);
            plotDataObject.plotData = JSON.parse(JSON.stringify(data.plotData));
            plotDataObject.plotData[0].value.forEach(data => {
                const theMatchTimeseriesFormula = activeConfiguration.timeseriesAndFormulas.filter(timeseries => {
                    return data.name.includes(timeseries.alias); })[0];
                if (theMatchTimeseriesFormula) { data.customAxis = theMatchTimeseriesFormula.customAxis; }
            });

            plotDataObject.plotData[0].value = plotDataObject.plotData[0].value.filter(series => {
                let result;
                for (const key in seriesVisibility) {
                    if (series.name.includes(key)) {
                        result = seriesVisibility[key];
                        break;
                    }
                }
                return result;
            });
            plotDataObject.calendarDates = data.calendarDates;
            // console.log('plotDataObject', plotDataObject)
            return plotDataObject;
        }

    }
);

export const getActiveEventAnalysisDateColorCode = createSelector(
    getActiveEventAnalysisData,
    (data) => {
        return data && data.styleMetadata.lineColors;
    }
)

export const getActiveEventAnalysisStatisticData = createSelector(
    getActiveEventAnalysisData,
    (data) => {
        if (data) {
            const staticticObject: any = {};
            staticticObject.gridData = data.gridData;
            staticticObject.summaryStats = data.summaryStats;
            return staticticObject;
        }
    }
);

export const getActiveEventAnalysisLoadingStatus = createSelector(
    getEventAnalysisState,
    fromEventAnalysis.getEventAnalysisLoading
);

export const getActiveEventAnalysisLoadedStatus = createSelector(
    getEventAnalysisState,
    fromEventAnalysis.getEventAnalysisLoaded
);

export const getActiveEventAnalysisError = createSelector(
    getEventAnalysisState,
    fromEventAnalysis.getEventAnalysisError
);






export const getEventAnalysisMarketDataIds = createSelector(
    getEventAnalysisState,
    fromEventAnalysis.getMarketDataIds
);

export const getEventAnalysisMarketDataEntities = createSelector(
    getEventAnalysisState,
    fromEventAnalysis.getMarketDataEntities
);

export const getActiveEventAnalysisMarketData = createSelector(
    getActiveGuid,
    getEventAnalysisMarketDataEntities,
    (activeGuid, entities) => {
       return entities[activeGuid] || '';
    }
);

export const getActiveEventAnalysisMarketDataLoadingStatus = createSelector(
    getEventAnalysisState,
    fromEventAnalysis.getMarketDataLoading
);

export const getActiveEventAnalysisMarketDataLoadedStatus = createSelector(
    getEventAnalysisState,
    fromEventAnalysis.getMarketDataLoaded
);


export const getActiveEventAnalysisMarketDataError = createSelector(
    getEventAnalysisState,
    fromEventAnalysis.getMarketDataError
);

export const getActiveEventAnalysisMarketDataGridFormated = createSelector(
    getActiveEventAnalysisMarketData,
    (data: string) => {
        const service = new fromUtils.HighchartsDataService();
        const formatedData = service.csvToObjectArray(data, 'Date');
        return formatedData;
    }
);

export const getActiveEventAnalysisMarketDataPlotFormated = createSelector(
    getActiveConfigurationSetting,
    getActiveEventAnalysisMarketData,
    (activeConfiguration, data: string) => {
        const service = new fromUtils.HighchartsDataService();
        const formatedData = service.normalizeCSVData(data, 'Date');
        formatedData.forEach(item => {
            const theTimeseriesFormula = activeConfiguration.timeseriesAndFormulas.filter(timeseries => timeseries.alias === item.name)[0];
            if (theTimeseriesFormula) { item.customAxis = theTimeseriesFormula.customAxis; }
        });
        return formatedData;
    }
);
/*******************************************************************************/


/********************************************************************************/
/*                       Multi-Factor Analysis Management                       */
/********************************************************************************/

export const getMultiFactorRegressionAnalysis = createSelector(
    getEventAnalysisState,
    fromEventAnalysis.getRegressionAnalysisIds
);

export const getMultiFactorRegressionAnalysisEntities = createSelector(
    getEventAnalysisState,
    fromEventAnalysis.getRegressionAnalysisEntities
);

export const getActiveMultiFactorRegressionAnalysisData = createSelector(
    getActiveGuid,
    getMultiFactorRegressionAnalysisEntities,
    (activeGuid, entities) => entities[activeGuid] && entities[activeGuid].data
);
/*******************************************************************************/


// Utility --------------------------------------






// Utility -----------------------------------------------------------------------------------

function getCustomAxisRangesForEachTimeseries(timeseries, statictis, seriesPlotData): {[timeSeries: string]: number} {
    const timeSeriesYaxisRange = {};
    const timeSeriesNames_CustomAxis = [];
    timeseries.forEach(series => {
        if (series.customAxis) {
            timeSeriesYaxisRange[series.alias] = 0;
            timeSeriesNames_CustomAxis.push(series.alias);
        }
    });
    // statictis.forEach(record => {
    //     timeSeriesNames_CustomAxis.forEach(name => {
    //         if (record.name.includes(name)) {
    //             const currentMin = Math.abs(record.min);
    //             const currentMax = Math.abs(record.max);
    //             if (timeSeriesYaxisRange[name] < currentMin) { timeSeriesYaxisRange[name] = currentMin; }
    //             if (timeSeriesYaxisRange[name] < currentMax) { timeSeriesYaxisRange[name] = currentMax; }
    //         }
    //     });
    // });
    seriesPlotData.forEach(seriesObj => {
        timeSeriesNames_CustomAxis.forEach(name => {
            if (seriesObj.name.includes(name)) {
                const currentMin = Math.abs(seriesObj.data.reduce((a , b) => a[1] <= b[1] ? a : b )[1]);
                const currentMax = Math.abs(seriesObj.data.reduce((a , b) => a[1] <= b[1] ? b : a )[1]);
                if (timeSeriesYaxisRange[name] < currentMin) { timeSeriesYaxisRange[name] = currentMin; }
                if (timeSeriesYaxisRange[name] < currentMax) { timeSeriesYaxisRange[name] = currentMax; }
            }
        });
    });
    return timeSeriesYaxisRange;
}
