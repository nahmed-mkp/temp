import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, empty, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import * as fromModels from '../models';

@Injectable()
export class ConsensusEconomicsService {

    constructor(private http: HttpClient) { }

    loadExtractionDates(): Observable<string[]> {
        return this.http
            .get<string[]>('http://prizm-map.mkpcap.com/api/v1/bip/dates')
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    loadAnnualExtractions(payload: fromModels.IExtractionRequest): Observable<fromModels.IExtractionDataAnnual[]> {
        return this.http
            .get<fromModels.IExtractionDataAnnual[]>('http://prizm-map.mkpcap.com/api/v1/bip/dates')
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    loadQuarterlyExtractions(payload: fromModels.IExtractionRequest): Observable<fromModels.IExtractionDataQuarterly[]> {
        return this.http
            .get<fromModels.IExtractionDataQuarterly[]>(`http://prizm-map.mkpcap.com/api/v1/bip/dates/${payload}`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    loadConstituentDates(): Observable<string[]> {
        return this.http
            .get<string[]>('http://prizm-map.mkpcap.com/api/v1/bip/dates')
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }


    loadAnnualConstituents(payload: fromModels.IConstituentRequest): Observable<fromModels.IConstituentDataAnnual[]> {
        return this.http
            .get<fromModels.IConstituentDataAnnual[]>(`http://prizm-map.mkpcap.com/api/v1/bip/dates/${payload}`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    loadQuarterlyConstituents(payload: fromModels.IConstituentRequest): Observable<fromModels.IConstituentDataQuarterly[]> {
        return this.http
            .get<fromModels.IConstituentDataQuarterly[]>('http://prizm-map.mkpcap.com/api/v1/bip/dates')
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }
}
