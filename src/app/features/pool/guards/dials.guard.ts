import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { tap, filter, take, switchMap, catchError } from 'rxjs/operators';

import * as fromStore from './../store';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class DialsGuard implements CanActivate {

  constructor(private store: Store<fromStore.State>) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.loadDials().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  loadDials(): Observable<boolean> {
    return this.store.select(fromStore.getAgencyAnalyticsDialsSetsLoadedStatus).pipe(
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(new fromStore.LoadDialsSets());
        }
      }),
      filter(loaded => !loaded),
      take(1)
    );
  }
}
