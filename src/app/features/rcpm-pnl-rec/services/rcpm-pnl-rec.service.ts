import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class RCPMPnlRecService {

    constructor(public client: HttpClient) { }

    public loadPnlRecData(payload: Date | any): Observable<any[]> {

        if (typeof payload === 'object') {
            payload = payload.toLocaleDateString().split('/').join('-');
        }

        return this.client
            .get<any[]>(`http://prizm-map.mkpcap.com/api/v1/position/prizm_rcpm_pnl_rec/${payload}`)
            .pipe(catchError((err: HttpErrorResponse) => {
                return throwError((err.error.message));
            }));
    }

    public loadPosRecData(payload: Date | any): Observable<any[]> {

        if (typeof payload === 'object') {
            payload = payload.toLocaleDateString().split('/').join('-');
        }

        return this.client
            .get<any[]>(`http://prizm-map.mkpcap.com/api/v1/position/prizm_crd_pos_rec/${payload}`)
            .pipe(catchError((err: HttpErrorResponse) => {
                return throwError((err.error.message));
            }));
    }

    public loadPricerRecData(payload: Date | any): Observable<any[]> {

        if (typeof payload === 'object') {
            payload = payload.toLocaleDateString().split('/').join('-');
        }


        return this.client
            .get<any[]>(`http://prizm-map.mkpcap.com/api/v1/position/prizm_rcpm_pricer_rec/`)
            .pipe(catchError((err: HttpErrorResponse) => {
                return throwError((err.error.message));
            }));
    }
}
