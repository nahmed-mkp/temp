import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, empty, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import * as fromModels from './../models';

@Injectable()
export class RateCardService {

    constructor(private http: HttpClient) { }

    signOff(): Observable<any> {
        return this.http
        .post<any>(`api/v1/financing/rate_card/sign_off`, null)
        .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    loadPositionGrouping(date: string): Observable<any> {
        return this.http
        .post<any>(`http://prizm-map.mkpcap.com/api/v1/position/groupings`, {asOfDate: date})
        .pipe(catchError((err: HttpErrorResponse) => Observable.throw(err.error.message)));
    }

    /* ============= ADMIN TAB ============= */

    loadRateByFundAndSecurity(date: string): Observable<fromModels.IRateByFundAndSecurity[]> {
        return this.http
            .get<fromModels.IRateByFundAndSecurity[]>(`http://prizm-map.mkpcap.com/api/v1/financing/rate_card/security/${date}`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    loadRateByFundAndBucket(date: string): Observable<fromModels.IRateByFundAndBucket[]> {
        return this.http
            .get<fromModels.IRateByFundAndBucket[]>(`http://prizm-map.mkpcap.com/api/v1/financing/rate_card/funding_bucket/${date}`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    loadRateByEquity(date: string): Observable<fromModels.IRateByEquity[]> {
        return this.http
            .get<fromModels.IRateByEquity[]>(`http://prizm-map.mkpcap.com/api/v1/financing/rate_card/security_equity/${date}`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));

    }

    /* ============= RATE CARD TAB ============= */

    loadRateCardBySecurity(payload: fromModels.IRateCardRequest): Observable<fromModels.IRateCard[]> {
        return this.http
            .post<fromModels.IRateCard[]>(`http://prizm-map.mkpcap.com/api/v1/financing/rate_card/fund_security`, payload)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    /* ============= FUNDING CHARGES TAB ============= */

    loadFundingCharges(payload: fromModels.IFundingChargeRequest): Observable<fromModels.IFundingCharge[]> {
        return this.http
            .post<fromModels.IFundingCharge[]>(`http://prizm-map.mkpcap.com/api/v1/financing/rate_card/funding_charges`, payload)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    saveRateByFundAndSecurity(payload: fromModels.ISecurityRateUpdate): Observable<fromModels.IRateByFundAndSecurity[]> {
        const normalizedPayload = {
            'as_of_date': payload.AsOfDate,
            'fund_name': payload.FundName,
            'sid': payload.SID,
            'rate_override': payload.RateOverride
        }
        return this.http
            .post<fromModels.IRateByFundAndSecurity[]>(`http://prizm-map.mkpcap.com/api/v1/financing/rate_card/update_security`, normalizedPayload)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    saveRateByFundAndBucket(payload: fromModels.IBucketRateUpdate): Observable<fromModels.IRateByFundAndBucket[]> {
        const normalizedPayload = {
            'as_of_date': payload.AsOfDate ,
            'fund_name': payload.FundName,
            'funding_tag': payload.FundingTag,
            'rate_override': payload.RateOverride
        }
        return this.http
            .post<fromModels.IRateByFundAndBucket[]>(`http://prizm-map.mkpcap.com/api/v1/financing/rate_card/update_funding_bucket`, normalizedPayload)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    saveRateBySecurityEquity(payload: fromModels.ISecurityEquityRateUpdate): Observable<fromModels.IRateByEquity[]> {   
        const normalizedPayload = {
            'as_of_date': payload.AsOfDate,
            'sid': payload.SID,
            'rate_override': payload.RateOverride,
            'fund_name': payload.FundName,
            'long_short': payload.LongShort,
        }
        return this.http
            .post<fromModels.IRateByEquity[]>(`http://prizm-map.mkpcap.com/api/v1/financing/rate_card/update_security_equity`, normalizedPayload)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

}
