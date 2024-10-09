import { Injectable } from '@angular/core';
import { Observable, of, empty } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { switchMap, map, catchError, mergeMap, withLatestFrom } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';

import * as fromActions from './../actions';
import * as fromModels from './../../models';
import * as fromServices from './../../services';
import { HighchartsDataService } from 'src/app/shared/custom/utilities';

@Injectable()
export class DailyTrackingEffects {

    @Effect()
    loadData$: Observable<Action> =  this.actions$
        .pipe(
            ofType(fromActions.DailyTrackingActionTypes.LOAD_DATA),
            map((action: fromActions.LoadData) => action.payload),
            switchMap((payload: fromModels.ITrackingInput) => {
                return this.dailyTrackingService$
                    .getRealtimeData(payload)
                    .pipe(
                        map(res => new fromActions.LoadDataComplete({
                            asOfDate: res['asOfDate'],
                            tsySwaps: this.dataService.csvToObjectArrayWithColumnHeaders(res['tsy_swaps'], ''),
                            mbsRaw: this.dataService.csvToObjectArrayWithColumnHeaders(res['mbs_raw'], ''),
                            mbsRisk: this.dataService.csvToObjectArrayWithColumnHeaders(res['mbs_risk'], ''),
                            csCloses: this.dataService.csvToObjectArrayWithColumnHeaders(res['cs_closes'], ''),
                            mbsOas: this.dataService.csvToObjectArrayWithColumnHeaders(res['mbs_oas'], '')
                        })),
                        catchError((err: string) => of(new fromActions.LoadDataFailed(err))
                    ));
            })
        );

    @Effect()
    loadHistoricalData$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.DailyTrackingActionTypes.LOAD_HISTORICAL_DATA),
            map((action: fromActions.LoadHistoricalData) => action.payload),
            switchMap((payload: fromModels.ITrackingInput) => {
                return this.dailyTrackingService$
                    .getHistoricalData(payload)
                    .pipe(
                        map(res => {
                                return new fromActions.LoadDataComplete({
                                asOfDate: res['asOfDate'],
                                tsySwaps: this.dataService.csvToObjectArrayWithColumnHeaders(res['tsy_swaps'], ''),
                                mbsRaw: this.dataService.csvToObjectArrayWithColumnHeaders(res['mbs_raw'], ''),
                                mbsRisk: this.dataService.csvToObjectArrayWithColumnHeaders(res['mbs_risk'], ''),
                                csCloses: this.dataService.csvToObjectArrayWithColumnHeaders(res['cs_closes'], ''),
                                mbsOas: this.dataService.csvToObjectArrayWithColumnHeaders(res['mbs_oas'], '')
                            });
                        }),
                        catchError((err: string) => of(new fromActions.LoadDataFailed(err))
                        ));
            })
        );

    @Effect()
    updateUserInputs$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.DailyTrackingActionTypes.UPDATE_USER_INPUTS),
            map((action: fromActions.UpdateUserInputs) => action.payload),
            switchMap((payload: any) => {
                return this.dailyTrackingService$
                    .updateUserInputs(payload)
                    .pipe(
                        map((res: any) => new fromActions.UpdateUserInputsComplete(res.status)),
                        catchError((err: string) => of(new fromActions.UpdateUserInputsFailed(err))
                    ));
            })
        );

    @Effect()
    takeSnapshot$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.DailyTrackingActionTypes.TAKE_SNAPSHOT),
            switchMap(() => {
                return this.dailyTrackingService$
                    .takeSnapshot()
                    .pipe(
                        map((res: any) => new fromActions.TakeSnapshotComplete(res.status)),
                        catchError((err: string) => of(new fromActions.TakeSnapshotFailed(err))
                        ));
            })
        );

    @Effect()
    loadOHLC$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.DailyTrackingActionTypes.LOAD_OHLC),
            switchMap(() => {
                return this.dailyTrackingService$
                    .loadOHLC()
                    .pipe(
                        map((res: any[]) => new fromActions.LoadOHLCComplete(res)),
                        catchError((err: string) => of(new fromActions.LoadOHLCFailed(err))
                        ));
            })
        );

    @Effect()
    loadMedianByTimeOfDay$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.DailyTrackingActionTypes.LOAD_MEDIAN_BY_TIME_OF_DAY),
            switchMap(() => {
                return this.dailyTrackingService$
                    .loadMedianByTimeOfDay()
                    .pipe(
                        map((res: any[]) => new fromActions.LoadMedianByTimeOfDayComplete(res)),
                        catchError((err: string) => of(new fromActions.LoadMedianByTimeOfDayFailed(err))
                        ));
            })
        );

    @Effect()
    restartTradewebExcel$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.DailyTrackingActionTypes.RESTART_TRADEWEB_EXCEL_SHEET),
            map((action: fromActions.RestartTradewebExcelSheet) => action.payload),
            switchMap((user: string) => {
                return this.dailyTrackingService$
                    .restartTradewebExcel(user)
                    .pipe(
                        map((res: any) => new fromActions.RestartTradewebExcelSheetComplete(res)),
                        catchError((err: string) => of(new fromActions.RestartTradewebExcelSheetFailed(err))
                        ));
            })
        );

    @Effect()
    loadIntradayMetaData$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.DailyTrackingActionTypes.LOAD_INTRADAY_METADATA),
            switchMap(() => {
                return this.dailyTrackingService$
                    .loadIntradayMetadata()
                    .pipe(
                        map((res: any) => new fromActions.LoadIntradayMetaDataComplete(res)),
                        catchError((err: string) => of(new fromActions.LoadIntradayMetaDataFailed(err))
                        ));
            })
        );

    @Effect()
    loadIntradayPlot$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.DailyTrackingActionTypes.LOAD_INTRADAY_PLOT),
            map((action: fromActions.LoadIntradayPlot) => action.payload),
            switchMap((payload: fromModels.IntradayRequest) => {
                return this.dailyTrackingService$
                    .loadIntradayPlot(payload)
                    .pipe(
                        map((res: any) => new fromActions.LoadIntradayPlotComplete(res)),
                        catchError((err: string) => of(new fromActions.LoadIntradayPlotFailed(err))
                        ));
            })
    ); 
    
    @Effect()
    loadEODPlot$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.DailyTrackingActionTypes.LOAD_HISTORICAL_PLOT),
            map((action: fromActions.LoadHistoricalPlot) => action.payload),
            switchMap((payload: fromModels.EODRequest) => {
                return this.dailyTrackingService$
                    .loadHistoricalPlot(payload)
                    .pipe(
                        map((res: any) => new fromActions.LoadHistoricalPlotComplete(res)),
                        catchError((err: string) => of(new fromActions.LoadHistoricalPlotFailed(err))
                        ));
            })
        );

    constructor(
        private actions$: Actions,
        private dailyTrackingService$: fromServices.DailyTrackingService,
        private dataService: HighchartsDataService
    ) {}
}
