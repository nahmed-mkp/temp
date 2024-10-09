import { Injectable } from '@angular/core';
import { Observable, of, empty } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, mergeMap, withLatestFrom } from 'rxjs/operators';
import * as _ from 'lodash';

import * as fromServices from '../../services';
import * as fromActions from '../actions';
import { HighchartsDataService } from 'src/app/shared/custom/utilities';

@Injectable()
export class FuturesBasisEffects {

    @Effect()
    LoadFuturesBasisMonitor$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.FuturesBasisActionTypes.LOAD_FUTURES_BASIS_MONITOR),
            switchMap(() => {
                return this.marketDataRatesService$.loadFuturesBasisMonitor()
                .pipe(
                    map(res => {
                        const result: any = {};
                        result['CashManagementComparison'] = res.CashManagementComparison && this.dataService.csvToObjectArrayWithColumnHeaders(res.CashManagementComparison, 'Date') || null;

                        Object.keys(res).forEach(key => {
                            if (key !== 'CashManagementComparison') {
                                Object.keys(res[key]).forEach((future) => {
                                    const parsedObj = {};
                                    if (key === 'Basis' || key === 'Net(32nd)') {
                                        parsedObj['close'] = res[key][future]['close'];
                                        parsedObj['prior'] = res[key][future]['prior'];
                                        parsedObj['data'] = res[key][future]['data'] && this.dataService.csvToObjectArrayWithColumnHeaders(res[key][future]['data'], 'Date') || null;
                                        parsedObj['data'] = _.sortBy(parsedObj['data'], ['Date']);
                                    } else if (key === 'DaysToDelivery') {
                                        parsedObj['data'] = res[key][future]['data'] && this.dataService.csvToObjectArrayWithColumnHeaders(res[key][future]['data'], '') || null;
                                        parsedObj['data'] = _.sortBy(parsedObj['data'], ['DaysToDelivery']);
                                    } else {
                                        parsedObj['data'] = res[key][future]['data'] && this.dataService.csvToObjectArrayWithColumnHeaders(res[key][future]['data'], 'Date') || null;
                                        parsedObj['data'] = _.sortBy(parsedObj['data'], ['Date']);
                                    }
                                    result[key] = Object.assign({}, result[key], { [future]: parsedObj });
                                });
                            }
                        });
                        return new fromActions.LoadFuturesBasisMonitorComplete(result);
                    }),
                    catchError((err: string) => of(new fromActions.LoadFuturesBasisMonitorFailed(err)))
                );
            })
        );

    @Effect()
    LoadFuturesBasisContract$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.FuturesBasisActionTypes.LOAD_FUTURES_BASIS_CONTRACT),
            map((action: fromActions.LoadFuturesBasisContract) => action.payload),
            switchMap((payload: string) => {
                return this.marketDataRatesService$.loadFuturesBasisContract(payload)
                    .pipe(
                        map(res => {
                            const result: any = {};
                            result['ImpRepo-ActRepo'] = res['ImpRepo-ActRepo'] && this.dataService.csvToObjectArrayWithColumnHeaders(res['ImpRepo-ActRepo'], 'Date') || [];
                            result['ImpRepo-ActRepo-Stats'] = res['ImpRepo-ActRepo-Stats'] || null;
                            result['Net(32nd)'] = res['Net(32nd)'] && this.dataService.csvToObjectArrayWithColumnHeaders(res['Net(32nd)'], 'Date') || [];
                            result['Net(3nd)-Bucket'] = res['Net(3nd)-Bucket'] || null;
                            result['NetPerMonth'] = res['NetPerMonth'] && this.dataService.csvToObjectArrayWithColumnHeaders(res['NetPerMonth'], 'Date') || [];
                            return new fromActions.LoadFuturesBasisMonitorComplete({ 'ticker': payload, 'data': result });
                        }),
                        catchError((err: string) => of(new fromActions.LoadFuturesBasisContractFailed(err)))
                    );

            })
        );

    constructor(
        private actions$: Actions,
        private marketDataRatesService$: fromServices.MarketDataRatesService,
        private dataService: HighchartsDataService,
    ) { }
}
