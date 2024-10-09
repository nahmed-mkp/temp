import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { tap, filter, take, switchMap, catchError } from 'rxjs/operators';

import * as fromStore from './../store';

@Injectable({
  providedIn: 'root'
})
export class RiskFreeRateGuard implements CanActivate {

    constructor(private store: Store<fromStore.State>) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.loadRiskFreeRate().pipe(
          switchMap(() => of(true)),
          catchError(() => of(false))
        );
      }
    
      loadRiskFreeRate(): Observable<boolean> {
        return this.store.select(fromStore.getAgencyAnalyticsRiskFreeRateLoadedStatus).pipe(
            tap(loaded => {
              if (!loaded) {
                this.store.dispatch(new fromStore.LoadRiskFreeRate());
              }
            }),
            take(1)
          );
    }
}