import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { EMPTY, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class CounterpartyExposureService {

    constructor(public client: HttpClient) { }

    public loadCounterpartyCDSSpreads(): Observable<any[]> {
        return this.client
            .get<any>(`http://prizm-map.mkpcap.com/api/v1/counterparty/cdsspreads`)
            .pipe(catchError((err: HttpErrorResponse) => {
                return throwError((err.error.message));
            }));
    }
}
