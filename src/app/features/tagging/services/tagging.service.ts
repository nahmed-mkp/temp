import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import * as fromModels from './../models/tagging.models';

@Injectable()
export class TaggingService {

    constructor(private http: HttpClient) { }

    getTagsList(): Observable<any> {
        return this.http
            .get<any>('http://prizm-map.mkpcap.com/api/v1/tagging')
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    getLookupValues(): Observable<any> {
        return this.http
            .get<any>('http://prizm-map.mkpcap.com/api/v1/tagging/lookups')
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    /**
    * Security Tags
    */
    loadSecurityTags(payload: fromModels.IDateRange): Observable<any[]> {
        return this.http
            .post<any[]>(`http://prizm-map.mkpcap.com/api/v1/tagging/tags/securities`, payload)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    updateSecurityTags(payload: fromModels.ISecurityTagChanges): Observable<any[]> {
        return this.http
            .put<any[]>(`http://prizm-map.mkpcap.com/api/v1/tagging/tags/securities`, payload)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    /**
     * TradeName Tags
     */
    loadTradeNameTags(payload: fromModels.IDateRange): Observable<any[]> {
        return this.http
            .post<any[]>(`http://prizm-map.mkpcap.com/api/v1/tagging/tags/tradenames`, payload)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    updateTradeNameTags(payload: fromModels.ITradeNameTagChanges): Observable<any[]> {
        return this.http
            .put<any[]>(`http://prizm-map.mkpcap.com/api/v1/tagging/tags/tradenames`, [payload])
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    /**
     * Position Tags
     */
    loadPositionTags(payload: fromModels.IDateRange): Observable<any[]> {
        return this.http
            .post<any[]>(`http://prizm-map.mkpcap.com/api/v1/tagging/tags/positions`, payload)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    updatePositionTags(payload: fromModels.IPositionTagChangesAdvance[]): Observable<any[]> {
        return this.http
            .put<any[]>(`http://prizm-map.mkpcap.com/api/v1/tagging/tags/positions`, payload)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }
}
