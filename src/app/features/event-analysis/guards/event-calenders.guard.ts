import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { tap, filter, take, switchMap, catchError } from 'rxjs/operators';

import * as fromStore from './../store';

@Injectable()
export class EventCalenderGuard implements CanActivate {

    constructor(private store: Store<fromStore.state>) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.loadEventCalender().pipe(
          switchMap(() => of(true)),
          catchError(() => of(false))
        );
      }

    loadEventCalender(): Observable<boolean> {
        return this.store.select(fromStore.getEventCalendarsLoadedStatus).pipe(
            tap(loaded => {
              if (!loaded) {
                this.store.dispatch(new fromStore.LoadEventCalendars());
              }
            }),
            take(1)
          );
    }
}
