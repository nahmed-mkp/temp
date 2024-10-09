import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import * as fromModels from './../models/prizm-sei-rec.models';

@Injectable()
export class PrizmSEIPnlRecService {

    constructor(public client: HttpClient) { }

    public uploadFiles(payload: string[]): Observable<fromModels.PrizmSEIRecUpload> {
        return this.client
            .post<fromModels.PrizmSEIRecUpload>(`http://prizm-map.mkpcap.com/api/v1/position/prizm_sei_pnl_rec/view`, {'files': payload})
            .pipe(catchError((err: HttpErrorResponse) => {
                return throwError((err.error.message));
            }));
    }

    public loadFundsForRec(): Observable<string[]> {
        return this.client
            .get<string[]>(`http://prizm-map.mkpcap.com/api/v1/position/prizm_sei_pnl_rec/view`)
            .pipe(catchError((err: HttpErrorResponse) => {
                return throwError((err.error.message));
            }));
    }

    public uploadFunds(payload: string[]): Observable<fromModels.PrizmSEIRecUpload> {
        return this.client
            .post<fromModels.PrizmSEIRecUpload>(`http://prizm-map.mkpcap.com/api/v1/position/prizm_sei_pnl_rec/view`, { 'funds': payload })
            .pipe(catchError((err: HttpErrorResponse) => {
                return throwError((err.error.message));
            }));
    }

    public runReconciliation(payload: string): Observable<any[]> {
        return this.client
            .post<any[]>(`http://prizm-map.mkpcap.com/api/v1/position/prizm_sei_pnl_rec/run`, { 'fund': payload })
            .pipe(catchError((err: HttpErrorResponse) => {
                return throwError((err.error.message));
            }));
    }

}
