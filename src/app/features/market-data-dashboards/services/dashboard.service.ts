import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, empty, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BondChartRequestRow } from '../models';

@Injectable()
export class MarketDataDashboardService {

    constructor(private http: HttpClient) { }

    public loadMetaData(): Observable<any[]> {
        return this.http
            .get<any[]>(`http://prizm-map.mkpcap.com/api/v1/dashboards`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    public loadDashboardData(dashboardName: string): Observable<any[]> {
        return this.http
            .get<any[]>(`http://prizm-map.mkpcap.com/api/v1/dashboards/${dashboardName}`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    public loadChartData(payload: any){
        return this.http
            .post<any[]>('http://prizm-map.mkpcap.com/api/v1/dashboards/market_data', payload['payload'])
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    public loadChartSpreadData(payload: any){
        return this.http
            .post<any[]>('http://prizm-map.mkpcap.com/api/v1/dashboards/market_data_spread', payload['payload'])
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }
}
