import * as fromActions from '../actions';
import * as fromModels from './../../models/pool-viewer.models';

import * as fromLookupsModels from './../../models/lookups.models';

import uuidv1 from 'uuid/v1';

export interface State {

    // Lookups
    lookups: fromLookupsModels.ILookups;
    lookupsLoading: boolean;
    lookupsLoaded: boolean;
    lookupsError?: string;

    // UI Data
    activePortfolioIds?: any[];
    gridSize: string;
    newListCounter: number;
    shortCutPortfolios: {
        cashPortfolio: number;
        deliverablePortfolio: number;
        tbaPortfolio: number;
    };

    // Business Data
    creatingPortfolio: boolean;
    createdPortfolio: boolean;
    createPortfolioError?: string;

    portfolios: {
        ids: number[];
        entities: {[id: string]: fromModels.Portfolio};
        loading: boolean;
        loaded: boolean;
        error?: string;
    };

    tempPortfolios: {
        [id: string]: {id: string; name: string};
    };
    // poolViewerInfos: {
    //     ids: string[];
    //     entities: {[id: string]: fromModels.PoolViewerInfo };
    //     loading: boolean;
    //     loaded: boolean;
    //     error?: string;
    // };
    // poolItems: {
    //     ids: string[];
    //     entities: {[id: string]: fromModels.PoolItem};
    //     loading: boolean;
    //     loaded: boolean;
    //     error?: string;
    // };
    portfoliosSecurities: {
        entities: {[portfolioId: string]: fromModels.Security[]};
        loading: boolean;
        loaded: boolean;
        error?: string;
    };

    portfoliosYieldbookResult: {
        entities: {[portfolioId: string]: any[]};
        loading: boolean;
        loaded: boolean;
        error?: string;
    };

    activeCusipModelValidation: string;

    portfolioModelValidationDetails: {
        entities: {[cusip: string]: any[]},
        loading: boolean;
        loaded: boolean;
        error?: string;
    };

    portfolioModelValidationSummaries: {
        entities: {[cusip: string]: any[]},
        loading: boolean;
        loaded: boolean;
        error?: string;
    };

    bidlistsViewMode: boolean;
    bidlistIndicativeDataLoadingOnOffSwitch: boolean;
    bidlists: {
        firstPanel: {
            data?: any[];
            loading: boolean;
            loaded: boolean;
            error?: string;
        };
        secondPanel: {
            data?: any[];
            loading: boolean;
            loaded: boolean;
            error?: string;
        }
        thirdPanel: {
            data?: any[];
            loading: boolean;
            loaded: boolean;
            error?: string;
        };
        fourthPanel: {
            data?: any[];
            loading: boolean;
            loaded: boolean;
            error?: string;
        }
    };


    // ---------------------------------------------------------------------------------

    poolItemsGridColumnsLayouts: {
        ids: string[];
        entities: {[id: string]: fromModels.PoolItemsGridColumnLayout};
        loading: boolean;
        loaded: boolean;
        saving?: boolean;
        saved?: boolean;
        error?: string;
    };

    poolItemsGrouping: {
        ids: string[];
        entities: {[id: string]: fromModels.PoolItemGridRowGrouping};
        // entities: fromModels.PoolItemGridRowGrouping[];
        loading: boolean;
        loaded: boolean;
        saving?: boolean;
        saved?: boolean;
        error?: string;
    };

    defaultScenarios: {
        ids: number[];
        entities: {[id: string]: fromModels.defaultScenario};
        loading: boolean;
        loaded: boolean;
        error?: string;
    };

    configurations: {
        globalSettings: fromModels.setting[];
        severitySettings: fromModels.setting[];
        calibrationSettings: fromModels.setting[];
        loading: boolean;
        loaded: boolean;
        error?: string;
    };

    riskFreeRate: number;
    loadingRiskFreeRate: boolean;
    loadedRiskFreeRate: boolean;
    loadRiskFreeRateError?: string;

    updatingRiskFreeRate: boolean;
    updatedRiskFreeRate: boolean;
    updateRiskFreeRateError?: string;
}

const initialState: State = {

    lookups: null,
    lookupsLoading: false,
    lookupsLoaded: false,

    activePortfolioIds: [],
    gridSize: 'big',
    newListCounter: 0,
    shortCutPortfolios: null,

    creatingPortfolio: false,
    createdPortfolio: false,

    portfolios: {
        ids: [],
        entities: {},
        loading: false,
        loaded: false
    },
    tempPortfolios: {},
    // poolViewerInfos: {
    //     ids: [],
    //     entities: {},
    //     loading: false,
    //     loaded: false
    // },
    // poolItems: {
    //     ids: [],
    //     entities: {},
    //     loading: false,
    //     loaded: false
    // },
    portfoliosSecurities: {
        entities: {},
        loading: false,
        loaded: false,
    },

    portfoliosYieldbookResult: {
        entities: {},
        loading: false,
        loaded: false,
    },

    activeCusipModelValidation: undefined,

    portfolioModelValidationDetails: {
        entities: {},
        loaded: false,
        loading: false,
    },

    portfolioModelValidationSummaries: {
        entities: {},
        loaded: false,
        loading: false,
    },

    bidlistsViewMode: false,
    bidlists: null,
    bidlistIndicativeDataLoadingOnOffSwitch: false,

    // -----------------------------------------------------

    poolItemsGridColumnsLayouts: {
        ids: [],
        entities: {},
        loading: false,
        loaded: false
    },

    poolItemsGrouping: {
        ids: [],
        entities: {},
        loading: false,
        loaded: false,
    },

    defaultScenarios: {
        ids: [],
        entities: {},
        loading: false,
        loaded: false,
    },

    configurations: {
        globalSettings: [],
        severitySettings: [],
        calibrationSettings: [],
        loading:  false,
        loaded:  false,
    },

    riskFreeRate: undefined,
    loadingRiskFreeRate: false,
    loadedRiskFreeRate: false,

    updatingRiskFreeRate: false,
    updatedRiskFreeRate: false,
};

export function reducer(state = initialState, action: fromActions.PoolViewerActions | fromActions.PortfolioActions | fromActions.IndicativesActions): State {
    switch (action.type) {

        case fromActions.PortfolioActionTypes.SET_SHORTCUT_PORTFOLIOS: {
            return {
                ...state,
                shortCutPortfolios: action.payload
            }
        }



        case fromActions.PortfolioActionTypes.LOAD_ALL_LOOKUPS: {
            return {
                ...state,
                lookupsLoading: true,
                lookupsLoaded: false,
                lookupsError: null
            };
        }

        case fromActions.PortfolioActionTypes.LOAD_ALL_LOOKUPS_COMPLETE: {
            return {
                ...state,
                lookupsLoading: false,
                lookupsLoaded: true,
                lookups: action.payload
            };
        }

        case fromActions.PortfolioActionTypes.LOAD_ALL_LOOKUPS_FAILED: {
            return {
                ...state,
                lookupsLoading: false,
                lookupsLoaded: true,
                lookupsError: action.payload
            };
        }

        case fromActions.PortfolioActionTypes.LOAD_PORTFOLIOS: {
            return {
                ...state,
                portfolios: {
                    ...state.portfolios,
                    loading: true,
                    loaded: false,
                    error: null
                }
            };
        }

        case fromActions.PortfolioActionTypes.LOAD_PORTFOLIOS_COMPLETE: {
            const payload = action.payload;
            const newIds = action.payload.map((portfolio) => portfolio.portfolioId)
                .filter((id) => state.portfolios.ids.indexOf(id) < 0);

            const newEntities = action.payload.reduce((entities: {[id: string]: fromModels.Portfolio},
                item: fromModels.Portfolio) => {
                    return Object.assign({}, entities, {[item.portfolioId]: item});
                }, state.portfolios.entities);

            return {
                ...state,
                portfolios: {
                    ids: [...state.portfolios.ids, ...newIds],
                    entities: newEntities,
                    loading: false,
                    loaded: true
                }
            };
        }

        case fromActions.PortfolioActionTypes.LOAD_PORTFOLIOS_FAILED: {
            return {
                ...state,
                portfolios: {
                    ...state.portfolios,
                    loading: false,
                    loaded: false,
                    error: action.payload
                }
            };
        }

        // -------------------------------------------------------------------------------------------------------------

        // case fromActions.PoolViewerActionTypes.LOAD_POOL_VIEWER_INFO: {
        //     return {
        //         ...state,
        //         poolViewerInfos: {
        //             ...state.poolViewerInfos,
        //             loading: true,
        //             loaded: false,
        //             error: null
        //         }
        //     };
        // }

        // case fromActions.PoolViewerActionTypes.LOAD_POOL_VIEWER_INFO_COMPLETE: {
        //     const payload = action.payload as fromModels.PoolViewerInfo;
        //     const existingIds = state.poolViewerInfos.ids.filter((id) => id !== payload.poolId);
        //     return {
        //         ...state,
        //         poolViewerInfos: {
        //             ids: [...existingIds, payload.poolId],
        //             entities: {
        //                 ...state.poolViewerInfos.entities,
        //                 [payload.poolId]: payload
        //             },
        //             loading: false,
        //             loaded: true
        //         }
        //     };
        // }

        // case fromActions.PoolViewerActionTypes.LOAD_POOL_VIEWER_INFO_FAILED: {
        //     return {
        //         ...state,
        //         poolViewerInfos: {
        //             ...state.poolViewerInfos,
        //             loading: false,
        //             loaded: false,
        //             error: action.payload
        //         }
        //     };
        // }

        // ------------------------------------------------------------------------------------------------------------

        case fromActions.PoolViewerActionTypes.LOAD_POOL_VIEWER_ITEMS:
        case fromActions.IndicativesActionTypes.LOAD_INDICATIVES_FROM_USER_INPUT: {
            return {
                ...state,
                portfoliosSecurities: {
                    ...state.portfoliosSecurities,
                    loading: true,
                    loaded: false,
                    error: null
                }
            };
        }

        case fromActions.PoolViewerActionTypes.LOAD_POOL_VIEWER_ITEMS_COMPLETE:
        case fromActions.IndicativesActionTypes.LOAD_INDICATIVES_FROM_USER_INPUT_COMPLETE: {
            const portfolioId = action.payload.portfolioId;
            const securities = action.payload.securities;
            const newEntities = Object.assign({}, state.portfoliosSecurities.entities, {[portfolioId]: securities});
            return {
                ...state,
                portfoliosSecurities: {
                    entities: newEntities,
                    loading: false,
                    loaded: true
                }
            };

            // const newIds = payload.map(poolItem => poolItem.poolItemId).filter(id => state.poolItems.ids.indexOf(id) < 0);

            // const newEntities = payload.reduce((entities: {[id: string]: fromModels.PoolItem}, item: fromModels.PoolItem) => {
            //     return Object.assign({}, entities, {[item.poolItemId]: item});
            // }, state.poolItems.entities);

            // return {
            //     ...state,
            //     poolItems: {
            //         ids: [...state.poolItems.ids, ...newIds],
            //         entities: newEntities,
            //         loading: false,
            //         loaded: true
            //     }
            // };
        }

        case fromActions.PoolViewerActionTypes.LOAD_POOL_VIEWER_ITEMS_FAILED:
        case fromActions.IndicativesActionTypes.LOAD_INDICATIVES_FROM_USER_INPUT_FAILED: {
            const payload = action.payload as string;
            return {
                ...state,
                portfoliosSecurities: {
                    ...state.portfoliosSecurities,
                    loading: false,
                    loaded: false,
                    error: payload
                }
            };
        }


        // ------------------------------------------------------------------------------------------------------------


        case fromActions.PoolViewerActionTypes.LOAD_PORTFOLIO_YIELDBOOK_RESULT: {
            return {
                ...state,
                portfoliosYieldbookResult: {
                    ...state.portfoliosYieldbookResult,
                    loading: true,
                    loaded: false,
                    error: null,
                }
            };
        }

        case fromActions.PoolViewerActionTypes.LOAD_PORTFOLIO_YIELDBOOK_RESULT_COMPLETE: {
            return {
                ...state,
                portfoliosYieldbookResult: {
                    entities: Object.assign({}, state.portfoliosYieldbookResult, {[action.payload.portfolioId.toString()]: action.payload.data}),
                    loading: true,
                    loaded: false,
                    error: null,
                }
            };
        }

        case fromActions.PoolViewerActionTypes.LOAD_PORTFOLIO_YIELDBOOK_RESULT_FAILED: {
            return {
                ...state,
                portfoliosYieldbookResult: {
                    ...state.portfoliosYieldbookResult,
                    loading: true,
                    loaded: false,
                    error: null,
                }
            };
        }

        // -------------------------------------------------------------------------------------------------------------

        case fromActions.PortfolioActionTypes.LOAD_PORTFOLIO_MODEL_VALIDATION_DETAIL: {
            return {
                ...state,
                portfolioModelValidationDetails: {
                    ...state.portfolioModelValidationDetails,
                    loading: true,
                    loaded: false,
                    error: null,
                }
            };
        }

        case fromActions.PortfolioActionTypes.LOAD_PORTFOLIO_MODEL_VALIDATION_DETAIL_COMPLETE: {
            return {
                ...state,
                portfolioModelValidationDetails: {
                    entities: Object.assign({}, state.portfolioModelValidationDetails.entities, {[action.payload.cusip]: action.payload.data}),
                    loading: false,
                    loaded: true,
                    error: null,
                }
            };
        }

        case fromActions.PortfolioActionTypes.LOAD_PORTFOLIO_MODEL_VALIDATION_DETAIL_FAILED: {
            return {
                ...state,
                portfolioModelValidationDetails: {
                    ...state.portfolioModelValidationDetails,
                    loading: false,
                    loaded: false,
                    error: action.payload,
                }
            };
        }

        case fromActions.PortfolioActionTypes.LOAD_PORTFOLIO_MODEL_VALIDATION_SUMMARY: {
            return {
                ...state,
                portfolioModelValidationSummaries: {
                    ...state.portfolioModelValidationSummaries,
                    loading: true,
                    loaded: false,
                    error: null,
                }
            };
        }

        case fromActions.PortfolioActionTypes.LOAD_PORTFOLIO_MODEL_VALIDATION_SUMMARY_COMPLETE: {
            return {
                ...state,
                portfolioModelValidationSummaries: {
                    entities: Object.assign({}, state.portfolioModelValidationSummaries.entities, {[action.payload.cusip]: action.payload.data}),
                    loading: false,
                    loaded: true,
                    error: null,
                }
            };
        }

        case fromActions.PortfolioActionTypes.LOAD_PORTFOLIO_MODEL_VALIDATION_SUMMARY_FAILED: {
            return {
                ...state,
                portfolioModelValidationSummaries: {
                    ...state.portfolioModelValidationSummaries,
                    loading: false,
                    loaded: false,
                    error: action.payload,
                }
            };
        }



        // --------------------------------------------------------------------------------------------------------------

        case fromActions.PoolViewerActionTypes.LOAD_POOL_VIEWER_ITEMS_COLUMNS_LAYOUT: {
            return {
                ...state,
                poolItemsGridColumnsLayouts: {
                    ...state.poolItemsGridColumnsLayouts,
                    loading: true,
                    loaded: false,
                    error: null
                }
            };
        }

        case fromActions.PoolViewerActionTypes.LOAD_POOL_VIEWER_ITEMS_COLUMNS_LAYOUT_COMPLETE: {
            const payload = action.payload;
            const newIds = payload.map(item => item.id).filter(id => state.poolItemsGridColumnsLayouts.ids.indexOf(id) < 0);

            const newEntities = payload.reduce((entities, item) => {
                return Object.assign({}, entities, {[item.id]: item});
            }, state.poolItemsGridColumnsLayouts.entities);

            return {
                ...state,
                poolItemsGridColumnsLayouts: {
                    ids: [...state.poolItemsGridColumnsLayouts.ids, ...newIds],
                    entities: newEntities,
                    loading: false,
                    loaded: true
                }
            };
        }

        case fromActions.PoolViewerActionTypes.LOAD_POOL_VIEWER_ITEMS_COLUMNS_LAYOUT_FAILED: {
            return {
                ...state,
                poolItemsGridColumnsLayouts: {
                    ...state.poolItemsGridColumnsLayouts,
                    loading: false,
                    loaded: false,
                    error: action.payload
                }
            };
        }

        // --------------------------------------------------------------------------------------------

        case fromActions.PoolViewerActionTypes.SAVE_POOL_VIEWER_ITEMS_COLUMNS_LAYOUT: {
            return {
                ...state,
                poolItemsGridColumnsLayouts: {
                    ...state.poolItemsGridColumnsLayouts,
                    saving: true,
                    saved: false
                }
            };
        }

        case fromActions.PoolViewerActionTypes.SAVE_POOL_VIEWER_ITEMS_COLUMNS_LAYOUT_COMPLETE: {
            const newLayout = action.payload;
            const newIds = [...state.poolItemsGridColumnsLayouts.ids, newLayout.id];
            const newEntities = Object.assign({}, state.poolItemsGridColumnsLayouts.entities, {[newLayout.id]: newLayout});

            return {
                ...state,
                poolItemsGridColumnsLayouts: {
                    ...state.poolItemsGridColumnsLayouts,
                    ids: newIds,
                    entities: newEntities,
                    saving: false,
                    saved: true
                }
            };
        }

        case fromActions.PoolViewerActionTypes.SAVE_POOL_VIEWER_ITEMS_COLUMNS_LAYOUT_FAILED: {
            return {
                ...state,
                poolItemsGridColumnsLayouts: {
                    ...state.poolItemsGridColumnsLayouts,
                    saving: false,
                    saved: false,
                    error: action.payload
                }
            };
        }

        // ---------------------------------------------------------------------------------------------

        case fromActions.PoolViewerActionTypes.LOAD_POOL_VIEWER_ITEMS_GROUPINGS: {
            return {
                ...state,
                poolItemsGrouping: {
                    ...state.poolItemsGrouping,
                    loading: true,
                    loaded: false,
                    error: null
                }
            };
        }

        case fromActions.PoolViewerActionTypes.LOAD_POOL_VIEWER_ITEMS_GROUPINGS_COMPLETE: {
            const payload = action.payload;
            const newIds = payload.map(item => item.id).filter(id => state.poolItemsGrouping.ids.indexOf(id) < 0);

            const newEntities = payload.reduce((entities, item) => {
                return Object.assign({}, entities, {[item.id]: item});
            }, state.poolItemsGrouping.entities);

            return {
                ...state,
                poolItemsGrouping: {
                    ids: [...state.poolItemsGrouping.ids, ...newIds],
                    entities: newEntities,
                    loading: false,
                    loaded: true,
                    error: null
                }
            };
        }

        case fromActions.PoolViewerActionTypes.LOAD_POOL_VIEWER_ITEMS_GROUPINGS_FAIL: {
            return {
                ...state,
                poolItemsGrouping: {
                    ...state.poolItemsGrouping,
                    loading: false,
                    loaded: false,
                    error: action.payload
                }
            };
        }


        // -----------------------------------------------------------------------------------------------------------

        case fromActions.PoolViewerActionTypes.SAVE_POOL_VIEWER_ITEMS_GROUPING: {
            return {
                ...state,
                poolItemsGrouping: {
                    ...state.poolItemsGrouping,
                    saving: true,
                    saved: false
                }
            };
        }

        case fromActions.PoolViewerActionTypes.SAVE_POOL_VIEWER_ITEMS_GROUPING_COMPLETE: {
            const newLayout = action.payload;
            const newIds = [...state.poolItemsGrouping.ids, newLayout.id];
            const newEntities = Object.assign({}, state.poolItemsGrouping.entities, {[newLayout.id]: newLayout});

            return {
                ...state,
                poolItemsGrouping: {
                    ...state.poolItemsGrouping,
                    ids: newIds,
                    entities: newEntities,
                    saving: false,
                    saved: true
                }
            };
        }

        case fromActions.PoolViewerActionTypes.SAVE_POOL_VIEWER_ITEMS_GROUPING_FAIL: {
            return {
                ...state,
                poolItemsGrouping: {
                    ...state.poolItemsGrouping,
                    saving: false,
                    saved: false,
                    error: action.payload
                }
            };
        }


        // ----------------------------------------------------------------------------------------------------------

        // case fromActions.PortfolioActionTypes.CLONE_PORTFOLIO_COMPLETE: {
        //     const payload = action.payload;
        //     return {
        //         ...state
        //     };
        // }

        case fromActions.PortfolioActionTypes.CREATE_TEMP_PORTFOLIO: {
            const tempPortfolio: fromModels.Portfolio = {
                portfolioGuid: uuidv1(),
                name: 'New List - ' + (state.newListCounter + 1)
            };
            // const newPortfoliosEntities = Object.assign({}, state.portfolios.entities, {[tempPortfolio.portfolioGuid]: tempPortfolio});
            const newPortfoliosSecuritiesEntities = Object.assign({}, state.portfoliosSecurities.entities,
                {[tempPortfolio.portfolioGuid]: action.payload || []});

            const newPortfoliosYieldbookResultEntities = Object.assign({}, state.portfoliosYieldbookResult.entities, {
                [tempPortfolio.portfolioGuid]: []
            });

            return {
                ...state,
                newListCounter: state.newListCounter + 1,
                activePortfolioIds: [...state.activePortfolioIds, tempPortfolio.portfolioGuid],
                // portfolios: {
                //     ...state.portfolios,
                //     entities: newPortfoliosEntities
                // },
                portfoliosSecurities: {
                    entities: newPortfoliosSecuritiesEntities,
                    loading: false,
                    loaded: true
                },
                portfoliosYieldbookResult: {
                    entities: newPortfoliosYieldbookResultEntities,
                    loading: false,
                    loaded: true
                },
                tempPortfolios: Object.assign({}, state.tempPortfolios, {[tempPortfolio.portfolioGuid]: tempPortfolio})
            };
        }

        case fromActions.PortfolioActionTypes.CREATE_TEMP_PORTFOLIO_WITH_EXPLODE_DATA: {
            const tempPortfolio: fromModels.Portfolio = {
                portfolioGuid: uuidv1(),
                name: action.payload.name + ' Underliers'
            };

            return {
                ...state,
                newListCounter: state.newListCounter + 1,
                activePortfolioIds: [...state.activePortfolioIds, tempPortfolio.portfolioGuid],
                portfoliosSecurities: {
                    ...state.portfoliosSecurities,
                    loading: true,
                    loaded: false
                },
                tempPortfolios: Object.assign({}, state.tempPortfolios, {[tempPortfolio.portfolioGuid]: tempPortfolio})
            };
        }

        // ---------------------------------------------------------------------------------

        case fromActions.PortfolioActionTypes.CREATE_EMPTY_PORTFOLIO: {
            return {
                ...state,
                creatingPortfolio: false
            };
        }

        case fromActions.PortfolioActionTypes.CREATE_EMPTY_PORTFOLIO_COMPLETE: {
            const newPorfolio = action.payload as fromModels.Portfolio;
            return {
                ...state,
                creatingPortfolio: false,
                createdPortfolio: true,
                activePortfolioIds: [...state.activePortfolioIds, newPorfolio.portfolioId],
                portfolios: {
                    ...state.portfolios,
                    ids: [...state.portfolios.ids, newPorfolio.portfolioId],
                    entities: Object.assign({}, state.portfolios.entities, {[newPorfolio.portfolioId]: newPorfolio})
                }
            };
        }

        case fromActions.PortfolioActionTypes.CREATE_EMPTY_PORTFOLIO_FAILED: {
            return {
                ...state,
                creatingPortfolio: false,
                createdPortfolio: false,
                createPortfolioError: action.payload
            };
        }

        // --------------------------------------------------------------------------------------------------------------

        case fromActions.PortfolioActionTypes.REMOVE_ACTIVE_PORTFOLIO_ACTION: {
            const targetActivePortfolioId = action.payload;
            const index = state.activePortfolioIds.indexOf(targetActivePortfolioId);
            if (index > -1) {
                state.activePortfolioIds.splice(index, 1);
            }
            return {
                ...state,
                activePortfolioIds: [...state.activePortfolioIds]
            };
        }

        case fromActions.PortfolioActionTypes.ADD_ACTIVE_PORTFOLIO_ACTION: {
            const targetActivePortfolioId = action.payload;
            const index = state.activePortfolioIds.indexOf(targetActivePortfolioId);

            if (index === -1) {
                return {
                    ...state,
                    activePortfolioIds: [...state.activePortfolioIds, targetActivePortfolioId]
                };
            } else {
                return state;
            }

        }

        // -----------------------------------------------------------------------------------------------------------

        case fromActions.PortfolioActionTypes.TOGGLE_BIDLISTS_VIEWING: {
            return {
                ...state,
                bidlistsViewMode: !state.bidlistsViewMode
            }
        }

        case fromActions.PortfolioActionTypes.LOAD_BIDLISTS: {
            return {
                ...state,
                bidlists: {
                    firstPanel: {
                        data: state.bidlists ? state.bidlists.firstPanel.data : [],
                        loading: true,
                        loaded: false,
                        error: null,
                    },
                    secondPanel: {
                        data: state.bidlists ? state.bidlists.secondPanel.data : [],
                        loading: true,
                        loaded: false,
                        error: null,
                    },
                    thirdPanel: {
                        data: state.bidlists ? state.bidlists.thirdPanel.data : [],
                        loading: true,
                        loaded: false,
                        error: null,
                    },
                    fourthPanel: {
                        data: state.bidlists ? state.bidlists.fourthPanel.data : [],
                        loading: true,
                        loaded: false,
                        error: null,
                    }
                }
            };
        }

        case fromActions.PortfolioActionTypes.LOAD_BIDLISTS_COMPLETE: {

            return {
                ...state,
                bidlists: Object.assign({}, state.bidlists, {
                    [action.payload.requestType]: {
                        data: action.payload.data,
                        loading: false,
                        loaded: true,
                        error: null,
                    }
                })
            };
        }

        case fromActions.PortfolioActionTypes.LOAD_BIDLISTS_FAILED: {
            return {
                ...state,
                bidlists: Object.assign({}, state.bidlists, {
                    [action.payload.requestType]: {
                        data: [],
                        loading: false,
                        loaded: true,
                        error: action.payload.error
                    }
                })
            };
        }

        case fromActions.IndicativesActionTypes.LOAD_INDICATIVES_FROM_BIDLIST: {
            return {
                ...state,
                bidlists: Object.assign({}, state.bidlists, {
                    thirdPanel: {
                        ...state.bidlists.thirdPanel,
                        loading: true,
                        loaded: false,
                        error: null
                    }
                })
            }
        }

        case fromActions.IndicativesActionTypes.LOAD_INDICATIVES_FROM_BIDLIST_COMPLETE: {

            const bidlistData = action.payload;
            let thirdPanelData = state.bidlists.thirdPanel.data;
            const dictCuispIndex: any = {};
            thirdPanelData.forEach(element => {
                dictCuispIndex[element.Cusip] = element;
            });
            bidlistData.forEach(element => {
                if (dictCuispIndex[element.Cusip]) {
                    dictCuispIndex[element.Cusip] = Object.assign({}, dictCuispIndex[element.Cusip], element);
                }
            });
            thirdPanelData = Object.keys(dictCuispIndex).map(key => dictCuispIndex[key]);

            return {
                ...state,
                bidlists: Object.assign({}, state.bidlists, {
                    thirdPanel: {
                        data: thirdPanelData,
                        loading: false,
                        loaded: true,
                        error: null
                    }
                })
            }
        }

        case fromActions.IndicativesActionTypes.LOAD_INDICATIVES_FROM_BIDLIST_FAILED: {
            return {
                ...state,
                bidlists: Object.assign({}, state.bidlists, {
                    thirdPanel: {
                        ...state.bidlists.thirdPanel,
                        loading: false,
                        loaded: false,
                        error: action.payload
                    }
                })
            };
        }


        case fromActions.IndicativesActionTypes.SET_LOAD_INDICATIVES_FROM_BIDLIST_ONOFF_SWITCH: {
            return {
                ...state,
                bidlistIndicativeDataLoadingOnOffSwitch: action.payload
            }
        }




        // -----------------------------------------------------------------------------------------------

        case fromActions.PortfolioActionTypes.LOAD_DEFAULT_SCENARIO: {
            return {
                ...state,
                defaultScenarios: {
                    ...state.defaultScenarios,
                    loading: true,
                    loaded: false,
                    error: null
                }
            };
        }

        case fromActions.PortfolioActionTypes.LOAD_DEFAULT_SCENARIO_COMPLETE: {
            const payload = action.payload;
            const newIds = action.payload.map((scenario) => scenario.id)
                .filter((id) => state.defaultScenarios.ids.indexOf(id) < 0);

            const newEntities = action.payload.reduce((entities: {[id: string]: fromModels.defaultScenario},
                item: fromModels.defaultScenario) => {
                    return Object.assign({}, entities, {[item.id]: item});
                }, state.defaultScenarios.entities);

            return {
                ...state,
                defaultScenarios: {
                    ids: [...state.defaultScenarios.ids, ...newIds],
                    entities: newEntities,
                    loading: false,
                    loaded: true
                }
            };
        }

        case fromActions.PortfolioActionTypes.LOAD_DEFAULT_SCENARIO_FAILED: {
            return {
                ...state,
                defaultScenarios: {
                    ...state.defaultScenarios,
                    loading: false,
                    loaded: false,
                    error: action.payload
                }
            };
        }


        // --------------------------------------------------------------------------------------------------------------------


        case fromActions.PoolViewerActionTypes.LOAD_POOL_VIEWER_CONFIGURAIONS: {
            return {
                ...state,
                configurations: {
                    ...state.configurations,
                    loading: true,
                    loaded: false,
                    error: null
                }
            };
        }

        case fromActions.PoolViewerActionTypes.LOAD_POOL_VIEWER_CONFIGURAIONS_COMPLETE: {
            return {
                ...state,
                configurations: {
                    globalSettings: action.payload.globalSettings,
                    severitySettings: action.payload.severitySettings,
                    calibrationSettings: action.payload.calibrationSettings,
                    loading: false,
                    loaded: true,
                    error: null
                }
            };
        }

        case fromActions.PoolViewerActionTypes.LOAD_POOL_VIEWER_CONFIGURAIONS_FAILED: {
            return {
                ...state,
                configurations: {
                    ...state.configurations,
                    loading: false,
                    loaded: false,
                    error: action.payload
                }
            };
        }

        // -------------------------------------------------------------------------------------------

        case fromActions.PortfolioActionTypes.LOAD_RISK_FREE_RATE: {
            return {
                ...state,
                loadingRiskFreeRate: true,
                loadedRiskFreeRate: false,
                loadRiskFreeRateError: null
            };
        }

        case fromActions.PortfolioActionTypes.LOAD_RISK_FREE_RATE_COMPLETE: {
            return {
                ...state,
                riskFreeRate: action.payload,
                loadingRiskFreeRate: false,
                loadedRiskFreeRate: true,
                loadRiskFreeRateError: null
            };
        }

        case fromActions.PortfolioActionTypes.LOAD_RISK_FREE_RATE_FAILED: {
            return {
                ...state,
                loadingRiskFreeRate: false,
                loadedRiskFreeRate: false,
                loadRiskFreeRateError: action.payload
            };
        }

        // -------------------------------------------------------------------------------------------

        case fromActions.PortfolioActionTypes.UPDATE_RISK_FREE_RATE: {
            return {
                ...state,
                updatingRiskFreeRate: true,
                updatedRiskFreeRate: false,
                updateRiskFreeRateError: null
            };
        }

        case fromActions.PortfolioActionTypes.UPDATE_RISK_FREE_RATE_COMPLETE: {
            return {
                ...state,
                updatingRiskFreeRate: false,
                updatedRiskFreeRate: true,
                updateRiskFreeRateError: null
            };
        }

        case fromActions.PortfolioActionTypes.UPDATE_RISK_FREE_RATE_FAILED: {
            return {
                ...state,
                updatingRiskFreeRate: false,
                updatedRiskFreeRate: false,
                updateRiskFreeRateError: action.payload
            };
        }

        // -----------------------------------------------------------------------------------------------------------

        default: {
            return state;
        }
    }
}

export const getShortcutPortfolios = (state: State) => state.shortCutPortfolios;

export const getLookups = (state: State) => state.lookups;
export const getLookupsLoading = (state: State) => state.lookupsLoading;
export const getLookupsLoaded = (state: State) => state.lookupsLoaded;
export const getLookupsError = (state: State) => state.lookupsError;

export const getActivePortfolioIds = (state: State) => state.activePortfolioIds;
export const getPoolViewerGridSize = (state: State) => state.gridSize;

export const getCreatingPortfolio = (state: State) => state.creatingPortfolio;
export const getCreatedPortfolio = (state: State) => state.createdPortfolio;
export const getCreatePortfolioError = (state: State) => state.createPortfolioError;

export const getPortfolioIds = (state: State) => state.portfolios.ids;
export const getPortfolioEntities = (state: State) => state.portfolios.entities;
export const getPortfoliosLoading = (state: State) => state.portfolios.loading;
export const getPortfoliosLoaded = (state: State) => state.portfolios.loaded;
export const getPortfoliosError = (state: State) => state.portfolios.error;

export const getTempPortfolios = (state: State) => state.tempPortfolios;

// export const getPoolViewerInfoIds = (state: State) => state.poolViewerInfos.ids;
// export const getPoolViewerInfoEntities = (state: State) => state.poolViewerInfos.entities;
// export const getPoolViewerInfosLoading = (state: State) => state.poolViewerInfos.loading;
// export const getPoolViewerInfosLoaded = (state: State) => state.poolViewerInfos.loaded;
// export const getPoolViewerInfosError = (state: State) => state.poolViewerInfos.error;

// export const getPoolItemIds = (state: State) => state.poolItems.ids;
// export const getPoolItemEntities = (state: State) => state.poolItems.entities;
// export const getPoolItemsLoading = (state: State) => state.poolItems.loading;
// export const getPoolItemsLoaded = (state: State) => state.poolItems.loaded;
// export const getPoolItemsError = (state: State) => state.poolItems.error;

export const getPortfoliosSecuritiesEntities = (state: State) => state.portfoliosSecurities.entities;
export const getPortfoliosSecuritiesLoading = (state: State) => state.portfoliosSecurities.loading;
export const getPortfoliosSecuritiesLoaded = (state: State) => state.portfoliosSecurities.loaded;
export const getPortfoliosSecuritiesError = (state: State) => state.portfoliosSecurities.error;

export const getPortfoliosYieldbookResultEntities = (state: State) => state.portfoliosYieldbookResult.entities;
export const getPortfoliosYieldbookResultLoading = (state: State) => state.portfoliosYieldbookResult.loading;
export const getPortfoliosYieldbookResultLoaded = (state: State) => state.portfoliosYieldbookResult.loaded;
export const getPortfoliosYieldbookResultError = (state: State) => state.portfoliosYieldbookResult.error;

export const getPortfolioCusipModelValidationDetails = (state: State) => state.portfolioModelValidationDetails.entities;
export const getPortfolioCusipModelValidationDetailsLoading = (state: State) => state.portfolioModelValidationDetails.loading;
export const getPortfolioCusipModelValidationDetailsLoaded = (state: State) => state.portfolioModelValidationDetails.loaded;
export const getPortfolioCusipModelValidationDetailsError = (state: State) => state.portfolioModelValidationDetails.error;

export const getPortfolioCusipModelValidationSummaries = (state: State) => state.portfolioModelValidationSummaries.entities;
export const getPortfolioCusipModelValidationSummariesLoading = (state: State) => state.portfolioModelValidationSummaries.loading;
export const getPortfolioCusipModelValidationSummariesLoaded = (state: State) => state.portfolioModelValidationSummaries.loaded;
export const getPortfolioCusipModelValidationSummariesError = (state: State) => state.portfolioModelValidationSummaries.error;

export const getBidlistsViewMode = (state: State) => state.bidlistsViewMode;
export const getBidlists = (state: State) => state.bidlists;
export const getBidlistIndicativeDataLoadingOnOffSwitch = (state: State) => state.bidlistIndicativeDataLoadingOnOffSwitch;

// ---------------------------------------------------------------------------------------------------------------

export const getPoolItemsGridColumnsLayoutsIds = (state: State) => state.poolItemsGridColumnsLayouts.ids;
export const getPoolItemsGridColumnsLayoutsEntities = (state: State) => state.poolItemsGridColumnsLayouts.entities;
export const getPoolItemsGridColumnsLayoutsLoading = (state: State) => state.poolItemsGridColumnsLayouts.loading;
export const getPoolItemsGridColumnsLayoutsLoaded = (state: State) => state.poolItemsGridColumnsLayouts.loaded;
export const getPoolItemsGridColumnsLayoutsError = (state: State) => state.poolItemsGridColumnsLayouts.error;

export const getPoolItemsGroupingsIds = (state: State) => state.poolItemsGrouping.ids;
export const getPoolItemsGroupingsEntities = (state: State) => state.poolItemsGrouping.entities;
export const getPoolItemsGroupingsLoading = (state: State) => state.poolItemsGrouping.loading;
export const getPoolItemsGroupingsLoaded = (state: State) => state.poolItemsGrouping.loaded;
export const getPoolItemsGroupingsError = (state: State) => state.poolItemsGrouping.error;


export const getDefaultScenariosIds = (state: State) => state.defaultScenarios.ids;
export const getDefaultScenariosEntities = (state: State) => state.defaultScenarios.entities;
export const getDefaultScenariosLoading = (state: State) => state.defaultScenarios.loading;
export const getDefaultScenariosLoaded = (state: State) => state.defaultScenarios.loaded;
export const getDefaultScenariosError = (state: State) => state.defaultScenarios.error;

export const getConfigurationGlobalSettings = (state: State) => state.configurations.globalSettings;
export const getConfigurationSeveritySettings = (state: State) => state.configurations.severitySettings;
export const getConfigurationCalibrationSettings = (state: State) => state.configurations.calibrationSettings;
export const getConfigurationLoading = (state: State) => state.configurations.loading;
export const getConfigurationLoaded = (state: State) => state.configurations.loaded;
export const getConfigurationError = (state: State) => state.configurations.error;

export const getRiskFreeRate = (state: State) => state.riskFreeRate;
export const getLoadingRiskFreeRate = (state: State) => state.loadingRiskFreeRate;
export const getLoadedRiskFreeRate = (state: State) => state.loadedRiskFreeRate;
export const getloadRiskFreeRateError = (state: State) => state.loadRiskFreeRateError;

export const getUpdatingRiskFreeRate = (state: State) => state.updatingRiskFreeRate;
export const getUpdatedRiskFreeRate = (state: State) => state.updatedRiskFreeRate;
export const getUpdateRiskFreeRateError = (state: State) => state.updateRiskFreeRateError;

