import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, empty, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import * as moment from 'moment';

import * as fromModels from '../models/order-book.models';
import { IMarketData } from '../../security-editor/models';

@Injectable()
export class OrderBookService {

    constructor(private http: HttpClient) { }

    loadLookups(): Observable<any> {
        return this.http
            .get<any>(`http://prizm-map.mkpcap.com/api/v1/orderbook/lookups`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    loadOrdersByDateRange(payload: fromModels.IOrderBookParams): Observable<fromModels.IOrder[]> {
        const startDate = moment(payload.startDate).format('MM-DD-YYYY');
        const endDate = moment(payload.endDate).format('MM-DD-YYYY');
        return this.http
            .post<fromModels.IOrder[]>(`http://prizm-map.mkpcap.com/api/v1/orderbook/orders`, {startDate: startDate, endDate: endDate})
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    loadOrderHistory(orderId: number): Observable<fromModels.IOrderHistory[]> {
        return this.http
            .get<fromModels.IOrderHistory[]>(`http://prizm-map.mkpcap.com/api/v1/orderbook/orders/${orderId}/history`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    loadOrderNotes(orderId: number): Observable<fromModels.IOrderHistory[]> {
        return this.http
            .get<fromModels.IOrderHistory[]>(`http://prizm-map.mkpcap.com/api/v1/orderbook/${orderId}/notes`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    lockOrder(payload: fromModels.ILockOrderReq): Observable<any> {
        return this.http
            .post<any>(`http://prizm-map.mkpcap.com/api/v1/orderbook/orders/lock_update`, payload)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    saveOrder(payload: fromModels.ISaveOrderReq): Observable<any> {
        return this.http
            .post<any>(`http://prizm-map.mkpcap.com/api/v1/orderbook/orders/save`, payload)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }


    sendEmail(payload: fromModels.ISendEmailReq): Observable<any> {
        return this.http
            .post<any>(`http://prizm-map.mkpcap.com/api/v1/orderbook/orders/email`, payload)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }


    loadSecurityMarketData(sid: number): Observable<IMarketData[]> {
        return this.http
            .get<IMarketData[]>(`http://prizm-map.mkpcap.com/api/v1/masterdata/securities/${sid}/marketdata`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    loadMarketDataPoints(mdid: number): Observable<any> {
        return this.http
            .get<any>(`http://prizm-map.mkpcap.com/api/v1/masterdata/marketdata/${mdid}`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));

    }

}
