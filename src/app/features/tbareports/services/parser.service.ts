import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
// import 'rxjs/add/observable/throw';
// import 'rxjs/add/observable/throw';

import * as moment from 'moment';

import * as fromModels from '../models';

@Injectable()
export class ParserService {

    public constructor(private http: HttpClient) {}

    getMissingDates(): Observable<fromModels.MissingDate[]> {
        return this.http
            .get<any[]>(`http://prizm-map.mkpcap.com/api/v1/parsers/tba/missing`)
            .pipe(catchError((error: HttpErrorResponse) => {
                return throwError(error.error.message);
            }));
    }

    getResultsFromCache(cacheKey: string): Observable<fromModels.ParserResult> {
        return this.http
            .get<any>(`http://prizm-map.mkpcap.com/api/v1/parsers/tba/validate/${cacheKey}`)
            .pipe(catchError((error: HttpErrorResponse) => {
                return throwError(error.error.message);
            }));
    }

    saveResultsFromCache(cacheKey: string): Observable<fromModels.ParserResult> {
        return this.http
            .post<any>(`http://prizm-map.mkpcap.com/api/v1/parsers/tba/save/${cacheKey}`, null)
            .pipe(catchError((error: HttpErrorResponse) => {
                return throwError(error.error.message);
            }));
    }
}
