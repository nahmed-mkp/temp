import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, EMPTY, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import * as fromModels from '../models';

@Injectable()
export class FXOptionsGridService {
    constructor(private http: HttpClient) { }

    loadLatest(): Observable<any> {
        return this.http
            .get<any[]>(`/pricing/api/v1/monitors/fxoptions`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    loadAsOfDate(asOfDate: string): Observable<any> {
        return this.http
            .get<any[]>(`/pricing/api/v1/monitors/fxoptions/${asOfDate}`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

}
