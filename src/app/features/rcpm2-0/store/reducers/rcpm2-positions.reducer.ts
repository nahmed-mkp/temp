import * as fromActions from '../actions/rcpm-2-positions.actions';
import * as _ from 'lodash';

import * as fromModel from './../../models';


export interface State {

    // UI data --------------------------------------------------------
    activeDate: string;
    isOnCurrentDate: boolean;


    // public data -----------------------------------------------
    missingCloses: any;
    missingClosesLoading: boolean;
    missingClosesLoaded: boolean;
    missingClosesError?: string

    positionLookups: any;
    positionLookupsLoading: boolean;
    positionLookupsLoaded: boolean;
    positionLookupsError?: string;

    nonlinearSupportGrouping: any;
    nonlinearSupportGroupingLoading: boolean;
    nonlinearSupportGroupingLoaded: boolean;
    nonlinearSupportGroupingError?: string;

    positionPresetLayout: fromModel.PositionLayout;
    positionPresetLayoutLoading: boolean;
    positionPresetLayoutLoaded: boolean;
    positionPresetLayoutError?: string;

    positionDates: fromModel.PositionDatesResponse;
    positionDatesLoading: boolean;
    positionDatesLoaded: boolean;
    positionDatesError?: string;
    latestAvaliableDate: string;

    latestPositionDate: any;
    latestPositionDateLoading: boolean;
    latestPositionDateLoaded: boolean;
    latestPositionDateError?: string;
    positionDateLoadToggle: boolean;

    timeStamp: string;
    timeStampCollection: any;
    managers: string[];
    spinningActivate: boolean;
    // activeAsOfDate: string;
    // targetManager: string;

    userLayouts: any[];
    userLayoutStyle: any;

    dataSourcePermission: string[];
    dataSourcePermissionLoading: boolean;
    dataSourcePermissionLoaded: boolean;
    dataSourcePermissionError?: string;

    // ---------------------------------------------------------------

    rcpm20ExecutionsEntity: {
        [asOfDate: string]: {
            traders: string[];
            rcpm20Executions: any[];
            // rcpm20ExecutionsLoading: boolean;
            // rcpm20ExecutionsLoaded: boolean;
            // rcpm20ExecutionsError?: string;
        }
    };
    rcpm20ExecutionsLoadingEntity: {[asOfDate: string]: boolean};
    rcpm20ExecutionsLoadedEntity: {[asOfDate: string]: boolean};
    rcpm20ExecutionsErrorEntity: {[asOfDate: string]: boolean};

    rcpm20ExecutionsAdvanceEntity: {
        [layoutName: string]: {
            traders: string[];
            data: any[];
        }
    };
    rcpm20ExecutionsAdvanceLoadingEntity: {[layoutName: string]: boolean};
    rcpm20ExecutionsAdvanceLoadedEntity: {[layoutName: string]: boolean};
    rcpm20ExecutionsAdvanceErrorEntity: {[layoutName: string]: boolean};

    // Layout specific data ----------------------------

    activeLayout: string;
    selectedLayouts: string[];

    // rcpm20PositionsEntity: {
    //     [layoutName: string]: {
    //         // activeDate?: string;

    //         rcpm20Positions: any[];
    //         // rcpm20PositonsLoading: boolean;
    //         // rcpm20PositonsLoaded: boolean;
    //         // rcpm20PositonsError?: string;

    //         managers: string[]
    //     }
    // }
    rcpm20PositionsEntity: {[layoutName: string]: any[]};
    rcpm20PositionsLoadingEntity: {[layoutName: string]: boolean};
    rcpm20PositionsLoadedEntity: {[layoutName: string]: boolean};
    rcpm20PositionsErrorEntity: {[layoutName: string]: string};

    // rcpm20PositionsGroupingsEntity: {
    //     [layoutName: string]: {
    //         rcpm20PositionsGroupings: any[];
    //         // rcpm20PositionsGroupingsLoading: boolean;
    //         // rcpm20PositionsGroupingsLoaded: boolean;
    //         // rcpm20PositionsGroupingsError?: string;
    //     }
    // };
    rcpm20PositionsGroupingsEntity: {[layoutName: string]: any[]};
    rcpm20PositionsGroupingsLoadingEntity: {[layoutName: string]: boolean};
    rcpm20PositionsGroupingsLoadedEntity: {[layoutName: string]: boolean};
    rcpm20PositionsGroupingsErrorEntity: {[layoutName: string]: string};

    rcpm20PositionsGroupingCombineEntity: {[layoutName: string]: any[]};

    rcpm20NonlinearAggDataEntity: {
        [layoutName: string]: {
            nonlinearAggData: any;
            // nonlinearAggDataLoading: boolean;
            // nonlinearAggDataLoaded: boolean;
            // nonlinearAggDataError?: string;
        }
    };
    // rcpm20NonlinearAggDataEntity: {[layoutName: string]: any[]};
    rcpm20NonlinearAggDataLoadingEntity: {[layoutName: string]: boolean};
    rcpm20NonlinearAggDataLoadedEntity: {[layoutName: string]: boolean};
    rcpm20NonlinearAggDataErrorEntity: {[layoutName: string]: string};






    rcpm20NonlinearPnlDataEntity: {[layoutName: string]: any};
    rcpm20NonlinearPnlDataLoadingEntity: {[layoutName: string]: boolean};
    rcpm20NonlinearPnlDataLoadedEntity: {[layoutName: string]: boolean};
    rcpm20NonlinearPnlDataErrorEntity: {[layoutName: string]: string};


    primaryGroupingNameIdMapingEntity: {
        [layoutName: string]: {
            [groupingName: string]: any;
        }
    };


    positionInfoEntity: {[layoutName: string]: any};
    positionInfoLoadingEntity: {[layoutName: string]: boolean};
    positionInfoLoadedEntity: {[layoutName: string]: boolean};
    positionInfoErrorEntity: {[layoutName: string]: string};

}

const initialState: State = {

    missingCloses: [],
    missingClosesLoading: false,
    missingClosesLoaded: false,

    activeDate: undefined,
    isOnCurrentDate: null,
    // traders: [],
    // managers: [],

    positionLookups: {},
    positionLookupsLoading: false,
    positionLookupsLoaded: false,

    nonlinearSupportGrouping: null,
    nonlinearSupportGroupingLoading: false,
    nonlinearSupportGroupingLoaded: false,


    positionPresetLayout: null,
    positionPresetLayoutLoading: false,
    positionPresetLayoutLoaded: false,

    positionDates: null,
    positionDatesLoading: false,
    positionDatesLoaded: false,
    latestAvaliableDate: null,

    latestPositionDate: null,
    latestPositionDateLoading: false,
    latestPositionDateLoaded: false,
    positionDateLoadToggle: true,

    timeStamp: undefined,
    timeStampCollection: null,
    managers: [],
    spinningActivate: true,
    userLayouts: [],
    userLayoutStyle: null,

    dataSourcePermission: [],
    dataSourcePermissionLoading: false,
    dataSourcePermissionLoaded: false,

    // ------------------------------

    activeLayout: undefined,
    selectedLayouts: ['Overview'],

    rcpm20PositionsEntity: {},
    rcpm20PositionsLoadingEntity: {},
    rcpm20PositionsLoadedEntity: {},
    rcpm20PositionsErrorEntity: {},

    rcpm20PositionsGroupingsEntity: {},
    rcpm20PositionsGroupingsLoadingEntity: {},
    rcpm20PositionsGroupingsLoadedEntity: {},
    rcpm20PositionsGroupingsErrorEntity: {},

    rcpm20PositionsGroupingCombineEntity: {},

    rcpm20NonlinearAggDataEntity: {},
    rcpm20NonlinearAggDataLoadingEntity: {},
    rcpm20NonlinearAggDataLoadedEntity: {},
    rcpm20NonlinearAggDataErrorEntity: {},

    rcpm20NonlinearPnlDataEntity: {},
    rcpm20NonlinearPnlDataLoadingEntity: {},
    rcpm20NonlinearPnlDataLoadedEntity: {},
    rcpm20NonlinearPnlDataErrorEntity: {},

    rcpm20ExecutionsEntity: {},
    rcpm20ExecutionsLoadingEntity: {},
    rcpm20ExecutionsLoadedEntity: {},
    rcpm20ExecutionsErrorEntity: {},

    rcpm20ExecutionsAdvanceEntity: {},
    rcpm20ExecutionsAdvanceLoadingEntity: {},
    rcpm20ExecutionsAdvanceLoadedEntity: {},
    rcpm20ExecutionsAdvanceErrorEntity: {},

    primaryGroupingNameIdMapingEntity: {},

    positionInfoEntity: {},
    positionInfoLoadingEntity: {},
    positionInfoLoadedEntity: {},
    positionInfoErrorEntity: {}
};

export function reducer(state = initialState, action: fromActions.RCPM2PositionsActions): State {

    switch (action.type) {

        case fromActions.RCPM2PositionsActionTypes.SET_ACTIVE_DATE: {

            const isOnCurrentDate = (new Date(action.payload)).getTime() >= (new Date((new Date()).toDateString())).getTime();

            return {
                ...state,
                activeDate: action.payload,
                isOnCurrentDate: isOnCurrentDate,
            };
        }
        

        case fromActions.RCPM2PositionsActionTypes.LOAD_MISSING_CLOSES: {
            return {
                ...state,
                missingCloses: [],
                missingClosesLoading: true,
                missingClosesLoaded: false
            };
        }

        case fromActions.RCPM2PositionsActionTypes.LOAD_MISSING_CLOSES_COMPLETE: {
            return {
                ...state,
                missingCloses: action.payload,
                missingClosesLoading: false,
                missingClosesLoaded: true
            };
        }
        
        case fromActions.RCPM2PositionsActionTypes.LOAD_MISSING_CLOSES_FAILED: {
            return {
                ...state,
                missingClosesLoading: false,
                missingClosesLoaded: false,
                missingClosesError: action.err
            };
        }


        case fromActions.RCPM2PositionsActionTypes.ACTIVATE_SPINNING: {
            return {
                ...state,
                spinningActivate: action.payload
            };
        }

        case fromActions.RCPM2PositionsActionTypes.CLEAR_CACHE: {

            if (action.payload === 'position') {
                return {
                    ...state,
                    timeStamp: null,
                    timeStampCollection: null,
                    managers: [],

                    rcpm20PositionsEntity: {},
                    rcpm20PositionsLoadingEntity: {},
                    rcpm20PositionsLoadedEntity: {},
                    rcpm20PositionsErrorEntity: {},

                    rcpm20PositionsGroupingCombineEntity: {},
                };
            } else {
                return {
                    ...state,
                    timeStamp: null,
                    timeStampCollection: null,
                    managers: [],

                    rcpm20PositionsEntity: {},
                    rcpm20PositionsLoadingEntity: {},
                    rcpm20PositionsLoadedEntity: {},
                    rcpm20PositionsErrorEntity: {},

                    rcpm20PositionsGroupingsEntity: {},
                    rcpm20PositionsGroupingsLoadingEntity: {},
                    rcpm20PositionsGroupingsLoadedEntity: {},
                    rcpm20PositionsGroupingsErrorEntity: {},

                    rcpm20NonlinearAggDataEntity: {},
                    rcpm20NonlinearAggDataLoadingEntity: {},
                    rcpm20NonlinearAggDataLoadedEntity: {},
                    rcpm20NonlinearAggDataErrorEntity: {},

                    rcpm20NonlinearPnlDataEntity: {},
                    rcpm20NonlinearPnlDataLoadingEntity: {},
                    rcpm20NonlinearPnlDataLoadedEntity: {},
                    rcpm20NonlinearPnlDataErrorEntity: {},

                    rcpm20PositionsGroupingCombineEntity: {},
                    primaryGroupingNameIdMapingEntity: {}
                };
            }
        }

        case fromActions.RCPM2PositionsActionTypes.CLEAR_NONLINEAR_CACHE: {
            const targetLayout = action.payload;

            if (state.rcpm20NonlinearAggDataEntity[targetLayout]) {
                return {
                    ...state,
                    rcpm20NonlinearAggDataEntity: Object.assign({}, state.rcpm20NonlinearAggDataEntity, {[targetLayout]: null})
                };
            } else {
                return state;
            }
        }

        case fromActions.RCPM2PositionsActionTypes.CLEAR_NONLINEAR_PNL_CACHE: {
            const targetLayout = action.payload;

            if (state.rcpm20NonlinearPnlDataEntity[targetLayout]) {
                return {
                    ...state,
                    rcpm20NonlinearPnlDataEntity: Object.assign({}, state.rcpm20NonlinearPnlDataEntity, {[targetLayout]: null})
                };
            } else {
                return state;
            }
        }

        case fromActions.RCPM2PositionsActionTypes.UPDATE_LATEST_AVAILABLE_DATE: {
            const latest = Object.keys(action.payload)[0];
            return {
                ...state,
                positionDates: {
                    latest: latest,
                    portfolios: Object.assign({}, state.positionDates.portfolios, action.payload)
                }
            };
        }














        case fromActions.RCPM2PositionsActionTypes.LOAD_POSITIONS_LOOKUPS: {
            return {
                ...state,
                positionLookupsLoading: true,
                positionLookupsLoaded: false,
                positionLookupsError: null
            };
        }

        case fromActions.RCPM2PositionsActionTypes.LOAD_POSITIONS_LOOKUPS_COMPLETE: {
            return {
                ...state,
                positionLookups: action.payload,
                positionLookupsLoading: false,
                positionLookupsLoaded: true,
                positionLookupsError: null
            };
        }

        case fromActions.RCPM2PositionsActionTypes.LOAD_POSITIONS_LOOKUPS_FAILED: {
            return {
                ...state,
                positionLookupsLoading: false,
                positionLookupsLoaded: false,
                positionLookupsError: action.payload
            };
        }





        case fromActions.RCPM2PositionsActionTypes.LOAD_NONLINEAR_SUPPORT_GROUPINGS: {
            return {
                ...state,
                nonlinearSupportGroupingLoading: true,
                nonlinearSupportGroupingLoaded: false,
                nonlinearSupportGroupingError: null
            };
        }

        case fromActions.RCPM2PositionsActionTypes.LOAD_NONLINEAR_SUPPORT_GROUPINGS_COMPLETE: {
            return {
                ...state,
                nonlinearSupportGroupingLoading: false,
                nonlinearSupportGroupingLoaded: true,
                nonlinearSupportGrouping: action.payload,
                nonlinearSupportGroupingError: null,
            };
        }

        case fromActions.RCPM2PositionsActionTypes.LOAD_NONLINEAR_SUPPORT_GROUPINGS_FAILED: {
            return {
                ...state,
                nonlinearSupportGroupingLoading: false,
                nonlinearSupportGroupingLoaded: false,
                nonlinearSupportGroupingError: action.payload
            };
        }





        // case fromActions.RCPM2PositionsActionTypes.LOAD_NONLINEAR_SUPPORT_GROUPINGS: {
        //     return {
        //         ...state,
        //         nonlinearSupportGroupingLoading: true,
        //         nonlinearSupportGroupingLoaded: false,
        //         nonlinearSupportGroupingError: null
        //     };
        // }

        // case fromActions.RCPM2PositionsActionTypes.LOAD_NONLINEAR_SUPPORT_GROUPINGS_COMPLETE: {
        //     return {
        //         ...state,
        //         nonlinearSupportGroupingLoading: false,
        //         nonlinearSupportGroupingLoaded: true,
        //         nonlinearSupportGrouping: action.payload,
        //         nonlinearSupportGroupingError: null,
        //     };
        // }

        // case fromActions.RCPM2PositionsActionTypes.LOAD_NONLINEAR_SUPPORT_GROUPINGS_FAILED: {
        //     return {
        //         ...state,
        //         nonlinearSupportGroupingLoading: false,
        //         nonlinearSupportGroupingLoaded: false,
        //         nonlinearSupportGroupingError: action.payload
        //     };
        // }








        case fromActions.RCPM2PositionsActionTypes.LOAD_POSITIONS_PRESET_LAYOUT: {
            return {
                ...state,
                positionPresetLayoutLoading: true,
                positionPresetLayoutLoaded: false,
                positionPresetLayoutError: null
            };
        }

        case fromActions.RCPM2PositionsActionTypes.LOAD_POSITIONS_PRESET_LAYOUT_COMPLETE: {
            return {
                ...state,
                positionPresetLayout: action.payload,
                positionPresetLayoutLoading: false,
                positionPresetLayoutLoaded: true,
                positionPresetLayoutError: null
            };
        }

        case fromActions.RCPM2PositionsActionTypes.LOAD_POSITIONS_PRESET_LAYOUT_FAILED: {
            return {
                ...state,
                positionPresetLayoutLoading: false,
                positionPresetLayoutLoaded: false,
                positionPresetLayoutError: action.payload
            };
        }





        case fromActions.RCPM2PositionsActionTypes.LOAD_USER_CUSTOMIZED_LAYOUT: {
            if (localStorage.getItem('socketcluster.authToken')) {
                localStorage.removeItem('socketcluster.authToken');
            }
            const userLayouts = Object.keys(localStorage)
                .map(key => JSON.parse(localStorage[key]))
                .filter(storeInfo => storeInfo.layoutName !== undefined);

            userLayouts.forEach(layout => {
                if (layout.isShared === undefined) {
                    layout.isShared = false;
                }
            });
            let defaultLayouts = userLayouts.filter(layout => layout.default).map(layout => layout.layoutName);
            defaultLayouts = defaultLayouts.filter(layout => state.selectedLayouts.indexOf(layout) === -1);

            return {
                ...state,
                userLayouts: userLayouts,
                selectedLayouts: [...state.selectedLayouts, ...defaultLayouts]
            };
        }

        case fromActions.RCPM2PositionsActionTypes.UPDATE_USER_CUSTOMIZED_LAYOUT: {
            if (localStorage.getItem('socketcluster.authToken')) {
                localStorage.removeItem('socketcluster.authToken');
            }
            const userLayouts = Object.keys(localStorage)
                .map(key => JSON.parse(localStorage[key]))
                .filter(storeInfo => storeInfo.layoutName !== undefined);

            userLayouts.forEach(layout => {
                if (layout.isShared === undefined) {
                    layout.isShared = false;
                }
            });

            return {
                ...state,
                userLayouts: userLayouts,
            };
        }

        case fromActions.RCPM2PositionsActionTypes.LOAD_USER_CUSTOMIZED_LAYOUT_STYLE: {
            const userLayoutStyle = JSON.parse(localStorage.getItem('style'));


            return {
                ...state,
                userLayoutStyle: userLayoutStyle || null,
            };
        }








        case fromActions.RCPM2PositionsActionTypes.LOAD_POSITION_DATES: {
            return {
                ...state,
                positionDatesLoading: true,
                positionDatesLoaded: false,
                positionDatesError: null,
            };
        }


        case fromActions.RCPM2PositionsActionTypes.LOAD_POSITION_DATES_COMPLETE: {
            return {
                ...state,
                positionDates: action.payload,
                positionDatesLoading: true,
                positionDatesLoaded: false,
                positionDatesError: null,
                latestAvaliableDate: action.payload.portfolios[action.payload.latest].date,
                activeDate: action.payload.portfolios[action.payload.latest].date,
            };
        }

        case fromActions.RCPM2PositionsActionTypes.LOAD_POSITION_DATES_FAILED: {
            return {
                ...state,
                positionDatesLoading: false,
                positionDatesLoaded: false,
                positionDatesError: action.payload,
            };
        }







        case fromActions.RCPM2PositionsActionTypes.LOAD_LATEST_POSITION_DATE: {
            return {
                ...state,
                latestPositionDateLoading: true,
                latestPositionDateLoaded: false,
                latestPositionDateError: null,
            };
        }


        case fromActions.RCPM2PositionsActionTypes.LOAD_LATEST_POSITION_DATE_COMPLETE: {
            return {
                ...state,
                latestPositionDate: action.payload,
                latestPositionDateLoading: true,
                latestPositionDateLoaded: false,
                latestPositionDateError: null,
            };
        }

        case fromActions.RCPM2PositionsActionTypes.LOAD_LATEST_POSITION_DATE_FAILED: {
            return {
                ...state,
                latestPositionDateLoading: false,
                latestPositionDateLoaded: false,
                latestPositionDateError: action.payload,
            };
        }

        case fromActions.RCPM2PositionsActionTypes.TOGGLE_LOAD_LATEST_POSITION_DATE: {
            return {
                ...state,
                positionDateLoadToggle: action.payload
            };
        }









        case fromActions.RCPM2PositionsActionTypes.LOAD_DATA_SOURCE_PERMISSION: {
            return {
                ...state,
                dataSourcePermissionLoading: true,
                dataSourcePermissionLoaded: false,
                dataSourcePermissionError: null
            };
        }

        case fromActions.RCPM2PositionsActionTypes.LOAD_DATA_SOURCE_PERMISSION_COMPLETE: {
            return {
                ...state,
                dataSourcePermission: action.payload,
                dataSourcePermissionLoading: false,
                dataSourcePermissionLoaded: true,
                dataSourcePermissionError: null
            };
        }

        case fromActions.RCPM2PositionsActionTypes.LOAD_DATA_SOURCE_PERMISSION_FAILED: {
            return {
                ...state,
                dataSourcePermissionLoading: false,
                dataSourcePermissionLoaded: false,
                dataSourcePermissionError: action.payload
            };
        }







        // Layout specific data set ----------------------------------------------------------------------------------------------

        // case fromActions.RCPM2PositionsActionTypes.ADD_SELECTED_LAYOUT: {
        //     return {
        //         ...state,
        //         selectedLayouts: [...state.selectedLayouts, action.payload]
        //     };
        // }

        // case fromActions.RCPM2PositionsActionTypes.REMOVE_SELECTED_LAYOUT: {

        //     const targetIndex = state.selectedLayouts.indexOf(action.payload);
        //     if (targetIndex > -1) {
        //         state.selectedLayouts.splice(targetIndex, 1);
        //     }

        //     return {
        //         ...state,
        //         selectedLayouts: [...state.selectedLayouts],
        //     };
        // }

        case fromActions.RCPM2PositionsActionTypes.REMOVE_SELECTED_LAYOUT_MEMORY: {

            // Clean all the state info of the deleted layout
            const targetLayout = action.payload;
            const {[targetLayout]: positionInfoEntity_removeValue, ...positionInfoEntity} = state.positionInfoEntity;
            const {[targetLayout]: positionInfoLoadedEntity_removeValue, ...positionInfoLoadedEntity} = state.positionInfoLoadedEntity;
            const {[targetLayout]: positionInfoLoadingEntity_removeValue, ...positionInfoLoadingEntity} = state.positionInfoLoadingEntity;
            const {[targetLayout]: positionInfoErrorEntity_removeValue, ...positionInfoErrorEntity} = state.positionInfoErrorEntity;

            const {[targetLayout]: rcpm20PositionsEntity_removeValue, ...rcpm20PositionsEntity} = state.rcpm20PositionsEntity;
            const {[targetLayout]: rcpm20PositionsLoadingEntity_removeValue, ...rcpm20PositionsLoadingEntity} = state.rcpm20PositionsLoadingEntity;
            const {[targetLayout]: rcpm20PositionsLoadedEntity_removeValue, ...rcpm20PositionsLoadedEntity} = state.rcpm20PositionsLoadedEntity;
            const {[targetLayout]: rcpm20PositionsErrorEntity_removeValue, ...rcpm20PositionsErrorEntity} = state.rcpm20PositionsErrorEntity;

            const {[targetLayout]: rcpm20PositionsGroupingsEntity_removeValue, ...rcpm20PositionsGroupingsEntity} = state.rcpm20PositionsGroupingsEntity;
            const {[targetLayout]: rcpm20PositionsGroupingsLoadingEntity_removeValue, ...rcpm20PositionsGroupingsLoadingEntity} = state.rcpm20PositionsGroupingsLoadingEntity;
            const {[targetLayout]: rcpm20PositionsGroupingsLoadedEntity_removeValue, ...rcpm20PositionsGroupingsLoadedEntity} = state.rcpm20PositionsGroupingsLoadedEntity;
            const {[targetLayout]: rcpm20PositionsGroupingsErrorEntity_removeValue, ...rcpm20PositionsGroupingsErrorEntity} = state.rcpm20PositionsGroupingsErrorEntity;

            const {[targetLayout]: rcpm20PositionsGroupingCombineEntity_removeValue, ...rcpm20PositionsGroupingCombineEntity} = state.rcpm20PositionsGroupingCombineEntity;

            const {[targetLayout]: rcpm20NonlinearAggDataEntity_removeValue, ...rcpm20NonlinearAggDataEntity} = state.rcpm20NonlinearAggDataEntity;
            const {[targetLayout]: rcpm20NonlinearAggDataLoadingEntity_removeValue, ...rcpm20NonlinearAggDataLoadingEntity} = state.rcpm20NonlinearAggDataLoadingEntity;
            const {[targetLayout]: rcpm20NonlinearAggDataLoadedEntity_removeValue, ...rcpm20NonlinearAggDataLoadedEntity} = state.rcpm20NonlinearAggDataLoadedEntity;
            const {[targetLayout]: rcpm20NonlinearAggDataErrorEntity_removeValue, ...rcpm20NonlinearAggDataErrorEntity} = state.rcpm20NonlinearAggDataErrorEntity;

            const {[targetLayout]: primaryGroupingNameIdMapingEntity_removeValue, ...primaryGroupingNameIdMapingEntity} = state.primaryGroupingNameIdMapingEntity;

            return {
                ...state,

                rcpm20PositionsEntity: Object.assign({}, rcpm20PositionsEntity),
                rcpm20PositionsLoadingEntity: Object.assign({}, rcpm20PositionsLoadingEntity),
                rcpm20PositionsLoadedEntity: Object.assign({}, rcpm20PositionsLoadedEntity),
                rcpm20PositionsErrorEntity: Object.assign({}, rcpm20PositionsErrorEntity),

                rcpm20PositionsGroupingsEntity: Object.assign({}, rcpm20PositionsGroupingsEntity),
                rcpm20PositionsGroupingsLoadingEntity: Object.assign({}, rcpm20PositionsGroupingsLoadingEntity),
                rcpm20PositionsGroupingsLoadedEntity: Object.assign({}, rcpm20PositionsGroupingsLoadedEntity),
                rcpm20PositionsGroupingsErrorEntity: Object.assign({}, rcpm20PositionsGroupingsErrorEntity),

                rcpm20PositionsGroupingCombineEntity: Object.assign({}, rcpm20PositionsGroupingCombineEntity),

                rcpm20NonlinearAggDataEntity: Object.assign({}, rcpm20NonlinearAggDataEntity),
                rcpm20NonlinearAggDataLoadingEntity: Object.assign({}, rcpm20NonlinearAggDataLoadingEntity),
                rcpm20NonlinearAggDataLoadedEntity: Object.assign({}, rcpm20NonlinearAggDataLoadedEntity),
                rcpm20NonlinearAggDataErrorEntity: Object.assign({}, rcpm20NonlinearAggDataErrorEntity),

                primaryGroupingNameIdMapingEntity: Object.assign({}, primaryGroupingNameIdMapingEntity),

                positionInfoEntity: Object.assign({}, positionInfoEntity),
                positionInfoLoadedEntity: Object.assign({}, positionInfoLoadedEntity),
                positionInfoLoadingEntity: Object.assign({}, positionInfoLoadingEntity),
                positionInfoErrorEntity: Object.assign({}, positionInfoErrorEntity),
            };
        }

        // case fromActions.RCPM2PositionsActionTypes.CHANGE_SELECTED_LAYOUT: {

        //     state.selectedLayouts[action.payload.targetIndex] = action.payload.targetLayout;

        //     return {
        //         ...state,
        //         selectedLayouts: [...state.selectedLayouts]
        //     };
        // }







        case fromActions.RCPM2PositionsActionTypes.LOAD_POSITIONS: {
            return {
                ...state,
                // activeDate: action.payload,

                // rcpm20PositionsEntity: {
                //     ...state.rcpm20PositionsEntity,
                //     [action.payload.layout]: {
                //         // activeDate: action.payload.asOfDate,
                //         rcpm20Positions: state.rcpm20PositionsEntity[action.payload.layout] ? state.rcpm20PositionsEntity[action.payload.layout].rcpm20Positions : [],
                //         rcpm20PositonsLoading: true,
                //         rcpm20PositonsLoaded: false,
                //         rcpm20PositonsError: null,
                //         managers: state.rcpm20PositionsEntity[action.payload.layout] ? state.rcpm20PositionsEntity[action.payload.layout].managers : []
                //     }
                // },
                // rcpm20PositonsLoading: true,
                // rcpm20PositonsLoaded: false,
                // rcpm20PositonsError: null,
                // managers: [],
                rcpm20PositionsLoadingEntity: Object.assign({}, state.rcpm20PositionsLoadingEntity, {[action.payload.layout]: true}),
                rcpm20PositionsLoadedEntity: Object.assign({}, state.rcpm20PositionsLoadedEntity, {[action.payload.layout]: false}),
                rcpm20PositionsErrorEntity: Object.assign({}, state.rcpm20PositionsErrorEntity, {[action.payload.layout]: null}),
            };
        }

        case fromActions.RCPM2PositionsActionTypes.LOAD_POSITIONS_COMPLETE: {
            let managers; let maxLastUpdate; let maxLastUpdatePrice; let finalMaxDate;

            if (action.payload && action.payload.data.length > 0) {
                managers = _.uniqBy(action.payload.data, 'pm').map(item => item.pm);

                const tempArray = [...action.payload.data];
                tempArray.sort((a, b) => (new Date(b.LastUpdated)).getTime() - (new Date(a.LastUpdated)).getTime());
                maxLastUpdate = tempArray[0].LastUpdated;

                tempArray.sort((a, b) => (new Date(b.LastUpdatePrice)).getTime() - (new Date(a.LastUpdatePrice)).getTime());
                maxLastUpdatePrice = tempArray[0].LastUpdatePrice;

                if ((new Date(maxLastUpdatePrice)).getTime() > (new Date(maxLastUpdate)).getTime()) {
                    finalMaxDate = new Date(maxLastUpdatePrice);
                } else {
                    finalMaxDate = new Date(maxLastUpdate);
                }
                // console.log('Price: ', maxLastUpdatePrice, 'Position: ', maxLastUpdate)
            }

            const primaryGroupingNameIdMaping: any = {
                fundName: {},
                // fundName: {'Macro': 2, 'Enhanced: 4}
                podName: {},
                // pod: {'Alpha Port': 12, 'Macro': 15}
                tradeName: {},
                // securityName: {},
            };
            action.payload.data.forEach(item => {
                item.Id = '' + item.fundID + '|' + item.podID + '|' + item.tid + '|' + item.sid;

                if (primaryGroupingNameIdMaping.fundName[item.fundName] === undefined) {
                    primaryGroupingNameIdMaping.fundName[item.fundName] = item.fundID;
                }

                if (primaryGroupingNameIdMaping.podName[item.podName] === undefined) {
                    primaryGroupingNameIdMaping.podName[item.podName] = item.podID;
                }

                if (primaryGroupingNameIdMaping.tradeName[item.tradeName] === undefined) {
                    primaryGroupingNameIdMaping.tradeName[item.tradeName] = [item.tid];
                } else if (primaryGroupingNameIdMaping.tradeName[item.tradeName].indexOf(item.tid) === -1) {
                    primaryGroupingNameIdMaping.tradeName[item.tradeName].push(item.tid);
                }

                // if (primaryGroupingNameIdMaping.securityName[item.securityName] === undefined) {
                //     primaryGroupingNameIdMaping.securityName[item.securityName] = item.sid;
                // }
            });
            // action.payload.forEach(item => item.Id = '' + item.fundID + item.podID + item.tid + item.sid);

            const combineData = combinePositionAndGroupingData(action.payload.data, state.rcpm20PositionsGroupingsEntity[action.payload.layout]);
            // combineData.forEach(item => {
            //     if (item['Firm'] === undefined) {
            //         console.log('missing Firm', item['sid']);
            //         // item['Firm'] = 'MKP';
            //         // item['FirmId'] = '1'
            //     }
            // })

            return {
                ...state,
                // rcpm20PositionsEntity: {
                //     ...state.rcpm20PositionsEntity,
                //     [action.payload.layout]: {
                //         // rcpm20PositonsLoading: false,
                //         // rcpm20PositonsLoaded: true,
                //         // rcpm20PositonsError: null,
                //         rcpm20Positions: action.payload.data,
                //         managers: managers
                //     }
                // },
                rcpm20PositionsEntity: Object.assign({}, state.rcpm20PositionsEntity, {[action.payload.layout]: action.payload.data}),
                rcpm20PositionsGroupingCombineEntity: Object.assign({}, state.rcpm20PositionsGroupingCombineEntity, {[action.payload.layout]: combineData}),

                primaryGroupingNameIdMapingEntity: {
                    ...state.primaryGroupingNameIdMapingEntity,
                    [action.payload.layout]: Object.assign({}, state.primaryGroupingNameIdMapingEntity[action.payload.layout], primaryGroupingNameIdMaping)
                },

                managers: managers,
                // timeStamp: finalMaxDate && finalMaxDate.toLocaleString(),
                // timeStampCollection: `Position ${maxLastUpdate.toLocaleString()}    |      Price: ${maxLastUpdatePrice.toLocaleString()}`,

                // spinningActivate: (state.rcpm20PositionsGroupingsLoading && state.spinningActivate === true) ? true : false,
                // primaryGroupingNameIdMaping: Object.assign({}, state.primaryGroupingNameIdMaping, primaryGroupingNameIdMaping)

                rcpm20PositionsLoadingEntity: Object.assign({}, state.rcpm20PositionsLoadingEntity, {[action.payload.layout]: false}),
                rcpm20PositionsLoadedEntity: Object.assign({}, state.rcpm20PositionsLoadedEntity, {[action.payload.layout]: true}),
                rcpm20PositionsErrorEntity: Object.assign({}, state.rcpm20PositionsErrorEntity, {[action.payload.layout]: null}),
            };
        }

        case fromActions.RCPM2PositionsActionTypes.LOAD_POSITIONS_FAILED: {
            return {
                ...state,
                // rcpm20PositonsLoading: false,
                // rcpm20PositonsLoaded: false,
                // rcpm20PositonsError: action.payload,
                // rcpm20Positions: []

                // rcpm20PositionsEntity: {
                //     ...state.rcpm20PositionsEntity,
                //     [action.payload.layout]: {
                //         ...state.rcpm20PositionsEntity[action.payload.layout],
                //         rcpm20PositonsLoading: false,
                //         rcpm20PositonsLoaded: false,
                //         rcpm20PositonsError: action.payload.error,
                //     }
                // },

                rcpm20PositionsLoadingEntity: Object.assign({}, state.rcpm20PositionsLoadingEntity, {[action.payload.layout]: false}),
                rcpm20PositionsLoadedEntity: Object.assign({}, state.rcpm20PositionsLoadedEntity, {[action.payload.layout]: false}),
                rcpm20PositionsErrorEntity: Object.assign({}, state.rcpm20PositionsErrorEntity, {[action.payload.layout]: action.payload.error}),
            };
        }

        case fromActions.RCPM2PositionsActionTypes.UPDATE_LATEST_TIMESTAMP: {
            return {
                ...state,
                timeStamp: action.payload.latestTs,
                timeStampCollection:  `Position ${action.payload.latestPositionTs.toLocaleString()}    |      Price: ${action.payload.latestPricingTs.toLocaleString()}`,
            };
        }












        case fromActions.RCPM2PositionsActionTypes.LOAD_POSITIONS_GROUPINGS: {
            // return {
            //     ...state,
            //     rcpm20PositionsGroupingsLoading: true,
            //     rcpm20PositionsGroupingsLoaded: false,
            //     rcpm20PositionsGroupingsError: null,
            // };

            return {
                ...state,
                // rcpm20PositionsGroupingsEntity: {
                //     ...state.rcpm20PositionsGroupingsEntity,
                //     [action.payload.layout]: {
                //         rcpm20PositionsGroupings: state.rcpm20PositionsGroupingsEntity[action.payload.layout] ? state.rcpm20PositionsGroupingsEntity[action.payload.layout].rcpm20PositionsGroupings : [],
                //         rcpm20PositionsGroupingsLoading: true,
                //         rcpm20PositionsGroupingsLoaded: false,
                //         rcpm20PositionsGroupingsError: null,
                //     }
                // },
                rcpm20PositionsGroupingsLoadingEntity: Object.assign({}, state.rcpm20PositionsGroupingsLoadingEntity, {[action.payload.layout]: true}),
                rcpm20PositionsGroupingsLoadedEntity: Object.assign({}, state.rcpm20PositionsGroupingsLoadedEntity, {[action.payload.layout]: false}),
                rcpm20PositionsGroupingsErrorEntity: Object.assign({}, state.rcpm20PositionsGroupingsErrorEntity, {[action.payload.layout]: null}),
            };
        }

        case fromActions.RCPM2PositionsActionTypes.LOAD_POSITIONS_GROUPINGS_COMPLETE: {

            const primaryGroupingNameIdMaping: any = {
                CrossPodName: {},
                TradeGroup: {},
                TradeNameWithID: {},
                CrossFund: {},
                PortfolioBreakout: {},
                ExposureCurrency: {},
                ClientServicesTradeTheme: {},
                SecurityName: {},
                MacroTheme: {},
                ClientServicesThemeBreakdown: {},
                CountryOfRisk: {},
                SecurityNameExcludingCP: {},
            };


            action.payload.data.forEach(item => {
                item.Id = '' + item.FundID + '|' + item.PodID + '|' + item.TID + '|' + item.SID;

                if (primaryGroupingNameIdMaping.CrossPodName[item.CrossPodName] === undefined) {
                    primaryGroupingNameIdMaping.CrossPodName[item.CrossPodName] = item.CrossPodID;
                }

                if (primaryGroupingNameIdMaping.TradeGroup[item.TradeGroup] === undefined) {
                    primaryGroupingNameIdMaping.TradeGroup[item.TradeGroup] = item.TGID;
                }

                if (primaryGroupingNameIdMaping.TradeNameWithID[item.TradeNameWithID] === undefined) {
                    primaryGroupingNameIdMaping.TradeNameWithID[item.TradeNameWithID] = item.TID;
                }

                if (primaryGroupingNameIdMaping.CrossFund[item.CrossFund] === undefined) {
                    primaryGroupingNameIdMaping.CrossFund[item.CrossFund] = item.CrossFundID;
                }

                if (primaryGroupingNameIdMaping.PortfolioBreakout[item.PortfolioBreakout] === undefined) {
                    primaryGroupingNameIdMaping.PortfolioBreakout[item.PortfolioBreakout] = item.PortfolioBreakoutId;
                }

                if (primaryGroupingNameIdMaping.ExposureCurrency[item.ExposureCurrency] === undefined) {
                    primaryGroupingNameIdMaping.ExposureCurrency[item.ExposureCurrency] = item.ExposureCurrencyId;
                }

                if (primaryGroupingNameIdMaping.SecurityName[item.SecurityName] === undefined) {
                    primaryGroupingNameIdMaping.SecurityName[item.SecurityName] = item.SecurityNameId;
                }

                if (primaryGroupingNameIdMaping.MacroTheme[item.MacroTheme] === undefined) {
                    primaryGroupingNameIdMaping.MacroTheme[item.MacroTheme] = item.MTID;
                }
                
                if (primaryGroupingNameIdMaping.ClientServicesThemeBreakdown[item.ClientServicesThemeBreakdown] === undefined) {
                    primaryGroupingNameIdMaping.ClientServicesThemeBreakdown[item.ClientServicesThemeBreakdown] = item.CSTBID;
                }

                if (primaryGroupingNameIdMaping.ClientServicesTradeTheme[item.ClientServicesTradeTheme] === undefined) {
                    primaryGroupingNameIdMaping.ClientServicesTradeTheme[item.ClientServicesTradeTheme] = item.CSTTID;
                }

                if (primaryGroupingNameIdMaping.CountryOfRisk[item.CountryOfRisk] === undefined) {
                    primaryGroupingNameIdMaping.CountryOfRisk[item.CountryOfRisk] = item.CountryOfRiskId;
                }

                if (primaryGroupingNameIdMaping.SecurityNameExcludingCP[item.SecurityNameExcludingCP] === undefined) {
                    primaryGroupingNameIdMaping.SecurityNameExcludingCP[item.SecurityNameExcludingCP] = item.SGID;
                }
            });

            const combineData = combinePositionAndGroupingData(state.rcpm20PositionsEntity[action.payload.layout], action.payload.data);

            // return {
            //     ...state,
            //     rcpm20PositionsGroupings: action.payload,
            //     rcpm20PositionsGroupingsLoading: false,
            //     rcpm20PositionsGroupingsLoaded: true,
            //     rcpm20PositionsGroupingsError: null,
            //     spinningActivate: (state.rcpm20PositonsLoading  && state.spinningActivate === true) ? true : false,

            //     primaryGroupingNameIdMaping: Object.assign({}, state.primaryGroupingNameIdMaping, primaryGroupingNameIdMaping)
            // };

            return {
                ...state,
                // rcpm20PositionsGroupingsEntity: {
                //     ...state.rcpm20PositionsGroupingsEntity,
                //     [action.payload.layout]: {
                //         // rcpm20PositionsGroupingsLoading: false,
                //         // rcpm20PositionsGroupingsLoaded: true,
                //         // rcpm20PositionsGroupingsError: null,
                //         rcpm20PositionsGroupings: action.payload.data,
                //     }
                // },
                rcpm20PositionsGroupingsEntity: Object.assign({}, state.rcpm20PositionsGroupingsEntity,  {[action.payload.layout]: action.payload.data}),
                rcpm20PositionsGroupingCombineEntity: Object.assign({}, state.rcpm20PositionsGroupingCombineEntity, {[action.payload.layout]: combineData}),

                primaryGroupingNameIdMapingEntity: {
                    ...state.primaryGroupingNameIdMapingEntity,
                    [action.payload.layout]: Object.assign({}, state.primaryGroupingNameIdMapingEntity[action.payload.layout], primaryGroupingNameIdMaping)
                },

                rcpm20PositionsGroupingsLoadingEntity: Object.assign({}, state.rcpm20PositionsGroupingsLoadingEntity, {[action.payload.layout]: false}),
                rcpm20PositionsGroupingsLoadedEntity: Object.assign({}, state.rcpm20PositionsGroupingsLoadedEntity, {[action.payload.layout]: true}),
                rcpm20PositionsGroupingsErrorEntity: Object.assign({}, state.rcpm20PositionsGroupingsErrorEntity,  {[action.payload.layout]: null}),
            };
        }

        case fromActions.RCPM2PositionsActionTypes.LOAD_POSITIONS_GROUPINGS_FAILED: {
            // return {
            //     ...state,
            //     rcpm20PositionsGroupingsLoading: false,
            //     rcpm20PositionsGroupingsLoaded: false,
            //     rcpm20PositionsGroupingsError: action.payload,
            //     rcpm20PositionsGroupings: []
            // };

            return {
                ...state,
                // rcpm20PositionsGroupingsEntity: {
                //     ...state.rcpm20PositionsGroupingsEntity,
                //     [action.payload.layout]: {
                //         ...state.rcpm20PositionsGroupingsEntity[action.payload.layout],
                //         rcpm20PositionsGroupingsLoading: false,
                //         rcpm20PositionsGroupingsLoaded: false,
                //         rcpm20PositionsGroupingsError: action.payload.error,
                //     }
                // },
                rcpm20PositionsGroupingsLoadingEntity: Object.assign({}, state.rcpm20PositionsGroupingsLoadingEntity, {[action.payload.layout]: false}),
                rcpm20PositionsGroupingsLoadedEntity: Object.assign({}, state.rcpm20PositionsGroupingsLoadedEntity, {[action.payload.layout]: false}),
                rcpm20PositionsGroupingsErrorEntity: Object.assign({}, state.rcpm20PositionsGroupingsErrorEntity,  {[action.payload.layout]: action.payload.error}),
            };
        }









        case fromActions.RCPM2PositionsActionTypes.LOAD_EXECUTIONS: {
            // return {
            //     ...state,
            //     activeDate: action.payload,
            //     rcpm20ExecutionsLoading: true,
            //     rcpm20ExecutionsLoaded: false,
            //     rcpm20ExecutionsError: null,
            //     traders: [],
            // };

            return {
                ...state,
                // rcpm20ExecutionsEntity: {
                //     ...state.rcpm20ExecutionsEntity,
                //     [action.payload]: {
                //         rcpm20Executions: state.rcpm20ExecutionsEntity[action.payload] ? state.rcpm20ExecutionsEntity[action.payload].rcpm20Executions : [],
                //         rcpm20ExecutionsLoading: true,
                //         rcpm20ExecutionsLoaded: false,
                //         rcpm20ExecutionsError: null,
                //         traders: state.rcpm20ExecutionsEntity[action.payload] ? state.rcpm20ExecutionsEntity[action.payload].traders : [],
                //     }
                // },

                rcpm20ExecutionsLoadingEntity: Object.assign({}, state.rcpm20ExecutionsLoadingEntity, {[action.payload.date]: true}),
                rcpm20ExecutionsLoadedEntity: Object.assign({}, state.rcpm20ExecutionsLoadedEntity, {[action.payload.date]: false}),
                rcpm20ExecutionsErrorEntity: Object.assign({}, state.rcpm20ExecutionsErrorEntity,  {[action.payload.date]: null}),
            };
        }

        case fromActions.RCPM2PositionsActionTypes.LOAD_EXECUTIONS_COMPLETE: {

            let tradersName;
            if (action.payload && action.payload.data.length > 0) {
                tradersName = _.uniqBy(action.payload.data, 'trader').map(item => item.trader);
            }

            // return {
            //     ...state,
            //     rcpm20ExecutionsLoading: false,
            //     rcpm20ExecutionsLoaded: true,
            //     rcpm20ExecutionsError: null,
            //     rcpm20Executions: action.payload,
            //     traders: tradersName
            // };

            return {
                ...state,
                rcpm20ExecutionsEntity: {
                    ...state.rcpm20ExecutionsEntity,
                    [action.payload.asOfDate]: {
                        // rcpm20ExecutionsLoading: false,
                        // rcpm20ExecutionsLoaded: true,
                        // rcpm20ExecutionsError: null,
                        rcpm20Executions: action.payload.data,
                        traders: tradersName
                    }
                },
                rcpm20ExecutionsLoadingEntity: Object.assign({}, state.rcpm20ExecutionsLoadingEntity, {[action.payload.asOfDate]: false}),
                rcpm20ExecutionsLoadedEntity: Object.assign({}, state.rcpm20ExecutionsLoadedEntity, {[action.payload.asOfDate]: true}),
                rcpm20ExecutionsErrorEntity: Object.assign({}, state.rcpm20ExecutionsErrorEntity,  {[action.payload.asOfDate]: null}),
            };
        }

        case fromActions.RCPM2PositionsActionTypes.LOAD_EXECUTIONS_FAILED: {
            // return {
            //     ...state,
            //     rcpm20ExecutionsLoaded: false,
            //     rcpm20ExecutionsLoading: false,
            //     rcpm20ExecutionsError: action.payload,
            //     traders: [],
            // };

            return {
                ...state,
                // rcpm20ExecutionsEntity: {
                //     ...state.rcpm20ExecutionsEntity,
                //     [action.payload.asOfDate] : {
                //         ...state.rcpm20ExecutionsEntity[action.payload.asOfDate],
                //         rcpm20ExecutionsLoading: false,
                //         rcpm20ExecutionsLoaded: false,
                //         rcpm20ExecutionsError: action.payload.error
                //     }
                // },
                rcpm20ExecutionsLoadingEntity: Object.assign({}, state.rcpm20ExecutionsLoadingEntity, {[action.payload.asOfDate]: false}),
                rcpm20ExecutionsLoadedEntity: Object.assign({}, state.rcpm20ExecutionsLoadedEntity, {[action.payload.asOfDate]: false}),
                rcpm20ExecutionsErrorEntity: Object.assign({}, state.rcpm20ExecutionsErrorEntity,  {[action.payload.asOfDate]: action.payload.error}),
            };
        }





        case fromActions.RCPM2PositionsActionTypes.LOAD_EXECUTIONS_ADVANCE: {
            return {
                ...state,
                rcpm20ExecutionsAdvanceLoadingEntity: Object.assign({}, state.rcpm20ExecutionsAdvanceLoadingEntity, {[action.payload.layoutName]: true}),
                rcpm20ExecutionsAdvanceLoadedEntity: Object.assign({}, state.rcpm20ExecutionsAdvanceLoadedEntity, {[action.payload.layoutName]: false}),
                rcpm20ExecutionsAdvanceErrorEntity: Object.assign({}, state.rcpm20ExecutionsAdvanceErrorEntity,  {[action.payload.layoutName]: null}),
            };
        }

        case fromActions.RCPM2PositionsActionTypes.LOAD_EXECUTIONS_ADVANCE_COMPLETE: {

            let tradersName;
            if (action.payload && action.payload.data.length > 0) {
                tradersName = _.uniqBy(action.payload.data, 'trader').map(item => item.trader);
            }

            return {
                ...state,
                rcpm20ExecutionsAdvanceEntity: {
                    ...state.rcpm20ExecutionsAdvanceEntity,
                    [action.payload.layoutName]: {
                        data: action.payload.data,
                        traders: tradersName
                    }
                },
                rcpm20ExecutionsAdvanceLoadingEntity: Object.assign({}, state.rcpm20ExecutionsAdvanceLoadingEntity, {[action.payload.layoutName]: false}),
                rcpm20ExecutionsAdvanceLoadedEntity: Object.assign({}, state.rcpm20ExecutionsAdvanceLoadedEntity, {[action.payload.layoutName]: true}),
                rcpm20ExecutionsAdvanceErrorEntity: Object.assign({}, state.rcpm20ExecutionsAdvanceErrorEntity,  {[action.payload.layoutName]: null}),
            };
        }

        case fromActions.RCPM2PositionsActionTypes.LOAD_EXECUTIONS_ADVANCE_FAILED: {
            return {
                ...state,
                rcpm20ExecutionsAdvanceEntity: {
                    ...state.rcpm20ExecutionsAdvanceEntity,
                    [action.payload.layoutName]: {
                        data: [],
                        traders: []
                    }
                },
                rcpm20ExecutionsAdvanceLoadingEntity: Object.assign({}, state.rcpm20ExecutionsAdvanceLoadingEntity, {[action.payload.layoutName]: false}),
                rcpm20ExecutionsAdvanceLoadedEntity: Object.assign({}, state.rcpm20ExecutionsAdvanceLoadedEntity, {[action.payload.layoutName]: false}),
                rcpm20ExecutionsAdvanceErrorEntity: Object.assign({}, state.rcpm20ExecutionsAdvanceErrorEntity,  {[action.payload.layoutName]: action.payload.error}),
            };
        }
























        case fromActions.RCPM2PositionsActionTypes.LOAD_NONLINEAR_AGG_DATA: {
            // return {
            //     ...state,
            //     nonlinearAggDataLoading: true,
            //     nonlinearAggDataLoaded: false,
            //     nonlinearAggDataError: null
            // };
            return {
                ...state,
                // rcpm20NonlinearAggDataEntity: {
                //     ...state.rcpm20NonlinearAggDataEntity,
                //     [action.payload.layout]: {
                //         nonlinearAggData: state.rcpm20NonlinearAggDataEntity[action.payload.layout] ? state.rcpm20NonlinearAggDataEntity[action.payload.layout].nonlinearAggData : [],
                //         nonlinearAggDataLoading: true,
                //         nonlinearAggDataLoaded: false,
                //         nonlinearAggDataError: null,
                //     }
                // },

                rcpm20NonlinearAggDataLoadingEntity: Object.assign({}, state.rcpm20NonlinearAggDataLoadingEntity, {[action.payload.layout]: true}),
                rcpm20NonlinearAggDataLoadedEntity: Object.assign({}, state.rcpm20NonlinearAggDataLoadedEntity, {[action.payload.layout]: false}),
                rcpm20NonlinearAggDataErrorEntity: Object.assign({}, state.rcpm20NonlinearAggDataErrorEntity,  {[action.payload.layout]: null}),
            };
        }

        case fromActions.RCPM2PositionsActionTypes.LOAD_NONLINEAR_AGG_DATA_COMPLETE: {
            // return {
            //     ...state,
            //     nonlinearAggDataLoading: false,
            //     nonlinearAggDataLoaded: true,
            //     nonlinearAggData: action.payload,
            //     nonlinearAggDataError: null,
            // };

            return {
                ...state,
                rcpm20NonlinearAggDataEntity: {
                    ...state.rcpm20NonlinearAggDataEntity,
                    [action.payload.layout]: {
                        // nonlinearAggDataLoading: false,
                        // nonlinearAggDataLoaded: true,
                        // nonlinearAggDataError: null,
                        nonlinearAggData: action.payload.data,
                    }
                },
                rcpm20NonlinearAggDataLoadingEntity: Object.assign({}, state.rcpm20NonlinearAggDataLoadingEntity, {[action.payload.layout]: false}),
                rcpm20NonlinearAggDataLoadedEntity: Object.assign({}, state.rcpm20NonlinearAggDataLoadedEntity, {[action.payload.layout]: true}),
                rcpm20NonlinearAggDataErrorEntity: Object.assign({}, state.rcpm20NonlinearAggDataErrorEntity,  {[action.payload.layout]: null}),
            };
        }

        case fromActions.RCPM2PositionsActionTypes.LOAD_NONLINEAR_AGG_DATA_FAILED: {
            // return {
            //     ...state,
            //     nonlinearAggDataLoading: false,
            //     nonlinearAggDataLoaded: false,
            //     nonlinearAggDataError: action.payload
            // };

            return {
                ...state,
                // rcpm20NonlinearAggDataEntity: {
                //     ...state.rcpm20NonlinearAggDataEntity,
                //     [action.payload.layout] : {
                //         ...state.rcpm20NonlinearAggDataEntity[action.payload.layout],
                //         nonlinearAggDataLoading: false,
                //         nonlinearAggDataLoaded: false,
                //         nonlinearAggDataError: action.payload.error
                //     }
                // },
                rcpm20NonlinearAggDataLoadingEntity: Object.assign({}, state.rcpm20NonlinearAggDataLoadingEntity, {[action.payload.layout]: false}),
                rcpm20NonlinearAggDataLoadedEntity: Object.assign({}, state.rcpm20NonlinearAggDataLoadedEntity, {[action.payload.layout]: false}),
                rcpm20NonlinearAggDataErrorEntity: Object.assign({}, state.rcpm20NonlinearAggDataErrorEntity,  {[action.payload.layout]: action.payload.error}),
            };
        }











        case fromActions.RCPM2PositionsActionTypes.LOAD_NONLINEAR_PNL_DATA: {

            return {
                ...state,
                rcpm20NonlinearPnlDataLoadingEntity: Object.assign({}, state.rcpm20NonlinearPnlDataLoadingEntity, {[action.payload.layout]: true}),
                rcpm20NonlinearPnlDataLoadedEntity: Object.assign({}, state.rcpm20NonlinearPnlDataLoadedEntity, {[action.payload.layout]: false}),
                rcpm20NonlinearPnlDataErrorEntity: Object.assign({}, state.rcpm20NonlinearPnlDataErrorEntity,  {[action.payload.layout]: null}),
            };
        }

        case fromActions.RCPM2PositionsActionTypes.LOAD_NONLINEAR_PNL_DATA_COMPLETE: {

            return {
                ...state,
                rcpm20NonlinearPnlDataEntity: {
                    ...state.rcpm20NonlinearPnlDataEntity,
                    [action.payload.layout]: action.payload.data,
                },
                rcpm20NonlinearPnlDataLoadingEntity: Object.assign({}, state.rcpm20NonlinearPnlDataLoadingEntity, {[action.payload.layout]: false}),
                rcpm20NonlinearPnlDataLoadedEntity: Object.assign({}, state.rcpm20NonlinearPnlDataLoadedEntity, {[action.payload.layout]: true}),
                rcpm20NonlinearPnlDataErrorEntity: Object.assign({}, state.rcpm20NonlinearPnlDataErrorEntity,  {[action.payload.layout]: null}),
            };
        }

        case fromActions.RCPM2PositionsActionTypes.LOAD_NONLINEAR_PNL_DATA_FAILED: {
            return {
                ...state,
                rcpm20NonlinearPnlDataLoadingEntity: Object.assign({}, state.rcpm20NonlinearPnlDataLoadingEntity, {[action.payload.layout]: false}),
                rcpm20NonlinearPnlDataLoadedEntity: Object.assign({}, state.rcpm20NonlinearPnlDataLoadedEntity, {[action.payload.layout]: false}),
                rcpm20NonlinearPnlDataErrorEntity: Object.assign({}, state.rcpm20NonlinearPnlDataErrorEntity,  {[action.payload.layout]: action.payload.error}),
            };
        }




        // ------------------------------------------------------------------------------------------------------------

        case fromActions.RCPM2PositionsActionTypes.LOAD_POSITION_INFO: {
            return {
                ...state,
                positionInfoLoadingEntity: Object.assign({}, state.positionInfoLoadingEntity, {[action.payload.layout]: true}),
                positionInfoLoadedEntity: Object.assign({}, state.positionInfoLoadedEntity, {[action.payload.layout]: false}),
                positionInfoErrorEntity: Object.assign({}, state.positionInfoErrorEntity, {[action.payload.layout]: null}),
            };
        }

        case fromActions.RCPM2PositionsActionTypes.LOAD_POSITION_INFO_COMPLETE: {
            return {
                ...state,
                positionInfoEntity: Object.assign({}, state.positionInfoEntity, {[action.payload.layout]: action.payload.data}),
                positionInfoLoadingEntity: Object.assign({}, state.positionInfoLoadingEntity, {[action.payload.layout]: false}),
                positionInfoLoadedEntity: Object.assign({}, state.positionInfoLoadedEntity, {[action.payload.layout]: true}),
                positionInfoErrorEntity: Object.assign({}, state.positionInfoErrorEntity, {[action.payload.layout]: null}),
            };
        }


        case fromActions.RCPM2PositionsActionTypes.LOAD_POSITION_INFO_FAILED: {
            return {
                ...state,
                positionInfoLoadingEntity: Object.assign({}, state.positionInfoLoadingEntity, {[action.payload.layout]: false}),
                positionInfoLoadedEntity: Object.assign({}, state.positionInfoLoadedEntity, {[action.payload.layout]: false}),
                positionInfoErrorEntity: Object.assign({}, state.positionInfoErrorEntity, {[action.payload.layout]: action.payload.error}),
            };
        }

        case fromActions.RCPM2PositionsActionTypes.RESET_POSITION_INFO: {
            return {
                ...state,
                positionInfoEntity: Object.assign({}, state.positionInfoEntity, {[action.payload]: null}),
                positionInfoLoadingEntity: Object.assign({}, state.positionInfoLoadingEntity, {[action.payload]: false}),
                positionInfoLoadedEntity: Object.assign({}, state.positionInfoLoadedEntity, {[action.payload]: false}),
                positionInfoErrorEntity: Object.assign({}, state.positionInfoErrorEntity, {[action.payload]: null}),
            };
        }





        default: {
            return state;
        }
    }
}

// export const getActiveDate = (state: State) => state.activeDate;
// export const getTraders = (state: State) => state.traders;
// export const getManagers = (state: State) => state.managers;


export const getPositionLookups = (state: State) => state.positionLookups;
export const getPositionLookupsLoading = (state: State) => state.positionLookupsLoading;
export const getPositionLookupsLoaded = (state: State) => state.positionLookupsLoaded;
export const getPositionLookupsError = (state: State) => state.positionLookupsError;

export const getPositionPresetLayout = (state: State) => state.positionPresetLayout;
export const getPositionPresetLayoutLoading = (state: State) => state.positionPresetLayoutLoading;
export const getPositionPresetLayoutLoaded = (state: State) => state.positionPresetLayoutLoaded;
export const getPositionPresetLayoutError = (state: State) => state.positionPresetLayoutError;

export const getNonlinearSupportGrouping = (state: State) => state.nonlinearSupportGrouping;
export const getNonlinearSupportGroupingLoading = (state: State) => state.nonlinearSupportGroupingLoading;
export const getNonlinearSupportGroupingLoaded = (state: State) => state.nonlinearSupportGroupingLoaded;
export const getNonlinearSupportGroupingError = (state: State) => state.nonlinearSupportGroupingError;

export const getPositionDates = (state: State) => state.positionDates;
export const getPositionDatesLoading = (state: State) => state.positionDatesLoading;
export const getPositionDatesLoaded = (state: State) => state.positionDatesLoaded;
export const getPositionDatesError = (state: State) => state.positionDatesError;
export const getLatestAvailableDate = (state: State) => state.latestAvaliableDate;

export const getLatestPositionDate = (state: State) => state.latestPositionDate;
export const getLatestPositionDateLoading = (state: State) => state.latestPositionDateLoading;
export const getLatestPositionDateLoaded = (state: State) => state.latestPositionDateLoaded;
export const getLatestPositionDateError = (state: State) => state.latestPositionDateError;
export const getPositionDateLoadToggle = (state: State) => state.positionDateLoadToggle;


export const getManagers = (state: State) => state.managers;
export const getTimeStamp = (state: State) => state.timeStamp;
export const getTimeStampCollection = (state: State) => state.timeStampCollection;
export const getSpinningActivate = (state: State) => state.spinningActivate;

export const getUserLayouts = (state: State) => state.userLayouts;
export const getUserLayoutStyle = (state: State) => state.userLayoutStyle;

export const getDataSourcePermission = (state: State) => state.dataSourcePermission;
export const getDataSourcePermissionLoading = (state: State) => state.dataSourcePermissionLoading;
export const getDataSourcePermissionLoaded = (state: State) => state.dataSourcePermissionLoaded;
export const getDataSourcePermissionError = (state: State) => state.dataSourcePermissionError;

// ----------------------------------------------------------------------------------------------------

// export const getRcpm20Positions = (state: State) => state.rcpm20Positions;
// export const getRcpm20PositonsLoading = (state: State) => state.rcpm20PositonsLoading;
// export const getRcpm20PositonsLoaded = (state: State) => state.rcpm20PositonsLoaded;
// export const getRcpm20PositonsError = (state: State) => state.rcpm20PositonsError;

// export const getRcpm20PositionsGroupings = (state: State) => state.rcpm20PositionsGroupings;
// export const getRcpm20PositionsGroupingsLoading = (state: State) => state.rcpm20PositionsGroupingsLoading;
// export const getRcpm20PositionsGroupingsLoaded = (state: State) => state.rcpm20PositionsGroupingsLoaded;
// export const getRcpm20PositionsGroupingsError = (state: State) => state.rcpm20PositionsGroupingsError;

// export const getNonlinearAggData = (state: State) => state.nonlinearAggData;
// export const getNonlinearAggDataLoading = (state: State) => state.nonlinearAggDataLoading;
// export const getNonlinearAggDataLoaded = (state: State) => state.nonlinearAggDataLoaded;
// export const getNonlinearAggDataError = (state: State) => state.nonlinearAggDataError;

// export const getRcpm20Executions = (state: State) => state.rcpm20Executions;
// export const getRcpm20ExecutionsLoading = (state: State) => state.rcpm20ExecutionsLoading;
// export const getRcpm20ExecutionsLoaded = (state: State) => state.rcpm20ExecutionsLoaded;
// export const getRcpm20ExecutionsError = (state: State) => state.rcpm20ExecutionsError;

// export const getPrimaryGroupingNameIdMaping = (state: State) => state.primaryGroupingNameIdMaping;

export const getActiveDate = (state: State) => state.activeDate;
export const getIsOnCurrentDate = (state: State) => state.isOnCurrentDate;

export const getSelectedLayouts = (state: State) => state.selectedLayouts;
// export const getActiveLayout = (state: State) => state.activeLayout;

export const getRcpm20PositionsEntity = (state: State) => state.rcpm20PositionsEntity;
export const getRcpm20PositionsLoadingEntity = (state: State) => state.rcpm20PositionsLoadingEntity;
export const getRcpm20PositionsLoadedEntity = (state: State) => state.rcpm20PositionsLoadedEntity;
export const getRcpm20PositionsErrorEntity = (state: State) => state.rcpm20PositionsErrorEntity;

export const getRcpm20PositionsGroupingsEntity = (state: State) => state.rcpm20PositionsGroupingsEntity;
export const getRcpm20PositionsGroupingsLoadingEntity = (state: State) => state.rcpm20PositionsGroupingsLoadingEntity;
export const getRcpm20PositionsGroupingsLoadedEntity = (state: State) => state.rcpm20PositionsGroupingsLoadedEntity;
export const getRcpm20PositionsGroupingsErrorEntity = (state: State) => state.rcpm20PositionsGroupingsErrorEntity;

export const getRcpm20PositionsGroupingCombineEntity = (state: State) => state.rcpm20PositionsGroupingCombineEntity;

export const getRcpm20NonlinearAggDataEntity = (state: State) => state.rcpm20NonlinearAggDataEntity;
export const getRcpm20NonlinearAggDataLoadingEntity = (state: State) => state.rcpm20NonlinearAggDataLoadingEntity;
export const getRcpm20NonlinearAggDataLoadedEntity = (state: State) => state.rcpm20NonlinearAggDataLoadedEntity;
export const getRcpm20NonlinearAggDataErrorEntity = (state: State) => state.rcpm20NonlinearAggDataErrorEntity;

export const getRcpm20NonlinearPnlDataEntity = (state: State) => state.rcpm20NonlinearPnlDataEntity;
export const getRcpm20NonlinearPnlDataLoadingEntity = (state: State) => state.rcpm20NonlinearPnlDataLoadingEntity;
export const getRcpm20NonlinearPnlDataLoadedEntity = (state: State) => state.rcpm20NonlinearPnlDataLoadedEntity;
export const getRcpm20NonlinearPnlDataErrorEntity = (state: State) => state.rcpm20NonlinearPnlDataErrorEntity;

export const getRcpm20ExecutionsEntity = (state: State) => state.rcpm20ExecutionsEntity;
export const getRcpm20ExecutionsLoadingEntity = (state: State) => state.rcpm20ExecutionsLoadingEntity;
export const getRcpm20ExecutionsLoadedEntity = (state: State) => state.rcpm20ExecutionsLoadedEntity;
export const getRcpm20ExecutionsErrorEntity = (state: State) => state.rcpm20ExecutionsErrorEntity;

export const getRcpm20ExecutionsAdvanceEntity = (state: State) => state.rcpm20ExecutionsAdvanceEntity;
export const getRcpm20ExecutionsAdvanceLoadingEntity = (state: State) => state.rcpm20ExecutionsAdvanceLoadingEntity;
export const getRcpm20ExecutionsAdvanceLoadedEntity = (state: State) => state.rcpm20ExecutionsAdvanceLoadedEntity;
export const getRcpm20ExecutionsAdvanceErrorEntity = (state: State) => state.rcpm20ExecutionsAdvanceErrorEntity;

export const getPrimaryGroupingNameIdMappingEntity = (state: State) => state.primaryGroupingNameIdMapingEntity;

export const getPositionInfoEntity = (state: State) => state.positionInfoEntity;
export const getPositionInfoLoadingEntity = (state: State) => state.positionInfoLoadingEntity;
export const getPositionInfoLoadedEntity = (state: State) => state.positionInfoLoadedEntity;
export const getPositionInfoErrorEntity = (state: State) => state.positionInfoErrorEntity;

export const getMissingCloses = (state: State) => state.missingCloses;
export const getMissingClosesLoading = (state: State) => state.missingClosesLoading;
export const getMissingClosesLoaded = (state: State) => state.missingClosesLoaded;
export const getMissingClosesError = (state: State) => state.missingClosesError;



function combinePositionAndGroupingData(positionData, groupingData) {
  
    if (positionData === undefined) {
        return [];
    }

    if (groupingData && groupingData.length > 0) {
        const groupingMaping: any = {};
        // console.time('combinePositionAndGroupingData');
        groupingData.forEach(element => groupingMaping[element.Id] = element);
        const combineResult = positionData.map(element => {
            if (groupingMaping[element.Id]) {
                return {...element, ...groupingMaping[element.Id]};     // Object.assign({}, element, groupingMaping[element.Id]);
            } else {
                return element;
            }
        });
        // console.timeEnd('combinePositionAndGroupingData');
        return combineResult;
    } else {
        return positionData;
    }

}

