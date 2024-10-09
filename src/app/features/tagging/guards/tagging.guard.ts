import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable, of, combineLatest, EMPTY } from 'rxjs';
import { tap, switchMap, catchError, take, combineAll } from 'rxjs/operators';

import * as fromStore from './../store';

@Injectable()
export class TaggingLookupGuard implements CanActivate {

    constructor(private store: Store<fromStore.TaggingState>) { }

    canActivate(): Observable<boolean> {
        return this.checkStore().pipe(
            switchMap(() => of(true)),
            catchError(() => of(false))
        );
    }

    checkStore(): Observable<boolean> {
        return this.store.select(fromStore.getTaggingLookupsLoaded).pipe(
            tap((loaded) => {
                if (!loaded) {
                    this.store.dispatch(new fromStore.LoadTaggingLookups());
                }
            }),
            take(1)
        );
    }
}


@Injectable()
export class TagListGuard implements CanActivate {

    constructor(private store: Store<fromStore.TaggingState>) { }

    canActivate(): Observable<boolean> {
        return this.checkStore().pipe(
            switchMap(() => of(true)),
            catchError(() => of(false))
        );
    }

    checkStore(): Observable<boolean> {
        return this.store.select(fromStore.getTagsListLoaded).pipe(
            tap((loaded) => {
                if (!loaded) {
                    this.store.dispatch(new fromStore.LoadTagList());
                }
            }),
            take(1)
        );
    }
}
