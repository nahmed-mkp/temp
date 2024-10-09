import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, empty, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import * as fromModel from '../models'

@Injectable()
export class JbotService {
    constructor(private http: HttpClient) {}

    getAsOfDates(): Observable<string[]> {
        return this.http
            .get<string[]>('http://prizm-map.mkpcap.com/api/v1/jbot/')
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)))
    }

    getJbotResult(payload: String): Observable<fromModel.JbotGridData[]> {
        const dateFormat = payload.split('/').join('-')
        return this.http
            .get<fromModel.JbotGridData[]>(`http://prizm-map.mkpcap.com/api/v1/jbot/results/diff/${dateFormat}`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)))
    }

    getJbotTimeseries(payload: {category: string, seriesName: string}): Observable<fromModel.JbotTimeseriesResponse> {
        return this.http
            .get<fromModel.JbotTimeseriesResponse>(`http://prizm-map.mkpcap.com/api/v1/jbot/results/annotations/${payload.category}/${payload.seriesName}`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)))
    }

    roundOffDate(dateNumber: number) {
        const date = new Date(dateNumber);
        const weekDay = date.getDay();
        if(weekDay === 6) date.setDate(date.getDate() - 1)
        else if(weekDay === 0) date.setDate(date.getDate() + 1)
        return date.toLocaleDateString();
    }
}