import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import * as fromModels from './../models';

@Injectable()
export class TradeNameHelperService {

    constructor(private http: HttpClient) { }

    loadAllTradeNames(): Observable<fromModels.ITradeName[]> {
        return this.http
            .get<fromModels.ITradeName[]>('http://prizm-map.mkpcap.com/api/v1/tradenames/')
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    loadTaxlots(): Observable<fromModels.ITaxLot[]> {
        return this.http
            .get<fromModels.ITaxLot[]>('http://prizm-map.mkpcap.com/api/v1/tradenames/taxlots')
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    loadTradeNameCounters(): Observable<fromModels.ITradeNameCounter[]> {
        return this.http
            .get<fromModels.ITradeNameCounter[]>('http://prizm-map.mkpcap.com/api/v1/tradenames/counters')
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    updateTradeName(tradeName: fromModels.ITradeName): Observable<fromModels.ITradeName[]> {
        return this.http
            .post<fromModels.ITradeName[]>(`http://prizm-map.mkpcap.com/api/v1/tradenames/rename/${tradeName.TradeID}`, {'oldTradeName': tradeName.TradeName,
                'newTradeName': tradeName.NewTradeName})
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    reinstateTradeName(tradeName: fromModels.ITradeName): Observable<fromModels.ITradeName[]> {
        return this.http
            .post<fromModels.ITradeName[]>(`http://prizm-map.mkpcap.com/api/v1/tradenames/reinstate/${tradeName.TradeID}`, {'tradeName': tradeName.TradeName})
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

}
