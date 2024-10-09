import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { tap, take, switchMap, catchError } from 'rxjs/operators';

import * as fromStore from '../store';

@Injectable()
export class CovidUSStatesGuard implements CanActivate {

    constructor(private store: Store<fromStore.State>) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.loadUSStatesHistory().pipe(
            switchMap(() => of(true)),
            catchError(() => of(false))
        );
    }

    loadUSStatesHistory(): Observable<boolean> {
        return this.store.select(fromStore.getCovidUSStatesHistoryLoaded).pipe(
            tap(loaded => {
                if (!loaded) {
                    this.store.dispatch(new fromStore.LoadUSStatesHistory());
                }
            }),
            take(1)
        );
    }
}
