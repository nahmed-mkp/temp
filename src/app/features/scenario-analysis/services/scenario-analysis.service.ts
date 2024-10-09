import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, empty, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as fromModels from '../models';

@Injectable()
export class ScenarioAnalysisService {

    constructor(private http: HttpClient) { }

    loadImportableScenarios(): Observable<any> {
        return this.http
            .get('http://prizm-map.mkpcap.com/api/v1/scenarios')
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    saveScenario(config: fromModels.IScenario): Observable<any> {
        return this.http
            .post('http://prizm-map.mkpcap.com/api/v1/scenarios', config)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)))
    }

    loadScenarioByConfigGuid(guid: string): Observable<any> {
        return this.http
            .get(`http://prizm-map.mkpcap.com/api/v1/scenarios/config/${guid}`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    loadPositionsLiteData(asOfDate: string) {
        return this.http
        .post<any>('api/v1/position/positions_lite', {asOfDate: asOfDate})
        .pipe(catchError( (err: HttpErrorResponse) => Observable.throw(err.error.message)))
    }

    loadPositionGrouping(payload: string): Observable<any> {
        return this.http
        .post<any>(`http://prizm-map.mkpcap.com/api/v1/position/groupings`, {asOfDate: payload})
        .pipe(catchError((err: HttpErrorResponse) => Observable.throw(err.error.message)));
    }

    getSIDSuggestions(sid: string): Observable<any> {
        return this.http
        .post(`http://prizm-map.mkpcap.com/api/v1/scenarios/sid-input`, {userInput: sid})
        .pipe(catchError((err: HttpErrorResponse) => Observable.throw(err.error.message)));
    }
}


