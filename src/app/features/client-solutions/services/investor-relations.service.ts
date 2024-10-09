import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

import * as fromModel from '../models';

@Injectable()
export class InvestorRelationsService {
    constructor(private httpClient: HttpClient) { }

    public getTabs(): Observable<any[]> {
        return this.httpClient
            .get<any[]>(`http://prizm-map.mkpcap.com/api/v1/investor/shareclass/funds`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    public getAdminStatements(payload: fromModel.DateRange): Observable<any[]> {
        return this.httpClient
            .post<any[]>(`http://prizm-map.mkpcap.com/api/v1/investor/shareclass/statements`, payload)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));

    }

    public getFirmAUMBalances(payload: string): Observable<any[]> {
        return this.httpClient
            .get<any[]>(`http://prizm-map.mkpcap.com/api/v1/investor/shareclass/aum/fund/${payload}`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    public getFirmRelationsList(payload: string): Observable<any[]> {
        return this.httpClient
            .get<any[]>(`http://prizm-map.mkpcap.com/api/v1/investor/shareclass/aum/relationship/${payload}`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    public getFirmTop10Investors(payload: string): Observable<any[]> {
        return this.httpClient
            .get<any[]>(`http://prizm-map.mkpcap.com/api/v1/investor/shareclass/aum/investor/${payload}`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    public getFirmInvestorType(payload: string): Observable<any[]> {
        return this.httpClient
            .get<any[]>(`http://prizm-map.mkpcap.com/api/v1/investor/shareclass/aum/investortype/${payload}`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    public getFirmRegions(payload: string): Observable<any[]> {
        return this.httpClient
            .get<any[]>(`http://prizm-map.mkpcap.com/api/v1/investor/shareclass/aum/region/${payload}`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }


    public getFundAUMBalances(payload: { date: string, fund: string}): Observable<any[]> {
        // edit endpoint
        return this.httpClient
            .get<any[]>(`http://prizm-map.mkpcap.com/api/v1/investor/shareclass/aum/fund/${payload.date}/${payload.fund}`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    public getFundTop10Investors(payload: { date: string, fund: string}): Observable<any[]> {
        return this.httpClient
            .get<any[]>(`http://prizm-map.mkpcap.com/api/v1/investor/shareclass/aum/investor/${payload.date}/${payload.fund}`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    public getFundInvestorType(payload: { date: string, fund: string}): Observable<any[]> {
        return this.httpClient
            // change endpoint
            .get<any[]>(`http://prizm-map.mkpcap.com/api/v1/investor/shareclass/aum/investortype/${payload.date}/${payload.fund}`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    public getFundRegions(payload: { date: string, fund: string}): Observable<any[]> {
        return this.httpClient
            .get<any[]>(`http://prizm-map.mkpcap.com/api/v1/investor/shareclass/aum/region/${payload.date}/${payload.fund}`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    public getInvestors(): Observable<any[]> {
        return this.httpClient
            .get<any[]>(`http://prizm-map.mkpcap.com/api/v1/investor/shareclass/investors`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    public editInvestor(payload: any): Observable<any[]> {
        return this.httpClient
            .post<any[]>(`http://prizm-map.mkpcap.com/api/v1/investor/shareclass/investors/${payload.investmentId}`, payload)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    public deleteInvestor(payload: any): Observable<any[]> {
        return this.httpClient
            .delete<any[]>(`http://prizm-map.mkpcap.com/api/v1/investor/shareclass/investors/${payload.investmentId}`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    public getPermissions(): Observable<boolean> {
        return this.httpClient
            .get<boolean>(`http://prizm-map.mkpcap.com/api/v1/investor/shareclass/permissions`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    public getAdminStatementExceptions(): Observable<any[]> {
        return this.httpClient
            .get<any[]>(`http://prizm-map.mkpcap.com/api/v1/investor/shareclass/exceptions`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }
}
