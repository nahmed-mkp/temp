import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { EMPTY, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import * as fromModels from './../models/position.models';
import moment from 'moment';

@Injectable()
export class SimulationService {

    constructor(public client: HttpClient) { }

    public loadDailySimulations(payload: fromModels.DataPath): Observable<string> {
        let url = `http://prizm-map.mkpcap.com/api/v1/position/simulations/${payload.grouping}/daily/${payload.key}`;
        if(payload.date){
            let formattedDate = moment(payload.date).format('MM-DD-YYYY');
            url += `/${formattedDate}`
        }
        return this.client
            .get<string>(url)
            .pipe(catchError((err: HttpErrorResponse) => {
                return throwError((err.error.message));
            }));
    }

    public loadMonthlySimulations(payload: fromModels.DataPath): Observable<string> {
        let url = `http://prizm-map.mkpcap.com/api/v1/position/simulations/${payload.grouping}/monthly/${payload.key}`;
        if(payload.date)
            url += `/${payload.date}`
        return this.client
            .get<string>(url)
            .pipe(catchError((err: HttpErrorResponse) => {
                return throwError((err.error.message));
            }));
    }

    public loadQuarterlySimulations(payload: fromModels.DataPath): Observable<string> {
        let url = `http://prizm-map.mkpcap.com/api/v1/position/simulations/${payload.grouping}/quarterly/${payload.key}`;
        if(payload.date)
            url += `/${payload.date}`
        return this.client
            .get<string>(url)
            .pipe(catchError((err: HttpErrorResponse) => {
                return throwError((err.error.message));
            }));
    }
}
