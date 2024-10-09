import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

import * as fromModels from '../models';

@Injectable()
export class CapitalFlowsService {
    constructor(private httpClient: HttpClient) { }

    public loadCapitalFlowDates(): Observable<fromModels.DateRange> {
        return this.httpClient
            .get<fromModels.DateRange>(`http://prizm-map.mkpcap.com/api/v1/investor/shareclass/flows`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    public loadCapitalFlows(payload: fromModels.DateRange): Observable<fromModels.CapitalFlow[]> {
        return this.httpClient
            .post<fromModels.CapitalFlow[]>(`http://prizm-map.mkpcap.com/api/v1/investor/shareclass/flows`, payload)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    public loadCapitalFlowStats(payload: fromModels.DateRange): Observable<any> {
        return this.httpClient
            .post<any>(`http://prizm-map.mkpcap.com/api/v1/investor/shareclass/flows/stats`, payload)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    public loadCapitalFlowProjectedAUM(): Observable<any> {
        return this.httpClient
            .post<any>(`http://prizm-map.mkpcap.com/api/v1/investor/shareclass/flows/projected_aum`, {})
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    public loadFormData(): Observable<fromModels.CapitalFlowForm> {
        return this.httpClient
            .get<fromModels.CapitalFlowForm>(`http://prizm-map.mkpcap.com/api/v1/investor/shareclass/forms`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }


    public addCapitalActivity(payload: fromModels.CapitalActivity): Observable<fromModels.CapitalFlow[]> {
        return this.httpClient
            .post<fromModels.CapitalFlow[]>(`http://prizm-map.mkpcap.com/api/v1/investor/shareclass/activity`, payload)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    public updateCapitalActivity(payload: fromModels.CapitalActivity): Observable<fromModels.CapitalFlow[]> {
        return this.httpClient
            .put<fromModels.CapitalFlow[]>(`http://prizm-map.mkpcap.com/api/v1/investor/shareclass/activity/${payload.transactionId}`, payload)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    public deleteCapitalActivity(payload: fromModels.CapitalActivity): Observable<fromModels.CapitalFlow[]> {
        return this.httpClient
            .post<fromModels.CapitalFlow[]>(`http://prizm-map.mkpcap.com/api/v1/investor/shareclass/activity/${payload.transactionId}`, payload)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    public sendEmail(): Observable<any> {
        return this.httpClient
            .post<any>(`http://prizm-map.mkpcap.com/api/v1/investor/shareclass/activity/email`, null)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    public getPermissions(): Observable<boolean> {
        return this.httpClient
            .get<boolean>(`http://prizm-map.mkpcap.com/api/v1/investor/shareclass/permissions`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

}
