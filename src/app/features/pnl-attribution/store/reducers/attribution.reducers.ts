import * as fromActions from '../actions/attribution.actions';
import * as fromModels from './../../models/attribution.models';

export interface State {

    customGroupingAttributes: string[];
    customGroupingAttributesLoading: boolean;
    customGroupingAttributesLoaded: boolean;
    customGroupingAttributesError?: string;

    attributionLoadingEntity: {
        [layoutName: string]: boolean
    };
    attributionLoadedEntity: {
        [layoutName: string]: boolean
    };
    attributionErrorEntity?: {
        [layoutName: string]: string
    };
    attributionFlatDataEntity: {
        [layoutName: string]: any[];
    };
    attributionTreeDataEntity: {
        [layoutName: string]: any;
    };
    attributionColumnsEntity: {
        [layoutName: string]: string[];
    };

    
    attributionLineItemEntity: {
        [guid: string]: {[id: number]: any}
    }
    attributionLineItemLoadingEntity: {
        [guid: string]: {[id: number]: boolean}
    }
    attributionLineItemLoadedEntity: {
        [guid: string]: {[id: number]: boolean}
    }
    attributionLineItemErrorEntity: {
        [guid: string]: {[id: number]: string}
    }



    attributionTimeseriesEntity: {
        [guid: string]: {[id: number]: any}
    }
    attributionTimeseriesLoadingEntity: {
        [guid: string]: {[id: number]: boolean}
    }
    attributionTimeseriesLoadedEntity: {
        [guid: string]: {[id: number]: boolean}
    }
    attributionTimeseriesErrorEntity: {
        [guid: string]: {[id: number]: string}
    }

    attributionDetailEntity: {
        [guid: string]: {[combineId: number]: any}
    }
    attributionDetailLoadingEntity: {
        [guid: string]: {[combineId: number]: boolean}
    }
    attributionDetailLoadedEntity: {
        [guid: string]: {[combineId: number]: boolean}
    }
    attributionDetailErrorEntity: {
        [guid: string]: {[combineId: number]: string}
    }

    reclassifyRepo: boolean;
    excludeFunding: boolean;
    includeBetaAdjustment: boolean;


    attributionReport: any;
    attributionReportLoading: boolean;
    attributionReportLoaded: boolean;
    attributionReportError?: string;

    attributionCapitalReport: any;
    attributionCapitalReportLoading: boolean;
    attributionCapitalReportLoaded: boolean;
    attributionCapitalReportError?: string;

    attributionPodCapitalReport: any;
    attributionPodCapitalReportLoading: boolean;
    attributionPodCapitalReportLoaded: boolean;
    attributionPodCapitalReportError?: string;
    
    attributionCapitalEomReport: any;
    attributionCapitalEomReportLoading: boolean;
    attributionCapitalEomReportLoaded: boolean;
    attributionCapitalEomReportError?: string;

    attributionPodCapitalEomReport: any;
    attributionPodCapitalEomReportLoading: boolean;
    attributionPodCapitalEomReportLoaded: boolean;
    attributionPodCapitalEomReportError?: string;
}

const initialState: State = {

    excludeFunding: false,
    reclassifyRepo: false,
    includeBetaAdjustment: false,

    customGroupingAttributes: [],
    customGroupingAttributesLoading: false,
    customGroupingAttributesLoaded: false,


    attributionLoadingEntity: {},
    attributionLoadedEntity: {},
    attributionErrorEntity: {},
    attributionFlatDataEntity: {},
    attributionTreeDataEntity: {},
    attributionColumnsEntity: {},

    attributionLineItemEntity: {},
    attributionLineItemLoadingEntity: {},
    attributionLineItemLoadedEntity: {},
    attributionLineItemErrorEntity: {},

    attributionTimeseriesEntity: {},
    attributionTimeseriesLoadingEntity: {},
    attributionTimeseriesLoadedEntity: {},
    attributionTimeseriesErrorEntity: {},

    attributionDetailEntity: {},
    attributionDetailLoadingEntity: {},
    attributionDetailLoadedEntity: {},
    attributionDetailErrorEntity: {},

    attributionReport: null,
    attributionReportLoading: false,
    attributionReportLoaded: false,

    attributionCapitalReport: null,
    attributionCapitalReportLoading: false,
    attributionCapitalReportLoaded: false,

    attributionPodCapitalReport: null,
    attributionPodCapitalReportLoading: false,
    attributionPodCapitalReportLoaded: false,
    
    attributionCapitalEomReport: null,
    attributionCapitalEomReportLoading: false,
    attributionCapitalEomReportLoaded: false,

    attributionPodCapitalEomReport: null,
    attributionPodCapitalEomReportLoading: false,
    attributionPodCapitalEomReportLoaded: false
};

export function reducer(state = initialState, action: fromActions.PnlAttributionActions): State {

    switch (action.type) {


        // case fromActions.PnlAttributionActionTypes.SET_GRID_DISPLAY_MODE: {
        //     return {
        //         ...state,
        //         gridDisplayMode: Object.assign({}, state.gridDisplayMode, action.payload)
        //     }
        // }

        case fromActions.PnlAttributionActionTypes.LOAD_CUSTOM_GROUPING_ATTRIBUTES: {
            return {
                ...state,
                customGroupingAttributesLoading: true,
                customGroupingAttributesLoaded: false,
            }
        }

        case fromActions.PnlAttributionActionTypes.LOAD_CUSTOM_GROUPING_ATTRIBUTES_COMPLETE: {
            return {
                ...state,
                customGroupingAttributes: action.payload,
                customGroupingAttributesLoading: false,
                customGroupingAttributesLoaded: true,
            }
        }

        case fromActions.PnlAttributionActionTypes.LOAD_CUSTOM_GROUPING_ATTRIBUTES_FAILED: {
            return {
                ...state,
                customGroupingAttributesLoading: false,
                customGroupingAttributesLoaded: false,
                customGroupingAttributesError: action.payload
            }
        }


        // -------------------------------------------------------------------------------


        case fromActions.PnlAttributionActionTypes.LOAD_PNL_ATTRIBUTION: {

            return {
                ...state,
                // attributionRequest: action.payload,
                attributionLoadingEntity: {
                    ...state.attributionLoadingEntity,
                    [action.payload.layoutName]: true
                },
                attributionLoadedEntity: {
                    ...state.attributionLoadedEntity,
                    [action.payload.layoutName]: false
                },
                attributionErrorEntity: {
                    ...state.attributionErrorEntity,
                    [action.payload.layoutName]: null
                },

                attributionFlatDataEntity: {
                    ...state.attributionFlatDataEntity,
                    [action.payload.layoutName]: []
                },

                attributionTreeDataEntity: {
                    ...state.attributionTreeDataEntity,
                    [action.payload.layoutName]: null
                },

                attributionColumnsEntity: {
                    ...state.attributionColumnsEntity,
                    [action.payload.layoutName]: []
                },
            }
        }

        case fromActions.PnlAttributionActionTypes.LOAD_PNL_ATTRIBUTION_COMPLETE: {

            const targetProperties = action.payload.result.columns || [];
            const data = action.payload.result.data || [];
            const guid = action.payload.result.guid;
            const layoutName = action.payload.layoutName;
            const grouping = action.payload.grouping;
            const leafGrouping = grouping[grouping.length - 1];

            const dataDict: any = {};
            let rootElement;
            const flatLeafElement = [];

            // Enrich Data --------------------------------------------------------------

            const enrichData = data && _enrichData(targetProperties, data) || [];
            // const enrichData = Object.keys(data).map(key => {
            //     const element = data[key];

            //     const enrichElement: any = {};
            //     targetProperties.forEach((key, index) => {
            //         enrichElement[key] = element[index];
            //     });
            //     enrichElement[enrichElement['Level']] = enrichElement['DisplayName'];
            //     return enrichElement;
            // });

            // Data Collection -----------------------------------------------------------
            enrichData.forEach(enrichElement => {
                if (enrichElement['Level'] === 'FirmName') {
                    rootElement = enrichElement;
                }
            });


            // Hierarchy Data Tree Building ------------------------------------------------------

            enrichData.forEach(enrichElement => {

                if (dataDict[enrichElement['ParentId']] === undefined) {
                    dataDict[enrichElement['ParentId']] = [enrichElement];
                } else {
                    dataDict[enrichElement['ParentId']].push(enrichElement)
                }
            })

            // Fill up grouping that has no leaf
            enrichData.forEach(enrichElement => {
                if (enrichElement['Level'] !== leafGrouping) {
                    if (dataDict[enrichElement['Id']] === undefined) {
                        // this is a grouping that has no leaf!!
                        const dummyLeaf = _createFakeLeafLevel(leafGrouping);
                        dataDict[enrichElement['Id']] = [dummyLeaf];
                    }
                }
            });

            const dataTree = constructTreeData(rootElement);


            function constructTreeData(enrichElement, pushDownProperty?: any) {
                if (enrichElement['Level'] === leafGrouping) {
                    const treeNode: any = {};
                    if (pushDownProperty) {
                        treeNode['data'] = Object.assign({}, enrichElement, pushDownProperty);
                    } else {
                        treeNode['data'] = enrichElement;
                    }
                    treeNode['Level'] = enrichElement['Level'];

                    // Flat Data Collection -----------------------------------------------------------
                    flatLeafElement.push(treeNode['data']);

                    return treeNode;
                } else {
                    // Setup current Level ---------------------------------------------------
                    const treeNode: any = {};
                    if (pushDownProperty) {
                        treeNode['data'] = Object.assign({}, enrichElement, pushDownProperty);
                    } else {
                        treeNode['data'] = enrichElement;
                    }
                    treeNode['Level'] = enrichElement['Level'];

                    // Go down into Children ---------------------------------------------------
                    const targetId = enrichElement['Id'];
                    const targetChildren = dataDict[targetId] || [];
                    treeNode.branch = {};
                    targetChildren.forEach(childEnrichElement => {
                        const collectivePushdownProperty = Object.assign({}, pushDownProperty, {[enrichElement['Level']]: enrichElement['DisplayName']});
                        treeNode.branch[childEnrichElement['DisplayName']] = constructTreeData(childEnrichElement, collectivePushdownProperty);
                    });

                    // return a complete data structure if it is in the root level / firm level, if not,  just the treeNode----------------------------
                    if (enrichElement['Level'] === 'FirmName') {
                        return {
                            branch: {
                                [enrichElement['DisplayName']]: treeNode
                            } 
                        }
                    } else {
                        return treeNode;
                    }
                }
            }
            // console.log('enrichData', enrichData);
            // console.log('flat enrich leaf element', flatLeafElement);
            // console.log('dataDict', dataDict);
            // console.log('rootElement', rootElement);
            // console.log('data Tree', dataTree);

            return {
                ...state,
                // activeGuid: guid,
                // attributionData: action.payload,

                attributionLoadingEntity: {
                    ...state.attributionLoadingEntity,
                    [layoutName]: false,
                },
                attributionLoadedEntity: {
                    ...state.attributionLoadedEntity,
                    [layoutName]: true,
                },
                attributionFlatDataEntity: {
                    ...state.attributionFlatDataEntity,
                    [layoutName]: flatLeafElement
                },
                attributionTreeDataEntity: {
                    ...state.attributionTreeDataEntity,
                    [layoutName]: dataTree
                },
                attributionColumnsEntity: {
                    ...state.attributionColumnsEntity,
                    [layoutName]: targetProperties
                }
            }
        }

        case fromActions.PnlAttributionActionTypes.LOAD_PNL_ATTRIBUTION_FAILED: {

            const layoutName = action.payload.layoutName;
            return {
                ...state, 
                attributionLoadingEntity: {
                    ...state.attributionLoadingEntity,
                    [layoutName]: false,
                },
                attributionLoadedEntity: {
                    ...state.attributionLoadedEntity,
                    [layoutName]: false,
                },
                attributionErrorEntity: {
                    ...state.attributionErrorEntity,
                    [layoutName]: action.payload.result
                },
            }
        }








        case fromActions.PnlAttributionActionTypes.LOAD_POSITION_PNL_ATTRIBUTION: {

            const guid = action.payload.guid;
            const targetId = action.payload.id;

            return {
                ...state,
                attributionLineItemLoadingEntity: {
                    ...state.attributionLineItemLoadingEntity,
                    [guid]: {
                        ...state.attributionLineItemLoadingEntity[guid],
                        [targetId]: true
                    }
                },
                attributionLineItemLoadedEntity: {
                    ...state.attributionLineItemLoadedEntity,
                    [guid]: {
                        ...state.attributionLineItemLoadedEntity[guid],
                        [targetId]: false
                    }
                }
            }
        }

        case fromActions.PnlAttributionActionTypes.LOAD_POSITION_PNL_ATTRIBUTION_COMPLETE: {

            const guid = action.payload.guid;
            const targetId = action.payload.id;
            const data = action.payload.data;

            const enrichData = data.data && _enrichData(data.columns, data.data) || [];

            return {
                ...state,
                attributionLineItemLoadingEntity: {
                    ...state.attributionLineItemLoadingEntity,
                    [guid]: {
                        ...state.attributionLineItemLoadingEntity[guid],
                        [targetId]: false
                    }
                },
                attributionLineItemLoadedEntity: {
                    ...state.attributionLineItemLoadedEntity,
                    [guid]: {
                        ...state.attributionLineItemLoadedEntity[guid],
                        [targetId]: true
                    }
                },
                attributionLineItemEntity: {
                    ...state.attributionLineItemEntity,
                    [guid]: {
                        ...state.attributionLineItemEntity[guid],
                        [targetId]: enrichData
                    }
                }
            }
        }

        case fromActions.PnlAttributionActionTypes.LOAD_POSITION_PNL_ATTRIBUTION_FAILED: {

            const guid = action.payload.guid;
            const targetId = action.payload.id;
            const error = action.payload.err;

            return {
                ...state,
                attributionLineItemLoadingEntity: {
                    ...state.attributionLineItemLoadingEntity,
                    [guid]: {
                        ...state.attributionLineItemLoadingEntity[guid],
                        [targetId]: false
                    }
                },
                attributionLineItemLoadedEntity: {
                    ...state.attributionLineItemLoadedEntity,
                    [guid]: {
                        ...state.attributionLineItemLoadedEntity[guid],
                        [targetId]: false
                    }
                },
                attributionLineItemErrorEntity: {
                    ...state.attributionLineItemErrorEntity,
                    [guid]: {
                        ...state.attributionLineItemErrorEntity[guid],
                        [targetId]: error
                    }
                }
            }
        }










        case fromActions.PnlAttributionActionTypes.LOAD_PNL_ATTRIBUTION_DAILY_TIMESERIES: {

            const guid = action.payload.guid;
            const targetId = action.payload.id;

            return {
                ...state,
                attributionTimeseriesLoadingEntity: {
                    ...state.attributionTimeseriesLoadingEntity,
                    [guid]: {
                        ...state.attributionTimeseriesLoadingEntity[guid],
                        [targetId]: true
                    }
                },
                attributionTimeseriesLoadedEntity: {
                    ...state.attributionTimeseriesLoadedEntity,
                    [guid]: {
                        ...state.attributionTimeseriesLoadedEntity[guid],
                        [targetId]: false
                    }
                }
            }
        }

        case fromActions.PnlAttributionActionTypes.LOAD_PNL_ATTRIBUTION_DAILY_TIMESERIES_COMPLETE: {

            const guid = action.payload.guid;
            const targetId = action.payload.id;
            const data = action.payload.data;

            // Calculate rolling sum
            data.data.sort((valueA, valueB) => {
                const valueADateTime = new Date(valueA[0]);
                const valueBDateTime = new Date(valueB[0]);
                return valueADateTime.getTime() - valueBDateTime.getTime();
            });

            const targetColumns = data.columns.filter(name => name !== 'Date').map(name => name +'_acc');
            data.columns = data.columns.concat(targetColumns);

            let rollingSum;
            const cumulativeResult = data.data.map((value, index) => {
                const current_array = value.slice(1);
                if (index === 0) {
                    rollingSum = current_array.slice();
                    return current_array;
                } else {
                    rollingSum = current_array.map((element, index) => element + rollingSum[index]);
                    const rollingSumCopy = rollingSum.slice();
                    return rollingSumCopy;
                }
            });

            data.data = data.data.map((valueArray, index) => {
                return valueArray.concat(cumulativeResult[index]);
            });

            return {
                ...state,
                attributionTimeseriesLoadingEntity: {
                    ...state.attributionTimeseriesLoadingEntity,
                    [guid]: {
                        ...state.attributionTimeseriesLoadingEntity[guid],
                        [targetId]: false
                    }
                },
                attributionTimeseriesLoadedEntity: {
                    ...state.attributionTimeseriesLoadedEntity,
                    [guid]: {
                        ...state.attributionTimeseriesLoadedEntity[guid],
                        [targetId]: true
                    }
                },
                attributionTimeseriesEntity: {
                    ...state.attributionTimeseriesEntity,
                    [guid]: {
                        ...state.attributionTimeseriesEntity[guid],
                        [targetId]: data
                    }
                }
            }
        }

        case fromActions.PnlAttributionActionTypes.LOAD_PNL_ATTRIBUTION_DAILY_TIMESERIES_COMPLETE: {

            const guid = action.payload.guid;
            const targetId = action.payload.id;
            const data = action.payload.data;

            // const enrichData = data.data && _enrichData(data.columns, data.data) || [];

            return {
                ...state,
                attributionTimeseriesLoadingEntity: {
                    ...state.attributionTimeseriesLoadingEntity,
                    [guid]: {
                        ...state.attributionTimeseriesLoadingEntity[guid],
                        [targetId]: false
                    }
                },
                attributionTimeseriesLoadedEntity: {
                    ...state.attributionTimeseriesLoadedEntity,
                    [guid]: {
                        ...state.attributionTimeseriesLoadedEntity[guid],
                        [targetId]: true
                    }
                },
                attributionTimeseriesEntity: {
                    ...state.attributionTimeseriesEntity,
                    [guid]: {
                        ...state.attributionTimeseriesEntity[guid],
                        [targetId]: data
                    }
                }
            }
        }

        case fromActions.PnlAttributionActionTypes.LOAD_PNL_ATTRIBUTION_DAILY_TIMESERIES_FAILED: {

            const guid = action.payload.guid;
            const targetId = action.payload.id;
            const error = action.payload.err;

            return {
                ...state,
                attributionTimeseriesLoadingEntity: {
                    ...state.attributionTimeseriesLoadingEntity,
                    [guid]: {
                        ...state.attributionTimeseriesLoadingEntity[guid],
                        [targetId]: false
                    }
                },
                attributionTimeseriesLoadedEntity: {
                    ...state.attributionTimeseriesLoadedEntity,
                    [guid]: {
                        ...state.attributionTimeseriesLoadedEntity[guid],
                        [targetId]: false
                    }
                },
                attributionTimeseriesErrorEntity: {
                    ...state.attributionTimeseriesErrorEntity,
                    [guid]: {
                        ...state.attributionTimeseriesErrorEntity[guid],
                        [targetId]: error
                    }
                }
            }
        }









        case fromActions.PnlAttributionActionTypes.LOAD_PNL_ATTRIBUTION_DETAILS: {

            const guid = action.payload.guid;
            const targetId = action.payload.combineId;

            return {
                ...state,
                attributionDetailLoadingEntity: {
                    ...state.attributionDetailLoadingEntity,
                    [guid]: {
                        ...state.attributionDetailLoadingEntity[guid],
                        [targetId]: true
                    }
                },
                attributionDetailLoadedEntity: {
                    ...state.attributionDetailLoadedEntity,
                    [guid]: {
                        ...state.attributionDetailLoadedEntity[guid],
                        [targetId]: false
                    }
                }
            }
        }

        case fromActions.PnlAttributionActionTypes.LOAD_PNL_ATTRIBUTION_DETAILS_COMPLETE: {

            const guid = action.payload.guid;
            const targetId = action.payload.combineId;
            const data = action.payload.data;

            // const enrichData = data.data && _enrichData(data.columns, data.data) || [];

            return {
                ...state,
                attributionDetailLoadingEntity: {
                    ...state.attributionDetailLoadingEntity,
                    [guid]: {
                        ...state.attributionDetailLoadingEntity[guid],
                        [targetId]: false
                    }
                },
                attributionDetailLoadedEntity: {
                    ...state.attributionDetailLoadedEntity,
                    [guid]: {
                        ...state.attributionDetailLoadedEntity[guid],
                        [targetId]: true
                    }
                },
                attributionDetailEntity: {
                    ...state.attributionDetailEntity,
                    [guid]: {
                        ...state.attributionDetailEntity[guid],
                        [targetId]: data
                    }
                }
            }
        }

        case fromActions.PnlAttributionActionTypes.LOAD_PNL_ATTRIBUTION_DETAILS_FAILED: {

            const guid = action.payload.guid;
            const targetId = action.payload.combineId;
            const error = action.payload.err;

            return {
                ...state,
                attributionDetailLoadingEntity: {
                    ...state.attributionDetailLoadingEntity,
                    [guid]: {
                        ...state.attributionDetailLoadingEntity[guid],
                        [targetId]: false
                    }
                },
                attributionDetailLoadedEntity: {
                    ...state.attributionDetailLoadedEntity,
                    [guid]: {
                        ...state.attributionDetailLoadedEntity[guid],
                        [targetId]: false
                    }
                },
                attributionDetailErrorEntity: {
                    ...state.attributionDetailErrorEntity,
                    [guid]: {
                        ...state.attributionDetailErrorEntity[guid],
                        [targetId]: error
                    }
                }
            }
        }

        case fromActions.PnlAttributionActionTypes.LOAD_PNL_ATTRIBUTION_REPORT: {
            return {
                ...state,
                attributionReport: null,
                attributionReportLoading: true,
                attributionReportLoaded: false,
                attributionReportError: null
            }
        }

        case fromActions.PnlAttributionActionTypes.LOAD_PNL_ATTRIBUTION_REPORT_COMPLETE: {
            return {
                ...state,
                attributionReport: action.payload,
                attributionReportLoading: false,
                attributionReportLoaded: true
            }
        }

        case fromActions.PnlAttributionActionTypes.LOAD_PNL_ATTRIBUTION_REPORT_FAILED: {
            return {
                ...state, 
                attributionReport: null,
                attributionReportLoading: false,
                attributionReportLoaded: false,
                attributionReportError: action.payload
            }
        }


        case fromActions.PnlAttributionActionTypes.LOAD_PNL_ATTRIBUTION_CAPITAL_REPORT: {
            return {
                ...state,
                attributionCapitalReport: null,
                attributionCapitalReportLoading: true,
                attributionCapitalReportLoaded: false,
                attributionCapitalReportError: null
            }
        }

        case fromActions.PnlAttributionActionTypes.LOAD_PNL_ATTRIBUTION_CAPITAL_REPORT_COMPLETE: {
            return {
                ...state,
                attributionCapitalReport: action.payload,
                attributionCapitalReportLoading: false,
                attributionCapitalReportLoaded: true
            }
        }

        case fromActions.PnlAttributionActionTypes.LOAD_PNL_ATTRIBUTION_CAPITAL_REPORT_FAILED: {
            return {
                ...state, 
                attributionCapitalReport: null,
                attributionCapitalReportLoading: false,
                attributionCapitalReportLoaded: false,
                attributionCapitalReportError: action.payload
            }
        }


        case fromActions.PnlAttributionActionTypes.LOAD_PNL_ATTRIBUTION_POD_CAPITAL_REPORT: {
            return {
                ...state,
                attributionPodCapitalReport: null,
                attributionPodCapitalReportLoading: true,
                attributionPodCapitalReportLoaded: false,
                attributionPodCapitalReportError: null
            }
        }

        case fromActions.PnlAttributionActionTypes.LOAD_PNL_ATTRIBUTION_POD_CAPITAL_REPORT_COMPLETE: {
            return {
                ...state,
                attributionPodCapitalReport: action.payload,
                attributionPodCapitalReportLoading: false,
                attributionPodCapitalReportLoaded: true
            }
        }

        case fromActions.PnlAttributionActionTypes.LOAD_PNL_ATTRIBUTION_POD_CAPITAL_REPORT_FAILED: {
            return {
                ...state,
                attributionPodCapitalReport: null,
                attributionPodCapitalReportLoading: false,
                attributionPodCapitalReportLoaded: false,
                attributionPodCapitalReportError: action.payload
            }
        }
        

        case fromActions.PnlAttributionActionTypes.LOAD_PNL_ATTRIBUTION_CAPITAL_EOM_REPORT: {
            return {
                ...state,
                attributionCapitalEomReport: null,
                attributionCapitalEomReportLoading: true,
                attributionCapitalEomReportLoaded: false,
                attributionCapitalEomReportError: null
            }
        }

        case fromActions.PnlAttributionActionTypes.LOAD_PNL_ATTRIBUTION_CAPITAL_EOM_REPORT_COMPLETE: {
            return {
                ...state,
                attributionCapitalEomReport: action.payload,
                attributionCapitalEomReportLoading: false,
                attributionCapitalEomReportLoaded: true
            }
        }

        case fromActions.PnlAttributionActionTypes.LOAD_PNL_ATTRIBUTION_CAPITAL_EOM_REPORT_FAILED: {
            return {
                ...state,
                attributionCapitalEomReport: null,
                attributionCapitalEomReportLoading: false,
                attributionCapitalEomReportLoaded: false,
                attributionCapitalEomReportError: action.payload
            }
        }

        case fromActions.PnlAttributionActionTypes.LOAD_PNL_ATTRIBUTION_POD_CAPITAL_EOM_REPORT: {
            return {
                ...state,
                attributionCapitalEomReport: null,
                attributionCapitalEomReportLoading: true,
                attributionCapitalEomReportLoaded: false,
                attributionCapitalEomReportError: null
            }
        }

        case fromActions.PnlAttributionActionTypes.LOAD_PNL_ATTRIBUTION_POD_CAPITAL_EOM_REPORT_COMPLETE: {
            return {
                ...state,
                attributionPodCapitalEomReport: action.payload,
                attributionPodCapitalEomReportLoading: false,
                attributionPodCapitalEomReportLoaded: true
            }
        }

        case fromActions.PnlAttributionActionTypes.LOAD_PNL_ATTRIBUTION_POD_CAPITAL_EOM_REPORT_FAILED: {
            return {
                ...state,
                attributionPodCapitalEomReport: null,
                attributionPodCapitalEomReportLoading: false,
                attributionPodCapitalEomReportLoaded: false,
                attributionPodCapitalEomReportError: action.payload
            }
        }

        case fromActions.PnlAttributionActionTypes.TOGGLE_EXCLUDE_FUNDING: {
            return {
                ...state,
                excludeFunding: !state.excludeFunding
            }
        }

        case fromActions.PnlAttributionActionTypes.TOGGLE_RECLASSIFY_REPO: {
            return {
                ...state,
                reclassifyRepo: !state.reclassifyRepo
            }
        }

        case fromActions.PnlAttributionActionTypes.TOGGLE_BETA_ADJUSTMENT: {
            return {
                ...state,
                includeBetaAdjustment: !state.includeBetaAdjustment
            };
        }

        default: {
            return state;
        }
    }
}

// export const getAttributionRequest = (state: State) => state.attributionRequest;
// export const getActiveGuid = (state: State) => state.activeGuid;
// export const getGridDisplayMode = (state: State) => state.gridDisplayMode;


export const getCustomGroupingAttributes = (state: State) => state.customGroupingAttributes;
export const getCustomGroupingAttributesLoading = (state: State) => state.customGroupingAttributesLoading;
export const getCustomGroupingAttributesLoaded = (state: State) => state.customGroupingAttributesLoaded;


// export const getAttribution = (state: State) => state.attributionData;
export const getAttributionLoadingEntity = (state: State) => state.attributionLoadingEntity;
export const getAttributionLoadedEntity = (state: State) => state.attributionLoadedEntity;
export const getAttributionErrorEntity = (state: State) => state.attributionErrorEntity;
export const getAttributionFlatDataEntity = (state: State) => state.attributionFlatDataEntity;
export const getAttributionTreeDataEntity = (state: State) => state.attributionTreeDataEntity;
export const getAttributionColumnsEntity = (state: State) => state.attributionColumnsEntity;

export const getAttributionLineItemEntity = (state: State) => state.attributionLineItemEntity;
export const getAttributionLineItemLoadingEntity = (state: State) => state.attributionLineItemLoadingEntity;
export const getAttributionLineItemLoadedEntity = (state: State) => state.attributionLineItemLoadedEntity;
export const getAttributionLineItemErrorEntity= (state: State) => state.attributionLineItemErrorEntity;

export const getAttributionTimeseriesEntity = (state: State) => state.attributionTimeseriesEntity;
export const getAttributionTimeseriesLoadingEntity = (state: State) => state.attributionTimeseriesLoadingEntity;
export const getAttributionTimeseriesLoadedEntity = (state: State) => state.attributionTimeseriesLoadedEntity;
export const getAttributionTimeseriesErrorEntity= (state: State) => state.attributionTimeseriesErrorEntity;

export const getAttributionDetailEntity = (state: State) => state.attributionDetailEntity;
export const getAttributionDetailLoadingEntity = (state: State) => state.attributionDetailLoadingEntity;
export const getAttributionDetailLoadedEntity = (state: State) => state.attributionDetailLoadedEntity;
export const getAttributionDetailErrorEntity= (state: State) => state.attributionDetailErrorEntity;

export const getAttributionReport = (state: State) => state.attributionReport;
export const getAttributionReportLoading = (state: State) => state.attributionReportLoading;
export const getAttributionReportLoaded = (state: State) => state.attributionReportLoaded;
export const getAttributionReportError = (state: State) => state.attributionReportError;

export const getAttributionCapitalReport = (state: State) => state.attributionCapitalReport;
export const getAttributionCapitalReportLoading = (state: State) => state.attributionCapitalReportLoading;
export const getAttributionCapitalReportLoaded = (state: State) => state.attributionCapitalReportLoaded;
export const getAttributionCapitalReportError = (state: State) => state.attributionCapitalReportError;

export const getAttributionPodCapitalReport = (state: State) => state.attributionPodCapitalReport;
export const getAttributionPodCapitalReportLoading = (state: State) => state.attributionPodCapitalReportLoading;
export const getAttributionPodCapitalReportLoaded = (state: State) => state.attributionPodCapitalReportLoaded;
export const getAttributionPodCapitalReportError = (state: State) => state.attributionPodCapitalReportError;

export const getAttributionCapitalEomReport = (state: State) => state.attributionCapitalEomReport;
export const getAttributionCapitalEomReportLoading = (state: State) => state.attributionCapitalEomReportLoading;
export const getAttributionCapitalEomReportLoaded = (state: State) => state.attributionCapitalEomReportLoaded;
export const getAttributionCapitalEomReportError = (state: State) => state.attributionCapitalEomReportError;

export const getAttributionPodCapitalEomReport = (state: State) => state.attributionPodCapitalEomReport;
export const getAttributionPodCapitalEomReportLoading = (state: State) => state.attributionPodCapitalEomReportLoading;
export const getAttributionPodCapitalEomReportLoaded = (state: State) => state.attributionPodCapitalEomReportLoaded;
export const getAttributionPodCapitalEomReportError = (state: State) => state.attributionPodCapitalEomReportError;

export const getReclassifyRepoToggle = (state: State) => state.reclassifyRepo;
export const getExcludeFundingToggle = (state: State) => state.excludeFunding;
export const getIncludeBetaAdjustmentToggle = (state: State) => state.includeBetaAdjustment;

function _enrichData(properties: string[], data: any[]) {
    const enrichData = Object.keys(data).map(key => {
        const element = data[key];

        const enrichElement: any = {};
        properties.forEach((key, index) => {
            enrichElement[key] = element[index];
        });

        if (enrichElement['Level']) {
            enrichElement[enrichElement['Level']] = enrichElement['DisplayName'];
        }
        return enrichElement;
    });

    return enrichData;
}

function _createFakeLeafLevel(leafGrouping: string) {
    return {
        Level: leafGrouping,
        DisplayName: 'NA'
    };
}



