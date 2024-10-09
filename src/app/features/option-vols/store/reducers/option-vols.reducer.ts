import * as fromModels from './../../models/option-vols.models';
import * as fromActions from './../actions/option-vols.actions';

export interface State {

    // UI -----------------------------------------------------

    selectedOptionVolRequestIds: string[];
    activeIndex: number;

    // Preload Data -----------------------------------------------------

    supportedTickers: string[];
    supportedTickersLoaded: boolean;
    supportedTickersLoading: boolean;
    supportedTickersError?: string;

    futuresMapping: fromModels.IFutureMapping[];
    futuresMappingLoaded: boolean;
    futuresMappingLoading: boolean;
    futuresMappingError?: string;

    optionChainTickers: string[];
    optionChains: {[id: string]: any};
    optionChainLoading: boolean;
    optionChainLoaded: boolean;
    optionChainError?: string;

    sizingCapitals: {
        ids: number[];
        entities: {[id: string]: fromModels.SizingCapital};
        loading: boolean;
        loaded: boolean;
        error?: string;
    };

    // Analysis -----------------------------------------------------

    optionVolRequestEntities: {[guid: string]: fromModels.IOptionVolRequest};
    optionVolAnalysisLoadingEntity: {[guid: string]: boolean};
    optionVolAnalysisLoadedEntity: {[guid: string]: boolean};

    // optionVolAnalysisLoading: boolean;
    // optionVolAnalysisLoaded: boolean;
    // optionVolAnalysisError?: string;

    optionVolResultEntities: {[guid: string]: any};
    optionVolResultErrorEntities: {[guid: string]: string};
    optionVolLogEntities: {[guid: string]: any};
}

export const initialState: State = {

    selectedOptionVolRequestIds: [],
    activeIndex: null,

    supportedTickers: [],
    supportedTickersLoading: false,
    supportedTickersLoaded: false,

    futuresMapping: [],
    futuresMappingLoaded: false,
    futuresMappingLoading: false,

    optionChainTickers: [],
    optionChains: {},
    optionChainLoading: false,
    optionChainLoaded: false,

    sizingCapitals: {
        ids: [],
        entities: {},
        loading: false,
        loaded: false
    },

    optionVolRequestEntities: {},
    optionVolAnalysisLoadingEntity: {},
    optionVolAnalysisLoadedEntity: {},

    // optionVolAnalysisLoading: false,
    // optionVolAnalysisLoaded: false,

    optionVolResultEntities: {},
    optionVolResultErrorEntities: {},

    optionVolLogEntities: {}

};

export function reducer(state = initialState, action: fromActions.OptionVolsActions) {
    switch (action.type) {


        case fromActions.OptionVolsActionTypes.ADD_REQUEST_ID: {
            const newActiveIndex = state.selectedOptionVolRequestIds.length;
            return {
                ...state,
                selectedOptionVolRequestIds: [...state.selectedOptionVolRequestIds, action.payload],
                activeIndex: newActiveIndex
            }
        }

        case fromActions.OptionVolsActionTypes.UPDATE_SELECTED_REQUEST_ID: {

            let targetIndex = state.activeIndex;
            const selectedGuid = action.payload;

            if (targetIndex === null) {
                targetIndex = 0;
            }

            state.selectedOptionVolRequestIds[targetIndex] = selectedGuid;

            return {
                ...state,
                activeIndex: targetIndex,
                selectedOptionVolRequestIds: [...state.selectedOptionVolRequestIds]
            };
        }

        case fromActions.OptionVolsActionTypes.DELETE_SELECTED_REQUEST_ID: {

            const targetIndex = state.selectedOptionVolRequestIds.indexOf(action.payload);
            if (targetIndex > -1) {
                state.selectedOptionVolRequestIds.splice(targetIndex, 1);
            }

            let newActiveIndex;
            if (state.selectedOptionVolRequestIds.length > 0) {
                newActiveIndex = 0;
            } else {
                newActiveIndex = null;
            }

            return {
                ...state,
                selectedOptionVolRequestIds: [...state.selectedOptionVolRequestIds],
                activeIndex: newActiveIndex,

                optionVolAnalysisLoadingEntity: Object.assign({}, state.optionVolAnalysisLoadingEntity, {[action.payload]: false}),
                optionVolAnalysisLoadedEntity: Object.assign({}, state.optionVolAnalysisLoadedEntity, {[action.payload]: false}),
            };
        }

        case fromActions.OptionVolsActionTypes.SET_ACTIVE_INDEX: {

            return {
                ...state,
                activeIndex: action.payload
            };
        }




























        case fromActions.OptionVolsActionTypes.LOAD_SUPPORTED_TICKERS:
        case fromActions.OptionVolsActionTypes.ADD_SUPPORTED_TICKERS:
        case fromActions.OptionVolsActionTypes.DELETE_SUPPORTED_TICKERS:
        case fromActions.OptionVolsActionTypes.UPDATE_SUPPORTED_TICKERS: {
            return {
                ...state,
                supportedTickersLoading: true,
                supportedTickersLoaded: false,
                supportedTickersError: null
            };
        }

        case fromActions.OptionVolsActionTypes.LOAD_SUPPORTED_TICKERS_COMPLETE:
        case fromActions.OptionVolsActionTypes.ADD_SUPPORTED_TICKERS_COMPLETE:
        case fromActions.OptionVolsActionTypes.DELETE_SUPPORTED_TICKERS_COMPLETE:
        case fromActions.OptionVolsActionTypes.UPDATE_SUPPORTED_TICKERS_COMPLETE: {
            return {
                ...state,
                supportedTickersLoading: false,
                supportedTickersLoaded: true,
                supportedTickers: [...action.payload],
                supportedTickersError: null
            };
        }

        case fromActions.OptionVolsActionTypes.LOAD_SUPPORTED_TICKERS_FAILED:
        case fromActions.OptionVolsActionTypes.ADD_SUPPORTED_TICKERS_FAILED:
        case fromActions.OptionVolsActionTypes.DELETE_SUPPORTED_TICKERS_FAILED:
        case fromActions.OptionVolsActionTypes.UPDATE_SUPPORTED_TICKERS_FAILED: {
            return {
                ...state,
                supportedTickersLoading: false,
                supportedTickersLoaded: false,
                supportedTickersError: action.payload
            };
        }







        case fromActions.OptionVolsActionTypes.LOAD_FUTURES_MAPPING:
        case fromActions.OptionVolsActionTypes.ADD_FUTURES_MAPPING:
        case fromActions.OptionVolsActionTypes.DELETE_FUTURES_MAPPING:
        case fromActions.OptionVolsActionTypes.UPDATE_FUTURES_MAPPING: {
            return {
                ...state,
                futuresMappingLoading: true,
                futuresMappingLoaded: false,
                futuresMappingError: null
            };
        }

        case fromActions.OptionVolsActionTypes.LOAD_FUTURES_MAPPING_COMPLETE:
        case fromActions.OptionVolsActionTypes.ADD_FUTURES_MAPPING_COMPLETE:
        case fromActions.OptionVolsActionTypes.DELETE_FUTURES_MAPPING_COMPLETE:
        case fromActions.OptionVolsActionTypes.UPDATE_FUTURES_MAPPING_COMPLETE: {
            return {
                ...state,
                futuresMappingLoading: false,
                futuresMappingLoaded: true,
                futuresMapping: action.payload
            };
        }

        case fromActions.OptionVolsActionTypes.LOAD_FUTURES_MAPPING_FAILED:
        case fromActions.OptionVolsActionTypes.ADD_FUTURES_MAPPING_FAILED:
        case fromActions.OptionVolsActionTypes.DELETE_FUTURES_MAPPING_FAILED:
        case fromActions.OptionVolsActionTypes.UPDATE_FUTURES_MAPPING_FAILED: {
            return {
                ...state,
                futuresMappingLoading: false,
                futuresMappingLoaded: false,
                futuresMappingError: action.payload
            };
        }





        // ------------------------------------------------------------------------------------------------------


        case fromActions.OptionVolsActionTypes.LOAD_SIZING_CAPITALS: {
            return {
                ...state,
                sizingCapitals: {
                    ...state.sizingCapitals,
                    loading: true,
                    loaded: false,
                    error: null
                }
            };
        }

        case fromActions.OptionVolsActionTypes.LOAD_SIZING_CAPITALS_COMPLETE: {
            const sizingCapitals = action.payload;

            const newIds = sizingCapitals.map(sizingCapital => sizingCapital.id).filter(id => state.sizingCapitals.ids.indexOf(id) < 0);

            const newEntities = sizingCapitals.reduce((entities: {[id: string]: fromModels.SizingCapital}, item: fromModels.SizingCapital) => {
                return Object.assign({}, entities,  {[item.id]: item});
            }, state.sizingCapitals.entities);

            return {
                ...state,
                sizingCapitals: {
                    ids: [...state.sizingCapitals.ids, ...newIds],
                    entities: newEntities,
                    loading: false,
                    loaded: true
                }
            };
        }

        case fromActions.OptionVolsActionTypes.LOAD_SIZING_CAPITALS_FAILED: {
            const error = action.payload;
            return {
                ...state,
                sizingCapitals: {
                    ...state.sizingCapitals,
                    loading: false,
                    loaded: false,
                    error: error
                }
            };
        }
















        case fromActions.OptionVolsActionTypes.RUN_OPTION_VOL_ANALYSIS:
        case fromActions.OptionVolsActionTypes.RUN_FX_OPTION_VOL_ANALYSIS: {
            const payload = action.payload;
            const guid = payload.guid;
            // const newIds = state.optionVolRequestIds.filter(id => id !== guid);
            // const newRequestEntities = newIds.map((id) => state.optionVolRequestEntities[id]);
            // const newResultEntities = newIds.map((id) => state.optionVolResultEntities[id]);
            // const newLogEntities = newIds.map((id) => state.optionVolLogEntities[id]);
            // const newResultErrorEntities = newIds.map((id) => state.optionVolRequestEntities[id]);

            return {
                ...state,
                // optionVolAnalysisLoading: true,
                // optionVolAnalysisLoaded: false,
                // optionVolAnalysisError: null,

                // optionVolRequestIds: [...newIds, guid],
                optionVolRequestEntities: Object.assign({}, state.optionVolRequestEntities, {[guid]: payload}),
                optionVolAnalysisLoadingEntity: Object.assign({}, state.optionVolAnalysisLoadingEntity, {[guid]: true}),
                optionVolAnalysisLoadedEntity: Object.assign({}, state.optionVolAnalysisLoadedEntity, {[guid]: false}),
                optionVolResultErrorEntities: Object.assign({}, state.optionVolResultErrorEntities, {[guid]: null}),
                optionVolLogEntities: Object.assign({}, state.optionVolLogEntities, {[guid]: null})

                // optionVolResultEntities: newResultEntities,
                // optionVolLogEntities: newLogEntities,
                // optionVolResultErrorEntities: newResultErrorEntities
            };
        }

        case fromActions.OptionVolsActionTypes.RUN_OPTION_VOL_ANALYSIS_COMPLETE:
        case fromActions.OptionVolsActionTypes.RUN_FX_OPTION_VOL_ANALYSIS_COMPLETE: {
            const payload = action.payload;
            const guid = payload.guid;
            // const newIds = state.optionVolRequestIds.filter(id => id !== guid);
            // const newResultEntities = newIds.map((id) => state.optionVolResultEntities[id]);
            // const newLogEntities = newIds.map((id) => state.optionVolLogEntities[id]);

            return {
                ...state,
                // optionVolAnalysisLoading: false,
                // optionVolAnalysisLoaded: true,

                optionVolResultEntities: Object.assign({}, state.optionVolResultEntities, {[guid]: payload.result}),
                optionVolAnalysisLoadingEntity: Object.assign({}, state.optionVolAnalysisLoadingEntity, {[guid]: false}),
                optionVolAnalysisLoadedEntity: Object.assign({}, state.optionVolAnalysisLoadedEntity, {[guid]: true}),
                optionVolResultErrorEntities: Object.assign({}, state.optionVolResultErrorEntities, {[guid]: null}),
                optionVolLogEntities: Object.assign({}, state.optionVolLogEntities, {[guid]: null})
            };
        }

        case fromActions.OptionVolsActionTypes.RUN_OPTION_VOL_ANALYSIS_FAILED:
        case fromActions.OptionVolsActionTypes.RUN_FX_OPTION_VOL_ANALYSIS_FAILED: {
            const payload = action.payload;
            const guid = payload.guid;
            // const newIds = state.optionVolRequestIds.filter(id => id !== guid);
            // const newResultEntities = newIds.map((id) => state.optionVolResultEntities[id]);
            // const newLogEntities = newIds.map((id) => state.optionVolLogEntities[id]);
            // const newResultErrorEntities = newIds.map((id) => state.optionVolResultErrorEntities[id]);
            let messagePayload;
            if (typeof payload.message === 'string') {
                messagePayload = {message: payload.message, type: 'error'};
            } else if (typeof payload.message === 'object') {
                messagePayload = payload.message;
            } else {
                messagePayload = {message: 'No response received', type: 'error'};
            }

            return {
                ...state,
                // optionVolAnalysisLoading: false,
                // optionVolAnalysisLoaded: true,
                // optionVolResultEntities: newResultEntities,
                // optionVolLogEntities: newLogEntities,
                optionVolAnalysisLoadingEntity: Object.assign({}, state.optionVolAnalysisLoadingEntity, {[guid]: false}),
                optionVolAnalysisLoadedEntity: Object.assign({}, state.optionVolAnalysisLoadedEntity, {[guid]: false}),
                optionVolResultErrorEntities: Object.assign({}, state.optionVolResultErrorEntities, {[guid]: messagePayload}),
                optionVolLogEntities: Object.assign({}, state.optionVolLogEntities, {[guid]: messagePayload})
            };
        }







        case fromActions.OptionVolsActionTypes.GET_OPTION_VOL_ANALYSIS_LOGS_COMPLETE: {
            const payload = action.payload;
            const guid = payload.guid;
            // const newIds = state.optionVolRequestIds.filter(id => id !== guid);
            // const newLogEntities = newIds.map((id) => state.optionVolLogEntities[id]);

            return {
                ...state,
                // optionVolAnalysisLoading: true,
                // optionVolAnalysisLoaded: false,
                // optionVolAnalysisError: null,
                optionVolLogEntities: Object.assign({}, state.optionVolLogEntities, {[guid]: payload.message})
            };
        }

        default:
            return state;
    }
}

export const getSelectedOptionVolRequestIds = (state: State) => state.selectedOptionVolRequestIds;
export const getActiveIndex =  (state: State) => state.activeIndex;

export const getSupportedTickers = (state: State) => state.supportedTickers;
export const getSupportedTickersLoading = (state: State) => state.supportedTickersLoading;
export const getSupportedTickersLoaded = (state: State) => state.supportedTickersLoaded;
export const getSupportedTickersError = (state: State) => state.supportedTickersError;

export const getFuturesMapping = (state: State) => state.futuresMapping;
export const getFuturesMappingLoading = (state: State) => state.futuresMappingLoading;
export const getFuturesMappingLoaded = (state: State) => state.futuresMappingLoaded;
export const getFuturesMappingError = (state: State) => state.futuresMappingError;

export const getOptionChainTickers = (state: State) => state.optionChainTickers;
export const getOptionChains = (state: State) => state.optionChains;
export const getOptionChainLoading = (state: State) => state.optionChainLoading;
export const getOptionChainLoaded = (state: State) => state.optionChainLoaded;
export const getOptionChainError = (state: State) => state.optionChainError;

export const getSizingCapitalsIds = (state: State) => state.sizingCapitals.ids;
export const getSizingCapitalsEntities = (state: State) => state.sizingCapitals.entities;
export const getSizingCapitalsLoading = (state: State) => state.sizingCapitals.loading;
export const getSizingCapitalsLoaded = (state: State) => state.sizingCapitals.loaded;
export const getSizingCapitalsError = (state: State) => state.sizingCapitals.error;

export const getOptionVolRequestEntities = (state: State) => state.optionVolRequestEntities;
export const getOptionVolAnalysisLoadingEntity = (state: State) => state.optionVolAnalysisLoadingEntity;
export const getOptionVolAnalysisLoadedEntity = (state: State) => state.optionVolAnalysisLoadedEntity;
// export const getOptionVolAnalysisLoading = (state: State) => state.optionVolAnalysisLoading;
// export const getOptionVolAnalysisLoaded = (state: State) => state.optionVolAnalysisLoaded;
// export const getOptionVolAnalysisError = (state: State) => state.optionVolAnalysisError;

export const getOptionVolResultEntities = (state: State) => state.optionVolResultEntities;
export const getOptionVolResultErrorEntities = (state: State) => state.optionVolResultErrorEntities;
export const getOptionVolLogsEntities = (state: State) => state.optionVolLogEntities;



