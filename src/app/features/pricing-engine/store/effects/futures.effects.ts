import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { HighchartsDataService } from 'src/app/shared/custom/utilities';

import * as fromServices from '../../services';
import * as fromActions from '../actions';

@Injectable()
export class FuturesEffects {

    @Effect()
    loadFutures$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.FuturesActionTypes.LOAD_FUTURES),
            map((action: fromActions.LoadFutures) => action.payload),
            switchMap(payload => {
                return this.service$
                    .loadFutures(payload)
                    .pipe(
                        map((res: any) => {
                            if (res !== null) {
                                const parseResult = this.dataService.csvToObjectArrayWithColumnHeaders(res.data, '');
                                return new fromActions.LoadFuturesComplete({
                                    data: parseResult,
                                    timeStamp: res.timestamps
                                });
                            }
                        }),
                        catchError((err: string) => of(new fromActions.LoadFuturesFailed(err)))
                    );
            })
        );

    @Effect()
    updateFutures$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.FuturesActionTypes.UPDATE_FUTURES),
            map((action: fromActions.UpdateFutures) => action.payload),
            switchMap(payload => {
                return this.service$
                    .updateFutures(payload)
                    .pipe(
                        map((res: any) => new fromActions.UpdateFuturesComplete(res)),
                        catchError((err: string) => of(new fromActions.UpdateFuturesFailed(err)))
                    );
            })
        );

    constructor(
        private actions$: Actions,
        private service$: fromServices.PricingEngineService,
        private dataService: HighchartsDataService,
    ) { }
}

