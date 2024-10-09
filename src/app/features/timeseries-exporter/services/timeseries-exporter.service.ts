import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import * as fromModels from './../models';

@Injectable()
export class TimeseriesExporterService {

    constructor(private http: HttpClient) { }

    getMonitors(): Observable<fromModels.IMonitor[]> {
        return this.http
            .get<fromModels.IMonitor[]>('http://prizm-map.mkpcap.com/api/v1/timeseries_exporter/monitors')
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    getMonitorData(request: fromModels.IMonitorRequest): Observable<any> {
        return this.http
            .post<any>(`http://prizm-map.mkpcap.com/api/v1/timeseries_exporter/monitors/${request.monitor.name}/data`, request)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    saveMonitor(request: any): Observable<any> {
        return this.http
            .post<any>(`http://prizm-map.mkpcap.com/api/v1/timeseries_exporter/monitors`, request)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    deleteMonitorList(request: string): Observable<any> {
        return this.http
            .post<fromModels.IMonitor[]>(`http://prizm-map.mkpcap.com/api/v1/timeseries_exporter/monitors/delete`, {name: request})
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }






    loadTimeseries(request: fromModels.ITimeseriesRequest): Observable<string> {
        return this.http
            .post<string>(`http://prizm-map.mkpcap.com/api/v1/timeseries_exporter/monitors/data`, request)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    loadTimeseriesWithMdidList(request: fromModels.ITimeseriesWithMdidListRequest): Observable<string> {
        return this.http
            .post<string>(`http://prizm-map.mkpcap.com/api/v1/timeseries_exporter/monitors/data/mdids`, request)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }








    searchSecurities(payload: fromModels.ISecuritySearch): Observable<any[]> {
        return this.http
            .post<any[]>(`http://prizm-map.mkpcap.com/api/v1/timeseries_exporter/security`, payload)
            .pipe(catchError((err: HttpErrorResponse) => {
                return throwError(err.error.message);
            }));
    }

    loadMarketDataTypes(payload: number): Observable<any[]> {
        return this.http
            .post<any[]>(`api/v1/timeseries_exporter/marketdata`, {'sid': payload })
            .pipe(catchError((err: HttpErrorResponse) => {
                return throwError(err.error.message);
            }));
    }

}
