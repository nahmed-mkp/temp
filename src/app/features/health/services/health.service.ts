import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, EMPTY, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import * as fromModels from '../models';

@Injectable()
export class HealthService {
    constructor(private http: HttpClient) { }

    getHealthStatus(): Observable<any> {
        return this.http
            .get<any[]>(`http://prizm-map.mkpcap.com/api/v1/health/`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    viewRunHistory(payload: fromModels.RunHistoryRequest): Observable<any[]> {
        return this.http
            .get<any[]>(`http://prizm-map.mkpcap.com/api/v1/health/history/${payload.appName}/${payload.machineName}`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    restartApp(payload: fromModels.AppRestartRequest): Observable<any[]> {
        return this.http
            .post<any[]>(`http://prizm-map.mkpcap.com/api/v1/health/restart`, payload)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    killMonitoredProcess(payload: fromModels.ProcessKillRequest): Observable<any[]> {
        return this.http
            .post<any>(`http://prizm-map.mkpcap.com/api/v1/health/kill`, payload)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    sendBulkRequest(payload: fromModels.BulkRequest): Observable<any[]> {
        return this.http
            .post<any>(`http://prizm-map.mkpcap.com/api/v1/health/bulk`, payload)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    loadProcessNames(): Observable<any[]> {
        return this.http
            .get<any[]>(`http://prizm-map.mkpcap.com/api/v1/health/processNames`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

}
