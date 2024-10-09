import * as fromActions from '../actions';
import * as fromModels from './../../models';

// Utili ---------------------------

function getNewStateSection(oldIds, oldEntities, payload) {
    const newIds = payload.map(item => item.guid).filter(id => oldIds.indexOf(id) < 0);
    const newEntities = payload.reduce((entities, newItem) => {
        return Object.assign({}, entities, {[newItem.guid]: newItem});
    }, oldEntities);
    return [newIds, newEntities];
}

export interface State {

    // UI data ----------------------------------------

    activeGuid: string;
    activeCalenderId: number;
    selectedEventAnalysisDate: string[];
    eventPlotSeriesVisibility: {[series: string]: boolean};

    configurationChangedForMarketDataUI: boolean;
    configurationChangedForEventAnalysisUI: boolean;

    // Meta Data ---------------------------------------

    preprocessingOptions: {
        entities: fromModels.PreprocessOption[];
        loading: boolean;
        loaded: boolean;
        error?: string;
    };

    eventCalendars: {
        ids: number[];
        entities: {[id: number]: fromModels.ICalendar};
        dates: {[id: number]: Date[]};
        loading: boolean;
        loaded: boolean;
        error?: string;
    };

    customFunctionSet: {
        entities: {description: string; name: string; params: string}[];
        loading: boolean;
        loaded: boolean;
        error?: string;
    }

    // Client data ------------------------------------

    analyses: {
        ids: string[];
        entities: {[guid: string]: fromModels.TimeseriesAnalysis},
        loading: boolean;
        loaded: boolean;
        saving: boolean;
        saved: boolean;
        deleting: boolean;
        deleted: boolean;
        error?: string;
    };


    configurations: {
        ids: string[];
        entities: {
            [guid: string]: {
                data: fromModels.Configuration;
                loading: boolean;
                loaded: boolean;
                saving: boolean;
                saved: boolean;
                error?: string;
            }
        }
    };

    marketData: {
        ids: string[];
        entities: {
            [guid: string]: string;
        },
        loading: boolean;
        loaded: boolean;
        error?: string;
    };

    eventAnalysis: {
        ids: string[];
        entities: {[guid: string]: fromModels.EventAnalysisResultData},
        loading: boolean;
        loaded: boolean;
        error?: string;
    };

    regressionAnalysis: {
        ids: string[];
        entities: {
            [guid: string]: {
                data: any;
                loading: boolean;
                loaded: boolean;
                error?: string;
            }
        }
    };
}

const initialState: State = {

    activeGuid: null,
    activeCalenderId: null,
    selectedEventAnalysisDate: [],
    eventPlotSeriesVisibility: {},
    configurationChangedForMarketDataUI: true,
    configurationChangedForEventAnalysisUI: true,

    preprocessingOptions: {
        entities: [],
        loading: false,
        loaded: false,
        error: null,
    },

    eventCalendars: {
        ids: [],
        entities: {},
        dates: {},
        loading: false,
        loaded: false,
        error: null,
    },

    customFunctionSet: {
        entities: [],
        loading: false,
        loaded: false,
        error: null,
    },

    analyses: {
        ids: [],
        entities: {},
        loading: false,
        loaded: false,
        saving: false,
        saved: false,
        deleting: false,
        deleted: false,
        error: null,
    },

    configurations: {
        ids: [],
        entities: {}
    },

    marketData: {
        ids: [],
        entities: {},
        loading: false,
        loaded: false,
    },

    eventAnalysis: {
        ids: [],
        entities: {},
        loading: false,
        loaded: false,
    },

    regressionAnalysis: {
        ids: [],
        entities: {}
    }
};

export function reducer(state = initialState, action: fromActions.EventAnalysisActions): State {

    switch (action.type) {

        // -----------------------------------------------------------------------------------

        case fromActions.EventAnalysisActionTypes.SET_ACTIVE_GUID: {
            return {
                ...state,
                activeGuid: action.payload
            };
        }

        case fromActions.EventAnalysisActionTypes.SET_ACTIVE_CALENDER_ID: {
            return {
                ...state,
                activeCalenderId: action.payload
            };
        }

        case fromActions.EventAnalysisActionTypes.SET_SELECTED_EVENT_ANALYSIS_DATE: {
            return {
                ...state,
                selectedEventAnalysisDate: action.payload
            };
        }

        case fromActions.EventAnalysisActionTypes.SET_EVENT_PLOT_SERIES_VISIBILITY: {
            return {
                ...state,
                eventPlotSeriesVisibility: Object.assign({}, state.eventPlotSeriesVisibility, action.payload)
            };
        }

        // ------------------------------------------------------------------------------------

        case fromActions.EventAnalysisActionTypes.LOAD_PREPROCESSING_OPTIONS: {
            return {
                ...state,
                preprocessingOptions: {
                    ...state.preprocessingOptions,
                    loading: true,
                    loaded: false,
                    error: null
                }
            };
        }

        case fromActions.EventAnalysisActionTypes.LOAD_PREPROCESSING_OPTIONS_COMPLETE: {
            return {
                ...state,
                preprocessingOptions: {
                    entities: action.payload,
                    loading: false,
                    loaded: true,
                    error: null
                }
            };
        }

        case fromActions.EventAnalysisActionTypes.LOAD_PREPROCESSING_OPTIONS_FAILED: {
            return {
                ...state,
                preprocessingOptions: {
                    ...state.preprocessingOptions,
                    loading: false,
                    loaded: false,
                    error: action.payload
                }
            };
        }

        // --------------------------------------------------------------------------------------

        case fromActions.EventAnalysisActionTypes.LOAD_EVENT_CALENDARS: {
            return {
                ...state,
                eventCalendars: {
                    ...state.eventCalendars,
                    loading: true,
                    loaded: false,
                    error: null
                }
            };
        }

        case fromActions.EventAnalysisActionTypes.LOAD_EVENT_CALENDARS_COMPLETE: {

            const ids = action.payload.map((calendar) => calendar.id);
            const newEntities = action.payload.reduce((entities: { [id: number]: fromModels.ICalendar },
                item: fromModels.ICalendar) => {
                return Object.assign({}, entities, { [item.id]: item });
            }, {});

            return {
                ...state,
                eventCalendars: {
                    ...state.eventCalendars,
                    ids: [...ids],
                    entities: newEntities,
                    loading: false,
                    loaded: true,
                    error: null
                }
            };
        }

        case fromActions.EventAnalysisActionTypes.LOAD_EVENT_CALENDARS_FAILED: {
            return {
                ...state,
                eventCalendars: {
                    ...state.eventCalendars,
                    loading: false,
                    loaded: false,
                    error: action.payload
                }
            };
        }

        case fromActions.EventAnalysisActionTypes.UPDATE_CALENDAR_COMPLETE: {
            return {
                ...state,
                eventCalendars: {
                    ...state.eventCalendars,
                    entities: Object.assign({}, state.eventCalendars.entities, {[action.payload.id]: action.payload})
                }
            };
        }

        case fromActions.EventAnalysisActionTypes.ADD_CALENDAR_COMPLETE: {
            return {
                ...state,
                eventCalendars: {
                    ...state.eventCalendars,
                    ids: [...state.eventCalendars.ids, action.payload.id],
                    entities: Object.assign({}, state.eventCalendars.entities, {[action.payload.id]: action.payload})
                }
            };
        }

        case fromActions.EventAnalysisActionTypes.DELETE_CALENDAR_DATE_COMPLETE: {
            return state;
        }

        // ----------------------------------------------------------------------------------------------------------------

        case fromActions.EventAnalysisActionTypes.LOAD_CALENDAR_DATES_COMPLETE:
        case fromActions.EventAnalysisActionTypes.ADD_CALENDAR_DATE_COMPLETE:
        case fromActions.EventAnalysisActionTypes.DELETE_CALENDAR_DATE_COMPLETE: {
            return {
                ...state,
                eventCalendars: {
                    ...state.eventCalendars,
                    dates: Object.assign({}, state.eventCalendars.dates, {[action.payload.id]: action.payload.data})
                }
            };
        }

        // ------------------------------------------------------------------------------------------


        case fromActions.EventAnalysisActionTypes.LOAD_CUSTOM_FUNCTIONSET: {
            return {
                ...state,
                customFunctionSet: {
                    ...state.customFunctionSet,
                    loading: true,
                    loaded: false,
                    error: null
                }
            }
        }

        case fromActions.EventAnalysisActionTypes.LOAD_CUSTOM_FUNCTIONSET_COMPLETE: {

            const functionSetObject = action.payload;
            return {
                ...state,
                customFunctionSet: {
                    entities: Object.keys(functionSetObject).map(key => functionSetObject[key]),
                    loading: false,
                    loaded: true,
                    error: null
                }
            }
        }

        case fromActions.EventAnalysisActionTypes.LOAD_CUSTOM_FUNCTIONSET_FAILED: {
            return {
                ...state,
                customFunctionSet: {
                    ...state.customFunctionSet,
                    loading: false,
                    loaded: false,
                    error: action.payload
                }
            }
        }


        // ------------------------------------------------------------------------------------

        case fromActions.EventAnalysisActionTypes.LOAD_TIMESERIES_ANALYSES: {
            return {
                ...state,
                analyses: {
                    ...state.analyses,
                    loading: true,
                    loaded: false,
                    error: null
                }
            };
        }

        case fromActions.EventAnalysisActionTypes.LOAD_TIMESERIES_ANALYSES_COMPLETE: {
            // return {
            //     ...state
            // };

            const [newIds, newEntities] = getNewStateSection(state.analyses.ids,
                state.analyses.entities, action.payload);

            return {
                ...state,
                analyses: {
                    ...state.analyses,
                    ids: [...state.analyses.ids, ...newIds],
                    entities: newEntities,
                    loading: false,
                    loaded: true,
                    error: null
                }
            };
        }

        case fromActions.EventAnalysisActionTypes.LOAD_TIMESERIES_ANALYSES_FAILED: {
            return {
                ...state,
                analyses: {
                    ...state.analyses,
                    loading: false,
                    loaded: false,
                    error: action.payload
                }
            };
        }

        case fromActions.EventAnalysisActionTypes.ADD_TIMESERIES_ANALYSIS:
        case fromActions.EventAnalysisActionTypes.UPDATE_TIMESERIES_ANALYSIS: {
            return {
                ...state,
                analyses: {
                    ...state.analyses,
                    saving: true,
                    saved: false
                }
            };
        }

        case fromActions.EventAnalysisActionTypes.ADD_TIMESERIES_ANALYSIS_COMPLETE: {
            return {
                ...state,
                activeGuid: action.payload.guid,
                analyses: {
                    ...state.analyses,
                    ids: [...state.analyses.ids, action.payload.guid],
                    entities: Object.assign({}, state.analyses.entities, { [action.payload.guid]: action.payload }),
                    saving: false,
                    saved: true
                }
            };
        }
        case fromActions.EventAnalysisActionTypes.UPDATE_TIMESERIES_ANALYSIS_COMPLETE: {
            return {
                ...state,
                activeGuid: action.payload.guid,
                analyses: {
                    ...state.analyses,
                    entities: Object.assign({}, state.analyses.entities, { [action.payload.guid]: action.payload }),
                    saving: false,
                    saved: true
                }
            };
        }

        case fromActions.EventAnalysisActionTypes.ADD_TIMESERIES_ANALYSIS_FAILED:
        case fromActions.EventAnalysisActionTypes.UPDATE_TIMESERIES_ANALYSIS_FAILED: {
            return {
                ...state,
                analyses: {
                    ...state.analyses,
                    saving: false,
                    saved: false,
                    error: action.payload
                }
            };
        }

        case fromActions.EventAnalysisActionTypes.DELETE_TIMESERIES_ANALYSIS: {
            return {
                ...state,
                analyses: {
                    ...state.analyses,
                    deleting: true,
                    deleted: false
                }
            };
        }

        case fromActions.EventAnalysisActionTypes.DELETE_TIMESERIES_ANALYSIS_COMPLETE: {
            const existingIds = state.analyses.ids.filter(id => id !== action.payload);
            const existingEntities = Object.keys(state.analyses.entities).reduce((entities, key) => {
                if (key !== action.payload.toString()) { entities[key] = state.analyses.entities[key]; }
                return entities;
            }, {});

            return {
                ...state,
                analyses: {
                    ...state.analyses,
                    ids: existingIds,
                    entities: existingEntities,
                    deleting: false,
                    deleted: true
                }
            };
        }

        case fromActions.EventAnalysisActionTypes.DELETE_TIMESERIES_ANALYSIS_FAILED: {
            return {
                ...state,
                analyses: {
                    ...state.analyses,
                    deleting: false,
                    deleted: false,
                    error: action.payload
                }
            };
        }

        // ------------------------------------------------------------------------------------

        case fromActions.EventAnalysisActionTypes.LOAD_CONFIGURATION: {
            return {
                ...state,
                configurations: {
                    ids: [action.payload, ...state.configurations.ids],
                    entities: Object.assign({}, state.configurations.entities, {
                        [action.payload]: {
                            loading: true,
                            loaded: false,
                            saving: false,
                            saved: false,
                        }
                    })
                }
            };
        }

        case fromActions.EventAnalysisActionTypes.LOAD_CONFIGURATION_COMPLETE: {
            return {
                ...state,
                activeGuid: action.payload.guid,
                configurations: {
                    ...state.configurations,
                    entities: Object.assign({}, state.configurations.entities, {
                        [action.payload.guid]: {
                            data: action.payload,
                            loading: false,
                            loaded: true,
                            saving: false,
                            saved: false,
                        }
                    })
                }
            };
        }

        case fromActions.EventAnalysisActionTypes.LOAD_CONFIGURATION_FAILED: {
            return {
                ...state,
                configurations: {
                    ...state.configurations,
                    entities: Object.assign({}, state.configurations.entities, {
                        [action.payload.guid]: {
                            loading: false,
                            loaded: false,
                            saving: false,
                            saved: false,
                            error: action.payload.error
                        }
                    })
                }
            };
        }


        // case fromActions.EventAnalysisActionTypes.ADD_CONFIGURATION:
        // case fromActions.EventAnalysisActionTypes.UPDATE_CONFIGURATION: {
        //     const oldIds = state.configurations.ids.filter((id) => id !== action.payload.guid);
        //     return {
        //         ...state,
        //         configurations: {
        //             ids: [action.payload.guid, ...oldIds],
        //             entities: Object.assign({}, state.configurations.entities, {
        //                 [action.payload.guid]: {
        //                     data: action.payload,
        //                     loading: true,
        //                     loaded: false,
        //                     saving: false,
        //                     saved: false,
        //                 }
        //             })
        //         }
        //     };
        // }

        case fromActions.EventAnalysisActionTypes.ADD_CONFIGURATION_COMPLETE:
        case fromActions.EventAnalysisActionTypes.UPDATE_CONFIGURATION_COMPLETE: {
            const oldIds = state.configurations.ids.filter((id) => id !== action.payload.guid);
            return {
                ...state,
                activeGuid: action.payload.guid,
                configurationChangedForEventAnalysisUI: true,
                configurationChangedForMarketDataUI: true,

                configurations: {
                    ...state.configurations,
                    ids: [action.payload.guid, ...oldIds],
                    entities: Object.assign({}, state.configurations.entities, {
                        [action.payload.guid]: {
                            data: action.payload,
                            loading: false,
                            loaded: true,
                            saving: false,
                            saved: false
                        }
                    })
                },
            };
        }

        case fromActions.EventAnalysisActionTypes.ADD_CONFIGURATION_FAILED:
        case fromActions.EventAnalysisActionTypes.UPDATE_CONFIGURATION_FAILED: {
            const oldIds = state.configurations.ids.filter((id) => id !== action.payload.guid);
            return {
                ...state,
                activeGuid: action.payload.guid,
                configurations: {
                    ...state.configurations,
                    ids: [action.payload.guid, ...oldIds],
                    entities: Object.assign({}, state.configurations.entities, {
                        [action.payload.guid]: {
                            loading: false,
                            loaded: false,
                            saving: false,
                            saved: false,
                            error: action.payload.error
                        }
                    })
                }
            };
        }


        // -------------------------------------------------------------------------------------------------------

        case fromActions.EventAnalysisActionTypes.LOAD_EVENT_ANALYSIS: {
            return {
                ...state,
                eventAnalysis: {
                    ...state.eventAnalysis,
                    ids: [...state.eventAnalysis.ids, action.payload.guid],
                    loading: true,
                    loaded: false,
                    error: null,
                }
            };
        }

        case fromActions.EventAnalysisActionTypes.LOAD_EVENT_ANALYSIS_COMPLETE: {
            return {
                ...state,
                configurationChangedForEventAnalysisUI: false,

                eventAnalysis: {
                    ...state.eventAnalysis,
                    entities: {
                        ...state.eventAnalysis.entities,
                        [action.payload.guid]: action.payload.data
                    },
                    loading: false,
                    loaded: true,
                    error: null
                }
            };
        }

        case fromActions.EventAnalysisActionTypes.LOAD_EVENT_ANALYSIS_FAILED: {
            return {
                ...state,
                eventAnalysis: {
                    ...state.eventAnalysis,
                    loading: false,
                    loaded: false,
                    error: action.payload.error
                }
            };
        }


        // -------------------------------------------------------------------------------------------------------

        case fromActions.EventAnalysisActionTypes.LOAD_MULTI_FACTOR_REGRESSION_ANALYSIS: {
            return {
                ...state,
                regressionAnalysis: {
                    ids: [...state.eventAnalysis.ids, action.payload.guid],
                    entities: Object.assign({}, state.regressionAnalysis.entities, {
                        [action.payload.guid]: {
                            loading: true,
                            loaded: false,
                            error: null
                        }
                    })
                }
            };
        }

        case fromActions.EventAnalysisActionTypes.LOAD_MULTI_FACTOR_REGRESSION_ANALYSIS_COMPLETE: {
            return {
                ...state,
                regressionAnalysis: {
                    ...state.regressionAnalysis,
                    entities: Object.assign({}, state.regressionAnalysis.entities, {
                        [action.payload.guid]: {
                            data: action.payload.data,
                            loading: false,
                            loaded: true,
                            error: null
                        }
                    })
                }
            };
        }

        case fromActions.EventAnalysisActionTypes.LOAD_MULTI_FACTOR_REGRESSION_ANALYSIS_FAILED: {
            return {
                ...state,
                regressionAnalysis: {
                    ...state.regressionAnalysis,
                    entities: Object.assign({}, state.regressionAnalysis.entities, {
                        [action.payload.guid]: {
                            loading: false,
                            loaded: true,
                            error: action.payload.error
                        }
                    })
                }
            };
        }

        /************************************************************************************** */
        /**                                      Market Data                                   **/
        /************************************************************************************** */
        case fromActions.EventAnalysisActionTypes.LOAD_RAW_DATA: {
            const oldIds = state.marketData.ids.filter((id) => id !== action.payload.guid);
            return {
                ...state,
                marketData: {
                    ...state.marketData,
                    ids: [...state.marketData.ids, action.payload.guid],
                    loading: true,
                    loaded: false,
                    error: null
                }
            };
        }

        case fromActions.EventAnalysisActionTypes.LOAD_RAW_DATA_COMPLETE: {
            const oldIds = state.marketData.ids.filter((id) => id !== action.payload.guid);
            return {
                ...state,
                configurationChangedForMarketDataUI: false,
                marketData: {
                    ...state.marketData,
                    entities: {
                        ...state.marketData.entities,
                        [action.payload.guid]: action.payload.data
                    },
                    loading: false,
                    loaded: true,
                    error: null
                }
            };
        }

        case fromActions.EventAnalysisActionTypes.LOAD_RAW_DATA_FAILED: {
            const oldIds = state.marketData.ids.filter((id) => id !== action.payload.guid);
            return {
                ...state,
                marketData: {
                    ...state.marketData,
                    loading: false,
                    loaded: false,
                    error: action.payload.error
                }
            };
        }

        default: {
            return state;
        }
    }
}

export const getActiveGuid = (state: State) => state.activeGuid;
export const getActiveCalenderId = (state: State) => state.activeCalenderId;
export const getSelectedEventAnalysisDate = (state: State) => state.selectedEventAnalysisDate;
export const getEventPlotSeriesVisibility = (state: State) => state.eventPlotSeriesVisibility;
export const getConfigurationChangedForMarketDataUI = (state: State) => state.configurationChangedForMarketDataUI;
export const getConfigurationChangedForEventAnalysisUI = (state: State) => state.configurationChangedForEventAnalysisUI;

export const getPreprocessingOptionsEntities = (state: State) => state.preprocessingOptions.entities;
export const getPreprocessingOptionsLoading = (state: State) => state.preprocessingOptions.loading;
export const getPreprocessingOptionsLoaded = (state: State) => state.preprocessingOptions.loaded;
export const getPreprocessingOptionsError = (state: State) => state.preprocessingOptions.error;

export const getCustomFunctionSetEntities = (state: State) => state.customFunctionSet.entities;
export const getCustomFunctionSetLoading = (state: State) => state.customFunctionSet.loading;
export const getCustomFunctionSetLoaded = (state: State) => state.customFunctionSet.loaded;
export const getCustomFunctionSetError = (state: State) => state.customFunctionSet.error;


export const getEventCalendarIds = (state: State) => state.eventCalendars.ids;
export const getEventCalendarDates = (state: State) => state.eventCalendars.dates;
export const getEventCalendarsEntities = (state: State) => state.eventCalendars.entities;
export const getEventCalendersLoading = (state: State) => state.eventCalendars.loading;
export const getEventCalendarsLoaded = (state: State) => state.eventCalendars.loaded;
export const getEventCalendarsError = (state: State) => state.eventCalendars.error;

export const getTimeseriesAnalysisIds = (state: State) => state.analyses.ids;
export const getTimeseriesAnalysisEntities = (state: State) => state.analyses.entities;
export const getTimeseriesAnalysisLoading = (state: State) => state.analyses.loading;
export const getTimeseriesAnalysisLoaded = (state: State) => state.analyses.loaded;
export const getTimeseriesAnalysisSaving = (state: State) => state.analyses.saving;
export const getTimeseriesAnalysisSaved = (state: State) => state.analyses.saved;
export const getTimeseriesAnalysisDeleting = (state: State) => state.analyses.deleting;
export const getTimeseriesAnalysisDeleted = (state: State) => state.analyses.deleted;
export const getTimeseriesAnalysisError = (state: State) => state.analyses.error;

export const getConfigurationsIds = (state: State) => state.configurations.ids;
export const getConfigurationsEntities = (state: State) => state.configurations.entities;

export const getEventAnalysisIds = (state: State) => state.eventAnalysis.ids;
export const getEventAnalysisEntities = (state: State) => state.eventAnalysis.entities;
export const getEventAnalysisLoading = (state: State) => state.eventAnalysis.loading;
export const getEventAnalysisLoaded = (state: State) => state.eventAnalysis.loaded;
export const getEventAnalysisError = (state: State) => state.eventAnalysis.error;


export const getRegressionAnalysisIds = (state: State) => state.regressionAnalysis.ids;
export const getRegressionAnalysisEntities = (state: State) => state.regressionAnalysis.entities;

export const getMarketDataIds = (state: State) => state.marketData.ids;
export const getMarketDataEntities = (state: State) => state.marketData.entities;
export const getMarketDataLoading = (state: State) => state.marketData.loading;
export const getMarketDataLoaded = (state: State) => state.marketData.loaded;
export const getMarketDataError = (state: State) => state.marketData.error;

