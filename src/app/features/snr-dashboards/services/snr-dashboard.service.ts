import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, empty, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import * as fromModels from '../models';

@Injectable()
export class SNRDashboardService {

    constructor(private http: HttpClient) { }

    loadDatesAndCountries(): Observable<fromModels.IInput> {
        return this.http
            .get<fromModels.IInput>('http://prizm-map.mkpcap.com/api/v1/snr/macro/dashboards')
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    loadMacroRuns(input: fromModels.IMacroRun): Observable<any> {
        return this.http
            .post<any>(`http://prizm-map.mkpcap.com/api/v1/snr/macro/dashboards`, input)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    getChartGroupsByCountry(payload: fromModels.ICountry): Observable<any[]> {
        return this.http
            .get<string[]>(`http://prizm-map.mkpcap.com/api/v1/snr/macro/dashboards/chartgroups2/${payload.code}`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    getChartsByChartGroupAndCountry(input: fromModels.IChartGroupInput): Observable<any> {

        const targetCountry = input.country.code;
        // const chartGroup = 'Growth%3A%20PMI%20data';
        const chartGroup = encodeURIComponent(input.chartGroup);
        const asOfDate = input.asOfDate.split('/').join('-');
        return this.http
            .get<any>(`http://prizm-map.mkpcap.com/api/v1/snr/macro/dashboards/${asOfDate}/${targetCountry}/${chartGroup}`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }
}


