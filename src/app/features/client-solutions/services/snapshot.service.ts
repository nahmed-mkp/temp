import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

import * as moment from 'moment';

import * as fromModels from '../models';


@Injectable()
export class SnapshotService {
    constructor(private httpClient: HttpClient) { }

    public getMonthEndDates(): Observable<string[]> {
        return this.httpClient
            .get<string[]>(`http://prizm-map.mkpcap.com/api/v1/investor/snaps`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    public getSupportedGroupings(): Observable<string[]> {
        return this.httpClient
            .get<string[]>(`http://prizm-map.mkpcap.com/api/v1/investor/snaps/groupings`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    public getEntitiesNameMap(): Observable<any> {
        return this.httpClient
            .get<string[]>(`http://prizm-map.mkpcap.com/api/v1/investor/snaps/entities`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }


    public getSummaryStats(payload: fromModels.ISnapshotParameter): Observable<any[]> {
        const asOfDate = moment(payload.monthEndDate).format('MM-DD-YYYY');
        return this.httpClient
            .get<any[]>(`http://prizm-map.mkpcap.com/api/v1/investor/snaps/summarystats/${asOfDate}/${payload.fund.code}/${payload.period}`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    public getCorrelationMatrix(payload: fromModels.ISnapshotParameter): Observable<any[]> {
        const asOfDate = moment(payload.monthEndDate).format('MM-DD-YYYY');
        return this.httpClient
            .get<any[]>(`http://prizm-map.mkpcap.com/api/v1/investor/snaps/correl/${asOfDate}/${payload.fund.code}/${payload.period}`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    public getSnapshotData(payload: fromModels.ISnapshotParameter): Observable<any> {
        const asOfDate = moment(payload.monthEndDate).format('MM-DD-YYYY');
        return this.httpClient
            .get<any>(`http://prizm-map.mkpcap.com/api/v1/investor/snaps/${asOfDate}/${payload.fund.code}/${payload.grouping}`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }
}
