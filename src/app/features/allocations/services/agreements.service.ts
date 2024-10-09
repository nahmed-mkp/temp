import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, empty, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import * as fromModels from '../models/agreements.models';

@Injectable()
export class TradeAgreementsService {

    constructor(private http: HttpClient) { }

    getTradeAgreementTypes(): Observable<fromModels.ITradeAgreementType[]> {
        return this.http
            .get<fromModels.ITradeAgreementType[]>(`http://prizm-map.mkpcap.com/api/v1/allocations/agreements/types`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    getTradeAgreements(): Observable<fromModels.ITradeAgreement[]> {
        return this.http
            .get<fromModels.ITradeAgreement[]>(`http://prizm-map.mkpcap.com/api/v1/allocations/agreements`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    getTradeAgreementAllocationCache(): Observable<fromModels.ITradeAgreementAllocationCache[]> {
        return this.http
            .get<fromModels.ITradeAgreementAllocationCache[]>(`http://prizm-map.mkpcap.com/api/v1/allocations/cache`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    updateTradeAgreementAllocationCache(): Observable<any> {
        return this.http
            .post<any>(`http://prizm-map.mkpcap.com/api/v1/allocations/cache`, {})
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    getTradeAgreementSecTypes(): Observable<fromModels.ITradeAgreementSecType[]> {
        return this.http
            .get<fromModels.ITradeAgreement[]>(`http://prizm-map.mkpcap.com/api/v1/allocations/agreements/sectypes`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    addTradeAgreement(payload: fromModels.ITradeAgreement): Observable<fromModels.ITradeAgreement> {
        return this.http
            .post<fromModels.ITradeAgreement>(`http://prizm-map.mkpcap.com/api/v1/allocations/agreements`, payload)
            .pipe(catchError((err: HttpErrorResponse) => throwError(`Status ${err.status}: ` + err.message)));
    }

    updateTradeAgreement(payload: fromModels.ITradeAgreement): Observable<fromModels.ITradeAgreement[]> {
        return this.http
            .put<fromModels.ITradeAgreement[]>(`http://prizm-map.mkpcap.com/api/v1/allocations/agreements/${payload.id}`, payload)
            .pipe(catchError((err: HttpErrorResponse) => throwError(`Status ${err.status}: ` + err.message)));
    }

    deleteTradeAgreement(payload: fromModels.ITradeAgreement): Observable<fromModels.ITradeAgreement> {
        return this.http
            .delete<fromModels.ITradeAgreement>(`http://prizm-map.mkpcap.com/api/v1/allocations/agreements/${payload.id}`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(`Status ${err.status}: ` + err.message)));
    }
}
