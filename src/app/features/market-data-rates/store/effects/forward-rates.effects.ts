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
export class ForwardRatesEffects {

    @Effect()
    LoadForwardRatesPreProcess$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.ForwardRatesActionTypes.LOAD_FORWARD_RATES_PREPROCESS),
            withLatestFrom(
                this.store.select(fromSelector.getSelectedDate),
                this.store.select(fromSelector.getCentralBankOISRateEntity),
                this.store.select(fromSelector.getDevMode)),
            switchMap(([payload, selectedDate, centralBankOISRateEntity, devMode]) => {
                const dateString = selectedDate.toLocaleDateString().split('/').join('-');
                // turn off caching for now
                // if ( centralBankOISRateEntity === null || centralBankOISRateEntity[dateString] === undefined) {

                    if (devMode === true) {
                        return [new fromActions.LoadForwardRatesAdvance];
                    } else {
                        return [new fromActions.LoadForwardRates];
                    }
                // } else {
                //     return [];
                // }
            })
        )

    @Effect()
    LoadForwardRates$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.ForwardRatesActionTypes.LOAD_FORWARD_RATES),
            withLatestFrom(
                this.store.select(fromSelector.getSelectedDate)),
            switchMap(([payload, selectedDate]) => {
                const dateString = selectedDate.toLocaleDateString().split('/').join('-');
                return this.marketDataRatesService.loadForwardRatesData(dateString)
                .pipe(
                    map(res => {
                        const result: any = {};
                        result['centralBankOISRates'] =  res.centralBankOISRates && this.dataService.csvToObjectArrayWithColumnHeaders(res.centralBankOISRates, '') || null;
                        result['forwardSwapRates'] =  res.forwardSwapRates && this.dataService.csvToObjectArrayWithColumnHeaders(res.forwardSwapRates, '') || null;
                        result['oisYEPricing'] = res.oisYEPricing && this.dataService.csvToObjectArrayWithColumnHeaders(res.oisYEPricing, '') || null;
                        result['oisQEForecast'] = res.oisQEForecast && this.dataService.csvToObjectArrayWithColumnHeaders(res.oisQEForecast, '') || null;
                        result['timestamp'] =  res['timestamp'];
                        return new fromActions.LoadForwardRatesComplete({
                            result: result,
                            date: dateString
                        });
                    }),
                    catchError((err: string) => of(new fromActions.LoadForwardRatesFailed('Faild to Load Data')))
                );

            })
        );

    @Effect()
    LoadForwardRatesAdvance$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.ForwardRatesActionTypes.LOAD_FORWARD_RATES_ADVANCE),
            withLatestFrom(
                this.store.select(fromSelector.getSelectedDate)),
            switchMap(([payload, selectedDate]) => {
                const dateString = selectedDate.toLocaleDateString().split('/').join('-');
                return this.marketDataRatesService.loadForwardRatesDataAdvance(dateString)
                .pipe(
                    map(res => {
                        const result: any = {
                            'centralBankOISRates': [],
                            'forwardSwapRates': [],
                            'oisYEPricing': [],
                            'oisQEForecast': [],
                        };

                        if (res.length && res.length > 0) {
                            res.forEach(element => {

                                const timestamp = element.data && element.data.timestamp;
                                const centralBankOISRates = element.data.centralBankOISRates && this.dataService.csvToObjectArrayWithColumnHeaders(element.data.centralBankOISRates, '') || [];
                                centralBankOISRates.forEach(item => item['timestamp']= timestamp);
                                result['centralBankOISRates'] =  [...result['centralBankOISRates'], ...centralBankOISRates];

                                const forwardSwapRates = element.data.forwardSwapRates && this.dataService.csvToObjectArrayWithColumnHeaders(element.data.forwardSwapRates, '') || [];
                                forwardSwapRates.forEach(item => item['timestamp'] = timestamp);
                                result['forwardSwapRates'] = [...result['forwardSwapRates'], ...forwardSwapRates];

                                const oisYEPricing = element.data.oisYEPricing && this.dataService.csvToObjectArrayWithColumnHeaders(element.data.oisYEPricing, '') || [];
                                oisYEPricing.forEach(item => item['timestamp'] = timestamp);
                                result['oisYEPricing'] = [...result['oisYEPricing'], ...oisYEPricing];

                                const oisQEForecast = element.data.oisQEForecast && this.dataService.csvToObjectArrayWithColumnHeaders(element.data.oisQEForecast, '') || [];
                                oisQEForecast.forEach(item => item['timestamp'] = timestamp);
                                result['oisQEForecast'] = [...result['oisQEForecast'], ...oisQEForecast];

                                if (result['timestamp'] === undefined) {
                                    result['timestamp'] =  element.data && element.data.timestamp;;
                                }
                            });
                        }
                        return new fromActions.LoadForwardRatesComplete({
                            result: result,
                            date: dateString
                        });
                    }),
                    catchError((err: string) => of(new fromActions.LoadForwardRatesFailed('Faild to Load Data')))
                );

            })
        );

    constructor(
        private actions$: Actions,
        private store: Store<fromStore.State>,
        private marketDataRatesService: fromServices.MarketDataRatesService,
        private dataService: HighchartsDataService,
    ) { }
}
