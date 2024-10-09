import { createSelector } from '@ngrx/store';

import * as fromModels from '../../models';

import * as fromRouting from '../../../../store/selectors';
import * as fromFeature from '../reducers';
import * as fromReports from '../reducers/reports.reducer';

/**
 * Reports State
 */
export const getReportsState = createSelector(
  fromFeature.getExternalReportsState,
  (state: fromFeature.ExternalReportsState) => state.reports
);

export const getReportIds = createSelector(
    getReportsState,
    fromReports.getIds
);

export const getReportEntities = createSelector(
    getReportsState,
    fromReports.getEntities
);

export const getReportLoadingStatus = createSelector(
    getReportsState,
    fromReports.getLoadingStatus
);

export const getReportLoadedStatus = createSelector(
    getReportsState,
    fromReports.getLoadedStatus
);

export const getReportError = createSelector(
    getReportsState,
    fromReports.getError
);

export const getReportUpdateStatus = createSelector(
    getReportsState,
    fromReports.getUpdateStatus
);

export const getReports = createSelector(
    getReportEntities,
    getReportIds,
    (entities, ids) => {
        return ids.map(id => entities[id]);
    }
);

// export const getSelectedReports = createSelector(
//     getReports,
//     fromRouting.getRouterStateUrl,
//     (reports, router): fromModels.Report[] => {
//         if (router) {
//             return reports.filter(report => report.workbookShortCode === router.params.workbookShortCode);
//         } else {
//             return null;
//         }
//     }
// );

// export const getSelectedReport = createSelector(
//     getReports,
//     fromRouting.getRouterStateUrl,
//     (reports, router): fromModels.Report => {
//         if (router) {
//             return reports.filter(report => report.shortCode === router.params.reportShortCode)[0];
//         } else {
//             return null;
//         }
//     }
// );
