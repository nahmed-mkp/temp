import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable, of, combineLatest } from 'rxjs';
import { tap, switchMap, catchError, take, combineAll, filter } from 'rxjs/operators';

import * as fromStore from '../store';

@Injectable()
export class AgencyAnalyticsGuard implements CanActivate {

    constructor(private store: Store<fromStore.AgencyAnalyticsState>) { }

    canActivate(): Observable<boolean> {
        return this.checkStore().pipe(
            switchMap(() => of(true)),
            catchError(() => of(false))
        );
    }

    checkStore(): Observable<boolean> {
        return this.store.select(fromStore.getPortfoliosLoaded).pipe(
            tap(loaded => {
                if (!loaded) {
                    this.store.dispatch(new fromStore.LoadPortfolios());
                }
            }),
            take(1)
        );
    }
}

@Injectable()
export class AgencyAnalyticsLookupsGuard implements CanActivate {

    constructor(private store: Store<fromStore.AgencyAnalyticsState>) { }

    canActivate(): Observable<boolean> {
        return this.checkStore().pipe(
            switchMap(() => of(true)),
            catchError(() => of(false))
        );
    }

    checkStore(): Observable<boolean> {
        return this.store.select(fromStore.getAgencyLookupsLoaded).pipe(
            tap(loaded => {
                if (!loaded) {
                    this.store.dispatch(new fromStore.LoadLookups());
                }
            }),
            take(1)
        );
    }
}
