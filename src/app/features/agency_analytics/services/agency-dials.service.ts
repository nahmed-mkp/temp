import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import * as fromModels from '../models/yieldbook.models';
import * as fromDialsModels from '../models/agency-dials.models';

@Injectable()
export class AgencyDialsService {

    constructor(private http: HttpClient) { }

    loadDefaultTemplate(): Observable<any> {
        return this.http
            .get<any>(`http://prizm-map.mkpcap.com/api/v1/agency_analytics/dials/template`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    loadDials(): Observable<any[]> { 
        return this.http
            .get<any[]>(`http://prizm-map.mkpcap.com/api/v1/agency_analytics/dials`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    loadDial(dialId: string): Observable<fromDialsModels.IDialDetail> { 
        return this.http
            .get<fromDialsModels.IDialDetail>(`http://prizm-map.mkpcap.com/api/v1/agency_analytics/dials/${dialId}`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    addDial(payload: fromDialsModels.INewDialDetail): Observable<fromDialsModels.IDialDetail> {
        return this.http
            .post<fromDialsModels.IDialDetail>(`http://prizm-map.mkpcap.com/api/v1/agency_analytics/dials`, payload)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    cloneDial(payload: fromDialsModels.IClonedDialDetail): Observable<fromDialsModels.IDialDetail> {
        return this.http
            .post<fromDialsModels.IDialDetail>(`http://prizm-map.mkpcap.com/api/v1/agency_analytics/dials`, payload)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    updateDial(payload: fromDialsModels.IDialDetail): Observable<fromDialsModels.IDialDetail> {
        return this.http
            .put<fromDialsModels.IDialDetail>(`http://prizm-map.mkpcap.com/api/v1/agency_analytics/dials/${payload.dialId}`, payload)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    deleteDial(payload: fromDialsModels.IDialDetail): Observable<fromDialsModels.IDialDetail> {
        return this.http
            .delete<fromDialsModels.IDialDetail>(`http://prizm-map.mkpcap.com/api/v1/agency_analytics/dials/${payload.dialId}`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

}
