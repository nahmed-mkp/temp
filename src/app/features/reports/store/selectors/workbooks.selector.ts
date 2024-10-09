import { createSelector } from '@ngrx/store';

import * as fromRouting from '../../../../store/selectors';
import * as fromFeature from '../reducers';
import * as fromWorkbooks from '../reducers/workbooks.reducer';

/**
 * Workbooks State
 */
export const getWorkbooksState = createSelector(
  fromFeature.getExternalReportsState,
  (state: fromFeature.ExternalReportsState) => state.workbooks
);

export const getWorkbookIds = createSelector(
    getWorkbooksState,
    fromWorkbooks.getIds
);

export const getWorkbookEntities = createSelector(
    getWorkbooksState,
    fromWorkbooks.getEntities
);

export const getWorkbookLoadingStatus = createSelector(
    getWorkbooksState,
    fromWorkbooks.getLoadingStatus
);

export const getWorkbookLoadedStatus = createSelector(
    getWorkbooksState,
    fromWorkbooks.getLoadedStatus
);

export const getWorkbookError = createSelector(
    getWorkbooksState,
    fromWorkbooks.getError
);

export const getWorkbookUpdateStatus = createSelector(
    getWorkbooksState,
    fromWorkbooks.getUpdateStatus
);

export const getWorkbooks = createSelector(
    getWorkbookEntities,
    getWorkbookIds,
    (entities, ids) => {
        return ids.map(id => entities[id]);
    }
);

// export const getSelectedWorkbooks = createSelector(
//     getWorkbooks,
//     fromRouting.getRouterStateUrl,
//     (workbooks, router): any => {
//         if (router) {
//             return workbooks.filter(workbook => workbook.projectShortCode === router.params.projectShortCode);
//         } else {
//             return null;
//         }
//     }
// );

// export const getSelectedWorkbook = createSelector(
//     getWorkbooks,
//     fromRouting.getRouterStateUrl,
//     (workbooks, router): any => {
//         if (router) {
//             return workbooks.filter(workbook => workbook.shortCode === router.params.workbookShortCode)[0];
//         } else {
//             return null;
//         }
//     }
// );
