import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { HighchartsDataService } from 'src/app/shared/custom/utilities';

import * as fromServices from '../../services';
import * as fromActions from '../actions';

@Injectable()
export class SwaptionsEffects {

    @Effect()
    loadSwaptions$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.SwaptionsActionTypes.LOAD_SWAPTIONS),
            map((action: fromActions.LoadSwaptions) => action.payload),
            switchMap(payload => {
                return this.service$
                    .loadSwaptions(payload)
                    .pipe(
                        map((res: any) => {

                            if (res !== null) {
                                const parseResult = this.dataService.csvToObjectArrayWithColumnHeaders(res.data, '');
                                return new fromActions.LoadSwaptionsComplete({
                                    data: parseResult,
                                    timeStamp: res.timestamps
                                });
                            }
                        }),
                        catchError((err: string) => of(new fromActions.LoadSwaptionsFailed(err)))
                    );
            })
        );

    @Effect()
    loadSwaptionOwnership$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.SwaptionsActionTypes.LOAD_SWAPTION_OWNERSHIP),
            map((action: fromActions.LoadSwaptionOwnership) => action.payload),
            switchMap(payload => {
                return this.service$
                    .loadSecurityOwnership(payload)
                    .pipe(
                        map((res: any) => {
                            if (res && res.length && res.length > 0) {
                                return new fromActions.LoadSwaptionOwnershipComplete(res);
                            } else {
                                return new fromActions.LoadSwaptionOwnershipComplete([]);
                            }
                        }),
                        catchError((err: string) => of(new fromActions.LoadSwaptionsFailed(err)))
                    );
            })
        );

    @Effect()
    loadSwaptionDetail$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.SwaptionsActionTypes.LOAD_SWAPTION_DETAIL),
            map((action: fromActions.LoadSwaptionDetail) => action.payload),
            switchMap(payload => {
                return this.service$
                    .loadSecurityDetail(payload)
                    .pipe(
                        map((res: any) => {
                            if (res && res.tags && res.tags && res.tags.length > 0) {
                                return new fromActions.LoadSwaptionDetailComplete(res.tags);
                            } else {
                                return new fromActions.LoadSwaptionDetailComplete([]);
                            }
                        }),
                        catchError((err: string) => of(new fromActions.LoadSwapDetailFailed(err)))
                    );
            })
        );

    @Effect()
    updateSwaption$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.SwaptionsActionTypes.UPDATE_SWAPTION),
            map((action: fromActions.UpdateSwaption) => action.payload),
            switchMap(payload => {
                return this.service$
                    .updateSwaption(payload)
                    .pipe(
                        map((res: any) => new fromActions.UpdateSwaptionComplete(res)),
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

