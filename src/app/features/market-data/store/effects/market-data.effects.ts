import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { HighchartsDataService } from 'src/app/shared/custom/utilities';

import * as fromModels from '../../models/market-data.models';
import * as fromServices from '../../services/market-data.service';
import * as fromActions from '../actions/market-data.actions';

@Injectable()
export class MarketDataEffects {

    // @Effect()
    // searchMarketData$: Observable<Action> = this.actions$
    //     .pipe(
    //         ofType(fromActions.MarketDataActionTypes.SEARCH_MARKET_DATA),
    //         map((action: fromActions.SearchMarketData) => action.payload),
    //         switchMap((payload: fromModels.IMarketDataSearch) => {
    //             return this.service$
    //                 .searchMarketData(payload)
    //                 .pipe(
    //                     map((res: any[]) => new fromActions.SearchMarketDataComplete(res)),
    //                     catchError((err: string) => of(new fromActions.SearchMarketDataFailed(err)))
    //                 );
    //         })
    //     );

    @Effect()
    backfillMarketData$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.MarketDataActionTypes.BACKFILL_MARKET_DATA),
            map((action: fromActions.BackfillMarketData) => action.payload),
            switchMap((payload: fromModels.IMarketDataBackfill) => {

                return this.service$
                    .backfillMarketData(payload)
                    .pipe(
                        switchMap((res: any[]) => {
                            return [
                                new fromActions.BackfillMarketDataComplete(res),
                                new fromActions.LoadMarketDataTimeseries(payload.mdid)
                            ]
                        }),
                        catchError((err: string) => of(new fromActions.BackfillMarketDataFailed(err)))
                    );
            })
        );



    @Effect()
    loadMarketDataDetail$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.MarketDataActionTypes.LOAD_MARKET_DATA_DETAIL),
            map((action: fromActions.LoadMarketDataDetail) => action.payload),
            switchMap((payload: fromModels.IMarketDataDetailReq) => {
                return this.service$
                    .loadMarketDataDetail(payload)
                    .pipe(
                        map((res: any[]) => new fromActions.LoadMarketDataDetailComplete(res)),
                        catchError((err: string) => of(new fromActions.LoadMarketDataDetailFailed(err)))
                    );
            })
        );

    @Effect()
    loadMarketDataPriceSource$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.MarketDataActionTypes.LOAD_MARKET_DATA_PRICE_SOURCE),
            switchMap(() => {
                return this.service$
                    .loadMarketDataPriceSource()
                    .pipe(
                        map((res: any[]) => new fromActions.LoadMarketDataPriceSourceComplete(res)),
                        catchError((err: string) => of(new fromActions.LoadMarketDataPriceSourceFailed(err)))
                    );
            })
        );

    @Effect()
    loadMarketDataType$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.MarketDataActionTypes.LOAD_MARKET_DATA_TYPE),
            map((action: fromActions.LoadMarketDataType) => action.payload),
            switchMap((payload: number) => {
                return this.service$
                    .loadMarketDataType(payload)
                    .pipe(
                        map((res: any[]) => new fromActions.LoadMarketDataTypeComplete(res)),
                        catchError((err: string) => of(new fromActions.LoadMarketDataTypeFailed(err)))
                    );
            })
        );

    @Effect()
    loadMarketDataTimeseries$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.MarketDataActionTypes.LOAD_MARKET_DATA_TIMESERIES),
            map((action: fromActions.LoadMarketDataTimeseries) => action.payload),
            switchMap((payload: number) => {
                return this.service$
                    .loadMarketDataTimeseries(payload)
                    .pipe(
                        map((res: any) => {
                            if (res && res.data) {
                                const parseResult = this.dataService.csvToObjectArrayWithColumnHeaders(res.data, '');
                                return new fromActions.LoadMarketDataTimeseriesComplete(parseResult);
                            } else {
                                return new fromActions.LoadMarketDataTimeseriesComplete([]);
                            }
                        }),
                        catchError((err: string) => of(new fromActions.LoadMarketDataTimeseriesFailed(err)))
                    );
            })
        );

    constructor(
        private actions$: Actions,
        private service$: fromServices.MarketDataService,
        private dataService: HighchartsDataService,
    ) { }
}

