import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, empty, of } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable()
export class MacroInflationService {

    constructor(private http: HttpClient) { }

    loadDates(): Observable<string[]> {
        return this.http
            .get<string[]>(`http://prizm-map.mkpcap.com/api/v1/macro/inflation/dates`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    loadAnalytics(payload: string): Observable<any[]> {
        return this.http
            .get<any[]>(`http://prizm-map.mkpcap.com/api/v1/macro/inflation/${payload}/results`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    loadTimeseries(payload: string): Observable<any> {
        return this.http
            .get<any>(`http://prizm-map.mkpcap.com/api/v1/macro/inflation/${payload}/timeseries`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }
}
