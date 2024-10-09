import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, empty, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import * as fromModel from '../models';

@Injectable()
export class DividendService {

    constructor(private http: HttpClient) { }

    loadDividendInfo(payload): Observable<any[]> {
        return this.http
            .get<any[]>(`http://prizm-map.mkpcap.com/api/v1/secmaster/dividend_info/${payload}`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    loadDividendAllocInfo(): Observable<fromModel.DividendAllocationInfo[]> {
        return this.http
            .get<fromModel.DividendAllocationInfo[]>(`http://prizm-map.mkpcap.com/api/v1/secmaster/dividend_info/dividend_alloc_info`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    updateDividendAllocInfo(payload: fromModel.DividendAllocationInfo): Observable<fromModel.DividendAllocationInfo> {
        return this.http
            .post<fromModel.DividendAllocationInfo>
            (`http://prizm-map.mkpcap.com/api/v1/secmaster/dividend_info/update_dividend_alloc_info/${payload.AsOfDate}/${payload.FundName}/${payload.RCPMFundId}/${payload.OffShorePct}/${payload.WithholdingPct}`, null)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }
}