import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';

import * as fromModels from '../../models';
import * as fromServices from '../../services';
import * as fromActions from '../actions';
import * as fromStore from './../../store';
import * as fromSelector from './../selectors';

@Injectable()
export class SecMasterReconciliationEffects {

    @Effect()
    loadReconciliation$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.SecMasterReconciliationActionTypes.LOAD_RECONCILIATION),
            map((action: fromActions.LoadReconciliation) => action.payload),
            switchMap(payload => {
                return this.service$
                    .loadReconciliationService(payload)
                    .pipe(
                        map((res: any) => new fromActions.LoadReconciliationComplete(res)),
                        catchError((err: string) => of(new fromActions.LoadReconciliationFailed(err)))
                    );
            })
        );

    @Effect()
    prepareloadReconciliationSecurityDetail$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.SecMasterReconciliationActionTypes.PREPARE_LOAD_RECONCILIATION_SECURITY_DETAIL),
            map((action: fromActions.PrepareLoadReconciliationSecurityDetail) => action.payload),
            withLatestFrom(
                this.store.select(fromSelector.getReconciliationRequest)
            ),
            switchMap(([payload, recInput]) => {
                const finalPayload = {...recInput, ...payload};
                return [new fromActions.LoadReconciliationSecurityDetail(finalPayload)];
            })
        );

    @Effect()
    loadReconciliationSecurityDetail$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.SecMasterReconciliationActionTypes.LOAD_RECONCILIATION_SECURITY_DETAIL),
            map((action: fromActions.LoadReconciliationSecurityDetail) => action.payload),
            switchMap(payload => of(payload).pipe(
                withLatestFrom(
                    this.store.select(fromSelector.getSecurityDetailBySecurityName(payload.securityName, payload.match))),
                )
            ),
            switchMap(([payload, securityDetailResult]) => {
                if (securityDetailResult) {
                    const finalResult = {match: payload.match, securityName: payload.securityName, targetData: securityDetailResult};
                    return of(new fromActions.LoadReconciliationSecurityDetailComplete(finalResult));
                } else {
                    return this.service$
                    .loadReconciliationService(payload)
                    .pipe(
                        map((res: any) => {
                            const {match, securityName} = payload;
                            const targetKeys = Object.keys(res).filter(key => key !== 'Match' && key !== 'SecurityID' && key !== 'SecurityName');
                            const targetData = targetKeys.map(key => {
                                return {source: key, sourceData: [res[key]]}
                            });
                            const finalResult = {match, securityName, targetData};
                            return new fromActions.LoadReconciliationSecurityDetailComplete(finalResult);
                        }),
                        catchError((err: string) => of(new fromActions.LoadReconciliationSecurityDetailFailed({...payload, error: err})))
                    );
                }
            })
        );

    constructor(
        private actions$: Actions,
        private service$: fromServices.SecMasterReconciliationService,
        private store: Store<fromStore.SecurityMasterState> 
    ) { }
}

