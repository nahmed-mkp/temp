import { Component, OnInit, HostBinding, Inject, OnDestroy } from '@angular/core';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { MatLegacyTabChangeEvent as MatTabChangeEvent } from '@angular/material/legacy-tabs';
import { Store } from '@ngrx/store';

import * as fromStore from '../../store';
import { Observable, Subscription } from 'rxjs';
import { GridApi } from 'ag-grid-community';



@Component({
  selector: 'app-pnl-attribution-report-layout',
  templateUrl: './pnl-attribution-report-layout.component.html',
  styleUrls: ['./pnl-attribution-report-layout.component.scss']
})
export class PnlAttributionReportLayoutComponent implements OnInit, OnDestroy {

  @HostBinding('class') class = 'vertical-flex-full-height';

  public startDate: Date;
  public endDate: Date;

  public reportData$: Observable<any[]>;
  public pods$: Observable<string[]>;
  public funds$: Observable<string[]>;
  public loading$: Observable<boolean>;

  public capitalReportData$: Observable<any[]>;
  public capitalReportDataLoading$: Observable<boolean>;

  public podCapitalReportData$: Observable<any[]>;
  public podCapitalReportDataLoading$: Observable<boolean>;

  public capitalEomReportData$: Observable<any[]>;
  public capitalEomReportDataLoading$: Observable<boolean>;

  public podCapitalEomReportData$: Observable<any[]>;
  public podCapitalEomReportDataLoading$: Observable<boolean>;

  private oldPod: string[] = [];
  private oldFund: string[] = [];
  private dateChange = true;
  private selectedTab = 'P&L';

  public selectedPods: string[] = [];
  public selectedFunds: string[] = [];


  public gridApi: GridApi;
  public capitalGridApi: GridApi;
  public podCapitalGridApi: GridApi;
  private subscriptions: Subscription[] = [];

  constructor(
    private store: Store<fromStore.PnlAttributionState>,
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<PnlAttributionReportLayoutComponent>
  ) { }

  ngOnInit() {
    this.startDate = new Date(this.data.startDate);
    this.endDate =  new Date(this.data.endDate);

    this.onRunReport();

    this.reportData$ = this.store.select(fromStore.getAttributionReportData);
    this.pods$ = this.store.select(fromStore.getAttributionReportPods);
    this.funds$ = this.store.select(fromStore.getAttributionReportFunds);
    this.loading$ = this.store.select(fromStore.getAttributionReportLoading);

    this.capitalReportData$ = this.store.select(fromStore.getAttributionCapitals);
    this.capitalReportDataLoading$ = this.store.select(fromStore.getCustomGroupingAttributesLoading);

    this.podCapitalReportData$ = this.store.select(fromStore.getAttributionPodCapital);
    this.podCapitalReportDataLoading$ = this.store.select(fromStore.getAttributionPodCapitalReportLoading);

    this.capitalEomReportData$ = this.store.select(fromStore.getAttributionCapitalEom);
    this.capitalReportDataLoading$ = this.store.select(fromStore.getAttributionCapitalEomReportLoading);

    this.podCapitalEomReportData$ = this.store.select(fromStore.getAttributionPodCapitalEom);
    this.podCapitalReportDataLoading$ = this.store.select(fromStore.getAttributionPodCapitalEomReportLoading);

    this.subscriptions.push(this.pods$.subscribe(pods => {
      if (this.selectedPods.length === 0 && pods.length > 0) {
        this.selectedPods = pods;
        this.selectedPods.sort();
      }
    }));
    this.subscriptions.push(this.funds$.subscribe(funds => {
      if ((this.selectedFunds.length === 0 && funds.length > 0)) {
        this.selectedFunds = funds;
        this.selectedFunds.sort();
        this.dateChange = false;
      }
    }));
  }

  ngOnDestroy() {
    if (this.subscriptions.length > 0) {
      this.subscriptions.forEach(sub => sub.unsubscribe());
    }
  }

  public onClose() {
    this.dialogRef.close();
  }

  public onRunReport() {
    if (this.selectedTab === 'P&L') {
      this.onRunFundReport();
    } else if (this.selectedTab === 'CrossPod Capitals (SOM)') {
      this.onRunCapitalsReport();
    } else if (this.selectedTab === 'Fund/Pod Capitals (SOM)') {
      this.onRunPodCapitalsReport();
    } else if (this.selectedTab === 'CrossPod Capitals (EOM)'){
      this.onRunCapitalsEomReport();
    } else if (this.selectedTab === 'Fund/Pod Capitals (EOM)'){
      this.onRunPodCapitalsEomReport();
    }
  }

  public onRunReportInitial() {
    this.store.dispatch(new fromStore.LoadPnlAttributionReport({
      startDate: this.startDate,
      endDate: this.endDate,
    }));
  }

  public onRunFundReport() {
    this.store.dispatch(new fromStore.LoadPnlAttributionReport({
      startDate: this.startDate,
      endDate: this.endDate,
      funds: this.selectedFunds,
      pods: this.selectedPods
    }));
  }

  public onRunCapitalsReport() {
    this.store.dispatch(new fromStore.LoadPnlAttributionCapitalReport({
      startDate: this.startDate,
      endDate: this.endDate,
      pods: this.selectedPods
    }));
  }

  public onRunPodCapitalsReport() {
    this.store.dispatch(new fromStore.LoadPnlAttributionPodCapitalReport({
      startDate: this.startDate,
      endDate: this.endDate,
      pods: this.selectedPods
    }));
  }

 public onRunCapitalsEomReport() {
    this.store.dispatch(new fromStore.LoadPnlAttributionCapitalEomReport({
      startDate: this.startDate,
      endDate: this.endDate,
      pods: this.selectedPods
    }));
  }

  public onRunPodCapitalsEomReport() {
    this.store.dispatch(new fromStore.LoadPnlAttributionPodCapitalEomReport({
      startDate: this.startDate,
      endDate: this.endDate,
      pods: this.selectedPods
    }));
  }

  public onReceiveGridApi(event: GridApi) {
    this.gridApi = event;
  }

  public onReceiveCapitalGridApi(event: GridApi) {
    this.capitalGridApi = event;
  }

  public onReceivePodCapitalGridApi(event: GridApi) {
    this.podCapitalGridApi = event;
  }

  public onDownloadReport() {

    if (this.selectedTab === 'P&L') {
      this.gridApi.exportDataAsCsv();
    } else if (this.selectedTab === 'CrossPod Capitals (SOM)') {
      this.capitalGridApi.exportDataAsCsv();
    } else if (this.selectedTab === 'Fund/Pod Capitals (SOM)') {
      this.podCapitalGridApi.exportDataAsCsv();
    } else if (this.selectedTab === 'CrossPod Capitals (SOM)'){
      this.capitalGridApi.exportDataAsCsv();
    } else if (this.selectedTab === 'Fund/Pod Capitals (SOM)'){
      this.podCapitalGridApi.exportDataAsCsv();
    } else if (this.selectedTab === 'CrossPod Capitals (EOM)') {
      this.capitalGridApi.exportDataAsCsv();
    } else if (this.selectedTab === 'Fund/Pod Capitals (EOM)') {
      this.podCapitalGridApi.exportDataAsCsv();
    }
  }

  public onDateChange() {
    this.dateChange = true;
  }

  public onTabChanged(event: MatTabChangeEvent) {
    this.selectedTab = event.tab.textLabel;
    this.onRunReport();
  }

}
