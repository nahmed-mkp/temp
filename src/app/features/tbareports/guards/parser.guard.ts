import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { tap, filter, switchMap, catchError, take } from 'rxjs/operators';

import * as fromState from '../store';

@Injectable()
export class ParserGuard implements CanActivate {

    constructor(private store: Store<fromState.TBAReportsState>) {
    }

    canActivate(): Observable<boolean> {
        return this.checkStore().pipe(
            switchMap(() => of(true)),
            catchError(() => of(false))
        );
    }

    checkStore(): Observable<boolean> {
        return this.store.select(fromState.getMissingDatesLoadedStatus).pipe(
            tap((loaded) => {
                if (!loaded) {
                    this.store.dispatch(new fromState.LoadMissingDates());
                }
            }),
            take(1)
        );
    }
}
