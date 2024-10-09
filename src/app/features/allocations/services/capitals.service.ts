import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, empty, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import * as fromModels from '../models/capitals.models';

@Injectable()
export class CapitalsService {

    constructor(private http: HttpClient) { }

    loadFundComplexes(): Observable<string[]> {
        return this.http
            .get<string[]>(`http://prizm-map.mkpcap.com/api/v1/capitals`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    getLatestCapitalMatrix(): Observable<fromModels.ICapitalMatrix> {
        return this.http
            .post<fromModels.ICapitalMatrix>(`http://prizm-map.mkpcap.com/api/v1/capitals`, null)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    getCapitalMatrix(payload: fromModels.ICapitalInput): Observable<fromModels.ICapitalMatrix> {
        return this.http
            .post<fromModels.ICapitalMatrix>(`http://prizm-map.mkpcap.com/api/v1/capitals`, payload)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    updateCrossPodCapital(payload: fromModels.ICrossPodCapitalChange): Observable<any> {
        return this.http
            .post<fromModels.ICapitalMatrix>(`http://prizm-map.mkpcap.com/api/v1/capitals/update/crosspod`, payload)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    updateFundCapital(payload: fromModels.IFundCapitalChange): Observable<any> {
        return this.http
            .post<any>(`http://prizm-map.mkpcap.com/api/v1/capitals/update/fund`, payload)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    resetCapitalChanges(payload: fromModels.ICapitalInput): Observable<any> {
        return this.http
            .post<any>(`http://prizm-map.mkpcap.com/api/v1/capitals/reset`, payload)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    previewCapitalChanges(payload: fromModels.ICapitalInput): Observable<any> {
        return this.http
            .post<any>(`http://prizm-map.mkpcap.com/api/v1/capitals/preview`, payload)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    saveCapitalChanges(payload: fromModels.ICapitalSaveInput): Observable<fromModels.ISaveCapitalResult> {
        return this.http
            .post<any>(`http://prizm-map.mkpcap.com/api/v1/capitals/save`, payload)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    loadFundCapitalFlows(payload: fromModels.ICapitalFlowInput): Observable<any[]> {
        return this.http
            .post<any[]>(`http://prizm-map.mkpcap.com/api/v1/capitals/flows/fund`, payload)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    loadPodCapitalFlows(payload: fromModels.ICapitalFlowInput): Observable<any[]> {
        return this.http
            .post<any[]>(`http://prizm-map.mkpcap.com/api/v1/capitals/flows/pod`, payload)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    loadFundCapitalHistory(payload: fromModels.ICapitalHistoryInput): Observable<any[]> {
        return this.http
            .post<any[]>(`http://prizm-map.mkpcap.com/api/v1/capitals/history/fund`, payload)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    loadPodCapitalHistory(payload: fromModels.ICapitalHistoryInput): Observable<any[]> {
        return this.http
            .post<any[]>(`http://prizm-map.mkpcap.com/api/v1/capitals/history/crosspod`, payload)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

}
