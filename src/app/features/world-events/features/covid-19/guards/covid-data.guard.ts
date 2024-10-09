import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { tap, take, switchMap, catchError } from 'rxjs/operators';

import * as fromStore from '../store';

@Injectable()
export class CovidDataGuard implements CanActivate {

    constructor(private store: Store<fromStore.State>) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.loadData().pipe(
            switchMap(() => of(true)),
            catchError(() => of(false))
        );
    }

    loadData(): Observable<boolean> {
        return this.store.select(fromStore.getCovidCountryDataLoaded).pipe(
            tap(loaded => {
                if (!loaded) {
                    this.store.dispatch(new fromStore.LoadData());
                }
            }),
            take(1)
        );
    }
}
