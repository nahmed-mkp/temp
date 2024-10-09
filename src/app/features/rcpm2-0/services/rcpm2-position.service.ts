import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as fromModel from './../models';
import { AuthService } from 'src/app/services';
import * as fromModels from '../models';

@Injectable()
export class RCPM2PositionService {

    constructor(public client: HttpClient, public authService: AuthService) { }

    public loadPositions(payload: string): Observable<any[]> {
        return this.client
            .get<any[]>(`http://prizm-map.mkpcap.com/api/v1/position/positions/${payload}`)
            .pipe(catchError((err: HttpErrorResponse) => {
                return throwError((err.error.message));
            }));
    }

    public loadMissingCloses(payload: fromModel.MissingClosesRequest): Observable<any> {
        //@ts-ignore
        payload.asOfDate = payload.asOfDate.replaceAll('/', '-')
        return this.client
            .post<any>(`http://prizm-map.mkpcap.com/api/v1/position/missing_closes`, payload)
            .pipe(catchError((err: HttpErrorResponse) => {
                return throwError(err.error.message)
            }))
    }

    public loadPositionsCache(payload: string, mode, source?): Observable<any[]> {
        payload = payload.split('-').join('/');
        return this.client
            // .post<any>(`http://prizm-map.mkpcap.com/api/v1/position/positions`, {asOfDate: payload, mode: mode, source: source.toLowerCase()})
            .post<any>(`http://prizm-map.mkpcap.com/api/v1/position/positions`, {asOfDate: payload, mode: mode, source: source.toLowerCase()})
            .pipe(catchError((err: HttpErrorResponse) => {
                return throwError((err.error.message));
            }));
    }

    public loadExecutions(payload: string): Observable<any[]> {
        return this.client
            .get<any[]>(`http://prizm-map.mkpcap.com/api/v1/position/executions/${payload}`)
            .pipe(catchError((err: HttpErrorResponse) => {
                return throwError((err.error.message));
            }));
    }

    public loadExecutionsCache(payload: string): Observable<any[]> {
        payload = payload.split('-').join('/');
        return this.client
            .post<any>(`http://prizm-map.mkpcap.com/api/v1/position/executions`, {asOfDate: payload})
            .pipe(catchError((err: HttpErrorResponse) => {
                return throwError((err.error.message));
            }));
    }

    public loadExecutionsAdvance(payload: fromModel.ExecutionRequest): Observable<any[]> {
        return this.client
            .post<any>(`http://prizm-map.mkpcap.com/api/v1/position/executions/server`, payload)
            .pipe(catchError((err: HttpErrorResponse) => {
                return throwError((err.error.message));
            }));
    }

    public loadPositionLookups(): Observable<any> {
        return this.client
            .get<any[]>(`http://prizm-map.mkpcap.com/api/v1/position/lookups`)
            .pipe(catchError((err: HttpErrorResponse) => {
                return throwError((err.error.message));
            }));
    }

    public loadPositionGrouping(payload: string): Observable<any> {
        return this.client
            .post<any>(`http://prizm-map.mkpcap.com/api/v1/position/groupings`, {asOfDate: payload})
            .pipe(catchError((err: HttpErrorResponse) => {
                return throwError((err.error.message));
            }));
    }

    public loadNonlinearSupportGrouping(): Observable<any> {
        return this.client
            .get<any>(`http://prizm-map.mkpcap.com/api/v1/risks/`)
            .pipe(catchError((err: HttpErrorResponse) => {
                return throwError((err.error.message));
            }));
    }

    public loadNonlinearAggData(payload: any): Observable<any> {
        return this.client
            .post<any>(`http://prizm-map.mkpcap.com/api/v1/risks/`, payload)
            .pipe(catchError((err: HttpErrorResponse) => {
                return throwError((err.error.message));
            }));
    }

    public loadPresetLayout(): Observable<fromModel.PositionLayout> {
        return this.client
            .get<any>(`http://prizm-map.mkpcap.com/api/v1/position/layouts/static`)
            .pipe(catchError((err: HttpErrorResponse) => {
                return throwError((err.error.message));
            }));
    }

    public loadPositionDates(): Observable<fromModel.PositionDatesResponse> {
        return this.client
        .get<any>(`http://prizm-map.mkpcap.com/api/v1/position/portfolios`)
        .pipe(catchError((err: HttpErrorResponse) => {
            return throwError((err.error.message));
        }));
    }

    public loadLatestPositionDate(): Observable<any> {
        return this.client
        .get<any>(`http://prizm-map.mkpcap.com/api/v1/position/portfolios/latest`)
        .pipe(catchError((err: HttpErrorResponse) => {
            return throwError((err.error.message));
        }));
    }

    public loadPositionInfo(payload: fromModel.PositionInfoRequest | any): Observable<any> {

        payload.fundId = parseInt(payload.fundId, 10);
        payload.podId = parseInt(payload.podId, 10);
        payload.sid = parseInt(payload.sid, 10);
        payload.tid = parseInt(payload.tid, 10);

        return this.client
            .post<any>(`http://prizm-map.mkpcap.com/api/v1/position/positions/details`, payload)
            .pipe(catchError((err: HttpErrorResponse) => {
                return throwError((err.error.message));
            }));
    }

    public loadNonlinearPnlData(payload: fromModel.NonlinearPnlRequest | any): Observable<any> {

        // delete payload['source'];
        // delete payload['mode'];
        return this.client
            .post<any>(`http://prizm-map.mkpcap.com/api/v1/risks/pnl`, payload)
            .pipe(catchError((err: HttpErrorResponse) => {
                return throwError((err.error.message));
            }));
    }

    public loadDataSourcePermission(): Observable<string[]> {
        return this.client
            .get<any>(`http://prizm-map.mkpcap.com/api/v1/position/data_source_permission`)
            .pipe(catchError((err: HttpErrorResponse) => {
                return throwError((err.error.message));
            }));
    }

    public checkDataSourcePermission(permission?: string[]): boolean {

        let permissionUserList;
        const userName = this.authService.getName();
        if (permission.length && permission.length > 0) {
            permissionUserList = permission;
        } else {
            permissionUserList = [
                'Akshay Chand',
                'System Administrator',
                'Molly Qin',
                'Vinay Puri',
                'Lin Li',
                'Saurabh Dhoble',
                'Yechao Lin',
                'Lucas Yao',
                'Terence Hsu',
                'Gianluca Salford',
                'Kevin Murphy',
                'Bill Tanyeri',
                'Teja Munakala',
                'Rich Lightburn',
                'Lauren Polen',
                'Graeme Douglas',
            ];
        }


        return permissionUserList.includes(userName);
        // return true
    }

    public loadUserLockStatus(): Observable<any> {
        return this.client
            .post<any>(`http://prizm-map.mkpcap.com/api/v1/position/isuserlocked`, {})
            .pipe(catchError((err: HttpErrorResponse) => {
                return throwError((err.error.message));
            }));
    }

    public checkExcludeTestFundPermission(): boolean {
        const userName = this.authService.getUser();
        const permissionUserList = [
            'rcampbell',
            'lyao', 
            'bchapey',
            'vpuri',
            'achand',
            'ylin',
            'dzhang'
        ];

        return permissionUserList.includes(userName);
    }
}
