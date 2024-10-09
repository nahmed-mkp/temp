import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, empty, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import * as fromModel from '../models'

@Injectable()
export class VolReportService {
    constructor(private http: HttpClient) {}

    getAsOfDates(): Observable<string[]> {
        return this.http
            .get<string[]>('http://prizm-map.mkpcap.com/api/v1/jbot/')
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)))
    }

    getVolReport(payload: String): Observable<fromModel.VolReportData[]> {
        const dateFormat = payload.split('/').join('-')
        return this.http
            .get<any>(`http://prizm-map.mkpcap.com/api/v1/jbot/results/${dateFormat}`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)))
    }

    getTimeseries(payload: any): Observable<any> {
        return this.http
            .post<any>('http://prizm-map.mkpcap.com/api/v1/vol-report/timeseries', payload)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)))
    }
}