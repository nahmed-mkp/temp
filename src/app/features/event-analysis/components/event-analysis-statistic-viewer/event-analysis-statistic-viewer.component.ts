import { Component, OnInit, Inject, Input, OnDestroy, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { GridOptions, ColDef, GridApi } from 'ag-grid-community';
import { MatLegacyDialog as MatDialog, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { Subscription, Subject } from 'rxjs';

import { EventAnalysisResultPopupComponent } from '../event-analysis-result-popup/event-analysis-result-popup.component';
import * as fromModels from './../../models';

@Component({
  selector: 'app-event-analysis-statistic-viewer',
  templateUrl: './event-analysis-statistic-viewer.component.html',
  styleUrls: ['./event-analysis-statistic-viewer.component.scss']
})
export class EventAnalysisStatisticViewerComponent implements OnInit, OnChanges {

  @Input() popUpMode: boolean;
  @Input() data: any;
  @Input() activeConfiguration: fromModels.Configuration;
  @Input() activeEventAnalysisLoadingStatus: boolean;
  @Input() activeTimeseriesAnalysisRecord: fromModels.TimeseriesAnalysis;

  @Output() changeRecordName = new EventEmitter<fromModels.TimeseriesAnalysis>();

  public customGridOption_ByTimesereies: GridOptions = {
    columnDefs: [
      {headerName: 'Name', field: 'name', filter: 'agTextColumnFilter', rowGroup: true, hide: true},
      {headerName: 'dayOffset', field: 'dayOffset', filter: 'agNumberColumnFilter', sort: 'asc'},
      {headerName: 'hitPct', field: 'hitPct', filter: 'agNumberColumnFilter', valueFormatter: params => params.value && params.value.toLocaleString(undefined, {maximumFractionDigits: 3})},
      {headerName: 'Mean', field: 'mean', filter: 'agNumberColumnFilter', valueFormatter: params => params.value && params.value.toLocaleString(undefined, {maximumFractionDigits: 3})},
      {headerName: 'Median', field: 'median', filter: 'agNumberColumnFilter', valueFormatter: params => params.value && params.value.toLocaleString(undefined, {maximumFractionDigits: 3})},
      {headerName: 'Min', field: 'min', filter: 'agNumberColumnFilter', valueFormatter: params => params.value && params.value.toLocaleString(undefined, {maximumFractionDigits: 3})},
      {headerName: 'Max', field: 'max', filter: 'agNumberColumnFilter', valueFormatter: params => params.value && params.value.toLocaleString(undefined, {maximumFractionDigits: 3})},
      {headerName: 'StdDev', field: 'stdDev', filter: 'agNumberColumnFilter', valueFormatter: params => params.value && params.value.toLocaleString(undefined, {maximumFractionDigits: 3})},
    ],

    floatingFilter: true
  }
  public customGridOption_byDate = {
    columnDefs: [],

    floatingFilter: true
  }
  public extraOption = {
    autoSizeColumns: true
  }
  public gridMode: string = 'timeseries';

  public gridApi_ByTimeseries: GridApi;
  public gridApi_ByDate: GridApi;
  public globalfilterValue: any;
  public editingRecordName: boolean = false;

  private popUpRef: MatDialogRef<EventAnalysisResultPopupComponent>;
  private subscription: Subscription;
  private newWindowViewing$ = new Subject<boolean>();
  // private gridApi: GridApi;
  private newCofDefs: ColDef[] = [];
  private tempRecordName: string;

  constructor(private dialog: MatDialog) {
    this.customGridCallBack_ByDate = this.customGridCallBack_ByDate.bind(this);
    this.customGridCallBack_ByTimeseries = this.customGridCallBack_ByTimeseries.bind(this);
  }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if(changes.data && changes.data.currentValue) {
      //create custom columns defs for byDate grid
      const keys = Object.keys(this.data.gridData[0]);
      this.newCofDefs = keys.map(key => {
        if(key === 'date') return {headerName: key, field: key, pinned: 'left'}
        else return {headerName: key, field: key, filter: 'agTextColumnFilter'}
      });

      if(this.gridApi_ByDate) this.gridApi_ByDate.setColumnDefs(this.newCofDefs);
    }

    if(changes.activeTimeseriesAnalysisRecord && changes.activeTimeseriesAnalysisRecord.currentValue) {
      this.tempRecordName = this.activeTimeseriesAnalysisRecord.name;
    }
  }

  ngOnDestroy() {
    if(this.subscription) this.subscription.unsubscribe();
  }

  onSwitchingGrid(mode: string) {
    this.gridMode = mode;
  }

  customGridCallBack_ByDate(params) {
    this.gridApi_ByDate = params.api;
    if(this.newCofDefs.length > 0) this.gridApi_ByDate.setColumnDefs(this.newCofDefs);
  }

  customGridCallBack_ByTimeseries(params) {
    this.gridApi_ByTimeseries = params.api;
  }

  // General UI function --------------------------------------------------------

  onPopup() {
    this.popUpRef = this.dialog.open(EventAnalysisResultPopupComponent, {
      data: 'statistics', 
      hasBackdrop: false,
      width: '100rem',
      height: '40rem',
      panelClass: 'event-analysis-pop-up-panel'
    });
    this.newWindowViewing$.next(true);

    this.subscription = this.popUpRef.afterClosed().subscribe(() => {
      this.newWindowViewing$.next(false);
    });
  }

  fitScreen() {
    if(this.gridMode === 'timeseries') this.gridApi_ByTimeseries.sizeColumnsToFit();
    if(this.gridMode === 'date') this.gridApi_ByDate.sizeColumnsToFit();
  }

  onChangeRecordName() {
    this.editingRecordName = false;
    delete this.activeTimeseriesAnalysisRecord.createdOn;
    this.activeTimeseriesAnalysisRecord.name = this.tempRecordName;
    this.changeRecordName.emit(this.activeTimeseriesAnalysisRecord);
  }

  onChangeToEditMode() {
    this.editingRecordName = true; 
  }

  onCancelChangeRecordName() {
    this.editingRecordName = false; 
    this.tempRecordName = this.activeTimeseriesAnalysisRecord.name
  }

  // Utility Func -------------------------------------------
  exportCSV() {
    if(this.gridMode === 'timeseries') {
      this.gridApi_ByTimeseries.exportDataAsCsv({
        fileName: `Event Analysis Statistics By Timeseries (${this.activeConfiguration.guid})`
      });
    }

    if(this.gridMode === 'date') {
      this.gridApi_ByDate.exportDataAsCsv({
        fileName: `Event Analysis Statistics By Date (${this.activeConfiguration.guid})`
      });
    }
  }

  globalFilter() {
    if(this.gridMode === 'timeseries') this.gridApi_ByTimeseries.setQuickFilter(this.globalfilterValue);
    if(this.gridMode === 'date') this.gridApi_ByDate.setQuickFilter(this.globalfilterValue);
  }

}
