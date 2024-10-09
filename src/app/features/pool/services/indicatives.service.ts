import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import * as fromModels from '../models/indicatives.models';

@Injectable()
export class IndicativesService {

    constructor(private client: HttpClient) { }

    loadIndicativesFromUserInput(payload: fromModels.IIndicativeRequest): Observable<any[]> {
        return this.client
            .post<any[]>(`http://prizm-map.mkpcap.com/api/v1/indicatives/user`, payload)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    loadIndicatives(payload: fromModels.IIndicativeRequest): Observable<any[]> {
        return this.client
            .post<any[]>(`http://prizm-map.mkpcap.com/api/v1/portfolios/indicatives`, payload)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

}
