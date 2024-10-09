import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, empty, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as fromModels from '../models';

@Injectable()
export class ScenarioManagementService {

    constructor(private http: HttpClient) { }

    // ========================== LOAD DATA ==========================

    loadCountries(): Observable<any> {
        return this.http
            .get('http://prizm-map.mkpcap.com/api/v1/asset_targets/input/countries')
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    loadEconomicVariables(): Observable<any> {
        return this.http
            .get(`http://prizm-map.mkpcap.com/api/v1/asset_targets/input/economic_variables`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    loadForecastPeriods(): Observable<any> {
        return this.http
            .get(`http://prizm-map.mkpcap.com/api/v1/asset_targets/input/forecast_periods`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    loadScenarios(): Observable<any> {
        return this.http
            .get(`http://prizm-map.mkpcap.com/api/v1/asset_targets/input/scenarios`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    loadAggregatedForecasts(): Observable<any> {
        return this.http
            .get(`http://prizm-map.mkpcap.com/api/v1/asset_targets/input/forecast`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    // ========================== UPDATE DATA ==========================

    updateCountry(payload: fromModels.ICountryUpdateReq): Observable<any> { 
        return this.http
            .post(`api/v1/asset_targets/input/countries`, payload)
            .pipe(catchError( (err: HttpErrorResponse) => throwError(err.error.message)))
    }

    updateEconomicVariable(payload: fromModels.IEconomicVariableUpdateReq): Observable<any> {
        return this.http
            .put(`http://prizm-map.mkpcap.com/api/v1/asset_targets/input/economic_variables/update`, payload)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    updateForecastPeriod(payload: fromModels.IForecastPeriodUpdateReq): Observable<any> {
        return this.http
            .put(`http://prizm-map.mkpcap.com/api/v1/asset_targets/input/forecast_periods/update`, payload)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    udpateScenario(payload: fromModels.IScenarioUpdateReq): Observable<any> {
        return this.http
            .put(`http://prizm-map.mkpcap.com/api/v1/asset_targets/input/scenarios/update`, payload)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    updateForecast(payload: fromModels.IForecastUpdateReq): Observable<any> {
        return this.http
            .put(`http://prizm-map.mkpcap.com/api/v1/asset_targets/input/forecast/update`, payload)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)))
    }

    // ========================== CREATE DATA ==========================

    createEconomicVariable(payload: fromModels.IEconomicVariableCreateReq): Observable<any> {
        return this.http
            .post(`http://prizm-map.mkpcap.com/api/v1/asset_targets/input/economic_variables/create`, payload)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    createForecastPeriod(payload: fromModels.IForecastPeriodCreateReq): Observable<any> {
        return this.http
            .post(`http://prizm-map.mkpcap.com/api/v1/asset_targets/input/forecast_periods/create`, payload)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    createScenario(payload: fromModels.IScenarioCreateReq): Observable<any> {
        return this.http
            .post(`http://prizm-map.mkpcap.com/api/v1/asset_targets/input/scenarios/create`, payload)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    createForecast(payload: fromModels.IForecastCreateReq): Observable<any> {
        return this.http
            .post('http://prizm-map.mkpcap.com/api/v1/asset_targets/input/forecast/create', payload)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)))
    }

   // ========================== NEW DATA ==========================

    addNewEconomicVariable(payload): Observable<any>{
        return null
    }

    addNewForecastPeriod(payload): Observable<any>{
        return null
    }

    addNewScenario(payload): Observable<any>{
        return null
    }

}


