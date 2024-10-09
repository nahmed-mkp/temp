import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, empty, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import * as fromModels from '../models/trades.models';

@Injectable()
export class BenchmarkTradesService {

    constructor(private http: HttpClient) { }

    loadTradeDates(): Observable<string[]> {
        return this.http
            .get<string[]>('http://prizm-map.mkpcap.com/api/v1/bip/dates')
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    loadFXTrades(payload: string): Observable<fromModels.IFXTrade[]> {
        return this.http
            .get<fromModels.IFXTrade[]>(`http://prizm-map.mkpcap.com/api/v1/bip/fxtrades/${payload}`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    sendFXTradesToCRD(payload: string): Observable<fromModels.IFXTrade[]> {
        console.log('book trade ids', payload);
        return this.http
            .post<fromModels.IFXTrade[]>('http://prizm-map.mkpcap.com/api/v1/bip/fxtrades/book', {'ids': payload})
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }
}
