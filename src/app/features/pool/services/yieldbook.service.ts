import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import * as fromModels from './../models/yieldbook.models';

@Injectable()
export class YieldbookService {

    constructor(private client: HttpClient) { }

    /** Request Logs **/

    loadYieldbookRequestsByDate(asOfDate: string): Observable<fromModels.IYieldbookRequestLog[]> {
        return this.client
            .get<fromModels.IYieldbookRequestLog[]>(`http://prizm-map.mkpcap.com/api/v1/yieldbook/requestlogs/${asOfDate}`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    loadYieldbookRequestById(requestId: number): Observable<any> {
        return this.client
            .get<any>(`http://prizm-map.mkpcap.com/api/v1/yieldbook/requestlogs/${requestId}/input`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    loadYieldbookResponseById(requestId: number): Observable<any> {
        return this.client
            .get<any>(`http://prizm-map.mkpcap.com/api/v1/yieldbook/requestlogs/${requestId}/output`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    /** Request Dry Run **/

    getSupportedRequestTypes(): Observable<string[]> {
        return this.client
            .get<any>(`http://prizm-map.mkpcap.com/api/v1/yieldbook/generate/requesttypes`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    processPYCalc(payload: any): Observable<any[]> {
        return this.client
            .post<any[]>('http://prizm-map.mkpcap.com/api/v1/portfolios/requests/yieldbook/pycalc_async', payload)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.message)));
    }

    processSensitivities(payload: any): Observable<any[]> {
        return this.client
            .post<any[]>('http://prizm-map.mkpcap.com/api/v1/portfolios/requests/yieldbook/sensitivities', payload)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.message)));
    }

    processHorizonAnalysis(payload: any): Observable<any[]> {
        return this.client
            .post<any[]>('http://prizm-map.mkpcap.com/api/v1/portfolios/requests/yieldbook/horizonanalysis', payload)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.message)));
    }

    processModelValidation(payload: any): Observable<any[]> {
        return this.client
            .post<any[]>('http://prizm-map.mkpcap.com/api/v1/portfolios/requests/yieldbook/modelvalidation', payload)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.message)));
    }

    // generateBondDataRequest(payload: any): Observable<any> {
    //     return this.client
    //         .post<any>(`http://prizm-map.mkpcap.com/api/v1/yieldbook/generate/bonddata`, payload)
    //         .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    // }

    // generateSensitivitiesRequest(payload: any): Observable<any> {
    //     return this.client
    //         .post<any>(`http://prizm-map.mkpcap.com/api/v1/yieldbook/request/sensitivities`, payload)
    //         .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    // }

    // generateModelValidationRequest(payload: any): Observable<any> {
    //     return this.client
    //         .post<any>(`http://prizm-map.mkpcap.com/api/v1/yieldbook/generate/modelvalidation`, payload)
    //         .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    // }

    // generateHorizonAnalysisRequest(payload: any): Observable<any> {
    //     return this.client
    //         .post<any>(`http://prizm-map.mkpcap.com/api/v1/yieldbook/generate/horizonanalysis`, payload)
    //         .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    // }

    // -------------------------------------------------------------------------------------

    checkRequestStatus(payload: string): Observable<any> {
        return this.client
            .get<any>(`http://prizm-map.mkpcap.com/api/v1/portfolios/requests/yieldbook/status/${payload}`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.message)));
    }

    getResult(payload: string): Observable<any> {
        return this.client
            .get<any>(`http://prizm-map.mkpcap.com/api/v1/portfolios/results/yieldbook/${payload}`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.message)));
    }
}
