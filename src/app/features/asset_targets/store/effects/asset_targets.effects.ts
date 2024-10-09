import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, from, of } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { catchError, map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import * as fromServices from './../../services/asset_targets.service';
import * as fromActions from './../actions/asset_targets.actions';
import * as fromStore from '../../store';
import * as fromSelectors from '../../store/selectors';

@Injectable()
export class AssetTargetsEffects {
    
    checkUserAccess$ = createEffect( () => this.actions$.pipe(
        ofType(fromActions.checkUserAccess),
        switchMap( () => {
            return this.assetTargetsService$
            .checkAccessLevel()
            .pipe(
                map((res) => fromActions.checkUserAccessComplete(res)),
                catchError((err: string) => of(fromActions.checkUserAccessFailed(err)))    
            )
        })
    ))

    checkUserLimitedAccess$ = createEffect( () => this.actions$.pipe(
        ofType(fromActions.checkUserLimitedAccess),
        switchMap( () => {
            return this.assetTargetsService$
            .checkLimitedAccessLevel()
            .pipe(
                map((res) => fromActions.checkUserLimitedAccessComplete(res)),
                catchError((err: string) => of(fromActions.checkUserLimitedAccessFailed(err)))    
            )
        })
    ))

    changeAssetTargetType$ = createEffect( () => this.actions$.pipe(
        ofType(fromActions.changeAssetType),
        switchMap( ({payload}) => {
            return ([
                // no need to call dashboard data here, it will be called in the changeEditorAssetType$ effect
                fromActions.loadScenarioTargetDashboardData(payload),
                fromActions.loadScenarioProbabilityDashboardData(payload),
                fromActions.loadAssetTargets(payload),
                fromActions.loadAssetTargetTimeseries({assetType: payload, date: new Date()}),
            ])
        })
    ))

    changeEditorAssetType$ = createEffect( () => this.actions$.pipe(
        ofType(fromActions.changeEditorAssetType),
        switchMap( ({payload}) => {
            return ([
                fromActions.loadScenarioTargetDashboardData(payload),
                fromActions.loadScenarioProbabilityDashboardData(payload),
                fromActions.loadAssetTargetTimeseries({assetType: payload, date: new Date()}),
            ])
        })
    ))

    loadAssetTargets$ = createEffect( () => this.actions$.pipe(
        ofType(fromActions.loadAssetTargets),
        switchMap( ({assetType}) => {
            return this.assetTargetsService$
            .getAssetTargets(assetType)
            .pipe(
                map((res) => fromActions.loadAssetTargetsComplete(res)),
                catchError((err: string) => of(fromActions.loadAssetTargetsFailed(err)))    
            )
        })
    ))


    loadEditorAssetTargets$ = createEffect( () => this.actions$.pipe(
        ofType(fromActions.loadEditorAssetTargets),
        switchMap( ({payload}) => {
            return this.assetTargetsService$
            .getAssetTargets(payload)
            .pipe(
                map((res) => fromActions.loadEditorAssetTargetsComplete(res)),
                catchError((err: string) => of(fromActions.loadEditorAssetTargetsFailed(err)))    
            )
        })
    ))


    loadHistoricalAssetTargets$ = createEffect( () => this.actions$.pipe(
        ofType(fromActions.loadHistoricalAssetTargets),
        switchMap( ({payload}) => {
            return this.assetTargetsService$
            .getHistoricalAssetTargets(payload)
            .pipe(
                map((res) => fromActions.loadHistoricalAssetTargetsComplete(res)),
                catchError((err: string) => of(fromActions.loadHistoricalAssetTargetsFailed(err)))    
            )
        })
    ))

    loadTestAssetTargets$ = createEffect( () => this.actions$.pipe(
        ofType(fromActions.loadTestAssetTargets),
        switchMap( ({payload}) => {
            return this.assetTargetsService$
            .getTestAssetTargets(payload)
            .pipe(
                map((res) => fromActions.loadTestAssetTargetsComplete(res)),
                catchError((err: string) => of(fromActions.loadTestAssetTargetsFailed(err)))    
            )
        })
    ))

    loadAssetTargetTimeseries$ = createEffect( () => this.actions$.pipe(
        ofType(fromActions.loadAssetTargetTimeseries),
        switchMap( ({payload}) => {
            return this.assetTargetsService$
            .getAssetTargetTimeseries(payload)
            .pipe(
                map((res) => fromActions.loadAssetTargetTimeseriesComplete(res)),
                catchError((err: string) => of(fromActions.loadAssetTargetTimeseriesFailed(err)))    
            )
        })
    ))


    loadScenarioTargetDashboardData$ = createEffect( () => this.actions$.pipe(
        ofType(fromActions.loadScenarioTargetDashboardData),
        switchMap( ({assetType}) => {
            return this.assetTargetsService$
            .getScenarioTargetDashboardData(assetType)
            .pipe(
                map((res) => fromActions.loadScenarioTargetDashboardDataComplete(res)),
                catchError((err: string) => of(fromActions.loadScenarioTargetDashboardDataFailed(err)))    
            )
        })
    ))

    udpateScenarioTarget$ = createEffect( () => this.actions$.pipe(
        ofType(fromActions.updateScenarioTarget),
        switchMap( ({payload}) => {
            return this.assetTargetsService$
            .updateScenarioTarget(payload)
            .pipe(
                map((res) => fromActions.updateScenarioTargetComplete(res)),
                catchError((err: string) => of(fromActions.updateScenarioTargetFailed(err)))    
            )
        })
    ))

    loadScenarioProbabilityDashboardData$ = createEffect( () => this.actions$.pipe(
        ofType(fromActions.loadScenarioProbabilityDashboardData),
        switchMap( ({assetType}) => {
            return this.assetTargetsService$
            .getScenarioProbabilityDashboardData(assetType)
            .pipe(
                map((res) => fromActions.loadScenarioProbabilityDashboardDataComplete(res)),
                catchError((err: string) => of(fromActions.loadScenarioProbabilityDashboardDataFailed(err)))    
            )
        })
    ))

    updateScenarioProbability$ = createEffect( () => this.actions$.pipe(
        ofType(fromActions.updateScenarioProbability),
        switchMap( ({payload}) => {
            return this.assetTargetsService$
            .updateScenarioProbability(payload)
            .pipe(
                map((res) => fromActions.updateScenarioProbabilityComplete(res)),
                catchError((err: string) => of(fromActions.updateScenarioProbabilityFailed(err)))    
            )
        })
    ))

    updateScenarioSortOrder$ = createEffect( () => this.actions$.pipe(
        ofType(fromActions.updateScenarioSortOrder),
        switchMap( ({payload}) => {
            return this.assetTargetsService$   
                .updateScenarioSortOrder(payload)
                .pipe(
                    map( () => fromActions.updateScenarioSortOrderComplete()),
                    catchError( (err: string) => of(fromActions.updateScenarioSorderOrderFailed(err)))
                )
        })
    ))

    loadSupportedCalcultaorCountries$ = createEffect( () => this.actions$.pipe(
        ofType(fromActions.getSupportedCalculatorCountries),
        switchMap( () => {
            return this.assetTargetsService$
            .getSupportedCalculatorCountries()
            .pipe(
                map((res) => fromActions.getSupportedCalculatorCountriesComplete(res)),
                catchError((err: string) => of(fromActions.getSupportedCalculatorCountriesFailed(err)))    
            )
        })
    ))

    loadCalculatorByCountry$ = createEffect( () => this.actions$.pipe(
        ofType(fromActions.loadCalculatorInputsByCountry),
        withLatestFrom(this.store.select(fromSelectors.getSupportedCalculatorCounties)),
        mergeMap( ([action, supportedCounties]) => {
            if(supportedCounties.includes(action.country)){
                return this.assetTargetsService$
                .getCalculatorInputsByCountry(action.country)
                .pipe(
                    switchMap( (res) => {
                        return [fromActions.loadCalculatorInputsByCountryComplete(res, action.country)]
                    }),
                    catchError( (err: string) => of(fromActions.loadCalculatorInputsByCountryFailed(err)))
                )
            } else {
                return EMPTY
            }
        })
    ))

    // loadCalculatorByCountry$ = createEffect( () => this.actions$.pipe(
    //     ofType(fromActions.loadCalculatorInputsByCountry),
    //     switchMap( ({country}) => {
    //         return this.assetTargetsService$
    //             .getCalculatorInputsByCountry(country)
    //             .pipe(
    //                 map( (res) => fromActions.loadCalculatorInputsByCountryComplete(res)),
    //                 catchError( (err: string) => of(fromActions.loadCalculatorInputsByCountryFailed(err)))
    //             )
    //     })
    // ))

    constructor(
        private actions$: Actions,
        private assetTargetsService$: fromServices.AssetTargetsService,
        private store: Store<fromStore.AssetTargetsState>
    ) { }    
}