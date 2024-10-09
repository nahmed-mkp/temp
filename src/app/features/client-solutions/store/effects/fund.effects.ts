import { Injectable } from '@angular/core';
import { Observable, of, EMPTY } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, withLatestFrom, delay } from 'rxjs/operators';

import * as fromModels from '../../models';
import * as fromServices from '../../services/performance.service';
import * as fromActions from '../actions/fund.actions';
import * as fromStore from '../reducers';
import * as fromSelector from '../../store/selectors';
import { HighchartsDataService } from 'src/app/shared/custom/utilities';
import { NotificationService } from 'src/app/factories';

@Injectable()
export class FundEffects {

  @Effect()
  loadFunds$: Observable<Action> = this.actions$
    .pipe(
      ofType(fromActions.FundActionsType.LOAD_FUNDS),
      switchMap(() => {
        return this.fundService$
          .getFunds()
          .pipe(
            map((res: fromModels.IFund[]) => new fromActions.LoadFundsComplete(res)),
            catchError(err => of(new fromActions.LoadFundsFailed(err)))
          );
      })
    );

  @Effect()
  loadFundBenchmarks$: Observable<Action> = this.actions$
    .pipe(
      ofType(fromActions.FundActionsType.LOAD_FUND_BENCHMARKS),
      map((action: fromActions.LoadFundBenchmarks) => action.payload),
      switchMap((payload: fromModels.IFund) => {
        if (!payload.benchmarksLoaded) {
          return this.fundService$
            .getFundBenchmarks(payload)
            .pipe(
              map((res: fromModels.IBenchmark[]) => new fromActions.LoadFundBenchmarksComplete({ fund: payload, benchmarks: res })),
              catchError(err => of(new fromActions.LoadFundBenchmarksFailed(err)))
            );
        } else {
          return EMPTY;
        }
      }));

  @Effect()
  addFund$: Observable<Action> = this.actions$
    .pipe(
      ofType(fromActions.FundActionsType.ADD_FUND),
      map((action: fromActions.AddFund) => action.payload),
      switchMap((payload: fromModels.IFund) => {
          return this.fundService$
            .addFund(payload)
            .pipe(
              map((res: fromModels.IFund) => new fromActions.AddFundComplete(res)),
              catchError(err => of(new fromActions.AddFundFailed(err)))
            );
      }));    

  @Effect()
  updateFund$: Observable<Action> = this.actions$
    .pipe(
      ofType(fromActions.FundActionsType.UPDATE_FUND),
      map((action: fromActions.UpdateFund) => action.payload),
      switchMap((payload: fromModels.IFund) => {
        return this.fundService$
          .updateFund(payload)
          .pipe(
            map((res: fromModels.IFund) => new fromActions.UpdateFundComplete(res)),
            catchError(err => of(new fromActions.UpdateFundFailed(err)))
          );
    }));
    

  @Effect()
  removeFund$: Observable<Action> = this.actions$
    .pipe(
      ofType(fromActions.FundActionsType.REMOVE_FUND),
      map((action: fromActions.RemoveFund) => action.payload),
      switchMap((payload: fromModels.IFund) => {
        return this.fundService$
          .deleteFund(payload)
          .pipe(
            map((res: fromModels.IFund) => new fromActions.RemoveFundComplete(res)),
            catchError(err => of(new fromActions.RemoveFundFailed(err)))
          )
    }));

  @Effect()
  addBenchmarkToFund$: Observable<Action> = this.actions$
    .pipe(
      ofType(fromActions.FundActionsType.ADD_BENCHMARK_TO_FUND),
      map((action: fromActions.AddBenchmarkToFund) => action.payload),
      switchMap((payload: fromModels.IFundBenchmark) => {
        return this.fundService$
          .addBenchmarkToFund(payload)
          .pipe(
            map((res: fromModels.IBenchmark[]) => new fromActions.AddBenchmarkToFundComplete(res)),
            catchError(err => of(new fromActions.AddBenchmarkToFundFailed(err)))
          );
    }));

  @Effect()
  removeBenchmarkFromFund$: Observable<Action> = this.actions$
    .pipe(
      ofType(fromActions.FundActionsType.REMOVE_BENCHMARK_FROM_FUND),
      map((action: fromActions.RemoveBenchmarkFromFund) => action.payload),
      switchMap((payload: fromModels.IFundBenchmark) => {
        return this.fundService$
          .removeBenchmarkFromFund(payload)
          .pipe(
            map((res: fromModels.IBenchmark) => new fromActions.RemoveBenchmarkFromFundComplete(res)),
            catchError(err => of(new fromActions.RemoveBenchmarkFromFundFailed(err)))
          )
    }));

  @Effect()
  loadStatistics$: Observable<Action> = this.actions$
    .pipe(
      ofType(fromActions.FundActionsType.LOAD_STATISTICS),
      map((action: fromActions.LoadStatistics) => action.payload),
      switchMap((payload: fromModels.IReportParameter) => {
        return this.fundService$
          .getStatistics(payload)
          .pipe(
            map((res: fromModels.IStatistics[]) => new fromActions.LoadStatisticsComplete(res)),
            catchError(err => of(new fromActions.LoadStatisticsFailed(err)))
          );
    }));

  @Effect()
  loadTimeseries$: Observable<Action> = this.actions$
    .pipe(
      ofType(fromActions.FundActionsType.LOAD_TIMESERIES),
      map((action: fromActions.LoadTimeseries) => action.payload),
      switchMap((payload: fromModels.IReportParameter) => {
        return this.fundService$
          .getTimeseries(payload)
          .pipe(
            map((res: fromModels.ITimeseriesResponse) => new fromActions.LoadTimeseriesComplete(res)),
            catchError(err => of(new fromActions.LoadTimeseriesFailed(err)))
          );
    }));

  @Effect()
  loadSummary$: Observable<Action> = this.actions$
    .pipe(
      ofType(fromActions.FundActionsType.LOAD_CORRELATION),
      map((action: fromActions.LoadSummary) => action.payload),
      switchMap((payload: fromModels.IReportParameter) => {
        return this.fundService$
          .getSummary(payload)
          .pipe(
            map((res: fromModels.ISummary[]) => { return new fromActions.LoadSummaryComplete(res); }),
            catchError(err => of(new fromActions.LoadSummaryFailed(err)))
          );          
    }));

  @Effect()
  loadHistogram$: Observable<Action> = this.actions$
    .pipe(
      ofType(fromActions.FundActionsType.LOAD_HISTOGRAM),
      map((action: fromActions.LoadHistogram) => action.payload),
      switchMap((payload: fromModels.IReportParameter) => {
        return this.fundService$
          .getHistogram(payload)
          .pipe(
            map((res: fromModels.IHistogram[]) => new fromActions.LoadHistogramComplete(res)),
            catchError(err => of(new fromActions.LoadHistogramFailed(err)))
          );
    }));

  @Effect()
  loadCorrelation$: Observable<Action> = this.actions$
    .pipe(
      ofType(fromActions.FundActionsType.LOAD_CORRELATION),
      map((action: fromActions.LoadCorrelation) => action.payload),
      switchMap((payload: fromModels.IReportParameter) => {
        return this.fundService$
          .getCorrelation(payload)
          .pipe(
            map((res: fromModels.ICorrelation[]) => {return new fromActions.LoadCorrelationComplete(res);}),
            catchError(err => of(new fromActions.LoadCorrelationFailed(err)))
          );
    }));


  // @Effect()
  // loadRawReturns$: Observable<Action> = this.actions$
  //   .pipe(
  //     ofType(fromActions.FundActionsType.LOAD_RAW_RETURNS),
  //     map((action: fromActions.LoadRawReturns) => action.payload),
  //     switchMap((payload: fromModels.IReportParameter) => {
  //       return this.fundService$
  //         .getRawReturns(payload)
  //         .pipe(
  //           map((res: any) => { return new fromActions.LoadRawReturnsComplete(res); }),
  //           catchError(err => of(new fromActions.LoadRawReturnsFailed(err)))
  //         );
  //   }));

  @Effect()
  loadDrawdown$: Observable<Action> = this.actions$
    .pipe(
      ofType(fromActions.FundActionsType.LOAD_DRAWDOWN),
      map((action: fromActions.LoadDrawdown) => action.payload),
      switchMap((payload: fromModels.IReportParameter) => {
        return this.fundService$
          .getDrawdown(payload)
          .pipe(
            map((res: fromModels.IDrawdown) => { return new fromActions.LoadDrawdownComplete(res); }),
            catchError(err => of(new fromActions.LoadDrawdownFailed(err)))
          );
    }));

  @Effect()
  loadAlphaBeta$: Observable<Action> = this.actions$
    .pipe(
      ofType(fromActions.FundActionsType.LOAD_ALPHA_BETA),
      map((action: fromActions.LoadAlphaBeta) => action.payload),
      switchMap((payload: fromModels.IFund) => {
        return this.fundService$
          .getAlphaBeta(payload.code)
          .pipe(
            map((res: fromModels.IAlphaBetaStats[]) => { return new fromActions.LoadAlphaBetaComplete(res); }),
            catchError(err => of(new fromActions.LoadDrawdownFailed(err)))
          );
    }));

  @Effect()
  loadRollingCorr$: Observable<Action> = this.actions$
    .pipe(
      ofType(fromActions.FundActionsType.LOAD_ROLLING_CORR),
      map((action: fromActions.LoadRollingCorr) => action.payload),
      switchMap((payload: fromModels.IReportParameter) => {
        return this.fundService$
          .getRollingCorr(payload)
          .pipe(
            map((res: string) => { return new fromActions.LoadRollingCorrComplete(res); }),
            catchError(err => of(new fromActions.LoadRollingCorrFailed(err)))
          );
    }));

  @Effect()
  loadRollingCorrWindow$: Observable<Action> = this.actions$
    .pipe(
      ofType(fromActions.FundActionsType.LOAD_ROLLING_CORR_WINDOW),
      switchMap(() => {
        return this.fundService$
          .getRollingCorrWindow()
          .pipe(
            map((res: fromModels.IRollingCorrWindow[]) => new fromActions.LoadRollingCorrWindowComplete(res)),
            catchError(err => of(new fromActions.LoadRollingCorrWindowFailed(err)))
          );
    }));

  @Effect()
  saveFundReturn$: Observable<Action> = this.actions$
    .pipe(
      ofType(fromActions.FundActionsType.SAVE_FUND_RETURNS),
      map((action: fromActions.SaveFundReturns) => action.payload),
      withLatestFrom(
        this.store.select(fromSelector.getReportParams)
      ),
      switchMap(([payload, reportParams]) => {
        const completePayload = {...payload, fundcode: reportParams.fund.code}
        return this.fundService$
          .saveFundReturn(completePayload)
          .pipe(
            map((res: fromModels.IFundReturn) => new fromActions.SaveFundReturnsComplete(res)),
            catchError(err => of(new fromActions.SaveFundReturnsFailed(err)))
          );
    }));




  // ------------------------------------------------------------

  @Effect()
  reloadRawReturns$: Observable<Action> = this.actions$
    .pipe(
      ofType(fromActions.FundActionsType.CHANGE_REPORT_PARAMETER),
      map((action: fromActions.ChangeReportParameter) => action.payload),
      switchMap((payload: fromModels.IReportParameter) => {
        return this.fundService$
          .getRawReturns(payload)
          .pipe(
            map((res: any) => {
              const formatedData: any = {...res};
              formatedData['value'] = res.value && this.dataService.normalizeCSVData(res.value, 'Date') || null;
              return new fromActions.LoadRawReturnsComplete(formatedData);
            }),
            catchError(err => of(new fromActions.LoadRawReturnsFailed(err)))
          );
    }));

  @Effect()
  reloadTimeseries$: Observable<Action> = this.actions$
    .pipe(
      ofType(fromActions.FundActionsType.CHANGE_REPORT_PARAMETER),
      map((action: fromActions.ChangeReportParameter) => action.payload),
      switchMap((payload: fromModels.IReportParameter) => {
        return this.fundService$
          .getTimeseries(payload)
          .pipe(
            map((res: fromModels.ITimeseriesResponse) => { 
              const formatedData: any = {...res};
              formatedData['value'] = res.value && this.dataService.csvToObjectArrayWithColumnHeaders(res.value, 'Date') || null;
              return new fromActions.LoadTimeseriesComplete(formatedData);
            }),
            catchError(err => of(new fromActions.LoadTimeseriesFailed(err)))
          );
    }));

  @Effect()
  reloadStatistics$: Observable<Action> = this.actions$
    .pipe(
      ofType(fromActions.FundActionsType.CHANGE_REPORT_PARAMETER),
      map((action: fromActions.ChangeReportParameter) => action.payload),
      switchMap((payload: fromModels.IReportParameter) => {
        return this.fundService$
          .getStatistics(payload)
          .pipe(
            map((res: fromModels.IStatistics[]) => { return new fromActions.LoadStatisticsComplete(res); }),
            catchError(err => of(new fromActions.LoadStatisticsFailed(err)))
          );
    }));

  @Effect()
  reloadCorrelation$: Observable<Action> = this.actions$
    .pipe(
      ofType(fromActions.FundActionsType.CHANGE_REPORT_PARAMETER),
      map((action: fromActions.ChangeReportParameter) => action.payload),
      switchMap((payload: fromModels.IReportParameter) => {
        return this.fundService$
          .getCorrelation(payload)
          .pipe(
            map((res: fromModels.ICorrelation[]) => { return new fromActions.LoadCorrelationComplete(res)}),
            catchError(err => of(new fromActions.LoadCorrelationFailed(err)))
          );
    }));

  @Effect()
  reloadDrawdown$: Observable<Action> = this.actions$
    .pipe(
      ofType(fromActions.FundActionsType.CHANGE_REPORT_PARAMETER),
      map((action: fromActions.ChangeReportParameter) => action.payload),
      switchMap((payload: fromModels.IReportParameter) => {
        return this.fundService$
          .getDrawdown(payload)
          .pipe(
            map((res: fromModels.IDrawdown) => {
              const formattedData: any = {...res};
              formattedData['value'] = res.value && this.dataService.csvToObjectArrayWithColumnHeaders(res.value, 'Date') || null;
              return new fromActions.LoadDrawdownComplete(formattedData);
            }),
            catchError(err => of(new fromActions.LoadDrawdownFailed(err)))
          );
    }));

  @Effect()
  reloadHistogram$: Observable<Action> = this.actions$
    .pipe(
      ofType(fromActions.FundActionsType.CHANGE_REPORT_PARAMETER),
      map((action: fromActions.ChangeReportParameter) => action.payload),
      switchMap((payload: fromModels.IReportParameter) => {
        return this.fundService$
          .getHistogram(payload)
          .pipe(
            map((res: fromModels.IHistogram[]) => new fromActions.LoadHistogramComplete(res)),
            catchError(err => of(new fromActions.LoadHistogramFailed(err)))
          );
    }));

  @Effect()
  reloadAlphaBeta$: Observable<Action> = this.actions$
    .pipe(
      ofType(fromActions.FundActionsType.CHANGE_REPORT_PARAMETER),
      map((action: fromActions.ChangeReportParameter) => action.payload),
      switchMap((payload: fromModels.IReportParameter) => {
        return this.fundService$
          .getAlphaBeta(payload.fund.code)
          .pipe(
            map((res: fromModels.IAlphaBetaStats[]) => { return new fromActions.LoadAlphaBetaComplete(res); }),
            catchError(err => of(new fromActions.LoadAlphaBetaFailed(err)))
          );
    }));



  @Effect()
  refreshData$: Observable<Action> = this.actions$
    .pipe(
      ofType(fromActions.FundActionsType.REFRESH_DATA),
      map((action: fromActions.RefreshData) => action.payload),
      // delay(10000),
      switchMap((payload: fromModels.RefreshDataReqParameter) => {
        return this.fundService$
          .refreshData(payload)
          .pipe(
            map((res: any) => {
              this.notificationService.openNotification_green('Data refresh completed, please refresh screen to get the latest data');
              return new fromActions.RefreshDataComplete;
            }),
            catchError(err => {
              this.notificationService.openNotification('Data refresh failed !');
              return of(new fromActions.RefreshDataFailed(err));
            })
          );
        // return of(new fromActions.RefreshDataComplete);
    }));


  constructor(
    private actions$: Actions, 
    private fundService$: fromServices.FundPerformanceService,
    private dataService: HighchartsDataService,
    private store: Store<fromStore.ClientSolutionsState>,
    private notificationService: NotificationService,
  ) {}

}
