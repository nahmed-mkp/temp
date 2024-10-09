import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable, of, combineLatest, EMPTY } from 'rxjs';
import { tap, switchMap, catchError, take, combineAll } from 'rxjs/operators';

import * as fromStore from './../store';

@Injectable()
export class PnlAttributionReadonlyGuard implements CanActivate {

    constructor(private store: Store<fromStore.PnlAttributionState>) { }

    // canActivate(): Observable<boolean> {
    //     return this.checkStore().pipe(
    //         switchMap(() => of(true)),
    //         catchError(() => of(false))
    //     );
    // }

    // checkStore(): Observable<boolean[]> {
    //     return EMPTY;
    // }

    canActivate(next: ActivatedRouteSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if(next.params.guid) {

            if (next.queryParams['filter']) {
                const filterValue = decodeURI(next.queryParams['filter']);
                this.store.dispatch(new fromStore.SaveLayout({layoutName: 'Overview', info: {filterValue: filterValue}}));
            }

            if (next.queryParams['sort']) {
                const sortState_string = decodeURI(next.queryParams['sort']);
                const sortState = JSON.parse(sortState_string);
                this.store.dispatch(new fromStore.SaveLayout({layoutName: 'Overview', info: {sortState: sortState}}));
            }

            if (next.queryParams['display']) {
                const gridDisplayMode = JSON.parse(next.queryParams['display']);
                this.store.dispatch(new fromStore.SetGridDisplayMode({layoutName: 'Overview', displayMode: gridDisplayMode}))
            }

            this.store.dispatch(new fromStore.LoadPnlAttributionWithGuid(next.params.guid));
            this.store.dispatch(new fromStore.SetReadOnlyMode(true));
        }
        return of(true);
    }
}