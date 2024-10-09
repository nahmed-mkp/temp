import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { Observable, Subject, of, BehaviorSubject} from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { AuthService } from '../services';
import { MatLegacyDialog as MatDialog, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { AppUserLockConditionCheckDialogComponent } from '../components';

import * as fromStore from './../store';
import { Store } from '@ngrx/store';

@Injectable()
export class UserLockGuard implements CanActivate {

    // private communicateSubject: Subject<string> = new BehaviorSubject('checking');
    // private dialogRef: MatDialogRef<AppUserLockConditionCheckDialogComponent>;

    constructor(private router: Router,
        private authService: AuthService,
        private dialog: MatDialog,
        private store: Store<fromStore.RootState>) { }

    canActivate(): Observable<boolean> {
        return this.authService.checkUserLockStatus()
            .pipe(
                map((status) => {
                    this.store.dispatch(new fromStore.UpdateUserLockedStatus(status));
                    return true;
                }),
                catchError(error => {
                    return of(true);
                })
            );
    }
}
