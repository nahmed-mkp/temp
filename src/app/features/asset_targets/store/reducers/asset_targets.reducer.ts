import * as fromModels from './../../models/asset_targets.models';
import * as fromActions from '../actions/asset_targets.actions';
import * as _ from 'lodash';
import { createReducer, on } from '@ngrx/store';
import { E, P } from '@angular/cdk/keycodes';

export interface State {

    params: fromModels.IAssetTargetsParam;
    mode: 'Live' | 'Historical';

    initCalculatorInputs: {},
    editedCalculatorInptus: {},
    calculatorInputs: {},
    calculatorInputsLoading: boolean;
    calculatorInputsLoaded: boolean;
    calculatorInputsError?: string;

    assetType: 'fv'| 'st';
    editorAssetType: 'fv'| 'st';

    initLoadComplete: boolean;

    checkUserAccess: boolean;
    checkUserAccessLoaded: boolean;
    checkUserAccessLoading: boolean;
    checkUserAccessError?: string

    checkUserLimitedAccess: boolean;
    checkUserLimitedAccessLoaded: boolean;
    checkUserLimitedAccessLoading: boolean;
    checkUserLimitedAccessError?: string

    assetTargets: any;
    assetTargetsLoading: boolean;
    assetTargetsLoaded: boolean;
    assetTargetsError?: string;

    editorAssetTargets: any;
    editorAssetTargetsLoading: boolean;
    editorAssetTargetsLoaded: boolean;
    editorAssetTargetsError?: string;

    assetTargetTimeseriesIds: number[];
    assetTargetTimeseriesEntities: {[id: number]: any[]};
    assetTargetTimeseriesLoading: boolean;
    assetTargetTimeseriesLoaded: boolean;
    assetTargetTimeseriesError?: string;
    
    scenarioTargetDashboardData: any;
    scenarioTargetDashboardDataLoading: boolean;
    scenarioTargetDashboardDataLoaded: boolean;
    scenarioTargetDashboardDataError? : string;

    updateTargetPending: boolean;
    updateTargetComplete: boolean;
    updateTargetError?: string;

    scenarioProbabilityDashboardData: any;
    scenarioProbabilityDashboardDataLoading: boolean;
    scenarioProbabilityDashboardDataLoaded: boolean;
    scenarioProbabilityDashboardDataError? : string;

    updateProbabilityPending: boolean;
    updateProbabilityComplete: boolean;
    updateProbabilityError?: string;

    supportedCalculatorCounties: string[];
    supportedCalculatorCountiesLoading: boolean;
    supportedCalculatorCountiesLoaded: boolean;
    supportedCalculatorCountiesError?: string;

    updateSortOrderPending: boolean;
    updateSortOrderComplete: boolean;
    updateSortOrderError?: string;
        
    overridenValues: { country: string, field: string, old_data: any, override_data: any }[]
};

const initialState: State = {
    
    params: { type: 'Latest', showLevels: false, asOfDate: new Date() },
    mode: 'Live',

    initCalculatorInputs: {},
    editedCalculatorInptus: {},
    calculatorInputs: {},
    calculatorInputsLoading: false,
    calculatorInputsLoaded: false,

    assetType: 'fv',
    editorAssetType: 'fv',

    initLoadComplete: false,

    checkUserAccess: false,
    checkUserAccessLoaded: false,
    checkUserAccessLoading: false,

    checkUserLimitedAccess: false,
    checkUserLimitedAccessLoaded: false,
    checkUserLimitedAccessLoading: false,

    assetTargets: {},
    assetTargetsLoading: false,
    assetTargetsLoaded: false,

    editorAssetTargets: {},
    editorAssetTargetsLoading: false,
    editorAssetTargetsLoaded: false,

    assetTargetTimeseriesIds: [],
    assetTargetTimeseriesEntities: {},
    assetTargetTimeseriesLoading: false,
    assetTargetTimeseriesLoaded: false,

    scenarioTargetDashboardData: [],
    scenarioTargetDashboardDataLoading: false,
    scenarioTargetDashboardDataLoaded: false,

    updateTargetPending: false,
    updateTargetComplete: false,

    scenarioProbabilityDashboardData: [],
    scenarioProbabilityDashboardDataLoading: false,
    scenarioProbabilityDashboardDataLoaded: false,

    updateProbabilityPending: false,
    updateProbabilityComplete: false,
    
    updateSortOrderPending: false,
    updateSortOrderComplete: false,

    supportedCalculatorCounties: [],
    supportedCalculatorCountiesLoading: false,
    supportedCalculatorCountiesLoaded: false,

    overridenValues: []
};



export const reducer = createReducer(

    initialState, 

    /* ============== CHECK USER ACCESS =================== */

    on(fromActions.checkUserAccess, (state,action) => {
        return {
            ...state,
            checkUserAccessLoading: true,
            checkUserAccessLoaded: false
        };
    }),

    on(fromActions.checkUserAccessComplete, (state,action) => {
        return {
            ...state,
            checkUserAccess: action.payload,
            checkUserAccessLoading: false,
            checkUserAccessLoaded: true
        };
    }),

    on(fromActions.checkUserAccessFailed, (state,action) => {
        return {
            ...state,
            checkUserAccess: false,
            checkUserAccessLoaded: false,
            checkUserAccessError: action.err
        };
    }),

    /* ============== CHECK USER LIMITED ACCESS =================== */

    on(fromActions.checkUserLimitedAccess, (state,action) => {
        return {
            ...state,
            checkUserLimitedAccessLoading: true,
            checkUserLimitedAccessLoaded: false
        };
    }),

    on(fromActions.checkUserLimitedAccessComplete, (state,action) => {
        return {
            ...state,
            checkUserLimitedAccess: action.payload,
            checkUserLimitedAccessLoading: false,
            checkUserLimitedAccessLoaded: true
        };
    }),

    on(fromActions.checkUserLimitedAccessFailed, (state,action) => {
        return {
            ...state,
            checkUserLimitedAccess: false,
            checkUserLimitedAccessLoaded: false,
            checkUserLimitedAccessError: action.err
        };
    }),

     /* ============== LOAD ASSET TARGETS =================== */

     on(fromActions.loadAssetTargets, (state) => {
        let newParams = Object.assign({}, state.params)
        newParams.type === 'Latest'
        newParams.asOfDate = new Date()
        return {
            ...state,
            mode: 'Live',
            params: newParams,
            assetTargetsLoading: true,
            assetTargetsLoaded: false,
            // params: Object.assign({}, state.params, { type: 'Testing', asOfDate: new Date() }),
       
        };
    }),
    
    /* ============== LOAD TEST ASSET TARGETS =================== */

    on(fromActions.loadTestAssetTargets, (state) => {
        let newParams = Object.assign({}, state.params)
        newParams.type = 'Testing'
        newParams.asOfDate = new Date()
        return {
            ...state,
            mode: 'Live',
            params: newParams,
            assetTargetsLoading: true,
            assetTargetsLoaded: false,
            // params: Object.assign({}, state.params, { type: 'Testing', asOfDate: new Date() }),
       
        };
    }),

    /* ============== LOAD HISTORICAL ASSET TARGETS =================== */


    on(fromActions.loadHistoricalAssetTargets, (state,action) => {
        let newParams = Object.assign({}, state.params)
        newParams.type = 'Historical'
        newParams.asOfDate = action.payload.date
        return {
            ...state,
            params: newParams,
            mode: 'Historical',
            assetTargetsLoading: true,
            assetTargetsLoaded: false,
        };
    }),

    /* ============== CHANGE SHOW LEVELS =================== */


    on(fromActions.changeShowLevel, (state,action) => {
        return {
            ...state,
            params: Object.assign({}, state.params, { showLevels: action.payload }),
            assetTargetsLoading: true,
            assetTargetsLoaded: false,
            assetTargetsError: null          
        };
    }),

  
    /* ============== LOAD EDITOR ASSET TARGETS =================== */
 

    on(fromActions.loadEditorAssetTargets, (state,action) => {
        return {
            ...state,
            editorAssetTargetsLoading: true,
            editorAssetTargetsLoaded: false,
            editorAssetTargetsError: null            
        };
    }),

    on(fromActions.loadEditorAssetTargetsComplete, (state,action) => {
        return {
            ...state,
            editorAssetTargetsLoading: false,
            editorAssetTargetsLoaded: true,
            editorAssetTargets: action.payload        
        };
    }),

    on(fromActions.loadEditorAssetTargetsFailed, (state,action) => {
        return {
            ...state,
            editorAssetTargetsLoading: false,
            editorAssetTargetsLoaded: false,
            editorAssetTargetsError: action.err  
        };
    }),


    /* ============== LOAD EDITOR ASSET TARGETS TIMESERIES =================== */
 
    on(fromActions.loadAssetTargetTimeseries, (state,action) => {
        return {
            ...state,
            assetTargetTimeseriesLoading: true,
            assetTargetTimeseriesLoaded: false,
            assetTargetTimeseriesError: null         
        };
    }),

    on(fromActions.loadAssetTargetTimeseriesComplete, (state,action) => {
        const payload = action.payload;
        const tsIds = payload.map((ts) => ts.securityID);
        const tsEntities = payload.reduce((entities: { [id: number]: any }, entity: any) => {
            return Object.assign({}, entities, {[entity.securityID]: entity});
        }, {});
        return {
            ...state,
            assetTargetTimeseriesLoading: false,
            assetTargetTimeseriesLoaded: true,
            assetTargetTimeseriesIds: [...tsIds],
            assetTargetTimeseriesEntities: tsEntities
        };
    }),


    on(fromActions.loadAssetTargetTimeseriesFailed, (state,action) => {
        return {
            ...state,
            assetTargetTimeseriesLoading: false,
            assetTargetTimeseriesLoaded: true,
            assetTargetTimeseriesError: action.err       
        };
    }),

    /* ============== OVERRIDES =================== */
 
    on(fromActions.overrideAssetTargetProbability, (state,action) => {
        let payload = action.payload;

        let newState = Object.assign({}, state)

        let row = newState.assetTargets.data[payload.country].filter( item => item['SecuritySortOrder'] === -1)[0];
        row[`${payload.field}_override`] = payload.override_data;

        return {
            ...newState,
            overridenValues: [...state.overridenValues, payload]
        }
    }),


    on(fromActions.deleteOverrideProbability, (state,action) => {
        let payload = action.payload;
        let newState = Object.assign({}, state)

        let row = newState.assetTargets.data[payload.country].filter( item => item['SecuritySortOrder'] === -1)[0];
        delete row[`${payload.field}_override`];

        newState.overridenValues.map( (overridePayload, i) => {
            if( (action.payload.field === overridePayload.field) && (action.payload.country === overridePayload.country)){
                newState.overridenValues.splice(i, 1);
            }
        })

        return newState
    }),

    on(fromActions.deleteAllOverrides, (state,action) => {
        let newState = Object.assign({}, state);
        newState.overridenValues.map( overridePayload => {
            let row = newState.assetTargets.data[overridePayload.country].filter( item => item['SecuritySortOrder'] === -1)[0];
            delete row[`${overridePayload.field}_override`]; 
        })
        newState.overridenValues = [];

        return newState;
    }),

    /* ============== LOAD TARGET DASHBOARD =================== */
 
    on(fromActions.loadScenarioTargetDashboardData, (state,action) => {
        return {
            ...state,
            scenarioTargetDashboardDataLoading: true,
            scenarioTargetDashboardDataLoaded: false
        }
    }),

    on(fromActions.loadScenarioTargetDashboardDataComplete, (state,action) => {
        return {
            ...state,
            scenarioTargetDashboardData: action.payload,
            scenarioTargetDashboardDataLoading: false,
            scenarioTargetDashboardDataLoaded: true
        }
    }),

    on(fromActions.loadScenarioTargetDashboardDataFailed, (state,action) => {
        return {
            ...state,
            scenarioTargetDashboardDataLoading: false,
            scenarioTargetDashboardDataLoaded: false, 
            scenarioTargetDashboardDataError: action.err
        }
    }), 

    /* ============== UPDATE TARGET DASHBOARD =================== */

    on(fromActions.updateScenarioTarget, (state,action) => {
        return {
            ...state,
            updateTargetPending: true
        }
    }),

    on(fromActions.updateScenarioTargetComplete, (state,action) => {
        return {
            ...state, 
            updateTargetPending: false,
            updateTargetComplete: true
        }
    }),

    on(fromActions.updateScenarioTargetFailed, (state,action) => {
        return {
            ...state,
            updateTargetPending: false,
            updateTargetError: action.err
        }
    }),

    /* ============== LOAD PROBABILITY DASHBOARD =================== */

    on(fromActions.loadScenarioProbabilityDashboardData, (state,action) => {
        return {
            ...state,
            scenarioProbabilityDashboardDataLoading: true,
            scenarioProbabilityDashboardDataLoaded: false
        }
    }),

    on(fromActions.loadScenarioProbabilityDashboardDataComplete, (state,action) => {
        return {
            ...state,
            scenarioProbabilityDashboardData: action.payload,
            scenarioProbabilityDashboardDataLoading: false,
            scenarioProbabilityDashboardDataLoaded: true
        }
    }),

    on(fromActions.loadScenarioProbabilityDashboardDataFailed, (state,action) => {
        return {
            ...state,
            scenarioProbabilityDashboardDataLoading: false,
            scenarioProbabilityDashboardDataLoaded: false,
            scenarioProbabilityDashboardDataError: action.err
        }
    }),

    /* ============== UPDATE PROBABILITY DASHBOARD =================== */

    on(fromActions.updateScenarioProbability, (state,action) => {
        return {
            ...state,
            updateProbabilityPending: true
        }
    }),

    
    on(fromActions.updateScenarioProbabilityComplete, (state,action) => {
        return {
            ...state, 
            updateProbabilityPending: false,
            updateProbabilityComplete: true
        }
    }),

    on(fromActions.updateScenarioProbabilityFailed, (state,action) => {
        return {
            ...state,
            updateProbabilityPending: false,
            updateProbabilityError: action.err
        }
    }),

    /* ============== UPDATE SORT ORDER =================== */


    on(fromActions.updateScenarioSortOrder, (state,action) => {
        return {
            ...state,
            updateSortOrderPending: true
        }
    }),

    
    on(fromActions.updateScenarioSortOrderComplete, (state,action) => {
        return {
            ...state, 
            updateSortOrderPending: false,
            updateSortOrderComplete: true
        }
    }),

    on(fromActions.updateScenarioSorderOrderFailed, (state,action) => {
        return {
            ...state,
            updateSortOrderPending: false,
            updateSortOrderError: action.err
        }
    }),

    /* =================================== */

    on(
        fromActions.loadAssetTargetsComplete, 
        fromActions.loadHistoricalAssetTargetsComplete,
        fromActions.loadTestAssetTargetsComplete,      
        (state,action) => {
       
        let newState = Object.assign({}, state);
        
        // keep overriden values 
        if(newState.overridenValues.length > 0){
            let assetData = action.payload.data;
            newState.overridenValues.map( overridePayload => {
                let row = assetData[overridePayload.country].filter( row => row['SecuritySortOrder'] === -1)[0];
                row[`${overridePayload.field}_override`] = overridePayload.override_data; 
                let t = 2;
            })
        }
        
        return {
            ...state,
            assetTargetsLoading: false,
            assetTargetsLoaded: true,
            initLoadComplete: true,
            assetTargets: action.payload,
        };
    }),

    /* ================================ */

    on(
        fromActions.loadAssetTargetsFailed, 
        fromActions.loadHistoricalAssetTargetsFailed,
        fromActions.loadTestAssetTargetsFailed,      
        (state,action) => {
       
        return {
            ...state,
            assetTargetsLoading: false,
            assetTargetsLoaded: false,
            assetTargetsError: action.err
        };
    }),

     /* ================= CHANGE ASSET TYPE ============= */
 
     on(fromActions.changeAssetType, (state,action) => {
        return {
            ...state,
            assetType: action.payload
        }
    }),

     
    on(fromActions.changeEditorAssetType, (state,action) => {
        return {
            ...state,
            editorAssetType: action.payload
        }
    }),

    
    /* ================= LOAD CALCULATOR INPUTS ============= */
 

    on(fromActions.loadCalculatorInputsByCountry, (state, action) => {
        return {
            ...state,
            calculatorInputsLoading: true,
            calculatorInputsLoaded: false
        }
    }),

    on(fromActions.loadCalculatorInputsByCountryComplete, (state, action) => {
        let newState = Object.assign({},state.calculatorInputs);
        newState[action.country] = action.res
        return {
            ...state,
            initCalculatorInputs: newState,
            calculatorInputs: newState,
            calculatorInputsLoading: false,
            calculatorInputsLoaded: true
        }
    }),

    on(fromActions.loadCalculatorInputsByCountryFailed, (state, action) => {
        return {
            ...state,
            calculatorInputsLoading: false,
            calculatorInputsLoaded: false,
            calculatorInputsError: action.err
        }
    }),

    on(fromActions.saveEditedCalculatorInputs, (state, action) => {
        let newState = state.editedCalculatorInptus;
        newState[action.payload.country] = action.payload.data;
        return {
            ...state,
            editedCalculatorInptus: newState
        }
    }),

    
    on(fromActions.removeEditedCalculatorInputs, (state, action) => {
        let newState = state.editedCalculatorInptus;
        delete newState[action.country];
        return {
            ...state,
            editedCalculatorInptus: newState
        }
    }),

    /* ================= LOAD SUPPORTED CALCULATOR COUNTRIES ============= */

    on(fromActions.getSupportedCalculatorCountries, (state, action) => {
        return {
            ...state,
            supportedCalculatorCountiesLoading: true,
            supportedCalculatorCountiesLoaded: false
        }
    }),

    on(fromActions.getSupportedCalculatorCountriesComplete, (state, action) => {
        return {
            ...state,
            supportedCalculatorCounties: action.payload,
            supportedCalculatorCountiesLoading: false,
            supportedCalculatorCountiesLoaded: true
        }
    }),

    on(fromActions.getSupportedCalculatorCountriesFailed, (state, action) => {
        return {
            ...state,
            supportedCalculatorCountiesLoading: false,
            supportedCalculatorCountiesLoaded: false,
            supportedCalculatorCountiesError: action.err
        }
    }),
)


export const getUserAccessLevel = (state: State) => state.checkUserAccess;
export const getUserAccessLevelLoading = (state: State) => state.checkUserAccessLoading;
export const getUserAccessLevelLoaded = (state: State) => state.checkUserAccessLoaded;
export const getUserAccessLevelError = (state: State) => state.checkUserAccessError;

export const getUserLimitedAccessLevel = (state: State) => state.checkUserLimitedAccess;
export const getUserLimitedAccessLevelLoading = (state: State) => state.checkUserLimitedAccessLoading;
export const getUserLimitedAccessLevelLoaded = (state: State) => state.checkUserLimitedAccessLoaded;
export const getUserLimitedAccessLevelError = (state: State) => state.checkUserLimitedAccessError;

export const getParams = (state: State) => state.params;
export const getMode = (state: State) => state.mode;

export const getAssetType = (state: State) => state.assetType;
export const getEditorAssetType = (state: State) => state.editorAssetType;

export const getInitLoadComplete = (state: State) => state.initLoadComplete;

export const getAssetTargets = (state: State) => state.assetTargets;
export const getAssetTargetsLoading = (state: State) => state.assetTargetsLoading;
export const getAssetTargetsLoaded = (state: State) => state.assetTargetsLoaded;
export const getAssetTargetsError = (state: State) => state.assetTargetsError;

export const getEditorAssetTargets = (state: State) => state.editorAssetTargets;
export const getEditorAssetTargetsLoading = (state: State) => state.editorAssetTargetsLoading;
export const getEditorAssetTargetsLoaded = (state: State) => state.editorAssetTargetsLoaded;
export const getEditorAssetTargetsError = (state: State) => state.editorAssetTargetsError;

export const getAssetTargetTimeseriesIds = (state: State) => state.assetTargetTimeseriesIds;
export const getAssetTargetTimeseriesEntities = (state: State) => state.assetTargetTimeseriesEntities;
export const getAssetTargetTimeseriesLoading = (state: State) => state.assetTargetTimeseriesLoading;
export const getAssetTargetTimeseriesLoaded = (state: State) => state.assetTargetTimeseriesLoaded;
export const getAssetTargetTimeseriesError = (state: State) => state.assetTargetTimeseriesError;

export const getScenarioTargetDashboardData = (state: State) => state.scenarioTargetDashboardData;
export const getScenarioTargetDashboardDataLoading = (state: State) => state.scenarioTargetDashboardDataLoading;
export const getScenarioTargetDashboardDataLoaded = (state: State) => state.scenarioTargetDashboardDataLoaded;
export const getScenarioTargetDashboardDataFailed = (state: State) => state.scenarioTargetDashboardDataError;

export const getUpdateTargetPending = (state: State) => state.updateTargetPending; 
export const getUpdateTargetCompleted = (state: State) => state.updateTargetComplete;
export const getUpdateTargetFailed = (state: State) => state.updateTargetError;

export const getScenarioProbabilityDashboardData = (state: State) => state.scenarioProbabilityDashboardData;
export const getScenarioProbabilityDashboardDataLoading = (state: State) => state.scenarioProbabilityDashboardDataLoading;
export const getScenarioProbabilityDashboardDataLoaded = (state: State) => state.scenarioProbabilityDashboardDataLoaded;
export const getScenarioProbabilityDashboardDataFailed = (state: State) => state.scenarioProbabilityDashboardDataError;

export const getUpdateProbabilityPending = (state: State) => state.updateProbabilityPending; 
export const getUpdateProbabilityCompleted = (state: State) => state.updateProbabilityComplete;
export const getUpdateProbabilityFailed = (state: State) => state.updateProbabilityError;

export const getUpdateSortOrderPending = (state: State) => state.updateSortOrderPending;
export const getUpdateSortOrderComplete = (state: State) => state.updateSortOrderPending;
export const getUpdateSortOrderFailed = (state: State) => state.updateSortOrderError;

export const getOverridenValues = (state: State) => state.overridenValues;

export const getInitCalculatorInputs = (state: State) => state.initCalculatorInputs;
export const getEditedCalculatorInputs = (state: State) => state.editedCalculatorInptus;
export const getCalculatorInputs = (state: State) => state.calculatorInputs;

export const getCalculatorInputsLoading = (state: State) => state.calculatorInputsLoading;
export const getCalculatorInputsLoaded = (state: State) => state.calculatorInputsLoaded;
export const getCalculatorDataFailed = (state: State) => state.calculatorInputsError;

export const getSupportedCalculatorCounties = (state: State) => state.supportedCalculatorCounties;
export const getSupportedCalculatorCountiesLoading = (state: State) => state.supportedCalculatorCountiesLoading;
export const getSupportedCalculatorCountiesLoaded = (state: State) => state.supportedCalculatorCountiesLoaded;  
export const getSupportedCalculatorCountiesError = (state: State) => state.supportedCalculatorCountiesError;