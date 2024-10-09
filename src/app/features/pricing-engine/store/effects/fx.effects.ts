import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { HighchartsDataService } from 'src/app/shared/custom/utilities';

import * as fromServices from '../../services';
import * as fromActions from '../actions';

@Injectable()
export class FxEffects {

    @Effect()
    loadFxForward$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.FxActionTypes.LOAD_FX),
            map((action: fromActions.LoadFx) => action.payload),
            switchMap(payload => {
                return this.service$
                    .loadFxForward(payload)
                    .pipe(
                        map((res: any) => {
                            if (res !== null) {
                                const parseResult = this.dataService.csvToObjectArrayWithColumnHeaders(res.data, '');
                                return new fromActions.LoadFxComplete({
                                    data: parseResult,
                                    timeStamp: res.timestamps
                                });
                            }
                        }),
                        catchError((err: string) => of(new fromActions.LoadFxFailed(err)))
                    );
            })
        );


    @Effect()
    loadFxForwardOwnership$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.FxActionTypes.LOAD_FXFORWARD_OWNERSHIP),
            map((action: fromActions.LoadFxForwardOwnership) => action.payload),
            switchMap(payload => {
                return this.service$
                    .loadSecurityOwnership(payload)
                    .pipe(
                        map((res: any) => {
                            if (res && res.length && res.length > 0) {
                                return new fromActions.LoadFxForwardOwnershipComplete(res);
                            } else {
                                return new fromActions.LoadFxForwardOwnershipFailed('No data found');
                            }
                        }),
                        catchError((err: string) => of(new fromActions.LoadFxFailed(err)))
                    );
            })
        );

    @Effect()
    loadFxForwardDetail$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.FxActionTypes.LOAD_FXFORWARD_DETAIL),
            map((action: fromActions.LoadFxForwardDetail) => action.payload),
            switchMap(payload => {
                return this.service$
                    .loadSecurityDetail(payload)
                    .pipe(
                        map((res: any) => {
                            if (res && res.tags && res.tags && res.tags.length > 0) {
                                return new fromActions.LoadFxForwardDetailComplete(res.tags);
                            } else {
                                return new fromActions.LoadFxForwardDetailComplete([]);
                            }
                        }),
                        catchError((err: string) => of(new fromActions.LoadFxForwardDetailFailed(err)))
                    );
            })
        );

    @Effect()
    updateFxForward$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.FxActionTypes.UPDATE_FXFORWARD),
            map((action: fromActions.UpdateFxForward) => action.payload),
            switchMap(payload => {
                return this.service$
                    .updateFxForward(payload)
                    .pipe(
                        map((res: any) => new fromActions.UpdateFxForwardComplete(res)),
                        catchError((err: string) => of(new fromActions.UpdateFxForwardFailed(err)))
                    );
            })
        );

    constructor(
        private actions$: Actions,
        private service$: fromServices.PricingEngineService,
        private dataService: HighchartsDataService,
    ) { }
}

