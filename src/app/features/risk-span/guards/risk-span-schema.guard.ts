import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable, of, combineLatest } from 'rxjs';
import { tap, switchMap, catchError, take, combineAll, filter } from 'rxjs/operators';

import * as fromStore from './../store';

@Injectable()
export class RiskSpanSchemaGuard implements CanActivate {

    constructor(private store: Store<fromStore.RiskSpanState>) { }

    canActivate(): Observable<boolean> {
        return this.checkStore().pipe(
            switchMap(() => of(true)),
            catchError(() => of(false))
        );
    }

    checkStore(): Observable<boolean> {
        return this.store.select(fromStore.getRiskSpanSchemaLoadedStatus).pipe(
            tap(loaded => {
                if (!loaded) {
                    this.store.dispatch(new fromStore.LoadRiskSpanSchema());
                }
            }),
            take(1)
        );
    }
}