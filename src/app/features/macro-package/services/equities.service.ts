import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, empty, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import * as fromModels from '../models/equities.models';

@Injectable()
export class MacroEquitiesService {

    constructor(private http: HttpClient) { }

    loadDates(): Observable<string[]> {
        return this.http
            .get<string[]>('http://prizm-map.mkpcap.com/api/v1/macro/equities/dates')
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    loadAnalytics(payload: string): Observable<any[]> {
        return this.http
            .get<any[]>(`http://prizm-map.mkpcap.com/api/v1/macro/equities/${payload}`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    loadIndexTimeseries(payload: fromModels.IEquityIndexTimeseriesRequest): Observable<any> {
        return this.http
            .get<any>(`http://prizm-map.mkpcap.com/api/v1/macro/equities/${payload.asOfDate}/${payload.index}`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    loadSectorTimeseries(payload: fromModels.IEquitySectorTimeseriesRequest): Observable<any> {
        return this.http
            .get<any>(`http://prizm-map.mkpcap.com/api/v1/macro/equities/${payload.asOfDate}/${payload.index}/${payload.sector}`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }
}
