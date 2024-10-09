import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as fromServices from '../../services';
import * as fromActions from '../../store/actions';
import * as fromStore from '../../store';
import * as fromModels from '../../models';
import { Store } from "@ngrx/store";
import { catchError, map, switchMap } from "rxjs/operators";
import { of } from "rxjs";

@Injectable()
export class ScenarioManagementEffects {

    /* ============ COUNTRY ============= */

    loadCountryData$ = createEffect( () => this.actions$.pipe(
        ofType(fromActions.loadCountries),
        switchMap( () => {
            return this.scenarioManagementService$.loadCountries()
            .pipe(
                map((res) => fromActions.loadCountriesComplete(res)),
                catchError( (err: string) => of(fromActions.loadCountriesFailed(err)))
            )
        })
    ))

    updateCountryData$ = createEffect( () => this.actions$.pipe(
        ofType(fromActions.updateCountry),
        switchMap( ({payload}) => {
            return this.scenarioManagementService$.updateCountry(payload)
            .pipe(
                map( (res) => fromActions.updateCountryComplete(res)),
                catchError( (err: string) => of(fromActions.updateCountryFailed(err)))
            )
        })
    ))

    /* ============ ECONOMIC VARIABLE ============= */

    loadEconomicVariables$ = createEffect( () => this.actions$.pipe(
        ofType(fromActions.loadEconomicVariables),
        switchMap( () => {
            return this.scenarioManagementService$.loadEconomicVariables()
            .pipe(
                map((res) => fromActions.loadEconomicVariablesComplete(res)),
                catchError( (err: string) => of(fromActions.loadEconomicVariablesFailed(err)))
            )
        })
    ))

    updateEconomicVariable$ = createEffect( () => this.actions$.pipe(
        ofType(fromActions.updateEconomicVariable),
        switchMap( ({payload}) => {
            return this.scenarioManagementService$.updateEconomicVariable(payload)
            .pipe(
                map((res) => fromActions.updateEconomicVariableComplete(res)),
                catchError( (err: string) => of(fromActions.updateEconomicVariableFailed(err)))
            )
        })
    ))

    createEconomicVariable$ = createEffect( () => this.actions$.pipe(
        ofType(fromActions.createEconomicVariable),
        switchMap( ({payload}) => {
            return this.scenarioManagementService$.createEconomicVariable(payload)
            .pipe(
                map( (res: fromModels.IEconomicVariable[]) => fromActions.createEconomicVariableComplete(res)),
                catchError( (err: string) => of(fromActions.createEconomicVariableFailed(err)))
            )
        })
    ))

    /* ============ FORECAST PERIOD ============= */

    loadForecastPeriods$ = createEffect( () => this.actions$.pipe(
        ofType(fromActions.loadCountryForecastPeriods),
        switchMap( () => {
            return this.scenarioManagementService$.loadForecastPeriods()
            .pipe(
                map((res) => fromActions.loadCountryForecastPeriodsComplete(res)),
                catchError( (err: string) => of(fromActions.loadCountryForecastPeriodsFailed(err)))
            )
        })
    ))

    updateForecastPeriod$ = createEffect( () => this.actions$.pipe(
        ofType(fromActions.updateCountryForecastPeriod),
        switchMap( ({payload}) => {
            return this.scenarioManagementService$.updateForecastPeriod(payload)
            .pipe(
                map((res) => fromActions.updateCountryForecastPeriodComplete(res)),
                catchError( (err: string) => of(fromActions.updateCountryForecastPeriodFailed(err)))
            )
        })
    ))

    createForecastPeriod$ = createEffect( () => this.actions$.pipe(
        ofType(fromActions.createForecastPeriod),
        switchMap( ({payload}) => {
            return this.scenarioManagementService$.createForecastPeriod(payload)
            .pipe(
                map( (res: fromModels.IForecastPeriod[]) => fromActions.createForecastPeriodComplete(res)),
                catchError( (err: string) => of(fromActions.createForecastPeriodFailed(err)))
            )
        })
    ))


    /* ============ SCENARIO ============= */

    loadScenarios$ = createEffect( () => this.actions$.pipe(
        ofType(fromActions.loadScenarios),
        switchMap( () => {
            return this.scenarioManagementService$.loadScenarios()
            .pipe(
                map((res) => fromActions.loadScenariosComplete(res)),
                catchError( (err: string) => of(fromActions.loadScenariosFailed(err)))
            )
        })
    ))

    udpateScenario$ = createEffect( () => this.actions$.pipe(
        ofType(fromActions.updateScenario),
        switchMap( ({payload}) => {
            return this.scenarioManagementService$.udpateScenario(payload)
            .pipe(
                map((res) => fromActions.updateScenarioComplete(res)),
                catchError( (err: string) => of(fromActions.updateScenarioFailed(err)))
            )
        })
    ))

    createScenario$ = createEffect( () => this.actions$.pipe(
        ofType(fromActions.createScenario),
        switchMap( ({payload}) => {
            return this.scenarioManagementService$.createScenario(payload)
            .pipe(
                map( (res: fromModels.IScenario[]) => fromActions.createScenarioComplete(res)),
                catchError( (err: string) => of(fromActions.createScenarioFailed(err)))
            )
        })
    ))

    /* ============ FORECASTS ============= */

    loadForecasts$ = createEffect( () => this.actions$.pipe(
        ofType(fromActions.loadAggregatedForecast),
        switchMap( () => {
            return this.scenarioManagementService$.loadAggregatedForecasts()
            .pipe(
                map((res) => fromActions.loadAggregatedForecastComplete(res)),
                catchError( (err: string) => of(fromActions.loadAggregatedForecastFailed(err)))
            )
        })
    ))

    updateForecast$ = createEffect( () => this.actions$.pipe(
        ofType(fromActions.updateAggregatedForecast),
        switchMap( ({payload}) => {
            return this.scenarioManagementService$.updateForecast(payload)
            .pipe(
                map((res) => fromActions.updateAggregatedForecastComplete(res)),
                catchError( (err: string) => of(fromActions.updateAggregatedForecastFailed(err)))
            )
        })
    ))

    createForecast$ = createEffect( () => this.actions$.pipe (
        ofType(fromActions.createForecast),
        switchMap( ({payload}) => {
            return this.scenarioManagementService$.createForecast(payload)
            .pipe(
                map( (res: fromModels.IForecast[]) => fromActions.createForecastComplete(res)),
                catchError( (err:string) => of(fromActions.createForecastFailed(err)))
            )
        })
    ))

    constructor(
        private actions$: Actions,
        private scenarioManagementService$: fromServices.ScenarioManagementService,
        private store: Store<fromStore.ScenarioManagementState>,
    ) { }
}

