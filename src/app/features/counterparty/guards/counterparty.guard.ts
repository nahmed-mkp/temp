import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable, of, combineLatest } from 'rxjs';
import { tap, switchMap, catchError, take } from 'rxjs/operators';

import * as fromStore from './../store';

@Injectable()
export class CounterpartyCDSSpreadsGuard implements CanActivate {

    constructor(private store: Store<fromStore.ExposuresState>) { }

    canActivate(): Observable<boolean> {
        return this.checkStore().pipe(
            switchMap(() => of(true)),
            catchError(() => of(false))
        );
    }

    checkStore(): Observable<boolean> {
        return this.store.select(fromStore.getCounterpartyCDSSpreadsLoadedStatus).pipe(
            tap(loaded => {
                if (!loaded) {
                    this.store.dispatch(new fromStore.LoadCounterpartyCDSSpreads());
                }
            }),
            take(1)
        );
    }
}
