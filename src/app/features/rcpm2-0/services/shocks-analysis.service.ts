import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ShocksAnalysisService {

    constructor(public client: HttpClient) { }

    public loadShocksInfo(): Observable<any> {
        return this.client
            .get<any[]>(`http://prizm-map.mkpcap.com/api/v1/shocks/info`)
            .pipe(catchError((err: HttpErrorResponse) => {
                return throwError((err.error.message));
            }));
    }

    public loadShocksAssetClass(payload: string): Observable<any> {
        return this.client
            .get<any>(`http://prizm-map.mkpcap.com/api/v1/shocks/results/${payload}`)
            .pipe(catchError((err: HttpErrorResponse) => {
                return throwError((err.error.message));
            }));
    }

    public hitShocksTrigger(): Observable<any> {
        return this.client
            .post<any>(`http://prizm-map.mkpcap.com/api/v1/shocks/trigger`, null)
            .pipe(catchError((err: HttpErrorResponse) => {
                return throwError((err.error.message));
            }));
    }
}
