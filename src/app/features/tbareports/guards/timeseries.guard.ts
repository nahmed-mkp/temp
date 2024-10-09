import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { tap, filter, switchMap, catchError, take } from 'rxjs/operators';

import * as fromStore from '../store';

@Injectable()
export class TimeseriesGuard implements CanActivate {

    constructor(private store: Store<fromStore.TBAReportsState>) {
    }

    canActivate(): Observable<boolean> {
        return this.checkStore().pipe(
            switchMap(() => of(true)),
            catchError(() => of(false))
        );
    }

    checkStore(): Observable<boolean> {
        return this.store.select(fromStore.getTimeseriesLoadedStatus).pipe(
            tap((loaded) => {
                if (!loaded) {
                    this.store.dispatch(new fromStore.LoadTimeseries());
                }
            }),
            take(1)
        );
    }
}
