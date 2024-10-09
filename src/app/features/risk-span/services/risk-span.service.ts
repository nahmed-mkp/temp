import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, empty, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import * as fromModel from '../models';

@Injectable()
export class RiskSpanService {
    constructor(private http: HttpClient) {}

    loadReports(): Observable<any> {
        return this.http
            .get<any>('http://prizm-map.mkpcap.com/api/v1/riskspan')
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    loadXAxis(): Observable<any> {
        return this.http
            .get<any>('http://prizm-map.mkpcap.com/api/v1/riskspan/xAxis')
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    loadYAxis(): Observable<any> {
        return this.http
            .get<any>('http://prizm-map.mkpcap.com/api/v1/riskspan/yAxis')
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    uploadSheet(payload): Observable<any> {
        return this.http
            .post<any>(`http://prizm-map.mkpcap.com/api/v1/riskspan/upload/${payload}`, payload)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    updateFile(payload): Observable<any> {
        return this.http
            .post<any>(`http://prizm-map.mkpcap.com/api/v1/riskspan/${payload}`, payload)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    updateFileName(payload: fromModel.ReportRecord): Observable<any> {
        return this.http
            .post(`http://prizm-map.mkpcap.com/api/v1/riskspan/${payload.reportId}`, payload)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    getReportData(payload: number): Observable<any> {
        return this.http
            .get(`http://prizm-map.mkpcap.com/api/v1/riskspan/${payload}`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    getReportPlot(payload: fromModel.ReportPlotRequest, reportId: number): Observable<fromModel.ReportPlotResponse> {
        return this.http
            .post<fromModel.ReportPlotResponse>(`http://prizm-map.mkpcap.com/api/v1/riskspan/${reportId}/plot`, payload)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }
}
