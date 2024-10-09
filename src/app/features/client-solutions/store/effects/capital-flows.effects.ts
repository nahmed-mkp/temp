import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';

import * as fromServices from '../../services';
import * as fromActions from '../actions';
import * as fromModels from './../../models';
import { HighchartsDataService } from 'src/app/shared/custom/utilities';


@Injectable()
export class CapitalFlowsEffects {

    MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    @Effect()
    loadCapitalFlowDates$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.CapitalFlowsActionTypes.LOAD_CAPITAL_FLOW_DATES),
            switchMap(() => {
                return this.capitalFlowsService$
                    .loadCapitalFlowDates()
                    .pipe(
                        map((res: fromModels.DateRange) => new fromActions.LoadCapitalFlowDatesComplete(res)),
                        catchError(err => of(new fromActions.LoadCapitalFlowDatesFailed(err)))
                    );
            }));

    @Effect()
    loadCapitalFlows$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.CapitalFlowsActionTypes.LOAD_CAPITAL_FLOWS),
            map((action: fromActions.LoadCapitalFlows) => action.payload),
            switchMap(payload => {
                return this.capitalFlowsService$
                    .loadCapitalFlows(payload)
                    .pipe(
                        map((res: fromModels.CapitalFlow[]) => new fromActions.LoadCapitalFlowsComplete(res)),
                        catchError(err => of(new fromActions.LoadCapitalFlowsFailed(err)))
                    );
            }));

    @Effect()
    loadCapitalFlowStats$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.CapitalFlowsActionTypes.LOAD_CAPITAL_FLOW_STATS),
            map((action: fromActions.LoadCapitalFlowStats) => action.payload),
            switchMap(payload => {
                return this.capitalFlowsService$
                    .loadCapitalFlowStats(payload)
                    .pipe(
                        map((res: any) => {
                            const parsedResult = {dateRange: null, fundList: null, masterFundList: null, capitalDates: null};
                            parsedResult['dateRange'] = res['dateRange'];
                            parsedResult['fundList'] = res['fundList'];
                            parsedResult['masterFundList'] = res['masterFundList'];
                            parsedResult['capitalDates'] = [];
                            res['capitalDates'].map((capitalDate) => {
                                parsedResult['capitalDates'].push({ 'name': this._getDate(capitalDate[0], capitalDate[1]), 'month': capitalDate[0], 'year': capitalDate[1] });
                            });

                            parsedResult['monthlyFlowPivotedByFund'] = this.dataService.csvToObjectArrayWithColumnHeaders(res['monthlyFlowPivotedByFund'], '');
                            parsedResult['monthlyFlowByMasterFund'] = this.dataService.csvToObjectArrayWithColumnHeaders(res['monthlyFlowByMasterFund'], '');
                            parsedResult['monthlyLeveredFlowByMasterFund'] = this.dataService.csvToObjectArrayWithColumnHeaders(res['monthlyLeveredFlowByMasterFund'], '');
                            parsedResult['upcomingFlows'] = this.dataService.csvToObjectArrayWithColumnHeaders(res['upcomingFlows'], '');
                            parsedResult['monthlyFlowByFundRelationship'] = this.dataService.csvToObjectArrayWithColumnHeaders(res['monthlyFlowByFundRelationship'], '');
                            parsedResult['totalFlowByRelationship'] = this.dataService.csvToObjectArrayWithColumnHeaders(res['totalFlowByRelationship'], '');
                            parsedResult['monthlyFlowByFundInvestorType'] = this.dataService.csvToObjectArrayWithColumnHeaders(res['monthlyFlowByFundInvestorType'], '');
                            parsedResult['totalFlowByInvestorType'] = this.dataService.csvToObjectArrayWithColumnHeaders(res['totalFlowByInvestorType'], '');
                            return new fromActions.LoadCapitalFlowStatsComplete(parsedResult);
                        }),
                        catchError(err => of(new fromActions.LoadCapitalFlowStatsFailed(err)))
                    );
            }));

    @Effect()
    loadCapitalFlowProjectedAUM$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.CapitalFlowsActionTypes.LOAD_PROJECTED_AUM),
            switchMap(() => {
                return this.capitalFlowsService$
                    .loadCapitalFlowProjectedAUM()
                    .pipe(
                        map((res: fromModels.ProjectedAUM) => new fromActions.LoadCapitalFlowProjectedAUMComplete(res)),
                        catchError(err => of(new fromActions.LoadCapitalFlowProjectedAUMFailed(err)))
                    );
            }));

    @Effect()
    loadCapitalFlowForm$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.CapitalFlowsActionTypes.LOAD_CAPITAL_FLOW_FORM),
            switchMap(() => {
                return this.capitalFlowsService$
                    .loadFormData()
                    .pipe(
                        map((res: fromModels.CapitalFlowForm) => new fromActions.LoadCapitalFlowFormComplete(res)),
                        catchError(err => of(new fromActions.LoadCapitalFlowFormFailed(err)))
                    );
            }));

    @Effect()
    addCapitalActivity$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.CapitalFlowsActionTypes.ADD_CAPITAL_ACTIVITY),
            map((action: fromActions.AddCapitalActivity) => action.payload),
            switchMap(payload => {
                return this.capitalFlowsService$
                    .addCapitalActivity(payload)
                    .pipe(
                        map((res: fromModels.CapitalFlow[]) => new fromActions.AddCapitalActivityComplete(res)),
                        catchError(err => of(new fromActions.AddCapitalActivityFailed(err)))
                    );
            }));

    @Effect()
    updateCapitalActivity$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.CapitalFlowsActionTypes.UPDATE_CAPITAL_ACTIVITY),
            map((action: fromActions.UpdateCapitalActivity) => action.payload),
            switchMap(payload => {
                return this.capitalFlowsService$
                    .updateCapitalActivity(payload)
                    .pipe(
                        map((res: fromModels.CapitalFlow[]) => new fromActions.UpdateCapitalActivityComplete(res)),
                        catchError(err => of(new fromActions.UpdateCapitalActivityFailed(err)))
                    );
            }));

    @Effect()
    deleteCapitalActivity$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.CapitalFlowsActionTypes.DELETE_CAPITAL_ACTIVITY),
            map((action: fromActions.DeleteCapitalActivity) => action.payload),
            switchMap(payload => {
                return this.capitalFlowsService$
                    .deleteCapitalActivity(payload)
                    .pipe(
                        map((res: fromModels.CapitalFlow[]) => new fromActions.DeleteCapitalActivityComplete(res)),
                        catchError(err => of(new fromActions.DeleteCapitalActivityFailed(err)))
                    );
            }));

    @Effect()
    getPermissions$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.CapitalFlowsActionTypes.GET_PERMISSIONS),
            switchMap(() => {
                return this.capitalFlowsService$
                    .getPermissions()
                    .pipe(
                        map((res: boolean) => new fromActions.CanEditCapitalFlowsComplete(res)),
                        catchError(err => of(new fromActions.CanEditCapitalFlowsFailed(err)))
                    );
            }));


    @Effect()
    sendCapitalFlowEmail$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.CapitalFlowsActionTypes.SEND_CAPITAL_FLOW_EMAIL),
            switchMap(() => {
                return this.capitalFlowsService$
                    .sendEmail()
                    .pipe(
                        map((res: any[]) => new fromActions.SendCapitalFlowEmailComplete()),
                        catchError(err => of(new fromActions.SendCapitalFlowEmailFailed(err)))
                    );
            }));

    private _getDate(month: number, year: number): string {
        return `${this.MONTHS[month - 1]} \' ${year.toString().substring(2, 4)}`;
    }


    constructor(private actions$: Actions,
        private capitalFlowsService$: fromServices.CapitalFlowsService,
        private dataService: HighchartsDataService) { }
}

