import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable, of, combineLatest } from 'rxjs';
import { tap, switchMap, catchError, take } from 'rxjs/operators';

import * as fromStore from './../store';

@Injectable()
export class DriftGuard implements CanActivate {

    constructor(private store: Store<fromStore.DriftState>) { }

    canActivate(): Observable<boolean> {
        return this.checkStore().pipe(
            switchMap(() => of(true)),
            catchError(() => of(false))
        );
    }

    checkStore(): Observable<boolean> {
        return this.store.select(fromStore.getPositionDriftLoaded).pipe(
            tap(loaded => {
                if (!loaded) {
                    this.store.dispatch(new fromStore.LoadPositionsDrift({asOfDate: new Date(), threshold: 2.0, hideFXHedges: false, useDailyDrift: false}));
                }
            }),
            take(1)
        );
    }
}
