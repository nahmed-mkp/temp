import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, empty, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import * as fromModels from '../models';

@Injectable()
export class DailyTrackingService {
    constructor(private http: HttpClient) {}

    getRealtimeData(payload: fromModels.ITrackingInput): Observable<any> {
        return this.http
            .post<any>('http://prizm-map.mkpcap.com/api/v1/tracking/realtime2', payload)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    getHistoricalData(payload: fromModels.ITrackingInput): Observable<any> {
        return this.http
            .post<any>('http://prizm-map.mkpcap.com/api/v1/tracking/history', payload)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    updateUserInputs(payload: any): Observable<any> {
        return this.http
            .post<fromModels.TsySwap[]>('http://prizm-map.mkpcap.com/api/v1/tracking/hedgeratios', payload)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    takeSnapshot(): Observable<any> {
        return this.http
            .post<fromModels.TsySwap[]>('http://prizm-map.mkpcap.com/api/v1/tracking/snapshot', {})
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    loadOHLC(): Observable<any[]> {
        return this.http
            .get<any[]>('http://prizm-map.mkpcap.com/api/v1/tracking/intraday/ohlc', {})
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    loadMedianByTimeOfDay(): Observable<any[]> {
        return this.http
            .get<any[]>('http://prizm-map.mkpcap.com/api/v1/tracking/intraday/median_time_of_day', {})
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    restartTradewebExcel(user: string): Observable<any>{
        const payload = {
            appName: "Tradeweb - Excel Sheet Restart",
            machineName: "RISKAPPSTW01",
            userName: user
        };
        return this.http
            .post<any>('http://prizm-map.mkpcap.com/api/v1/health/restart', payload)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    loadIntradayMetadata(): Observable<any> {
        return this.http
            .get<any>(`http://prizm-map.mkpcap.com/api/v1/tracking/intraday`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    loadIntradayPlot(payload: fromModels.IntradayRequest): Observable<any> {
        return this.http
            .post<any>(`http://prizm-map.mkpcap.com/api/v1/tracking/intraday`, payload)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    loadHistoricalPlot(payload: fromModels.EODRequest): Observable<any> {
        if (payload.useCumulative && payload.useCumulative === true) { 
            return this.http
                .post<any>(`http://prizm-map.mkpcap.com/api/v1/tracking/cumsum`, payload)
                .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
        }
        return this.http
            .post<any>(`http://prizm-map.mkpcap.com/api/v1/tracking/eod`, payload)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }
}
