import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromStore from './../../store';
import * as fromModels from './../../models/capitals.models';
import { Observable, Subscription } from 'rxjs';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { CapitalsChangePreviewDialogComponent } from '../capitals-change-preview-dialog/capitals-change-preview-dialog.component';

@Component({
    selector: 'app-capitals-layout',
    templateUrl: './capitals-layout.component.html',
    styleUrls: ['./capitals-layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CapitalsLayoutComponent implements OnInit, OnDestroy {

    @ViewChild('sidenav') sidenav: MatSidenav;

    public fundComplexes$: Observable<string[]>;
    public capitalInput$: Observable<fromModels.ICapitalInput>;

    public capitalMatrixFunds$: Observable<string[]>;
    public capitalMatrix$: Observable<any[]>;
    public capitalMatrixNew$: Observable<any[]>;
    public capitalMatrixDiff$: Observable<any[]>;

    public capitalMatrixPct$: Observable<any[]>;
    public capitalMatrixPctNew$: Observable<any[]>;
    public capitalMatrixPctDiff$: Observable<any[]>;

    public capitalMatrixLoading$: Observable<boolean>;
    public capitalMatrixLoaded$: Observable<boolean>;
    public capitalMatrixError$: Observable<string>;

    public subscriptions$: Subscription[] = [];

    public sideNavOpen = false;
    public activeSideNav: 'flows' | 'history' | 'matrix' | 'tradeAllocation';

    public capitalInput: fromModels.ICapitalInput;

    // Flow------------------------------------------------
    public capitalFlowsInput$: Observable<fromModels.ICapitalFlowInput>;
    public fundCapitalFlows$: Observable<any[]>;
    public fundCapitalFlowsLoading$: Observable<boolean>;

    public podCapitalFlows$: Observable<any[]>;
    public podCapitalFlowsLoading$: Observable<boolean>;

    // History ------------------------------------------------------------
    public historyInput$: Observable<fromModels.ICapitalHistoryInput>;
    public fundMapping$: Observable<any>;
    public fundCapitalHistory$: Observable<any>;
    public fundCapitalHistoryLoading$: Observable<any>;
    public podCapitalHistory$: Observable<any>;
    public podCapitalHistoryLoading$: Observable<any>;


    constructor(private store: Store<fromStore.AllocationsState>, private dialog: MatDialog) {

        this.fundComplexes$ = this.store.select(fromStore.getCapitalsFundComplexes);

        this.capitalInput$ = this.store.select(fromStore.getCapitalsInput);
        this.capitalFlowsInput$ = this.store.select(fromStore.getCapitalFlowsInput);

        // Capital Matrices
        this.capitalMatrixFunds$ = this.store.select(fromStore.getCapitalMatrixFunds);
        this.capitalMatrix$ = this.store.select(fromStore.getCapitalMatrix);
        this.capitalMatrixNew$ = this.store.select(fromStore.getCapitalMatrixNew);
        this.capitalMatrixDiff$ = this.store.select(fromStore.getCapitalMatrixDiff);
        this.capitalMatrixPct$ = this.store.select(fromStore.getCapitalMatrixPct);
        this.capitalMatrixPctNew$ = this.store.select(fromStore.getCapitalMatrixPctNew);
        this.capitalMatrixPctDiff$ = this.store.select(fromStore.getCapitalMatrixPctDiff);
        this.capitalMatrixLoading$ = this.store.select(fromStore.getCapitalMatrixLoading);
        this.capitalMatrixLoaded$ = this.store.select(fromStore.getCapitalMatrixLoaded);
        this.capitalMatrixError$ = this.store.select(fromStore.getCapitalMatrixError);

        this.subscriptions$.push(this.capitalInput$.subscribe((input) => {
            if (!this.capitalInput) {
                this.store.dispatch(new fromStore.LoadCapitalMatrix(input));
            }
            this.capitalInput = input;
        }));

        // Flows -----------------------------------------------------------------------------
        this.fundCapitalFlows$ = this.store.select(fromStore.getFundCapitalFlows);
        this.fundCapitalFlowsLoading$ = this.store.select(fromStore.getFundCapitalFlowsLoading);

        this.podCapitalFlows$ = this.store.select(fromStore.getPodCapitalFlows);
        this.podCapitalFlowsLoading$ = this.store.select(fromStore.getPodCapitalFlowsLoading);

        // History ----------------------------------------------------------------------
        this.historyInput$ = this.store.select(fromStore.getCapitalHistoryInput);
        this.fundMapping$ = this.store.select(fromStore.getFundMapping);
        this.fundCapitalHistory$ = this.store.select(fromStore.getFundCapitalHistory);
        this.fundCapitalHistoryLoading$ = this.store.select(fromStore.getFundCapitalHistoryLoading);
        this.podCapitalHistory$ = this.store.select(fromStore.getPodCapitalHistory);
        this.podCapitalHistoryLoading$ = this.store.select(fromStore.getPodCapitalHistoryLoading);
    }

    ngOnInit(): void { }

    ngOnDestroy(): void {
        this.subscriptions$.map((subscription) => {
            subscription.unsubscribe();
        });
    }

    public changeParams(input: fromModels.ICapitalInput): void {
        this.capitalInput = input;
        this.store.dispatch(new fromStore.LoadCapitalMatrix(input));
    }

    public onOpenSideNav(screen) {
        this.activeSideNav = screen;
        this.sidenav.open();
    }

    public onChangeFlowsInput(event: fromModels.ICapitalFlowInput) {
        this.store.dispatch(new fromStore.LoadFundCapitalFlows(event));
        this.store.dispatch(new fromStore.LoadPodCapitalFlows(event));
    }

    public onChangeFundHistoryInput(event: fromModels.ICapitalHistoryInput) {
        this.store.dispatch(new fromStore.LoadFundCapitalHistory(event));
    }

    public onChangePodHistoryInput(event: fromModels.ICapitalHistoryInput) {
        this.store.dispatch(new fromStore.LoadPodCapitalHistory(event));
    }

    public onResetCapitalChanges(payload: fromModels.ICapitalInput): void {
        this.store.dispatch(new fromStore.ResetCapitalChanges(payload));
    }

    public onSaveCapitalChanges(payload: fromModels.ICapitalInput): void {
        if (payload) {
            const dialogRef = this.dialog.open(CapitalsChangePreviewDialogComponent, {
                height: '800px',
                width: '850px',
                data: {
                    payload: payload
                }
            });
        }
    }
}
