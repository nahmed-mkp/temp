import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, empty, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

// import * as fromModels from '../models';


@Injectable()
export class CalculatorService {

    constructor(private http: HttpClient) { }

    /**
     * FX Option
     */
    priceFXOption(): Observable<any> {
        return this.http
            .get(`/pricing/api/v1/pricing/options/fx`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    submitFXParams(params): Observable<any> {
        return this.http
        .post('/pricing/api/v1/pricing/options/fx', params)
        .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }
}
