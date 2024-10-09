import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, empty, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import * as fromModels from './../models/market-data.models';


@Injectable()
export class MarketDataService {

    constructor(private http: HttpClient) { }

    searchMarketData(searchCriteria: fromModels.IMarketDataSearch): Observable<any[]> {
        return this.http
            .post<any[]>(`http://prizm-map.mkpcap.com/api/v1/data/marketdata/search`, searchCriteria)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }







    backfillMarketData(backfillRequest: fromModels.IMarketDataBackfill): Observable<any[]> {

        const formatPayload: any = {
            mdid: backfillRequest.mdid,
            from_date: backfillRequest.fromDate.toISOString().split('T')[0],
            to_date: backfillRequest.toDate.toISOString().split('T')[0],
        };

        return this.http
            .post<any[]>(`http://prizm-map.mkpcap.com/api/v1/masterdata/marketdata/back_fill_market_data`, formatPayload)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    loadMarketDataDetail(payload: fromModels.IMarketDataDetailReq): Observable<any[]> {
        return this.http
            .post<any[]>(`http://prizm-map.mkpcap.com/api/v1/masterdata/marketdata/marketdata_detail`, payload)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    loadMarketDataPriceSource(): Observable<any[]> {
        return this.http
            .get<any[]>(`http://prizm-map.mkpcap.com/api/v1/masterdata/marketdata/marketdata_price_source`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    loadMarketDataType(sid: number): Observable<any[]> {
        return this.http
            .get<any[]>(`http://prizm-map.mkpcap.com/api/v1/masterdata/marketdata/marketdata_type${sid}`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    loadMarketDataTimeseries(mdid: number): Observable<any[]> {
        return this.http
            .get<any[]>(`http://prizm-map.mkpcap.com/api/v1/masterdata/marketdata/${mdid}`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }
}
