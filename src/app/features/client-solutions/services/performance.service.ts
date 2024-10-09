import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

import * as moment from 'moment';

import * as fromModels from '../models';


@Injectable()
export class FundPerformanceService {
    constructor(private httpClient: HttpClient) { }

    public getFunds(): Observable<fromModels.IFund[]> {
        return this.httpClient
            .get<fromModels.IFund[]>(`http://prizm-map.mkpcap.com/api/v1/investor/funds`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    public addFund(fund: fromModels.IFund): Observable<fromModels.IFund> {
        return this.httpClient
            .post<fromModels.IFund>(`http://prizm-map.mkpcap.com/api/v1/investor/funds`, { fund: fund })
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    public updateFund(fund: fromModels.IFund): Observable<fromModels.IFund> {
        return this.httpClient
            .put<fromModels.IFund>(`http://prizm-map.mkpcap.com/api/v1/investor/funds/${fund.code}`, { fund: fund })
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    public deleteFund(fund: fromModels.IFund): Observable<fromModels.IFund> {
        return this.httpClient
            .delete<fromModels.IFund>(`http://prizm-map.mkpcap.com/api/v1/investor/funds/${fund.code}`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    public getFundBenchmarks(fund: fromModels.IFund): Observable<fromModels.IBenchmark[]> {
        return this.httpClient
            .get<fromModels.IBenchmark[]>(`http://prizm-map.mkpcap.com/api/v1/investor/funds/${fund.code}/benchmarks`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    public addBenchmarkToFund(fundBenchmark: fromModels.IFundBenchmark): Observable<fromModels.IBenchmark[]> {
        return this.httpClient
            .post<fromModels.IBenchmark[]>(`http://prizm-map.mkpcap.com/api/v1/investor/funds/${fundBenchmark.fund.code}/benchmarks`, { benchmark: fundBenchmark, action: 'add' })
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    public removeBenchmarkFromFund(fundBenchmark: fromModels.IFundBenchmark): Observable<fromModels.IBenchmark> {
        return this.httpClient
            .post<fromModels.IBenchmark>(`http://prizm-map.mkpcap.com/api/v1/investor/funds/${fundBenchmark.fund.code}/benchmarks`, { benchmark: fundBenchmark, action: 'remove' })
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    public getStatistics(request: fromModels.IReportParameter): Observable<fromModels.IStatistics[]> {
        return this.httpClient
            .get<fromModels.IStatistics[]>(`http://prizm-map.mkpcap.com/api/v1/investor/funds/${request.fund.code}` +
                `/stats${this.buildStatsUrl(request.dateRange.startDate, request.dateRange.endDate)}`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    public getTimeseries(request: fromModels.IReportParameter): Observable<fromModels.TimeseriesResponse> {
        return this.httpClient
            .get<fromModels.ITimeseriesResponse>(`http://prizm-map.mkpcap.com/api/v1/investor/funds/${request.fund.code}` +
                `/viz${this.buildStatsUrl(request.dateRange.startDate, request.dateRange.endDate)}`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    public getHistogram(request: fromModels.IReportParameter): Observable<fromModels.IHistogram[]> {
        return this.httpClient
            .get<fromModels.IHistogram[]>(`http://prizm-map.mkpcap.com/api/v1/investor/funds/${request.fund.code}` +
                `/hist${this.buildStatsUrl(request.dateRange.startDate, request.dateRange.endDate)}`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    public getCorrelation(request: fromModels.IReportParameter): Observable<fromModels.ICorrelation[]> {
        return this.httpClient
            .get<fromModels.ICorrelation[]>(`http://prizm-map.mkpcap.com/api/v1/investor/funds/${request.fund.code}` +
                `/corr${this.buildStatsUrl(request.dateRange.startDate, request.dateRange.endDate)}`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    public getSummary(request: fromModels.IReportParameter): Observable<fromModels.ISummary[]> {
        return this.httpClient
            .get<fromModels.ISummary[]>(`http://prizm-map.mkpcap.com/api/v1/investor/funds/${request.fund.code}` +
                `/summary${this.buildStatsUrl(request.dateRange.startDate, request.dateRange.endDate)}`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    public getRawReturns(request: fromModels.IReportParameter): Observable<fromModels.ITimeseriesResponse> {
        return this.httpClient
            .get<fromModels.ITimeseriesResponse>(`http://prizm-map.mkpcap.com/api/v1/investor/funds/${request.fund.code}` +
                `/raw${this.buildStatsUrl(request.dateRange.startDate, request.dateRange.endDate)}`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }
    public getDrawdown(request: fromModels.IReportParameter): Observable<fromModels.IDrawdown> {
        return this.httpClient
            .get<fromModels.IDrawdown>(`http://prizm-map.mkpcap.com/api/v1/investor/funds/${request.fund.code}` +
                `/drawdown${this.buildStatsUrl(request.dateRange.startDate, request.dateRange.endDate)}`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    public getAlphaBeta(fundCode: string): Observable<fromModels.IAlphaBetaStats[]> {
        return this.httpClient
            .get<fromModels.IAlphaBetaStats[]>(`http://prizm-map.mkpcap.com/api/v1/investor/funds/${fundCode}/alpha`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    public getRollingCorr(request: fromModels.IReportParameter): Observable<string> {
        return this.httpClient
            .get<string>(`http://prizm-map.mkpcap.com/api/v1/investor/funds/${request.fund.code}` +
                `/rolling_corr/${request.window || 21}${this.buildStatsUrl(request.dateRange.startDate, request.dateRange.endDate)}`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    public getRollingCorrWindow(): Observable<fromModels.IRollingCorrWindow[]> {
        return this.httpClient
            .get<fromModels.IRollingCorrWindow[]>(`http://prizm-map.mkpcap.com/api/v1/investor/funds/rolling_corr/window`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    private buildStatsUrl(startDate: Date, endDate: Date): string {
        let result = `?`;
        if (startDate) {
            result += `start_date=${moment(startDate).format('YYYY-MM-DD')}&`;
        }
        if (endDate) {
            result += `end_date=${moment(endDate).format('YYYY-MM-DD')}`;
        }
        return result;
    }

    public saveFundReturn(fundReturn: fromModels.IFundReturn): Observable<fromModels.IFundReturn> {
        return this.httpClient
            .post<fromModels.IFundReturn>(`http://prizm-map.mkpcap.com/api/v1/investor/funds/${fundReturn.fundcode}/update_return`, fundReturn)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    public refreshData(payload: fromModels.RefreshDataReqParameter): Observable<any> {
        return this.httpClient
            .post<any>(`http://prizm-map.mkpcap.com/api/v1/investor/refresh_data`, payload)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }
}
