import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { MatLegacyTabChangeEvent as MatTabChangeEvent, MatLegacyTabGroup as MatTabGroup } from '@angular/material/legacy-tabs';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import * as fromStore from './../../store';
import * as fromMarketDataStore from './../../../../shared/custom/market-data-search/store';
import * as fromModels from './../../models';


@Component({
  selector: 'app-event-analysis-layout',
  templateUrl: './event-analysis-layout.component.html',
  styleUrls: ['./event-analysis-layout.component.scss']
})
export class EventAnalysisLayoutComponent implements OnInit, OnDestroy {

  @ViewChild('tabs') tabGroup: MatTabGroup;

  public preprocessingOptions$: Observable<fromModels.PreprocessOption[]>;
  public eventCalenders$: Observable<fromModels.ICalendar[]>;
  public marketDataProviders$: Observable<fromModels.MarketDataProvider[]>;
  // public selectedEventAnalysisDate$: Observable<string[]>;
  public selectedEventAnalysisDates: string[];

  public activeConfiguration$: Observable<fromModels.Configuration>;
  public activeConfigurationSubscription$: Subscription;
  public activeConfiguration: fromModels.Configuration;

  public activeTimeseriesAnalysisRecord$: Observable<fromModels.TimeseriesAnalysis>

  public activeMarketData$: Observable<any>;
  public activeMarketDataGridFormated$: Observable<any>;
  public activeMarketDataPlotFormated$: Observable<any>;
  public activeMarketDataLoadingStatus$: Observable<boolean>;

  public activeEventAnalysisEventPlotData$: Observable<any>;
  public activeEventAnalysisStatisticData$: Observable<any>;
  public activeEventAnalysisLoadingStatus$: Observable<boolean>;
  public activeEventAnalysisDatesColorCodes$: Observable<{[date: string]: string}>;

  public displayMode: 'collapse' | 'expand' = 'expand';

  public activeTab: string;
  private tabMapping = {
    'raw data': 0,
    'plot': 1,
    'event analysis': 2,
    'event statistics': 3
  };

  public visibilityInEventPlot$: Observable<{[series: string]: boolean}>;

  constructor(
    private store: Store<fromStore.EventAnalysisState>, 
    private marketDataStore: Store<fromMarketDataStore.MarketDataSearchState>,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
    ) {
    this.activeConfiguration$ = this.store.select(fromStore.getActiveConfigurationSetting);
    this.activeConfigurationSubscription$ = this.activeConfiguration$
      .subscribe((configuration) => {
          this.activeConfiguration = configuration;
          this.activeTab = this.route.snapshot.queryParams['activeTab'];
          this.selectedEventAnalysisDates = this.route.snapshot.queryParams['selectedDates'] && this.route.snapshot.queryParams['selectedDates'].split(',') || [];
          if (configuration) {
            this.updateRouting();
            if(this.activeTab) {
              const previousActiveTabIndex = this.tabGroup.selectedIndex;
              this.tabGroup.selectedIndex = this.tabMapping[this.activeTab];
              // special condition when index is 0 ------------
              if(previousActiveTabIndex===this.tabMapping[this.activeTab]) {
                const currentUrl = this.location.path().split('?')[0];
                // this.location.go(currentUrl, `configuration=${this.activeConfiguration.guid}&activeTab=${this.activeTab}&selectedDates=${this.selectedEventAnalysisDates}`);
                this.router.navigate([currentUrl], {queryParams: {
                  configuration: this.activeConfiguration.guid,
                  activeTab: this.activeTab,
                  selectedDates: this.selectedEventAnalysisDates.join()
                }});
                this.loadData();
              }
            } else {
              this.tabGroup.selectedIndex = 1;
            }
          }
      });

    // this.selectedEventAnalysisDate$ = this.store.select(fromStore.getSelectedEventAnalysisDate);
    this.activeTimeseriesAnalysisRecord$ = this.store.select(fromStore.getActiveTimeseriesAnalysis);

    // Meta data loading ----------------------------------------
    this.preprocessingOptions$ = this.store.select(fromStore.getPreprocessingOptionsEntities);
    this.eventCalenders$ = this.store.select(fromStore.getEventCalendars);
    this.marketDataProviders$ = this.marketDataStore.select(fromMarketDataStore.getMarketDataSearchProviders);

    // Analytical Data loading -----------------------------------
    this.activeMarketData$ = this.store.select(fromStore.getActiveEventAnalysisMarketData);
    this.activeMarketDataGridFormated$ = this.store.select(fromStore.getActiveEventAnalysisMarketDataGridFormated);
    this.activeMarketDataPlotFormated$ = this.store.select(fromStore.getActiveEventAnalysisMarketDataPlotFormated);
    this.activeMarketDataLoadingStatus$ = this.store.select(fromStore.getActiveEventAnalysisMarketDataLoadingStatus);

    this.activeEventAnalysisEventPlotData$ = this.store.select(fromStore.getActiveEventAnalysisEventPlotData);
    this.activeEventAnalysisStatisticData$ = this.store.select(fromStore.getActiveEventAnalysisStatisticData);
    this.activeEventAnalysisLoadingStatus$ = this.store.select(fromStore.getActiveEventAnalysisLoadingStatus);
    this.activeEventAnalysisDatesColorCodes$ = this.store.select(fromStore.getActiveEventAnalysisDateColorCode);

    this.visibilityInEventPlot$ = this.store.select(fromStore.getEventPlotSeriesVisibility);
  }

  ngOnInit() {
    this.store.dispatch(new fromStore.LoadTimeseriesAnalyses());

  }

  ngOnDestroy(): void {
      if (this.activeConfigurationSubscription$) {
        this.activeConfigurationSubscription$.unsubscribe();
      }
  }

  // Analysis records ----------------------------------------------------------------
  addNewAnalysis(payload: fromModels.TimeseriesAnalysis) {
    this.store.dispatch(new fromStore.AddTimeseriesAnalysis(payload));
  }


  // Configuration -------------------------------------------------------------------

  addConfiguration(payload: fromModels.Configuration): void {
    this.store.dispatch(new fromStore.AddConfiguration(payload));
  }

  updateConfiguration(payload: fromModels.Configuration): void {
    this.store.dispatch(new fromStore.UpdateConfiguration(payload));
  }

  restoreConfiguration() {
    this.store.dispatch(new fromStore.SetActiveGuid(null));
    this.store.dispatch(new fromStore.SetSelectedEventAnalysisDate([]));
    this.activeTab = undefined;
    this.selectedEventAnalysisDates = undefined;
    const currentUrl = this.location.path().split('?')[0];
    //this.location.go(currentUrl);
    this.router.navigate([currentUrl]);
    this.tabGroup.selectedIndex = 0;
  }

  changeRecordName(payload: fromModels.TimeseriesAnalysis) {
    this.store.dispatch(new fromStore.UpdateTimeseriesAnalysis(payload));
  }

  // Tab changes
  showSelectedTabContent(payload: MatTabChangeEvent): void {
    if (this.activeConfiguration) {
      this.activeTab = payload.tab.textLabel.toLowerCase();
      this.loadData();

      const tabIndex = payload.index
      const currentUrl = this.location.path().split('?')[0];
      // this.location.go(currentUrl, 
      //   `configuration=${this.activeConfiguration.guid}&activeTab=${this.activeTab}&selectedDates=${this.selectedEventAnalysisDates}`);
      this.router.navigate([currentUrl], {queryParams: {
        configuration: this.activeConfiguration.guid,
        activeTab: this.activeTab,
        selectedDates: this.selectedEventAnalysisDates.join()
      }});
    }
    
  }

  // UI changes
  selectedDatesChange(dates: string[]) {
    // this.store.dispatch(new fromStore.SetSelectedEventAnalysisDate(dates));
    // const path =  this.location.path();
    // if(path.includes('&selectedDates')) {
    //   const currentUrl = this.location.path().split('&selectedDates')[0];
    //   //this.location.go(currentUrl + `&selectedDates=${dates}`);
    //   this.router.navigate([currentUrl], {queryParams: {selectedDates: dates.join()}})
    // } else {
    //   this.router.navigate([path], {queryParams: {selectedDates: dates.join()}})
    // } 
    const currentUrl = this.location.path().split('?')[0];
    this.selectedEventAnalysisDates = dates;
    this.router.navigate([currentUrl], {queryParams: {
      configuration: this.activeConfiguration.guid,
      activeTab: this.activeTab,
      selectedDates: dates.join()
    }})
  }

  changeDisplayMode(mode: any) {
    if(this.displayMode === 'collapse') {
      this.displayMode = 'expand';
    } else {
      this.displayMode = 'collapse';
    }
  }

  private loadData(): void {
    switch (this.activeTab) {
      case 'raw data':
        this.store.dispatch(new fromStore.LoadRawData(this.activeConfiguration));
        break;
      case 'plot':
        this.store.dispatch(new fromStore.LoadRawData(this.activeConfiguration));
        break;
      case 'event analysis':
        this.store.dispatch(new fromStore.LoadEventAnalysis(this.activeConfiguration));
        break;
      case 'event statistics':
        this.store.dispatch(new fromStore.LoadEventAnalysis(this.activeConfiguration));
        break;
    }
  }

  onToggleVisibilityInEventPlot(payload) {
    // this.visibilityInEventPlot = payload;
    this.store.dispatch(new fromStore.SetEventPlotSeriesVisibility(payload));
  }

  // Routing Mechanism
  updateRouting(){
    const currentUrl = this.location.path();
    if(!currentUrl.includes('configuration')) {
      // this.location.go(currentUrl, `configuration=${this.activeConfiguration.guid}`);
      this.router.navigate([currentUrl], {queryParams: {configuration: this.activeConfiguration.guid}});
    } else {
      // this.location.go(currentUrl.split('?')[0], `configuration=${this.activeConfiguration.guid}`);
    }
  }

}
