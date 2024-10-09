import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromAgreements from '../reducers/agreements.reducer';

const getTradeAgreementsState = createSelector(
    fromFeature.getAllocationsState,
    (state: fromFeature.AllocationsState) => state.tradeAgreements
);

export const getTradeAgreementTypeIds = createSelector(
    getTradeAgreementsState,
    fromAgreements.getAgreementTypeIds
);

export const getTradeAgreementTypeEntities = createSelector(
    getTradeAgreementsState,
    fromAgreements.getAgreementTypeEntities
);

export const getTradeAgreementTypesLoading = createSelector(
    getTradeAgreementsState,
    fromAgreements.getAgreementTypesLoading
);

export const getTradeAgreementTypesLoaded = createSelector(
    getTradeAgreementsState,
    fromAgreements.getAgreementTypesLoaded
);

export const getTradeAgreementTypesError = createSelector(
    getTradeAgreementsState,
    fromAgreements.getAgreementTypesError
);

export const getTradeAgreementTypes = createSelector(
    getTradeAgreementTypeIds,
    getTradeAgreementTypeEntities,
    (ids, entities) => {
        return ids.map((id) => entities[id]);
    }
);

export const getTradeAgreementIds = createSelector(
    getTradeAgreementsState,
    fromAgreements.getAgreementIds
);

export const getTradeAgreementEntities = createSelector(
    getTradeAgreementsState,
    fromAgreements.getAgreementEntities
);

export const getTradeAgreementsLoading = createSelector(
    getTradeAgreementsState,
    fromAgreements.getAgreementsLoading
);

export const getTradeAgreementsLoaded = createSelector(
    getTradeAgreementsState,
    fromAgreements.getAgreementsLoaded
);

export const getTradeAgreementsError = createSelector(
    getTradeAgreementsState,
    fromAgreements.getAgreementsError
);

export const getTradeAgreements = createSelector(
    getTradeAgreementIds,
    getTradeAgreementEntities,
    (ids, entities) => {
        return Object.keys(entities).map(key => entities[key])
        // return ids.map((id) => entities[id]);
    }
);

export const getAgreementOriginData = createSelector(
    getTradeAgreementsState,
    fromAgreements.getAgreementOriginData
);










export const getSelectedTradeAgreementTypes = createSelector(
    getTradeAgreementsState,
    fromAgreements.getSelectedAgreementTypes
);

export const getFXGiveupAgreementIds = createSelector(
    getTradeAgreementsState,
    fromAgreements.getFXGiveupAgreementIds
);

export const getFXGiveupAgreementEntities = createSelector(
    getTradeAgreementsState,
    fromAgreements.getFXGiveupAgreementEntities
);

export const getFXGiveupAgreements = createSelector(
    getFXGiveupAgreementIds,
    getFXGiveupAgreementEntities,
    (ids, entities) => {
        return ids.map((id) => entities[id]);
    }
);

export const getAgreementSecTypes = createSelector(
    getTradeAgreementsState,
    fromAgreements.getAgreementSecTypes
);

export const getTradeAgreementSecTypeEntities = createSelector(
    getTradeAgreementsState,
    fromAgreements.getAgreementSecTypeEntities
);

export const getTradeAgreementSecTypesLoading = createSelector(
    getTradeAgreementsState,
    fromAgreements.getAgreementSecTypesLoading
);

export const getTradeAgreementSecTypesLoaded = createSelector(
    getTradeAgreementsState,
    fromAgreements.getAgreementSecTypesLoaded
);

export const getTradeAgreementSecTypesError = createSelector(
    getTradeAgreementsState,
    fromAgreements.getAgreementSecTypesError
);

export const getTradeAgreementSecTypes = createSelector(
    getAgreementSecTypes,
    getTradeAgreementSecTypeEntities,
    (ids, entities) => {
        return ids.map((id) => entities[id]);
    }
);


// Allocation Cache

export const getTradeAgreementAllocationCacheIds = createSelector(
    getTradeAgreementsState,
    fromAgreements.getAllocationCacheIds
);

export const getTradeAgreementAllocationCacheEntities = createSelector(
    getTradeAgreementsState,
    fromAgreements.getAllocationCacheEntities
);

export const getTradeAgreementAllocationCacheLoadingStatus = createSelector(
    getTradeAgreementsState,
    fromAgreements.getAllocationCacheLoadingStatus
);

export const getTradeAgreementAllocationCacheLoadedStatus = createSelector(
    getTradeAgreementsState,
    fromAgreements.getAllocationCacheLoadedStatus
);

export const getTradeAgreementAllocationCacheError = createSelector(
    getTradeAgreementsState,
    fromAgreements.getAllocationCacheError
);

export const getTradeAgreementAllocationCache = createSelector(
    getTradeAgreementAllocationCacheIds,
    getTradeAgreementAllocationCacheEntities,
    (ids, entities) => {
        return ids.map((id) => entities[id]);
    }
);
