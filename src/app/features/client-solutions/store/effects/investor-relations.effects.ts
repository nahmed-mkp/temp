import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';

import * as fromServices from '../../services';
import * as fromActions from '../actions';


@Injectable()
export class InvestorRelationsEffects {

    @Effect()
    loadTabs$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.InvestorRelationsActionsType.LOAD_TABS),
            switchMap(payload => {
                return this.investorRelationsService$
                    .getTabs()
                    .pipe(
                        map((res: any) => new fromActions.LoadTabsDataComplete(res)),
                        catchError(err => of(new fromActions.LoadTabsDataFailed(err)))
                    );
        }));


    @Effect()
    loadAdminStatements$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.InvestorRelationsActionsType.LOAD_ADMIN_STATEMENTS),
            map((action: fromActions.LoadAdminStatements) => action.payload),
            switchMap(payload => {
                return this.investorRelationsService$
                    .getAdminStatements(payload)
                    .pipe(
                        map((res: any[]) => new fromActions.LoadAdminStatementsComplete(res)),
                        catchError(err => of(new fromActions.LoadAdminStatementsFailed(err)))
                    );
            }));


    @Effect()
    loadFirmAUMBalances$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.InvestorRelationsActionsType.LOAD_FIRM_AUM_BALANCES),
            map((action: fromActions.LoadFirmAUMBalances) => action.payload),
            switchMap(payload => {
                return this.investorRelationsService$
                    .getFirmAUMBalances(payload)
                    .pipe(
                        map((res: any) => new fromActions.LoadFirmAUMBalancesComplete(res)),
                        catchError(err => of(new fromActions.LoadFirmAUMBalancesFailed(err)))
                    );
        }));

    @Effect()
    loadFirmRelationsList$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.InvestorRelationsActionsType.LOAD_FIRM_RELATIONS_LIST),
            map((action: fromActions.LoadFirmRelationsList) => action.payload),
            switchMap(payload => {
                return this.investorRelationsService$
                    .getFirmRelationsList(payload)
                    .pipe(
                        map((res: any) => new fromActions.LoadFirmRelationsListComplete(res)),
                        catchError(err => of(new fromActions.LoadFirmRelationsListFailed(err)))
                    );
        }));

    @Effect()
    loadFirmTop10$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.InvestorRelationsActionsType.LOAD_FIRM_TOP_10_INVESTORS),
            map((action: fromActions.LoadFirmRelationsTop10) => action.payload),
            switchMap(payload => {
                return this.investorRelationsService$
                    .getFirmTop10Investors(payload)
                    .pipe(
                        map((res: any) => new fromActions.LoadFirmRelationsTop10Complete(res.filter(item => {
                            return item.SortOrder < 11;
                        }))),
                        catchError(err => of(new fromActions.LoadFirmRelationsTop10Failed(err)))
                    );
        }));

    @Effect()
    loadFirmInvestorTypes$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.InvestorRelationsActionsType.LOAD_FIRM_INVESTOR_TYPES),
            map((action: fromActions.LoadFirmInvestorTypes) => action.payload),
            switchMap(payload => {
                return this.investorRelationsService$
                    .getFirmInvestorType(payload)
                    .pipe(
                        map((res: any) => new fromActions.LoadFirmInvestorTypesComplete(res)),
                        catchError(err => of(new fromActions.LoadFirmInvestorTypesFailed(err)))
                    );
        }));

    @Effect()
    loadFirmRegions$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.InvestorRelationsActionsType.LOAD_FIRM_REGIONS),
            map((action: fromActions.LoadFirmRegions) => action.payload),
            switchMap(payload => {
                return this.investorRelationsService$
                    .getFirmRegions(payload)
                    .pipe(
                        map((res: any) => new fromActions.LoadFirmRegionsComplete(res)),
                        catchError(err => of(new fromActions.LoadFirmRegionsFailed(err)))
                    );
        }));


    @Effect()
    loadFundAUMBalances$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.InvestorRelationsActionsType.LOAD_FUND_AUM_BALANCES),
            map((action: fromActions.LoadFundAUMBalances) => action.payload),
            switchMap(payload => {
                return this.investorRelationsService$
                    .getFundAUMBalances(payload)
                    .pipe(
                        map((res: any) => new fromActions.LoadFundAUMBalancesComplete(res)),
                        catchError(err => of(new fromActions.LoadFundAUMBalancesFailed(err)))
                    );
        }));

    @Effect()
    loadFundTop10$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.InvestorRelationsActionsType.LOAD_FUND_TOP_10_INVESTORS),
            map((action: fromActions.LoadFundRelationsTop10) => action.payload),
            switchMap(payload => {
                return this.investorRelationsService$
                    .getFundTop10Investors(payload)
                    .pipe(
                        map((res: any) => new fromActions.LoadFundRelationsTop10Complete(res.filter(item => {
                            return item.SortOrder < 11;
                        }))),
                        catchError(err => of(new fromActions.LoadFundRelationsTop10Failed(err)))
                    );
        }));

    @Effect()
    loadFundInvestorTypes$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.InvestorRelationsActionsType.LOAD_FUND_INVESTOR_TYPES),
            map((action: fromActions.LoadFundInvestorTypes) => action.payload),
            switchMap(payload => {
                return this.investorRelationsService$
                    .getFundInvestorType(payload)
                    .pipe(
                        map((res: any) => new fromActions.LoadFundInvestorTypesComplete(res)),
                        catchError(err => of(new fromActions.LoadFirmInvestorTypesFailed(err)))
                    );
        }));

    @Effect()
    loadFundRegions$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.InvestorRelationsActionsType.LOAD_FUND_REGIONS),
            map((action: fromActions.LoadFundRegions) => action.payload),
            switchMap(payload => {
                return this.investorRelationsService$
                    .getFundRegions(payload)
                    .pipe(
                        map((res: any) => new fromActions.LoadFundRegionsComplete(res)),
                        catchError(err => of(new fromActions.LoadFundRegionsFailed(err)))
                    );
        }));

    @Effect()
    loadInvestors$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.InvestorRelationsActionsType.LOAD_INVESTORS),
            switchMap(() => {
                return this.investorRelationsService$
                    .getInvestors()
                    .pipe(
                        map((res: any) => new fromActions.LoadInvestorsComplete(res)),
                        catchError(err => of(new fromActions.LoadInvestorsFailed(err)))
                    );
        }));

    @Effect()
    editInvestors$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.InvestorRelationsActionsType.EDIT_INVESTOR),
            map((action: fromActions.EditInvestor) => action.payload),
            switchMap((payload: any) => {
                return this.investorRelationsService$
                    .editInvestor(payload)
                    .pipe(
                        map((res: any[]) => new fromActions.EditInvestorComplete(res)),
                        catchError(err => of(new fromActions.EditInvestorFailed(err)))
                    );
            }));


    @Effect()
    deleteInvestor$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.InvestorRelationsActionsType.DELETE_INVESTOR),
            map((action: fromActions.DeleteInvestor) => action.payload),
            switchMap((payload: any) => {
                return this.investorRelationsService$
                    .deleteInvestor(payload)
                    .pipe(
                        map((res: any[]) => new fromActions.DeleteInvestorComplete(res)),
                        catchError(err => of(new fromActions.DeleteInvestorFailed(err)))
                    );
            }));

    @Effect()
    getPermissions$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.InvestorRelationsActionsType.GET_PERMISSIONS),
            switchMap(() => {
                return this.investorRelationsService$
                    .getPermissions()
                    .pipe(
                        map((res: boolean) => new fromActions.CanEditInvestorDetailsComplete(res)),
                        catchError(err => of(new fromActions.CanEditInvestorDetailsFailed(err)))
                    );
            }));

    @Effect()
    loadAdminStatementExceptions$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.InvestorRelationsActionsType.LOAD_ADMIN_STATEMENT_EXCEPTIONS),
            switchMap(() => {
                return this.investorRelationsService$
                    .getAdminStatementExceptions()
                    .pipe(
                        map((res: any[]) => new fromActions.LoadAdminStatementExceptionsComplete(res)),
                        catchError(err => of(new fromActions.LoadAdminStatementsFailed(err)))
                    );
            }));


    constructor(private actions$: Actions,
        private investorRelationsService$: fromServices.InvestorRelationsService) { }
}
