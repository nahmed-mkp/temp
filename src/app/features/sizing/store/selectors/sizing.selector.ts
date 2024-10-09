import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromSizing from '../reducers/sizing.reducers';

const getTradeSizingSheetState = createSelector(
    fromFeature.getTradeSizingState,
    (state: fromFeature.TradeSizingState) => state.sizing
);

export const getTradeSizingSheetItemsIds = createSelector(
    getTradeSizingSheetState,
    fromSizing.getSizingSheetItemsIds
);

export const getTradeSizingSheetItemsEntities = createSelector(
    getTradeSizingSheetState,
    fromSizing.getSizingSheetEntities
);

export const getTradeSizingSheetItemsLoadingStatus = createSelector(
    getTradeSizingSheetState,
    fromSizing.getSizingSheetLoading
);

export const getTradeSizingSheetItemsLoadedStatus = createSelector(
    getTradeSizingSheetState,
    fromSizing.getSizingSheetLoaded
);

export const getTradeSizingSheetItemsFlat = createSelector(
    getTradeSizingSheetItemsIds,
    getTradeSizingSheetItemsEntities,
    (ids, entities) => {
        if (ids.length >= 1) { return ids.map(id => entities[id]); } else { return []; }
    }
);

export const getTradeSizingCapitalsIds = createSelector(
    getTradeSizingSheetState,
    fromSizing.getSizingCapitalsIds
);

export const getTradeSizingCapitalsEntities = createSelector(
    getTradeSizingSheetState,
    fromSizing.getSizingCapitalsEntities
);

export const getTradeSizingCapitalsLoadingStatus = createSelector(
    getTradeSizingSheetState,
    fromSizing.getSizingCapitalsLoading
);

export const getTradeSizingCapitalsLoadedStatus = createSelector(
    getTradeSizingSheetState,
    fromSizing.getSizingCapitalsLoaded
);

export const getTradeSizingCapitalsFlat = createSelector(
    getTradeSizingCapitalsIds,
    getTradeSizingCapitalsEntities,
    (ids, entities) => {
        if (ids.length >= 1) {
            let result = ids.map(id => entities[id]);

            // Sort by default, Type and cross_pod_name
            result = result.sort((a, b) => {
                if (a.default === true && b.default === false) {
                    return -1;
                } else if (a.default === false && b.default === true) {
                    return 1;
                } else {
                    if (a.Type === 'Fund' && b.Type === 'Pod') {
                        return -1;
                    } else if (a.Type === 'Pod' && b.Type === 'Fund') {
                        return 1;
                    } else {
                        return a.cross_pod_name.localeCompare(b.cross_pod_name);
                    }
                }
            });
            return result;
        } else {
            return [];
        }
    }
);

export const getTradeSizingSheetUpdatedTime = createSelector(
    getTradeSizingSheetState,
    fromSizing.getSizingSheetUpdatedTime
);

export const getTradeSizingSheetDefaultColumns = createSelector(
    getTradeSizingSheetState,
    fromSizing.getSizingSheetDefaultColumns
);

export const getTradeSizingSheetCapitalBase = createSelector(
    getTradeSizingSheetState,
    fromSizing.getSizingSheetCapitalBase
);

export const getTradeSizingSecurities = createSelector(
    getTradeSizingSheetState,
    fromSizing.getSizingSecurities
);

export const getTradeSizingSecuritiesLoading = createSelector(
    getTradeSizingSheetState,
    fromSizing.getSizingSecuritiesLoading
);

export const getTradeSizingSecuritiesLoaded = createSelector(
    getTradeSizingSheetState,
    fromSizing.getSizingSecuritiesLoaded
);

export const getTradeSizingSecuritiesError = createSelector(
    getTradeSizingSheetState,
    fromSizing.getSizingSecuritiesError
);

export const getTradeSizingDefaultCapitals = createSelector(
    getTradeSizingSheetState,
    fromSizing.getDefaultCapitals
);

export const getTradeSizingDefaultCapitalsLoading = createSelector(
    getTradeSizingSheetState,
    fromSizing.getDefaultCapitalsLoading
);

export const getTradeSizingDefaultCapitalsLoaded = createSelector(
    getTradeSizingSheetState,
    fromSizing.getDefaultCapitalsLoaded
);

export const getTradeSizingDefaultCapitalsError = createSelector(
    getTradeSizingSheetState,
    fromSizing.getDefaultCapitalsError
);