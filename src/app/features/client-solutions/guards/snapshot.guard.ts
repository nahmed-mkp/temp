import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { tap, switchMap, catchError, take } from 'rxjs/operators';

import * as fromStore from '../store';

@Injectable()
export class SnapshotGuard implements CanActivate {

    constructor(private store: Store<fromStore.ClientSolutionsState>) {
    }

    canActivate(): Observable<boolean> {
        return this.checkStore().pipe(
            switchMap(() => of(true)),
            catchError(() => of(false))
        );
    }

    checkStore(): Observable<boolean> {
        return this.store.select(fromStore.getSnapshotMonthEndDatesLoadedStatus).pipe(
            tap((loaded) => {
                if (!loaded) {
                    this.store.dispatch(new fromStore.LoadSnapshotMonthEndDates());
                    this.store.dispatch(new fromStore.LoadSnapshotGroupings());
                    this.store.dispatch(new fromStore.LoadSnapshotEntitiesNameMap());
                }
            }),
            take(1)
        );
    }
}
