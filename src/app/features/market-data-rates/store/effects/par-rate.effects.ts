import { Injectable } from '@angular/core';
import { Observable, of, empty } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, mergeMap, withLatestFrom } from 'rxjs/operators';

import * as fromServices from '../../services/';
import * as fromSelector from '../selectors';
import * as fromStore from '../reducers';
import * as fromActions from '../actions';
import { HighchartsDataService } from 'src/app/shared/custom/utilities';


@Injectable()
export class ParRateEffects {

    @Effect()
    LoadParRatePreProcess$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.ParRateActionTypes.LOAD_PAR_RATE_PREPROCESS),
            withLatestFrom(
                this.store.select(fromSelector.getSelectedDate),
                this.store.select(fromSelector.getSpreadEntity)),
            switchMap(([payload, selectedDate, spreadEntity]) => {
                const dateString = selectedDate.toLocaleDateString().split('/').join('-');
                if ( spreadEntity === null || spreadEntity[dateString] === undefined) {
                    return [new fromActions.LoadParRate];
                } else {
                    return [];
                }
            })
        )

    @Effect()
    LoadParRate$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.ParRateActionTypes.LOAD_PAR_RATE),
            withLatestFrom(
                this.store.select(fromSelector.getSelectedDate)),
            switchMap(([payload, selectedDate]) => {
                const dateString = selectedDate.toLocaleDateString().split('/').join('-');
                return this.marketDataRatesService.loadParRatesData(dateString)
                .pipe(
                    map(res => {
                        const spreadResult: any = {};
                        const swapResult: any = {};
                        const treasuryResult: any = {};
                        let timestamp: string;
                        Object.keys(res).forEach(key => {
                            if (key !== 'timestamp') {
                                spreadResult[key] = this.dataService.csvToObjectArrayWithColumnHeaders(res[key]['Spread'], '');
                                swapResult[key] = this.dataService.csvToObjectArrayWithColumnHeaders(res[key]['Swap'], '');
                                treasuryResult[key] = this.dataService.csvToObjectArrayWithColumnHeaders(res[key]['Treasury'], '');
                            } else {
                                timestamp = res['timestamp'];
                            }
                        });
                        return new fromActions.LoadParRateComplete({
                            result: {
                                spread: spreadResult,
                                swap: swapResult,
                                treasury: treasuryResult,
                                timestamp: timestamp,
                            },
                            date: dateString
                        });
                    }),
                    catchError((err: string) => of(new fromActions.LoadParRateFailed('Faild to Load Data')))
                )

            })
        )

    constructor(
        private actions$: Actions,
        private store: Store<fromStore.State>,
        private marketDataRatesService: fromServices.MarketDataRatesService,
        private dataService: HighchartsDataService,
    ) { }
}