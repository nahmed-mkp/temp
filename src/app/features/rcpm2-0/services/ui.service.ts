
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable()
export class DataRetrievalMethodService {

    constructor(public client: HttpClient) { }

    public loadDataRetrievalMethod(): Observable<string> {
        return this.client
            .get<string>(`http://prizm-map.mkpcap.com/api/v1/position/use_sockets`)
            .pipe(catchError((err: HttpErrorResponse) => {
                return throwError((err.error.message));
            }));
    }

}
