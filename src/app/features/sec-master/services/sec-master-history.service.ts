import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, empty, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import * as fromModels from './../models/sec-master-history.models';


@Injectable()
export class SecMasterHistoryService {

    constructor(private http: HttpClient) { }

    loadCreateHistory(payload: fromModels.ISecurityHistoryReq): Observable<any[]> {
        const formatPayload: any = {};
        formatPayload['startDate'] = payload.startDate.toLocaleDateString().split('/').join('-');
        formatPayload['endDate'] = payload.endDate.toLocaleDateString().split('/').join('-');

        return this.http
            .post<any[]>(`http://prizm-map.mkpcap.com/api/v1/secmaster/history/create`, payload)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    loadUpdateHistory(payload: fromModels.ISecurityHistoryReq): Observable<any[]> {
        const formatPayload: any = {};
        formatPayload['startDate'] = payload.startDate.toLocaleDateString().split('/').join('-');
        formatPayload['endDate'] = payload.endDate.toLocaleDateString().split('/').join('-');
        return this.http
            .post<any[]>(`http://prizm-map.mkpcap.com/api/v1/secmaster/history/update`, payload)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }
}
