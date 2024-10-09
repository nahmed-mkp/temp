import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class LayoutService {

    constructor(public client: HttpClient) {}

    public loadStaticLayouts(): Observable<any> {
        return this.client
            .get<any>(`http://prizm-map.mkpcap.com/api/v1/layouts/rcpm20/static`)
            .pipe(catchError((err: HttpErrorResponse) => {
                return throwError((err.error.message));
            }));
    }

    // ----------------------------------------------------------------

    public loadLayouts(): Observable<any> {
        return this.client
            .get<any[]>(`http://prizm-map.mkpcap.com/api/v1/layouts/rcpm20/layouts`)
            .pipe(catchError((err: HttpErrorResponse) => {
                return throwError((err.error.message));
            }));
    }

    public saveLayout(payload: any): Observable<any> {
        return this.client
            .post<any>(`http://prizm-map.mkpcap.com/api/v1/layouts/rcpm20/layouts/save`, payload)
            .pipe(catchError((err: HttpErrorResponse) => {
                return throwError((err.error.message));
            }));
    } 

    public deleteLayout(payload: any): Observable<any> {
        return this.client
            .post<any>(`http://prizm-map.mkpcap.com/api/v1/layouts/rcpm20/layouts/delete`, payload)
            .pipe(catchError((err: HttpErrorResponse) => {
                return throwError((err.error.message));
            }));
    }




    public loadLayoutStyle(): Observable<any> {
        return this.client
            .get<any[]>(`http://prizm-map.mkpcap.com/api/v1/layouts/rcpm20/styles`)
            .pipe(catchError((err: HttpErrorResponse) => {
                return throwError((err.error.message));
            }));
    }

    public saveLayoutStyle(payload: any): Observable<any> {
        return this.client
            .post<any>(`http://prizm-map.mkpcap.com/api/v1/layouts/rcpm20/styles/save`, payload)
            .pipe(catchError((err: HttpErrorResponse) => {
                return throwError((err.error.message));
            }));
    }

    public deleteLayoutStyle(payload: any): Observable<any> {
        return this.client
            .post<any[]>(`http://prizm-map.mkpcap.com/api/v1/layouts/rcpm20/styles/delete`, payload)
            .pipe(catchError((err: HttpErrorResponse) => {
                return throwError((err.error.message));
            }));
    }






    public loadLayoutGroupingStyle(): Observable<any> {
        return this.client
            .get<any[]>(`http://prizm-map.mkpcap.com/api/v1/layouts/rcpm20/grouping/styles`)
            .pipe(catchError((err: HttpErrorResponse) => {
                return throwError((err.error.message));
            }));
    }

    public saveLayoutGroupingStyle(payload: any): Observable<any> {
        return this.client
            .post<any>(`http://prizm-map.mkpcap.com/api/v1/layouts/rcpm20/grouping/styles/save`, payload)
            .pipe(catchError((err: HttpErrorResponse) => {
                return throwError((err.error.message));
            }));
    }

    public deleteLayoutGroupingStyle(payload: any): Observable<any> {
        return this.client
            .post<any[]>(`http://prizm-map.mkpcap.com/api/v1/layouts/rcpm20/grouping/styles/delete`, payload)
            .pipe(catchError((err: HttpErrorResponse) => {
                return throwError((err.error.message));
            }));
    }


}