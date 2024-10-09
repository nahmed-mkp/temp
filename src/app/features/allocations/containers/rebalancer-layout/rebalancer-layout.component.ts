import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription, Subject } from 'rxjs';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { AppConfirmationComponent } from 'src/app/components';

import * as fromStore from '../../store';
import * as fromModels from './../../models';

@Component({
    selector: 'app-allocation-rebalancer-layout',
    templateUrl: './rebalancer-layout.component.html',
    styleUrls: ['./rebalancer-layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TradeNameAllocationRebalancerLayoutComponent implements OnInit, OnDestroy {

    // @ViewChild(MatSidenav, {static: false}) sidenav: MatSidenav;

    public selectedDate$: Observable<string>;

    public allocations$: Observable<any[]>;
    public allocationsLoading$: Observable<boolean>;
    public allocationsLoaded$: Observable<boolean>;
    public allocationsError$: Observable<string>;
    public strategyAllocation$: Observable<any>;

    public clientServicesTradeThemes$: Observable<any>;

    public pmPodDetails$: Observable<any>;
    public pmPodDetailsLoading$: Observable<boolean>;
    public pmPodDetailsLoaded$: Observable<boolean>;
    public pmPodDetailsError$: Observable<string>;
    public crossPodStratergyMapping$: Observable<any>;

    public creatingTradeName$: Observable<boolean>;
    public createdTradeName$: Observable<boolean>;
    public createTradeNameSuccessMessage$: Observable<string>;
    public createTradeNameFailureMessage$: Observable<string>;

    public multiAllocTradeNames$: Observable<fromModels.IMultiAllocTradeName[]>;
    public multiAllocTradeNamesLoading$: Observable<boolean>;
    public multiAllocTradeNamesLoaded$: Observable<boolean>;
    public multiAllocTradeNamesError$: Observable<string>;

    public multiAllocationSplit$: Observable<fromModels.IMultiAllocationSplit[]>;
    public multiAllocationSplitLoading$: Observable<boolean>;
    public multiAllocationSplitLoaded$: Observable<boolean>;
    public multiAllocationSplitError$: Observable<string>;
    public multiAllocationSplitStatus$: Observable<string>;

    public pms$ = new Subject();

    public pmPodDetailsSubscription$: Subscription;

    public tradeNameCreationVisibile = false;

    constructor(private store: Store<fromStore.AllocationsState>, private dialog: MatDialog) {

        this.selectedDate$ = this.store.select(fromStore.getRebalanceTradeNameSelectedDate);

        this.allocations$ = this.store.select(fromStore.getRebalanceTradeNameAllocations);
        this.allocationsLoading$ = this.store.select(fromStore.getRebalanceTradeNameAllocationsLoading);
        this.allocationsLoaded$ = this.store.select(fromStore.getRebalanceTradeNameAllocationsLoaded);
        this.allocationsError$ = this.store.select(fromStore.getRebalanceTradeNameAllocationsError);
        this.strategyAllocation$ = this.store.select(fromStore.getUniqueStrategyPercentage);

        this.clientServicesTradeThemes$ = this.store.select(fromStore.getClientServicesTradeThemes);

        this.pmPodDetails$ = this.store.select(fromStore.getTradeNamePMPodDetails);
        this.pmPodDetailsLoading$ = this.store.select(fromStore.getTradeNameDetailsLoading);
        this.pmPodDetailsLoaded$ = this.store.select(fromStore.getTradeNameDetailsLoaded);
        this.pmPodDetailsError$ = this.store.select(fromStore.getTradeNameDetailsError);
        this.crossPodStratergyMapping$ = this.store.select(fromStore.getCrossPodStratergyMapping);

        this.creatingTradeName$ = this.store.select(fromStore.getTradeNameCreatingTradeNameStatus);
        this.createdTradeName$ = this.store.select(fromStore.getTradeNameCreatedTradeNameStatus);
        this.createTradeNameSuccessMessage$ = this.store.select(fromStore.getTradeNameCreateTradeNameSuccessMessage);
        this.createTradeNameFailureMessage$ = this.store.select(fromStore.getTradeNameCreateTradeNameFailureMessage);

        this.multiAllocTradeNames$ = this.store.select(fromStore.getTradeNameMultipleAllocTradeNames);
        this.multiAllocTradeNamesLoading$ = this.store.select(fromStore.getTradeNameMultipleAllocTradeNamesLoading);
        this.multiAllocTradeNamesLoaded$ = this.store.select(fromStore.getTradeNameMultipleAllocTradeNamesLoaded);
        this.multiAllocTradeNamesError$ = this.store.select(fromStore.getTradeNameMultipleAllocTradeNamesError);

        this.multiAllocationSplit$ = this.store.select(fromStore.getTradeNameMultipleAllocationSplit);
        this.multiAllocationSplitLoading$ = this.store.select(fromStore.getTradeNameMultipleAllocationSplitLoading);
        this.multiAllocationSplitLoaded$ = this.store.select(fromStore.getTradeNameMultipleAllocationSplitLoaded);
        this.multiAllocationSplitError$ = this.store.select(fromStore.getTradeNameMultipleAllocationSplitError);
        this.multiAllocationSplitStatus$ = this.store.select(fromStore.getTradeNameMultipleAllocationSplitStatus);

        this.pmPodDetailsSubscription$ = this.pmPodDetails$
            .subscribe((pmPodDetails) => {
                if (pmPodDetails && pmPodDetails.pms) {
                    this.pms$.next(Object.keys(pmPodDetails.pms).map((key: string) => {
                        return pmPodDetails.pms[key];
                    }));
                }
            });
    }

    ngOnInit() {
        this.store.dispatch(fromStore.loadClientServicesTradeThemes())
    }

    ngOnDestroy() {
        if (this.pmPodDetailsSubscription$) {
            this.pmPodDetailsSubscription$.unsubscribe();
        }
    }

    changeDate(date: string): void {
        this.store.dispatch(new fromStore.LoadTradeNameAllocations(date));
    }

    reset(params: {date: string, isChanged: boolean}): void {
        if (params.isChanged) {
            const dialogRef = this.dialog.open(AppConfirmationComponent, {
                data: {
                    'title': 'Confirm reload',
                    'message': 'You have unsaved changes to the Tradename Allocations. Do you want to proceed?',
                    'showCancel': true,
                    'showOk': false,
                    'showConfirm': true
                }
            });

            dialogRef.afterClosed().subscribe(result => {
                if (result) {
                    this.store.dispatch(new fromStore.LoadTradeNameAllocations(params.date));
                }
            });
        } else {
            this.store.dispatch(new fromStore.LoadTradeNameAllocations(params.date));
        }
    }

    saveChanges(input: any[]): void {
        this.store.dispatch(new fromStore.SaveTradeNameAllocations(input));
    }

    loadPMPodDetails(input: any): void {
        this.store.dispatch(fromStore.loadPmPodDetails());
    }

    loadMultiAllocTradeNames(input: any): void {
        this.store.dispatch(fromStore.loadMultipleAllocTradeNames());
    }

    loadMultiAllocTradeName(payload: fromModels.IMultiAllocTradeName): void {
        this.store.dispatch(fromStore.loadMultipleAllocTradeNameSplit(payload));
    }

    createTradeName(param: fromModels.INewTradeName): void {
        this.store.dispatch(fromStore.createTradeName(param));
    }

    onCreateOrUpdateMultiAllocTradeName(payload: fromModels.INewOrUpdateMultiAllocTradeName) {
        if (payload.tid !== undefined) {
            this.store.dispatch(fromStore.updateMultipleAllocTradeNameSplit(payload));
        } else {
            this.store.dispatch(fromStore.createMultipleAllocTradeNameSplit(payload));
        }
    }
}
