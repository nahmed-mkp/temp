import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable, of, combineLatest } from 'rxjs';
import { tap, switchMap, catchError, take, combineAll, filter } from 'rxjs/operators';

import * as moment from 'moment';

import * as fromStore from './../store';
import * as fromModels from './../models';

@Injectable()
export class OrderBookGuard implements CanActivate {

    constructor(private store: Store<fromStore.OrderBookState>) { }

    canActivate(): Observable<boolean> {
        return this.checkStore().pipe(
            switchMap(() => of(true)),
            catchError(() => of(false))
        );
    }

    checkStore(): Observable<boolean> {
        return this.store.select(fromStore.getOrderBookLoadedStatus).pipe(
            tap(loaded => {
                if (!loaded) {
                    const params: fromModels.IOrderBookParams = {'startDate': moment().subtract(1, 'years').toDate(), 'endDate': moment().toDate()};
                    this.store.dispatch(new fromStore.LoadOrders(params));
                    this.store.dispatch(new fromStore.LoadLookups());
                }
            }),
            take(1)
        );
    }
}
