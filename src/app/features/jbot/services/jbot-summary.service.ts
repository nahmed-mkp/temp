import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, empty, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import * as fromModel from '../models/jbot-summary.models';

@Injectable()
export class JbotSummaryService {
    constructor(private http: HttpClient) {}

    getAsOfDates(): Observable<string[]> {
        return this.http
            .get<string[]>('http://prizm-map.mkpcap.com/api/v1/jbot/daily')
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)))
    }

    getJbotSummary(payload: String): Observable<fromModel.JbotSummaryGridData[]> {
        const dateFormat = payload.split('/').join('-');
        return this.http
            .get<fromModel.JbotSummaryGridData[]>(`http://prizm-map.mkpcap.com/api/v1/jbot/summary/${dateFormat}`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    getJbotExplodedSummary(payload: String): Observable<fromModel.JbotExplodedSummaryGridData[]> {
        const dateFormat = payload.split('/').join('-');
        return this.http
            .get<fromModel.JbotExplodedSummaryGridData[]>(`http://prizm-map.mkpcap.com/api/v1/jbot/summary/${dateFormat}/exploded`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

}
