import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import * as fromModels from './../models/login.models';
import { Observable, empty, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable()
export class LoginService {

    constructor(private client: HttpClient) { }

    login(payload: fromModels.IUserCredential): Observable<fromModels.IAuthenticatedUser> {
        return this.client
            .post<fromModels.IAuthenticatedUser>(`http://prizm-map.mkpcap.com/api/v1/auth/login`, payload)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    logout(): Observable<void> {
        return empty();
    }
}
