import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, empty, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import * as fromModels from './../models/sec-master.models';


@Injectable()
export class SecMasterService {

    constructor(private http: HttpClient) { }

    searchSecurities(searchCriteria: fromModels.ISecMasterSearch): Observable<any[]> {
        return this.http
            .post<any[]>(`http://prizm-map.mkpcap.com/api/v1/masterdata/securities/search`, searchCriteria)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    loadRecentSecurities(): Observable<any[]> {
        return this.http
            .get<any[]>(`http://prizm-map.mkpcap.com/api/v1/masterdata/securities`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    loadSecurityTags(): Observable<fromModels.ISecurityTag[]> {
        return this.http
            .get<fromModels.ISecurityTag[]>(`http://prizm-map.mkpcap.com/api/v1/masterdata/securitytags`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    updateSecurityTag(payload: fromModels.ISecurityTagUpdateReq): Observable<any> {
        return this.http
            .put<any>(`http://prizm-map.mkpcap.com/api/v1/masterdata/securitytags`, payload)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    loadSecurity(sid: number): Observable<fromModels.ISecurity> {
        return this.http
            .get<fromModels.ISecurity>(`http://prizm-map.mkpcap.com/api/v1/masterdata/securities/${sid}`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    loadSecurityMarketData(sid: number): Observable<fromModels.IMarketData[]> {
        return this.http
            .get<fromModels.IMarketData[]>(`http://prizm-map.mkpcap.com/api/v1/masterdata/securities/${sid}/marketdata`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    saveSecurity(payload: fromModels.ISecurity): Observable<fromModels.ISecurity> {
        return this.http
            .post<fromModels.ISecurity>(`http://prizm-map.mkpcap.com/api/v1/masterdata/securities`, payload)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    loadMarketDataPoints(mdid: number): Observable<any> {
        return this.http
            .get<any>(`http://prizm-map.mkpcap.com/api/v1/masterdata/marketdata/${mdid}`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));

    }
}
