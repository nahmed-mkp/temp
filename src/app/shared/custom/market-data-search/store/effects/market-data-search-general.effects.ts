import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';


import * as fromActions from './../actions';
import * as fromServices from './../../services';
import * as fromModels from './../../models';


@Injectable({
    providedIn: 'root'
})
export class MarketDataSearchGeneralEffects {

    @Effect()
    searchSecurity$: Observable<Action> =
        this.actions$.pipe(
            ofType(fromActions.SecuritySearchActionTypes.SECURITY_SEARCH),
            map((action: fromActions.SearchSecurity) => action.payload),
            switchMap((payload: fromModels.ISecuritySearch) => {
                return this.service$
                    .searchSecuritiesGeneral(payload)
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
            switchMap((payload: number) => {
                return this.service$
                    .loadMarketDataTypesGeneral(payload)
                    .pipe(
                        map((res: any[]) => new fromActions.LoadMarketDataTypesComplete(res)),
                        catchError((res: string) => of(new fromActions.LoadMarketDataTypesFailed(res)))
                    );
            })
        );



    // --------------------------------------------------------------

    @Effect()
    enhancedSearchSecurity$: Observable<Action> =
        this.actions$.pipe(
            ofType(fromActions.SecuritySearchActionTypes.ENHANCED_SECURITY_SEARCH),
            map((action: fromActions.EnhanceSearchSecurity) => action.payload),
            switchMap((payload: fromModels.SecuritySearchCriteria) => {
                return this.service$
                    .searchSecurity(payload)
                    .pipe(
                        map((res: any) => {
                            return new fromActions.EnhanceSearchSecurityComplete(res);
                        }),
                        catchError((err: string) => of(new fromActions.EnhanceSearchSecurityFailed(err)))
                    );
            }));

    constructor(
        private actions$: Actions,
        private service$: fromServices.MarketDataSearchService
    ) {}
}