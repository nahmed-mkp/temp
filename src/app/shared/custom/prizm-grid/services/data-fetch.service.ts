import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import * as fromModels from './../models/data-fetch.models';
import { Observable, empty, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable()
export class DataFetchService {

    constructor(private client: HttpClient) { }

    fetchData(payload: fromModels.DataFetchRequest): Observable<any[]> {
        switch(payload.method.toLowerCase()) {
            case "get":
                return this.client
                    .get<any[]>(payload.uri)
                    .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
                break;
            case "post":
                return this.client
                    .post<any[]>(payload.uri, payload.payload)
                    .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
                break;
            case "put":
                return this.client
                    .put<any[]>(payload.uri, payload.payload)
                    .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
                break;

        }
        
    }
}
