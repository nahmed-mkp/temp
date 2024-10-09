import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { EMPTY, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import * as fromModels from './../models/directionality.models';

@Injectable()
export class DirectionalityService {

    constructor(public client: HttpClient) {}

    public loadInputs(): Observable<fromModels.DirectionalityInputs> {
        return this.client
            .get<fromModels.DirectionalityInputs>(`http://prizm-map.mkpcap.com/api/v1/position/directionality/inputs`)
            .pipe(catchError((err: HttpErrorResponse) => {
                return throwError((err.error.message));
            }));
    }

    public loadDirectionality(payload: fromModels.DirectionalityRequest): Observable<any> {
        const payloadCopy: any = Object.assign({}, payload);
        payloadCopy.fromDate = payloadCopy.fromDate.toLocaleDateString().split('/').join('-');
        return this.client
            .post<any[]>(`http://prizm-map.mkpcap.com/api/v1/position/directionality`, payloadCopy)
            .pipe(catchError((err: HttpErrorResponse) => {
                return throwError((err.error.message));
            }));
    }

    public loadScatterPlot(payload: fromModels.ScatterPlotRequest): Observable<any> {
        const payloadCopy: any = Object.assign({}, payload);
        payloadCopy.fromDate = payloadCopy.fromDate.toLocaleDateString().split('/').join('-');
        return this.client
            .post<any[]>(`http://prizm-map.mkpcap.com/api/v1/position/directionality/scatter`, payloadCopy)
            .pipe(catchError((err: HttpErrorResponse) => {
                return throwError((err.error.message));
            }));
    }

    // --------------------------------------------------------------------

    public loadRegressionFactors(): Observable<any> {
        return this.client
            .get<any>(`http://prizm-map.mkpcap.com/api/v1/position/directionality/factors`)
            .pipe(catchError((err: HttpErrorResponse) => {
                return throwError((err.error.message));
            }));
    }

    public runRegression(payload: fromModels.regressionRequest) {
        const payloadCopy: any = Object.assign({}, payload);
        payloadCopy.fromDate = payloadCopy.fromDate.toLocaleDateString().split('/').join('-');
        return this.client
            .post<any[]>(`http://prizm-map.mkpcap.com/api/v1/position/directionality`, payloadCopy)
            .pipe(catchError((err: HttpErrorResponse) => {
                return throwError((err.error.message));
            }));
    }
}
