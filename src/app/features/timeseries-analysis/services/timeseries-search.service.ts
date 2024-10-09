import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import * as fromModels from './../models/timeseries.models';


@Injectable()
export class TimeseriesSearchService {

    constructor(private http: HttpClient) { }

    loadSources(): Observable<string[]> {
        return this.http
            .get<string[]>('http://prizm-map.mkpcap.com/api/v1/generic_timeseries/')
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    searchTimeseries(payload: fromModels.ITimeseriesSearch): Observable<fromModels.ITimeseries[]> {
        return this.http
            .post<fromModels.ITimeseries[]>('http://prizm-map.mkpcap.com/api/v1/generic_timeseries/', payload)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    previewTimeseries(payload: fromModels.ITimeseries): Observable<fromModels.ITimeseriesPreview> {
        return this.http
            .post<fromModels.ITimeseriesPreview>('http://prizm-map.mkpcap.com/api/v1/generic_timeseries/', payload)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }
}
