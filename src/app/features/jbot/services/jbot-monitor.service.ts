import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, empty, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import * as fromModel from '../models'

@Injectable()
export class JbotMonitorService {
    constructor(private http: HttpClient) {}

    getAsOfDates(): Observable<string[]> {
        return this.http
            .get<string[]>('http://prizm-map.mkpcap.com/api/v1/jbot/monitor')
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    getJbotMonitorResult(payload: string, timeRange): Observable<fromModel.JbotMonitorScore[]> {
        const date = payload.split('/').join('-');
        return this.http
            .get<fromModel.JbotMonitorScore[]>(`http://prizm-map.mkpcap.com/api/v1/jbot/monitor/results/${date}/${timeRange}`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }
}
