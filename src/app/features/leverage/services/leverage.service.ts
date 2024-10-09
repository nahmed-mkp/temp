import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import * as fromModels from './../models/leverage.models';

@Injectable()
export class LeverageService {

    constructor(public client: HttpClient) { }

    public loadSupportedDates(): Observable<string[]> {
        return this.client
            .get<string[]>(`http://prizm-map.mkpcap.com/api/v1/position/leverage/dates`)
            .pipe(catchError((err: HttpErrorResponse) => {
                return throwError((err.error.message));
            }));
    }

    public loadSupportedGroupings(): Observable<string[]> {
        return this.client
            .get<string[]>(`http://prizm-map.mkpcap.com/api/v1/position/leverage/groupings`)
            .pipe(catchError((err: HttpErrorResponse) => {
                return throwError((err.error.message));
            }));
    }

    public loadLeverage(payload: fromModels.LeverageRequest): Observable<string[]> {
        return this.client
            .post<any>(`http://prizm-map.mkpcap.com/api/v1/position/leverage`, payload)
            .pipe(catchError((err: HttpErrorResponse) => {
                return throwError((err.error.message));
            }));
    }
}
