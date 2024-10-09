import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import * as fromModels from '../models/chart.models';

@Injectable()
export class ResearchChartService {

    constructor(private http: HttpClient) { }

    loadChartPacks(): Observable<fromModels.IChartPack[]> {
        return this.http
            .get<fromModels.IChartPack[]>(`http://prizm-map.mkpcap.com/api/v1/research_charts`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    loadChartPack(feature: string): Observable<fromModels.ISubChart[]> {
        return this.http
            .get<fromModels.ISubChart[]>(`http://prizm-map.mkpcap.com/api/v1/research_charts/${feature}`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

}