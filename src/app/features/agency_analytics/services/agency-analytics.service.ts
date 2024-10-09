import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import * as fromModels from '../models/yieldbook.models';
import * as fromPortfolioModels from './../models/agency-analytics.models';

@Injectable()
export class AgencyAnalyticsService {

    constructor(private http: HttpClient) { }

    /******** PORTFOLIO CONSTRUCTION/CRUD **********/

    loadLookups(): Observable<any> {
        return this.http
            .get<any>(`http://prizm-map.mkpcap.com/api/v1/agency_analytics/lookups`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    loadPortfolios(): Observable<fromPortfolioModels.IPortfolio[]> { 
        return this.http
            .get<fromPortfolioModels.IPortfolio[]>(`http://prizm-map.mkpcap.com/api/v1/agency_analytics/portfolios`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    loadPortfolio(portfolio: fromPortfolioModels.IPortfolio): Observable<fromPortfolioModels.IPortfolioDetail> {
        return this.http
            .get<fromPortfolioModels.IPortfolioDetail>(`http://prizm-map.mkpcap.com/api/v1/agency_analytics/portfolios/${portfolio.guid}`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    reloadPortfolio(portfolio: fromPortfolioModels.IPortfolio): Observable<fromPortfolioModels.IPortfolioDetail> {
        return this.http
            .get<fromPortfolioModels.IPortfolioDetail>(`http://prizm-map.mkpcap.com/api/v1/agency_analytics/portfolios/${portfolio.guid}/reload`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    createPortfolio(portfolio: fromPortfolioModels.INewPortfolio): Observable<fromPortfolioModels.IPortfolio> {
        return this.http
            .post<fromPortfolioModels.IPortfolio>(`http://prizm-map.mkpcap.com/api/v1/agency_analytics/portfolios`, portfolio)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    updatePortfolio(portfolio: fromPortfolioModels.IPortfolio): Observable<fromPortfolioModels.IPortfolio> {
        return this.http
            .put<fromPortfolioModels.IPortfolio>(`http://prizm-map.mkpcap.com/api/v1/agency_analytics/portfolios`, portfolio)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    deletePortfolio(portfolio: fromPortfolioModels.IPortfolio): Observable<fromPortfolioModels.IPortfolio> {
        return this.http
            .delete<fromPortfolioModels.IPortfolio>(`http://prizm-map.mkpcap.com/api/v1/agency_analytics/portfolios/${portfolio.guid}`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    searchSecurity(payload: fromModels.IQuickSearch): Observable<fromModels.ISearchResult> {
        return this.http
            .post<fromModels.ISearchResult>(`http://prizm-map.mkpcap.com/api/v1/agency_analytics/search`, payload)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    validateSecurities(payload: string[]): Observable<fromPortfolioModels.IValidSecurity[]> {
        return this.http
            .post<fromPortfolioModels.IValidSecurity[]>(`http://prizm-map.mkpcap.com/api/v1/agency_analytics/validate`, payload)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    runPYCalc(portfolioGuid: string, securities: fromPortfolioModels.ISecurityInput[]): Observable<any[]> {
        return this.http
            .post<any[]>(`http://prizm-map.mkpcap.com/api/v1/agency_analytics/portfolios/${portfolioGuid}/run/ad_hoc/py_calc`, securities)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    runPYCalcPartial(portfolioGuid: string, securities: fromPortfolioModels.ISecurityInput[]): Observable<any[]> {
        return this.http
            .post<any[]>(`http://prizm-map.mkpcap.com/api/v1/agency_analytics/portfolios/${portfolioGuid}/run/ad_hoc/py_calc`, securities)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    runRoR(portfolioGuid: string, securities: fromPortfolioModels.ISecurityInput[]): Observable<any[]> {
        return this.http
            .post<any[]>(`http://prizm-map.mkpcap.com/api/v1/agency_analytics/portfolios/${portfolioGuid}/run/ad_hoc/ror`, securities)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    runRoRPartial(portfolioGuid: string, securities: fromPortfolioModels.ISecurityInput[]): Observable<any[]> {
        return this.http
            .post<any[]>(`http://prizm-map.mkpcap.com/api/v1/agency_analytics/portfolios/${portfolioGuid}/run/ad_hoc/ror`, securities)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    runActVsProj(portfolioGuid: string, securities: fromPortfolioModels.ISecurityInput[]): Observable<any[]> {
        return this.http
            .post<any[]>(`http://prizm-map.mkpcap.com/api/v1/agency_analytics/portfolios/${portfolioGuid}/run/ad_hoc/act_vs_proj`, securities)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    runActVsProjPartial(portfolioGuid: string, securities: fromPortfolioModels.ISecurityInput[]): Observable<any[]> {
        return this.http
            .post<any[]>(`http://prizm-map.mkpcap.com/api/v1/agency_analytics/portfolios/${portfolioGuid}/run/ad_hoc/act_vs_proj`, securities)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }


    /******************/

}
