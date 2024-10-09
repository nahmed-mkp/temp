import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of, combineLatest } from 'rxjs';
import { Store } from '@ngrx/store';
import { tap, take, switchMap, catchError } from 'rxjs/operators';

import * as fromStore from './../store';

@Injectable()
export class OptionVolsGuard implements CanActivate {

    constructor(private store: Store<fromStore.State>) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.checkSupportedTickers().pipe(
          switchMap(() => of(true)),
          catchError(() => of(false))
        );
      }

    checkSupportedTickers(): Observable<any> {

      return combineLatest([
        this.store.select(fromStore.getOptionChainSupportedTickersLoaded),
        this.store.select(fromStore.getFuturesMappingLoaded),
        this.store.select(fromStore.getTradeSizingCapitalsLoadedStatus)
      ]).pipe(
        tap(([tickerLoadedStatus, mappingLoadedStatus, capitalLoadedStatus]) => {
          if (!tickerLoadedStatus) {
            this.store.dispatch(new fromStore.LoadSupportedTickers());
          }

          if (!mappingLoadedStatus) {
            this.store.dispatch(new fromStore.LoadFuturesMapping());
          }

          if (!capitalLoadedStatus) {
            this.store.dispatch(new fromStore.LoadSizingCapitals());
          }
        }),
        take(1)
      );
      // return this.store.select(fromStore.getOptionChainSupportedTickersLoaded).pipe(
      //     tap(loaded => {
      //       if (!loaded) {
      //         this.store.dispatch(new fromStore.LoadSupportedTickers());
      //       }
      //     }),
      //     take(1)
      //   );
    }
}