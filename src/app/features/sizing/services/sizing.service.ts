import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, empty, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import * as fromModels from './../models/sizing.models';

@Injectable()
export class SizingService {

    constructor(private http: HttpClient) {}

    getSizingSheetItems(): Observable<fromModels.SizingResponse> {
        return this.http
            .get<fromModels.SizingResponse>('http://prizm-map.mkpcap.com/api/v1/sizing/latest')
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    refreshSizingSheetItems(): Observable<fromModels.SizingResponse> {
        return this.http
            .post<fromModels.SizingResponse>('http://prizm-map.mkpcap.com/api/v1/sizing/latest', null)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    getSizingCapitals(): Observable<fromModels.SizingCapital[]> {
        return this.http
            .get<fromModels.SizingCapital[]>('http://prizm-map.mkpcap.com/api/v1/sizing/capital')
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    loadSecurities(): Observable<fromModels.SizingSecurity[]> {
        return this.http
            .get<fromModels.SizingSecurity[]>('http://prizm-map.mkpcap.com/api/v1/sizing/securities')
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    addSecurity(payload: fromModels.SizingSecurity): Observable<fromModels.SizingSecurity[]> {
        const payloadFormatted = JSON.parse(JSON.stringify(payload));
        delete payloadFormatted['origValue'];
        delete payloadFormatted['status'];
        delete payloadFormatted['marketDataType'];
        delete payloadFormatted['securityName'];
        return this.http
            .post<fromModels.SizingSecurity[]>('http://prizm-map.mkpcap.com/api/v1/sizing/securities', payloadFormatted)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    updateSecurity(payload: fromModels.SizingSecurity): Observable<fromModels.SizingSecurity[]> {
        const payloadFormatted = JSON.parse(JSON.stringify(payload));
        delete payloadFormatted['origValue'];
        delete payloadFormatted['status'];
        delete payloadFormatted['marketDataType'];
        delete payloadFormatted['securityName'];
        if (payloadFormatted['mdid2'] === null || payloadFormatted['mdid2'] === undefined) {
            delete payloadFormatted['mdid2'];
        }
        return this.http
            .put<fromModels.SizingSecurity[]>(`http://prizm-map.mkpcap.com/api/v1/sizing/securities/${payload.id}`, payloadFormatted)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    deleteSecurity(payload: fromModels.SizingSecurity): Observable<fromModels.SizingSecurity[]> {
        return this.http
            .delete<fromModels.SizingSecurity[]>(`http://prizm-map.mkpcap.com/api/v1/sizing/securities/${payload.id}`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }    

    getDefaultCapitals(): Observable<fromModels.DefaultSizingCapital[]> {
        return this.http
            .get<fromModels.DefaultSizingCapital[]>('http://prizm-map.mkpcap.com/api/v1/sizing/capitals')
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));                
    }

    addDefaultCapital(payload: fromModels.DefaultSizingCapital): Observable<fromModels.DefaultSizingCapital[]> {
        return this.http
            .post<fromModels.DefaultSizingCapital[]>('http://prizm-map.mkpcap.com/api/v1/sizing/capitals', payload)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    updateDefaultCapital(payload: fromModels.DefaultSizingCapital): Observable<fromModels.DefaultSizingCapital[]> {
        return this.http
            .put<fromModels.DefaultSizingCapital[]>(`http://prizm-map.mkpcap.com/api/v1/sizing/capitals/${payload.NTName}`, payload)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    deleteDefaultCapital(payload: fromModels.DefaultSizingCapital): Observable<fromModels.DefaultSizingCapital[]> {
        return this.http
            .delete<fromModels.DefaultSizingCapital[]>(`http://prizm-map.mkpcap.com/api/v1/sizing/capitals/${payload.NTName}`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }
}
