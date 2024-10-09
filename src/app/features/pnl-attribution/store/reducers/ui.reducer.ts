import * as fromActions from '../actions/ui.actions';
import * as fromModels from '../../models';

export interface State {

    activeLayout: string;
    layoutNames: string[];
    readOnlyMode: boolean,
    guidEntity: {
        [layoutName: string]: string;
    }
    attributionRequestEntity: {
        [layoutName: string]: fromModels.IAttributionRequest
    }
    gridDisplayModeEntity: {
        [layoutName: string]: fromModels.GridDisplayMode;
    }


    activeNodeIdEntity: {
        [layoutName: string]: number;
    }
    activeNodeCellWithMonthYearEntity: {
        [layoutName: string]: string;
    }



    layoutEntity: {
        [layoutName: string]: fromModels.layoutState;
    }
    layoutLoading: boolean;
    layoutLoaded: boolean;
    layoutError?: string;

    layoutSaving: boolean;
    layoutSaved: boolean;
    layoutSaveError?: string;

    layoutDeleting: boolean;
    layoutDeleted: boolean;
    layoutDeleteError?: string;

    commonGroupings: any[];
    commonGroupingsLoading: boolean;
    commongGroupingsLoaded: boolean;
    commonGroupingsError?: string;
}

const initialState: State = {

    activeLayout: 'Overview',
    readOnlyMode: false,
    layoutNames: ['Overview'],
    guidEntity: {},
    activeNodeIdEntity: {},
    activeNodeCellWithMonthYearEntity: {},

    attributionRequestEntity: {
        "Overview": _createDefaultAttributionRequest()
    },
    gridDisplayModeEntity: {
        "Overview": _createDefaultGridDisplayMode(),
    },

    layoutEntity: {
        "Overview": _createDefaultLayout('Overview')
    },
    layoutLoading: false,
    layoutLoaded: false,

    layoutSaving: false,
    layoutSaved: false,

    layoutDeleting: false,
    layoutDeleted: false,

    // commonGroupings: _createDefaultCommonGroupings(),
    commonGroupings: [],
    commonGroupingsLoading: false,
    commongGroupingsLoaded: false,

}

export function reducer(state = initialState, action: fromActions.PnlAttributionUiActions): State {

    switch (action.type) {

        case fromActions.PnlAttributionUiActionTypes.SET_ACTIVE_LAYOUT: {
            return {
                ...state,
                activeLayout: action.payload,
            }
        }

        case fromActions.PnlAttributionUiActionTypes.SET_GUID: {
            return {
                ...state,
                guidEntity: {
                    ...state.guidEntity,
                    [action.payload.layoutName]: action.payload.guid
                }
            }
        }

        case fromActions.PnlAttributionUiActionTypes.SET_READ_ONLY_MODE: {
            return {
                ...state,
                readOnlyMode: action.payload
            }
        }





        case fromActions.PnlAttributionUiActionTypes.SET_ACTIVE_NODE_ID_BY_LAYOUT: {
            return {
                ...state,
                activeNodeIdEntity: {
                    ...state.activeNodeIdEntity,
                    [action.payload.layoutName]: action.payload.activeNodeId
                }
            }
        }

        case fromActions.PnlAttributionUiActionTypes.SET_ACTIVE_NODE_CELL_WITH_MONTH_YEAR_BY_LAYOUT: {
            return {
                ...state,
                activeNodeCellWithMonthYearEntity: {
                    ...state.activeNodeCellWithMonthYearEntity,
                    [action.payload.layoutName]: action.payload.combineId
                }
            }
        }







        

        case fromActions.PnlAttributionUiActionTypes.SET_ATTRIBUTION_REQUEST: {
            return {
                ...state,
                attributionRequestEntity: {
                    ...state.attributionRequestEntity,
                    [action.payload.layoutName]: action.payload.request
                }
            }
        }

        case fromActions.PnlAttributionUiActionTypes.SET_GRID_DISPLAY_MODE: {
            return {
                ...state,
                gridDisplayModeEntity: {
                    ...state.gridDisplayModeEntity,
                    [action.payload.layoutName]: {
                        ...state.gridDisplayModeEntity[action.payload.layoutName],
                        ...action.payload.displayMode
                    }
                }
            }
        }



        // -------------------------------------------------------------------------

        case fromActions.PnlAttributionUiActionTypes.SET_INITIAL_SELECTED_LAYOUTS: {
            return {
                ...state,
                layoutNames: action.payload
            }
        }

        case fromActions.PnlAttributionUiActionTypes.ADD_SELECTED_LAYOUT: {
            return {
                ...state,
                layoutNames: [...state.layoutNames, action.payload],
                // activeLayout: action.payload
            };
        }

        case fromActions.PnlAttributionUiActionTypes.REMOVE_SELECTED_LAYOUT: {
            let layoutNamesData = [...state.layoutNames];
            const targetIndex = state.layoutNames.indexOf(action.payload);
            if (targetIndex > -1) {
                layoutNamesData.splice(targetIndex, 1);
            }

            return {
                ...state,
                layoutNames: layoutNamesData,
            };
        }

        case fromActions.PnlAttributionUiActionTypes.CHANGE_SELECTED_LAYOUT: {

            state.layoutNames[action.payload.targetIndex] = action.payload.targetLayout;

            return {
                ...state,
                layoutNames: [...state.layoutNames],
                // activeLayout: action.payload.targetLayout
            };
        }

        case fromActions.PnlAttributionUiActionTypes.CREATE_NEW_LAYOUT: {
            const newLayoutName = action.payload;

            return {
                ...state,
                attributionRequestEntity: {
                    ...state.attributionRequestEntity,
                    [newLayoutName]: _createDefaultAttributionRequest()
                },
                gridDisplayModeEntity: {
                    ...state.gridDisplayModeEntity,
                    [newLayoutName]: _createDefaultGridDisplayMode(),
                },
                layoutEntity: {
                    ...state.layoutEntity,
                    [newLayoutName]: _createDefaultLayout(newLayoutName)
                }

            }
        }

        // -------------------------------------------------------------------------

        case fromActions.PnlAttributionUiActionTypes.UPDATE_LAYOUT_GROUPING: {
            const targetLayout = action.payload.layoutName;
            const newGrouping = action.payload.grouping;

            return {
                ...state,
                layoutEntity: {
                    ...state.layoutEntity,
                    [targetLayout]: {
                        ...state.layoutEntity[targetLayout],
                        grouping: newGrouping
                    }
                }
            }
        }

        case fromActions.PnlAttributionUiActionTypes.SAVE_LAYOUT: {
            const targetLayout = action.payload.layoutName;
            const info = action.payload.info;

            return {
                ...state,
                layoutEntity: {
                    ...state.layoutEntity,
                    [targetLayout]: {
                        ...state.layoutEntity[targetLayout],
                        ...info
                    }
                }
            }
        }

        // ---------------------------------------------------------------------------

        case fromActions.PnlAttributionUiActionTypes.LOAD_LAYOUTS: {
            return {
                ...state,
                layoutLoading: true,
                layoutLoaded: false,
                layoutError: null,
            };
        }

        case fromActions.PnlAttributionUiActionTypes.LOAD_LAYOUTS_COMPLETE: {

            const layoutEntity: any = {...state.layoutEntity};
            // let selectedLayouts = [...state.selectedLayoutName];
            // let activeLayout = state.activeLayout;
            const attributionRequestEntity = {...state.attributionRequestEntity};
            const gridDisplayModeEntity = {...state.gridDisplayModeEntity};

            // if (action.payload.some(layoutObj => layoutObj.default === true)) {
            //     // if user has default layout remove overview layout
            //     delete layoutEntity['Overview'];
            //     selectedLayouts = selectedLayouts.filter(layoutName => layoutName !=='Overview');
            // }


            action.payload.forEach(layoutObj => {
                layoutEntity[layoutObj.layoutName] = layoutObj;
                attributionRequestEntity[layoutObj.layoutName] = _createDefaultAttributionRequest();

                if (layoutObj.gridDisplayMode) {
                    gridDisplayModeEntity[layoutObj.layoutName] = layoutObj.gridDisplayMode;
                } else {
                    gridDisplayModeEntity[layoutObj.layoutName] = _createDefaultGridDisplayMode();
                }
                

                // if (layoutObj.default) {
                //     selectedLayouts.push(layoutObj.layoutName);
                // }
            });
            // replace the active layout with the first default layout if it has any
            // if (selectedLayouts.length > 0 && selectedLayouts[0] !== 'Overview') {
            //     activeLayout = selectedLayouts[0];
            // } 

            return {
                ...state,
                layoutEntity: layoutEntity,
                layoutLoading: false,
                layoutLoaded: true,
                layoutError: null,

                // activeLayout: activeLayout,
                // selectedLayoutName: [...selectedLayouts],
                attributionRequestEntity: {...attributionRequestEntity},
                gridDisplayModeEntity: {...gridDisplayModeEntity},
            };
        }

        case fromActions.PnlAttributionUiActionTypes.LOAD_LAYOUTS_FAILED: {
            return {
                ...state,
                layoutLoading: false,
                layoutLoaded: false,
                layoutError: action.payload,
            };
        }






        case fromActions.PnlAttributionUiActionTypes.SAVE_LAYOUT_CLOUD: {
            return {
                ...state,
                layoutSaving: true,
                layoutSaved: false,
            }
        }

        case fromActions.PnlAttributionUiActionTypes.SAVE_LAYOUT_CLOUD_COMPLETE: {
            const updatedLayout: fromModels.layoutState = action.payload;
            return {
                ...state,
                layoutSaving: false,
                layoutSaved: true,
                layoutEntity: {
                    ...state.layoutEntity,
                    [updatedLayout.layoutName]: updatedLayout,
                }
            }
        }

        case fromActions.PnlAttributionUiActionTypes.SAVE_LAYOUT_CLOUD_FAILED: {
            return {
                ...state,
                layoutSaving: false,
                layoutSaved: false,
                layoutSaveError: action.payload
            }
        }







        case fromActions.PnlAttributionUiActionTypes.DELETE_LAYOUT: {


            return {
                ...state,

                layoutDeleting: true,
                layoutDeleted: false,
                layoutDeleteError: null,
            };
        }

        case fromActions.PnlAttributionUiActionTypes.DELETE_LAYOUT_COMPLETE: {

            const layoutEntity = state.layoutEntity;
            const targetLayout = action.payload;

            const selectedLayoutName_new = state.layoutNames.filter(layoutName => layoutName !== targetLayout);

            delete layoutEntity[targetLayout];

            return {
                ...state,
                layoutNames: selectedLayoutName_new,
                layoutEntity: {...layoutEntity},

                layoutDeleting: false,
                layoutDeleted: true,
                layoutDeleteError: null,
            };
        }

        case fromActions.PnlAttributionUiActionTypes.DELETE_LAYOUT_FAILED: {
            return {
                ...state,
                layoutDeleting: false,
                layoutDeleted: false,
                layoutDeleteError: action.payload,
            }
        }

        // ------------------------------------------------------------


        case fromActions.PnlAttributionUiActionTypes.LOAD_DEFAULT_GROUPINGS: {
            return {
                ...state,
                commonGroupingsLoading: true,
                commongGroupingsLoaded: false,
                commonGroupingsError: null,
            };
        }

        case fromActions.PnlAttributionUiActionTypes.LOAD_DEFAULT_GROUPINGS_COMPLETE: {
            return {
                ...state,
                commonGroupings: action.payload,
                commonGroupingsLoading: false,
                commongGroupingsLoaded: true,
                commonGroupingsError: null,
            };
        }

        case fromActions.PnlAttributionUiActionTypes.LOAD_DEFAULT_GROUPINGS_FAILED: {
            return {
                ...state,
                commonGroupingsLoading: false,
                commongGroupingsLoaded: false,
                commonGroupingsError: action.payload,
            };
        }
        

        // ------------------------------------------------------------





        

        default: {
            return state;
        }
    }
}

export const getActiveLayout = (state: State) => state.activeLayout;
export const getLayoutNames = (state: State) => state.layoutNames;
export const getGuidEntity = (state: State) => state.guidEntity;
export const getAttributionRequestEntity = (state: State) => state.attributionRequestEntity;
export const getGridDisplayModeEntity = (state: State) => state.gridDisplayModeEntity;
export const getActiveNodeIdEntity = (state: State) => state.activeNodeIdEntity;
export const getActiveNodeCellWithMonthYearEntity = (state: State) => state.activeNodeCellWithMonthYearEntity;
export const getReadOnlyMode = (state: State) => state.readOnlyMode;


export const getLayoutEntity = (state: State) => state.layoutEntity;
export const getLayoutLoadingStatus = (state: State) => state.layoutLoading;
export const getLayoutLoadedStatus = (state: State) => state.layoutLoaded;
export const getLayoutError = (state: State) => state.layoutError;

export const getLayoutSavingStatus = (state: State) => state.layoutSaving;
export const getLayoutSavedStatus = (state: State) => state.layoutSaved;
export const getLayoutSaveError = (state: State) => state.layoutSaveError;

export const getLayoutDeletingStatus = (state: State) => state.layoutDeleting;
export const getLayoutDeletedStatus = (state: State) => state.layoutDeleted;
export const getLayoutDeleteError = (state: State) => state.layoutDeleteError;

export const getCommonGroupings = (state: State) => state.commonGroupings;
export const getCommonGroupingsLoadingStatus = (state: State) => state.commonGroupingsLoading;
export const getCommonGroupingsLoadedStatus = (state: State) => state.commongGroupingsLoaded;
export const getCommonGroupingsError = (state: State) => state.commonGroupingsError;

function _createDefaultAttributionRequest (): fromModels.IAttributionRequest {
    return {
        startDate: new Date(new Date().getFullYear(), 0, 1), 
        endDate: new Date(),
        // grouping: 'Fund|Pod|TradeName|Position',
        includeShareClassFundsInFirmTotal: false,
        excludeFunding: true,
        reclassifyRepo: true,
        includeBetaAdjustment: true
    }
}

function _createDefaultGridDisplayMode(): fromModels.GridDisplayMode {
    return {
        "Id": false,
        "ParentId": false,
        "Level": false,
        "DisplayName": false,
        "SortOrder": false,
        'P/L($)': true,
        '% to Fund': false,
        '% to Cap': false,
        'Fund Cap (k)': false,
        'Cap (k)': false,
        'σ': false,
        'σ(%)': false,
        '% to Fund(qr)': false,
        'P/L($)(qr)': false,
        '% to Fund(yr)': false,
        'P/L($)(yr)': false,
    }
}

function _createDefaultLayout(newLayoutName) {
    return {
        name: newLayoutName, 
        grouping: ['FirmName', 'FundName', 'PodName', 'TradeName']
    }
}

// function _createDefaultCommonGroupings() {
//     return [
//         ['FirmName', 'FundName', 'PodName'],
//         ['FirmName', 'FundName', 'PodName', 'TradeName'],
//         ['FirmName', 'FundName', 'MacroTheme'],
//         ['FirmName', 'FundName', 'MacroTheme', 'TradeName'],
//         ['FirmName', 'FundName', 'MacroTheme', 'PodName', 'TradeName'],
//         ['FirmName', 'FundName', 'MacroTheme', 'TradeName', 'PodName'],

//         ['FirmName', 'FundName', 'ClientServicesThemeBreakdown'],
//         ['FirmName', 'FundName', 'ClientServicesThemeBreakdown', 'MacroTheme'],

//         ['FirmName', 'FundName', 'ClientServicesTradeTheme', 'CountryOfRisk', 'TenorBucket'],
//         ['FirmName', 'FundName', 'ClientServicesTradeTheme', 'MacroTheme', 'TradeName'],
        

//         ['FirmName', 'CrossFundName', 'CrossPodName','TradeName'],
//         ['FirmName', 'CrossFundName', 'CrossPodName', 'MacroTheme', 'TradeName'],
//         ['FirmName', 'CrossFundName', 'MacroTheme', 'TradeName'],

//         ['FirmName', 'CrossPodName','TradeName'],
//         ['FirmName', 'CrossPodName', 'MacroTheme', 'TradeName'],
//         ['FirmName', 'TradeGroup', 'TradeName']
//     ]
// }