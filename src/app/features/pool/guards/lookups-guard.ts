import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { tap, filter, take, switchMap, catchError } from 'rxjs/operators';

import * as fromStore from './../store';

@Injectable({
    providedIn: 'root'
})
export class LookupsGuard implements CanActivate {

    constructor(private store: Store<fromStore.State>) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.loadAllLookups().pipe(
            switchMap(() => of(true)),
            catchError(() => of(false))
        );
    }

    loadAllLookups(): Observable<boolean> {
        return this.store.select(fromStore.getAgencyAnalyticsPoolViewerLookupsLoadedStatus).pipe(
            tap(loaded => {
                if (!loaded) {
                    this.store.dispatch(new fromStore.LoadAllLookups());
                }
            }),
            filter(loaded => !loaded),
            take(1)
        );
    }
}
