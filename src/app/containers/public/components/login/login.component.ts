import * as fromModels from './../../../../models/login.models';
import * as fromStore from './../../../../store';

import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit, OnDestroy {

    public loginForm: UntypedFormGroup;
    public username: UntypedFormControl = new UntypedFormControl('', [Validators.required]);
    public password: UntypedFormControl = new UntypedFormControl('', [Validators.required]);

    public returnUrl: string;
    public user$: Subscription;
    public error$: Subscription;
    public returnUrl$: Subscription;

    constructor(private route: ActivatedRoute,
        private store: Store<fromStore.RootState>,
        private snackbar: MatSnackBar) {

        this.returnUrl$ = this.route.queryParams.subscribe((params) => {
            if (params) {
                this.returnUrl = params['returnUrl'] || '/';
            } else {
                this.returnUrl = '/';
            }

        });

        this.error$ = this.store.select(fromStore.getAuthenticationError)
            .subscribe((err: string) => {
                if (err) {
                    this.snackbar.open(err, '', { duration: 3000 });
                }
            });

        this.user$ = this.store.select(fromStore.getAuthenticatedUser)
            .subscribe((user: fromModels.IAuthenticatedUser) => {
                if (user) {
                    this.snackbar.open(`Welcome back, ${user.name}!`, '', { duration: 3000 });
                    this.store.dispatch(new fromStore.Go({ path: [this.returnUrl] }));
                }
            });
    }

    ngOnInit(): void {
        this.loginForm = new UntypedFormGroup({username: this.username, password: this.password});
    }

    ngOnDestroy(): void {
        if (this.user$) {
            this.user$.unsubscribe();
        }
        if (this.error$) {
            this.error$.unsubscribe();
        }
    }

    submit(): void {
        const payload: fromModels.IUserCredential = {
            email: this.loginForm.controls['username'].value,
            password: this.loginForm.controls['password'].value
            };
        this.store.dispatch(new fromStore.Login(payload));
    }

    getUsernameErrorMessage(): string {
        return this.loginForm.controls['username'].hasError('required') ? 'Email is required' : '';
    }

    getPasswordErrorMessage(): string {
        return this.loginForm.controls['password'].hasError('required') ? 'Password is required' : '';
    }
}
