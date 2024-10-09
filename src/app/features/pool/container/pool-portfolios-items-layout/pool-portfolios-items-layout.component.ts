import { Component, OnInit, ViewChild, ElementRef, OnDestroy, HostBinding } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription, Subject, Observer } from 'rxjs';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { MatLegacyTabGroup as MatTabGroup, MatLegacyTab as MatTab } from '@angular/material/legacy-tabs';

import * as fromModels from './../../models';
import * as fromStore from './../../store';
import {
  CreateNewPortfolioPopupComponent,
  YieldbookQueueMonitorViewerComponent,
  UpdateRiskFreeRateDialogComponent,
} from '../../components';
// import { PoolPortfoliosLayoutComponent } from '../pool-portfolios-layout/pool-portfolios-layout.component';

@Component({
  selector: 'app-pool-portfolios-items-layout',
  templateUrl: './pool-portfolios-items-layout.component.html',
  styleUrls: ['./pool-portfolios-items-layout.component.scss']
})
export class PoolPortfoliosItemsLayoutComponent implements OnInit, OnDestroy {

  // UI ------------------------------------------------------------------
  public listOpen = false;
  public pinned = false;
  public selectedCusipCollection: {
    [portfolioId: string]: any
  } = {};
  public shortCutPortfolios: {
    cashPortfolio: number;
    deliverablePortfolio: number;
    tbaPortfolio: number;
  };
  public bidlistsViewMode$: Observable<boolean>;
  public activePortfolioIds$: Observable<any[]>;

  // Data ----------------------------------------------------------------
  public expressions$: Observable<fromModels.IBidlistParserExpression[]>;
  public expressionsLoading$: Observable<boolean>;
  public expressionsLoaded$: Observable<boolean>;
  public expressionsError$: Observable<string>;

  public bidlistPortfolio$: Observable<fromModels.IBidlistParserResult[]>;
  public bidlistPortfolioLoading$: Observable<boolean>;
  public bidlistPortfolioLoaded$: Observable<boolean>;
  public bidlistPortfolioError$: Observable<string>;

  public portfoliosSecuritiesSuperObservable$: Observable<any[]>;
  public portfoliosSecurities$ = new Subject<any[]>();
  public gridSize$: Observable<string>;
  public defaultScenarios$: Observable<fromModels.defaultScenario[]>;
  public portfoliosSecuritiesLoadingStatus$: Observable<boolean>;

  public lookups$: Observable<fromModels.ILookups>;
  public lookupsLoading$: Observable<boolean>;
  public lookupsLoaded$: Observable<boolean>;
  public lookupsError$: Observable<string>;

  public globalSettings$: Observable<fromModels.setting[]>;
  public severitySettings$: Observable<fromModels.setting[]>;
  public calibrationSettings$: Observable<fromModels.setting[]>;

  public poolLayouts$: Observable<fromModels.PoolItemsGridColumnLayout[]>;
  public poolLayoutsLoadingStatus$: Observable<boolean>;
  public poolViewerItemsGroupings$: Observable<fromModels.PoolItemGridRowGrouping[]>;
  public poolViewerItemsGroupingsLoadingStatus$: Observable<boolean>;

  public riskFreeRate$: Observable<number>;
  public riskFreeRateLoadingStatus$: Observable<boolean>;

  private subscriptions: Subscription[] = [];

  @ViewChild(MatTabGroup) tabsGroup: MatTabGroup;
  @ViewChild('tab') tabs: ElementRef;

  constructor(private store: Store<fromStore.State>, private dialog: MatDialog, private bottomSheet: MatBottomSheet) {}

  ngOnInit() {

    // UI
    this.subscriptions.push(this.store.select(fromStore.getShortcutPortfolios).subscribe(shortcutPortfolio => {
      this.shortCutPortfolios = shortcutPortfolio;
    }));
    this.bidlistsViewMode$ = this.store.select(fromStore.getBidlistsViewMode);
    this.activePortfolioIds$ = this.store.select(fromStore.getAgencyAnalyticsPoolViewerActivePortfolioId);

    // Lookups
    this.lookups$ = this.store.select(fromStore.getAgencyAnalyticsPoolViewerLookups);
    this.lookupsLoading$ = this.store.select(fromStore.getAgencyAnalyticsPoolViewerLookupsLoadingStatus);
    this.lookupsLoaded$ = this.store.select(fromStore.getAgencyAnalyticsPoolViewerLookupsLoadedStatus);
    this.lookupsError$ = this.store.select(fromStore.getAgencyAnalyticsPoolViewerLookupsError);

    // Add Cusips
    this.expressions$ = this.store.select(fromStore.getBidlistParserExpressions);
    this.expressionsLoading$ = this.store.select(fromStore.getBidlistParserExpressionsLoadingStatus);
    this.expressionsLoaded$ = this.store.select(fromStore.getBidlistParserExpressionsLoadedStatus);
    this.expressionsError$ = this.store.select(fromStore.getBidlistParserExpressionsError);

    this.bidlistPortfolio$ = this.store.select(fromStore.getBidlistParserSelectedPortfolio);
    this.bidlistPortfolioLoading$ = this.store.select(fromStore.getBidlistParserRequestLoading);
    this.bidlistPortfolioLoaded$ = this.store.select(fromStore.getBidlistParserRequestLoaded);
    this.bidlistPortfolioError$ = this.store.select(fromStore.getBidlistParserRequestError);
    // -- End of Add Cusips

    this.portfoliosSecuritiesSuperObservable$ = this.store.select(fromStore.getAgencyAnalyticsPoolSelectedPortfoliosSecurities);

    this.gridSize$ = this.store.select(fromStore.getAgencyAnalyticsPoolViewerGridSize);
    this.defaultScenarios$ = this.store.select(fromStore.getAgencyAnalyticsDefaultScenarios);

    this.globalSettings$ = this.store.select(fromStore.getAgencyAnalyticsConfigurationGlobalSettings);
    this.severitySettings$ = this.store.select(fromStore.getAgencyAnalyticsConfigurationSeveritySettings);
    this.calibrationSettings$ = this.store.select(fromStore.getAgencyAnalyticsConfigurationCalibrationSettings);

    this.poolLayouts$ = this.store.select(fromStore.getAgencyAnalyticsPoolItemsGridColumnsLayouts);
    this.poolLayoutsLoadingStatus$ = this.store.select(fromStore.getAgencyAnalyticsPoolItemsGridColumnsLayoutsLoadingStatus);

    this.poolViewerItemsGroupings$ = this.store.select(fromStore.getAgencyAnalyticsPoolItemsGroupings);
    this.poolViewerItemsGroupingsLoadingStatus$ = this.store.select(fromStore.getAgencyAnalyticsPoolItemsGroupingsLoadingStatus);

    this.subscriptions.push(this.portfoliosSecuritiesSuperObservable$.subscribe(portfoliosSecuritiesArray => {
      this.portfoliosSecurities$.next(portfoliosSecuritiesArray);
      console.log('portfoliosSecuritiesArray', portfoliosSecuritiesArray);
      if (portfoliosSecuritiesArray.length > 0) { this.switchActiveTabToLast(); }
    }));
    this.portfoliosSecuritiesLoadingStatus$ = this.store.select(fromStore.getAgencyAnalyticsPoolPortfoliosSecuritiesLoadingStatus);

    this.riskFreeRate$ = this.store.select(fromStore.getAgencyAnalyticsRiskFreeRate);
    this.riskFreeRateLoadingStatus$ = this.store.select(fromStore.getAgencyAnalyticsRiskFreeRateLoadingStatus);

    // Create a new portfolio on lauch
    setTimeout(() => this.createNewPortfolio(), 100);
  }

  ngOnDestroy() {
    if (this.subscriptions.length > 0) {
      this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }
  }

  /******** Risk Free Rate Update  ********/

  updateRiskFreeRate() {
    const dialogRef = this.dialog.open(UpdateRiskFreeRateDialogComponent, {
      hasBackdrop: false,
      panelClass: 'event-analysis-pop-up-panel',
      width: '25rem',
      height: '18rem',
      data: {
        riskFreeRate: this.riskFreeRate$,
        riskFreeRateLoadingStatus: this.riskFreeRateLoadingStatus$
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(new fromStore.UpdateRiskFreeRate(result));
      }
    });
  }

  /******** UI Actions  ********/

  createNewPortfolio() {
    this.store.dispatch(new fromStore.CreateTempPortfolio());
  }

  savePortfolioAndResult() {
    this.dialog.open(CreateNewPortfolioPopupComponent);
  }

  removeActivePortfolio(portfolioId: string) {
    this.store.dispatch(new fromStore.RemoveActivePortfolio(portfolioId));
  }

  parseUserInputCusip(cusips: string, id: string | number) {
    if (typeof id === 'string') {
      this.store.dispatch(new fromStore.ParseUserInput({userInput: cusips, specifiedMethod: 'Best Match', portfolioGuid: id}));
    } else if  (typeof id === 'number') {
      this.store.dispatch(new fromStore.ParseUserInput({userInput: cusips, specifiedMethod: 'Best Match', portfolioId: id}));
    }
  }

  addCusipsToPortfolio(cusips: string[], id: string | number) {
    if (typeof id === 'string') {
      this.store.dispatch(new fromStore.LoadIndicativesFromUserInput({portfolioGuid: id, cusips: cusips}));
    } else if (typeof id === 'number') {
      this.store.dispatch(new fromStore.LoadIndicativesFromUserInput({portfolioId: id, cusips: cusips}));
    }
  }

  onExplodeMegaData(event) {
    this.store.dispatch(new fromStore.CreateTempPortfolioWithExplodeData({name: event.name, data: event.data}));
  }

  openYieldbookQueueMonitor() {
    this.bottomSheet.open(YieldbookQueueMonitorViewerComponent, {
      hasBackdrop: false,
      disableClose: true,
      panelClass: 'pool-side-panel'
    });
  }

  onSelectedCusip(cusip: any, portfolioId: string | number) {
    this.selectedCusipCollection[portfolioId] = cusip;
  }

  onloadShortcutPortfolio(event: string) {
    const targetPortfolioId = this.shortCutPortfolios[event];
    this.store.dispatch(new fromStore.AddActivePortfolio(targetPortfolioId));
    this.store.dispatch(new fromStore.LoadIndicativesFromUserInput({
      portfolioId: targetPortfolioId
      // cusips: []
    }));
    this.store.dispatch(new fromStore.LoadPortfolioYieldbookResult({
      portfolioId: targetPortfolioId,
      batchIds: []
    }));
  }

  onTogglebidlistsViewMode() {
    this.store.dispatch(new fromStore.ToggleBidlistsView());
    this.switchActiveTabToLast();
  }






  /****** Layout Functions ******/

  saveNewPoolLayout(newLayout: fromModels.PoolItemsGridColumnLayout) {
    this.store.dispatch(new fromStore.SavePoolViewerItemsColumnsLayout(newLayout));
  }

  saveNewPoolItemsGrouping(newGrouping: fromModels.PoolItemGridRowGrouping) {
    this.store.dispatch(new fromStore.SavePoolViewerItemsGrouping(newGrouping));
  }

  /****** Yieldbook Functions ******/

  /**
   * Runs sensitivities against the YB API
   */
  onRunPYCalc(event) {
    this.store.dispatch(new fromStore.RunPYCalc(event));
  }

  /**
   * Runs sensitivities against the YB API
   */
  onRunSensitivities(event) {
    this.store.dispatch(new fromStore.RunSensitivities(event));
  }

  /**
   * Runs Horizon analysis against the YB API
   */
  onRunHorizonAnalysis(event) {
    this.store.dispatch(new fromStore.RunHorizonAnalysis(event));
  }

  /**
   * Runs Model Validation against the YB API
   */
  onRunModelValidation(event) {
    this.store.dispatch(new fromStore.RunModelValidation(event));
  }
  

  // openPortfolioList() {
  //   this.dialog.open(PoolPortfoliosLayoutComponent, {
  //     hasBackdrop: false,
  //     panelClass: 'event-analysis-pop-up-panel',
  //     width: '30rem',
  //     height: '60rem',
  //     position: {
  //       top: '0px',
  //       left: '0px'
  //     }
  //   });
  // }

  togglePin(event) {
    this.pinned = event;
  }

  closeListPannel() {
    if (this.pinned === false) {
      this.listOpen = false;
    }
  }

  /****** Utility functions ******/

  switchActiveTabToLast() {
    const lastIndex = this.tabsGroup._tabs.length;
    this.tabsGroup.selectedIndex = lastIndex;
  }

  trackByFn(index, portfolioSecurities) {
    return portfolioSecurities.id;
  }
}
