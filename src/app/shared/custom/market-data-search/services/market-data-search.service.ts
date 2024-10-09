import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import * as fromModels from '../models';

@Injectable()
export class MarketDataSearchService {

    constructor(public client: HttpClient) { }

    public loadProviders(): Observable<fromModels.MarketDataProvider[]> {
        return this.client
            .get<fromModels.MarketDataProvider[]>(`api/v1/marketdata`)
            .pipe(catchError((err: HttpErrorResponse) => {
                return throwError(err.error.message);
            }));
    }

    public searchMarketData(payload: fromModels.MarketDataSearchCriteria): Observable<fromModels.MarketDataSearchResult[]> {
        return this.client
            .post<fromModels.MarketDataSearchResult[]>(`api/v1/marketdata/search`, payload)
            .pipe(catchError((err: HttpErrorResponse) => {
                return throwError(err.error.message);
            }));
    }

    public searchMarketDataForTimeseriesExporter(payload: fromModels.MarketDataSearchCriteriaForTimeseriesExporter): Observable<fromModels.MarketDataForTimeseriesExporter[]> {
        return this.client
            .post<fromModels.MarketDataForTimeseriesExporter[]>(`api/v1/search/marketdata`, payload)
            .pipe(catchError((err: HttpErrorResponse) => {
                return throwError(err.error.message);
            }));
    }

    public searchSecurityForTimeseriesExporter(payload: fromModels.SecuritySearchCriteriaForTimeseriesExporter): Observable<fromModels.SecurityForTimeseriesExporter[]> {
        return this.client
            .post<fromModels.SecurityForTimeseriesExporter[]>(`api/v1/search/security`, payload)
            .pipe(catchError((err: HttpErrorResponse) => {
                return throwError(err.error.message);
            }));
    }

    public searchSecurity(payload: fromModels.SecuritySearchCriteria): Observable<fromModels.SecuritySearchResult[]> {
        return this.client
            .post<fromModels.SecuritySearchResult[]>(`api/v1/search/security/details`, payload)
            .pipe(catchError((err: HttpErrorResponse) => {
                return throwError(err.error.message);
            }));
    }

    public getMarketDataForSID(sid: number): Observable<fromModels.MarketDataForTimeseriesExporter[]> {
        return this.client
            .get<fromModels.MarketDataForTimeseriesExporter[]>(`api/v1/search/security/${sid}`)
            .pipe(catchError((err: HttpErrorResponse) => {
                return throwError(err.error.message);
            }));
    }

    /// ---------------------------------------------------------------------------

    public searchSecuritiesGeneral(payload: fromModels.ISecuritySearch): Observable<any[]> {
        return this.client
            .post<any[]>(`http://prizm-map.mkpcap.com/api/v1/timeseries_exporter/security`, payload)
            .pipe(catchError((err: HttpErrorResponse) => {
                return throwError(err.error.message);
            }));
    }

    public loadMarketDataTypesGeneral(payload: number): Observable<any[]> {
        return this.client
            .post<any[]>(`api/v1/timeseries_exporter/marketdata`, {'sid': payload })
            .pipe(catchError((err: HttpErrorResponse) => {
                return throwError(err.error.message);
            }));
    }
}
