import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, empty, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import * as fromModels from '../models';

@Injectable()
export class RiskSpanRequestService {

    constructor(private http: HttpClient) { }

    loadSchema(): Observable<any> {
        return this.http
            .get<any>('http://prizm-map.mkpcap.com/api/v1/riskspan/schema')
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    buildQuery(payload: fromModels.IRequest): Observable<fromModels.IQueryResult> {
        return this.http
            .post<fromModels.IQueryResult>('http://prizm-map.mkpcap.com/api/v1/riskspan/query', this.formatRequest(payload))
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    submitRequest(payload: fromModels.IRequest): Observable<any[]> {
        return this.http
            .post<any[]>('http://prizm-map.mkpcap.com/api/v1/riskspan/request', this.formatRequest(payload))
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    submitDetailedRequest(payload: fromModels.IDetailRequest): Observable<any[]> {
        return this.http
            .post<any[]>('http://prizm-map.mkpcap.com/api/v1/riskspan/details', this.formatRequest(payload))
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    formatRequest(payload: fromModels.IDetailRequest | fromModels.IRequest) {
        const formattedRequest: fromModels.IDetailRequest = JSON.parse(JSON.stringify(payload));
        const minDateObj = new Date(payload.factorDates.valuesMin);
        const maxDateObj = new Date(payload.factorDates.valuesMax);
        formattedRequest.factorDates.valuesMin = minDateObj.toISOString().split('T')[0].split('-').join('');
        formattedRequest.factorDates.valuesMax = maxDateObj.toISOString().split('T')[0].split('-').join('');
        formattedRequest.buckets.forEach(bucket => {
            if (bucket.valuesMin !== undefined) {
                bucket.valuesMin = bucket.valuesMin.toString();
            }
            if (bucket.valuesMax !== undefined) {
                bucket.valuesMax = bucket.valuesMax.toString();
            }
            if (bucket.stepSize !== undefined) {
                bucket.stepSize = bucket.stepSize.toString();
            }
            if (bucket.inputType === 'numeric' && bucket.values !== undefined) {
                bucket.values = bucket.values.split(',');
            }
        });
        return formattedRequest;
    }
}
