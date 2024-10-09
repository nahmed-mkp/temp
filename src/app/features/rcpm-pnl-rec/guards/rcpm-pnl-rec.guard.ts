import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable, of, combineLatest } from 'rxjs';
import { tap, switchMap, catchError, take } from 'rxjs/operators';

import * as fromStore from './../store';

@Injectable()
export class PnlRecGuard implements CanActivate {

    constructor(private store: Store<fromStore.RCPMPnlRecState>) {}

    canActivate(): Observable<boolean> {
        return this.checkStore().pipe(
            switchMap(() => of(true)),
            catchError(() => of(false))
        );
    }

    checkStore(): Observable<boolean[]> {
        return combineLatest(
            this.store.select(fromStore.getActiveDate),
            this.store.select(fromStore.getPnlRecDataLoaded),
            this.store.select(fromStore.getPosRecDataLoaded),
            this.store.select(fromStore.getPricerRecDataLoaded)
        ).pipe(
            tap(([activeDate, pnlRecLoaded, posRecloaded, pricerRecLoaded]) => {
                if (!pnlRecLoaded) {
                    this.store.dispatch(new fromStore.LoadPnlRecData(activeDate));
                }
                if (!posRecloaded) {
                    this.store.dispatch(new fromStore.LoadCRDPosRecData(activeDate));
                }

                if (!pricerRecLoaded) {
                    this.store.dispatch(new fromStore.LoadPricerRecData(activeDate));
                }
            }),
            take(1)
        );
    }
}
