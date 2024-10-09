import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, empty, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class DividendService {

    constructor(private http: HttpClient) { }

    loadDividendInfo(payload): Observable<any[]> {
        return this.http
            .get<any[]>(`http://prizm-map.mkpcap.com/api/v1/secmaster/dividend_info/${payload}`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }
}