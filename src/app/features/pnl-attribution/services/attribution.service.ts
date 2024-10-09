import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse, HttpHeaders } from '@angular/common/http';
import { EMPTY, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import * as fromModels from './../models/attribution.models';

@Injectable()
export class PnlAttributionService {

    public groupingMapping = {
        'FundName': 'FundName',
        'PodName': 'PodName',
        'TradeName': 'TradeName',
        'SecurityName': 'Position',
    }

    constructor(public client: HttpClient) { }

    public loadDefaultGroupings(): Observable<any> {
        return this.client
            .get<any>(`http://prizm-map.mkpcap.com/api/v1/attribution/default-groupings`)
            .pipe(catchError((err: HttpErrorResponse) => {
                return throwError((err.error.message));
            }));
    }

    public loadAttribution(payload: fromModels.IAttributionRequest): Observable<any> {
        return this.client
            .post<any>(`http://prizm-map.mkpcap.com/api/v1/attribution`, payload)
            .pipe(catchError((err: HttpErrorResponse) => {
                return throwError((err.error.message));
            }));
    }

    public loadAttributionAdvance(payload: fromModels.IAttributionRequest): Observable<any> {
        const payloadCopy: any = JSON.parse(JSON.stringify(payload));
        payloadCopy.grouping.shift();
        payloadCopy.grouping = payloadCopy.grouping.map(name => this.groupingMapping[name] || name)
        payloadCopy.grouping.push('Position');
        payloadCopy.grouping = payloadCopy.grouping.join('|');

        payloadCopy.startDate = (new Date(payloadCopy.startDate)).toLocaleDateString().split('/').join('-');
        payloadCopy.endDate = (new Date(payloadCopy.endDate)).toLocaleDateString().split('/').join('-');

        return this.client
            .post<any>(`http://prizm-map.mkpcap.com/api/v1/attribution/server`, payloadCopy)
            .pipe(catchError((err: HttpErrorResponse) => {
                return throwError((err.error.message));
            }));
    }

    public loadAttributionWithGuid(payload: string): Observable<any> {
        return this.client
            .get<any>(`http://prizm-map.mkpcap.com/api/v1/attribution/server/${payload}`)
            .pipe(catchError((err: HttpErrorResponse) => {
                return throwError((err.error.message));
            }));
    }



    public loadPositionAttribution(payload: fromModels.IPositionAttributionRequest): Observable<any> {
        return this.client
            .get<any>(`http://prizm-map.mkpcap.com/api/v1/attribution/server/${payload.guid}/${payload.id}`)
            .pipe(catchError((err: HttpErrorResponse) => {
                return throwError((err.error.message));
            }));
    }

    public loadAttributionDailyTimeseries(payload: fromModels.IAttributionDailyTimeseriesRequest): Observable<any> {
        return this.client
            .get<any>(`http://prizm-map.mkpcap.com/api/v1/attribution/server/${payload.guid}/${payload.id}/timeseries`)
            .pipe(catchError((err: HttpErrorResponse) => {
                return throwError((err.error.message));
            }));
    }

    public loadAttributionDetails(payload: fromModels.IAttributionDetailsRequest): Observable<any> {
        return this.client
            .get<any>(`http://prizm-map.mkpcap.com/api/v1/attribution/server/${payload.guid}/${payload.id}/details/${payload.month}/${payload.year}`)
            .pipe(catchError((err: HttpErrorResponse) => {
                return throwError((err.error.message));
            }));
    }





    public loadAttributionReport(payload: fromModels.IAttributionReportRequest): Observable<any> {
        
        const request: any = Object.assign({}, payload)
        request.startDate = request.startDate.toLocaleDateString().split('/').join('-');
        request.endDate = request.endDate.toLocaleDateString().split('/').join('-')
        return this.client
            .post<any>(`http://prizm-map.mkpcap.com/api/v1/attribution/perfeval`, request)
            .pipe(catchError((err: HttpErrorResponse) => {
                return throwError((err.error.message));
            }));
    }

    public loadAttributionCapitalReport(payload: fromModels.IAttributionReportRequest): Observable<any> {
        
        const request: any = Object.assign({}, payload)
        request.startDate = request.startDate.toLocaleDateString().split('/').join('-');
        request.endDate = request.endDate.toLocaleDateString().split('/').join('-');
        return this.client
            .post<any>(`http://prizm-map.mkpcap.com/api/v1/attribution/perfeval/capitals`, request)
            .pipe(catchError((err: HttpErrorResponse) => {
                return throwError((err.error.message));
            }));
    }

    public loadAttributionCapitalReportEOM(payload: fromModels.IAttributionReportRequest): Observable<any> {

        const request: any = Object.assign({}, payload)
        request.startDate = request.startDate.toLocaleDateString().split('/').join('-');
        request.endDate = request.endDate.toLocaleDateString().split('/').join('-');
        return this.client
            .post<any>(`http://prizm-map.mkpcap.com/api/v1/attribution/perfeval/capitals/eom`, request)
            .pipe(catchError((err: HttpErrorResponse) => {
                return throwError((err.error.message));
            }));
    }

    public loadAttributionPodCapitalReport(payload: fromModels.IAttributionReportRequest): Observable<any> {
        
        const request: any = Object.assign({}, payload)
        request.startDate = request.startDate.toLocaleDateString().split('/').join('-');
        request.endDate = request.endDate.toLocaleDateString().split('/').join('-');
        return this.client
            .post<any>(`http://prizm-map.mkpcap.com/api/v1/attribution/perfeval/capitals/pods`, request)
            .pipe(catchError((err: HttpErrorResponse) => {
                return throwError((err.error.message));
            }));
    }

    public loadAttributionPodCapitalReportEOM(payload: fromModels.IAttributionReportRequest): Observable<any> {
        
        const request: any = Object.assign({}, payload)
        request.startDate = request.startDate.toLocaleDateString().split('/').join('-');
        request.endDate = request.endDate.toLocaleDateString().split('/').join('-');
        return this.client
            .post<any>(`http://prizm-map.mkpcap.com/api/v1/attribution/perfeval/capitals/pods/eom`, request)
            .pipe(catchError((err: HttpErrorResponse) => {
                return throwError((err.error.message));
            }));
    }










    public loadCustomGroupingAttributes(): Observable<any> {
        return this.client
            .get<any[]>(`http://prizm-map.mkpcap.com/api/v1/attribution/groupings`)
            .pipe(catchError((err: HttpErrorResponse) => {
                return throwError((err.error.message));
            }));
    }

    public loadCapitals(payload: fromModels.ICapitalRequest): Observable<any[]> {
        return this.client
            .post<any[]>(`http://prizm-map.mkpcap.com/api/v1/attribution/capitals`, payload)
            .pipe(catchError((err: HttpErrorResponse) => {
                return throwError((err.error.message));
            }));
    }


    // Layout ------------------------------------

    public loadLayouts(): Observable<any> {
        return this.client
            .get<any>(`http://prizm-map.mkpcap.com/api/v1/attribution/server/layouts`)
            .pipe(catchError((err: HttpErrorResponse) => {
                return throwError((err.error.message));
            }));
    }

    public saveLayout(payload): Observable<any> {
        return this.client
            .post<any>(`http://prizm-map.mkpcap.com/api/v1/attribution/server/layouts/save`, payload)
            .pipe(catchError((err: HttpErrorResponse) => {
                return throwError((err.error.message));
            }));
    }

    public deleteLayout(payload): Observable<any> {
        return this.client
            .post<any>(`http://prizm-map.mkpcap.com/api/v1/attribution/server/layouts/delete`, payload)
            .pipe(catchError((err: HttpErrorResponse) => {
                return throwError((err.error.message));
            }));
    }

    
}

