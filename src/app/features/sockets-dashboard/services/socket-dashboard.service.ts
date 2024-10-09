import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, EMPTY, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import * as fromModels from '../models';

@Injectable()
export class SocketService {
    constructor(private http: HttpClient) { }

    getSocketClients(): Observable<any> {
        return this.http
            .get<any[]>(`/sockets/api/v1/clients`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

}
