import * as fromModels from './../../models/agency-portfolio.models';
import * as fromActions from './../actions/agency-portfolio.actions';

export interface State {

    // UI
    activeRequest: fromModels.AgencyPortfolioRequest;
    activeAsOfDate: string;
    // activeLayout: {[category: string]: string};
    activePositionLayout: string;
    activeBenchmarkLayout: string;
    activeSecurityLayout: string;
    activeRollsLayout: string;

    activeTab: string;
    barChartShowStatus: boolean;
    globalTextFilter: string;
    columnsDict: {[category: string]: string[]};
    targetColumn: string;
    allowLoadingDisplay: boolean;
    
    // Data
    // positions: fromModels.Position[];
    positions: {
        [date: string]: fromModels.Position[];
    };
    positionsLoading: boolean;
    positionsLoaded: boolean;
    positionsError?: string;

    // securities: fromModels.Security[];
    securities: {
        [date: string]: fromModels.Security[];
    }
    securitiesLoading: boolean;
    securitiesLoaded: boolean;
    securitiesError?: string;

    // benchmarks: fromModels.Benchmark[];
    benchmarks: {
        [date: string]: fromModels.Benchmark[];
    };
    benchmarksLoading: boolean;
    benchmarksLoaded: boolean;
    benchmarksError?: string;


    // benchmarks: fromModels.Benchmark[];
    rolls: {
        [date: string]: fromModels.Benchmark[];
    };
    rollsLoading: boolean;
    rollsLoaded: boolean;
    rollsError?: string;

    layouts: {[name: string]: fromModels.Layout},
    layoutsLoading: boolean;
    layoutsLoaded: boolean;
    layoutsSaving: boolean;
    layoutsSaved: boolean;
    layoutsError?: string;
}

const initialState: State = {
    activeRequest: undefined,
    activeAsOfDate: undefined,
    // activeLayout: undefined,
    activePositionLayout: undefined,
    activeBenchmarkLayout: undefined,
    activeSecurityLayout: undefined,
    activeRollsLayout: undefined,

    allowLoadingDisplay: true,

    activeTab: 'position',
    barChartShowStatus: false,
    globalTextFilter: undefined,
    columnsDict: {},
    targetColumn: undefined,

    // positions: [],
    positions: {},
    positionsLoading: false,
    positionsLoaded: false,

    // securities: [],
    securities: {},
    securitiesLoading: false,
    securitiesLoaded: false,

    // benchmarks: [],
    benchmarks: {},
    benchmarksLoading: false,
    benchmarksLoaded: false,

    // rolls: [],
    rolls: {},
    rollsLoading: false,
    rollsLoaded: false,

    layouts: {},
    layoutsLoading: false,
    layoutsLoaded: false,
    layoutsSaving: false,
    layoutsSaved: false,
};

export function reducer(state = initialState, action: fromActions.AgencyPortfolioActions ): State {
    switch (action.type) {

        case fromActions.AgencyPortfolioActionTypes.SET_ACTIVE_LAYOUT: {
            if(action.payload.category === 'position') {
                return {
                    ...state,
                    activePositionLayout: action.payload.name
                }
            } else if(action.payload.category === 'benchmark') {
                return {
                    ...state,
                    activeBenchmarkLayout: action.payload.name
                }
            } else {
                return {
                    ...state,
                    activeSecurityLayout: action.payload.name
                }
            }


            // return {
            //     ...state,
            //     activeLayout: Object.assign({}, state.activeLayout, {[action.payload.category]: action.payload.name})
            // }
        }

        case fromActions.AgencyPortfolioActionTypes.SET_ACTIVE_TAB: {
            return {
                ...state,
                activeTab: action.payload
            }
        }

        case fromActions.AgencyPortfolioActionTypes.TOOGLE_BAR_CHART: {
            return {
                ...state,
                barChartShowStatus: action.payload
            }
        }

        case fromActions.AgencyPortfolioActionTypes.SET_GLOBAL_TEXT_FILTER: {
            return {
                ...state,
                globalTextFilter: action.payload
            }
        }

        case fromActions.AgencyPortfolioActionTypes.SET_COLUMNS_SEARCH_DICT: {
            return {
                ...state,
                columnsDict: Object.assign({}, state.columnsDict, action.payload)
            }
        }

        case fromActions.AgencyPortfolioActionTypes.SET_TARGET_COLUMN: {
            return {
                ...state,
                targetColumn: action.payload
            }
        }

        case fromActions.AgencyPortfolioActionTypes.ALLOW_LOADING_DISPLAY: {
            return {
                ...state,
                allowLoadingDisplay: action.payload
            }
        }


        // --------------------------------------------------------------------------

        case fromActions.AgencyPortfolioActionTypes.LOAD_DATA: {

            if(action.payload.displayMode === 'position') {
                return {
                    ...state,
                    // activeAsOfDate: action.payload.asOfDate,
                    positionsLoading: true,
                    positionsLoaded: false,
                    positionsError: null
                }
            } 

            if(action.payload.displayMode === 'security') {
                return {
                    ...state,
                    // activeAsOfDate: action.payload.asOfDate,
                    securitiesLoading: true,
                    securitiesLoaded: false,
                    securitiesError: null
                }
            } 

            if(action.payload.displayMode === 'benchmark') {
                return {
                    ...state,
                    // activeAsOfDate: action.payload.asOfDate,
                    benchmarksLoading: true,
                    benchmarksLoaded: false,
                    benchmarksError: null
                }
            } 

            if(action.payload.displayMode === 'rolls') {
                return {
                    ...state,
                    // activeAsOfDate: action.payload.asOfDate,
                    rollsLoading: true,
                    rollsLoaded: false,
                    rollsError: null
                }
            } 
            break;
        }

        // -------------------------------------------------------------------------

        case fromActions.AgencyPortfolioActionTypes.LOAD_POSITIONS_COMPLETE: {

            const positionsWithId = action.payload.data.map(position => {
                const item = Object.assign({}, position, {
                    id: '' + position.FundId + position.PodId + position.TID + position.SID
                });
                return item;
            });
            return {
                ...state,
                activeAsOfDate: action.payload.date,
                positions: Object.assign({}, state.positions, {[action.payload.date]: positionsWithId}),
                positionsLoading: false,
                positionsLoaded: true,
                positionsError: null
            };
        }

        case fromActions.AgencyPortfolioActionTypes.LOAD_POSITIONS_FAILED: {
            return {
                ...state,
                positionsLoading: false,
                positionsLoaded: false,
                positionsError: action.payload
            };
        }



        // ------------------------------------------------------------------------

        case fromActions.AgencyPortfolioActionTypes.LOAD_SECURITIES_COMPLETE: {
            const securitiesWithId = action.payload.data.map(security => {
                const item = Object.assign({}, security, {
                    id: '' + security.SID
                });
                return item;
            });
            return {
                ...state,
                activeAsOfDate: action.payload.date,
                securities: Object.assign({}, state.securities, {[action.payload.date]: securitiesWithId}),
                securitiesLoading: false,
                securitiesLoaded: true,
                securitiesError: null
            };
        }

        case fromActions.AgencyPortfolioActionTypes.LOAD_SECURITIES_FAILED: {
            return {
                ...state,
                securitiesLoading: false,
                securitiesLoaded: false,
                securitiesError: action.payload
            };
        }



        // ------------------------------------------------------------------------


        case fromActions.AgencyPortfolioActionTypes.LOAD_BENCHMARKS_COMPLETE: {
            const benchmarksWithId = action.payload.data.map(benchmark => {
                const item = Object.assign({}, benchmark, {
                    id: '' + benchmark.Benchmark
                });
                return item;
            });
            return {
                ...state,
                activeAsOfDate: action.payload.date,
                benchmarks: Object.assign({}, state.benchmarks, {[action.payload.date]: benchmarksWithId}),
                benchmarksLoading: false,
                benchmarksLoaded: true,
                benchmarksError: null
            };
        }

        case fromActions.AgencyPortfolioActionTypes.LOAD_BENCHMARKS_FAILED: {
            return {
                ...state,
                benchmarksLoading: false,
                benchmarksLoaded: false,
                benchmarksError: action.payload
            };
        }


        // ------------------------------------------------------------------------


        case fromActions.AgencyPortfolioActionTypes.LOAD_ROLLS_COMPLETE: {
            // const rollsWithId = action.payload.data.map(benchmark => {
            //     const item = Object.assign({}, benchmark, {
            //         id: '' + benchmark.Benchmark
            //     });
            //     return item;
            // });
            return {
                ...state,
                activeAsOfDate: action.payload.date,
                rolls: Object.assign({}, state.rolls, {[action.payload.date]: action.payload.data}),
                rollsLoading: false,
                rollsLoaded: true,
                rollsError: null
            };
        }

        case fromActions.AgencyPortfolioActionTypes.LOAD_ROLLS_FAILED: {
            return {
                ...state,
                rollsLoading: false,
                rollsLoaded: false,
                rollsError: action.payload
            };
        }

        // --------------------------------------------------------------------------------

        case fromActions.AgencyPortfolioActionTypes.LOAD_LAYOUT: {
            return {
                ...state,
                layoutsLoading: true,
                layoutsLoaded: false,
                layoutsError: null
            }
        }

        case fromActions.AgencyPortfolioActionTypes.LOAD_LAYOUT_COMPLETE: {
            const layoutDict: {[name: string]: fromModels.Layout} = {};
            action.payload.forEach(layout => {
                layout.layoutData = JSON.parse(layout.layoutData);
                layoutDict[layout.name] = layout;
            });

            return {
                ...state,
                layouts: layoutDict,
                layoutsLoading: false,
                layoutsLoaded: true,
                layoutsError: null
            }
        }

        case fromActions.AgencyPortfolioActionTypes.LOAD_LAYOUT_FAILED: {
            return {
                ...state,
                layoutsLoading: false,
                layoutsLoaded: false,
                layoutsError: action.payload
            }
        }



        // -----------------------------------------------------------------------------

        case fromActions.AgencyPortfolioActionTypes.SAVE_LAYOUT: {
            return {
                ...state,
                layoutsSaving: true,
                layoutsSaved: false,
                layoutsError: null
            }
        }

        case fromActions.AgencyPortfolioActionTypes.SAVE_LAYOUT_COMPLETE: {
            return {
                ...state,
                layoutsSaving: false,
                layoutsSaved: true,
                layouts: Object.assign({}, state.layouts, {[action.payload.name]: action.payload}),
                layoutsError: null,

                // activeLayout: Object.assign({}, state.activeLayout, {[action.payload.category]: action.payload.name})
            }
        }

        case fromActions.AgencyPortfolioActionTypes.SAVE_LAYOUT_FAILED: {
            return {
                ...state,
                layoutsSaving: false,
                layoutsSaved: false,
                layoutsError: action.payload
            }
        }

        default: {
            return state;
        }
    }
}

// export const getActiveLayout = (state: State) => state.activeLayout;
export const getActivePositionLayoutName = (state: State) => state.activePositionLayout;
export const getActiveBenchmarkLayoutName = (state: State) => state.activeBenchmarkLayout;
export const getActiveSecurityLayoutName = (state: State) => state.activeSecurityLayout;
export const getActiveRollsLayoutName = (state: State) => state.activeRollsLayout;

export const getActiveAsOfDate = (state: State) => state.activeAsOfDate;

export const getActiveTab = (state: State) => state.activeTab;
export const getBarChartShowStatus = (state: State) => state.barChartShowStatus;
export const getGlobalTextFilter = (state: State) => state.globalTextFilter;
export const getColumnsSearchDict = (state: State) => state.columnsDict;
export const getTargetColumn = (state: State) => state.targetColumn;
export const getAllowLoadingDisplay = (state: State) => state.allowLoadingDisplay;

export const getPositions = (state: State) => state.positions;
export const getPositionsLoading = (state: State) => state.positionsLoading;
export const getPositionsLoaded = (state: State) => state.positionsLoaded;
export const getPositionsError = (state: State) => state.positionsError;

export const getSecurities = (state: State) => state.securities;
export const getSecuritiesLoading = (state: State) => state.securitiesLoading;
export const getSecuritiesLoaded = (state: State) => state.securitiesLoaded;
export const getSecuritiesError = (state: State) => state.securitiesError;

export const getBenchmarks = (state: State) => state.benchmarks;
export const getBenchmarksLoading = (state: State) => state.benchmarksLoading;
export const getBenchmarksLoaded = (state: State) => state.benchmarksLoaded;
export const getBenchmarksError = (state: State) => state.benchmarksError;

export const getRolls = (state: State) => state.rolls;
export const getRollsLoading = (state: State) => state.rollsLoading;
export const getRollsLoaded = (state: State) => state.rollsLoaded;
export const getRollsError = (state: State) => state.rollsError;

export const getLayouts = (state: State) => state.layouts;
export const getLayoutsLoading = (state: State) => state.layoutsLoading;
export const getLayoutsLoaded = (state: State) => state.layoutsLoaded;
export const getLayoutsSaving = (state: State) => state.layoutsSaving;
export const getLayoutsSaved = (state: State) => state.layoutsSaved;
export const getLayoutsError = (state: State) => state.layoutsError;


