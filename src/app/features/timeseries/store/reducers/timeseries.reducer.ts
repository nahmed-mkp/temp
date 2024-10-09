import { createReducer, on } from '@ngrx/store';

import * as fromActions from '../actions/timeseries.actions';
import * as fromModels from './../../models/timeseries.models';
import moment from 'moment';
import uuidv1 from 'uuid/v1';
import { T } from '@angular/cdk/keycodes';



export interface State {

    tabs: fromModels.ITab[];
    currTab: fromModels.ITab;

    startDate: Date;
    endDate: Date;

    timeseriesHierarchy: any[];
    timeseriesHierarchyLoading: boolean;
    timeseriesHierarchyLoaded: boolean;
    timeseriesHierarchyError?: string;

    createPortfolio: fromModels.IPortfolio,
    createPortfolioLoaded: boolean,
    createPortfolioLoading: boolean;
    createPortfolioError?: string;

    updatePortfolio: fromModels.IPortfolio,
    updatePortfolioLoading: boolean,
    updatePortfolioLoaded: boolean,
    updatePortfolioError?: string,

    importableTimeseriesPortfolios: {
        shared: fromModels.IPortfolio[],
        personal: fromModels.IPortfolio[]
    }
    importableTimeseriesPortfoliosLoading: boolean;
    importableTimeseriesPortfoliosLoaded: boolean;
    importableTimeseriesPortfoliosError?: string;

    selectedDrawdownTimeseriesRow: any;

    loadPortfolioFromUrlLoading: boolean,
    loadPortfolioFromUrlLoaded: boolean,
    loadPortfolioFromURLFailed?: string,

    scratchpadDeleted: boolean
}

let localStorageItem: fromModels.ILocalStorageItem = {
    startDate: localStorage.getItem('timeseriesStoreLite') ? JSON.parse(localStorage.getItem('timeseriesStoreLite')).startDate : moment(new Date()).subtract('M', 6).format('MM-DD-YYYY'),
    currPortfolio: localStorage.getItem('timeseriesStoreLite') ? JSON.parse(localStorage.getItem('timeseriesStoreLite')).currPortfolio : null,
    portfolios: localStorage.getItem('timeseriesStoreLite') ? JSON.parse(localStorage.getItem('timeseriesStoreLite')).portfolios : []
}

const initialState: State = {

    tabs: [],

    currTab: null,
    startDate: new Date(moment(new Date()).subtract('M', 6).format('MM-DD-YYYY')),
    endDate:new Date(moment(new Date()).format('MM-DD-YYYY')),

    timeseriesHierarchy: [],
    timeseriesHierarchyLoading: false,
    timeseriesHierarchyLoaded: false,    

    createPortfolio: null,
    createPortfolioLoading: false,
    createPortfolioLoaded: false,

    updatePortfolio: null,
    updatePortfolioLoading: false,
    updatePortfolioLoaded: false,

    importableTimeseriesPortfolios: { shared: [], personal: [] },
    importableTimeseriesPortfoliosLoading: false,
    importableTimeseriesPortfoliosLoaded: false,

    selectedDrawdownTimeseriesRow: null,

    loadPortfolioFromUrlLoading: false,
    loadPortfolioFromUrlLoaded: false,
    
    scratchpadDeleted: false
};

export const reducer = createReducer(

    initialState, 

    /* ================================== TABS  ================================================= */

    on(fromActions.addTab, (state,action) => {

        let updatedTabs = [...state.tabs];

        // avoid duplicate tabs 
        if(! (updatedTabs.find(tab => tab.portfolio.guid === action.tab.portfolio.guid))){
            updatedTabs.push(action.tab);
        }

        let newCurrTab = updatedTabs.find( tab => tab.portfolio.guid === action.tab.portfolio.guid);

        // add tab to local storage
        let localStoragePortfolios: fromModels.IPortfolioLite[] = [];
        updatedTabs.map(tab => {
            localStoragePortfolios.push({
                guid: tab.portfolio.guid,
                name: tab.portfolio.name,
                user: tab.portfolio.user,
                isShared: tab.portfolio.isShared,
                timeseries: []
            });
        })
        localStorageItem.portfolios = localStoragePortfolios;
        localStorageItem.currPortfolio = {
            guid: newCurrTab.portfolio.guid,
            name: newCurrTab.portfolio.name,
            user: newCurrTab.portfolio.user,
            isShared: newCurrTab.portfolio.isShared,
            timeseries: []
        }
        localStorage.setItem('timeseriesStoreLite', JSON.stringify(localStorageItem));
        return ({
            ...state,
            tabs: updatedTabs,
            currTab: newCurrTab,
        })
    }),

    on(fromActions.addTabFromLocalStorage, (state,action) => {
        let updatedTabs = [...state.tabs];
        // avoid duplicate tabs 
        if(!updatedTabs.find(tab => tab.portfolio.guid === action.tab.portfolio.guid)){
            updatedTabs.push(action.tab);
        }

        let newCurrTab = updatedTabs.find( tab => tab.portfolio.guid === action.tab.portfolio.guid);
        return ({
            ...state,
            tabs: updatedTabs,
            currTab: newCurrTab,
        })
    }),

    on(fromActions.switchTab, (state,action) => {
        let tabsCopy = [...state.tabs];
        let matchingTab = tabsCopy.find(tab => tab.portfolio.name === action.tabName);
        // change curr tab in local storage
        if(matchingTab.portfolio.timeseries.length !== 0){
            localStorageItem.currPortfolio = {
                guid: matchingTab.portfolio.guid,
                name: matchingTab.portfolio.name,
                user: matchingTab.portfolio.user,
                isShared: matchingTab.portfolio.isShared,
                timeseries: []
            }
            localStorage.setItem('timeseriesStoreLite', JSON.stringify(localStorageItem));
        }
        
        return ({
            ...state,
            currTab: matchingTab,
            selectedDrawdownTimeseriesRow: null
        })
    }),

    on(fromActions.deletePortfolioTab, (state,action) => {
        let deleted_tab_guid = action.tab.portfolio.guid;
        let new_tabs = [...state.tabs]

        state.tabs.map( (tab,idx) => {
            if(tab.portfolio.guid === deleted_tab_guid){
                if(new_tabs.length === 1){
                    new_tabs = [];
                    localStorageItem.portfolios = [];
                    localStorageItem.currPortfolio = null;
                } else {
                    new_tabs.splice(idx, 1) 
                    new_tabs.map(tab => {
                        let localStoragePortfolios: fromModels.IPortfolioLite[] = [];
                        localStoragePortfolios.push({
                            guid: tab.portfolio.guid,
                            name: tab.portfolio.name,
                            isShared: tab.portfolio.isShared,
                            user: tab.portfolio.user,
                            timeseries: []
                        });
                        localStorageItem.currPortfolio = {
                            guid: new_tabs[0].portfolio.guid,
                            name: new_tabs[0].portfolio.name,
                            isShared: new_tabs[0].portfolio.isShared,
                            user: new_tabs[0].portfolio.user,
                            timeseries: []
                        }
                        localStorageItem.portfolios = localStoragePortfolios;
                    })
                }
            }
        })

        localStorage.setItem('timeseriesStoreLite', JSON.stringify(localStorageItem));  
        return ({
            ...state,
            tabs: new_tabs,
            currTab: new_tabs[0]
        })
    }),

    /* ============================= UPDATE DATE RANGE ========================================== */

    on(fromActions.updateStartDate, (state,action) => {
        localStorageItem.startDate = moment(action.startDate).format('MM-DD-YYYY');
        localStorage.setItem('timeseriesStoreLite', JSON.stringify(localStorageItem));
        return ({
            ...state,
            startDate: action.startDate
        })
    }),

    on(fromActions.updateEndDate, (state,action) => {
        return ({
            ...state,
            endDate: action.endDate
        })
    }),

    /* ============================== LOAD TIMESERIES NAVIGATION NODES ========================== */
    
    on(fromActions.loadTimeseriesHierarchyData, (state, action) => ({
        ...state,
        timeseriesHierarchyLoading: true,
        timeseriesHierarchyLoaded: false,
        timeseriesHierarchyError: null
    })),    

    on(fromActions.loadTimeseriesHierarchyDataComplete, (state, action) => ({
        ...state, 
        timeseriesHierarchy: action.payload,
        timeseriesHierarchyLoading: false,
        timeseriesHierarchyLoaded: true
    })),
    
    on(fromActions.loadTimeseriesHierarchyDataFailed, (state, action) => ({
        ...state,
        timeseriesHierarchyLoading: false,
        timeseriesHierarchyLoaded: false,
        timeseriesHierarchyError: action.payload
    })),    

    /* ============================ TIMESERIES SELECTION ============================= */

    on(fromActions.selectTimeseriesfromNav, (state, action) => {

        let updatedTab = Object.assign({},state.currTab);
        let timeseries = action.payload;
        let isAutoGen: boolean = Object.keys(updatedTab).length === 0;

        // if portfolio does not exist , auto-gen one and store in local storage
        if(isAutoGen){

            let userName = JSON.parse(localStorage.getItem('currentUser')).ntName;
            let suffix = 1;
            let allPortfolios = [...state.importableTimeseriesPortfolios.personal].concat([...state.importableTimeseriesPortfolios.shared]);
            
            allPortfolios.map( portfolio => { 
                if(portfolio.name === `${userName}-${suffix}`){
                    suffix++;
                }
            })  

            timeseries.variable = 'A';

            let newTab: fromModels.ITab = {
                portfolio: {
                    guid: uuidv1(),
                    name: `${userName}-${suffix}`,
                    user: JSON.parse(localStorage.getItem('currentUser')).ntName,
                    isShared: false,
                    timeseries: [action.payload]
                },
                regressionViewMode: 'regression',
            }
            updatedTab = newTab;
        } else {
            let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
            

            let existingVariables = updatedTab.portfolio.timeseries ? updatedTab.portfolio.timeseries.map(ts => ts.variable) : [];
            let existingDerviedVariables = updatedTab.portfolio.derivedTimeseries ? updatedTab.portfolio.derivedTimeseries.map(ts => ts.variable) : [];
            let allVariables = existingVariables.concat(existingDerviedVariables);
            let newVariable = alphabet.filter( letter => !allVariables.includes(letter))[0];

            timeseries.variable = newVariable;
            updatedTab.portfolio.timeseries.push(action.payload);
        }

        let newPortfolioLite: fromModels.IPortfolioLite = {
            guid: updatedTab.portfolio.guid,
            name: updatedTab.portfolio.name,
            user: updatedTab.portfolio.user,
            isShared: updatedTab.portfolio.isShared,
            timeseries: []
        }
        localStorageItem.portfolios = [newPortfolioLite];
        localStorageItem.currPortfolio = newPortfolioLite
        localStorage.setItem('timeseriesStoreLite', JSON.stringify(localStorageItem));
    
        return ({
            ...state,
            tabs: isAutoGen ? [updatedTab] : state.tabs,
            currTab: updatedTab,
        })
        
    }),

    on(fromActions.createDerivedTimeseries, (state, action) => {   
        let updatedTab = Object.assign({}, state.currTab);
        let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
        let existingVariables = updatedTab.portfolio.timeseries ? updatedTab.portfolio.timeseries.map(ts => ts.variable) : [];
        let existingDerviedVariables = updatedTab.portfolio.derivedTimeseries ? updatedTab.portfolio.derivedTimeseries.map(ts => ts.variable) : [];
        let allVariables = existingVariables.concat(existingDerviedVariables);
        let newVariable = alphabet.filter( letter => !allVariables.includes(letter))[0];
        let newDerivedTimeseries: fromModels.IDerivedTimeseries = {
            variable: newVariable,
            alias: action.payload.alias,
            expression: action.payload.expression,
            axis: action.payload.axis,
            regression: action.payload.regression,
            label: action.payload.label
        }
        if(!updatedTab.portfolio.derivedTimeseries){
            updatedTab.portfolio.derivedTimeseries = [newDerivedTimeseries];
        } else {
            updatedTab.portfolio.derivedTimeseries.push(newDerivedTimeseries);
        }
        return ({
            ...state,
            currTab: updatedTab
        })
    }),

    /* ============================== LOAD TIMESERIES CHART DATA ============================= */

    on(fromActions.loadPortfolioTimeseriesData, (state, action) => {
        let updatedTab: fromModels.ITab = Object.assign({}, state.currTab)
        updatedTab.chartData = [];
        updatedTab.chartDataLoading = true;
        updatedTab.chartDataLoaded = false
        return {
            ...state,
            currTab: updatedTab,

        }
    }),

    on(fromActions.loadPortfolioTimeseriesDataComplete, (state, action) => {
        let updatedTab: fromModels.ITab = Object.assign({}, state.currTab)
        updatedTab.chartData = [...action.data]
        updatedTab.chartDataLoading = false;
        updatedTab.chartDataLoaded = true;
        return { 
            ...state,
            currTab: updatedTab
        }
    }),

    on(fromActions.loadPortfolioTimeseriesDataFailed, (state, action) => {
        let updatedTab: fromModels.ITab = Object.assign({}, state.currTab)
        updatedTab.chartDataError = action.payload;
        updatedTab.chartDataLoading = false;
        updatedTab.chartDataLoaded = true
        return {
            ...state,
            currTab: updatedTab   
        }
    }),
    
    /* ================================ LOAD TIMESERIES STATISTICS ========================== */

    on(fromActions.loadTimeseriesStatsData, (state, action) => {
        let updatedTab: fromModels.ITab = Object.assign({}, state.currTab)
        updatedTab.statDataLoading = true;
        updatedTab.statDataLoaded = false;
        return {
            ...state, 
            currTab: updatedTab,
        }
    }),    
    
    on(fromActions.loadTimeseriesStatsDataComplete, (state, action) => {
        let updatedTab: fromModels.ITab = Object.assign({}, state.currTab)
        
        updatedTab.statData = action.data;
        updatedTab.statDataLoading = false;
        updatedTab.statDataLoaded = true;
        return {
            ...state, 
            currTab: updatedTab,
            selectedDrawdownTimeseries: updatedTab.portfolio.timeseries.length > 0 ? updatedTab.portfolio.timeseries[0].label : null
        }
    }),

    on(fromActions.loadTimeseriesStatsDataFailed, (state, action) => {
        let updatedTab: fromModels.ITab = Object.assign({}, state.currTab)
        updatedTab.statDataError = action.err;
        updatedTab.statDataLoading = false;
        updatedTab.statDataLoaded = true
        return {
            ...state, 
            currTab: updatedTab,
        }
    }),    

    /* ================================= TIMESERIES DELETION ================================ */

    on(fromActions.deleteTimeseriesFromNav, (state, action) => { 

        let updatedTab = Object.assign({}, state.currTab)
        let timeseriesArr = updatedTab.portfolio.timeseries;
        let matchingEl: fromModels.ITimeseries = timeseriesArr.find( el => el.id === action.payload.id);
        timeseriesArr.splice(timeseriesArr.indexOf(matchingEl), 1)
        updatedTab.portfolio.timeseries = timeseriesArr;

        return ({
            ...state,
            currTab: updatedTab
        })
    }),

    on(fromActions.deleteTimeseriesFromSelection, (state, action) => { 
        let updatedTab = Object.assign({}, state.currTab)
        let timeseriesArr = updatedTab.portfolio.timeseries;
        let matchingEl: fromModels.ITimeseries = timeseriesArr.find( el => el.timeseriesId === Number(action.timeseriesId));
        timeseriesArr.splice(timeseriesArr.indexOf(matchingEl), 1)
        updatedTab.portfolio.timeseries = timeseriesArr;

        return ({
            ...state,
            currTab: updatedTab,
        })
    }),

    on(fromActions.deleteDerivedTimeseriesFromSelection, (state, action) => {
        let updatedTab = Object.assign({}, state.currTab)
        let timeseriesArr = updatedTab.portfolio.derivedTimeseries;
        let matchingEl: fromModels.IDerivedTimeseries = timeseriesArr.find( el => el.variable === action.variable);
        timeseriesArr.splice(timeseriesArr.indexOf(matchingEl), 1)
        updatedTab.portfolio.derivedTimeseries = timeseriesArr;

        return ({
            ...state,
            currTab: updatedTab,
        })
    }),

    /* ============================== UPDATE AXIS =============================== */

    on(fromActions.updateTimeseriesAxis, (state, action) => {
        let updatedTab = Object.assign({}, state.currTab)
        let timeseriesArr = updatedTab.portfolio.timeseries;
        let matchingEl: fromModels.ITimeseries = timeseriesArr.find(el => el.timeseriesId === Number(action.payload.timeseriesId));
        matchingEl.axis = action.payload.axisVal;

        return ({
            ...state,
            currTab: updatedTab
        })
    }),

    on(fromActions.updateDerivedTimeseriesAxis, (state, action) => {
        let updatedTab = Object.assign({}, state.currTab)
        let derivedTimeseriesArr = updatedTab.portfolio.derivedTimeseries;
        let matchingEl: fromModels.IDerivedTimeseries = derivedTimeseriesArr.find(el => el.variable === action.payload.variable);
        matchingEl.axis = action.payload.axisVal;

        return ({
            ...state,
            currTab: updatedTab
        })
    }),

    /* ============================ UPDATE REGRESSION ========================== */

    on(fromActions.updateTimeseriesRegression, (state, action) => {
        let updatedTab = Object.assign({}, state.currTab)
        let timeseriesArr = updatedTab.portfolio.timeseries;
        let matchingEl: fromModels.ITimeseries = timeseriesArr.find(el => el.timeseriesId === Number(action.payload.timeseriesId));
        matchingEl.regression = action.payload.regressionVal;

        return ({
            ...state,
            currTab: updatedTab
        })
    }),

    on(fromActions.updateDerivedTimeseriesRegression, (state, action) => {
        let updatedTab = Object.assign({}, state.currTab)
        let timeseriesArr = updatedTab.portfolio.derivedTimeseries;
        let matchingEl: fromModels.IDerivedTimeseries = timeseriesArr.find(el => el.variable === action.payload.variable);
        matchingEl.regression = action.payload.regressionVal;

        return ({
            ...state,
            currTab: updatedTab
        })
    }),



    /* ================================ UPDATE ALIAS ============================== */

    on(fromActions.updateTimeseriesAlias, (state, action) => {

        let updatedTab = Object.assign({}, state.currTab)
        let timeseriesArr = updatedTab.portfolio.timeseries;
        let matchingEl: fromModels.ITimeseries = timeseriesArr.find(el => el.timeseriesId === Number(action.payload.timeseriesId));
        matchingEl.alias = action.payload.aliasVal;
        
        return ({
            ...state,
            currTab: updatedTab
        })
    }),

    on(fromActions.updateDerivedTimeseriesAlias, (state, action) => {
        let updatedTab = Object.assign({}, state.currTab)
        let timeseriesArr = updatedTab.portfolio.derivedTimeseries;
        let matchingEl: fromModels.IDerivedTimeseries = timeseriesArr.find(el => el.variable === action.payload.variable);
        matchingEl.alias = action.payload.aliasVal;

        return ({
            ...state,
            currTab: updatedTab
        })
    }),

    on(fromActions.updateDerivedTimeseriesLabel, (state, action) => {
        let updatedTab = Object.assign({}, state.currTab)
        let timeseriesArr = updatedTab.portfolio.derivedTimeseries;
        let matchingEl: fromModels.IDerivedTimeseries = timeseriesArr.find(el => el.variable === action.payload.variable);
        matchingEl.label = action.payload.labelVal;

        return ({
            ...state,
            currTab: updatedTab
        })
    }),

    on(fromActions.updateDerivedTimeseriesExpression, (state, action) => {
        let updatedTab = Object.assign({}, state.currTab)
        let timeseriesArr = updatedTab.portfolio.derivedTimeseries;
        let matchingEl: fromModels.IDerivedTimeseries = timeseriesArr.find(el => el.variable === action.payload.variable);
        matchingEl.expression = action.payload.expVal;

        return ({
            ...state,
            currTab: updatedTab
        })
    }),

    /* =================================== UPDATE NAME ================================ */

    on(fromActions.updateCurrPortfolioName, (state, action) => {

        let updatedTab = Object.assign({}, state.currTab)
        let updatedTabs = [...state.tabs]
        
        updatedTab.portfolio.name = action.portfolio.name;
        updatedTabs.map(tab => {
            if(tab.portfolio.guid === updatedTab.portfolio.guid){
                tab.portfolio.name = action.portfolio.name
            }
        })

        let localStoragePortfolios: fromModels.IPortfolioLite[] = [];
        updatedTabs.map(tab => {
            localStoragePortfolios.push({
                guid: tab.portfolio.guid,
                name: tab.portfolio.name,
                user: tab.portfolio.user,
                isShared: tab.portfolio.isShared,
                timeseries: []
            });
        })

        localStorageItem.portfolios = localStoragePortfolios;
        localStorageItem.currPortfolio = {
            guid: updatedTab.portfolio.guid,
            name: updatedTab.portfolio.name,
            user: updatedTab.portfolio.user,
            isShared:updatedTab.portfolio.isShared,
            timeseries: []
        }
        localStorage.setItem('timeseriesStoreLite', JSON.stringify(localStorageItem));
        return ({
            ...state,
            currTab: updatedTab,
            tabs: updatedTabs
        })
    }),

    /* ============================= LOAD IMPORTABLE PORTFOLIOS ================================ */

    on(fromActions.loadImportablePortfolios, (state, action) => ({
        ...state,
        importableTimeseriesPortfoliosLoading: true,
        importableTimeseriesPortfoliosLoaded: false,
        importableTimeseriesPortfoliosError: null
    })),

    on(fromActions.loadImportablePortfoliosComplete, (state, action) => ({ 
        ...state, 
        importableTimeseriesPortfolios: action.portfolios,
        importableTimeseriesPortfoliosLoading: false, 
        importableTimeseriesPortfoliosLoaded: true
    })),

    on(fromActions.loadImportablePortfoliosFailed, (state, action) => ({
        ...state,        
        importableTimeseriesPortfoliosLoading: false,
        importableTimeseriesPortfoliosLoaded: false,
        importableTimeseriesPortfoliosError: action.payload
    })),

    /* ========================= IMPORT TIMESERIES PORTFOLIO  ========================= */

    on(fromActions.importTimeseriesPortfolio, (state, action) => {
        let newTab: fromModels.ITab = {
            portfolio: action.payload,
            regressionViewMode: 'regression',
        }
        let updatedTabs = [...state.tabs, newTab];
        let currTab = newTab
        
        let localStoragePortfolios:fromModels.IPortfolioLite[] = [];
        updatedTabs.map(tab => {
            localStoragePortfolios.push({
                guid: tab.portfolio.guid,
                name: tab.portfolio.name,
                user: tab.portfolio.user,
                isShared: tab.portfolio.isShared,
                timeseries: []
            });
        })

        localStorageItem.portfolios = localStoragePortfolios;
        localStorageItem.currPortfolio = {
            guid: currTab.portfolio.guid,
            name: currTab.portfolio.name,
            isShared: currTab.portfolio.isShared,
            user: currTab.portfolio.user,
            timeseries: []
        }
        localStorage.setItem('timeseriesStoreLite', JSON.stringify(localStorageItem));
        return ({
            ...state,
            tabs: updatedTabs,
            currTab: currTab
        })
    }),

    /* ================================ UDPATE PORTFOLIO ============================== */

    on(fromActions.updatePortfolio, (state, action) => ({
        ...state,
        updatePortfolioLoading: true,
        updatePortfolioLoaded: false,
        updatePortfolioError: null
    })),

    on(fromActions.updatePortfolioComplete, (state, action) => {
        return ({ 
            ...state, 
            updatePortfolio: action.res,
            updatePortfolioLoading: false, 
            updatePortfolioLoaded: true
        })   
    }),

    on(fromActions.updatePortfolioFailed, (state, action) => ({
        ...state,        
        updatePortfolioLoading: false,
        updatePortfolioLoaded: false,
        updatePortfolioError: action.err
    })),

    /* =================================== DRAWDOWN ============================= */

    on(fromActions.loadDrawdownData, (state, action) => {
        let updatedTab = Object.assign({}, state.currTab);
        updatedTab.drawdownDataLoading = true;
        updatedTab.drawdownDataLoaded = false;
        updatedTab.drawdownDataError = null;
        return {
            ...state,
            currTab: updatedTab
        }
    }),

    on(fromActions.loadDrawdownDataComplete, (state, action) => {
        let updatedTab = Object.assign({}, state.currTab);
        updatedTab.drawdownData = action.res 
        updatedTab.drawdownDataLoading = false;
        updatedTab.drawdownDataLoaded = true;
        return {
            ...state,
            currTab: updatedTab
        }
    }),

    on(fromActions.loadDrawdownDataFailed, (state, action) => {
        let updatedTab = Object.assign({}, state.currTab);
        updatedTab.drawdownDataLoading = false;
        updatedTab.drawdownDataLoaded = false;
        updatedTab.drawdownDataError = action.err;
        return {
            ...state,
            currTab: updatedTab
        }
    }),

    on(fromActions.selectDrawdownTimeseries, (state, action) => {
        let updatedTab = Object.assign({}, state.currTab);
        updatedTab.selectedDrawdownTimeseries = action.tsLabel
        return {
            ...state,
            currTab: updatedTab
        }
    }),

    on(fromActions.selectDrawdownTimeseriesRow, (state, action) => {
        let updatedTab = Object.assign({}, state.currTab);
        return {
            ...state,
            selectedDrawdownTimeseriesRow: action.row
        }
    }),

    /* ============================== REGRESSION =============================== */

    on(fromActions.changeRegressionViewMode, (state, action) => {        
        let updatedTab = Object.assign({}, state.currTab);
        updatedTab.regressionViewMode = action.mode;
        return {
            ...state,
            currTab: updatedTab
        }
    }),

    on(fromActions.loadRegressionData, (state, action) => {
        let updatedTab = Object.assign({}, state.currTab);
        let updatedTabs = [...state.tabs];
    
        updatedTab.selectedRegressionTimeseries = action.request.xy;
        updatedTab.regressionData = {
            expr: null,
            mse: null,
            r2: null,
            timeseries: [],
            observations: null,
            regressionPlot: null,
            regressionLine: null,
            curPoint: null
        };
        updatedTab.regressionDataLoading = true;
        updatedTab.regressionDataLoaded = false;
        updatedTab.regressionDataError = null;

        updatedTabs.map(tab => {
            if(tab.portfolio.guid === updatedTab.portfolio.guid){
                tab.selectedRegressionTimeseries = action.request.xy;
                tab.regressionDataLoading = true;
                tab.regressionDataLoaded = false;
                tab.regressionDataError = null;
            }
        })

        return {
            ...state,
            currTab: updatedTab
        }
    }),

    on(fromActions.loadRegressionDataComplete, (state, action) => {
        let updatedTab = Object.assign({}, state.currTab);
        let updatedTabs = [...state.tabs];

        updatedTab.regressionData = action.res
        updatedTab.regressionDataLoading = false;
        updatedTab.regressionDataLoaded = true;

        updatedTabs.map(tab => {
            if(tab.portfolio.guid === updatedTab.portfolio.guid){
                tab.regressionData = action.res
                tab.regressionDataLoading = false;
                tab.regressionDataLoaded = true;
            }
        })

        return {
            ...state,
            currTab: updatedTab
        }
    }),

    on(fromActions.loadRegressionDataFailed, (state, action) => {
        let updatedTab = Object.assign({}, state.currTab);
        updatedTab.regressionData = {
            expr: null,
            mse: null,
            r2: null,
            timeseries: [],
            observations: null,
            regressionPlot: null,
            regressionLine: null,
            curPoint: null
        };
        updatedTab.regressionDataLoading = false;
        updatedTab.regressionDataLoaded = false;
        updatedTab.regressionDataError = action.err;
        if(state.currTab){
            return {
                ...state,
                currTab: updatedTab
            }
        }
        else {
            return {
                ...state
            }
        }
    }),

    /* ================================== LOCAL STORAGE =========================== */

    on(fromActions.loadPortfolioDataFromLocalStorageComplete, (state, action) => {
        let existingTabs = [...state.tabs]
        let matchingTab = existingTabs.filter(tab => tab.portfolio.guid === action.res.portfolio.guid)[0]
        existingTabs.map(tab => {
            if(tab.portfolio.guid === action.res.portfolio.guid){
                tab.portfolio = action.res.portfolio;
            }
        })
        const lsItem: fromModels.ILocalStorageItem = JSON.parse(localStorage.getItem('timeseriesStoreLite'));
        let switchToCurr = false
        if(lsItem.currPortfolio){
            switchToCurr = (action.res.portfolio.guid === lsItem.currPortfolio.guid);
        }
        return {
            ...state,
            currTab: switchToCurr ? matchingTab: state.currTab,
            tabs: existingTabs
        }
    }),
    
    /* ==============================  URL GUID ============================ */

    on(fromActions.loadPortfolioFromURL, (state, action) => {
        return {
            ...state,
            loadPortfolioFromUrlLoading: true,
            loadPortfolioFromUrlLoaded: false,
            loadPortfolioFromURLFailed: null
        }
    }),

    on(fromActions.loadPortfolioFromURLComplete, (state, action) => {
        let existingTabs = structuredClone(state.tabs)
        let matchingTab = existingTabs.filter(tab => tab.portfolio.guid === action.res.portfolio.guid)[0]
        existingTabs.map(tab => {
            if(tab.portfolio.guid === action.res.portfolio.guid){
                tab.portfolio = action.res.portfolio;
            }
        })
        const lsItem: fromModels.ILocalStorageItem = JSON.parse(localStorage.getItem('timeseriesStoreLite'));
        let switchToCurr = false
        if(lsItem.currPortfolio){
            switchToCurr = (action.res.portfolio.guid === lsItem.currPortfolio.guid);
        }
        return {
            ...state,
            currTab: switchToCurr ? matchingTab: state.currTab,
            tabs: existingTabs,
            loadPortfolioFromUrlLoading: false,
            loadPortfolioFromUrlLoaded: false

        }
    }),

    on(fromActions.loadPortfolioFromURLFailed, (state, action) => {
        return {
            ...state,
            loadPortfolioFromURLFailed: action.err
        }
    }),

    /* ============================== SIMPLE MOVING AVG ============================ */ 

    on(fromActions.loadSimpleMovingAvgData, (state, action) => {
        let updatedTab = Object.assign({}, state.currTab);
        updatedTab.simpleMovingAvgDataLoading = false;
        updatedTab.simpleMovingAvgDataLoaded = null;
        updatedTab.simpleMovingAvgDataError = null;
        return {
            ...state,
            currTab: updatedTab
        }
    }),

    on(fromActions.loadSimpleMovingAvgDataComplete, (state, action) => {
        let updatedTab = Object.assign({}, state.currTab);
        updatedTab.simpleMovingAvgData = action.res;
        updatedTab.simpleMovingAvgDataLoading = false;
        updatedTab.simpleMovingAvgDataLoaded = true;
        return {
            ...state,
            currTab: updatedTab
        }
    }),

    on(fromActions.loadSimpleMovingAvgDataFailed, (state, action) => {
        let updatedTab = Object.assign({}, state.currTab);
        updatedTab.simpleMovingAvgData = null;
        updatedTab.simpleMovingAvgDataLoading = false;
        updatedTab.simpleMovingAvgDataLoaded = false;
        updatedTab.simpleMovingAvgDataError = action.err;
        return {
            ...state,
            currTab: updatedTab
        }
    }),

    on(fromActions.clearSimpleMovingAvgData, (state, action) => {
        let updatedTab = Object.assign({}, state.currTab);
        updatedTab.simpleMovingAvgData = null;
        updatedTab.simpleMovingAvgDataLoading = false;
        updatedTab.simpleMovingAvgDataLoaded = false;
        updatedTab.simpleMovingAvgDataError = null;
        return {
            ...state,
            currTab: updatedTab
        }
    }),

    /* ============================== BOLLINGER BANDS  ============================ */

    on(fromActions.loadBollingerBandsData, (state, action) => {
        let updatedTab = Object.assign({}, state.currTab);
        updatedTab.bollingerBandsDataLoading = true;
        updatedTab.bollingerBandsDataLoaded = false;
        updatedTab.bollingerBandsDataError = null;
        return {
            ...state,
            currTab: updatedTab
        }
    }),

    on(fromActions.loadBollingerBandsDataComplete, (state, action) => {
        let updatedTab = Object.assign({}, state.currTab);
        updatedTab.bollingerBandsData = action.res;
        updatedTab.bollingerBandsDataLoading = false;
        updatedTab.bollingerBandsDataLoaded = true;
        return {
            ...state,
            currTab: updatedTab
        }
    }),

    on(fromActions.loadBollingerBandsDataFailed, (state, action) => {
        let updatedTab = Object.assign({}, state.currTab);
        updatedTab.bollingerBandsData = null;
        updatedTab.bollingerBandsDataLoading = false;
        updatedTab.bollingerBandsDataLoaded = false;
        updatedTab.bollingerBandsDataError = action.err;
        return {
            ...state,
            currTab: updatedTab
        }
    }),

    on(fromActions.clearBollingerBandsData, (state, action) => {
        let updatedTab = Object.assign({}, state.currTab);
        updatedTab.bollingerBandsData = null;
        updatedTab.bollingerBandsDataLoading = false;
        updatedTab.bollingerBandsDataLoaded = false;
        updatedTab.bollingerBandsDataError = null;
        return {
            ...state,
            currTab: updatedTab
        }
    }),

    /* ============================= RELATIVE STRENGTH INDICATOR ============================ */

    on(fromActions.loadRelativeStrengthIndicatorData, (state, action) => {
        let updatedTab = Object.assign({}, state.currTab);
        updatedTab.relativeStrengthIndicatorDataLoading = true;
        updatedTab.relativeStrengthIndicatorDataLoaded = false;
        updatedTab.relativeStrengthIndicatorDataError = null;
        return {
            ...state,
            currTab: updatedTab
        }
    }),

    on(fromActions.loadRelativeStrengthIndicatorDataComplete, (state, action) => {
        let updatedTab = Object.assign({}, state.currTab);
        updatedTab.relativeStrengthIndicatorData = action.res;
        updatedTab.relativeStrengthIndicatorDataLoading = false;
        updatedTab.relativeStrengthIndicatorDataLoaded = true;
        return {
            ...state,
            currTab: updatedTab
        }
    }),

    on(fromActions.loadRelativeStrengthIndicatorDataFailed, (state, action) => {
        let updatedTab = Object.assign({}, state.currTab);
        updatedTab.relativeStrengthIndicatorData = null;
        updatedTab.relativeStrengthIndicatorDataLoading = false;
        updatedTab.relativeStrengthIndicatorDataLoaded = false;
        updatedTab.relativeStrengthIndicatorDataError = action.err;
        return {
            ...state,
            currTab: updatedTab
        }
    }),

    on(fromActions.clearRelativeStrengthIndicatorData, (state, action) => {
        let updatedTab = Object.assign({}, state.currTab);
        updatedTab.relativeStrengthIndicatorData = null;
        updatedTab.relativeStrengthIndicatorDataLoading = false;
        updatedTab.relativeStrengthIndicatorDataLoaded = false;
        updatedTab.relativeStrengthIndicatorDataError = null;
        return {
            ...state,
            currTab: updatedTab
        }
    }),

    /* ============================= MOVING AVG CONVERGENCE DIVERGENCE ============================ */

    on(fromActions.loadMovingAverageConvergenceDivergenceData, (state, action) => {
        let updatedTab = Object.assign({}, state.currTab);
        updatedTab.movingAverageConvergenceDivergenceDataLoading = true;
        updatedTab.movingAverageConvergenceDivergenceDataLoaded = false;
        updatedTab.movingAverageConvergenceDivergenceDataError = null;
        return {
            ...state,
            currTab: updatedTab
        }
    }),

    on(fromActions.loadMovingAverageConvergenceDivergenceDataComplete, (state, action) => {
        let updatedTab = Object.assign({}, state.currTab);
        updatedTab.movingAverageConvergenceDivergenceData = action.res;
        updatedTab.movingAverageConvergenceDivergenceDataLoading = false;
        updatedTab.movingAverageConvergenceDivergenceDataLoaded = true;
        return {
            ...state,
            currTab: updatedTab
        }
    }),

    on(fromActions.loadMovingAverageConvergenceDivergenceDataFailed, (state, action) => {
        let updatedTab = Object.assign({}, state.currTab);
        updatedTab.movingAverageConvergenceDivergenceData = null;
        updatedTab.movingAverageConvergenceDivergenceDataLoading = false;
        updatedTab.movingAverageConvergenceDivergenceDataLoaded = false;
        updatedTab.movingAverageConvergenceDivergenceDataError = action.err;
        return {
            ...state,
            currTab: updatedTab
        }
    }),

    on(fromActions.clearMovingAverageConvergenceDivergenceData, (state, action) => {
        let updatedTab = Object.assign({}, state.currTab);
        updatedTab.movingAverageConvergenceDivergenceData = null;
        updatedTab.movingAverageConvergenceDivergenceDataLoading = false;
        updatedTab.movingAverageConvergenceDivergenceDataLoaded = false;
        updatedTab.movingAverageConvergenceDivergenceDataError = null;
        return {
            ...state,
            currTab: updatedTab
        }
    }),



    on(fromActions.changeSelectedTechnicalIndicator, (state, action) => {
        let updatedTab = Object.assign({}, state.currTab);
        updatedTab.selectedTechnicalIndicator = action.indicator;
        return {
            ...state,
            currTab: updatedTab
        }
    }),


    on(fromActions.clearScratchPadComplete, (state, action) => {
        return { 
            ...state, 
            scratchpadDeleted: true
        }
    })
)

export const getTabs = (state:State) => state.tabs;
export const getCurrTab = (state:State) => state.currTab;

export const getStartDate = (state: State) => state.startDate;
export const getEndDate = (state: State) => state.endDate;

export const getDrawdownData = (state: State) => state.currTab ? state.currTab.drawdownData : null;
export const getDrawdownDataLoading = (state: State) => state.currTab ? state.currTab.drawdownDataLoading : null;
export const getDrawdownDataLoaded = (state: State) => state.currTab ? state.currTab.drawdownDataLoaded : null;
export const getDrawdownDataError = (state: State) => state.currTab ? state.currTab.drawdownDataError : null;

export const getSelectedDrawdownTimeseries = (state: State) => state.currTab ? state.currTab.selectedDrawdownTimeseries : null;

export const getTimeseriesHierarchy = (state: State) => state.timeseriesHierarchy;
export const getTimeseriesHierarchyLoading = (state: State) => state.timeseriesHierarchyLoading;
export const getTimeseriesHierarchyLoaded = (state: State) => state.timeseriesHierarchyLoaded;
export const getTimeseriesHierarchyError = (state: State) => state.timeseriesHierarchyError;

export const getCreateTimeseriesPortfolio = (state: State) => state.createPortfolio
export const getCreateTimeseriesPortfolioLoading = (state: State) => state.createPortfolioLoading;
export const getCreateTimeseriesPortfolioLoaded = (state: State) => state.createPortfolioLoaded
export const getCreateTimeseriesPortfolioError = (state: State) => state.createPortfolioError;

export const getUpdatePortfolio = (state: State) => state.updatePortfolio;
export const getUpdatePortfolioLoading = (state: State) => state.updatePortfolioLoading;
export const getUpdatePortfolioLoaded = (state: State) => state.updatePortfolioLoaded;
export const getUpdatePortfolioError = (state: State) => state.updatePortfolioError;

export const getImportableTimeseriesPortfolios = (state: State) => state.importableTimeseriesPortfolios;
export const getImportableTimeseriesPortfoliosLoading = (state: State) => state.importableTimeseriesPortfoliosLoading;
export const getImportableTimeseriesPortfoliosLoaded = (state: State) => state.importableTimeseriesPortfoliosLoaded;
export const getImportableTimeseriesPortfoliosError = (state: State) => state.importableTimeseriesPortfoliosError;

export const getSelectedTimeseriesChartData = (state: State) => state.currTab ? state.currTab.chartData : null;
export const getSelectedTimeseriesChartDataLoading = (state: State) => state.currTab ? state.currTab.chartDataLoading : null;
export const getSelectedTimeseriesChartDataLoaded = (state: State) => state.currTab ? state.currTab.chartDataLoaded : null;
export const getSelectedTimeseriesChartDataError = (state: State) => state.currTab ? state.currTab.chartDataError : null;

export const getSelectedTimeseriesStats = (state: State) => state.currTab ? state.currTab.statData : null;
export const getSelectedTimeseriesStatsLoading = (state: State) => state.currTab ? state.currTab.statDataLoading : null;
export const getSelectedTimeseriesStatsLoaded = (state: State) => state.currTab ? state.currTab.statDataLoaded : null;
export const getSelectedTimeseriesStatsError = (state: State) => state.currTab ? state.currTab.statDataError : null;

export const getRegressionViewMode = (state: State) => state.currTab ? state.currTab.regressionViewMode : null;
export const getSelectedRegressionTimeseries = (state: State) => state.currTab ? state.currTab.selectedRegressionTimeseries : null;
export const getSelectedRegressionTimeseriesRow = (state: State) => state.selectedDrawdownTimeseriesRow;

export const getRegressionData = (state: State) => state.currTab ? state.currTab.regressionData : null;
export const getRegressionDataLoading = (state: State) => state.currTab ? state.currTab.regressionDataLoading : null;
export const getRegressionDataLoaded = (state: State) => state.currTab ? state.currTab.regressionDataLoaded : null;
export const getRegressionDataError = (state: State) => state.currTab ? state.currTab.regressionDataError : null; 

export const getSelectedTimeseriesWithinTab = (state: State) => state.currTab ? state.currTab.portfolio.timeseries.filter(ts => ts.isSelected === true) : null;

export const getLoadPortfolioFromUrlLoading = (state: State) => state.loadPortfolioFromUrlLoading;
export const getLoadPortfolioFromUrlLoaded = (state: State) => state.loadPortfolioFromUrlLoaded;
export const getLoadPortfolioFromUrlError = (state: State) => state.loadPortfolioFromURLFailed;

export const getSimpleMovingAvgData = (state: State) => state.currTab ? state.currTab.simpleMovingAvgData : null;
export const getSimpleMovingAvgDataLoading = (state: State) => state.currTab ? state.currTab.simpleMovingAvgDataLoading : null;
export const getSimpleMovingAvgDataLoaded = (state: State) => state.currTab ? state.currTab.simpleMovingAvgDataLoaded : null;
export const getSimpleMovingAvgDataError = (state: State) => state.currTab ? state.currTab.simpleMovingAvgDataError : null;

export const getBollingerBandsData = (state: State) => state.currTab ? state.currTab.bollingerBandsData : null;
export const getBollingerBandsDataLoading = (state: State) => state.currTab ? state.currTab.bollingerBandsDataLoading : null;
export const getBollingerBandsDataLoaded = (state: State) => state.currTab ? state.currTab.bollingerBandsDataLoaded : null;
export const getBollingerBandsDataError = (state: State) => state.currTab ? state.currTab.bollingerBandsDataError : null;

export const getRelativeStrengthIndicatorData = (state: State) => state.currTab ? state.currTab.relativeStrengthIndicatorData : null;
export const getRelativeStrengthIndicatorDataLoading = (state: State) => state.currTab ? state.currTab.relativeStrengthIndicatorDataLoading : null;
export const getRelativeStrengthIndicatorDataLoaded = (state: State) => state.currTab ? state.currTab.relativeStrengthIndicatorDataLoaded : null;
export const getRelativeStrengthIndicatorDataError = (state: State) => state.currTab ? state.currTab.relativeStrengthIndicatorDataError : null;

export const getMovingAverageConvergenceDivergenceData = (state: State) => state.currTab ? state.currTab.movingAverageConvergenceDivergenceData : null;
export const getMovingAverageConvergenceDivergenceDataLoading = (state: State) => state.currTab ? state.currTab.movingAverageConvergenceDivergenceDataLoading : null;
export const getMovingAverageConvergenceDivergenceDataLoaded = (state: State) => state.currTab ? state.currTab.movingAverageConvergenceDivergenceDataLoaded : null;
export const getMovingAverageConvergenceDivergenceDataError = (state: State) => state.currTab ? state.currTab.movingAverageConvergenceDivergenceDataError : null;

export const getSelectedTechnicalIndicator = (state: State) => state.currTab ? state.currTab.selectedTechnicalIndicator : null;

export const getDerivedTimeseries = (state: State) => state.currTab ? state.currTab.portfolio.derivedTimeseries: [];

export const getScratchpadDeleted = (state: State) => state.scratchpadDeleted;