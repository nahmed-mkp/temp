import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, withLatestFrom, delay } from 'rxjs/operators';

import * as fromServices from '../../services';
import * as fromActions from '../actions';
import * as fromModels from '../../models';

@Injectable()
export class BrokerBicMapEffects {

    @Effect()
    loadBrokerList$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.BrokerBicMapActionTypes.LOAD_BROKER_LIST),
            switchMap(() => {
                return this.service$
                    .loadBrokerList()
                    .pipe(
                        map((res: fromModels.IBroker[]) => {

                            const enrichResult: fromModels.IBroker[] = res.map(element => {
                                const copy: fromModels.IBroker = {...element};
                                copy['id'] = copy.BrokerCode + '|' + copy.BrokerName;
                                return copy;
                            });
                            return new fromActions.LoadBrokerListComplete(enrichResult);
                        }),
                        catchError((err: string) => of(new fromActions.LoadBrokerListFailed(err)))
                    );
            })
        );

    // @Effect()
    // loadBrokerDetail$: Observable<Action> = this.actions$
    //     .pipe(
    //         ofType(fromActions.BrokerBicMapActionTypes.LOAD_BROKER_DETAIL),
    //         map((action: fromActions.LoadBrokerDetail) => action.payload),
    //         switchMap(payload => {
    //             return this.service$
    //                 .loadBrokerDetail(payload)
    //                 .pipe(
    //                     map((res: any) => new fromActions.LoadBrokerDetailComplete({id: payload, data: res})),
    //                     catchError((err: string) => of(new fromActions.LoadBrokerDetailFailed({id: payload, error: err})))
    //                 );
    //         })
    //     );

    @Effect()
    updateBrokerDetail$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.BrokerBicMapActionTypes.UPDATE_BROKER_DETAIL),
            map((action: fromActions.UpdateBrokerDetail) => action.payload),
            switchMap(payload => {
                return this.service$
                    .UpdateBrokerMap(payload)
                    .pipe(
                        map((res: any) => new fromActions.UpdateBrokerDetailComplete(payload),
                        catchError((err: string) => of(new fromActions.UpdateBrokerDetailFailed(err))))
                    );
            })
        );



    constructor(
        private actions$: Actions,
        private service$: fromServices.BrokerBicMapService
    ) { }
}