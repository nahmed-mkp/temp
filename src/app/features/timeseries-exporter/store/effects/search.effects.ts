import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';


import * as fromModels from '../../models/search.models';
import * as fromServices from '../../services/timeseries-exporter.service';
import * as fromActions from '../actions/search.actions';
import { catchError, map, switchMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class SecuritySearchEffects {

    @Effect()
    searchSecurity$: Observable<Action> =
        this.actions$.pipe(
            ofType(fromActions.SecuritySearchActionTypes.SECURITY_SEARCH),
            map((action: fromActions.SearchSecurity) => action.payload),
            switchMap((payload: fromModels.ISecuritySearch) => {
                return this.timeseriesExporterService$
                    .searchSecurities(payload)
                    .pipe(
                        map((res: any) => {
                            return new fromActions.SearchSecurityComplete(res);
                        }),
                        catchError((err: string) => of(new fromActions.SearchSecurityFailed(err)))
                    );
            }));


    @Effect()
    loadMarketDataTypes$: Observable<Action> =
        this.actions$.pipe(
            ofType(fromActions.SecuritySearchActionTypes.LOAD_MARKET_DATA_TYPES),
            map((action: fromActions.LoadMarketDataTypes) => action.payload),
            switchMap((payload) => {
                return this.timeseriesExporterService$
                    .loadMarketDataTypes(payload.sid)
                    .pipe(
                        map((res: any[]) => new fromActions.LoadMarketDataTypesComplete({securityName: payload.securityName, data: res})),
                        catchError((res: string) => of(new fromActions.LoadMarketDataTypesFailed({securityName: payload.securityName, data: res})))
                    );
            })
        );

    constructor(
        private actions$: Actions,
        private timeseriesExporterService$: fromServices.TimeseriesExporterService
    ) {}
}
