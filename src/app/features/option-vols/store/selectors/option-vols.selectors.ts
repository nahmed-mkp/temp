import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromModel from '../../models';
import * as fromOptionVols from '../reducers/option-vols.reducer';

const getOptionVolsState = createSelector(
    fromFeature.getOptionVolsState,
    (state: fromFeature.OptionVolsState) => state.optionVols
);


export const getActiveIndex = createSelector(
    getOptionVolsState,
    fromOptionVols.getActiveIndex
);


export const getOptionChainSupportedTickers = createSelector(
    getOptionVolsState,
    fromOptionVols.getSupportedTickers
);

export const getOptionChainSupportedTickersLoading = createSelector(
    getOptionVolsState,
    fromOptionVols.getSupportedTickersLoading
);

export const getOptionChainSupportedTickersLoaded = createSelector(
    getOptionVolsState,
    fromOptionVols.getSupportedTickersLoaded
);

export const getOptionChainSupportedTickersError = createSelector(
    getOptionVolsState,
    fromOptionVols.getSupportedTickersError
);






export const getFuturesMapping = createSelector(
    getOptionVolsState,
    fromOptionVols.getFuturesMapping
);

export const getFuturesMappingLoading = createSelector(
    getOptionVolsState,
    fromOptionVols.getFuturesMappingLoading
);

export const getFuturesMappingLoaded = createSelector(
    getOptionVolsState,
    fromOptionVols.getFuturesMappingLoaded
);

export const getFuturesMappingError = createSelector(
    getOptionVolsState,
    fromOptionVols.getFuturesMappingError
);







export const getOptionChainTickers = createSelector(
    getOptionVolsState,
    fromOptionVols.getOptionChainTickers
);

export const getOptionChainsEntities = createSelector(
    getOptionVolsState,
    fromOptionVols.getOptionChains
);

export const getOptionChainsLoadingStatus = createSelector(
    getOptionVolsState,
    fromOptionVols.getOptionChainLoading
);

export const getOptionChainsLoadedStatus = createSelector(
    getOptionVolsState,
    fromOptionVols.getOptionChainLoaded
);

export const getOptionChainsError = createSelector(
    getOptionVolsState,
    fromOptionVols.getOptionChainError
);

export const getOptionChains = createSelector(
    getOptionChainTickers,
    getOptionChainsEntities,
    (tickers, entities) => {
        return tickers.map(ticker => entities[ticker]);
    }
);








export const getTradeSizingCapitalsIds = createSelector(
    getOptionVolsState,
    fromOptionVols.getSizingCapitalsIds
);

export const getTradeSizingCapitalsEntities = createSelector(
    getOptionVolsState,
    fromOptionVols.getSizingCapitalsEntities
);

export const getTradeSizingCapitalsLoadingStatus = createSelector(
    getOptionVolsState,
    fromOptionVols.getSizingCapitalsLoading
);

export const getTradeSizingCapitalsLoadedStatus = createSelector(
    getOptionVolsState,
    fromOptionVols.getSizingCapitalsLoaded
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





















export const getSelectedOptionVolRequestIds = createSelector(
    getOptionVolsState,
    fromOptionVols.getSelectedOptionVolRequestIds
);

export const getOptionVolRequestEntities = createSelector(
    getOptionVolsState,
    fromOptionVols.getOptionVolRequestEntities
);

// export const getOptionVolAnalysisLoading = createSelector(
//     getOptionVolsState,
//     fromOptionVols.getOptionVolAnalysisLoading
// );

// export const getOptionVolAnalysisLoaded = createSelector(
//     getOptionVolsState,
//     fromOptionVols.getOptionVolAnalysisLoaded
// );

// export const getOptionVolAnalysisError = createSelector(
//     getOptionVolsState,
//     fromOptionVols.getOptionVolAnalysisError
// );

export const getOptionVolsAnalysisRequests = createSelector(
    getSelectedOptionVolRequestIds,
    getOptionVolRequestEntities,
    (ids, entities) => {
        return ids.map(id => entities[id]);
    }
);

export const getOptionVolRequestEntitiesByGuid = createSelector(
    getOptionVolRequestEntities,
    (entity, props) => {
        if (entity && entity[props] !== undefined) {
            return entity[props];
        }
    }
)

export const getActiveOptionVolsAnalysisRequest = createSelector(
    getActiveIndex,
    getSelectedOptionVolRequestIds,
    getOptionVolRequestEntities,
    (activeIndex, requestIds, requestEntity) => {
        if (activeIndex !== undefined && activeIndex !== null && requestIds && requestEntity) {
            const targetGuid = requestIds[activeIndex];
            if (targetGuid) {
                return requestEntity[targetGuid];
            } else {
                return null;
            } 
        }
    }
)











export const getOptionVolAnalysisLoadingEntity = createSelector(
    getOptionVolsState,
    fromOptionVols.getOptionVolAnalysisLoadingEntity
);

export const getOptionVolAnalysisLoadingEntityByGuid = createSelector(
    getOptionVolAnalysisLoadingEntity,
    (entity, props) => {
        if (entity && entity[props] !== undefined) {
            return entity[props];
        }
    }
);

export const getOptionVolAnalysisLoadedEntity = createSelector(
    getOptionVolsState,
    fromOptionVols.getOptionVolAnalysisLoadedEntity
);

export const getOptionVolAnalysisLoadedEntityByGuid = createSelector(
    getOptionVolAnalysisLoadedEntity,
    (entity, props) => {
        if (entity && entity[props] !== undefined) {
            return entity[props];
        }
    }
);



export const getOptionVolsResultEntities = createSelector(
    getOptionVolsState,
    fromOptionVols.getOptionVolResultEntities
);

export const getOptionVolsResults = createSelector(
    getSelectedOptionVolRequestIds,
    getOptionVolsResultEntities,
    (ids, entities) => {
        return ids.map(id => entities[id]);
    }
);

export const getOptionVolsResultEntitiesByGuid = createSelector(
    getOptionVolsResultEntities,
    (entity, props) => {
        if (entity && entity[props]) {
            return entity[props];
        }
    }
);








export const getOptionVolsErrorEntities = createSelector(
    getOptionVolsState,
    fromOptionVols.getOptionVolResultErrorEntities
);

export const getOptionVolsResultErrors = createSelector(
    getSelectedOptionVolRequestIds,
    getOptionVolsErrorEntities,
    (ids, entities) => {
        return ids.map(id => entities[id]);
    }
);

export const getOptionVolsErrorEntitiesByGuid = createSelector(
    getOptionVolsErrorEntities,
    (entity, props) => {
        if (entity && entity[props]) {
            return entity[props];
        }
    }
);








export const getOptionVolLogEntities = createSelector(
    getOptionVolsState,
    fromOptionVols.getOptionVolLogsEntities
);

export const getOptionVolLogs = createSelector(
    getSelectedOptionVolRequestIds,
    getOptionVolLogEntities,
    (ids, entities) => {
        return ids.map(id => entities[id]);
    }
);

export const getOptionVolLogEntitiesByGuid = createSelector(
    getOptionVolLogEntities,
    (entity, props) => {
        if (entity && entity[props]) {
            return entity[props];
        }
    }
);

