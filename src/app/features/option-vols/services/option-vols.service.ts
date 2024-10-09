import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, empty, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import * as fromModels from '../models/option-vols.models';

@Injectable()
export class OptionVolsService {

    constructor(private http: HttpClient) {}

    loadSupportedTickers(): Observable<string[]> {
        return this.http
            .get<string[]>(`http://prizm-map.mkpcap.com/api/v1/optionvols/tickers`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    addSupportedTickers(payload: string): Observable<any> {
        return this.http
            .post<string[]>(`http://prizm-map.mkpcap.com/api/v1/optionvols/tickers/${payload}`, {})
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    deleteSupportedTickers(payload: string): Observable<any> {
        return this.http
            .delete<string[]>(`http://prizm-map.mkpcap.com/api/v1/optionvols/tickers/${payload}`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    updateSupportedTickers(payload: any): Observable<any> {
        return this.http
            .put<string[]>(`http://prizm-map.mkpcap.com/api/v1/optionvols/tickers/${payload.oldTicker}`, {newTicker: payload.newTicker})
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }






    loadFuturesMapping(): Observable<any[]> {
        return this.http
            .get<string[]>(`http://prizm-map.mkpcap.com/api/v1/optionvols/futures/map`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    addFuturesMapping(payload: fromModels.IFutureMapping): Observable<any> {
        return this.http
            .post<string[]>(`http://prizm-map.mkpcap.com/api/v1/optionvols/futures/map`, payload)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    deleteFuturesMapping(payload: fromModels.IFutureMapping): Observable<any> {
        return this.http
            .delete<string[]>(`http://prizm-map.mkpcap.com/api/v1/optionvols/futures/map/${payload.futureRoot}/${payload.benchmarkMnemonic}`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    updateFuturesMapping(payload: fromModels.IFutureMapping): Observable<any> {
        return this.http
            .put<string[]>(`http://prizm-map.mkpcap.com/api/v1/optionvols/futures/map`, payload)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }






    getOptionChain(payload: fromModels.ITicker): Observable<any> {
        return this.http
        .get<any>(`http://prizm-map.mkpcap.com/api/v1/optionvols/chain/${payload.ticker}`)
        .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    runOptionVolAnalysis(payload: fromModels.IOptionVolRequest): Observable<any> {
        return this.http
            .post<any>(`http://prizm-map.mkpcap.com/api/v1/optionvols/`, payload)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    notifySupport(payload: fromModels.IOptionVolRequest): Observable<any> {
        return this.http
            .post<any>(`http://prizm-map.mkpcap.com/api/v1/optionvols/notify`, payload)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    getOptionVolAnalysisLogs(guid: string): Observable<any> {
        return this.http
            .get<any>(`http://prizm-map.mkpcap.com/api/v1/optionvols/logs/${guid}`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    runFXOptionVolAnalysis(payload: fromModels.IOptionVolRequest): Observable<any> {
        return this.http
            .post<any>(`/pricing/api/v1/pricing/options/fx/deltas`, payload)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

}
