import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, empty, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import * as fromModels from './../models/futures-root.models';


@Injectable()
export class FuturesRootService {

    constructor(private http: HttpClient) { }

    loadFuturesRoots(): Observable<fromModels.IFutureRoot[]> {
        return this.http
            .get<fromModels.IFutureRoot[]>(`http://prizm-map.mkpcap.com/api/v1/secmaster/futures/roots`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    loadFuturesRoot(futuresId: number): Observable<fromModels.IFutureRoot> {
        return this.http
            .get<fromModels.IFutureRoot>(`http://prizm-map.mkpcap.com/api/v1/secmaster/futures/roots/${futuresId}`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    addFuturesRoot(futures: fromModels.IFutureRoot): Observable<fromModels.IFutureRoot> {
        return this.http
            .post<fromModels.IFutureRoot>(`http://prizm-map.mkpcap.com/api/v1/secmaster/futures/roots`, futures)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    updateFuturesRoot(futures: fromModels.IFutureRoot): Observable<fromModels.IFutureRoot> {
        return this.http
            .put<fromModels.IFutureRoot>(`http://prizm-map.mkpcap.com/api/v1/secmaster/futures/roots/${futures.futures_id}`, futures)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    deleteFuturesRoot(futures: fromModels.IFutureRoot): Observable<fromModels.IFutureRoot> {
        return this.http
            .delete<fromModels.IFutureRoot>(`http://prizm-map.mkpcap.com/api/v1/secmaster/futures/roots/${futures.futures_id}`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }
}
