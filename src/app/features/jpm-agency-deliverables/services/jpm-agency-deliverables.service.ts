import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as fromModels from '../models';

@Injectable()
export class JpmAgencyDeliverableService {

    constructor(private http: HttpClient) { }

    loadPortfolioDates(): Observable<any> {
        return this.http
            .get<any>('http://prizm-map.mkpcap.com/api/v1/agency-deliverables/portfolio-dates')
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    loadLatestPortfolioDate(): Observable<any> {
        return this.http
            .get<any>('http://prizm-map.mkpcap.com/api/v1/agency-deliverables/latest-portfolio-date')
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    loadDeliverableConfigData(): Observable<any> {
        return this.http
            .get<any>('http://prizm-map.mkpcap.com/api/v1/agency-deliverables/config')
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    updateDeliverable(data: fromModels.IDeliverableData): Observable<any> {
        return this.http
            .post<any>('http://prizm-map.mkpcap.com/api/v1/agency-deliverables/update', data)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    loadDeliverablesData(portfolioDate: string){
        return this.http
            .post<any>(`http://prizm-map.mkpcap.com/api/v1/agency-deliverables/deliverables`, {portfolioDate: portfolioDate})
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    loadCashData(portfolioDate: string): Observable<any> {
        return this.http
            .post<any>('http://prizm-map.mkpcap.com/api/v1/agency-deliverables/cash', {portfolioDate: portfolioDate})
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

}