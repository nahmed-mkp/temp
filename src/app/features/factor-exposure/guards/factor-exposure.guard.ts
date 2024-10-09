import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable, of, combineLatest } from 'rxjs';
import { tap, switchMap, catchError, take } from 'rxjs/operators';

import * as fromStore from './../store';

@Injectable()
export class FactorExposureGuard implements CanActivate {

    constructor(private store: Store<fromStore.FactorExposureState>) { }

    canActivate(): Observable<boolean> {
        return this.checkStore().pipe(
            switchMap(() => of(true)),
            catchError(() => of(false))
        );
    }

    checkStore(): Observable<boolean[]> {

        return combineLatest(
            this.store.select(fromStore.getDateDropdownLoaded),
            this.store.select(fromStore.getUserAccessLevel)
        ).pipe(
            tap(([dateDropdownLoaded, userAccessLevel]) => {
                if (!dateDropdownLoaded) {
                    this.store.dispatch(new fromStore.LoadDropdownDates());
                }
                if (!userAccessLevel) {
                    this.store.dispatch(new fromStore.CheckUserAccess());
                }
            }),
            take(1)
        );

    }
}


@Injectable()
export class UserSettingsGuard implements CanActivate {

    constructor(private store: Store<fromStore.FactorExposureState>) { }

    canActivate(): Observable<boolean> {
        return this.checkStore().pipe(
            switchMap(() => of(true)),
            catchError(() => of(false))
        );
    }

    checkStore(): Observable<boolean> {
        return this.store.select(fromStore.getUserSettingsLoaded).pipe(
            tap(loaded => {
                if (!loaded) {
                    this.store.dispatch(new fromStore.LoadSettings());
                }
            }),
            take(1)
        );
    }
}