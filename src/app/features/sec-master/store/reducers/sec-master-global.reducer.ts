import * as fromActions from '../actions/sec-master-global.actions';
import * as fromModels from '../../models/sec-master-global.models';

export interface SecMasterGlobalState {

    // UI ----------------------------------

    activeSecType: {[display: string]: string};
    activeRequestId: string;
    activeSecurityDetailId: {[display: string]: string};
    showUserActivityViewer: boolean;


    // -------------------------------------

    assetClassFieldMapIds: number[];
    assetClassFieldMapEntities: { [id: number]: fromModels.IAssetClassFieldMap };
    assetClassFieldMapLoading: boolean;
    assetClassFieldMapLoaded: boolean;
    assetClassFieldMapError?: string;

    supportedAssetClasses: string[];
    identifiers: string[];
    activeBrokers: string[];
    countries: any[];
    lookupsLoading: boolean;
    lookupsLoaded: boolean;
    lookupsError?: string;

    activeSecurity: any;
    securityCreating: boolean;
    securityCreated: boolean;
    securityCreationError?: string;

    marketDataDefaultsEntity: any;
    marketDataDefaultsLoading: boolean;
    marketDataDefaultsLoaded: boolean;
    marketDataDefaultsError?: string;

    userActivityRequestIds: string[];
    userActivityRequestEntities: {[requestId: string]: fromModels.IUserActivity};
    userActivityLoading: boolean;
    userActivityLoaded: boolean;
    userActivityError?: string;

    securityViewerDynamicTabDict: any;
    securityViewerDynamicTabDictLoading: boolean;
    securityViewerDynamicTabDictLoaded: boolean;
    securityViewerDynamicTabDictError?: string;

    securityDetailEntity: any;
    securityDetailLoadingEntity: any;
    securityDetailLoadedEntity: any;
    securityDetailErrorEntity?: any;

    securitySearchResult: fromModels.ISecuritySearchResult[];
    securitySearchResultLoading: boolean;
    securitySearchResultLoaded: boolean;
    securitySearchResultError?: string;

    securityDetailFromSearchEntity: any;
    securityDetailFromSearchLoadingEntity: any;
    securityDetailFromSearchLoadedEntity: any;
    securityDetailFromSearchErrorEntity?: any;

    securityDetailUpdating: boolean;
    securityDetailUpdated: boolean;
    securityDetailUpdateError?: string;


    securityForDelete: any;
    securityForDeleteLoading: boolean;
    securityForDeleteLoaded: boolean;
    securityForDeleteError?: string;

    deleteSecurityPending: boolean;
    deleteSecurityFinished: boolean;
    deleteSecurityError?: string;


    // -------------------------------------------------------


    securityDoNotUpdateList: fromModels.ISecurityForDoNotUpdateFlag[];
    securityDoNotUpdateListLoading: boolean;
    securityDoNotUpdateListLoaded: boolean;
    securityDoNotUpdateListError?: string;

    setSecurityDoNotUpdatePending: boolean;
    setSecurityDoNotUpdateFinish: boolean;
    setSecurityDoNotUpdateError?: string;

    manualSetSecurityDoNotUpdatePending: boolean;
    manualSetSecurityDoNotUpdateFinish: boolean;
    manualSetSecurityDoNotUpdateError?: string;
}


export const initialState: SecMasterGlobalState = {

    activeSecType: {},
    activeRequestId: null,
    activeSecurityDetailId: {},
    showUserActivityViewer: true,

    assetClassFieldMapIds: [],
    assetClassFieldMapEntities: {},
    assetClassFieldMapLoading: false,
    assetClassFieldMapLoaded: false,

    supportedAssetClasses: [],
    identifiers: [],
    activeBrokers: [],
    countries: [],
    lookupsLoading: false,
    lookupsLoaded: false,

    activeSecurity: null,
    securityCreating: false,
    securityCreated: false,

    marketDataDefaultsEntity: [],
    marketDataDefaultsLoading: false,
    marketDataDefaultsLoaded: false,

    userActivityRequestIds: [],
    userActivityRequestEntities: {},
    userActivityLoading: false,
    userActivityLoaded: false,

    securityViewerDynamicTabDict: null,
    securityViewerDynamicTabDictLoading: false,
    securityViewerDynamicTabDictLoaded: false,

    securityDetailEntity: {},
    securityDetailLoadingEntity: {},
    securityDetailLoadedEntity: {},
    securityDetailErrorEntity: {},

    securitySearchResult: [],
    securitySearchResultLoading: false,
    securitySearchResultLoaded: false,

    securityDetailFromSearchEntity: {},
    securityDetailFromSearchLoadingEntity: {},
    securityDetailFromSearchLoadedEntity: {},
    securityDetailFromSearchErrorEntity: {},

    securityDetailUpdating: false,
    securityDetailUpdated: false,



    securityForDelete: null,
    securityForDeleteLoading: false,
    securityForDeleteLoaded: false,

    deleteSecurityPending: false,
    deleteSecurityFinished: false,



    securityDoNotUpdateList: [],
    securityDoNotUpdateListLoading: false,
    securityDoNotUpdateListLoaded: false,

    setSecurityDoNotUpdatePending: false,
    setSecurityDoNotUpdateFinish: false,

    manualSetSecurityDoNotUpdatePending: false,
    manualSetSecurityDoNotUpdateFinish: false,
};

export function reducer(state = initialState, action: fromActions.SecMasterGlobalActions) {
    switch (action.type) {

        case fromActions.SecMasterGlobalActionTypes.SET_ACTIVE_SEC_TYPE: {
            return {
                ...state,
                activeSecType: {...state.activeSecType, [action.payload.display]: action.payload.data}
            };
        }

        case fromActions.SecMasterGlobalActionTypes.SET_ACTIVE_REQUEST_ID: {
            return {
                ...state,
                activeRequestId: action.payload
            };
        }

        case fromActions.SecMasterGlobalActionTypes.SET_ACTIVE_SECURITY_DETAIL_ID: {
            return {
                ...state,
                activeSecurityDetailId: {...state.activeSecurityDetailId, [action.payload.display]: action.payload.data}
            }
        }

        case fromActions.SecMasterGlobalActionTypes.TOGGLE_USER_ACTIVITY_VIEWER: {
            return {
                ...state,
                showUserActivityViewer: !state.showUserActivityViewer
            };
        }



        // -------------------------------------------------------------------------------------



        case fromActions.SecMasterGlobalActionTypes.LOAD_ASSET_CLASS_FIELD_MAP: {
            return {
                ...state,
                assetClassFieldMapLoading: true,
                assetClassFieldMapLoaded: false,
                assetClassFieldMapError: null
            };
        }

        case fromActions.SecMasterGlobalActionTypes.LOAD_ASSET_CLASS_FIELD_MAP_COMPLETE: {
            const payload = action.payload;
            const ids = payload.map((map) => map.mapId);
            const newEntities = payload.reduce((entities: { [id: number]: fromModels.IAssetClassFieldMap },
                item: fromModels.IAssetClassFieldMap) => {
                return Object.assign({}, entities, { [item.mapId]: item });
            }, {});
            return {
                ...state,
                assetClassFieldMapLoading: false,
                assetClassFieldMapLoaded: true,
                assetClassFieldMapIds: [...ids],
                assetClassFieldMapEntities: newEntities
            };
        }

        case fromActions.SecMasterGlobalActionTypes.LOAD_ASSET_CLASS_FIELD_MAP_FAILED: {
            return {
                ...state,
                assetClassFieldMapLoading: false,
                assetClassFieldMapLoaded: false,
                assetClassFieldMapError: action.payload
            };
        }

        case fromActions.SecMasterGlobalActionTypes.LOAD_SEC_MASTER_LOOKUPS: {
            return {
                ...state,
                lookupsLoading: true,
                lookupsLoaded: false,
                lookupsError: null
            };
        }

        case fromActions.SecMasterGlobalActionTypes.LOAD_SEC_MASTER_LOOKUPS_COMPLETE: {
            const payload = action.payload;
            const supportedAssetClasses = Object.keys(payload).indexOf('AssetClasses') >= 0 ? payload['AssetClasses'] : [];
            const identifiers = Object.keys(payload).indexOf('Identifiers') >= 0 ? payload['Identifiers'] : [];
            const activeBrokers = Object.keys(payload).indexOf('ActiveBrokers') >= 0 ? payload['ActiveBrokers'] : [];
            const countries = Object.keys(payload).indexOf('Country') >= 0 ? payload['Country'] : [];
            return {
                ...state,
                lookupsLoading: true,
                lookupsLoaded: false,
                lookupsError: null,
                supportedAssetClasses: [...supportedAssetClasses],
                identifiers: [...identifiers],
                activeBrokers: [...activeBrokers],
                countries: [...countries]
            };
        }

        case fromActions.SecMasterGlobalActionTypes.LOAD_MARKET_DATA_DEFAULTS: {
            return {
                ...state,
                marketDataDefaultsLoading: true,
                marketDataDefaultsLoaded: false,
                marketDataDefaultsError: null
            };
        }

        case fromActions.SecMasterGlobalActionTypes.LOAD_MARKET_DATA_DEFAULTS_COMPLETE: {
            return {
                ...state,
                marketDataDefaultsLoading: false,
                marketDataDefaultsLoaded: true,
                marketDataDefaultsEntity: action.payload,
                marketDataDefaultsError: null
            };
        }

        case fromActions.SecMasterGlobalActionTypes.LOAD_MARKET_DATA_DEFAULTS_FAILED: {
            return {
                ...state,
                marketDataDefaultsLoading: false,
                marketDataDefaultsLoaded: false,
                marketDataDefaultsError: action.payload

            };
        }

        case fromActions.SecMasterGlobalActionTypes.CREATE_NEW_SECURITY:
        case fromActions.SecMasterGlobalActionTypes.RETRY_CREATE_NEW_SECURITY: {
            return {
                ...state,
                securityCreating: true,
                securityCreated: false,
                securityCreationError: null
            };
        }

        case fromActions.SecMasterGlobalActionTypes.CREATE_NEW_SECURITY_COMPLETE:
        case fromActions.SecMasterGlobalActionTypes.RETRY_CREATE_NEW_SECURITY_COMPLETE: {
            const newActivity = action.payload;
            const newIds = state.userActivityRequestIds.filter((id) => id !== newActivity.requestId);
            const newEntities = Object.assign({}, state.userActivityRequestEntities, { [newActivity.requestId]: newActivity });
            return {
                ...state,
                securityCreating: false,
                securityCreated: true,
                userActivityRequestIds: [newActivity.requestId, ...newIds],
                getUserActivityRequestEntities: newEntities
            };
        }

        case fromActions.SecMasterGlobalActionTypes.CREATE_NEW_SECURITY_FAILED:
        case fromActions.SecMasterGlobalActionTypes.RETRY_CREATE_NEW_SECURITY_FAILED: {
            return {
                ...state,
                securityCreating: false,
                securityCreated: false,
                securityCreationError: action.payload
            };
        }



        case fromActions.SecMasterGlobalActionTypes.LOAD_USER_ACTIVITY: {
            return {
                ...state,
                userActivityLoading: true,
                userActivityLoaded: false,
                userActivityError: null
            };
        }

        case fromActions.SecMasterGlobalActionTypes.LOAD_USER_ACTIVITY_COMPLETE: {
            const newActivities = action.payload;
            const newIds = newActivities.map((activity) => activity.requestId);
            const newEntities = newActivities.reduce((entities: {[requestId: string]: fromModels.IUserActivity}, item: fromModels.IUserActivity) => {
                return Object.assign({}, entities, {[item.requestId]: item});
            }, {});
            return {
                ...state,
                userActivityLoading: false,
                userActivityLoaded: true,
                userActivityRequestIds: [...newIds],
                userActivityRequestEntities: newEntities
            };
        }

        case fromActions.SecMasterGlobalActionTypes.LOAD_USER_ACTIVITY_FAILED: {
            return {
                ...state,
                userActivityLoading: false,
                userActivityLoaded: false,
                userActivityError: action.payload
            };
        }






        case fromActions.SecMasterGlobalActionTypes.LOAD_USER_ACTIVITY_PROGRESS_COMPLETE: {
            const newActivity = action.payload;
            return {
                ...state,
                userActivityRequestEntities: {...state.userActivityRequestEntities, [newActivity.requestId]: newActivity}
            };
        }















        case fromActions.SecMasterGlobalActionTypes.LOAD_SECURITY_VIEWER_DYNAMIC_TAB_DICT: {
            return {
                ...state,
                securityViewerDynamicTabDictLoading: true,
                securityViewerDynamicTabDictLoaded: false,
                securityViewerDynamicTabDictError: null,
            };
        }

        case fromActions.SecMasterGlobalActionTypes.LOAD_SECURITY_VIEWER_DYNAMIC_TAB_DICT_COMPLETE: {
            return {
                ...state,
                securityViewerDynamicTabDict: action.payload,
                securityViewerDynamicTabDictLoading: false,
                securityViewerDynamicTabDictLoaded: true,
                securityViewerDynamicTabDictError: null,
            };
        }

        case fromActions.SecMasterGlobalActionTypes.LOAD_SECURITY_VIEWER_DYNAMIC_TAB_DICT_FAILED: {
            return {
                ...state,
                securityViewerDynamicTabDictLoading: false,
                securityViewerDynamicTabDictLoaded: false,
                securityViewerDynamicTabDictError: action.payload,
            };
        }








        case fromActions.SecMasterGlobalActionTypes.LOAD_SECURITY_DETAIL: {
            return {
                ...state,
                securityDetailLoadingEntity: {...state.securityDetailLoadingEntity, [action.payload]: true},
                securityDetailLoadedEntity: {...state.securityDetailLoadedEntity, [action.payload]: false},
                securityDetailErrorEntity: {...state.securityDetailErrorEntity, [action.payload]: null},
            };
        }

        case fromActions.SecMasterGlobalActionTypes.LOAD_SECURITY_DETAIL_COMPLETE: {
            return {
                ...state,
                securityDetailEntity: {...state.securityDetailEntity, [action.payload.request_id]: action.payload},
                securityDetailLoadingEntity: {...state.securityDetailLoadingEntity, [action.payload.request_id]: false},
                securityDetailLoadedEntity: {...state.securityDetailLoadedEntity, [action.payload.request_id]: true},
                securityDetailErrorEntity: {...state.securityDetailErrorEntity, [action.payload.request_id]: null},
            };
        }

        case fromActions.SecMasterGlobalActionTypes.LOAD_SECURITY_DETAIL_FAILED: {
            return {
                ...state,
                securityDetailLoadingEntity: {...state.securityDetailLoadingEntity, [action.payload.request_id]: false},
                securityDetailLoadedEntity: {...state.securityDetailLoadedEntity, [action.payload.request_id]: false},
                securityDetailErrorEntity: {...state.securityDetailErrorEntity, [action.payload.request_id]: action.payload.error},
            };
        }






        case fromActions.SecMasterGlobalActionTypes.LOAD_SECURITY_SEARCH_RESULT: {
            return {
                ...state,
                securitySearchResult: [],
                securitySearchResultLoading: true,
                securitySearchResultLoaded: false,
                securitySearchResultError: null,
            };
        }

        case fromActions.SecMasterGlobalActionTypes.LOAD_SECURITY_SEARCH_RESULT_COMPLETE: {
            return {
                ...state,
                securitySearchResult: action.payload,
                securitySearchResultLoading: false,
                securitySearchResultLoaded: true,
                securitySearchResultError: null,
            };
        }

        case fromActions.SecMasterGlobalActionTypes.LOAD_SECURITY_SEARCH_RESULT_FAILED: {
            return {
                ...state,
                securitySearchResult: [],
                securitySearchResultLoading: false,
                securitySearchResultLoaded: false,
                securitySearchResultError: action.payload,
            };
        }






        case fromActions.SecMasterGlobalActionTypes.LOAD_SECURITY_DETAIL_FROM_SEARCH: {

            return {
                ...state,
                securityDetailFromSearchLoadingEntity: {...state.securityDetailFromSearchLoadingEntity, [action.payload.id]: true},
                securityDetailFromSearchLoadedEntity: {...state.securityDetailFromSearchLoadedEntity, [action.payload.id]: false},
                securityDetailFromSearchErrorEntity: {...state.securityDetailFromSearchErrorEntity, [action.payload.id]: null}
            };
        }

        case fromActions.SecMasterGlobalActionTypes.LOAD_SECURITY_DETAIL_FROM_SEARCH_COMPLETE: {
            return {
                ...state,
                securityDetailFromSearchEntity: {...state.securityDetailFromSearchEntity, [action.payload.id]: action.payload.data},
                securityDetailFromSearchLoadingEntity: {...state.securityDetailFromSearchLoadingEntity, [action.payload.id]: false},
                securityDetailFromSearchLoadedEntity: {...state.securityDetailFromSearchLoadedEntity, [action.payload.id]: true},
                securityDetailFromSearchErrorEntity: {...state.securityDetailFromSearchErrorEntity, [action.payload.id]: null}
            };
        }

        case fromActions.SecMasterGlobalActionTypes.LOAD_SECURITY_DETAIL_FROM_SEARCH_FAILED: {
            return {
                ...state,
                securityDetailFromSearchLoadingEntity: {...state.securityDetailFromSearchLoadingEntity, [action.payload.id]: false},
                securityDetailFromSearchLoadedEntity: {...state.securityDetailFromSearchLoadedEntity, [action.payload.id]: false},
                securityDetailFromSearchErrorEntity: {...state.securityDetailFromSearchErrorEntity, [action.payload.id]: action.payload.error}
            };
        }

        case fromActions.SecMasterGlobalActionTypes.UPDATE_SECURITY_DETAIL: {
            return {
                ...state,
                securityDetailUpdating: true,
                securityDetailUpdated: false,
                securityDetailUpdateError: null,
            };
        }

        case fromActions.SecMasterGlobalActionTypes.UPDATE_SECURITY_DETAIL_COMPLETE: {
            return {
                ...state,
                securityDetailUpdating: false,
                securityDetailUpdated: true,
                securityDetailUpdateError: null,
            };
        }

        case fromActions.SecMasterGlobalActionTypes.UPDATE_SECURITY_DETAIL_FAILED: {
            return {
                ...state,
                securityDetailUpdating: false,
                securityDetailUpdated: false,
                securityDetailUpdateError: action.payload,
            };
        }

        case fromActions.SecMasterGlobalActionTypes.LOAD_SECURITY_FOR_DELETE: {
            return {
                ...state,
                securityForDeleteLoading: true,
                securityForDeleteLoaded: false,
                securityForDeleteError: null,
            };
        }

        case fromActions.SecMasterGlobalActionTypes.LOAD_SECURITY_FOR_DELETE_COMPLETE: {
            return {
                ...state,
                securityForDelete: action.payload,
                securityForDeleteLoading: false,
                securityForDeleteLoaded: true,
                securityForDeleteError: null,
            };
        }

        case fromActions.SecMasterGlobalActionTypes.LOAD_SECURITY_FOR_DELETE_FAILED: {
            return {
                ...state,
                securityForDeleteLoading: false,
                securityForDeleteLoaded: false,
                securityForDeleteError: action.payload,
            };
        }





        case fromActions.SecMasterGlobalActionTypes.DELETE_SECURITY: {
            return {
                ...state,
                deleteSecurityPending: true,
                deleteSecurityFinished: false,
                deleteSecurityError: null,
            };
        }

        case fromActions.SecMasterGlobalActionTypes.DELETE_SECURITY_COMPLETE: {
            return {
                ...state,
                securityForDelete: null,
                deleteSecurityPending: false,
                deleteSecurityFinished: true,
                deleteSecurityError: null,
            };
        }

        case fromActions.SecMasterGlobalActionTypes.DELETE_SECURITY_FAILED: {
            return {
                ...state,
                deleteSecurityPending: false,
                deleteSecurityFinished: false,
                deleteSecurityError: action.payload,
            };
        }

        // ----------------------------------------------------------------------------------------------



        case fromActions.SecMasterGlobalActionTypes.LOAD_SECURITY_DO_NOT_UPDATE_FLAG_LIST: {
            return {
                ...state,
                securityDoNotUpdateList: [],
                securityDoNotUpdateListLoading: true,
                securityDoNotUpdateListLoaded: false,
                securityDoNotUpdateListError: null,
            };
        }

        case fromActions.SecMasterGlobalActionTypes.LOAD_SECURITY_DO_NOT_UPDATE_FLAG_LIST_COMPLETE: {
            return {
                ...state,
                securityDoNotUpdateList: action.payload,
                securityDoNotUpdateListLoading: false,
                securityDoNotUpdateListLoaded: true,
                securityDoNotUpdateListError: null,
            };
        }

        case fromActions.SecMasterGlobalActionTypes.LOAD_SECURITY_DO_NOT_UPDATE_FLAG_LIST_FAILED: {
            return {
                ...state,
                securityDoNotUpdateList: [],
                securityDoNotUpdateListLoading: false,
                securityDoNotUpdateListLoaded: false,
                securityDoNotUpdateListError: action.payload,
            };
        }

        case fromActions.SecMasterGlobalActionTypes.SET_SECURITY_DO_NOT_UPDATE_FLAG: {
            return {
                ...state,
                setSecurityDoNotUpdatePending: true,
                setSecurityDoNotUpdateFinish: false,
                setSecurityDoNotUpdateError: null
            };
        }

        case fromActions.SecMasterGlobalActionTypes.SET_SECURITY_DO_NOT_UPDATE_FLAG_COMPLETE: {
            return {
                ...state,
                setSecurityDoNotUpdatePending: false,
                setSecurityDoNotUpdateFinish: true,
                setSecurityDoNotUpdateError: null
            };
        }

        case fromActions.SecMasterGlobalActionTypes.SET_SECURITY_DO_NOT_UPDATE_FLAG_FAILED: {
            return {
                ...state,
                setSecurityDoNotUpdatePending: false,
                setSecurityDoNotUpdateFinish: false,
                setSecurityDoNotUpdateError: action.payload
            };
        }

        case fromActions.SecMasterGlobalActionTypes.MANUAL_SET_SECURITY_DO_NOT_UPDATE_FLAG: {
            return {
                ...state,
                manualSetSecurityDoNotUpdatePending: true,
                manualSetSecurityDoNotUpdateFinish: false,
                manualSetSecurityDoNotUpdateError: null
            };
        }

        case fromActions.SecMasterGlobalActionTypes.MANUAL_SET_SECURITY_DO_NOT_UPDATE_FLAG_COMPLETE: {
            return {
                ...state,
                manualSetSecurityDoNotUpdatePending: false,
                manualSetSecurityDoNotUpdateFinish: true,
                manualSetSecurityDoNotUpdateError: null
            };
        }

        case fromActions.SecMasterGlobalActionTypes.MANUAL_SET_SECURITY_DO_NOT_UPDATE_FLAG_FAILED: {
            return {
                ...state,
                manualSetSecurityDoNotUpdatePending: false,
                manualSetSecurityDoNotUpdateFinish: false,
                manualSetSecurityDoNotUpdateError: action.payload
            };
        }


        default:
            return state;
    }
}

// Search
export const getActiveSecType = (state: SecMasterGlobalState) => state.activeSecType;
export const getActiveRequestId = (state: SecMasterGlobalState) => state.activeRequestId;
export const getActiveSecurityDetailId = (state: SecMasterGlobalState) => state.activeSecurityDetailId;
export const getShowUserActivityViewer = (state: SecMasterGlobalState) => state.showUserActivityViewer;

export const getAssetClassFieldMapIds = (state: SecMasterGlobalState) => state.assetClassFieldMapIds;
export const getAssetClassFieldMapEntities = (state: SecMasterGlobalState) => state.assetClassFieldMapEntities;
export const getAssetClassFieldMapLoading = (state: SecMasterGlobalState) => state.assetClassFieldMapLoading;
export const getAssetClassFieldMapLoaded = (state: SecMasterGlobalState) => state.assetClassFieldMapLoaded;
export const getAssetClassFieldMapError = (state: SecMasterGlobalState) => state.assetClassFieldMapError;

export const getMarketDataDefaultsEntities = (state: SecMasterGlobalState) => state.marketDataDefaultsEntity;
export const getMarketDataDefaultsLoading = (state: SecMasterGlobalState) => state.marketDataDefaultsLoading;
export const getMarketDataDefaultsLoaded = (state: SecMasterGlobalState) => state.marketDataDefaultsLoaded;
export const getMarketDataDefaultsError = (state: SecMasterGlobalState) => state.marketDataDefaultsError;

export const getSecMasterSupportedAssetClasses = (state: SecMasterGlobalState) => state.supportedAssetClasses;
export const getSecMasterIdentifiers = (state: SecMasterGlobalState) => state.identifiers;
export const getSecMasterActiveBrokers = (state: SecMasterGlobalState) => state.activeBrokers;
export const getSecMasterCountries = (state: SecMasterGlobalState) => state.countries;

export const getSecMasterLookupsLoading = (state: SecMasterGlobalState) => state.lookupsLoading;
export const getSecMasterLookupsLoaded = (state: SecMasterGlobalState) => state.lookupsLoaded;
export const getSecMasterLookupsError = (state: SecMasterGlobalState) => state.lookupsError;

export const getUserActivityRequestIds = (state: SecMasterGlobalState) => state.userActivityRequestIds;
export const getUserActivityRequestEntities = (state: SecMasterGlobalState) => state.userActivityRequestEntities;
export const getUserActivityLoading = (state: SecMasterGlobalState) => state.userActivityLoading;
export const getUserActivityLoaded = (state: SecMasterGlobalState) => state.userActivityLoaded;
export const getUserActivityError = (state: SecMasterGlobalState) => state.userActivityError;

export const getSecMasterSecurityCreating = (state: SecMasterGlobalState) => state.securityCreating;
export const getSecMasterSecurityCreated = (state: SecMasterGlobalState) => state.securityCreated;
export const getSecMasterSecurityCreationError = (state: SecMasterGlobalState) => state.securityCreationError;
export const getSecMasterActiveSecurity = (state: SecMasterGlobalState) => state.activeSecurity;

export const getSecurityViewerDynamicTabDict = (state: SecMasterGlobalState) => state.securityViewerDynamicTabDict;
export const getSecurityViewerDynamicTabDictLoading = (state: SecMasterGlobalState) => state.securityViewerDynamicTabDictLoading;
export const getSecurityViewerDynamicTabDictLoaded = (state: SecMasterGlobalState) => state.securityViewerDynamicTabDictLoaded;
export const getSecurityViewerDynamicTabDictError = (state: SecMasterGlobalState) => state.securityViewerDynamicTabDictError;

export const getSecurityDetailEntity = (state: SecMasterGlobalState) => state.securityDetailEntity;
export const getSecurityDetailLoadingEntity = (state: SecMasterGlobalState) => state.securityDetailLoadingEntity;
export const getSecurityDetailLoadedEntity = (state: SecMasterGlobalState) => state.securityDetailLoadedEntity;
export const getSecurityDetailErrorEntity = (state: SecMasterGlobalState) => state.securityDetailErrorEntity;

export const getSecuritySearchResult = (state: SecMasterGlobalState) => state.securitySearchResult;
export const getSecuritySearchResultLoading = (state: SecMasterGlobalState) => state.securitySearchResultLoading;
export const getSecuritySearchResultLoaded = (state: SecMasterGlobalState) => state.securitySearchResultLoaded;
export const getSecuritySearchResultError = (state: SecMasterGlobalState) => state.securitySearchResultError;

export const getSecurityDetailFromSearchEntity = (state: SecMasterGlobalState) => state.securityDetailFromSearchEntity;
export const getSecurityDetailFromSearchLoadingEntity = (state: SecMasterGlobalState) => state.securityDetailFromSearchLoadingEntity;
export const getSecurityDetailFromSearchLoadedEntity = (state: SecMasterGlobalState) => state.securityDetailFromSearchLoadedEntity;
export const getSecurityDetailFromSearchErrorEntity = (state: SecMasterGlobalState) => state.securityDetailFromSearchErrorEntity;

export const getSecurityDetailUpdating = (state: SecMasterGlobalState) => state.securityDetailUpdating;
export const getSecurityDetailUpdated = (state: SecMasterGlobalState) => state.securityDetailUpdated;
export const getSecurityDetailUpdateError = (state: SecMasterGlobalState) => state.securityDetailUpdateError;

export const getSecurityForDelete = (state: SecMasterGlobalState) => state.securityForDelete;
export const getSecurityForDeleteLoading = (state: SecMasterGlobalState) => state.securityForDeleteLoading;
export const getSecurityForDeleteLoaded = (state: SecMasterGlobalState) => state.securityForDeleteLoaded;
export const getSecurityForDeleteError = (state: SecMasterGlobalState) => state.securityForDeleteError;

export const getDeleteSecurityPending = (state: SecMasterGlobalState) => state.deleteSecurityPending;
export const getDeleteSecurityFinished = (state: SecMasterGlobalState) => state.deleteSecurityFinished;
export const getDeleteSecurityError = (state: SecMasterGlobalState) => state.deleteSecurityError;


export const getSecurityDoNotUpdateList = (state: SecMasterGlobalState) => state.securityDoNotUpdateList;
export const getSecurityDoNotUpdateListLoading = (state: SecMasterGlobalState) => state.securityDoNotUpdateListLoading;
export const getSecurityDoNotUpdateListLoaded = (state: SecMasterGlobalState) => state.securityDoNotUpdateListLoaded;
export const getSecurityDoNotUpdateListError = (state: SecMasterGlobalState) => state.securityDoNotUpdateListError;

export const getSetSecurityDoNotUpdatePending = (state: SecMasterGlobalState) => state.setSecurityDoNotUpdatePending;
export const getSetSecurityDoNotUpdateFinish = (state: SecMasterGlobalState) => state.setSecurityDoNotUpdateFinish;
export const getSetSecurityDoNotUpdateError = (state: SecMasterGlobalState) => state.setSecurityDoNotUpdateError;

export const getManualSetSecurityDoNotUpdatePending = (state: SecMasterGlobalState) => state.setSecurityDoNotUpdatePending;
export const getManualSetSecurityDoNotUpdateFinish = (state: SecMasterGlobalState) => state.setSecurityDoNotUpdateFinish;
export const getManualSetSecurityDoNotUpdateError = (state: SecMasterGlobalState) => state.setSecurityDoNotUpdateError;
