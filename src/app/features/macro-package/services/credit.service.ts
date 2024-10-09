import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, empty, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import * as fromModels from '../models/credit.models';

@Injectable()
export class MacroCreditService {

    constructor(private http: HttpClient) { }

    loadDates(): Observable<string[]> {
        return this.http
            .get<string[]>(`http://prizm-map.mkpcap.com/api/v1/macro/credit/dates`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    loadCreditIndices(): Observable<fromModels.ICreditIndex[]> {
        return this.http
            .get<fromModels.ICreditIndex[]>('http://prizm-map.mkpcap.com/api/v1/macro/credit/indices')
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    loadIndexConstituents(payload: string): Observable<fromModels.ICreditIndexConstituent[]> {
        return this.http
            .get<fromModels.ICreditIndexConstituent[]>(`http://prizm-map.mkpcap.com/api/v1/macro/credit/constituents/${payload}`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    loadSectorWeights(payload: string): Observable<fromModels.ICreditSectorWeight[]> {
        return this.http
            .get<fromModels.ICreditSectorWeight[]>(`api/v1/macro/credit/constituents/weights/${payload}`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    loadAnalytics(payload: string): Observable<any[]> {
        return this.http
            .get<any[]>(`http://prizm-map.mkpcap.com/api/v1/macro/credit/${payload}/results`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    loadTimeseries(payload: string): Observable<any> {
        return this.http
            .get<any>(`http://prizm-map.mkpcap.com/api/v1/macro/credit/${payload}/timeseries`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }
}
