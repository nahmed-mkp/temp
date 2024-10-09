import * as fromModels from './../../models/directionality.models';
import * as fromActions from '../actions/directionality.actions';

export interface State {

    // directionalityInput: {
    //     [layoutName: string]: fromModels.DirectionalityInputs
    // };

    // directionalityInputLoading: {
    //     [layoutName: string]: boolean;
    // };

    // directionalityInputLoaded: {
    //     [layoutName: string]: boolean;
    // };

    // directionalityInputError?: {
    //     [layoutName: string]: string;
    // };

    // UI -----------------------------------------------

    selectedLookback: {
        [layoutName: string]: string[];
    }

    activeTabIndexEntity: {
        [layoutName: string]: number;
    }

    updateTimestampEntity: {
        [layoutName: string]: Date;
    }

    gridClearing: {
        [layoutName: string]: boolean;
    }

    displayMode: {
        [layoutName: string]: string;
    }

    // Data -----------------------------------------------

    directionalityInput: fromModels.DirectionalityInputs;
    directionalityInputLoading: boolean;
    directionalityInputLoaded: boolean;
    directionalityInputError?: string;

    regressionFactors: any;
    regressionFactorsLoading: boolean;
    regressionFactorsLoaded: boolean;
    regressionFactorsError?: string;


    directionalityEntity: {
        [layoutName: string]: any;
    };

    directionalityLoadingEntity: {
        [layoutName: string]: boolean;
    };

    directionalityLoadedEntity: {
        [layoutName: string]: boolean;
    };

    directionalityErrorEntity: {
        [layoutName: string]: string;
    };

    selectedLookbackEntity: {
        [layoutName: string]: string
    };

    directionalityScatterPlotDataEntity: {
        [layoutName: string]: {
            [lookback: string]: any;
        }
    };

    directionalityScatterPlotDataLoadingEntity: {
        [layoutName: string]: {
            [lookback: string]: boolean;
        }
    };

    directionalityScatterPlotDataLoadedEntity: {
        [layoutName: string]: {
            [lookback: string]: boolean;
        }
    };

    directionalityScatterPlotDataErrorEntity: {
        [layoutName: string]: {
            [lookback: string]: string;
        }
    };



    // -------------------------------------

    regressionEntity: {
        [layoutName: string]: any;
    }

    regressionLoadingEntity: {
        [layoutName: string]: any;
    }

    regressionLoadedEntity: {
        [layoutName: string]: any;
    }

    regressionErrorEntity: {
        [layoutName: string]: any;
    }
}


const initialState: State = {

    // directionalityInput: {},
    // directionalityInputLoading: {},
    // directionalityInputLoaded: {},
    // directionalityInputError: {},

    selectedLookback: {},
    activeTabIndexEntity: {},
    updateTimestampEntity: {},
    gridClearing: {},
    displayMode: {},

    directionalityInput: null,
    directionalityInputLoading: false,
    directionalityInputLoaded: false,

    regressionFactors: null,
    regressionFactorsLoading: false,
    regressionFactorsLoaded: false,


    directionalityEntity: {},
    directionalityLoadingEntity: {},
    directionalityLoadedEntity: {},
    directionalityErrorEntity: {},

    selectedLookbackEntity: {},

    directionalityScatterPlotDataEntity: {},
    directionalityScatterPlotDataLoadingEntity: {},
    directionalityScatterPlotDataLoadedEntity: {},
    directionalityScatterPlotDataErrorEntity: {},


    regressionEntity: {},
    regressionLoadingEntity: {},
    regressionLoadedEntity: {},
    regressionErrorEntity: {}
};


export function reducer(state = initialState, action: fromActions.DirectionalityActions): State {

    switch (action.type) {

        case fromActions.DirectionalityActionTypes.SET_SELECTED_LOOKBACK: {
            return {
                ...state,
                selectedLookback: Object.assign({}, state.selectedLookback, {[action.layoutName]: action.payload})
            }
        }

        case fromActions.DirectionalityActionTypes.SET_ACTIVE_TAB_INDEX: {
            return {
                ...state,
                activeTabIndexEntity: Object.assign({}, state.activeTabIndexEntity, {[action.layoutName]: action.payload})
            }
        }

        case fromActions.DirectionalityActionTypes.SET_GRID_CLEARING: {
            return {
                ...state,
                gridClearing: Object.assign({}, state.gridClearing, {[action.layoutName]: action.payload})
            }
        }

        case fromActions.DirectionalityActionTypes.SET_DISPLAY_MODE: {
            return {
                ...state,
                displayMode: Object.assign({}, state.gridClearing, {[action.layoutName]: action.payload})
            }
        }

        // -------------------------------------------------------------------------------------------------------

        case fromActions.DirectionalityActionTypes.LOAD_DIRECTIONALITY_INPUTS: {
            return {
                ...state,
                directionalityInputLoading: true,
                directionalityInputLoaded: false,
                directionalityInputError: null,
            };
        }

        case fromActions.DirectionalityActionTypes.LOAD_DIRECTIONALITY_INPUTS_COMPLETE: {
            return {
                ...state,
                directionalityInput: action.payload,
                directionalityInputLoading: false,
                directionalityInputLoaded: true,
                directionalityInputError: null,
            };
        }

        case fromActions.DirectionalityActionTypes.LOAD_DIRECTIONALITY_INPUTS_FAILED: {
            return {
                ...state,
                directionalityInputLoading: false,
                directionalityInputLoaded: false,
                directionalityInputError: action.payload
            };
        }

        // -------------------------------------------------------------------------------------------------------

        case fromActions.DirectionalityActionTypes.LOAD_REGRESSION_FACTORS: {
            return {
                ...state,
                regressionFactorsLoading: true,
                regressionFactorsLoaded: false,
                regressionFactorsError: null,
            };
        }

        case fromActions.DirectionalityActionTypes.LOAD_REGRESSION_FACTORS_COMPLETE: {
            return {
                ...state,
                regressionFactors: action.payload,
                regressionFactorsLoading: false,
                regressionFactorsLoaded: true,
                regressionFactorsError: null,
            };
        }

        case fromActions.DirectionalityActionTypes.LOAD_REGRESSION_FACTORS_FAILED: {
            return {
                ...state,
                regressionFactorsLoading: false,
                regressionFactorsLoaded: false,
                regressionFactorsError: action.payload
            };
        }

        
        // ----------------------------------------------------------------------------------------

        case fromActions.DirectionalityActionTypes.LOAD_DIRECTIONALITY: {
            return {
                ...state,
                selectedLookback: Object.assign({}, state.selectedLookback, {[action.layoutName]: action.payload.lookbacks}),
                directionalityEntity: Object.assign({}, state.directionalityEntity, {[action.layoutName]: null}),
                directionalityLoadingEntity: Object.assign({}, state.directionalityLoadingEntity, {[action.layoutName]: true}),
                directionalityLoadedEntity: Object.assign({}, state.directionalityLoadedEntity, {[action.layoutName]: false}),
                directionalityErrorEntity: Object.assign({}, state.directionalityErrorEntity, {[action.layoutName]: null})
            };
        }

        case fromActions.DirectionalityActionTypes.LOAD_DIRECTIONALITY_COMPLETE: {


            return {
                ...state,
                updateTimestampEntity: Object.assign({}, state.updateTimestampEntity, {[action.layoutName]: new Date()}),
                directionalityEntity: Object.assign({}, state.directionalityEntity, {[action.layoutName]: action.payload}),
                directionalityLoadingEntity: Object.assign({}, state.directionalityLoadingEntity, {[action.layoutName]: false}),
                directionalityLoadedEntity: Object.assign({}, state.directionalityLoadedEntity, {[action.layoutName]: true}),
                directionalityErrorEntity: Object.assign({}, state.directionalityErrorEntity, {[action.layoutName]: null})
            };
        }

        case fromActions.DirectionalityActionTypes.LOAD_DIRECTIONALITY_FAILED: {
            return {
                ...state,
                directionalityLoadingEntity: Object.assign({}, state.directionalityLoadingEntity, {[action.layoutName]: false}),
                directionalityLoadedEntity: Object.assign({}, state.directionalityLoadedEntity, {[action.layoutName]: false}),
                directionalityErrorEntity: Object.assign({}, state.directionalityErrorEntity, {[action.layoutName]: action.payload})
            };
        }


        case fromActions.DirectionalityActionTypes.LOAD_SCATTER_PLOT: {

            return {
                ...state,
                selectedLookbackEntity: {
                    ...state.selectedLookbackEntity,
                    [action.layoutName]: action.lookback
                },
                directionalityScatterPlotDataLoadingEntity: {
                    ...state.directionalityScatterPlotDataLoadingEntity,
                    [action.layoutName]: {
                        ...state.directionalityScatterPlotDataLoadingEntity[action.layoutName],
                        [action.lookbackIndex]: true
                    }
                },
                directionalityScatterPlotDataLoadedEntity: {
                    ...state.directionalityScatterPlotDataLoadedEntity,
                    [action.layoutName]: {
                        ...state.directionalityScatterPlotDataLoadedEntity[action.layoutName],
                        [action.lookbackIndex]: false
                    }
                },
                directionalityScatterPlotDataErrorEntity: {
                    ...state.directionalityScatterPlotDataErrorEntity,
                    [action.layoutName]: {
                        ...state.directionalityScatterPlotDataErrorEntity[action.layoutName],
                        [action.lookbackIndex]: null
                    }
                },
            };
        }

        case fromActions.DirectionalityActionTypes.LOAD_SCATTER_PLOT_COMPLETE: {

            return {
                ...state,
                directionalityScatterPlotDataEntity: {
                    ...state.directionalityScatterPlotDataEntity,
                    [action.layoutName]: {
                        ...state.directionalityScatterPlotDataEntity[action.layoutName],
                        [action.lookbackIndex]: action.payload
                    }
                },
                directionalityScatterPlotDataLoadingEntity: {
                    ...state.directionalityScatterPlotDataLoadingEntity,
                    [action.layoutName]: {
                        ...state.directionalityScatterPlotDataLoadingEntity[action.layoutName],
                        [action.lookbackIndex]: false
                    }
                },
                directionalityScatterPlotDataLoadedEntity: {
                    ...state.directionalityScatterPlotDataLoadedEntity,
                    [action.layoutName]: {
                        ...state.directionalityScatterPlotDataLoadedEntity[action.layoutName],
                        [action.lookbackIndex]: true
                    }
                },
                directionalityScatterPlotDataErrorEntity: {
                    ...state.directionalityScatterPlotDataErrorEntity,
                    [action.layoutName]: {
                        ...state.directionalityScatterPlotDataErrorEntity[action.layoutName],
                        [action.lookbackIndex]: null
                    }
                },
            };
        }

        case fromActions.DirectionalityActionTypes.LOAD_SCATTER_PLOT_FAILED: {

            return {
                ...state,
                directionalityScatterPlotDataLoadingEntity: {
                    ...state.directionalityScatterPlotDataLoadingEntity,
                    [action.layoutName]: {
                        ...state.directionalityScatterPlotDataLoadingEntity[action.layoutName],
                        [action.lookbackIndex]: false
                    }
                },
                directionalityScatterPlotDataLoadedEntity: {
                    ...state.directionalityScatterPlotDataLoadedEntity,
                    [action.layoutName]: {
                        ...state.directionalityScatterPlotDataLoadedEntity[action.layoutName],
                        [action.lookbackIndex]: false
                    }
                },
                directionalityScatterPlotDataErrorEntity: {
                    ...state.directionalityScatterPlotDataErrorEntity,
                    [action.layoutName]: {
                        ...state.directionalityScatterPlotDataErrorEntity[action.layoutName],
                        [action.lookbackIndex]: action.payload
                    }
                },
            };
        }

        // -----------------------------------------------------------------------------------------------

        case fromActions.DirectionalityActionTypes.RUN_REGRESSION: {
            return {
                ...state,
                regressionEntity: Object.assign({}, state.regressionEntity, {[action.layoutName]: null}),
                regressionLoadingEntity: Object.assign({}, state.regressionLoadingEntity, {[action.layoutName]: true}),
                regressionLoadedEntity: Object.assign({}, state.regressionLoadedEntity, {[action.layoutName]: false}),
                regressionErrorEntity: Object.assign({}, state.regressionErrorEntity, {[action.layoutName]: null})
            };
        }

        case fromActions.DirectionalityActionTypes.RUN_REGRESSION_COMPLETE: {


            return {
                ...state,
                regressionEntity: Object.assign({}, state.regressionEntity, {[action.layoutName]: action.payload}),
                regressionLoadingEntity: Object.assign({}, state.regressionLoadingEntity, {[action.layoutName]: false}),
                regressionLoadedEntity: Object.assign({}, state.regressionLoadedEntity, {[action.layoutName]: true}),
                regressionErrorEntity: Object.assign({}, state.regressionErrorEntity, {[action.layoutName]: null})
            };
        }

        case fromActions.DirectionalityActionTypes.RUN_REGRESSION_FAILED: {
            return {
                ...state,
                regressionLoadingEntity: Object.assign({}, state.regressionLoadingEntity, {[action.layoutName]: false}),
                regressionLoadedEntity: Object.assign({}, state.regressionLoadedEntity, {[action.layoutName]: false}),
                regressionErrorEntity: Object.assign({}, state.regressionErrorEntity, {[action.layoutName]: action.payload})
            };
        }


        default: {
            return state;
        }
    }
}

export const getDirectionalityInput = (state: State) => state.directionalityInput;
export const getDirectionalityInputLoading = (state: State) => state.directionalityInputLoading;
export const getDirectionalityInputLoaded = (state: State) => state.directionalityInputLoaded;
export const getDirectionalityInputError = (state: State) => state.directionalityInputError;

export const getRegressionFactors = (state: State) => state.regressionFactors;
export const getRegressionFactorsLoading = (state: State) => state.regressionFactorsLoading;
export const getRegressionFactorsLoaded = (state: State) => state.regressionFactorsLoaded;
export const getRegressionFactorsError = (state: State) => state.regressionFactorsError;

export const getDirectionalityEntity = (state: State) => state.directionalityEntity;
export const getDirectionalityLoadingEntity = (state: State) => state.directionalityLoadingEntity;
export const getDirectionalityLoadedEntity = (state: State) => state.directionalityLoadedEntity;
export const getDirectionalityErrorEntity = (state: State) => state.directionalityErrorEntity;

// export const getDirectionalitySelectedLookbackEntity = (state: State) => state.selectedLookbackEntity;

export const getDirectionalitySelectedLookbackEntity = (state: State) => state.selectedLookback;
export const getDirectionalityActiveTabIndexEntity = (state: State) => state.activeTabIndexEntity;
export const getUpdateTimestampEntity = (state: State) => state.updateTimestampEntity;
export const getGridClearingEntity = (state: State) => state.gridClearing;
export const getDisplayModeEntity = (state: State) => state.displayMode;

export const getDirectionalityScatterPlotDataEntity = (state: State) => state.directionalityScatterPlotDataEntity;
export const getDirectionalityScatterPlotDataLoadingEntity = (state: State) => state.directionalityScatterPlotDataLoadingEntity;
export const getDirectionalityScatterPlotDataLoadedEntity = (state: State) => state.directionalityScatterPlotDataLoadedEntity;
export const getDirectionalityScatterPlotDataErrorEntity = (state: State) => state.directionalityScatterPlotDataErrorEntity;

export const getRegressionEntity = (state: State) => state.regressionEntity;
export const getRegressionLoadingEntity = (state: State) => state.regressionLoadingEntity;
export const getRegressionLoadedEntity = (state: State) => state.regressionLoadedEntity;
export const getRegressionErrorEntity = (state: State) => state.regressionErrorEntity;
