import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import * as fromModels from './../models/covid.models';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable()
export class CovidService {

    constructor(public http: HttpClient) { }

    getCountries(): Observable<fromModels.ICountry[]> {
        return this.http
            .get<fromModels.ICountry[]>('http://prizm-map.mkpcap.com/api/v1/worldevents/covid/countries')
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    getData(): Observable<fromModels.IRecord> {
        return this.http
            .get<fromModels.IRecord>(`http://prizm-map.mkpcap.com/api/v1/worldevents/covid/data`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    getUSHistory(): Observable<any[]> {
        return this.http
            .get<any[]>(`http://prizm-map.mkpcap.com/api/v1/worldevents/covid/us`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    getUSStatesHistory(): Observable<any[]> {
        return this.http
            .get<any[]>(`http://prizm-map.mkpcap.com/api/v1/worldevents/covid/us/states`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    getMobilityIndexCountries(): Observable<any[]> {
        return this.http
            .get<any[]>(`http://prizm-map.mkpcap.com/api/v1/worldevents/covid/mobility`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    getMobilityIndexSubregions(payload: string): Observable<any[]> {
        return this.http
            .get<any[]>(`http://prizm-map.mkpcap.com/api/v1/worldevents/covid/mobility/${payload}`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

}
