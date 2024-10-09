import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, empty, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import * as fromModel from '../models'

@Injectable()
export class JbotTechService {
    constructor(private http: HttpClient) {}

    getAsOfDates(): Observable<string[]> {
        return this.http
            .get<string[]>('http://prizm-map.mkpcap.com/api/v1/jbot/daily')
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)))
    }

    getJbotTechResult(payload: string, timeRange): Observable<fromModel.JbotTechScore[]> {
        const date = payload.split('/').join('-');
        return this.http
            .get<fromModel.JbotTechScore[]>(`http://prizm-map.mkpcap.com/api/v1/jbot/daily/results/${date}/${timeRange}`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)))
    }
}