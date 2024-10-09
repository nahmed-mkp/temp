import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { HighchartsDataService } from 'src/app/shared/custom/utilities';

import * as fromServices from '../../services';
import * as fromActions from '../actions';

@Injectable()
export class SwapsEffects {

    @Effect()
    loadSwaps$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.SwapsActionTypes.LOAD_SWAPS),
            map((action: fromActions.LoadSwaps) => action.payload),
            switchMap(payload => {
                return this.service$
                    .loadSwaps(payload)
                    .pipe(
                        map((res: any) => {

                            if (res !== null) {
                                const parseResult = this.dataService.csvToObjectArrayWithColumnHeaders(res.data, '');
                                return new fromActions.LoadSwapsComplete({
                                    data: parseResult,
                                    timeStamp: res.timestamps
                                });
                            }
                        }),
                        catchError((err: string) => of(new fromActions.LoadSwapsFailed(err)))
                    );
            })
        );


    @Effect()
    loadSwapOwnership$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.SwapsActionTypes.LOAD_SWAP_OWNERSHIP),
            map((action: fromActions.LoadSwapOwnership) => action.payload),
            switchMap(payload => {
                return this.service$
                    .loadSecurityOwnership(payload)
                    .pipe(
                        map((res: any) => {
                            if (res && res.length && res.length > 0) {
                                return new fromActions.LoadSwapOwnershipComplete(res);
                            } else {
                                return new fromActions.LoadSwapOwnershipComplete([]);
                            }
                        }),
                        catchError((err: string) => of(new fromActions.LoadSwapsFailed(err)))
                    );
            })
        );



    @Effect()
    loadSwapDetail$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.SwapsActionTypes.LOAD_SWAP_DETAIL),
            map((action: fromActions.LoadSwapDetail) => action.payload),
            switchMap(payload => {
                return this.service$
                    .loadSecurityDetail(payload)
                    .pipe(
                        map((res: any) => {
                            if (res && res.tags && res.tags && res.tags.length > 0) {
                                return new fromActions.LoadSwapDetailComplete(res.tags);
                            } else {
                                return new fromActions.LoadSwapDetailComplete([]);
                            }
                        }),
                        catchError((err: string) => of(new fromActions.LoadSwapDetailFailed(err)))
                    );
            })
        );

    @Effect()
    updateSwap$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.SwapsActionTypes.UPDATE_SWAP),
            map((action: fromActions.UpdateSwap) => action.payload),
            switchMap(payload => {
                return this.service$
                    .updateSwap(payload)
                    .pipe(
                        map((res: any) => new fromActions.UpdateSwapComplete(res)),
                        catchError((err: string) => of(new fromActions.UpdateSwapFailed(err)))
                    );
            })
        );


    constructor(
        private actions$: Actions,
        private service$: fromServices.PricingEngineService,
        private dataService: HighchartsDataService,
    ) { }
}

