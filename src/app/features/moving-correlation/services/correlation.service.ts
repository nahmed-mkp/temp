import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';

import * as fromModels from './../models/correlation.model';

@Injectable()
export class CorrelationService {
    
    constructor(private http: HttpClient) {}

    getCorrelationSecurityList(): Observable<string[]> {
        return this.http
            .get<string[]>('http://prizm-map.mkpcap.com/api/v1/correlation/security_list')
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.message)));
    }

    getCorrelationAnalysis(payload: fromModels.CorrelationRequestWithID): Observable<fromModels.CorrelationResponse> {
        return this.http
            .post<fromModels.CorrelationResponse>('http://prizm-map.mkpcap.com/api/v1/correlation/rolling_corr', payload)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.message)));
    }
}