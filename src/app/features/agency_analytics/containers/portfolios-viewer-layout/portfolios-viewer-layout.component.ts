import { Component, OnInit, ChangeDetectionStrategy, ViewChild, OnDestroy } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MatLegacyTabGroup as MatTabGroup, MatLegacyTabChangeEvent as MatTabChangeEvent } from '@angular/material/legacy-tabs';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { Store } from '@ngrx/store';

import * as fromStore from '../../store';
import * as fromModels from '../../models';
import { Observable, Subscription } from 'rxjs';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { YBCalcConfirmationDialogComponent } from '../../components/calc-confirmation-dialog/calc-confirmation-dialog.component';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { AgencyDialsLayoutComponent } from '../agency-dials-layout/agency-dials-layout.component';
import { L } from '@angular/cdk/keycodes';

@Component({
    selector: 'app-portfolios-viewer-layout',
    templateUrl: './portfolios-viewer-layout.component.html',
    styleUrls: ['./portfolios-viewer-layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PortfoliosViewerLayoutComponent implements OnInit, OnDestroy {

    @ViewChild('sidenav', { static: false }) sidenav: MatSidenav;
    @ViewChild('tabs', {static: false}) tabGroup: MatTabGroup;

    public sidePane: 'CreatePortfolio' | 'ViewPortfolios' | 'ViewDials' = 'CreatePortfolio';

    // Portfolios
    public mode$: Observable<"Live" | "Close">;
    public portfolios$: Observable<fromModels.IPortfolio[]>;
    public portfolioTree$: Observable<fromModels.TreeNode[]>;
    public expandedNodePaths$: Observable<string[]>;
    public portfoliosLoading$: Observable<boolean>;
    public portfoliosLoaded$: Observable<boolean>;
    public portfoliosError$: Observable<String>;

    // Lookups
    public lookups$: Observable<any>;
    public lookupsLoading$: Observable<boolean>;
    public lookupsLoaded$: Observable<boolean>;
    public lookupsError$: Observable<string>;

    // Security Validation
    public validSecurities$: Observable<fromModels.IValidSecurity[]>;
    public validatingSecurities$: Observable<boolean>;
    public validatedSecurities$: Observable<boolean>;
    public validatingSecuritiesError$: Observable<string>;

    // Portfolio Creation
    public newPortfolio$: Observable<fromModels.INewPortfolio | fromModels.IPortfolio>;
    public portfolioCreating$: Observable<boolean>;
    public portfolioCreated$: Observable<boolean>;
    public portfolioCreationError$: Observable<string>;

    // Loaded Portfolios
    public loadedPortfolios$: Observable<fromModels.IPortfolio[]>;

    // Active Portfolio
    public activePortfolio$: Observable<fromModels.IPortfolio>;    
    public activePortfolioGridViews$: Observable<fromModels.IGridViews>;
    public activePortfolioDetail$: Observable<fromModels.ISecurityDetail[]>;

    public selectedItems: {[id: string]: fromModels.ISecurityDetail[]} = {};
    public activePortfolioDetails: fromModels.ISecurityDetail[] = [];

    public subscriptions: Subscription[] = [];

    public portfolioMap: {[id: string]: fromModels.IPortfolio} = {};
    public activePortfolio: fromModels.IPortfolio = null;
    public activePortfolioDetail: fromModels.IPortfolioDetail = null;

    public mode: "Live" | "Close";
    public selectedIndex: number = 0;

    constructor(private store: Store<fromStore.AgencyAnalyticsState>, private dialog: MatDialog) {

        // Portfolios
        this.mode$ = this.store.select(fromStore.getMode);
        this.portfolios$ = this.store.select(fromStore.getPortfolios);
        this.portfolioTree$ = this.store.select(fromStore.getPortfoliosTree);
        this.expandedNodePaths$ = this.store.select(fromStore.getExpandedNodes);
        this.portfoliosLoading$ = this.store.select(fromStore.getPortfoliosLoading);
        this.portfoliosLoaded$ = this.store.select(fromStore.getPortfoliosLoaded);
        this.portfoliosError$ = this.store.select(fromStore.getPortfoliosError);
        this.subscriptions.push(this.mode$
            .subscribe((mode) => {
                this.mode = mode;
            }));

        // 
        this.lookups$ = this.store.select(fromStore.getAgencyLookups);
        this.lookupsLoading$ = this.store.select(fromStore.getAgencyLookupsLoading);
        this.lookupsLoaded$ = this.store.select(fromStore.getAgencyLookupsLoaded);
        this.lookupsError$ = this.store.select(fromStore.getAgencyLookupsError);

        // Security Validation
        this.validSecurities$ = this.store.select(fromStore.getValidSecurities);
        this.validatingSecurities$ = this.store.select(fromStore.getValidatingSecurities);
        this.validatedSecurities$ = this.store.select(fromStore.getValidatedSecurities);
        this.validatingSecuritiesError$ = this.store.select(fromStore.getValidatingSecuritiesError);

        // Portfolio Creation
        this.newPortfolio$ = this.store.select(fromStore.getNewPortfolio);
        this.portfolioCreating$ = this.store.select(fromStore.getPortfolioCreating);
        this.portfolioCreated$ = this.store.select(fromStore.getPortfolioCreated);
        this.portfolioCreationError$ = this.store.select(fromStore.getPortfolioCreationError);

        // Loaded Portfolios
        this.loadedPortfolios$ = this.store.select(fromStore.getLoadedPortfolios);
        this.subscriptions.push((this.loadedPortfolios$
            .subscribe((loadedPortfolios) => {
                if (loadedPortfolios) { 
                    loadedPortfolios.map((portfolio) => {
                        this.portfolioMap[portfolio.guid] = portfolio;
                    });
                    this.selectedIndex = Math.max(0, loadedPortfolios.length - 1);
                }
            })));

        // Active Portfolio
        this.activePortfolio$ = this.store.select(fromStore.getActivePortfolio);
        this.activePortfolioDetail$ = this.store.select(fromStore.getActivePortfolioDetail);
        this.activePortfolioGridViews$ = this.store.select(fromStore.getActivePortfolioGridViews);
        this.subscriptions.push((this.activePortfolio$
            .subscribe((activePortfolio) => {
                if (activePortfolio) {     
                    this.activePortfolio = activePortfolio;
                }
            })));

        this.activePortfolioDetail$ = this.store.select(fromStore.getActivePortfolioDetail);
        this.subscriptions.push((this.activePortfolioDetail$
            .subscribe((securityDetails: fromModels.ISecurityDetail[]) => {
                this.activePortfolioDetails = securityDetails;                

            })));
    }

    ngOnInit(): void { }

    ngOnDestroy(): void {
        this.subscriptions.forEach((subscription) => {
            if (subscription) { 
                subscription.unsubscribe();
            }
        });
    }

    onModeChanged(e: MatSlideToggleChange): void {
        this.store.dispatch(new fromStore.ToggleLiveCloseMode());
    }

    onValidateSecurities(securities: string[]): void {
        this.store.dispatch(new fromStore.ValidateSecurities(securities));
    }

    onCreatePortfolio(portfolio: fromModels.INewPortfolio): void {
        this.store.dispatch(new fromStore.CreatePortfolio(portfolio));
    }

    onResetCreationState(): void {
        this.store.dispatch(new fromStore.ResetCreationState());
    }

    onLoadPortfolio(portfolio: fromModels.IPortfolio): void {
        this.sidenav.close();
        this.store.dispatch(new fromStore.LoadPortfolio(portfolio));
        this.store.dispatch(new fromStore.ResetCreationState());
    }

    onReloadPortfolio(portfolio: fromModels.IPortfolio): void {
        this.sidenav.close();
        this.store.dispatch(new fromStore.ReloadPortfolio(portfolio));
        this.store.dispatch(new fromStore.ResetCreationState());
    }

    onDeletePortfolio(portfolio: fromModels.IPortfolio): void {
        this.store.dispatch(new fromStore.DeletePortfolio(portfolio));
        this.store.dispatch(new fromStore.ResetCreationState());
    }

    onClosePortfolio(portfolio: fromModels.IPortfolio): void {
        this.store.dispatch(new fromStore.ClosePortfolio(portfolio));
    }

    onShowSidePanel(panelName: 'CreatePortfolio' | 'ViewDials' | 'ViewPortfolios'): void { 
        this.sidePane = panelName;        
        this.sidenav.open();
        switch(panelName) { 
            case 'CreatePortfolio':
                this.store.dispatch(new fromStore.ResetCreationState());
            case 'ViewPortfolios': 
                break;
            case 'ViewDials':
                break;
        }
    }

    onChangeSelectedViews(e: MatButtonToggleChange): void {
        const selectedViews = {'selectedViews': e.value};
        if (this.activePortfolio) { 
            this.store.dispatch(new fromStore.ChangePortfolioGridViews(this.activePortfolio, selectedViews));
        }
    }

    onActivateTab(event: MatTabChangeEvent): void {
        this.selectedIndex = event.index;
        const guid  = event.tab.textLabel;
        if (guid && guid in this.portfolioMap) { 
            const portfolio = this.portfolioMap[guid];
            this.store.dispatch(new fromStore.SelectPortfolio(portfolio));
        }
    }

    onExpandNode(node: fromModels.TreeNode): void {
        if (node) { 
            this.store.dispatch(new fromStore.ExpandNode(node));
        }
    }

    onCollapseNode(node: fromModels.TreeNode): void {
        if (node) {
            this.store.dispatch(new fromStore.CollapseNode(node));
        }
    }

    onUpdateSelectedItems(event: fromModels.IPortfolioSelection): void {
        this.selectedItems = Object.assign({}, this.selectedItems, {[event.guid]: event.items});
    }

    submitPYCalc(mode: string): void { 
        let selItems: fromModels.ISecurityDetail[] = [];
        let isPartial = false;
        debugger;
        if (this.activePortfolio) { 
            if (this.selectedItems[this.activePortfolio.guid] && this.selectedItems[this.activePortfolio.guid].length > 0) { 
                selItems = [...this.selectedItems[this.activePortfolio.guid]];
                isPartial = true;
            } else {
                selItems = [...this.activePortfolioDetails];
            }
            this.confirmJobSubmission(this.activePortfolio, selItems, isPartial, 'Price/Yield', mode);
        }
    }

    submitRoR(mode: string): void {        
        let selItems: fromModels.ISecurityDetail[] = [];
        let isPartial = false;
        if (this.activePortfolio) {
            if (this.selectedItems[this.activePortfolio.guid] && this.selectedItems[this.activePortfolio.guid].length > 0) {
                selItems = [...this.selectedItems[this.activePortfolio.guid]];
                isPartial = true;
            } else {
                selItems = [...this.activePortfolioDetails];
            }
            this.confirmJobSubmission(this.activePortfolio, selItems, isPartial, 'Scenario', mode);
        }
        
    }

    submitActVsProj(mode: string): void {
        let selItems: fromModels.ISecurityDetail[] = [];
        let isPartial = false;
        if (this.activePortfolio) {
            if (this.selectedItems[this.activePortfolio.guid] && this.selectedItems[this.activePortfolio.guid].length > 0) {
                selItems = [...this.selectedItems[this.activePortfolio.guid]];
                isPartial = true;
            } else {
                selItems = [...this.activePortfolioDetails];
            }
            this.confirmJobSubmission(this.activePortfolio, selItems, isPartial, 'Actual vs. Projected', mode);
        }
    }
    
    refreshPrices(): void { 
        if (this.activePortfolio) { 
            this.onLoadPortfolio(this.activePortfolio);
        }
    }

    viewDials(): void { 
        const dialogRef = this.dialog.open(AgencyDialsLayoutComponent, {
            hasBackdrop: true,
            disableClose: true,
            panelClass: 'event-analysis-pop-up-panel',
            width: '65rem',
            height: '50rem'
        });
        this.subscriptions.push(dialogRef.afterClosed().subscribe(result => {
            this.store.dispatch(new fromStore.ClearSelectedDial());
        })
        );
    }

    private confirmJobSubmission(port: fromModels.IPortfolio, items: fromModels.ISecurityDetail[], 
        isPartial: boolean, jobType: string, mode: string): void { 
        const dialogRef = this.dialog.open(YBCalcConfirmationDialogComponent, {
            hasBackdrop: true,
            panelClass: 'event-analysis-pop-up-panel',
            width: '80rem',
            height: '50rem',
            data: { 'portfolio': port, 'items': items, 'isPartial': isPartial, 'jobType': jobType, 'mode': mode }
        });
        this.subscriptions.push(dialogRef.afterClosed()
            .subscribe((result) => {
                if (result) { 
                    const portfolio: fromModels.IPortfolio = result.portfolio;
                    const confirmType: string = result.confirmType;
                    const items: fromModels.ISecurityDetail[] = result.items;
                    const isPartial: boolean = result.isPartial;
                    const jobType: string = result.jobType;
                    switch (jobType) { 
                        case 'Price/Yield':
                            if (isPartial) { 
                                if (confirmType === 'runNew') { 
                                    const filteredItems = items.filter((item) => !item.hasPYCalc);
                                    this.store.dispatch(new fromStore.RunPYCalcPartial({ 
                                        portfolioGuid: portfolio.guid, 
                                        securities: this.stripInputs(filteredItems)
                                    }));
                                } else {
                                    this.store.dispatch(new fromStore.RunPYCalc({ 
                                        portfolioGuid: portfolio.guid, 
                                        securities: this.stripInputs(items)
                                    }));
                                }                                
                            }
                            break;
                        case 'Scenario':
                            if (isPartial) {
                                if (confirmType === 'runNew') {
                                    const filteredItems = items.filter((item) => !item.hasPYCalc);
                                    this.store.dispatch(new fromStore.RunRoRPartial({
                                        portfolioGuid: portfolio.guid, 
                                        securities: this.stripInputs(filteredItems) 
                                    }));
                                } else {
                                    this.store.dispatch(new fromStore.RunRoR({
                                        portfolioGuid: portfolio.guid, 
                                        securities: this.stripInputs(items)
                                    }));
                                }
                            }
                            break;
                        case 'Actual vs. Projected':
                            if (isPartial) {
                                if (confirmType === 'runNew') {
                                    const filteredItems = items.filter((item) => !item.hasPYCalc);
                                    this.store.dispatch(new fromStore.RunActVsProjPartial({
                                        portfolioGuid: portfolio.guid,
                                        securities: this.stripInputs(filteredItems)
                                    }));
                                } else {
                                    this.store.dispatch(new fromStore.RunActVsProj({
                                        portfolioGuid: portfolio.guid, 
                                        securities: this.stripInputs(items)
                                    }));
                                }
                            }
                            break;
                    }
                }
            }));
    }

    private stripInputs(securities: fromModels.ISecurityDetail[] | fromModels.ISecurity[]): fromModels.ISecurityInput[] { 
        const result = [];

        return result;
    }
}
