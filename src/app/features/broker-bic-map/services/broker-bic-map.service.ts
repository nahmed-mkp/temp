import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, empty, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import * as fromModel from './../models';

@Injectable()
export class BrokerBicMapService {

    constructor(private http: HttpClient) { }

    loadBrokerList(): Observable<any[]> {
        return this.http
            .get<any[]>(`http://prizm-map.mkpcap.com/api/v1/ops/broker_bic_map`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    // loadBrokerDetail(payload: any): Observable<any[]> {
    //     return this.http
    //         .get<any[]>(`http://prizm-map.mkpcap.com/api/v1/brokerBicMap/broker/${payload}`)
    //         .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    // }

    UpdateBrokerMap(payload: fromModel.IBroker): Observable<any> {
        const formatPayload = {
            'BrokerCode': payload.BrokerCode,
            'BICCode': payload.BIC_Code,
        }
        return this.http
            .post<any[]>(`http://prizm-map.mkpcap.com/api/v1/ops/update_broker_bic_map`, formatPayload)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
        // return of(payload);
    }
}