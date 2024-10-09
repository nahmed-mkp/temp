import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { EMPTY, empty, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as fromStore from '../store';
import * as fromModel from '../models';
import { Injectable } from '@angular/core';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { Router } from '@angular/router';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

    constructor(private store: Store<fromStore.RootState>,
        private snackBar: MatSnackBar, private router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler, ): Observable<HttpEvent<any>> {
        return next.handle(request)
        .pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 403) {
                    this.router.navigate(['/app/unauthorized']);
                    return throwError('Unauthorized');
                    // this.snackBar.open('You are not authorized to view this page!', 'Close', {
                    //     duration: 3000,
                    //     horizontalPosition: 'center',
                    //     verticalPosition: 'top',
                    //     panelClass: 'unauthorized'
                    // });
                    // return throwError('Unauthorized');
                } else {

                    const errorMsg: fromModel.HttpError = {};
                    if (error.error instanceof ErrorEvent) {
                        console.log('this is client side error');
                        // errorMsg = `Error: ${error.error.message}`;
                        errorMsg.type = 'Client Side Error';
                        errorMsg.statusCode = 'N/A';
                        errorMsg.message = error.error.message;
                        errorMsg.timeStamp = (new Date()).toLocaleString();

                    } else {
                        // errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
                        errorMsg.type = 'Network Request Error';
                        errorMsg.statusCode = error.status;
                        errorMsg.message = error.message;
                        errorMsg.method = error.error.message || request.method;
                        errorMsg.reqPayload = request.body;
                        errorMsg.timeStamp = (new Date()).toLocaleString();
                        errorMsg.error = error.error;
                    }
                    this.store.dispatch(new fromStore.AddError(errorMsg));
                    return throwError(errorMsg);
                }
            })
        );
    }
}
