import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromTimeseriesExporter from '../reducers/timeseries-exporter.reducer';

const getTimeseriesExporterState = createSelector(
    fromFeature.getTimeseriesExporterFeatureState,
    (state: fromFeature.TimeseriesExporterState) => state.timeseriesExporter
);


export const getParams = createSelector(
    getTimeseriesExporterState,
    fromTimeseriesExporter.getParams
);


export const getSelectedMonitor = createSelector(
    getTimeseriesExporterState,
    fromTimeseriesExporter.getSelectedMonitor
);







export const getMonitorsLoadingStatus = createSelector(
    getTimeseriesExporterState,
    fromTimeseriesExporter.getMonitorsLoading
);

export const getMonitorsLoadedStatus = createSelector(
    getTimeseriesExporterState,
    fromTimeseriesExporter.getMonitorsLoaded
);

export const getMonitorsErrorStatus = createSelector(
    getTimeseriesExporterState,
    fromTimeseriesExporter.getMonitorsLoadingError
);





export const getMonitorNames = createSelector(
    getTimeseriesExporterState,
    fromTimeseriesExporter.getMonitorNames
);

export const getMonitorEntities = createSelector(
    getTimeseriesExporterState,
    fromTimeseriesExporter.getMonitorEntities
);

export const getMonitors = createSelector(
    getMonitorNames,
    getMonitorEntities,
    (names, entities) => {
        return names.map(name => entities[name]);
    }
);

export const getSelectedMonitorEntity = createSelector(
    getSelectedMonitor,
    getMonitorEntities,
    (selectMonitorName, entity) => {
        if (selectMonitorName && entity) {
            return entity[selectMonitorName];
        } else {
            // NOOP
            return null;
        }
    }
);










export const getMonitorData = createSelector(
    getTimeseriesExporterState,
    fromTimeseriesExporter.getMonitorData
);

export const getSelectedMonitorData = createSelector(
    getSelectedMonitor,
    getMonitorData,
    (name, data) => {
        return data[name];
    }
);

export const getMonitorDataLoadingStatus = createSelector(
    getTimeseriesExporterState,
    fromTimeseriesExporter.getMonitorDataLoading
);

export const getMonitorDataLoadedStatus = createSelector(
    getTimeseriesExporterState,
    fromTimeseriesExporter.getMonitorDataLoaded
);

export const getMonitorDataLoadingErrorStatus = createSelector(
    getTimeseriesExporterState,
    fromTimeseriesExporter.getMonitorDataLoadingError
);







export const getMonitorSavingStatus = createSelector(
    getTimeseriesExporterState,
    fromTimeseriesExporter.getMonitorSaving
);

export const getMonitorSavedStatus = createSelector(
    getTimeseriesExporterState,
    fromTimeseriesExporter.getMonitorSaved
);

export const getMonitorSavingErrorStatus = createSelector(
    getTimeseriesExporterState,
    fromTimeseriesExporter.getMonitorSavingError
);






export const getMonitorListDeletingStatus = createSelector(
    getTimeseriesExporterState,
    fromTimeseriesExporter.getMonitorListDeleting
);

export const getMonitorListDeletedStatus = createSelector(
    getTimeseriesExporterState,
    fromTimeseriesExporter.getMonitorListDeleted
);

export const getMonitorListDeleteErrorStatus = createSelector(
    getTimeseriesExporterState,
    fromTimeseriesExporter.getMonitorListDeleteError
);

export const getTimeseries = createSelector(
    getTimeseriesExporterState,
    fromTimeseriesExporter.getTimeseries
);

export const getTimeseriesLoading = createSelector(
    getTimeseriesExporterState,
    fromTimeseriesExporter.getTimeseriesLoading
);

export const getTimeseriesLoaded = createSelector(
    getTimeseriesExporterState,
    fromTimeseriesExporter.getTimeseriesLoaded
);

export const getTimeseriesError = createSelector(
    getTimeseriesExporterState,
    fromTimeseriesExporter.getTimeseriesError
);
