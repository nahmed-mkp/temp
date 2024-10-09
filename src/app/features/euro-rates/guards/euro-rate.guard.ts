import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable, of, combineLatest } from 'rxjs';
import { tap, switchMap, catchError, take, combineAll } from 'rxjs/operators';

import * as fromStore from './../store';

@Injectable()
export class EuroRateGuard implements CanActivate {

    constructor(private store: Store<fromStore.EuroRateState>) {}

    canActivate(): Observable<boolean> {
        return this.checkStore().pipe(
            switchMap(() => of(true)),
            catchError(() => of(false))
        );
    }

    checkStore(): Observable<boolean[]> {
        return combineLatest(
            this.store.select(fromStore.getloadedEuroRatesFileListStatus)
            // this.store.select(fromStore.getEuroRateRealTimeConnection),
        ).pipe(
            tap(([EuroRatesFileListLoaded]) => {
                if(!EuroRatesFileListLoaded) {
                    this.store.dispatch(new fromStore.LoadEuroRatesFileList())
                }
                // if(!euroRateRealTimeConnection) {
                //     this.store.dispatch(new fromStore.CreateEuroRateRealTimeConnection())
                // }
            }),
            take(1)
        )


        // return this.store.select(fromStore.getloadedEuroRatesFileListStatus).pipe(
        //     tap((loaded) => {
        //         if (!loaded) {
        //             this.store.dispatch(new fromStore.LoadEuroRatesFileList());
        //         }
        //     }),
        //     take(1)
        // );
    }
}