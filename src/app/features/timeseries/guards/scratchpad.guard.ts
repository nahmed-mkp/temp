import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable, of, combineLatest } from 'rxjs';
import { tap, switchMap, catchError, take, combineAll, filter } from 'rxjs/operators';

import * as fromStore from './../store';

@Injectable()
export class ScratchpadGuard implements CanActivate {

    constructor(private store: Store<fromStore.TimeseriesState>) { }

    canActivate(): Observable<boolean> {
        return this.checkStore().pipe(
            switchMap(() => of(true)),
            catchError(() => of(false))
        );
    }

    checkStore(): Observable<boolean> {
        return this.store.select(fromStore.getScratchpadDeleted).pipe(
            tap(loaded => {
                if (!loaded) {
                    this.store.dispatch(fromStore.deleteScratchpad('scratchpad'));
                }
            }),
            take(1)
        );
    }
}
