import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, empty, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import * as fromModels from '../models/capitals.models';

@Injectable()
export class TradeNameAllocationService {

    constructor(private http: HttpClient) { }

   loadTradeNameAllocations(payload: string): Observable<any[]> {
        return this.http
            .post<any[]>(`http://prizm-map.mkpcap.com/api/v1/allocations/rebalance`, {'asOfDate': payload })
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    saveTradeNameAllocations(payload: any[]): Observable<any[]> {
        return this.http
            .post<any[]>(`http://prizm-map.mkpcap.com/api/v1/allocations/rebalance/save`, payload)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }
}
