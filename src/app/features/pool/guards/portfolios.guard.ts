import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { tap, filter, take, switchMap, catchError } from 'rxjs/operators';

import * as fromStore from './../store';

@Injectable({
  providedIn: 'root'
})
export class PortfoliosGuard implements CanActivate {

  constructor(private store: Store<fromStore.State>) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.loadPortfolios().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  loadPortfolios(): Observable<boolean> {
    return this.store.select(fromStore.getAgencyAnalyticsPoolViewerPortfolioLoadedStatus).pipe(
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(new fromStore.LoadPortfolios());
        }
      }),
      filter(loaded => !loaded),
      take(1)
    );
  }
}
