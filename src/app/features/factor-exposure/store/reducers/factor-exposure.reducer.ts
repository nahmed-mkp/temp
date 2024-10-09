import * as fromActions from '../actions';

export interface FactorExposureState {

    checkUserAccess: boolean;
    checkUserAccessLoaded: boolean;
    checkUserAccessLoading: boolean;
    checkUserAccessError?: string

    activeDate?: string;
    activeDateComplete?: boolean;

    activeGrouping?: string;
    activeGroupingComplete?: boolean;

    primaryGroupingNameIdMaping: any,

    tabs: string[];

    dateDropdown: string[];
    dateDropdownLoaded: boolean;
    dateDropdownLoading: boolean;
    dateDropdownError?: string;

    groupingDropdown: string[];
    groupingDropdownLoaded: boolean;
    groupingDropdownLoading: boolean;
    groupingDropdownError?: string;
 
    factorTabGrid: any[];
    factorTabGridLoading: boolean;
    factorTabGridLoaded: boolean;
    factorTabGridError?: string;

    groupingTabGrid: any[];
    groupingTabGridLoading: boolean;
    groupingTabGridLoaded: boolean;
    groupingTabGridError?: string;

    positionsLiteData: any[];
    positionsLiteDataLoading: boolean;
    positionsLiteDataLoaded: boolean;
    positionsLiteDataError?: string;

    positionsGroupingData: any[];
    positionsGroupingDataLoading: boolean;
    positionsGroupingDataLoaded: boolean;
    positionsGroupingDataError?: string;
    
    positionsAndGroupingData: any[];
    positionsAndGroupingDataLoading: boolean;
    positionsAndGroupingDataLoaded: boolean;
    positionsAndGroupingDataError?: string;

    userSettings: any,
    userSettingsLoading: boolean;
    userSettingsLoaded: boolean;
    userSettingsError?: string;

    useUSDFilter: boolean;
    useBpsToFundFilter: boolean;
    useBpsToPodFilter: boolean;
    useNullSecFilter: boolean;

    timestamp?: string;

}

const initialState: FactorExposureState = {

    checkUserAccess: false,
    checkUserAccessLoading: false,
    checkUserAccessLoaded: false,

    activeDateComplete: false,
    activeGroupingComplete: false,

    dateDropdown: [],
    dateDropdownLoaded: false,
    dateDropdownLoading: false,

    primaryGroupingNameIdMaping: {},

    tabs: [],

    groupingDropdown: [],
    groupingDropdownLoaded: false,
    groupingDropdownLoading: false,

    factorTabGrid: [],
    factorTabGridLoading: false,
    factorTabGridLoaded: false,

    groupingTabGrid: [],
    groupingTabGridLoading: false,
    groupingTabGridLoaded: false,

    positionsLiteData: [],
    positionsLiteDataLoading: false,
    positionsLiteDataLoaded: false,

    positionsGroupingData: [],
    positionsGroupingDataLoading: false,
    positionsGroupingDataLoaded: false,

    positionsAndGroupingData:[],
    positionsAndGroupingDataLoading: false,
    positionsAndGroupingDataLoaded: false, 

    useUSDFilter: true,
    useBpsToFundFilter: false,
    useBpsToPodFilter: false,
    useNullSecFilter: false,

    userSettings: {},
    userSettingsLoading: false,
    userSettingsLoaded: false
};


export function reducer(state = initialState, action: fromActions.FactorExposureActions): FactorExposureState {

    switch (action.type) {

        case fromActions.FactorExposureActionTypes.CHECK_USER_ACCESS: {
            return {
                ...state,
                checkUserAccessLoading: true,
                checkUserAccessLoaded: false
            };
        }

        case fromActions.FactorExposureActionTypes.CHECK_USER_ACCESS_COMPLETE: {
            return {
                ...state,
                checkUserAccess: action.payload,
                checkUserAccessLoading: false,
                checkUserAccessLoaded: true
            };
        }

        case fromActions.FactorExposureActionTypes.CHECK_USER_ACCESS_FAILED: {
            return {
                ...state,
                checkUserAccess: false,
                checkUserAccessLoaded: false,
                checkUserAccessError: action.payload
            };
        }

        /* ============================================== */

        case fromActions.FactorExposureActionTypes.SET_ACTIVE_DATE_COMPLETE: {
            return {
                ...state,
                activeDate: action.payload
            }
        }

        case fromActions.FactorExposureActionTypes.SET_ACTIVE_GROUPING_COMPLETE: {
            return {
                ...state,
                activeGrouping: action.payload
            }
        }
 
        /* ============================================== */

        case fromActions.FactorExposureActionTypes.LOAD_DROPDOWN_DATES: {
            return {
                ...state,
                dateDropdownLoading: true,
                dateDropdownLoaded: false
            };
        }
  
        case fromActions.FactorExposureActionTypes.LOAD_DROPDOWN_DATES_COMPLETE: {
            return {
                ...state,
                dateDropdown: action.payload,
                dateDropdownLoading: false,
                dateDropdownLoaded: true
            };
        }

        case fromActions.FactorExposureActionTypes.LOAD_DROPDOWN_DATES_FAILED: {
            return {
                ...state,
                dateDropdownLoading: false,
                dateDropdownLoaded: false,
                dateDropdownError: action.payload
            };
        }

        
        /* ============================================== */

        case fromActions.FactorExposureActionTypes.ADD_NEW_TAB_GROUPING: {
            if(! state.tabs.includes(action.payload)){
                return {
                    ...state,
                    tabs: [... state.tabs, action.payload]
                };
            } else {
                return {...state}
            }
        }

        /* ============================================== */

          case fromActions.FactorExposureActionTypes.REMOVE_TAB_GROUPING: {
            if(! state.tabs.includes(action.payload)){
                let newTabs = [...state.tabs];
                let index = newTabs.indexOf(action.payload);
                if(index !== -1){
                    newTabs.splice(index, 1);
                }
                return {
                    ...state,
                    tabs: newTabs
                };
            } else {
                return {...state}
            }
        }

        /* ============================================== */

        case fromActions.FactorExposureActionTypes.LOAD_DROPDOWN_GROUPINGS: {
            return {
                ...state,
                groupingDropdownLoading: true,
                groupingDropdownLoaded: false
            };
        }

        case fromActions.FactorExposureActionTypes.LOAD_DROPDOWN_GROUPINGS_COMPLETE: {
            return {
                ...state,
                groupingDropdown: action.payload,
                groupingDropdownLoading: false,
                groupingDropdownLoaded: true
            };
        }

        case fromActions.FactorExposureActionTypes.LOAD_DROPDOWN_GROUPINGS_FAILED: {
            return {
                ...state,
                groupingDropdownLoading: false,
                groupingDropdownLoaded: false,
                groupingDropdownError: action.payload
            };
        }

        /* ============================================== */

      
        case fromActions.FactorExposureActionTypes.LOAD_FACTORS_TAB_GRID_DATA: {
            return {
                ...state,
                factorTabGridLoaded: false,
                factorTabGridLoading: true
            };
        }

        case fromActions.FactorExposureActionTypes.LOAD_FACTORS_TAB_GRID_DATA_COMPLETE: {
            return {
                ...state,
                factorTabGrid: action.payload,
                factorTabGridLoaded: true,
                factorTabGridLoading: false,
            };
        }

        case fromActions.FactorExposureActionTypes.LOAD_FACTORS_TAB_GRID_DATA_FAILED: {
            return {
                ...state,
                factorTabGridLoaded: false,
                factorTabGridLoading: false,
                factorTabGridError: action.payload
            };
        }  

        
        /* ============================================== */


        case fromActions.FactorExposureActionTypes.LOAD_GROUPING_TAB_GRID_DATA: {
            return {
                ...state,
                groupingTabGridLoaded: false,
                groupingTabGridLoading: true
            };
        }

        case fromActions.FactorExposureActionTypes.LOAD_GROUPING_TAB_GRID_DATA_COMPLETE: {
           
            // if the grouping doesn't exist, append to the store ... otherwise update the value
            let newState = [...state.groupingTabGrid]
            let addItem = true;
            const newItem = {'grouping': action.grouping, 'data': action.payload}

            if(newState.length === 0){
                newState.push(newItem);
            } else {
                let matchedIndex = newState.findIndex( tab => tab.grouping && (tab.grouping === newItem.grouping));
                if(matchedIndex !== -1){
                    newState.splice(matchedIndex, 1, newItem)
                    addItem = false;
                }
                if(addItem){
                    newState.push(newItem)
                }
            }

            return {
                ...state,
                groupingTabGrid: newState,
                groupingTabGridLoaded: true,
                groupingTabGridLoading: false,
            };
        }

        case fromActions.FactorExposureActionTypes.LOAD_GROUPING_TAB_GRID_DATA_FAILED: {
            return {
                ...state,
                groupingTabGridLoaded: false,
                groupingTabGridLoading: false,
                groupingTabGridError: action.payload
            };
        }
        
        
        /* ============================================== */


        case fromActions.FactorExposureActionTypes.SET_TIMESTAMP: {
            return {
                ...state,
                timestamp: action.payload
            };
        }


        /* ============================================== */

        
        case fromActions.FactorExposureActionTypes.LOAD_POSITIONS_LITE_DATA: {
            return {
                ...state,
                positionsLiteDataLoaded: false,
                positionsLiteDataLoading: true,
                positionsAndGroupingDataLoading: true
            };
        }

        case fromActions.FactorExposureActionTypes.LOAD_POSITIONS_LITE_DATA_COMPLETE: {

            
            let addItem = true;
            const newItem = {'grouping': state.activeGrouping, 'data': action.payload}
            let newState = [...state.positionsLiteData]

            if(newState.length === 0){
                newState.push(newItem);
            }
            else {
                let matchedIndex = newState.findIndex( tab => tab.grouping && (tab.grouping === newItem.grouping));
                if(matchedIndex !== -1){
                    newState.splice(matchedIndex, 1, newItem)
                    addItem = false;
                }
                if(addItem){
                    newState.push(newItem)
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

            action.payload.forEach(item => {
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

     
            let selectedPositionsGroupingData =  [];
            const selectedPositionsGrouping = state.positionsGroupingData.find(item => item.grouping === state.activeGrouping);
            if(selectedPositionsGrouping){
                selectedPositionsGroupingData = selectedPositionsGrouping.data;
            }


            const combineData = () => {
                return combinePositionAndGroupingData(action.payload, selectedPositionsGroupingData);
            }


            let addLinearItem = true;
            const newLinearItem = {'grouping': state.activeGrouping, 'data': combineData()}
            let newLinearState = [...state.positionsAndGroupingData]

            if(newLinearState.length === 0){
                newLinearState.push(newLinearItem);
            }
            else {
                let matchedIndex = newLinearState.findIndex( tab => tab.grouping && (tab.grouping === newLinearItem.grouping));
                if(matchedIndex !== -1){
                    newLinearState.splice(matchedIndex, 1, newLinearItem)
                    addLinearItem = false;
                }
                if(addLinearItem){
                    newLinearState.push(newLinearItem)
                }
            }


            return {
                ...state,
                primaryGroupingNameIdMaping: {
                    ...state.primaryGroupingNameIdMaping, 
                    [state.activeGrouping]: Object.assign({}, state.primaryGroupingNameIdMaping[state.activeGrouping], primaryGroupingNameIdMaping)
                },
                positionsLiteData: newState,
                positionsLiteDataLoaded: true,
                positionsLiteDataLoading: false,
                positionsAndGroupingData: newLinearState,
                positionsAndGroupingDataLoaded: state.positionsGroupingDataLoaded && true

            };
        }

        case fromActions.FactorExposureActionTypes.LOAD_POSITIONS_LITE_DATA_FAILED: {
            return {
                ...state,
                positionsLiteDataLoaded: false,
                positionsLiteDataLoading: false,
                positionsLiteDataError: action.payload
            };
        } 
        

        /* ============================================== */

        
        case fromActions.FactorExposureActionTypes.LOAD_POSITIONS_GROUPING: {
            return {
                ...state,
                positionsGroupingDataLoaded: false,
                positionsGroupingDataLoading: true,
                positionsAndGroupingDataLoading: true
            };
        }

        case fromActions.FactorExposureActionTypes.LOAD_POSITIONS_GROUPING_COMPLETE: {

            let addItem = true;
            const newItem = {'grouping': state.activeGrouping, 'data': action.payload}
            let newState = [...state.positionsLiteData]
            
            if(newState.length === 0){
                newState.push(newItem);
            }
            else {
                let matchedIndex = newState.findIndex( tab => tab.grouping && (tab.grouping === newItem.grouping));
                if(matchedIndex !== -1){
                    newState.splice(matchedIndex, 1, newItem)
                    addItem = false;
                }
                if(addItem){
                    newState.push(newItem)
                }
            }

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

            action.payload.forEach(item => {
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


           
            let selectedPositionsLiteData = [];
            const selectedPositionsLite = state.positionsAndGroupingData.find(item => item.grouping === state.activeGrouping);
            if(selectedPositionsLite){
                selectedPositionsLiteData = selectedPositionsLite.data;
            }
            const selectedPositionsGroupingData = action.payload;

            const combineData = () => {
                return combinePositionAndGroupingData(selectedPositionsLiteData, action.payload);
            }

            // prevent duplicate keys 
            let addLinearItem = true;
            const newLinearItem = {'grouping': state.activeGrouping, 'data': combineData()}
            let newLinearState = [...state.positionsAndGroupingData]

            if(newLinearState.length === 0){
                newLinearState.push(newLinearItem);
            }
            else {
                let matchedIndex = newLinearState.findIndex( tab => tab.grouping && (tab.grouping === newLinearItem.grouping));
                if(matchedIndex !== -1){
                    newLinearState.splice(matchedIndex, 1, newLinearItem)
                    addLinearItem = false;
                }
                if(addLinearItem){
                    newLinearState.push(newLinearItem)
                }
            }

            return {
                ...state,
                primaryGroupingNameIdMaping: {
                    ...state.primaryGroupingNameIdMaping, 
                    [state.activeGrouping]: Object.assign({}, state.primaryGroupingNameIdMaping[state.activeGrouping], primaryGroupingNameIdMaping)
                },
                positionsGroupingData: newState,
                positionsGroupingDataLoaded: true,
                positionsGroupingDataLoading: false,
                positionsAndGroupingData: newLinearState,
                positionsAndGroupingDataLoaded: state.positionsLiteDataLoaded && true
            };
        }

        case fromActions.FactorExposureActionTypes.LOAD_POSITIONS_GROUPING_FAILED: {
            return {
                ...state,
                positionsGroupingDataLoaded: false,
                positionsGroupingDataLoading: false,
                positionsGroupingDataError: action.payload
            }
        }
        /* ============================================== */

        case fromActions.FactorExposureActionTypes.APPLY_USD_FILTER: {
            return {
                ...state,
                useUSDFilter: true
            }
        }

        case fromActions.FactorExposureActionTypes.REMOVE_USD_FILTER: {
            return {
                ...state,
                useUSDFilter: false
            }
        }

        case fromActions.FactorExposureActionTypes.APPLY_BPS_TO_FUND_FILTER : {
            return {
                ...state,
                useBpsToFundFilter: true
            }
        }

        case fromActions.FactorExposureActionTypes.REMOVE_BPS_TO_FUND_FILTER: {
            return {
                ...state,
                useBpsToFundFilter: false
            }
        }
        
        case fromActions.FactorExposureActionTypes.APPLY_BPS_TO_POD_FILTER : {
            return {
                ...state,
                useBpsToPodFilter: true
            }
        }

        case fromActions.FactorExposureActionTypes.REMOVE_BPS_TO_POD_FILTER: {
            return {
                ...state,
                useBpsToPodFilter: false
            }
        }

        case fromActions.FactorExposureActionTypes.APPLY_NULL_SEC_FILTER: {
            return {
                ...state,
                useNullSecFilter: true
            }
        }

        case fromActions.FactorExposureActionTypes.REMOVE_NULL_SEC_FILTER: {
            return {
                ...state,
                useNullSecFilter: false
            }
        }


        /* ============================================== */


        // case fromActions.FactorExposureActionTypes.LOAD_SETTINGS:
            
        case fromActions.FactorExposureActionTypes.SAVE_SETTINGS: {
            return {
                ...state,
                userSettingsLoading: true,
                userSettingsLoaded: false,
                userSettingsError: null
            };
        }

        case fromActions.FactorExposureActionTypes.LOAD_SETTINGS_COMPLETE:
        case fromActions.FactorExposureActionTypes.SAVE_SETTINGS_COMPLETE: {
            return {
                ...state,
                userSettings: action.payload,
                userSettingsLoading: false,
                userSettingsLoaded: true,
            };
        }

        case fromActions.FactorExposureActionTypes.LOAD_GROUPING_TAB_GRID_DATA_FAILED:
        case fromActions.FactorExposureActionTypes.SAVE_SETTINGS_FAILED: {
            return {
                ...state,
                userSettingsError: action.payload,
                userSettingsLoading: false,
                userSettingsLoaded: false,
            };
        }  

        /* ============================================== */


        case fromActions.FactorExposureActionTypes.SET_TIMESTAMP: {
            return {
                ...state,
                timestamp: action.payload
            };
        }

        default: {
            return state;
        }
    }
}

function combinePositionAndGroupingData(positionData, groupingData) {

    if (positionData === undefined) {
        return [];
    }

    if (groupingData && groupingData.length > 0) {
        const groupingMaping: any = {};
        groupingData.forEach(element => { 
            return groupingMaping[element.Id] = element
        });

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


export const getUserAccessLevel = (state: FactorExposureState) => state.checkUserAccess;
export const getUserAccessLevelLoading = (state: FactorExposureState) => state.checkUserAccessLoading;
export const getUserAccessLevelLoaded = (state: FactorExposureState) => state.checkUserAccessLoaded;
export const getUserAccessLevelError = (state: FactorExposureState) => state.checkUserAccessError;

export const getActiveDate = (state: FactorExposureState) => state.activeDate;
export const getActiveDateSet = (state: FactorExposureState) => state.activeDateComplete;

export const getActiveGrouping = (state: FactorExposureState) => state.activeGrouping;
export const getActiveGroupingSet = (state: FactorExposureState) => state.activeGroupingComplete;

export const getTabs = (state:FactorExposureState) => state.tabs;

export const getDateDropdown = (state: FactorExposureState) => state.dateDropdown;
export const getDateDropdownLoading = (state: FactorExposureState) => state.dateDropdownLoading;
export const getDateDropdownLoaded = (state: FactorExposureState) => state.dateDropdownLoaded;
export const getDateDropdownError = (state: FactorExposureState) => state.dateDropdownError;

export const getGroupingDropdown = (state: FactorExposureState) => state.groupingDropdown;
export const getGroupingDropdownLoading = (state: FactorExposureState) => state.groupingDropdownLoading;
export const getGroupingDropdownLoaded = (state: FactorExposureState) => state.groupingDropdownLoaded;
export const getGroupingDropdownError = (state: FactorExposureState) => state.groupingDropdownError;

export const getFactorsTab = (state: FactorExposureState) => state.factorTabGrid;
export const getFactorsTabLoading = (state: FactorExposureState) => state.factorTabGridLoading;
export const getFactorsTabLoaded = (state: FactorExposureState) => state.factorTabGridLoaded;
export const getFactorsTabError = (state: FactorExposureState) => state.factorTabGridError;

export const getGroupingTab = (state: FactorExposureState) => state.groupingTabGrid;
export const getGroupingTabLoading = (state: FactorExposureState) => state.groupingTabGridLoading;
export const getGroupingTabLoaded = (state: FactorExposureState) => state.groupingTabGridLoaded;
export const getGroupingTabError = (state: FactorExposureState) => state.groupingTabGridError;

export const getPositionsLiteData = (state: FactorExposureState) => state.positionsLiteData;
export const getPositionsLiteDataLoading = (state: FactorExposureState) => state.positionsGroupingDataLoading;
export const getPositionsLiteDataLoaded = (state: FactorExposureState) => state.positionsLiteDataLoaded;
export const getPositionsLiteDataError = (state: FactorExposureState) => state.positionsLiteDataError;

export const getPositionsGroupingData = (state: FactorExposureState) => state.positionsGroupingData;
export const getPositionsGroupingDataLoading = (state: FactorExposureState) => state.positionsGroupingDataLoading;
export const getPositionsGroupingDataLoaded = (state: FactorExposureState) => state.positionsGroupingDataLoaded;
export const getPositionsGroupingDataError = (state: FactorExposureState) => state.positionsGroupingDataError;

export const getPositionsAndGroupingData = (state: FactorExposureState) => state.positionsAndGroupingData;
export const getPositionsAndGroupingDataLoading = (state: FactorExposureState) => state.positionsAndGroupingDataLoading;
export const getPositionsAndGroupingDataLoaded = (state: FactorExposureState) => state.positionsAndGroupingDataLoaded;

export const getUSDFilterStatus = (state: FactorExposureState) => state.useUSDFilter;
export const getBpsToFundFilterStatus = (state: FactorExposureState) => state.useBpsToFundFilter;
export const getBpsToPodFilterStatus = (state: FactorExposureState) => state.useBpsToPodFilter;
export const getNullSecFilterStatus = (state: FactorExposureState) => state.useNullSecFilter;

export const getUserSettings = (state: FactorExposureState) => state.userSettings;
export const getUserSettingsLoading = (state: FactorExposureState) => state.userSettingsLoading;
export const getUserSettingsLoaded = (state: FactorExposureState) => state.userSettingsLoaded;
export const getUserSettingsError = (state: FactorExposureState) => state.userSettingsError;
export const getTimestamp = (state: FactorExposureState) => state.timestamp;
export const getPrimaryGroupingNameAndIdMaping = (state: FactorExposureState) => state.primaryGroupingNameIdMaping;
