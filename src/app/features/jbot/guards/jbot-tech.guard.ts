import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { tap, take, switchMap, catchError } from 'rxjs/operators';

import * as fromStore from './../store';

@Injectable()
export class JbotTechGuard implements CanActivate {

    constructor(private store: Store<fromStore.state>) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.loadAsOfDates().pipe(
          switchMap(() => of(true)),
          catchError(() => of(false))
        );
      }
    
      loadAsOfDates(): Observable<boolean> {
        return this.store.select(fromStore.getJbotTechAsOfDateLoaded).pipe(
            tap(loaded => {
              // console.log('i am here', loaded)
              if (!loaded) {
                this.store.dispatch(new fromStore.LoadJbotTechAsOfDate());
              }
            }),
            take(1)
          );
    }
}