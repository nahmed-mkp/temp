import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';

import * as fromModels from './../models/drawdown.models';

@Injectable()
export class DrawdownService {

    constructor(private http: HttpClient) {}

    getDrawdownSecurityList(): Observable<fromModels.DrawDownSecurity[]>{
        return this.http
            .get<fromModels.DrawDownSecurity[]>('http://prizm-map.mkpcap.com/api/v1/drawdown/security_list')
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.message)));
    }

    getDrawdownAnalysis(payload: fromModels.DrawDownAnalysisRequestWithID): Observable<{id: string; payload: fromModels.DrawDownAnalysisResponse[]}> {
        return this.http
            .post<{id: string; payload: fromModels.DrawDownAnalysisResponse[]}>('http://prizm-map.mkpcap.com/api/v1/drawdown/analysis', payload)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.message)));
    }

    getDrawdownTimeseries(payload: fromModels.DrawDownAnalysisRequestWithID): Observable<{id: string; payload: fromModels.DrawDownTimeSeriesResponse[]}> {
        return this.http
            .get<{id: string; payload: fromModels.DrawDownTimeSeriesResponse[]}>(`http://prizm-map.mkpcap.com/api/v1/drawdown/timeseries/${payload.sec_id}/${payload.start_date}/${payload.end_date}?id=${payload.id}`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.message)));
    }
}