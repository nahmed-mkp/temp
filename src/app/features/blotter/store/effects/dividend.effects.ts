import { Injectable } from '@angular/core';
import { Observable, of, merge } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';

import * as fromActions from '../actions';
import * as fromServices from '../../services';
import * as fromModel from '../../models';
import { NotificationService } from 'src/app/factories';


@Injectable()
export class DividendEffects {

    @Effect()
    loadDividend$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.DividendActionTypes.LOAD_DIVIDEND_INFO),
            map((action: fromActions.LoadDividendInfo) => action.payload),
            switchMap(payload => {
                return this.service$
                    .loadDividendInfo(payload)
                    .pipe(
                        map((res: any[]) => new fromActions.LoadDividendInfoComplete(res)),
                        catchError((err: string) => of(new fromActions.LoadDividendInfoFailed(err)))
                    );
            })
        );

    @Effect()
    loadDividendAllocationInfo$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.DividendActionTypes.LOAD_DIVIDEND_ALLOCATION_INFO),
            switchMap(payload => {
                return this.service$
                    .loadDividendAllocInfo()
                    .pipe(
                        map((res: fromModel.DividendAllocationInfo[]) => new fromActions.LoadDividendAllocationInfoComplete(res)),
                        catchError((err: string) => of(new fromActions.LoadDividendAllocationInfoFailed(err)))
                    );
            })
        );


    @Effect()
    updateDividendAllocationInfo$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.DividendActionTypes.UPDATE_DIVIDEND_ALLOCATION_INFO),
            map((action: fromActions.UpdateDividendAllocationInfo) => action.payload),
            switchMap(payload => {
                const collection = [...payload];
                const target = collection.pop();
                return this.service$
                    .updateDividendAllocInfo(target)
                    .pipe(
                        switchMap((res: fromModel.DividendAllocationInfo) => {

                            if (collection.length > 0) {
                                return of(new fromActions.UpdateDividendAllocationInfo(collection));
                            } else {
                                this.notificationService.openNotification_green('Dividend allocation modification saved successfully!', 3000)
                                return [new fromActions.UpdateDividendAllocationInfoComplete(res)];
                            }
                        }),
                        catchError((err: string) => of(new fromActions.UpdateDividendAllocationInfoFailed(err)))
                    );
            })
        );

    constructor(
        private actions$: Actions,
        private service$: fromServices.DividendService,
        private notificationService: NotificationService,
    ) { }
}