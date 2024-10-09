import * as fromActions from '../actions';
import * as fromModels from './../../models/sizing.models';

export interface State {
    sizingSheetItems: {
        ids: number[];
        entities: {[id: string]: fromModels.SizingItem};
        loading: boolean;
        loaded: boolean;
        error?: string;
    };
    sizingCapitals: {
        ids: number[];
        entities: {[id: string]: fromModels.SizingCapital};
        loading: boolean;
        loaded: boolean;
        error?: string;
    };
    updateTime?: string;
    capitalBase?: number;
    defaultColumns: number[];

    sizingSecurities: fromModels.SizingSecurity[];
    sizingSecuritiesLoading: boolean;
    sizingSecuritiesLoaded: boolean;
    sizingSecuritiesError?: string;

    defaultCapitals: fromModels.DefaultSizingCapital[];
    defaultCapitalsLoading: boolean;
    defaultCapitalsLoaded: boolean;
    defaultCapitalsError?: string;


    saveSizingSecuritesPending: boolean;
    saveSizingSecuritesFinished: boolean;
    saveSizingSecuritesError?: string;
}

const initialState: State = {
    sizingSheetItems: {
        ids: [],
        entities: {},
        loading: false,
        loaded: false
    },
    sizingCapitals: {
        ids: [],
        entities: {},
        loading: false,
        loaded: false
    },
    defaultColumns: [],

    sizingSecurities: [],
    sizingSecuritiesLoading: false,
    sizingSecuritiesLoaded: false,

    defaultCapitals: [],
    defaultCapitalsLoading: false,
    defaultCapitalsLoaded: false,

    saveSizingSecuritesPending: false,
    saveSizingSecuritesFinished: false,
};

export function reducer(state = initialState, action: fromActions.SizingActions): State {

    switch (action.type) {

        case fromActions.SizingActionTypes.LOAD_SIZING_SHEET_ITEMS:
        case fromActions.SizingActionTypes.REFRESH_SIZING_SHEET_ITEMS: {
            return {
                ...state,
                sizingSheetItems: {
                    ...state.sizingSheetItems,
                    loading: true,
                    loaded: false,
                    error: null
                }
            };
        }

        case fromActions.SizingActionTypes.LOAD_SIZING_SHEET_ITEMS_COMPLETE:
        case fromActions.SizingActionTypes.REFRESH_SIZING_SHEET_ITEMS_COMPLETE: {
            const sheetItems = action.payload.payload;
            const updatedTime = action.payload.update_time;
            const defaultColumns = action.payload.default_columns;
            const capitalBase = action.payload.capital_base;

            // const newIds = sheetItems.map(sheetItem => sheetItem.id).filter(id => state.sizingSheetItems.ids.indexOf(id) < 0);
            const newIds = sheetItems.map(sheetItem => sheetItem.id);

            // const newEntities = sheetItems.reduce((entities: {[id: string]: any}, item: any) => {
            //     return Object.assign({}, entities,  {[item.id]: item});
            // }, state.sizingSheetItems.entities);

            const newEntities = sheetItems.reduce((entities: {[id: string]: any}, item: any) => {
                return Object.assign({}, entities,  {[item.id]: item});
            }, {});

            return {
                ...state,
                updateTime: updatedTime,
                defaultColumns: defaultColumns,
                // capitalBase: capitalBase,
                sizingSheetItems: {
                    ids: [...newIds],
                    entities: newEntities,
                    loading: false,
                    loaded: true
                }
            };
        }

        case fromActions.SizingActionTypes.LOAD_SIZING_SHEET_ITEMS_FAILED:
        case fromActions.SizingActionTypes.REFRESH_SIZING_SHEET_ITEMS_FAILED:{
            const error = action.payload;
            return {
                ...state,
                sizingSheetItems: {
                    ...state.sizingSheetItems,
                    loading: false,
                    loaded: false,
                    error: error
                }
            };
        }

        // ------------------------------------------------------------------------------------------------------


        case fromActions.SizingActionTypes.LOAD_SIZING_CAPITALS: {
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

        case fromActions.SizingActionTypes.LOAD_SIZING_CAPITALS_COMPLETE: {
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

        case fromActions.SizingActionTypes.LOAD_SIZING_CAPITALS_FAILED: {
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

        case fromActions.SizingActionTypes.LOAD_SIZING_SECURITIES: {
            return {
                ...state, 
                sizingSecuritiesLoading: true,
                sizingSecuritiesLoaded: false,
                sizingSecuritiesError: null
            };
        }

        case fromActions.SizingActionTypes.LOAD_SIZING_SECURITIES_COMPLETE:
        case fromActions.SizingActionTypes.ADD_SIZING_SECURITY_COMPLETE:
        case fromActions.SizingActionTypes.UPDATE_SIZING_SECURITY_COMPLETE:
        case fromActions.SizingActionTypes.DELETE_SIZING_SECURITY_COMPLETE: {
            return {
                ...state,
                sizingSecuritiesLoading: false,
                sizingSecuritiesLoaded: true,
                sizingSecurities: action.payload
            };
        }

        case fromActions.SizingActionTypes.LOAD_SIZING_SECURITIES_FAILED: 
        case fromActions.SizingActionTypes.ADD_SIZING_SECURITY_FAILED: 
        case fromActions.SizingActionTypes.UPDATE_SIZING_SECURITY_FAILED: 
        case fromActions.SizingActionTypes.DELETE_SIZING_SECURITY_FAILED: {
            return {
                ...state,
                sizingSecuritiesLoading: false,
                sizingSecuritiesLoaded: false,
                sizingSecuritiesError: action.payload
            };
        }

        case fromActions.SizingActionTypes.LOAD_DEFAULT_CAPITALS: {
            return {
                ...state,
                defaultCapitalsLoading: false,
                defaultCapitalsLoaded: false,
                defaultCapitalsError: null
            };
        }

        case fromActions.SizingActionTypes.LOAD_DEFAULT_CAPITALS_COMPLETE:
        case fromActions.SizingActionTypes.ADD_DEFAULT_CAPITAL_COMPLETE:
        case fromActions.SizingActionTypes.UPDATE_DEFAULT_CAPITAL_COMPLETE:
        case fromActions.SizingActionTypes.DELETE_DEFAULT_CAPITAL_COMPLETE: {
            return {
                ...state,
                defaultCapitalsLoading: false,
                defaultCapitalsLoaded: true,
                defaultCapitals: action.payload
            };
        }

        case fromActions.SizingActionTypes.LOAD_DEFAULT_CAPITALS_FAILED:
        case fromActions.SizingActionTypes.ADD_DEFAULT_CAPITAL_FAILED:
        case fromActions.SizingActionTypes.UPDATE_DEFAULT_CAPITAL_FAILED:
        case fromActions.SizingActionTypes.DELETE_DEFAULT_CAPITAL_FAILED: {
            return {
                ...state,
                defaultCapitalsLoading: false,
                defaultCapitalsLoaded: false,
                defaultCapitalsError: action.payload
            };
        }

        default: {
            return state;
        }
    }
}

export const getSizingSheetItemsIds = (state: State) => state.sizingSheetItems.ids;
export const getSizingSheetEntities = (state: State) => state.sizingSheetItems.entities;
export const getSizingSheetLoading = (state: State) => state.sizingSheetItems.loading;
export const getSizingSheetLoaded = (state: State) => state.sizingSheetItems.loaded;
export const getSizingSheetError = (state: State) => state.sizingSheetItems.error;

export const getSizingCapitalsIds = (state: State) => state.sizingCapitals.ids;
export const getSizingCapitalsEntities = (state: State) => state.sizingCapitals.entities;
export const getSizingCapitalsLoading = (state: State) => state.sizingCapitals.loading;
export const getSizingCapitalsLoaded = (state: State) => state.sizingCapitals.loaded;
export const getSizingCapitalsError = (state: State) => state.sizingCapitals.error;

export const getSizingSheetUpdatedTime = (state: State) => state.updateTime;
export const getSizingSheetDefaultColumns = (state: State) => state.defaultColumns;
export const getSizingSheetCapitalBase = (state: State) => state.capitalBase;

export const getSizingSecurities = (state: State) => state.sizingSecurities;
export const getSizingSecuritiesLoading = (state: State) => state.sizingSecuritiesLoading;
export const getSizingSecuritiesLoaded = (state: State) => state.sizingSecuritiesLoaded;
export const getSizingSecuritiesError = (state: State) => state.sizingSecuritiesError;

export const getDefaultCapitals = (state: State) => state.defaultCapitals;
export const getDefaultCapitalsLoading = (state: State) => state.defaultCapitalsLoading;
export const getDefaultCapitalsLoaded = (state: State) => state.defaultCapitalsLoaded;
export const getDefaultCapitalsError = (state: State) => state.defaultCapitalsError;
