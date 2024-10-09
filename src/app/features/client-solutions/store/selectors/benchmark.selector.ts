import { createSelector } from '@ngrx/store';

import * as fromModels from '../../models';

import * as fromFeature from '../reducers';
import * as fromBenchmarks from '../reducers/benchmark.reducer';

/**
 * Benchmark Selectors
 */
export const getBenchmarksState = createSelector(
    fromFeature.getClientSolutionsFeatureState,
    (state: fromFeature.ClientSolutionsState) => state.benchmarks
);

export const getBenchmarksIds = createSelector(
    getBenchmarksState,
    fromBenchmarks.getIds
);

export const getBenchmarksEntities = createSelector(
    getBenchmarksState,
    fromBenchmarks.getEntities
);

export const getBenchmarksLoadingStatus = createSelector(
    getBenchmarksState,
    fromBenchmarks.getLoadingStatus
);

export const getBenchmarksLoadedStatus = createSelector(
    getBenchmarksState,
    fromBenchmarks.getLoadedStatus
);

export const getBenchmarksError = createSelector(
    getBenchmarksState,
    fromBenchmarks.getError
);

export const getActionStatus = createSelector(
    getBenchmarksState,
    fromBenchmarks.getActionStatus
);





export const getBenchmarks = createSelector(
    getBenchmarksEntities,
    getBenchmarksIds,
    (entities, ids) => {
        return ids.map(id => entities[id]);
    }
);

export const getSelectedBenchmark = createSelector(
    getBenchmarksEntities,
    fromBenchmarks.getSelectedBenchmarkId,
    (entities, id) => {
        return id && entities[id];
    }
);

export const getBenchMarksCodeMap = createSelector(
    getBenchmarksEntities,
    entity => {
        if (entity) {
            const dictMap: any = {};
            Object.keys(entity).forEach(key => {
                const targetBenchmark: fromModels.IBenchmark = entity[key];
                dictMap[targetBenchmark.code] = targetBenchmark;
            });
            return dictMap;
        } else {
            return {};
        }
    }
)

