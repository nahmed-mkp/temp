import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import * as fromModels from '../models/factor-exposure.models';

@Injectable()
export class FactorExposureService {

    constructor(private client: HttpClient) {}

    checkAccessLevel(): Observable<boolean | string>{
        return this.client
            .get<boolean>('api/v1/factors/checkPrivilegedAccess')
            .pipe(catchError((err: HttpErrorResponse) => Observable.throw(err.error.message)));
    }

    loadDropdownDates(): Observable<string[]> {
        return this.client
            .get<string[]>('http://prizm-map.mkpcap.com/api/v1/factors/dates')
            .pipe(catchError((err: HttpErrorResponse) => Observable.throw(err.error.message)));
    }

    loadDropdownGroupings(): Observable<any> {
        return this.client
            .get<any>(`http://prizm-map.mkpcap.com/api/v1/factors/groupings`)
            .pipe(catchError((err: HttpErrorResponse) => Observable.throw(err.error.message)));
    }

    loadGroupingsByDate(as_of_date: any): Observable<any> {
        return this.client
        .get<any>(`api/v1/factors/groupings/${as_of_date}` )
        .pipe(catchError( (err: HttpErrorResponse) => Observable.throw(err.error.message)))
    }

    loadFactorsTabGridData(as_of_date: string): Observable<any> {
        return this.client
        .get<any>(`api/v1/factors/${as_of_date}` )
        .pipe(catchError( (err: HttpErrorResponse) => Observable.throw(err.error.message)))
    }
 
    loadGroupingTabGridData(payload: fromModels.IFactorExposureParams): Observable<any> {
        return this.client
        .get<any>(`api/v1/factors/exposures/${payload.activeDate}/${payload.activeGrouping}`)
        .pipe(catchError( (err: HttpErrorResponse) => Observable.throw(err.error.message)))
    }

    loadPositionsLiteData(payload: string) {
        return this.client
        .post<any>('api/v1/position/positions_lite', {asOfDate: payload})
        .pipe(catchError( (err: HttpErrorResponse) => Observable.throw(err.error.message)))
    }

    loadPositionGrouping(payload: string): Observable<any> {
        return this.client
        .post<any>(`http://prizm-map.mkpcap.com/api/v1/position/groupings`, {asOfDate: payload})
        .pipe(catchError((err: HttpErrorResponse) => Observable.throw(err.error.message)));
    }
    loadSettings(): Observable<any> { 
        return this.client
        .get<any>(`api/v1/factors/settings`)
        .pipe(catchError((err: HttpErrorResponse) => Observable.throw(err.error.message)));
    }

    saveSettings(payload: any): Observable<any> {
        return this.client
            .post<any>(`api/v1/factor/settings`, payload)
            .pipe(catchError((err: HttpErrorResponse) => Observable.throw(err.error.message)));
    }

}

