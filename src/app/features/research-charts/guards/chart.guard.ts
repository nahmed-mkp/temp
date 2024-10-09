import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable, of, combineLatest } from 'rxjs';
import { tap, switchMap, catchError, take, combineAll, filter } from 'rxjs/operators';

import * as moment from 'moment';

import * as fromStore from './../store';
import * as fromModels from './../models';

@Injectable()
export class ResearchChartsGuard implements CanActivate {

    constructor(private store: Store<fromStore.ResearchChartsState>) { }

    canActivate(): Observable<boolean> {
        return this.checkStore().pipe(
            switchMap(() => of(true)),
            catchError(() => of(false))
        );
    }

    checkStore(): Observable<boolean> {
        return this.store.select(fromStore.getChartPacksLoaded).pipe(
            tap(loaded => {
                if (!loaded) {
                    this.store.dispatch(new fromStore.LoadChartPacks());
                }
            }),
            take(1)
        );
    }
}
