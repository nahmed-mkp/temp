import { createAction } from "@ngrx/store";
import * as fromModels from '../../models';

export const loadCountries = createAction('[Scenario Management] Load countries')
export const loadCountriesComplete = createAction('[Scenario Management] Load countries complete', (countries: fromModels.ICountry[]) => ({countries}))
export const loadCountriesFailed = createAction('[Scenario Management] Load countries failed', (err: string) => ({err}))

export const updateCountry = createAction('[Scenario Management] Update country', (payload: fromModels.ICountryUpdateReq) => ({payload}))
export const updateCountryComplete = createAction('[Scenario Management] Update country complete', (countries: fromModels.ICountry[]) => ({countries}))
export const updateCountryFailed = createAction('[Scenario Management] Update county failed', (err: string) => ({err}))

/* ----------- */ 

export const loadEconomicVariables = createAction('[Scenario Management] Load economic variables')
export const loadEconomicVariablesComplete = createAction('[Scenario Management] Load economic variables complete', (econVars: fromModels.IEconomicVariable[]) => ({econVars}))
export const loadEconomicVariablesFailed = createAction('[Scenario Management] Load economic variables failed', (err: string) => ({err}))

export const updateEconomicVariable = createAction('[Scenario Management] Update economic variable', (payload: fromModels.IEconomicVariableUpdateReq) => ({payload}))
export const updateEconomicVariableComplete = createAction('[Scenario Management] Update economic variable complete', (payload: fromModels.IEconomicVariable[]) => ({payload}))
export const updateEconomicVariableFailed = createAction('[Scenario Management] Update economic variable failed', (err: string) => ({err}))

export const createEconomicVariable = createAction('[Scenario Management] Create economic variable', (payload: fromModels.IEconomicVariableCreateReq) => ({payload}))
export const createEconomicVariableComplete = createAction('[Scenario Management] Create economic variable complete', (res: fromModels.IEconomicVariable[]) => ({res}))
export const createEconomicVariableFailed = createAction('[Scenario Management] Create economic variable failed', (err: string) => ({err}))

/* ----------- */ 

export const loadCountryForecastPeriods = createAction('[Scenario Management] Load forecast periods')
export const loadCountryForecastPeriodsComplete = createAction('[Scenario Management] Load forecast periods complete', (forecastPeriods: fromModels.IForecastPeriod[]) => ({forecastPeriods}))
export const loadCountryForecastPeriodsFailed = createAction('[Scenario Management] Load forecast periods failed', (err: string) => ({err}))

export const updateCountryForecastPeriod = createAction('[Scenario Management] Update ocuntry forecast period', (payload: fromModels.IForecastPeriodUpdateReq) => ({payload}))
export const updateCountryForecastPeriodComplete = createAction('[Scenario Management] Update ocuntry forecast period complete', (payload: fromModels.IForecastPeriod[]) => ({payload}))
export const updateCountryForecastPeriodFailed = createAction('[Scenario Management] Update ocuntry forecast period failed', (err: string) => ({err}))

export const createForecastPeriod = createAction('[Scenario Management] Create forecast period', (payload: fromModels.IForecastPeriodCreateReq) => ({payload}))
export const createForecastPeriodComplete = createAction('[Scenario Management] Create forecast period complete', (res: fromModels.IForecastPeriod[]) => ({res}))
export const createForecastPeriodFailed = createAction('[Scenario Management] Create forecast period failed', (err: string) => ({err}))

/* ----------- */ 

export const loadScenarios = createAction('[Scenario Management] Load scenarios')
export const loadScenariosComplete  = createAction('[Scenario Management] Load scenarios complete', (scenarios: fromModels.IScenario[]) => ({scenarios}))
export const loadScenariosFailed = createAction('[Scenario Management] Load scenarios failed', (err: string) => ({err}))

export const updateScenario = createAction('[Scenario Manamgement] Update scenario', (payload: fromModels.IScenarioUpdateReq) => ({payload}))
export const updateScenarioComplete = createAction('[Scenario Manamgement] Update scenario complete' , (payload: fromModels.IScenario[]) => ({payload}))
export const updateScenarioFailed = createAction('[Scenario Manamgement] Update scenario failed', (err: string) => ({err}))

export const createScenario = createAction('[Scenario Management] Create scenario', (payload: fromModels.IScenarioCreateReq) => ({payload}))
export const createScenarioComplete = createAction('[Scenario Management] Create scenario complete', (res: fromModels.IScenario[]) => ({res}))
export const createScenarioFailed = createAction('[Scenario Management] Create scenario failed', (err: string) => ({err}))

/* ----------- */ 

export const loadAggregatedForecast = createAction('[Scenario Management] Load aggregated forecast data')
export const loadAggregatedForecastComplete = createAction('[Scenario Management] Load aggregated forecast data complete', (payload: fromModels.IForecast[]) => ({payload}))
export const loadAggregatedForecastFailed = createAction('[Scenario Management] Load aggregated forecast data failed', (err: string) => ({err}))

export const updateAggregatedForecast = createAction('[Scenario Management] Update aggregated forecast', (payload: fromModels.IForecastUpdateReq) => ({payload}))
export const updateAggregatedForecastComplete = createAction('[Scenario Management] Update aggregated forecast complete', (res: fromModels.IForecast[]) => ({res}))
export const updateAggregatedForecastFailed = createAction('[Scenario Management] Update aggregated forecast failed', (err: string) => ({err}))

export const createForecast = createAction('[Scenario Management] Create forecast ', (payload: fromModels.IForecastCreateReq) => ({payload}))
export const createForecastComplete = createAction('[Scenario Management] Create forecast complete', (res: fromModels.IForecast[]) => ({res}))
export const createForecastFailed = createAction('[Scenario Management] Create forecast failed', (err: string) => ({err}))
