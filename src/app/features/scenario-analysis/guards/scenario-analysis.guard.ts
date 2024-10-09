import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import * as fromStore from '../store'
import { Store } from '@ngrx/store';
import { Observable, of, combineLatest } from 'rxjs';
import { tap, switchMap, catchError, take, combineAll, filter } from 'rxjs/operators';


@Injectable()
export class ScenarioAnalysisGuard implements CanActivate {

    constructor(private store: Store<fromStore.ScenarioAnalysisState>) { }

    canActivate(): Observable<boolean> {
        return this.checkStore().pipe(
            switchMap(() => of(true)),
            catchError(() => of(false))
        );
    }

    checkStore(): Observable<boolean> {
        return of(true)
        // edit later as needed
    }
}