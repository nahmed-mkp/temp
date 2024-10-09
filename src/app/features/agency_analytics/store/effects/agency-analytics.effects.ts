import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';

import * as fromModels from '../../models';
import * as fromServices from './../../services/agency-analytics.service';
import * as fromActions from './../actions/agency-analytics.actions';

@Injectable()
export class AgencyAnalyticsEffects {

    @Effect()
    loadLookups$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.AgencyAnalyticsActionTypes.LOAD_LOOKUPS),
            switchMap(() => {
                return this.agencyAnalyticsService$
                    .loadLookups()
                    .pipe(
                        map((res: any) => new fromActions.LoadLookupsComplete(res)),
                        catchError((err: string) => of(new fromActions.LoadLookupsFailed(err))
                        ));
            })
        );

    @Effect()
    loadPortfolios$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.AgencyAnalyticsActionTypes.LOAD_PORTFOLIOS),
            switchMap(() => {
                return this.agencyAnalyticsService$
                    .loadPortfolios()
                    .pipe(
                        map((res: fromModels.IPortfolio[]) => new fromActions.LoadPortfoliosComplete(res)),
                        catchError((err: string) => of(new fromActions.LoadPortfoliosFailed(err))
                        ));
            })
    );

    @Effect()
    createPortfolio$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.AgencyAnalyticsActionTypes.CREATE_PORTFOLIO),
            map((action: fromActions.CreatePortfolio) => action.payload),
            switchMap((payload: fromModels.INewPortfolio) => {
                return this.agencyAnalyticsService$
                    .createPortfolio(payload)
                    .pipe(
                        map((res: fromModels.IPortfolio) => new fromActions.CreatePortfolioComplete(res)),
                        catchError((err: string) => of(new fromActions.CreatePortfolioFailed(err))
                        ));
            })
    );

    @Effect()
    updatePortfolio$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.AgencyAnalyticsActionTypes.UPDATE_PORTFOLIO),
            map((action: fromActions.UpdatePortfolio) => action.payload),
            switchMap((payload: fromModels.IPortfolio) => {
                return this.agencyAnalyticsService$
                    .updatePortfolio(payload)
                    .pipe(
                        map((res: fromModels.IPortfolio) => new fromActions.UpdatePortfolioComplete(res)),
                        catchError((err: string) => of(new fromActions.UpdatePortfolioFailed(err))
                        ));
            })
    );

    @Effect()
    deletePortfolio$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.AgencyAnalyticsActionTypes.DELETE_PORTFOLIO),
            map((action: fromActions.DeletePortfolio) => action.payload),
            switchMap((payload: fromModels.IPortfolio) => {
                return this.agencyAnalyticsService$
                    .deletePortfolio(payload)
                    .pipe(
                        map((res: fromModels.IPortfolio) => new fromActions.DeletePortfolioComplete(res)),
                        catchError((err: string) => of(new fromActions.DeletePortfolioFailed(err))
                        ));
            })
        );

    @Effect()
    loadPortfolio$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.AgencyAnalyticsActionTypes.LOAD_PORTFOLIO),
            map((action: fromActions.LoadPortfolio) => action.portfolio),
            switchMap((portfolio: fromModels.IPortfolio) => {
                return this.agencyAnalyticsService$
                    .loadPortfolio(portfolio)
                    .pipe(
                        map((res: fromModels.IPortfolioDetail) => new fromActions.LoadPortfolioComplete(portfolio, res)),
                        catchError((err: string) => of(new fromActions.LoadPortfolioFailed(portfolio, err))
                    ));
            })
    );

    @Effect()
    reloadPortfolio$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.AgencyAnalyticsActionTypes.RELOAD_PORTFOLIO),
            map((action: fromActions.LoadPortfolio) => action.portfolio),
            switchMap((portfolio: fromModels.IPortfolio) => {
                return this.agencyAnalyticsService$
                    .reloadPortfolio(portfolio)
                    .pipe(
                        map((res: fromModels.IPortfolioDetail) => new fromActions.ReloadPortfolioComplete(portfolio, res)),
                        catchError((err: string) => of(new fromActions.ReloadPortfolioFailed(portfolio, err))
                        ));
            })
        );

    @Effect()
    searchSecurity$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.AgencyAnalyticsActionTypes.SEARCH_SECURITY),
            map((action: fromActions.SearchSecurity) => action.payload),
            switchMap((payload: fromModels.IQuickSearch) => {
                return this.agencyAnalyticsService$
                    .searchSecurity(payload)
                    .pipe(
                        map((res: fromModels.ISearchResult) => new fromActions.SearchSecurityComplete(res)),
                        catchError((err: string) => of(new fromActions.SearchSecurityFailed(err))
                        ));
            })
    );

    @Effect()
    validateSecurities$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.AgencyAnalyticsActionTypes.VALIDATE_SECURITIES),
            map((action: fromActions.ValidateSecurities) => action.payload),
            switchMap((payload: string[]) => {
                return this.agencyAnalyticsService$
                    .validateSecurities(payload)
                    .pipe(
                        map((res: fromModels.IValidSecurity[]) => new fromActions.ValidateSecuritiesComplete(res)),
                        catchError((err: string) => of(new fromActions.ValidateSecuritiesFailed(err))
                        ));
            })
    );
    
    constructor(private actions$: Actions,
        private agencyAnalyticsService$: fromServices.AgencyAnalyticsService) { }
}