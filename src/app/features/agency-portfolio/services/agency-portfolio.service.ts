import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, empty, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import * as fromModels from '../models';
import { AuthService } from 'src/app/services';

@Injectable()
export class AgencyPortfolioService {

    constructor(private http: HttpClient, private authService: AuthService) { }

    // getAsOfDates(): Observable<string[]> {
    //     return this.http
    //         .get<string[]>('http://prizm-map.mkpcap.com/api/v1/agency/')
    //         .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    // }

    getPositions(payload: fromModels.AgencyPortfolioRequest): Observable<any[]> {
        return this.http
            .post <any[]> (`http://prizm-map.mkpcap.com/api/v1/agency/positions`, {'asOfDate': payload.asOfDate, 'mode': payload.displayMode})
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    getSecurities(payload: fromModels.AgencyPortfolioRequest): Observable<any[]> {
        return this.http
            .post<any[]>(`http://prizm-map.mkpcap.com/api/v1/agency/securities`, { 'asOfDate': payload.asOfDate, 'mode': payload.displayMode })
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    getBenchmarks(payload: fromModels.AgencyPortfolioRequest): Observable<any[]> {
        return this.http
            .post<any[]>(`http://prizm-map.mkpcap.com/api/v1/agency/benchmarks`, { 'asOfDate': payload.asOfDate, 'mode': payload.displayMode })
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    getData(payload: fromModels.AgencyPortfolioRequest): Observable<any[]> {
        return this.http
            .post<any[]>(`http://prizm-map.mkpcap.com/api/v1/holdings/agency`, payload)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    } 

    loadLayout(): Observable<fromModels.Layout[]> {
        return this.http
            .get<any[]>(`http://prizm-map.mkpcap.com/api/v1/layouts/`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    saveLayout(payload: fromModels.Layout): Observable<any> {
        const user = this.authService.getName();
        const payloadRequest: any = Object.assign({}, payload);
        payloadRequest.user = user;
        payloadRequest.layoutData = JSON.stringify(payloadRequest.layoutData);
        return this.http
            .post<any[]>(`http://prizm-map.mkpcap.com/api/v1/layouts/`, payloadRequest)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
        // return of(payload);
    }
    
    debounce(func, delay) {
        let timer
        return function() {
            const args = arguments
            clearTimeout(timer)
            timer = setTimeout(() => func(...Array.from(args)),delay)
        }
    }
}
