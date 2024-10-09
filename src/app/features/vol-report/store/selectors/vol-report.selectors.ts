import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromModel from '../../models';
import * as fromVolReport from '../reducers/vol-report.reducer';

const getVolReportState = createSelector(
    fromFeature.getVolReportState,
    (state: fromFeature.VolReportState) => state.volReport
);


export const getTempSaveTimeseriesRecord = createSelector(
    getVolReportState,
    fromVolReport.getTempSaveTimeseriesRecord
);

export const getActiveTimeseriesRecord = createSelector(
    getVolReportState,
    fromVolReport.getActiveTimeseriesRecord
);

export const getActiveAsOfDate = createSelector(
    getVolReportState,
    fromVolReport.getActiveAsOfDate
)



export const getAsOfDates = createSelector(
    getVolReportState,
    fromVolReport.getAsOfDates
);

export const getAsOfDateLoadingStatus = createSelector(
    getVolReportState,
    fromVolReport.getAsOfDateLoading
);

export const getAsOfDateLoadedStatus = createSelector(
    getVolReportState,
    fromVolReport.getAsOfDateLoaded
);

export const getAsOfDateError = createSelector(
    getVolReportState,
    fromVolReport.getAsOfDateError
);




export const getTimeseriesRecord = createSelector(
    getVolReportState,
    fromVolReport.getTimeseriesRecord
);

export const getTimeseriesRecordLoadingStatus = createSelector(
    getVolReportState,
    fromVolReport.getTimeseriesRecordLoading
);

export const getTimeseriesRecordLoadedStatus = createSelector(
    getVolReportState,
    fromVolReport.getTimeseriesRecordLoaded
);

export const getTimeseriesRecordError = createSelector(
    getVolReportState,
    fromVolReport.getTimeseriesRecordError
);




export const getVolReport = createSelector(
    getVolReportState,
    fromVolReport.getVolReport
);

export const getVolReportLoadingStatus = createSelector(
    getVolReportState,
    fromVolReport.getVolReportLoading
);

export const getVolReportLoadedStatus = createSelector(
    getVolReportState,
    fromVolReport.getVolReportLoaded
);

export const getVolReportError = createSelector(
    getVolReportState,
    fromVolReport.getVolReportError
);

export const getActiveVolReport = createSelector(
    getActiveAsOfDate,
    getVolReport,
    (activeAsOfDate, volReportEntities) => {
        if(activeAsOfDate && volReportEntities) return volReportEntities[activeAsOfDate];
        else return [];
    }
)