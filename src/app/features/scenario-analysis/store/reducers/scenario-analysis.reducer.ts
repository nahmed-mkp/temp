import { createReducer, on } from '@ngrx/store';
import * as fromModels from '../../models';
import * as fromActions from '../actions/scenario-analysis.actions';

export interface State {

    tabs: fromModels.ITab[];
    currTab: fromModels.ITab;

    positionsGroupingData: any;
    positionsGroupingDataLoading: boolean;
    positionsGroupingDataLoaded: boolean;
    positionsGroupingDataError?: string;

    positionsLiteData: any;
    positionsLiteDataLoading: boolean;
    positionsLiteDataLoaded: boolean;
    positionsLiteDataError?: string;

    metaData: fromModels.IMetaData;

    importableScenarios: fromModels.IScenarioData;
    importableScenariosLoading: boolean;
    importableScenariosLoaded: boolean;
    importableScenariosError?: string;

    createScenarioLoading: boolean;
    createScenarioLoaded: boolean;
    createScenarioError?: string;

    securityIds: number[];
    securityEntities: {[id: number]: fromModels.ISecurity};

    positionsAndGroupingData: any;

    sidSuggestions: any;
    sidSuggestionsLoading: boolean;
    sidSuggestionsLoaded: boolean;
    sidSuggestionsError?: string;

}

const initialState: State = {

    tabs: [],
    currTab: null,

    positionsGroupingData: null,
    positionsGroupingDataLoading: false,
    positionsGroupingDataLoaded: false,

    positionsLiteData: null,
    positionsLiteDataLoading: false,
    positionsLiteDataLoaded: false,

    metaData: null,

    importableScenarios: null,
    importableScenariosLoading: false,
    importableScenariosLoaded: false,

    createScenarioLoading: false,
    createScenarioLoaded: false,

    securityIds: [],
    securityEntities: {},

    positionsAndGroupingData: [],

    sidSuggestions: [],
    sidSuggestionsLoading: false,
    sidSuggestionsLoaded: false

}

export const reducer = createReducer(

    initialState, 


    /* ========================== LOAD POSITIONS GROUPING ================================ */ 

    on(fromActions.loadPositionsGroupingData, (state) => {
        return {
            ...state,
            positionsGroupingDataLoading: true,
            positionsGroupingDataLoaded: false,
            positionsGroupingDataError: null
        }
    }),

    on(fromActions.loadPositionsGroupingDataComplete, (state, action) => {

        let mergedData = [...state.positionsAndGroupingData];
        
        action.res.forEach(item => {
            item.Id = '1|' + item.FundID + '|' + item.PodID + '|' + item.TID + '|' + item.SID;

            if (primaryGroupingNameIdMaping.fundName[item.FundName] === undefined) {
                primaryGroupingNameIdMaping.fundName[item.FundName] = item.FundID;
            }

            if (primaryGroupingNameIdMaping.podName[item.PodName] === undefined) {
                primaryGroupingNameIdMaping.podName[item.PodName] = item.PodID;
            }

            if (primaryGroupingNameIdMaping.tradeName[item.TradeName] === undefined) {
                primaryGroupingNameIdMaping.tradeName[item.TradeName] = [item.TID];
            } else if (primaryGroupingNameIdMaping.tradeName[item.TradeName].indexOf(item.tid) === -1) {
                primaryGroupingNameIdMaping.tradeName[item.TradeName].push(item.TID);
            }

            // if (primaryGroupingNameIdMaping.securityName[item.securityName] === undefined) {
            //     primaryGroupingNameIdMaping.securityName[item.securityName] = item.sid;
            // }
        });

        if(state.positionsLiteData && action.res.length > 0){
            combinePositionAndGroupingData(state.positionsLiteData, action.res)
        } 

        return {
            ...state,
            positionsGroupingData: action.res,
            positionsGroupingDataLoading: false,
            positionsGroupingDataLoaded: true,
            positionsAndGroupingData: mergedData
        }
    }),
    
    on(fromActions.loadPositionsGroupingDataFailed, (state, action) => {
        return {
            ...state,
            positionsGroupingDataLoading: false,
            positionsGroupingDataLoaded: false,
            positionsGroupingDataError: action.err
        }
    }),


    /* ============================== LOAD POSITIONS ==================================== */ 

    on(fromActions.loadPositionsLiteData, (state) => {
        return {
            ...state,
            positionsLiteDataLoading: true,
            positionsLiteDataLoaded: false,
            positionsLiteDataError: null
        }
    }),

    on(fromActions.loadPositionsLiteDataComplete, (state, action) => {

        let mergedData = [...state.positionsAndGroupingData];

        action.res.forEach(item => {
            item.Id = '1|' + item.fundID + '|' + item.podID + '|' + item.tid + '|' + item.sid;

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


        if(action.res.length > 0 && state.positionsGroupingData){
            mergedData = combinePositionAndGroupingData(action.res, state.positionsGroupingData)
        }

        return {
            ...state,
            positionsLiteData: action.res,
            positionsLiteDataLoading: false,
            positionsLiteDataLoaded: true,
            positionsAndGroupingData: mergedData
        }
    }),
    
    on(fromActions.loadPositionsLiteDataFailed, (state, action) => {
        return {
            ...state,
            positionsLiteDataLoading: false,
            positionsLiteDataLoaded: false,
            positionsLiteDataError: action.err
        }
    }),

    /* ====================================== LOAD SCENARIOS ====================================== */ 

    on(fromActions.loadImportableScenarios, (state) => {
        return {
            ...state,
            importableScenariosLoading: true,
            importableScenariosLoaded: false,
            importableScenariosError: null
        }
    }),

    on(fromActions.loadImportableScenariosComplete, (state, action) => {
        return {
            ...state,
            metaData: action.res.metaData,
            importableScenarios: action.res.scenarios,
            importableScenariosLoading: false,
            importableScenariosLoaded: true
        }
    }),
    
    on(fromActions.loadImportableScenariosFailed, (state, action) => {
        return {
            ...state,
            importableScenariosLoading: false,
            importableScenariosLoaded: false,
            importableScenariosError: action.err
        }
    }),

    /* ====================================== LOAD SCENARIO BY GUID ====================================== */ 

    on(fromActions.loadScenarioByGuidComplete, (state, action) => {
        let updatedTabs = [...state.tabs];
        let updatedTab: fromModels.ITab = {
            scenario: action.res
        }
        updatedTab.scenario.CustomShocks.map( (shock: any,index) => shock.id = index);
        updatedTab.scenario.GeneralShocks.map( (shock: any,index) => shock.id = index);
        updatedTabs.push(updatedTab);
        return {
            ...state,
            tabs: updatedTabs,
            currTab: updatedTab
        }
    }),

    /* ====================================== CREATE SCENARIO ====================================== */ 

    on(fromActions.saveScenario, (state, action) => {
        return {
            ...state,
            createScenarioLoading: true,
            createScenarioLoaded: false,
            createScenarioError: null
        }
    }),

    on(fromActions.saveScenario, (state, action) => {
        let updatedTabs = [...state.tabs];
        let updatedTab: fromModels.ITab = {
            scenario: action.scenario
        }
        updatedTabs.push(updatedTab);
        return {
            ...state,
            tabs: updatedTabs,
            currTab: updatedTab,
            createScenarioLoading: false,
            createScenarioLoaded: true
        }
    }),

    on(fromActions.saveScenarioFailed, (state, action) => {
        return {
            ...state,
            createScenarioLoading: false,
            createScenarioLoaded: false,
            createScenarioError: action.err
        }
    }),

    /* ======================================== TABS ============================================== */ 

    on(fromActions.addNewTab, (state, action) => {
        let updatedTabs  = [...state.tabs];
        updatedTabs.push(action.tab);
        let newCurrTab = state.tabs.find( tab => tab.scenario.guid === action.tab.scenario.guid)
        return {
            ...state,
            tabs: updatedTabs, 
            // currTab: newCurrTab
        }
    }),

    on(fromActions.switchTab, (state, action) => {
        let tabsCopy = [...state.tabs];
        let matchingTab = tabsCopy.find(tab => tab.scenario.Name === action.tabName);
        return {
            ...state,
            currTab: matchingTab,
        }
    }),

    on(fromActions.deleteTab, (state, action) => {
        let tabsCopy = [...state.tabs];
        let newTabs = tabsCopy.filter(tab => tab.scenario.Name !== action.tab.scenario.Name);
        return {
            ...state,
            tabs: newTabs,
            currTab: newTabs[0]
        }
    }),

    /* ======================================== UPDATE SCENARIO ============================================== */   

    on(fromActions.updateGeneralShocks, (state, action) => {
        let updatedTab = Object.assign({}, state.currTab);
        updatedTab.scenario.GeneralShocks = action.shocks;
        return {
            ...state,
            currTab: updatedTab
        }
    }),

    on(fromActions.updateCustomShocks, (state, action) => {
        let updatedTab = Object.assign({}, state.currTab);
        updatedTab.scenario.CustomShocks = action.shocks;
        return {
            ...state,
            currTab: updatedTab
        }
    }),

    on(fromActions.updateDates, (state, action) => {
        let updatedTab = Object.assign({}, state.currTab);
        updatedTab.scenario.Dates = action.dates;
        return {
            ...state,
            currTab: updatedTab
        }
    }),

    /* ======================================== GET SID PROMPTS ============================================== */

    on(fromActions.resetSIDSuggestions, (state) => {
        return {
            ...state,
            sidSuggestions: [],
            sidSuggestionsLoading: false,
            sidSuggestionsLoaded: false,
            sidSuggestionsError: null
        }
    }),

    on(fromActions.getSIDSuggestions, (state) => {
        return {
            ...state,
            sidSuggestionsLoading: true,
            sidSuggestionsLoaded: false,
            sidSuggestionsError: null
        }
    }),

    on(fromActions.getSIDSuggestionsComplete, (state, action) => {
        return {
            ...state,
            sidSuggestions: action.res,
            sidSuggestionsLoading: false,
            sidSuggestionsLoaded: true
        }
    }),

    on(fromActions.getSIDSuggestionsFailed, (state, action) => {
        return {
            ...state,
            sidSuggestionsLoading: false,
            sidSuggestionsLoaded: false,
            sidSuggestionsError: action.err
        }
    })

)


function combinePositionAndGroupingData(positionData, groupingData) {
    if (positionData === undefined) {
        return [];
    }

    if (groupingData && groupingData.length > 0) {
        const groupingMaping: any = {};
        groupingData.forEach(element => groupingMaping[element.Id] = element);
        const combineResult = positionData.map(element => {
            if (groupingMaping[element.Id]) {
                return {...element, ...groupingMaping[element.Id]};  
            } else {
                return element;
            }
        });
        return combineResult;
    } else {
        return positionData;
    }
}

const primaryGroupingNameIdMaping: any = {
    fundName: {},
    // fundName: {'Macro': 2, 'Enhanced: 4}
    podName: {},
    // pod: {'Alpha Port': 12, 'Macro': 15}
    tradeName: {},
    // securityName: {},
};

export const getPositionsGroupingData = (state: State) => state.positionsGroupingData;
export const getPositionsGroupingDataLoading = (state: State) => state.positionsGroupingDataLoading;
export const getPositionsGroupingDataLoaded = (state: State) => state.positionsGroupingDataLoaded;
export const getPositionsGroupingDataError = (state: State) => state.positionsGroupingDataError

export const getPositionsLiteData = (state: State) => state.positionsLiteData;
export const getPositionsLiteDataLoading = (state: State) => state.positionsLiteDataLoading;
export const getPositionsLiteDataLoaded = (state: State) => state.positionsLiteDataLoaded;
export const getPositionsLiteDataError = (state: State) => state.positionsLiteDataError;

export const getImportableScenarios = (state: State) => state.importableScenarios;
export const getMetaData = (state: State) => state.metaData;
export const getImportableScenariosLoading = (state: State) => state.importableScenariosLoading;
export const getImportableScenariosLoaded = (state: State) => state.importableScenariosLoaded;
export const getImportableScenariosErrror = (state: State) => state.importableScenariosError;

export const getPositionsAndGroupingData = (state: State) => state.positionsAndGroupingData;

export const getSIDPrompt = (state: State) => state.sidSuggestions;
export const getSIDPromptLoading = (state: State) => state.sidSuggestionsLoading;
export const getSIDPromptLoaded = (state: State) => state.sidSuggestionsLoaded;
export const getSIDPromptError = (state: State) => state.sidSuggestionsError;

export const getTabs = (state: State) => state.tabs;
export const getCurrTab = (state: State) => state.currTab;

export const getDates = (state: State) => state.currTab  && state.currTab.scenario ? state.currTab.scenario['Dates'] : [];