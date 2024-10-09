import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, empty, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import * as fromModels from '../models/tradename.models';

@Injectable()
export class TradeNameService {

    constructor(private http: HttpClient) { }

    loadPMPodDetails(): Observable<any[]> {
        return this.http
            .get<any[]>(`http://prizm-map.mkpcap.com/api/v1/allocations/tradenames`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    loadClientServicesThemes(): Observable<any>{
        return this.http
            .get<any[]>('http://prizm-map.mkpcap.com/api/v1/allocations/tradenames/client-services-trade-themes')
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)))
    }

    createTradeName(payload: any): Observable<fromModels.ITradeNameCreateResult> {
        return this.http
            .post<fromModels.ITradeNameCreateResult>(`http://prizm-map.mkpcap.com/api/v1/allocations/tradenames`, payload)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    loadMultiAllocTradeNames(): Observable<fromModels.IMultiAllocTradeName[]> {
        return this.http
            .get<fromModels.IMultiAllocTradeName[]>(`http://prizm-map.mkpcap.com/api/v1/allocations/tradenames/multiple`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    loadMultiAllocTradeNameSplit(payload: fromModels.IMultiAllocTradeName): Observable<fromModels.IMultiAllocationSplit[]> {
        return this.http
            .get<fromModels.IMultiAllocationSplit[]>(`http://prizm-map.mkpcap.com/api/v1/allocations/tradenames/multiple/${payload.tradeID}`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    createMultiAllocTradeNameSplit(payload: fromModels.INewOrUpdateMultiAllocTradeName): Observable<any> {
        return this.http
            .post<fromModels.IMultiAllocationSplit[]>(`http://prizm-map.mkpcap.com/api/v1/allocations/tradenames/multiple`, payload)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    updateMultiAllocTradeNameSplit(payload: fromModels.INewOrUpdateMultiAllocTradeName): Observable<any> {
        return this.http
            .put<fromModels.IMultiAllocationSplit[]>(`http://prizm-map.mkpcap.com/api/v1/allocations/tradenames/multiple/${payload.tradeID}`, payload)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }    
}
