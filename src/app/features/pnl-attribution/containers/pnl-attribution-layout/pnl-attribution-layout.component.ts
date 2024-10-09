import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromStore from './../../store';
import * as fromModels from './../../models';
import { Observable, Subject, Subscription } from 'rxjs';
import { MatLegacyDialog as MatDialog, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { MatLegacyTabChangeEvent as MatTabChangeEvent, MatLegacyTabGroup as MatTabGroup } from '@angular/material/legacy-tabs';
import { combineLatest } from 'rxjs';
import { ColDef } from 'ag-grid-community';

import { UtilityService } from 'src/app/services';
import { PnlAttributionNewLayoutConfirmationDialogComponent } from '../pnl-attribution-new-layout-confirmation-dialog/pnl-attribution-new-layout-confirmation-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { PnlAttributionTabLayoutComponent } from '../pnl-attribution-tab-layout/pnl-attribution-tab-layout.component';

@Component({
    selector: 'app-pnl-attribution-layout',
    templateUrl: './pnl-attribution-layout.component.html',
    styleUrls: ['./pnl-attribution-layout.component.scss'],
    // changeDetection: ChangeDetectionStrategy.OnPush
})
export class PnlAttributionLayoutComponent implements OnInit, OnDestroy {

    @ViewChild(PnlAttributionTabLayoutComponent) tabLayout: PnlAttributionTabLayoutComponent;
    
    // UI ---------------------------------------------------------------------
    public readOnlyMode: boolean = false;
    public readOnlyMode$: Observable<boolean>

    public attributionRequest$: Observable<fromModels.IAttributionRequest>;
    public gridDisplayMode$: Observable<any>;
    // public selectedLayoutNames$: Observable<string[]>;
    public layoutNames$: Observable<string[]>;
    public layoutCollection$: Observable<any>;
    public layoutEntity$: Observable<any>;

    public reclassifyRepoToggleValue$: Observable<boolean>;
    public excludeFundingToggleValue$: Observable<boolean>;
    public includeBetaToggleValue$: Observable<boolean>;

    public commonGroupingsMainCategory$: Observable<string[]>;
    public commonGroupingsByCategory$: Observable<any>;

    private subscriptions: Subscription[] = [];
    private activeLayout: string;

    public activeAttributionRequest: fromModels.IAttributionRequest;
    public currentSelectedLayoutNames: string[] = []
    private dialogRef: MatDialogRef<PnlAttributionNewLayoutConfirmationDialogComponent>;
    
    
    constructor(private store: Store<fromStore.PnlAttributionState>, private utilityService: UtilityService, private dialog: MatDialog, private activatedRoute: ActivatedRoute) {}
    
    ngOnInit(): void { 

        this.store.dispatch(new fromStore.LoadCustomGroupingAttributes);
        this.store.dispatch(new fromStore.LoadLayout);
        this.store.dispatch(new fromStore.LoadDefaultGroupings);
        
        this.layoutNames$ = this.store.select(fromStore.getLayoutNames);
        this.layoutCollection$ = this.store.select(fromStore.getLayoutCollection);
        this.layoutEntity$ = this.store.select(fromStore.getLayoutEntity);

        // Ui ----------------------------------------------------------------------------
        this.subscriptions.push(this.store.select(fromStore.getActiveAttributionRequest).subscribe(request => {
            this.activeAttributionRequest = request;
        }));
        this.subscriptions.push(this.store.select(fromStore.getLayoutNames).subscribe(layoutNames => {
            this.currentSelectedLayoutNames = layoutNames;
        }));
        this.gridDisplayMode$ = this.store.select(fromStore.getActiveGridDisplayMode);
        this.subscriptions.push(this.store.select(fromStore.getActiveLayout).subscribe(layoutName => {
            this.activeLayout = layoutName;
        }));

        this.commonGroupingsMainCategory$ = this.store.select(fromStore.getCommonGroupingsMainCategory);
        this.commonGroupingsByCategory$ = this.store.select(fromStore.getCommonGroupingsByCategory);

        this.reclassifyRepoToggleValue$ = this.store.select(fromStore.getReclassifyRepoToggle);
        this.excludeFundingToggleValue$ = this.store.select(fromStore.getExcludeFundingToggle);
        this.includeBetaToggleValue$ = this.store.select(fromStore.getIncludeBetaAdjustmentToggle);

        this.subscriptions.push(this.activatedRoute.params.subscribe(params => {
            // console.log('route params', params);
            if (params && params.guid !== undefined) {
                this.readOnlyMode = true;
            } else {
                this.readOnlyMode = false;
            }
        }));
        this.readOnlyMode$ = this.store.select(fromStore.getReadOnlyMode);
    }

    ngOnDestroy(): void {
        if (this.subscriptions.length > 0) {
            this.subscriptions.forEach(sub => sub.unsubscribe()) 
        }
    }

    // Event -----------------------------------------------------------

    public runAttribution(request: fromModels.IAttributionRequest): void { 
        this.store.dispatch(new fromStore.SetAttributionRequest({layoutName: this.activeLayout, request: request}));
        this.store.dispatch(new fromStore.LoadPnlAttribution({request: request, layoutName: this.activeLayout}));
    }

    public tabChanged(tabName) : void {
        this.store.dispatch(new fromStore.SetActiveLayout(tabName));
    }
 
    public changeGridDisplayMode(mode) {
        this.store.dispatch(new fromStore.SetGridDisplayMode({layoutName: this.activeLayout, displayMode: mode}));
    }

    public openCreateNewLayoutDialog() {
        this.dialogRef = this.dialog.open(PnlAttributionNewLayoutConfirmationDialogComponent, {
            hasBackdrop: false,
            panelClass: 'event-analysis-pop-up-panel',
            width: '20rem',
            height: '15rem',
            data: {}
        });
        this.dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.tabLayout.switchActiveTabToLast();
            }
        })
    }

    public removeLayout(layoutName) {
        this.store.dispatch(new fromStore.RemoveSelectedLayout(layoutName));
    }

    public onSelectedLayout({layoutName, openNewTab}) {
        if (openNewTab) {
            this.store.dispatch(new fromStore.AddSelectedLayout(layoutName));
            this.tabLayout.switchActiveTabToLast();
        } else {
            const targetIndex = this.currentSelectedLayoutNames.indexOf(this.activeLayout);
            this.store.dispatch(new fromStore.ChangeSelectedLayout({targetLayout: layoutName, targetIndex: targetIndex}));
        }

        this.store.dispatch(new fromStore.SetActiveLayout(layoutName))
    }

    public onApplyCommonGrouping(grouping: string[]) {
        this.store.dispatch(new fromStore.UpdateLayoutGrouping({layoutName: this.activeLayout, grouping: grouping}));
        // if (this.activeAttributionRequest) {
        //     this.store.dispatch(new fromStore.LoadPnlAttribution({request: this.activeAttributionRequest, layoutName: this.activeLayout}));
        // }
    }

    public onToggleExcludeFunding(){
        this.store.dispatch(new fromStore.ToggleExcludeFunding());
    }

    public onToggleReclassifyRepo(){
        this.store.dispatch(new fromStore.ToggleReclassifyRepo());
    }

    public onToggleIncludeBetaAdjustment(){
        this.store.dispatch(new fromStore.ToggleBetaAdjustment());
    }

}
