import { Injectable } from '@angular/core';
import { Observable, of, empty, from } from 'rxjs';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError } from 'rxjs/operators';

import * as fromModels from './../../models/login.models';
import * as fromActions from './../actions/login.actions';
import * as fromServices from './../../services';

@Injectable()
export class LoginEffects {

    @Effect()
    login$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.LoginActionTypes.LOGIN),
            map((action: fromActions.Login) => action.payload),
            switchMap((payload: fromModels.IUserCredential) => {
                return this.loginService$
                    .login(payload)
                    .pipe(
                        map((res: fromModels.IAuthenticatedUser) => new fromActions.LoginComplete(res)),
                        catchError((err: string) => of(new fromActions.LoginFailed(err)))
                    );
            })
        );

    @Effect()
    loginComplete$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.LoginActionTypes.LOGIN_COMPLETE),
            map((action: fromActions.LoginComplete) => action.payload),
            switchMap((payload: fromModels.IAuthenticatedUser) => {
                this.authService$.setToken(payload);
                return empty();
            })
        );

    @Effect()
    loadUserFromLocalStorage$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.LoginActionTypes.LOAD_USER_FROM_LOCAL_STORAGE),
            switchMap(() => {
                const user = this.authService$.getCurrentUserFromLS();
                return from([user])
                    .pipe(
                        map((payload) => {
                            if (payload) {
                                return new fromActions.LoadUserFromLocalStorageComplete(payload);
                            } else {
                                return new fromActions.LoadUserFromLocalStorageFailed('User not found, please re-login');
                            }
                        })
                    );
            })
        );

    @Effect()
    loadUnconfirmedTransactions$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.LoginActionTypes.LOAD_USER_UNCONFIRMED_TRANSACTIONS),
            switchMap(() => {
                return this.authService$.loadUnconfirmedTransactions()
                    .pipe(
                        map((res: any) => new fromActions.LoadUsersUnconfirmedTransactionsComplete(res)),
                        catchError((err: string) => of(new fromActions.LoadUsersUnconfirmedTransactionsFailed(err)))
                    );
            })
        );

    @Effect()
    logout$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.LoginActionTypes.LOGOUT),
            switchMap(() => {
                this.authService$.removeToken();
                return of(new fromActions.LogoutComplete());
            })
        );

    constructor(
        private actions$: Actions,
        private loginService$: fromServices.LoginService,
        private authService$: fromServices.AuthService
    ) {}
}
