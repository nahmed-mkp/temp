import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, empty, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import * as fromModels from '../models';


@Injectable()
export class SecMasterReconciliationService {

    constructor(private http: HttpClient) { }

    loadReconciliationService(payload: fromModels.ISecMasterRecInput): Observable<any> {
        return this.http
            .post<any>(`http://prizm-map.mkpcap.com/api/v1/secmaster/recs`, payload)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }
}
