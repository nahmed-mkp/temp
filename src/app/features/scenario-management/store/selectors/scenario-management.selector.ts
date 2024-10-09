import { createSelector } from '@ngrx/store';
import * as fromFeature from '../reducers';
import * as fromScenarioManagement from '../reducers/scenario-management.reducer';


export const getScenarioManagementState = createSelector(
    fromFeature.getState,
    (state: fromFeature.ScenarioManagementState) => state.scenarioManagement
);

/* ================ COUNTRIES  ===================== */

export const getCountries = createSelector(
    getScenarioManagementState,
    fromScenarioManagement.getCountries
)

export const getCountriesLoading = createSelector(
    getScenarioManagementState,
    fromScenarioManagement.getCountriesLoading
)

export const getCountriesLoaded = createSelector(
    getScenarioManagementState,
    fromScenarioManagement.getCountriesLoaded
)

/* ================ ECONOMIC VARIABLES  ===================== */


export const getEconVarIds = createSelector(
    getScenarioManagementState,
    fromScenarioManagement.getEconomicVariableIds
)

export const getEconVarEntities = createSelector(
    getScenarioManagementState,
    fromScenarioManagement.getEconomicVariableEntities
)

export const getEconomicVariables = createSelector(
    getEconVarIds,
    getEconVarEntities,
    (ids, entities) => {
        return ids.map((id) => entities[id]);
    }
)

export const getEconomicVariablesLoading = createSelector(
    getScenarioManagementState,
    fromScenarioManagement.getEconomicVariablesLoading
)

export const getEconomicVariablesLoaded = createSelector(
    getScenarioManagementState,
    fromScenarioManagement.getEconomicVariablesLoaded
)

/* ================ FORECAST PERIODS  ===================== */

export const getForecastPeriodIds = createSelector(
    getScenarioManagementState,
    fromScenarioManagement.getForecastPeriodIds
)

export const getForecastPeriodEntities = createSelector(
    getScenarioManagementState,
    fromScenarioManagement.getForecastPeriodEntities
)

export const getForecastPeriods = createSelector(
    getForecastPeriodIds,
    getForecastPeriodEntities,
    (ids, entities) => {
        return ids.map((id) => entities[id]);
    }
)


export const getForecastPeriodsLoading = createSelector(
    getScenarioManagementState,
    fromScenarioManagement.getForecastPeriodsLoading
)

export const getForecastPeriodsLoaded = createSelector(
    getScenarioManagementState,
    fromScenarioManagement.getForecastPeriodsLoaded
)

/* ================ SCENARIOS  ===================== */

export const getScenarioIds = createSelector(
    getScenarioManagementState,
    fromScenarioManagement.getScenarioIds
)

export const getScenarioEntities = createSelector(
    getScenarioManagementState,
    fromScenarioManagement.getScenarioEntities
)

export const getScenarios = createSelector(
    getScenarioIds,
    getScenarioEntities,
    (ids, entities) => {
        return ids.map((id) => entities[id]);
    }
)

export const getScenariosLoading = createSelector(
    getScenarioManagementState,
    fromScenarioManagement.getScenariosLoading
)

export const getScenariosLoaded = createSelector(
    getScenarioManagementState,
    fromScenarioManagement.getScenariosLoaded
)

/* ================ FORECAST ===================== */

export const getAggregatedForecastEntities = createSelector(
    getScenarioManagementState,
    fromScenarioManagement.getAggregatedForecastEntities
)

export const getForecasts = createSelector(
    getForecastPeriodIds,
    getAggregatedForecastEntities,
    (ids, entities) => {
        let output = []
        ids.map((id) => {
            if(entities[id] !== undefined){
                output.push(entities[id])
            }
        });
        return output
    }
)

export const getForecastsLoading = createSelector(
    getScenarioManagementState,
    fromScenarioManagement.getAggregatedForecastLoading
)

export const getForecastsLoaded = createSelector(
    getScenarioManagementState,
    fromScenarioManagement.getAggregatedForecastLoaded
)


