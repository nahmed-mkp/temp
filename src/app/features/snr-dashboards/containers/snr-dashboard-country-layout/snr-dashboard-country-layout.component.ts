import { Component, OnInit, Input, ViewChild, OnDestroy, SimpleChanges, OnChanges } from '@angular/core';
import { Observable, Subscription, Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { MatSelectionListChange, MatSelectionList } from '@angular/material/list';
// import { MatLegacySelectionListChange as MatSelectionListChange, MatLegacySelectionList as MatSelectionList } from '@angular/material/legacy-list';

import * as fromStore from './../../store';
import * as fromModels from './../../models';
import { SelectionModel } from '@angular/cdk/collections';
import { MatListOption } from '@angular/material/list';

@Component({
  selector: 'app-snr-dashboard-country-layout',
  templateUrl: './snr-dashboard-country-layout.component.html',
  styleUrls: ['./snr-dashboard-country-layout.component.scss']
})
export class SnrDashboardCountryLayoutComponent implements OnInit, OnDestroy, OnChanges {

  @ViewChild('chartGroupList', {static: true}) chartGroupList: MatSelectionList;
  @Input() country: fromModels.ICountry;

  // public macroRunLoading$: Observable<boolean>;
  // public macroRunLoaded$: Observable<boolean>;
  // public macroRunResultWithSelectedCountry: any[];
  // public macroRunQuarterlyGDP: any[];
  // public macroRunMonthlyGDP: any[];
  // public macroRunMonthlyInflation_core: any[];
  // public macroRunMonthlyInflation_headline: any[];
  // public macroRunQuarterlyGDPDecomposition: any[];
  // public macroRunMonthlyInflationDecomposition: any[];

  public macroRunResultChartGroupsWithSelectedCountry$: Observable<any[]>;

  public selectedChartGroups: any[] = [];
  public selectedChartGroup: any;

  public selectedChartData$: Observable<any>;
  public selectedChartDataLoading$: Observable<boolean>;
  public selectedChartDataLoaded$: Observable<boolean>;
  public selectedChartDataError$: Observable<string>;
  public selectedChartDataMissingFiles$: Observable<string[]>;

  public chartGroupSubscription: Subscription;

  public loadOnce = false;

  constructor(private store: Store<fromStore.State>) {
  }

  ngOnInit() {
    this.store.dispatch(new fromStore.GetChartGroupsByCountry(this.country));
    this.macroRunResultChartGroupsWithSelectedCountry$ = this.store.select(fromStore.getChartGroupByCountry(this.country.code));

    this.chartGroupSubscription = this.macroRunResultChartGroupsWithSelectedCountry$.subscribe((chartGroupList) => {
      if (chartGroupList && chartGroupList.length > 0) {
        this._loadChartGroup(chartGroupList[0].chartGroup);
      }
    });
    
    this.chartGroupList.selectedOptions = new SelectionModel<MatListOption>(false)
  }

  ngOnDestroy(): void {
    if (this.chartGroupSubscription) {
      this.chartGroupSubscription.unsubscribe();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    // if (changes && changes.selectedChartGroups && changes.selectedChartGroup.currentValue) {
    //   if (!this.loadOnce) {
    //     this._loadChartGroup(changes.selectedChartGroup.currentValue);
    //     this.loadOnce = true;
    //   }
    // }
  }

  onSelectionChange(event: MatSelectionListChange) {
    this.selectedChartGroup = this.chartGroupList.selectedOptions.selected.map(element => element.value)[0];
    this._loadChartGroup(this.selectedChartGroup.chartGroup);
  }

  private _loadChartGroup(chartGroup: any): void {
    this.store.dispatch(new fromStore.PrepareChartsByChartGroupsAndCountryAndDate({
      chartGroup: chartGroup,
      country: this.country,
    }));

    this.selectedChartData$ = this.store.select(fromStore.getChartDataDynamic(this.country.code, chartGroup));
    this.selectedChartDataLoading$ = this.store.select(fromStore.getChartDataLoadingDynamic(this.country.code, chartGroup));
    this.selectedChartDataLoaded$ = this.store.select(fromStore.getChartDataLoadedDynamic(this.country.code, chartGroup));
    this.selectedChartDataError$ = this.store.select(fromStore.getChartDataErrorDynamic(this.country.code, chartGroup));
    this.selectedChartDataMissingFiles$ = this.store.select(fromStore.getChartDataMissingFiles(this.country.code, chartGroup));
  }

}
