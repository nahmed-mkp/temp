import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { switchMap, map, catchError } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';

import * as fromModels from './../../models/covid.models';

import * as fromActions from './../actions';
import * as fromServices from './../../services';

@Injectable()
export class CovidEffects {

    @Effect()
    loadCountries$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.CovidActionTypes.LOAD_COUNTRIES),
            switchMap(() => {
                return this.covidService$
                    .getCountries()
                    .pipe(
                        map((res: fromModels.ICountry[]) => new fromActions.LoadCountriesComplete(res)),
                        catchError((err: string) => of(new fromActions.LoadCountriesFailed(err))
                        ));
            })
        );

    @Effect()
    loadData$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.CovidActionTypes.LOAD_DATA),
            switchMap(() => {
                return this.covidService$
                    .getData()
                    .pipe(
                        map((res: fromModels.IRecord) => new fromActions.LoadDataComplete(res)),
                        catchError((err: string) => of(new fromActions.LoadDataFailed(err))
                        ));
            })
        );

    @Effect()
    loadUSHistory$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.CovidActionTypes.LOAD_US_HISTORY),
            switchMap(() => {
                return this.covidService$
                    .getUSHistory()
                    .pipe(
                        map((res: any[]) => new fromActions.LoadUSHistoryComplete(res)),
                        catchError((err: string) => of(new fromActions.LoadUSHistoryFailed(err))
                        ));
            })
        );

    @Effect()
    loadUSStatesHistory$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.CovidActionTypes.LOAD_US_STATES_HISTORY),
            switchMap(() => {
                return this.covidService$
                    .getUSStatesHistory()
                    .pipe(
                        map((res: any[]) => new fromActions.LoadUSStatesHistoryComplete(res)),
                        catchError((err: string) => of(new fromActions.LoadUSStatesHistoryFailed(err))
                        ));
            })
        );

    @Effect()
    loadMobilityIndexCountries$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.CovidActionTypes.LOAD_MOBILITY_INDEX_COUNTRIES),
            switchMap(() => {
                return this.covidService$
                    .getMobilityIndexCountries()
                    .pipe(
                        map((res: any[]) => new fromActions.LoadMobilityIndexCountriesComplete(res)),
                        catchError((err: string) => of(new fromActions.LoadMobilityIndexCountriesFailed(err))
                        ));
            })
        );

    @Effect()
    loadMobilityIndexSubregions$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.CovidActionTypes.LOAD_MOBILITY_INDEX_SUB_REGIONS),
            map((action: fromActions.LoadMobilityIndexSubregions) => action.payload),
            switchMap((payload: string) => {
                return this.covidService$
                    .getMobilityIndexSubregions(payload)
                    .pipe(
                        map((res: any[]) => new fromActions.LoadMobilityIndexSubregionsComplete(res)),
                        catchError((err: string) => of(new fromActions.LoadMobilityIndexSubregionsFailed(err))
                        ));
            })
        );

    constructor(
        private actions$: Actions,
        private covidService$: fromServices.CovidService) { }
}
