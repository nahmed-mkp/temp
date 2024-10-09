import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable, of, combineLatest } from 'rxjs';
import { tap, switchMap, catchError, take, combineAll, filter } from 'rxjs/operators';

import * as fromStore from './../store';

@Injectable()
export class TradeAgreementsGuard implements CanActivate {

    constructor(private store: Store<fromStore.AllocationsState>) { }

    canActivate(): Observable<boolean> {
        return this.checkStore().pipe(
            switchMap(() => of(true)),
            catchError(() => of(false))
        );
    }

    checkStore(): Observable<boolean> {
        return this.store.select(fromStore.getTradeAgreementsLoaded).pipe(
            tap(loaded => {
                if (!loaded) {
                    this.store.dispatch(new fromStore.LoadTradeAgreements());
                }
            }),
            take(1)
        );
    }
}
