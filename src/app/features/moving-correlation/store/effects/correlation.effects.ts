import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { map, catchError, mergeMap, withLatestFrom } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';

import * as fromActions from './../actions';
import * as fromServices from './../../services/correlation.service';
import * as fromModels from './../../models/correlation.model';
import * as fromSelector from '../selectors';
import * as fromStore from '../reducers'


@Injectable()
export class CorrelationEffects {

    @Effect()
    LoadMovingCorrelationSecurityList$: Observable<Action> = this.action$
        .pipe(
            ofType(fromActions.CorrelationTypes.LOAD_MOVING_CORRELATION_SECURITY_LIST),
            mergeMap(() => {
                return this.correlationService$
                .getCorrelationSecurityList()
                .pipe(
                    map((res: string[]) => new fromActions.LoadMovingCorrelationSecurityListComplete(res)),
                    catchError((err: string) => of(new fromActions.LoadMovingCorrelationSecurityListFailed(err)))
                )
            })
        );

    @Effect()
    LoadMovingCorrelationAnalysis$: Observable<Action> = this.action$
        .pipe(
            ofType(fromActions.CorrelationTypes.LOAD_MOVING_CORRELATION_ROLLING_CORRELATION),
            map((action: fromActions.LoadMovingCorrelationRollingCorrelation) => action.payload),
            withLatestFrom(this.store.select(fromSelector.getAgencyAnalyticsMovingCorrelationResponsesIds)),
            mergeMap(([request, existedRequestIds]) => {
                if(existedRequestIds.indexOf(request.id) === -1) {
                    return this.correlationService$
                    .getCorrelationAnalysis(request)
                    .pipe(
                        map((res: fromModels.CorrelationResponse) => new fromActions.LoadMovingCorrelationRollingCorrelationComplete(res)),
                        catchError((err: string) => of(new fromActions.LoadMovingCorrelationRollingCorrelationFailed(err)))
                    )
                } else return [];
            })
        );

    constructor(
        private action$: Actions,
        private correlationService$: fromServices.CorrelationService,
        private store: Store<fromStore.state>
    ){}
}