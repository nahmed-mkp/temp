import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { EMPTY, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import * as fromModels from './../models/returns.models';

@Injectable()
export class ReturnsService {

    constructor(public client: HttpClient) { }

    public loadReturns(payload: fromModels.IReturnsRequest): Observable<any[]> {
        return this.client
            .post<any[]>(`http://prizm-map.mkpcap.com/api/v1/position/returns`, payload)
            .pipe(catchError((err: HttpErrorResponse) => {
                return throwError((err.error.message));
            }));
    }

    // public loadCapitals(year: number): Observable<any> {
    //     return this.client
    //         .get<any[]>(`http://prizm-map.mkpcap.com/api/v1/position/capitals/${year}`)
    //         .pipe(catchError((err: HttpErrorResponse) => {
    //             return throwError((err.error.message));
    //         }));
    // }
}
