import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IScenarioProbabilityUpdate, IScenarioTargetUpdate } from '../models';

import * as fromModels from '../models';
import * as moment from 'moment';

@Injectable()
export class AssetTargetsService {

    constructor(private http: HttpClient) { }

    checkAccessLevel(): Observable<boolean | string>{
        return this.http
            .get<boolean>('api/v1/asset_targets/checkPrivilegedAccess')
            .pipe(catchError((err: HttpErrorResponse) => Observable.throw(err.error.message)));
    }

    checkLimitedAccessLevel(): Observable<boolean>{
        return this.http
            .get<boolean>('api/v1/asset_targets/checkLimitedPrivilegedAccess')
            .pipe(catchError((err: HttpErrorResponse) => Observable.throw(err.error.message)))
    }

    getAssetTargets(assetType: string): Observable<any> {
        return this.http
            .get<any>(`http://prizm-map.mkpcap.com/api/v1/asset_targets/${assetType}`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    getHistoricalAssetTargets(payload: fromModels.IHistoricalAssetTargetsReq): Observable<any> {
        const mmddyyyy = moment(payload.date).format('MM-DD-YYYY');
        return this.http
            .get<any>(`http://prizm-map.mkpcap.com/api/v1/asset_targets/${payload.assetType}/${mmddyyyy}`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    getTestAssetTargets(assetType: string): Observable<any> {
        return this.http
            .get<any>(`http://prizm-map.mkpcap.com/api/v1/asset_targets/${assetType}/test`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    getAssetTargetTimeseries( payload: fromModels.IAssetTargetsTimeseriesReq): Observable<any[]> {
        const mmddyyyy = moment(payload.date).format('MM-DD-YYYY');
        return this.http
            .get<any[]>(`http://prizm-map.mkpcap.com/api/v1/asset_targets/${payload.assetType}/${mmddyyyy}/timeseries`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }
    
    getScenarioTargetDashboardData(assetType: string): Observable<any>{
        return this.http
            .get<any>(`http://prizm-map.mkpcap.com/api/v1/asset_targets/${assetType}/target/update`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    updateScenarioTarget(payload: { assetType: string, data: IScenarioTargetUpdate }): Observable<any>{
        return this.http
            .post<any>(`http://prizm-map.mkpcap.com/api/v1/asset_targets/${payload.assetType}/target/update`, payload.data)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    getScenarioProbabilityDashboardData(assetType: string): Observable<any>{
        return this.http
            .get<any>(`http://prizm-map.mkpcap.com/api/v1/asset_targets/${assetType}/probability/update`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    updateScenarioProbability( payload: { assetType: string, data: IScenarioProbabilityUpdate }): Observable<any>{
        return this.http
            .post<any>(`http://prizm-map.mkpcap.com/api/v1/asset_targets/${payload.assetType}/probability/update`, payload.data)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    updateScenarioSortOrder( payload: fromModels.ISortOrderUpdatePayload[]) : Observable<any> {
        return this.http
            .post<fromModels.ISortOrderUpdatePayload>(`http://prizm-map.mkpcap.com/api/v1/asset_targets/output/scenarios/sort_order`, payload)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
        }

    getSupportedCalculatorCountries(): Observable<any>{
        return this.http
            .get(`api/v1/asset_targets/scenario/graph`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)))
    }

    getCalculatorInputsByCountry( country: string): Observable<any>{
        return this.http
            .get(`api/v1/asset_targets/scenario/graph/${country}`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)))
    }

}

