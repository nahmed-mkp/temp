import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { tap, take, switchMap, catchError } from 'rxjs/operators';

import * as fromStore from './../store';

@Injectable()
export class CustomFunctionsGuard implements CanActivate {

    constructor(private store: Store<fromStore.state>) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.LoadCustomFunctions().pipe(
          switchMap(() => of(true)),
          catchError(() => of(false))
        );
      }

      LoadCustomFunctions(): Observable<boolean> {
        return this.store.select(fromStore.getCustomFunctionSetLoadedStatus).pipe(
            tap(loaded => {
              if (!loaded) {
                this.store.dispatch(new fromStore.LoadCustomFunctionSet());
              }
            }),
            take(1)
          );
    }
}
