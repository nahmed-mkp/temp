import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { HighchartsDataService } from 'src/app/shared/custom/utilities';

import * as fromServices from '../../services';
import * as fromActions from '../actions';

@Injectable()
export class OptionsEffects {

    @Effect()
    loadOptions$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.OptionsActionTypes.LOAD_OPTIONS),
            map((action: fromActions.LoadOptions) => action.payload),
            switchMap(payload => {
                return this.service$
                    .loadOptions(payload)
                    .pipe(
                        map((res: any) => {
                            if (res !== null) {
                                const parseResult = this.dataService.csvToObjectArrayWithColumnHeaders(res.data, '');
                                return new fromActions.LoadOptionsComplete({
                                    data: parseResult,
                                    timeStamp: res.timestamps
                                });
                            }
                        }),
                        catchError((err: string) => of(new fromActions.LoadOptionsFailed(err)))
                    );
            })
        );

    @Effect()
    loadOptionsOwnership$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.OptionsActionTypes.LOAD_OPTION_OWNERSHIP),
            map((action: fromActions.LoadOptionOwnership) => action.payload),
            switchMap(payload => {
                return this.service$
                    .loadSecurityOwnership(payload)
                    .pipe(
                        map((res: any) => {
                            if (res && res.length && res.length > 0) {
                                return new fromActions.LoadOptionOwnershipComplete(res);
                            } else {
                                return new fromActions.LoadOptionOwnershipComplete([]);
                            }
                        }),
                        catchError((err: string) => of(new fromActions.LoadOptionOwnershipFailed(err)))
                    );
            })
        );

    @Effect()
    loadOptionsDetail$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.OptionsActionTypes.LOAD_OPTION_DETAIL),
            map((action: fromActions.LoadOptionsDetail) => action.payload),
            switchMap(payload => {
                return this.service$
                    .loadSecurityDetail(payload)
                    .pipe(
                        map((res: any) => {
                            if (res && res.tags && res.tags && res.tags.length > 0) {
                                return new fromActions.LoadOptionsDetailComplete(res.tags);
                            } else {
                                return new fromActions.LoadOptionsDetailComplete([]);
                            }
                        }),
                        catchError((err: string) => of(new fromActions.LoadOptionsDetailFailed(err)))
                    );
            })
        );
    



    @Effect()
    updateOption$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.OptionsActionTypes.UPDATE_OPTION),
            map((action: fromActions.UpdateOption) => action.payload),
            switchMap(payload => {
                return this.service$
                    .updateOption(payload)
                    .pipe(
                        map((res: any) => new fromActions.UpdateOptionComplete(res)),
                        catchError((err: string) => of(new fromActions.UpdateOptionFailed(err)))
                    );
            })
        );

    @Effect()
    updateOptionPriceMethod$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.OptionsActionTypes.UPDATE_OPTION_PRICE_METHOD),
            map((action: fromActions.UpdateOptionPriceMethod) => action.payload),
            switchMap(payload => {
                return this.service$
                    .updateOptionPriceMethod(payload)
                    .pipe(
                        map((res: any) => new fromActions.UpdateOptionPriceMethodComplete(res)),
                        catchError((err: string) => of(new fromActions.UpdateOptionPriceMethodFailed(err)))
                    );
            })
        );


    constructor(
        private actions$: Actions,
        private service$: fromServices.PricingEngineService,
        private dataService: HighchartsDataService,
    ) { }
}

