import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class MarketDataRatesService {

    constructor(public client: HttpClient) {}

    public loadForwardRatesData(payload: string): Observable<any> {
        return this.client
            .get<string[]>(`/pricing/api/v1/monitors/forwardrates/${payload}`)
            .pipe(catchError((err: HttpErrorResponse) => {
                return throwError((err.error.message));
            }));
    }

    public loadForwardRatesDataAdvance(payload: string): Observable<any> {
        return this.client
            .get<string[]>(`/pricing/api/v1/monitors/forwardrates/advance/${payload}`)
            .pipe(catchError((err: HttpErrorResponse) => {
                return throwError((err.error.message));
            }));
    }

    public loadCurveData(payload: string): Observable<any> {
        return this.client
            .get<string[]>(`/pricing/api/v1/monitors/curves/${payload}`)
            .pipe(catchError((err: HttpErrorResponse) => {
                return throwError((err.error.message));
            }));
    }

    public loadParRatesData(payload: string): Observable<any> {
        return this.client
            .get<string[]>(`/pricing/api/v1/monitors/parrates/${payload}`)
            .pipe(catchError((err: HttpErrorResponse) => {
                return throwError((err.error.message));
            }));
    }

    public loadFuturesBasisMonitor(): Observable<any> {
        return this.client
            .get<string[]>(`/pricing/api/v1/monitors/futuresbasis`)
            .pipe(catchError((err: HttpErrorResponse) => {
                return throwError((err.error.message));
            }));
    }

    public loadFuturesBasisContract(payload: string): Observable<any> {
        return this.client
            .get<string[]>(`/pricing/api/v1/monitors/futuresbasis/${payload}`)
            .pipe(catchError((err: HttpErrorResponse) => {
                return throwError((err.error.message));
            }));
    }

    public loadInflationSwaps(payload: string): Observable<any> {
        // todo, add asofDate otpion here
        console.log('payload: ', payload);
        return this.client
            .post<string[]>(`http://prizm-map.mkpcap.com/api/v1/inflationswaps/`, { 'asOfDate': payload })
            .pipe(catchError((err: HttpErrorResponse) => {
                return throwError((err.error.message));
            }));
    }

    public loadInflationSwapsDataPoints(payload: string): Observable<any> {
        // todo, add asofDate otpion here
        console.log('payload: ', payload);
        return this.client
            .post<string[]>(`http://prizm-map.mkpcap.com/api/v1/inflationswaps/history`, { 'asOfDate': payload })
            .pipe(catchError((err: HttpErrorResponse) => {
                return throwError((err.error.message));
            }));
    }
}
