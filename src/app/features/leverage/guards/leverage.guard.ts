import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable, of, combineLatest } from 'rxjs';
import { tap, switchMap, catchError, take } from 'rxjs/operators';

import * as fromStore from './../store';

@Injectable()
export class LeverageGuard implements CanActivate {

    constructor(private store: Store<fromStore.LeverageState>) { }

    canActivate(): Observable<boolean> {
        return this.checkStore().pipe(
            switchMap(() => of(true)),
            catchError(() => of(false))
        );
    }

    checkStore(): Observable<boolean[]> {

        return combineLatest(
            this.store.select(fromStore.getSupportedGroupingsLoaded),
            this.store.select(fromStore.getLeverageDatesLoaded)
        ).pipe(
            tap(([supportGroupLoadedStatus, leverageDatesloadedStatus]) => {
                if (!supportGroupLoadedStatus) {
                    this.store.dispatch(new fromStore.LoadSupportedGroupings());
                }

                if (!leverageDatesloadedStatus) {
                    this.store.dispatch(new fromStore.LoadLeverageDate());
                }
            }),
            take(1)
        );

        // return this.store.select(fromStore.getSupportedGroupingsLoaded).pipe(
        //     tap(loaded => {
        //         if (!loaded) {
        //             this.store.dispatch(new fromStore.LoadSupportedGroupings());
        //         }
        //     }),
        //     take(1)
        // );
    }
}
