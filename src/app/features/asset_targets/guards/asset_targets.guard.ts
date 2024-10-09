import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { tap, switchMap, catchError, take } from 'rxjs/operators';

import * as fromStore from '../store';

@Injectable()
export class AssetTargetsGuard implements CanActivate {

    constructor(private store: Store<fromStore.AssetTargetsState>) { }

    canActivate(): Observable<boolean> {
        return this.checkStore().pipe(
            switchMap(() => of(true)),
            catchError(() => of(false))
        );
    }

    checkStore(): Observable<boolean> {
        return this.store.select(fromStore.getAssetTargetsLoading).pipe(
            tap(loaded => {
                if (!loaded) {
                    this.store.dispatch(fromStore.loadAssetTargets('fv'));
                    this.store.dispatch(fromStore.loadAssetTargetTimeseries({assetType: 'fv', date: new Date()}));
                    this.store.dispatch(fromStore.getSupportedCalculatorCountries());
                }
            }),
            take(1)
        );
    }
}