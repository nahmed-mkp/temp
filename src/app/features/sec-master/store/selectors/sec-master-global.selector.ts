import { createSelector } from '@ngrx/store';

import * as fromRoot from '../../../../store';
import * as fromFeature from '../reducers';
import * as fromSecMasterGlobal from '../reducers/sec-master-global.reducer';

/**
 * Global SecMaster Management
 */
export const getGlobalSecurityMasterState = createSelector(
    fromFeature.getSecurityMasterFeatureState,
    (state: fromFeature.SecurityMasterState) => state.secMasterGlobal
);

// UI ---------------------------------------------------

export const getActiveSecType = createSelector(
    getGlobalSecurityMasterState,
    fromSecMasterGlobal.getActiveSecType
);

export const getActiveRequestId = createSelector(
    getGlobalSecurityMasterState,
    fromSecMasterGlobal.getActiveRequestId
);

export const getActiveSecurityDetailId = createSelector(
    getGlobalSecurityMasterState,
    fromSecMasterGlobal.getActiveSecurityDetailId
);

export const getShowUserActivityViewer = createSelector(
    getGlobalSecurityMasterState,
    fromSecMasterGlobal.getShowUserActivityViewer
);




// Asset Class Map

export const getGlobalSecMasterAssetClassMapIds = createSelector(
    getGlobalSecurityMasterState,
    fromSecMasterGlobal.getAssetClassFieldMapIds
);

export const getGlobalSecMasterAssetClassMapEntities = createSelector(
    getGlobalSecurityMasterState,
    fromSecMasterGlobal.getAssetClassFieldMapEntities
);

export const getGlobalSecMasterAssetClassMapLoadingStatus = createSelector(
    getGlobalSecurityMasterState,
    fromSecMasterGlobal.getAssetClassFieldMapLoading
);

export const getGlobalSecMasterAssetClassMapLoadedStatus = createSelector(
    getGlobalSecurityMasterState,
    fromSecMasterGlobal.getAssetClassFieldMapLoaded
);

export const getGlobalSecMasterAssetClassMapError = createSelector(
    getGlobalSecurityMasterState,
    fromSecMasterGlobal.getAssetClassFieldMapError
);

export const getGlobalSecMasterAssetClassMap = createSelector(
    getGlobalSecMasterAssetClassMapIds,
    getGlobalSecMasterAssetClassMapEntities,
    (ids, entities) => {
        return ids.map((id) => entities[id]);
    }
);


// Supported Asset Classes
export const getGlobalSecMasterLookupsLoadingStatus = createSelector(
    getGlobalSecurityMasterState,
    fromSecMasterGlobal.getSecMasterLookupsLoading
);

export const getGlobalSecMasterLookupsLoadedStatus = createSelector(
    getGlobalSecurityMasterState,
    fromSecMasterGlobal.getSecMasterLookupsLoaded
);

export const getGlobalSecMasterLookupsErrorStatus = createSelector(
    getGlobalSecurityMasterState,
    fromSecMasterGlobal.getSecMasterLookupsError
);

export const getGlobalSecMasterSupportedAssetClasses = createSelector(
    getGlobalSecurityMasterState,
    fromSecMasterGlobal.getSecMasterSupportedAssetClasses
);

export const getGlobalSecMasterIdentifiers = createSelector(
    getGlobalSecurityMasterState,
    fromSecMasterGlobal.getSecMasterIdentifiers
);

export const getGlobalSecMasterActiveBrokers = createSelector(
    getGlobalSecurityMasterState,
    fromSecMasterGlobal.getSecMasterActiveBrokers
);

export const getGlobalSecMasterCountries = createSelector(
    getGlobalSecurityMasterState,
    fromSecMasterGlobal.getSecMasterCountries
);

// Security Creation

export const getGlobalSecMasterSecurityCreatingStatus = createSelector(
    getGlobalSecurityMasterState,
    fromSecMasterGlobal.getSecMasterSecurityCreating
);

export const getGlobalSecMasterSecurityCreatedStatus = createSelector(
    getGlobalSecurityMasterState,
    fromSecMasterGlobal.getSecMasterSecurityCreated
);

export const getSecMasterSecurityCreationError = createSelector(
    getGlobalSecurityMasterState,
    fromSecMasterGlobal.getSecMasterSecurityCreationError
);

export const getSecMasterSecurityActiveSecurity = createSelector(
    getGlobalSecurityMasterState,
    fromSecMasterGlobal.getSecMasterActiveSecurity
);


// User Activity

export const getSecMasterUserActivityRequestIds = createSelector(
    getGlobalSecurityMasterState,
    fromSecMasterGlobal.getUserActivityRequestIds
);

export const getSecMasterUserActivityRequestEntities = createSelector(
    getGlobalSecurityMasterState,
    fromSecMasterGlobal.getUserActivityRequestEntities
);

export const getSecMasterUserActivityLoading = createSelector(
    getGlobalSecurityMasterState,
    fromSecMasterGlobal.getUserActivityLoading
);

export const getSecMasterUserActivityLoaded = createSelector(
    getGlobalSecurityMasterState,
    fromSecMasterGlobal.getUserActivityLoaded
);

export const getSecMasterUserActivityError = createSelector(
    getGlobalSecurityMasterState,
    fromSecMasterGlobal.getUserActivityError
);

export const getSecMasterUserActivity = createSelector(
    getSecMasterUserActivityRequestIds,
    getSecMasterUserActivityRequestEntities,
    (ids, entities) => {
        return ids.map((id) => entities[id]);
    }
);










export const getSecurityViewerDynamicTabDict = createSelector(
    getGlobalSecurityMasterState,
    fromSecMasterGlobal.getSecurityViewerDynamicTabDict
);

export const getSecurityViewerDynamicTabDictLoading = createSelector(
    getGlobalSecurityMasterState,
    fromSecMasterGlobal.getSecurityViewerDynamicTabDictLoading
);

export const getSecurityViewerDynamicTabDictLoaded = createSelector(
    getGlobalSecurityMasterState,
    fromSecMasterGlobal.getSecurityViewerDynamicTabDictLoaded
);

export const getSecurityViewerDynamicTabDictError = createSelector(
    getGlobalSecurityMasterState,
    fromSecMasterGlobal.getSecurityViewerDynamicTabDictError
);

// export const getActiveSecTypeSecurityTabs = createSelector(
//     getActiveSecType,
//     getSecurityViewerDynamicTabDict,
//     (activeSecType, entity) => {
//         if (activeSecType && entity) {
//             return entity[activeSecType] && entity[activeSecType].tabs || [];
//         } else {
//             return [];
//         }
//     }
// );

export const getActiveSecTypeSecurityTabsByDisplay = (display: string) => {
    return createSelector(
        getActiveSecType,
        getSecurityViewerDynamicTabDict,
        (activeSecTypeEntity, entity) => {
            if (activeSecTypeEntity && entity) {
                const activeSecType = activeSecTypeEntity[display];
                return entity[activeSecType] && entity[activeSecType].tabs || [];
            } else {
                return [];
            }
        }
    );
}










export const getSecurityDetailEntity = createSelector(
    getGlobalSecurityMasterState,
    fromSecMasterGlobal.getSecurityDetailEntity
);

export const getSecurityDetailLoadingEntity = createSelector(
    getGlobalSecurityMasterState,
    fromSecMasterGlobal.getSecurityDetailLoadingEntity
);

export const getSecurityDetailLoadedEntity = createSelector(
    getGlobalSecurityMasterState,
    fromSecMasterGlobal.getSecurityDetailLoadedEntity
);

export const getSecurityDetailErrorEntity = createSelector(
    getGlobalSecurityMasterState,
    fromSecMasterGlobal.getSecurityDetailErrorEntity
);

export const getActiveRequestIdSecurityDetail = createSelector(
    getActiveRequestId,
    getSecurityDetailEntity,
    (requestId, entity) => requestId && entity && entity[requestId]
)










export const getMarketDataDefaultsEntities = createSelector(
    getGlobalSecurityMasterState,
    fromSecMasterGlobal.getMarketDataDefaultsEntities
);

export const getMarketDataDefaultsLoadingStatus = createSelector(
    getGlobalSecurityMasterState,
    fromSecMasterGlobal.getMarketDataDefaultsLoading
);

export const getMarketDataDefaultsLoadedStatus = createSelector(
    getGlobalSecurityMasterState,
    fromSecMasterGlobal.getMarketDataDefaultsLoaded
);

export const getMarketDataDefaultsError = createSelector(
    getGlobalSecurityMasterState,
    fromSecMasterGlobal.getMarketDataDefaultsError
);








export const getSecuritySearchResult = createSelector(
    getGlobalSecurityMasterState,
    fromSecMasterGlobal.getSecuritySearchResult
);

export const getSecuritySearchResultLoading = createSelector(
    getGlobalSecurityMasterState,
    fromSecMasterGlobal.getSecuritySearchResultLoading
);

export const getSecuritySearchResultLoaded = createSelector(
    getGlobalSecurityMasterState,
    fromSecMasterGlobal.getSecuritySearchResultLoaded
);

export const getSecuritySearchResultError = createSelector(
    getGlobalSecurityMasterState,
    fromSecMasterGlobal.getSecuritySearchResultError
);





export const getSecurityDetailFromSearchEntity = createSelector(
    getGlobalSecurityMasterState,
    fromSecMasterGlobal.getSecurityDetailFromSearchEntity
);

export const getSecurityDetailFromSearchLoadingEntity = createSelector(
    getGlobalSecurityMasterState,
    fromSecMasterGlobal.getSecurityDetailFromSearchLoadingEntity
);

export const getSecurityDetailFromSearchLoadedEntity = createSelector(
    getGlobalSecurityMasterState,
    fromSecMasterGlobal.getSecurityDetailFromSearchLoadedEntity
);

export const getSecurityDetailFromSearchErrorEntity = createSelector(
    getGlobalSecurityMasterState,
    fromSecMasterGlobal.getSecurityDetailFromSearchErrorEntity
);

// export const getActiveSecurityDetailFromSearch = createSelector(
//     getActiveSecurityDetailId,
//     getSecurityDetailFromSearchEntity,
//     (activeID, entity) => activeID && entity && entity[activeID]
// );

export const getActiveSecurityDetailFromSearchByDisplay = (display: string) => {
    return createSelector(
        getActiveSecurityDetailId,
        getSecurityDetailFromSearchEntity,
        (activeIdEntity, securityDetailFromSearchEntity) => {
            if (activeIdEntity && securityDetailFromSearchEntity) {
                const activeId = activeIdEntity[display];
                return securityDetailFromSearchEntity[activeId];
            }
        }
    );
}


// export const getActiveSecurityDetailFromSearchLoading = createSelector(
//     getActiveSecurityDetailId,
//     getSecurityDetailFromSearchLoadingEntity,
//     (activeID, entity) => {
//         if (activeID && entity) {
//             return entity[activeID]
//         } else {
//             return false;
//         }
//     }
// );

export const getActiveSecurityDetailFromSearchLoadingByDisplay = (display: string) => {
    return createSelector(
        getActiveSecurityDetailId,
        getSecurityDetailFromSearchLoadingEntity,
        (activeIdEntity, securityDetailFromSearchLoadingEntity) => {
            if (activeIdEntity && securityDetailFromSearchLoadingEntity) {
                const activeId = activeIdEntity[display];
                return securityDetailFromSearchLoadingEntity[activeId]
            } else {
                return false;
            }
        }
    );
}











export const getSecurityDetailUpdating = createSelector(
    getGlobalSecurityMasterState,
    fromSecMasterGlobal.getSecurityDetailUpdating
);

export const getSecurityDetailUpdated = createSelector(
    getGlobalSecurityMasterState,
    fromSecMasterGlobal.getSecurityDetailUpdated
);

export const getSecurityDetailUpdateError = createSelector(
    getGlobalSecurityMasterState,
    fromSecMasterGlobal.getSecurityDetailUpdateError
);








export const getSecurityForDelete = createSelector(
    getGlobalSecurityMasterState,
    fromSecMasterGlobal.getSecurityForDelete
);

export const getSecurityForDeleteLoading = createSelector(
    getGlobalSecurityMasterState,
    fromSecMasterGlobal.getSecurityForDeleteLoading
);

export const getSecurityForDeleteLoaded = createSelector(
    getGlobalSecurityMasterState,
    fromSecMasterGlobal.getSecurityForDeleteLoaded
);

export const getSecurityForDeleteError = createSelector(
    getGlobalSecurityMasterState,
    fromSecMasterGlobal.getSecurityForDeleteError
);





export const getDeleteSecurityPending = createSelector(
    getGlobalSecurityMasterState,
    fromSecMasterGlobal.getDeleteSecurityPending
);

export const getDeleteSecurityFinished = createSelector(
    getGlobalSecurityMasterState,
    fromSecMasterGlobal.getDeleteSecurityFinished
);
export const getDeleteSecurityError = createSelector(
    getGlobalSecurityMasterState,
    fromSecMasterGlobal.getDeleteSecurityError
);


// ----------------------------------------------------------------------------


export const getSecurityDoNotUpdateList = createSelector(
    getGlobalSecurityMasterState,
    fromSecMasterGlobal.getSecurityDoNotUpdateList
);

export const getSecurityDoNotUpdateListLoading = createSelector(
    getGlobalSecurityMasterState,
    fromSecMasterGlobal.getSecurityDoNotUpdateListLoading
);

export const getSecurityDoNotUpdateListLoaded = createSelector(
    getGlobalSecurityMasterState,
    fromSecMasterGlobal.getSecurityDoNotUpdateListLoaded
);

export const getSecurityDoNotUpdateListError = createSelector(
    getGlobalSecurityMasterState,
    fromSecMasterGlobal.getSecurityDoNotUpdateListError
);





export const getSetSecurityDoNotUpdatePending = createSelector(
    getGlobalSecurityMasterState,
    fromSecMasterGlobal.getSetSecurityDoNotUpdatePending
);

export const getSetSecurityDoNotUpdateFinish = createSelector(
    getGlobalSecurityMasterState,
    fromSecMasterGlobal.getSetSecurityDoNotUpdateFinish
);

export const getSetSecurityDoNotUpdateError = createSelector(
    getGlobalSecurityMasterState,
    fromSecMasterGlobal.getSetSecurityDoNotUpdateError
);






export const getManualSetSecurityDoNotUpdatePending = createSelector(
    getGlobalSecurityMasterState,
    fromSecMasterGlobal.getManualSetSecurityDoNotUpdatePending
);

export const getManualSetSecurityDoNotUpdateFinish = createSelector(
    getGlobalSecurityMasterState,
    fromSecMasterGlobal.getManualSetSecurityDoNotUpdateFinish
);

export const getManualSetSecurityDoNotUpdateError = createSelector(
    getGlobalSecurityMasterState,
    fromSecMasterGlobal.getManualSetSecurityDoNotUpdateError
);