import { createReducer, on } from '@ngrx/store';
import * as fromModels from '../../models';
import * as fromActions from '../actions/scenario-management.actions';

export interface State {

    countryCodes: string[],
    countryEntity: {[code: string]: fromModels.ICountry},

    countries: fromModels.ICountry[]
    countriesLoading: boolean;
    countriesLoaded: boolean;
    countriesError?: string;
    
    updateCountriesPending: boolean;
    updateCountriesComplete: boolean;
    updateCountriesError?: string;

    /* =================== */ 
    
    economicVariableIds: number[];
    economicVariableEntities: {[id: number]: fromModels.IEconomicVariable},

    economicVariablesLoading: boolean;
    economicVariablesLoaded: boolean;
    economicVariablesError?: string;

    updateEconomicVariablesPending: boolean;
    updateEconomicVariablesComplete: boolean;
    updateEconomicVariablesError?: string;

    createEconomicVariablesPending: boolean;
    createEconomicVariablesComplete: boolean;
    createEconomicVariablesError?: string;
 
    /* =================== */ 

    forecastPeriodIds: number[];
    forecastPeriodEntities: {[id: number]: fromModels.IForecastPeriod},

    forecastPeriodsLoading: boolean;
    forecastPeriodsLoaded: boolean;
    forecastPeriodsError?: string;

    updateForecastPeriodPending: boolean;
    updateForecastPeriodComplete: boolean;
    updateForecastPeriodError?: string;

    createForecastPeriodPending: boolean;
    createForecastPeriodComplete: boolean;
    createForecastPeriodError?: string;

    /* =================== */ 

    scenarioIds: number[],
    scenarioEntities: {[id: number]: fromModels.IScenario},

    scenariosLoading: boolean;
    scenariosLoaded: boolean;
    scenariosError?: string;

    updateScenarioPending: boolean;
    updateScenarioComplete: boolean;
    updateScenarioError?: string;

    createScenarioPending: boolean;
    createScenarioComplete: boolean;
    createScenarioError?: string;

    /* =================== */ 

    aggregatedForecastEntities: {[id: number]: fromModels.IForecast};

    aggregatedForecastLoading: boolean,
    aggregatedForecastLoaded: boolean,
    aggregatedForecastError?: string,

    updateAggregatedForecastPending: boolean,
    updateAggregatedForecastComplete: boolean,
    updateAggregatedForecastError?: string,

    createForecastPending: boolean;
    createForecastComplete: boolean;
    createForecastError?: string;
}

const initialState: State = {

    countryCodes: [],
    countryEntity: {},

    countries: [],
    countriesLoading: false,
    countriesLoaded: false,

    updateCountriesPending: false,
    updateCountriesComplete: false,

    /* =================== */ 

    economicVariableIds: [],
    economicVariableEntities: {},


    economicVariablesLoading: false,
    economicVariablesLoaded: false,

    updateEconomicVariablesPending: false,
    updateEconomicVariablesComplete: false,    
    
    createEconomicVariablesPending: false,
    createEconomicVariablesComplete: false,

    /* =================== */ 

    forecastPeriodIds: [],
    forecastPeriodEntities: {},

    forecastPeriodsLoading: false,
    forecastPeriodsLoaded: false,

    updateForecastPeriodPending: false,
    updateForecastPeriodComplete: false,

    createForecastPeriodPending: false,
    createForecastPeriodComplete: false,

    /* =================== */ 
    
    scenarioIds: [],
    scenarioEntities: {},

    scenariosLoading: false,
    scenariosLoaded: false,

    updateScenarioPending: false,
    updateScenarioComplete: false,

    createScenarioPending: false,
    createScenarioComplete: false,
    
    /* =================== */ 

    aggregatedForecastEntities: {},
    aggregatedForecastLoading: false,
    aggregatedForecastLoaded: false,
    
    updateAggregatedForecastPending: false,
    updateAggregatedForecastComplete: false,

    createForecastPending: false,
    createForecastComplete: false
}

export const reducer = createReducer(

    initialState, 

    /* ============ LOAD COUNTRIES =================== */ 

    on(fromActions.loadCountries, (state) => {
        return {
            ...state,
            countriesLoading: true,
            countriesLoaded: false,
            countriesError: null
        }
    }),

    on(fromActions.loadCountriesComplete, (state,action) => {

        let payload = action.countries
        const countryCodes: string[] = payload.map((country) => country.countryCode);
        const countryEntities = payload.reduce((entities: {[id: string]: fromModels.ICountry }, item: fromModels.ICountry) => {
            return Object.assign({}, entities, {[item.countryCode]: item});
        }, {});

        return {
            ...state,
            countryCodes: [...countryCodes],
            countryEntity: countryEntities,
            countries: action.countries,
            countriesLoading: false,
            countriesLoaded: true
        }
    }),

    on(fromActions.loadCountriesFailed, (state,action) => {
        return {
            ...state,
            countriesLoading: false,
            countriesLoaded: false,
            countriesError: action.err
        }
    }),


    /* ============ UPDATE COUNTRIES =================== */ 

    on(fromActions.updateCountry, (state) => {
        return {
            ...state,
            updateCountriesPending: true,
            updateCountriesComplete: false,
            updateCountriesError: null
        }
    }),

    
    on(fromActions.updateCountryComplete, (state, action) => {

        const payload = action.countries[0];
        const countryCodes = state.countryCodes.filter((countryCode) => countryCode !== payload.countryCode);
        const newEntities = Object.assign({}, state.countryEntity, {[payload.countryCode]: payload});


        return {
            ...state,
            countryCodes: [payload.countryCode, ...countryCodes],
            countryEntity: newEntities,
            countries: action.countries,
            updateCountriesPending: false,
            updateCountriesComplete: true,
        }
    }),

    
    on(fromActions.updateCountryFailed, (state, action) => {
        return {
            ...state,
            updateCountriesPending: false,
            updateCountriesComplete: false,
            updateCountriesError: action.err
        }
    }),



    /* ============  LOAD ECONOMIC VARIABLES =================== */ 

    on(fromActions.loadEconomicVariables, (state) => {
        return {
            ...state,
            economicVariablesLoaded: false,
            economicVariablesLoading: true
        }
    }),

    on(fromActions.loadEconomicVariablesComplete, (state,action) => {
        let payload = action.econVars
        const econVarIds: number[] = payload.map((econVar) => econVar.VariableId);
        const econVarEntities = payload.reduce((entities: {[id: number]: fromModels.IEconomicVariable }, item: fromModels.IEconomicVariable) => {
            return Object.assign({}, entities, {[item.VariableId]: item});
        }, {});
        return {
            ...state,
            economicVariableIds: [...econVarIds],
            economicVariableEntities: econVarEntities,
            economicVariablesLoading: false,
            economicVariablesLoaded: true,
        }
    }),

    on(fromActions.loadEconomicVariablesFailed, (state,action) => {
        return {
            ...state,
            economicVariablesLoading: false,
            economicVariablesLoaded: false,
            economicVariablesError: action.err
        }
    }),

    /* ============  UPDATE ECONOMIC VARIABLES =================== */ 

    on(fromActions.updateEconomicVariable, (state,action) => {
        return {
             ...state,
             updateEconomicVariablesPending: true,
             updateEconomicVariablesComplete: false
        }
    }),
    
    on(fromActions.updateEconomicVariableComplete, (state,action) => {
    
        const payload = action.payload[0];
        const econVarIds = state.economicVariableIds.filter((econVarId) => econVarId !== payload.VariableId);
        const newEntities = Object.assign({}, state.economicVariableEntities, {[payload.VariableId]: payload});

        return {
            ...state,
            economicVariablIds: [payload.VariableId, ...econVarIds],
            economicVariableEntities: newEntities,
            updateEconomicVariablesPending: false,
            updateEconomicVariablesComplete: true
        }
    }),

    on(fromActions.updateEconomicVariableFailed, (state,action) => {
        return {
            ...state,
            updateEconomicVariablesPending: false,
            updateEconomicVariablesComplete: false,
            updateEconomicVariablesError: action.err
        }
    }),

    /* ============  CREATE ECONOMIC VARIABLES =================== */ 

    on(fromActions.createEconomicVariable, (state,action) => {
        return {
             ...state,
             createEconomicVariablesPending: true,
             createEconomicVariablesComplete: false
        }
    }),
    
    on(fromActions.createEconomicVariableComplete, (state,action) => {
        let payload = action.res[0];
        return {
            ...state,
            economicVariableIds: [payload.VariableId,...state.economicVariableIds],
            economicVariableEntities: Object.assign( {}, state.economicVariableEntities, {[payload.VariableId]: payload}),
            createEconomicVariablesPending: false,
            createEconomicVariablesComplete: true
        }
    }),

    on(fromActions.createEconomicVariableFailed, (state,action) => {
        return {
            ...state,
            updateEconomicVariablesPending: false,
            updateEconomicVariablesComplete: false,
            updateEconomicVariablesError: action.err
        }
    }),


    /* ============ LOAD FORECAST PERIOD =================== */ 

    on(fromActions.loadCountryForecastPeriods, (state) => {
        return {
            ...state,
            forecastPeriodIds: [],
            forecastPeriodEntities: {},
            forecastPeriodsLoading: true,
            forecastPeriodsLoaded: false,
            forecastPeriodsError: null
        }
    }),

    on(fromActions.loadCountryForecastPeriodsComplete, (state,action) => {
        const payload = action.forecastPeriods;
        const forecastPeriodIds: number[] = payload.map((forecastPeriod) => forecastPeriod.ForecastPeriodId);
        const forecastPeriodEntities = payload.reduce((entities: {[id: number]: fromModels.IForecastPeriod }, item: fromModels.IForecastPeriod) => {
            return Object.assign({}, entities, {[item.ForecastPeriodId]: item});
        }, {});
        return {
            ...state,
            forecastPeriodIds: [...forecastPeriodIds],
            forecastPeriodEntities: forecastPeriodEntities,
            forecastPeriods: action.forecastPeriods,
            forecastPeriodsLoading: false,
            forecastPeriodsLoaded: true,
        }
    }),

    on(fromActions.loadCountryForecastPeriodsFailed, (state,action) => {
        return {
            ...state,
            forecastPeriodsLoading: false,
            forecastPeriodsLoaded: false,
            forecastPeriodsError: action.err
        }
    }),

    /* ============ UPDATE FORECAST PERIOD =================== */ 

    on(fromActions.updateCountryForecastPeriod, (state,action) => {
        return {
             ...state,
             updateForecastPeriodPending: true,
             updateForecastPeriodComplete: false
        }
    }),
    
    on(fromActions.updateCountryForecastPeriodComplete, (state,action) => {
        const payload = action.payload[0];
        const forecastPeriodIds = state.forecastPeriodIds.filter((forecastPeriodId) => forecastPeriodId !== payload.ForecastPeriodId);
        const newEntities = Object.assign({}, state.forecastPeriodEntities, {[payload.ForecastPeriodId]: payload});

        return {
            ...state,
            forecastPeriodIds: [payload.ForecastPeriodId, ...forecastPeriodIds],        
            forecastPeriods: newEntities,
            updateForecastPeriodPending: false,
            updateForecastPeriodComplete: true
        };
    }),

    on(fromActions.updateCountryForecastPeriodFailed, (state,action) => {
        return {
            ...state,
            updateForecastPeriodPending: false,
            updateForecastPeriodComplete: false,
            updateForecastPeriodError: action.err
        }
    }),

    /* ============ CREATE FORECAST PERIOD =================== */ 


    on(fromActions.createForecastPeriod, (state,action) => {
        return {
             ...state,
             createForecastPeriodPending: true,
             createForecastPeriodComplete: false
        }
    }),
    
    on(fromActions.createForecastPeriodComplete, (state,action) => { 
        let payload = action.res[0];
        return {
            ...state,
            forecastPeriodIds: [payload.VariableId, ...state.forecastPeriodIds],
            forecastPeriodEntities: Object.assign( {}, state.forecastPeriodEntities, {[payload.VariableId]: payload} ),
            createForecastPeriodPending: false,
            createForecastPeriodComplete: true
        }
    }),

    on(fromActions.createForecastPeriodFailed, (state,action) => {
        return {
            ...state,
            createForecastPeriodPending: false,
            createForecastPeriodComplete: false,
            createForecastPeriodError: action.err
        }
    }),

    /* ============ LOAD SCENARIO =================== */ 

    on(fromActions.loadScenarios, (state) => {
        return {
            ...state,
            scenariosLoading: true,
            scenariosLoaded: false
        }
    }),

    on(fromActions.loadScenariosComplete, (state,action) => {

        const payload = action.scenarios;
        const scenarioIds: number[] = payload.map((scenario) => scenario.ScenarioId);
        const scenarioEntities = payload.reduce((entities: {[id: number]: fromModels.IScenario }, item: fromModels.IScenario) => {
            return Object.assign({}, entities, {[item.ScenarioId]: item});
        }, {});

        return {
            ...state,
            scenarioIds: [...scenarioIds],
            scenarioEntities: scenarioEntities,
            scenarios: action.scenarios,
            scenariosLoading: false,
            scenariosLoaded: true,
        }
    }),

    on(fromActions.loadScenariosFailed, (state,action) => {
        return {
            ...state,
            scenariosLoading: false,
            scenariosLoaded: false,
            scenariosError: action.err
        }
    }),

    /* ============ UPDATE SCENARIO =================== */

    on(fromActions.updateScenario, (state,action) => {
        return {
             ...state,
             updateScenarioPending: true,
             updateScenarioComplete: false
        }
    }),
    
    on(fromActions.updateScenarioComplete, (state,action) => {
        let payload = action.payload[0]
        const scenarioIds: number[] =  state.scenarioIds.filter((scenarioId) => scenarioId !== payload.ScenarioId);
        const scenarioEntities =  Object.assign({}, state.scenarioEntities, {[payload.ScenarioId]: payload});
        return {
            ...state,
            scenarioIds: [payload.ScenarioId, ...scenarioIds],
            scenarioEntities: scenarioEntities,
            updateScenarioPending: false,
            updateScenarioComplete: true
        }
    }),

    on(fromActions.updateScenarioFailed, (state,action) => {
        return {
            ...state,
            updateScenarioPending: true,
            updateScenarioComplete: false,
            updateScenarioError: action.err
        }
    }),

    /* ============ CREATE SCENARIO =================== */

    on(fromActions.createScenario, (state,action) => {
        return {
             ...state,
             createScenarioPending: true,
             createScenarioComplete: false
        }
    }),
    
    on(fromActions.createScenarioComplete, (state,action) => {
        let payload = action.res[0];
        return {
            ...state,
            scenarioIds: [payload.ScenarioId, ...state.scenarioIds],
            scenarioEntities: Object.assign({}, state.scenarioEntities, {[payload.ScenarioId]: payload}),
            createScenarioPending: false,
            createScenarioCompletea: true
        }
    }),

    on(fromActions.createForecastPeriodFailed, (state,action) => {
        return {
            ...state,
            createScenarioPending: false,
            createScenarioComplete: false,
            createScenarioError: action.err
        }
    }),
    
    /* ==================== LOAD FORECAST =================== */ 

    on(fromActions.loadAggregatedForecast, (state) => {
        return {
            ...state,
            aggregatedForecastLoading: true,
            aggregatedForecastLoaded: false
        }
    }),

    on(fromActions.loadAggregatedForecastComplete, (state,action) => {
        let payload = action.payload
        const aggregatedForecastEntities = payload.reduce((entities: {[id: number]: fromModels.IForecast }, item: fromModels.IForecast) => {
            return Object.assign({}, entities, {[item.ForecastPeriodId]: item});
        }, {});
        return {
            ...state,
            aggregatedForecastEntities: aggregatedForecastEntities,
            aggregatedForecast: action.payload,
            aggregatedForecastLoading: false,
            aggregatedForecastLoaded: true,
        }
    }),

    on(fromActions.loadAggregatedForecastFailed, (state,action) => {
        return {
            ...state,
            aggregatedForecastLoading: false,
            aggregatedForecastLoaded: false,
            aggregatedForecastError: action.err
        }
    }),

    /* ============= UPDATE FORECAST ================= */


    on(fromActions.updateAggregatedForecast, (state) => {
        return {
            ...state,
            updateAggregatedForecastPending: true,
            updateAggregatedForecastComplete: false
        }
    }),

    on(fromActions.updateAggregatedForecastComplete, (state,action) => {

        let payload = action.res[0]
        let forecastPeriodIds = state.forecastPeriodIds.filter((forecastPeriodId) => forecastPeriodId !== payload.ForecastPeriodId);
        const newEntities = Object.assign({}, state.aggregatedForecastEntities, {[payload.ForecastPeriodId]: payload});

        return {
            ...state,
            forecastPeriodIds: [payload.ForecastPeriodId, ...forecastPeriodIds],
            aggregatedForecastEntities: newEntities,
            updateAggregatedForecastPending: false,
            updateAggregatedForecastComplete: true
        }
    }),

    on(fromActions.updateAggregatedForecastFailed, (state,action) => {
        return {
            ...state,
            updateAggregatedForecastPending: false,
            updateAggregatedForecastComplete: false,
            updateAggregatedForecastError: action.err
        }
    }),

    /* ============= CREATE FORECAST ================= */

    on(fromActions.createForecast, (state) => {
        return {
            ...state,
            createForecastPending: true,
            createForecastComplete: false
        }
    }),

    on(fromActions.createForecastComplete, (state, action) => {
        let payload = action.res[0];
        return {
            ...state,
            forecastPeriodIds: [payload.ForecastPeriodId, ...state.forecastPeriodIds],
            aggregatedForecastEntities: Object.assign({}, state.aggregatedForecastEntities, {[payload.ForecastPeriodId]: payload}),
            createForecastPending: false,
            createForecastCompletea: true
        }
    })



)

export const getCountries = (state:State) => state.countries;
export const getCountriesLoading = (state:State) => state.countriesLoading;
export const getCountriesLoaded = (state:State) => state.countriesLoaded;

export const getEconomicVariableIds = (state:State) => state.economicVariableIds
export const getEconomicVariableEntities = (state:State) => state.economicVariableEntities
export const getEconomicVariablesLoading = (state:State) => state.economicVariablesLoading;
export const getEconomicVariablesLoaded = (state:State) => state.economicVariablesLoaded;

export const getForecastPeriodIds = (state:State) => state.forecastPeriodIds;
export const getForecastPeriodEntities = (state: State) => state.forecastPeriodEntities;
export const getForecastPeriodsLoading = (state:State) => state.forecastPeriodsLoading;
export const getForecastPeriodsLoaded = (state:State) => state.forecastPeriodsLoaded;

export const getScenarioIds = (state: State) => state.scenarioIds;
export const getScenarioEntities = (state: State) => state.scenarioEntities;
export const getScenariosLoading = (state:State) => state.scenariosLoading;
export const getScenariosLoaded = (state:State) => state.scenariosLoaded;

export const getAggregatedForecastEntities = (state:State) => state.aggregatedForecastEntities;
export const getAggregatedForecastLoading = (state: State) => state.aggregatedForecastLoading;
export const getAggregatedForecastLoaded = (state: State) => state.aggregatedForecastLoaded;