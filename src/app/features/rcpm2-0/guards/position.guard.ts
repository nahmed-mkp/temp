import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable, of, combineLatest } from 'rxjs';
import { tap, switchMap, catchError, take } from 'rxjs/operators';

import * as fromStore from '../store';

@Injectable()
export class PositionGuard implements CanActivate {

    constructor(private store: Store<fromStore.RCPM2State>) { }

    canActivate(): Observable<boolean> {
        return this.checkStore().pipe(
            switchMap((res) => of(true)),
            catchError(() => of(false))
        );
    }

    checkStore(): Observable<boolean[]> {
        return combineLatest(
            this.store.select(fromStore.getPositionLookupsLoaded),
            this.store.select(fromStore.getPositionPresetLayoutLoaded),
            this.store.select(fromStore.getUserLayoutsCloudLoaded),
            this.store.select(fromStore.getPositionDatesLoaded),
            this.store.select(fromStore.getLatestPositionDateLoaded),
            this.store.select(fromStore.getUserLayoutAndConfigLoaded),
            this.store.select(fromStore.getDirectionalityInputLoaded),
            this.store.select(fromStore.getRegressionFactorsLoaded),
            this.store.select(fromStore.getNonlinearSupportGroupingLoaded),
            this.store.select(fromStore.getStaticLayoutsLoaded),
            this.store.select(fromStore.getDataSourcePermissionLoaded)
            // this.store.select(fromStore.getUserLockStatusLoaded),
        ).pipe(
            tap(([
                lookupsLoadedStatus,
                presetLayoutLoadedStatus,
                userLayoutCloudLoadedStatus,
                datesLoadedStatus,
                latestDateLoadedStatus,
                userLayoutAndConfigLoadedStatus,
                directionalityInputLoadedStatus,
                regressionFactorsLoadedStatus,
                nonlinearSupportGroupingLoadedStatus,
                staticLayoutsLoadedStatus,
                dataSourcePermissionLoadedStatus,
                // userLockStatusLoaded,
            ]) => {
                this.store.dispatch(new fromStore.LoadUserCustomizedLayout);
                this.store.dispatch(new fromStore.LoadUserCustomizedLayoutStyle);

                if (!lookupsLoadedStatus) {
                    this.store.dispatch(new fromStore.LoadPositionLookups());
                }
                if (!presetLayoutLoadedStatus)  {
                    this.store.dispatch(new fromStore.LoadPresetLayout);
                }
                if (!userLayoutCloudLoadedStatus) {
                    this.store.dispatch(new fromStore.LoadLayout());
                }
                if (!datesLoadedStatus) {
                    this.store.dispatch(new fromStore.LoadPositionDates);
                }
                if (!latestDateLoadedStatus) {
                    this.store.dispatch(new fromStore.ToggleLoadLatestPositionDate(true));
                    this.store.dispatch(new fromStore.LoadLatestPositionDate);
                }
                if (!userLayoutAndConfigLoadedStatus) {
                    this.store.dispatch(new fromStore.LoadConfigAndStyle())
                }
                if (!directionalityInputLoadedStatus) {
                    this.store.dispatch(new fromStore.LoadDirectionalityInputs);
                }
                if (!regressionFactorsLoadedStatus) {
                    this.store.dispatch(new fromStore.LoadRegressionFactors);
                }
                if (!nonlinearSupportGroupingLoadedStatus) {
                    this.store.dispatch(new fromStore.LoadNonlinearSupportGrouping);
                }
                if (!staticLayoutsLoadedStatus) {
                    this.store.dispatch(new fromStore.LoadStaticLayout);
                }
                if (!dataSourcePermissionLoadedStatus) {
                    this.store.dispatch(new fromStore.LoadDataSourcePermission)
                }
                // if (!userLockStatusLoaded) {
                //     this.store.dispatch(new fromStore.LoadUserLockStatus);
                // }
            }),
            take(1)
        )
    }
}