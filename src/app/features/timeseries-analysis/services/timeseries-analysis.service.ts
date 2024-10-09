import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable()
export class TimeseriesAnalysisService {

    constructor(private http: HttpClient) { }

    loadUserWatchilists(): Observable<any[]> {
        return this.http
            .get<any[]>('http://prizm-map.mkpcap.com/api/v1/generic_timeseries/')
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    createUserWatchlist(payload: any): Observable<any> {
        return this.http
            .post<any>('http://prizm-map.mkpcap.com/api/v1/generic_timeseries/', payload)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    updateUserWatchlist(payload: any): Observable<any> {
        return this.http
            .post<any>(`http://prizm-map.mkpcap.com/api/v1/generic_timeseries/${payload.guid}`, payload)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    deleteUserWatchlist(payload: any): Observable<any> {
        return this.http
            .delete<any>(`http://prizm-map.mkpcap.com/api/v1/generic_timeseries/${payload.guid}`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }
}
