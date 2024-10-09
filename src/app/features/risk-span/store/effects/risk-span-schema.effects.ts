import { Injectable } from '@angular/core';
import { Observable, of, empty } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { switchMap, map, catchError, mergeMap, withLatestFrom } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { HighchartsDataService } from 'src/app/shared/custom/utilities';
import * as fromActions from './../actions';
import * as fromServices from './../../services';
import * as fromSelector from '../../store/selectors';
import * as fromStore from '../reducers';
import * as fromModels from './../../models';

@Injectable()
export class RiskSpanSchemaEffects {

    @Effect()
    loadRiskSpanSchema$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.RiskSpanRequestActionTypes.LOAD_RISK_SPAN_SCHEMA),
            switchMap(() => {
                return this.riskSpanSchemaService$
                    .loadSchema()
                    .pipe(
                        map(res => new fromActions.LoadRiskSpanSchemaComplete(res)),
                        catchError((err: string) => of(new fromActions.LoadRiskSpanSchemaFailed(err)))
                    );
            })
        );

    @Effect()
    buildQuery$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.RiskSpanRequestActionTypes.BUILD_QUERY),
            map((action: fromActions.BuildQuery) => action.payload),
            switchMap((payload: fromModels.IRequest) => {
                return this.riskSpanSchemaService$
                    .buildQuery(payload)
                    .pipe(
                        map((res: fromModels.IQueryResult) => new fromActions.BuildQueryComplete(res)),
                        catchError((err: string) => of(new fromActions.BuildQueryFailed(err)))
                    );
            })
        );

    @Effect()
    submitRequest$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.RiskSpanRequestActionTypes.SUBMIT_REQUEST),
            map((action: fromActions.SubmitRequest) => action.payload),
            switchMap((payload: fromModels.IRequest) => {
                return this.riskSpanSchemaService$
                    .submitRequest(payload)
                    .pipe(
                        map((res: any) => {
                            res.data = this.dataService.csvToObjectArrayWithColumnHeaders(res.data, '');
                            return new fromActions.SubmitRequestComplete(res);
                        }),
                        catchError((err: string) => of(new fromActions.SubmitRequestFailed(err)))
                    );
            })
        );

    @Effect()
    submitDetailRequest$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.RiskSpanRequestActionTypes.SUBMIT_DETAIL_REQUEST),
            map((action: fromActions.SubmitDetailRequest) => action.payload),
            switchMap((payload: fromModels.IDetailRequest) => {
                return this.riskSpanSchemaService$
                    .submitDetailedRequest(payload)
                    .pipe(
                        map((res: any[]) => new fromActions.SubmitDetailRequestComplete(res)),
                        catchError((err: string) => of(new fromActions.SubmitDetailRequestFailed(err)))
                    );
            })
        );

    constructor(
        private actions$: Actions,
        private riskSpanSchemaService$: fromServices.RiskSpanRequestService,
        private store: Store<fromStore.State>,
        private dataService: HighchartsDataService
    ) { }
}
