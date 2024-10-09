import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { saveAs } from 'file-saver';
// import 'rxjs/add/observable/throw';

import * as fromModels from '../models';

@Injectable()
export class TimeseriesService {

    public constructor(private http: HttpClient) {}

    public loadTimeseries(): Observable<fromModels.OASTimeseries[]> {
        return this.http
            .get<fromModels.OASTimeseries[]>(`http://prizm-map.mkpcap.com/api/v1/tbacharts/oas`)
            .pipe(catchError((error: HttpErrorResponse) => {
                return throwError(error.error.message);
            }));
    }

    public loadCoupons(): Observable<fromModels.OASCoupon[]> {
        return this.http
            .get<fromModels.OASCoupon[]>(`http://prizm-map.mkpcap.com/api/v1/tbacharts/coupons`)
            .pipe(catchError((error: HttpErrorResponse) => {
                return throwError(error.error.message);
            }));
    }

    public refreshCache(plotType: string): Observable<any> {
        return this.http
            .post<any>(`http://prizm-map.mkpcap.com/api/v1/tbacharts/${plotType.toLowerCase()}`, null)
            .pipe(catchError((error: HttpErrorResponse) => {
                return throwError(error.error.message);
            }));
    }

    public getChartData(url: string): Observable<fromModels.PlotDataResult> {
        return this.http
            .get<fromModels.PlotDataResult>(url)
            .pipe(catchError((error: HttpErrorResponse) => {
                return throwError(error.error.message);
            }));
    }

    public getChartComparisonData(url: string,
        coupon1: fromModels.OASCoupon, coupon2: fromModels.OASCoupon): Observable<fromModels.PlotDataResult> {
        return this.http
            .post<fromModels.PlotDataResult>(url, { coupon1: coupon1, coupon2: coupon2})
            .pipe(catchError((error: HttpErrorResponse) => {
                return throwError(error.error.message);
            }));
    }

    public loadMetricTypes(): Observable<fromModels.MetricType[]> {
        return this.http
            .get<fromModels.MetricType[]>('http://prizm-map.mkpcap.com/api/v1/tbacharts/metrictypes')
            .pipe(catchError((error: HttpErrorResponse) => {
                return throwError(error.error.message);
            }));
    }

    public getTrackerTimeStamp(): Observable<fromModels.TrackerTimestamp> {
        return this.http
            .get<fromModels.TrackerTimestamp>('http://prizm-map.mkpcap.com/api/v1/tbacharts/trackers/timestamp')
            .pipe(catchError((error: HttpErrorResponse) => {
                return throwError(error.error.message);
            }));
    }

    public downloadTracker() {
        const headers = new HttpHeaders({
            'Content-Type':  'application/json'
        });

        return this.http
            .post('http://prizm-map.mkpcap.com/api/v1/tbacharts/trackers/download', null, {headers: headers, observe: 'response', responseType: 'blob' })
            .subscribe(
                (response: any) => { // download file
                    const fileName = response.headers.get('Content-Disposition').split(';')[1].split('=')[1];
                    saveAs(response.body, fileName);
                },
                (error: any) => {
                    console.error(`Error: ${error.message}`);
                }
            );
    }
}
