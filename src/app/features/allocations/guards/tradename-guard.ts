import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { tap, switchMap, catchError, take } from 'rxjs/operators';

import * as fromStore from '../store';
import * as moment from 'moment';

@Injectable()
export class TradeNameGuard implements CanActivate {

    constructor(private store: Store<fromStore.AllocationsState>) { }

    canActivate(): Observable<boolean> {
        return this.checkStore().pipe(
            switchMap(() => of(true)),
            catchError(() => of(false))
        );
    }

    checkStore(): Observable<boolean> {
        return this.store.select(fromStore.getTradeNameDetailsLoaded).pipe(
            tap(loaded => {
                if (!loaded) {
                    this.store.dispatch(fromStore.loadPmPodDetails());
                }
            }),
            take(1)
        );
    }
}
