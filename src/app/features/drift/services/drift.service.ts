import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { EMPTY, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import * as fromModels from './../models/drift.models';

@Injectable()
export class DriftService {

    constructor(public client: HttpClient) { }

    public getPositionsDrift(payload: fromModels.PositionsDriftRequest): Observable<any> {
        const asOfDate = payload.asOfDate.toLocaleDateString().replace(/\//g, '-');
        const frequency = `${payload.useDailyDrift}`;
        return this.client
            .get<any>(`http://prizm-map.mkpcap.com/api/v1/position/drift_new/${asOfDate}/${frequency}`)
            .pipe(catchError((err: HttpErrorResponse) => {
                return throwError((err.error.message));
            }));
    }

    public getPositionDrift(payload: fromModels.PositionDriftRequest): Observable<any[]> {
        const asOfDate = payload.asOfDate.toLocaleDateString().replace(/\//g, '-');
        return this.client
            .get<any[]>(`http://prizm-map.mkpcap.com/api/v1/position/drift/${asOfDate}/${payload.tid}/${payload.sid}`)
            .pipe(catchError((err: HttpErrorResponse) => {
                return throwError((err.error.message));
            }));
    }

    public loadPnl(payload: fromModels.PnlLoadRequest): Observable<any[]> {
        const asOfDate = payload.asOfDate.toLocaleDateString().replace(/\//g, '-');
        return this.client
            .get<any[]>(`http://prizm-map.mkpcap.com/api/v1/position/drift/pnl/${asOfDate}/${payload.tid}/${payload.sid}`)
            .pipe(catchError((err: HttpErrorResponse) => {
                return throwError((err.error.message));
            }));
    }
}
