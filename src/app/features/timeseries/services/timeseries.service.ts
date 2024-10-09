import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';

import * as fromModels from './../models/timeseries.models';

@Injectable()
export class TimeseriesService {

    constructor(private http: HttpClient) { }

    /* ========= TIMESERIES ========== */

    loadTimeseriesHierarchy(): Observable<any> {
        return this.http
            .get<any>('http://prizm-map.mkpcap.com/api/v1/timeseries/catalog/hierarchy')
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    loadParentCatalogData(): Observable<any> {
        return this.http
            .get<any>(`http://prizm-map.mkpcap.com/api/v1/timeseries/catalog`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    loadTimeseriesById(id: number): Observable<any[]> {
        return this.http
            .get<any>(`http://prizm-map.mkpcap.com/api/v1/timeseries/catalog/${id}`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    /* ========= PORTFOLIOS ========== */

    createPortfolio(portfolio: fromModels.IPortfolio): Observable<fromModels.IPortfolio> {
        return this.http
            .post<fromModels.IPortfolio>('http://prizm-map.mkpcap.com/api/v1/timeseries/portfolios', portfolio)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)))
    }

    loadAllImportableTimeseriesPortfolios(): Observable<fromModels.IPortfolio[]> {
        return this.http
            .get<fromModels.IPortfolio[]>(`http://prizm-map.mkpcap.com/api/v1/timeseries/portfolios`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    loadTimeseriesPortfolio(portfolio: fromModels.IPortfolio | fromModels.IPortfolioLite | fromModels.IGuidUrlReq) : Observable<fromModels.IPortfolio> {
        return this.http
            .get<fromModels.IPortfolio>(`http://prizm-map.mkpcap.com/api/v1/timeseries/portfolios/${portfolio.guid}`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    loadTimeseriesPortfolioData(request: fromModels.IPortfolioDataRequest): Observable<string> {
        if(request.portfolio === null){
            return EMPTY
        }
        if (request.portfolio && request.portfolio.guid !== null && request.portfolio.guid !== undefined) {
            return this.http
                .post<string>(`http://prizm-map.mkpcap.com/api/v1/timeseries/portfolios/data/${request.portfolio.guid}`, {'startDate': request.startDate, 'endDate': request.endDate})
                .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
        } else {
            return this.http
                .post<string>(`http://prizm-map.mkpcap.com/api/v1/timeseries/portfolios/data`, {
                    'timeseries':  request.portfolio.timeseries, 
                    'startDate': request.startDate, 
                    'endDate': request.endDate 
                })
                .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
        }        
    }

    deletePortfolio(portfolio: fromModels.IPortfolio) : Observable<any>{
        return this.http
            .delete<any>(`api/v1/timeseries/portfolios/${portfolio.guid}`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)))
    }

    deletePortfolioByGuid(guid: string): Observable<any> {
        return this.http
            .delete<any>(`api/v1/timeseries/portfolios/${guid}`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)))
    }

    updateTimeseriesPortfolioData(request: fromModels.IPortfolio): Observable<any>{
        return this.http
            .put<any>(`api/v1/timeseries/portfolios/${request.guid}`, request)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)))
    }

    loadTimeseriesPortfolioStats(request: fromModels.IPortfolioDataRequest): Observable<string> {
        if (request.portfolio === null) {
            return EMPTY
        }
        if (request.portfolio && request.portfolio.guid !== null && request.portfolio.guid !== 'undefined' && request.portfolio.guid !== undefined) {
            return this.http
                .post<string>(`http://prizm-map.mkpcap.com/api/v1/timeseries/portfolios/stats/${request.portfolio.guid}`, { 'startDate': request.startDate, 'endDate': request.endDate })
                .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
        } else {
            return this.http
                .post<string>(`http://prizm-map.mkpcap.com/api/v1/timeseries/portfolios/stats`, { 'timeseries': request.portfolio.timeseries, 'startDate': request.startDate, 'endDate': request.endDate })
                .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
        }       
    }

    loadDrawdownData(request: fromModels.IDrawdownReq): Observable<any> {
        return this.http
            .post<any>(`api/v1/timeseries/portfolios/drawdown/${request.guid}`, request)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)))
    }

    loadRegressionData(request: fromModels.IRegressionReq, guid: string): Observable<any> {
        return this.http
            .post<any>(`api/v1/timeseries/portfolios/regression/${guid}`, request)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    loadSimpleMovingAverageData(request: fromModels.ISimpleMovingAvgReq): Observable<any> {
        return this.http
            .post<any>(`api/v1/timeseries/portfolios/sma/${request.guid}`, {
                'startDate': request.startDate,
                'endDate': request.endDate,
                'params': request.params
            })
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)))
    }

    loadBollingerBandsData(request: fromModels.IBollingerBandsReq): Observable<any> {
        return this.http
            .post<any>(`api/v1/timeseries/portfolios/bbands/${request.guid}`, { 
                'startDate': request.startDate,
                'endDate': request.endDate,
                'params': request.params
            })
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)))
    }

    loadRelativeStrengthIndicatorData(request: fromModels.IRelativeStrengthIndicatorReq): Observable<any> {
        return this.http
            .post<any>(`api/v1/timeseries/portfolios/rsi/${request.guid}`, {  
                'startDate': request.startDate,
                'endDate': request.endDate,
                'params': request.params
            })
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)))
    }

    loadMovingAverageConvergenceDivergenceData(request: fromModels.IMovingAverageConvergenceDivergenceReq): Observable<any> {
        return this.http
            .post<any>(`api/v1/timeseries/portfolios/macd/${request.guid}`, { 
                'startDate': request.startDate,
                'endDate': request.endDate,
                'params': request.params
            })
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)))
    }

}