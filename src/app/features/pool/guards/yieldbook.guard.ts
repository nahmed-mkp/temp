import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { tap, filter, take, switchMap, catchError } from 'rxjs/operators';

import * as fromStore from '../store';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class YielbookGuard implements CanActivate {

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
    return this.store.select(fromStore.getYieldbookRequestLogsLoadedStatus).pipe(
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(new fromStore.LoadYieldbookRequestLogsByDate(moment(new Date()).format('MM-DD-YYYY')));
        }
      }),
      filter(loaded => !loaded),
      take(1)
    );
  }
}
