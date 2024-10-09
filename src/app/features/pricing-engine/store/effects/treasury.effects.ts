import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { HighchartsDataService } from 'src/app/shared/custom/utilities';

import * as fromServices from '../../services';
import * as fromActions from '../actions';

@Injectable()
export class TreasuryEffects {

    @Effect()
    loadTreasury$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.TreasuryActionTypes.LOAD_TREASURY),
            map((action: fromActions.LoadTreasury) => action.payload),
            switchMap(payload => {
                return this.service$
                    .loadTreasuries(payload)
                    .pipe(
                        map((res: any) => {
                            if (res !== null) {
                                const parseResult = this.dataService.csvToObjectArrayWithColumnHeaders(res.data, '');
                                return new fromActions.LoadTreasuryComplete({
                                    data: parseResult,
                                    timeStamp: res.timestamps
                                });
                            }
                        }),
                        catchError((err: string) => of(new fromActions.LoadTreasuryFailed(err)))
                    );
            })
        );


    @Effect()
    loadAuctionDates$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.TreasuryActionTypes.LOAD_AUCTION_DATES),
            switchMap(() => {
                return this.service$
                    .loadAuctionDates()
                    .pipe(
                        map((res: any) => new fromActions.LoadAuctionDatesComplete(res)),
                        catchError((err: string) => of(new fromActions.LoadAuctionDatesFailed(err)))
                    );
            })
        );

    @Effect()
    updateTreasury$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.TreasuryActionTypes.UPDATE_TREASURY),
            map((action: fromActions.UpdateTreasury) => action.payload),
            switchMap(payload => {
                return this.service$
                    .updateTreasury(payload)
                    .pipe(
                        map((res: any) => new fromActions.UpdateTreasuryComplete(res)),
                        catchError((err: string) => of(new fromActions.UpdateTreasuryComplete(err)))
                    );
            })
        );
    
    @Effect()
    loadBVALSuggestionsData$: Observable<Action> = this.actions$ 
        .pipe(
            ofType(fromActions.TreasuryActionTypes.LOAD_BVAL_SECURITY_SUGGESTIONS), 
            map((action: fromActions.LoadBVALSecSuggestions) => action.payload),
            switchMap(payload => {
                return this.service$
                    .loadBVALSecSuggestionsData(payload)
                    .pipe(
                        map((res: any) => new fromActions.LoadBVALSecSuggestionsComplete(res)),
                        catchError( (err: string) => of(new fromActions.LoadBVALSecSuggestionsFailed(err)))
                    );
        })
    );

    @Effect()
    saveBVALProxy$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.TreasuryActionTypes.SAVE_BVAL_PROXY), 
            map((action: fromActions.SaveBVALProxy) => action.payload),
            switchMap(payload => {
                return this.service$
                    .saveBVALProxy(payload)
                    .pipe(
                         map((res: any) => {
                            if (res !== null) {
                                const parseResult = this.dataService.csvToObjectArrayWithColumnHeaders(res.data, '');
                                return new fromActions.LoadTreasuryComplete({
                                    data: parseResult,
                                    timeStamp: res.timestamps
                                });
                            }
                        }),
                        catchError( (err: string) => of(new fromActions.SaveBVALProxyFailed(err)))
                    );
            })
    );

    constructor(
        private actions$: Actions,
        private service$: fromServices.PricingEngineService,
        private dataService: HighchartsDataService,
    ) { }
}

