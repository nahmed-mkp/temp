import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { tap, filter, switchMap, catchError, take } from 'rxjs/operators';

import * as fromStore from '../store';

@Injectable()
export class SecMasterGlobalGuard implements CanActivate {

    constructor(private store: Store<fromStore.SecurityMasterState>) {
    }

    canActivate(): Observable<boolean> {
        return this.checkStore().pipe(
            switchMap(() => of(true)),
            catchError(() => of(false))
        );
    }

    checkStore(): Observable<boolean> {
        return this.store.select(fromStore.getGlobalSecMasterAssetClassMapLoadedStatus).pipe(
            tap((loaded) => {
                if (!loaded) {
                    this.store.dispatch(new fromStore.LoadAssetClassFieldMap());
                }
            }),
            take(1)
        );
    }
}


@Injectable()
export class SecMasterLookupsGuard implements CanActivate {

    constructor(private store: Store<fromStore.SecurityMasterState>) {
    }

    canActivate(): Observable<boolean> {
        return this.checkStore().pipe(
            switchMap(() => of(true)),
            catchError(() => of(false))
        );
    }

    checkStore(): Observable<boolean> {
        return this.store.select(fromStore.getGlobalSecMasterLookupsLoadedStatus).pipe(
            tap((loaded) => {
                if (!loaded) {
                    this.store.dispatch(new fromStore.LoadSecMasterLookups());
                }
            }),
            take(1)
        );
    }
}
