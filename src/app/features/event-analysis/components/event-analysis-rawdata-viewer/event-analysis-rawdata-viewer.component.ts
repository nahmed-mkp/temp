import { Component, OnInit, Inject, Input, OnDestroy, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { GridOptions, GridApi, ColDef, ValueFormatterParams } from 'ag-grid-community';
import { MatLegacyDialog as MatDialog, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { Subscription, Subject } from 'rxjs';

import { EventAnalysisResultPopupComponent } from '../event-analysis-result-popup/event-analysis-result-popup.component';
import * as fromModels from './../../models';

@Component({
  selector: 'app-event-analysis-rawdata-viewer',
  templateUrl: './event-analysis-rawdata-viewer.component.html',
  styleUrls: ['./event-analysis-rawdata-viewer.component.scss']
})
export class EventAnalysisRawdataViewerComponent implements OnInit, OnDestroy, OnChanges {

  @Input() popUpMode: boolean;
  @Input() data: any[];
  @Input() activeConfiguration: fromModels.Configuration;
  @Input() activeMarketDataLoadingStatus: boolean;
  @Input() activeTimeseriesAnalysisRecord: fromModels.TimeseriesAnalysis;

  @Output() changeRecordName = new EventEmitter<fromModels.TimeseriesAnalysis>();

  public customGridOption: GridOptions = {
    columnDefs: [],

    floatingFilter: true
  };
  public extraOption = {
    autoSizeColumns: true
  };
  public globalfilterValue: any;

  public editingRecordName = false;

  private popUpRef: MatDialogRef<EventAnalysisResultPopupComponent>;
  private subscription: Subscription;
  private newWindowViewing$ = new Subject<boolean>();
  private gridApi: GridApi;
  private newCofDefs: ColDef[];
  private tempRecordName: string;

  constructor(private dialog: MatDialog) {
    this.customGridCallBack = this.customGridCallBack.bind(this);
  }

  ngOnInit() {}

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.data && changes.data.currentValue && changes.data.currentValue.length > 0) {
      const keys = Object.keys(this.data[0]);
      this.newCofDefs = keys.map(key => {
        if (key === 'Date') {
          return {
            headerName: key, field: key,
            valueFormatter: (params: ValueFormatterParams) => {
              const date = new Date(params.value);
              return date.toLocaleDateString();
            }
          };
        } else {
          return {headerName: key, field: key, valueFormatter: params => params.value};
        }
      });
      if (this.gridApi) {
        this.gridApi.setColumnDefs([]);
        this.gridApi.setColumnDefs(this.newCofDefs);
      }
    }

    if (changes.activeTimeseriesAnalysisRecord && changes.activeTimeseriesAnalysisRecord.currentValue) {
      this.tempRecordName = this.activeTimeseriesAnalysisRecord.name;
    }
  }

  customGridCallBack(params) {
    this.gridApi = params.api;
    if (this.newCofDefs) {
      this.gridApi.setColumnDefs([]);
      this.gridApi.setColumnDefs(this.newCofDefs);
    }
  }


  // General UI function --------------------------------------------------------

  onPopup() {
    this.popUpRef = this.dialog.open(EventAnalysisResultPopupComponent, {
      data: 'rawData',
      hasBackdrop: false,
      width: '60rem',
      height: '40rem',
      panelClass: 'event-analysis-pop-up-panel'
    });
    this.newWindowViewing$.next(true);

    this.subscription = this.popUpRef.afterClosed().subscribe(() => {
      this.newWindowViewing$.next(false);
    });
  }

  fitScreen() {
    this.gridApi.sizeColumnsToFit();
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
    this.tempRecordName = this.activeTimeseriesAnalysisRecord.name;
  }

  // Utility Func -------------------------------------------

  exportCSV() {
    this.gridApi.exportDataAsCsv({
      fileName: `Timeseries_Raw_Data(${this.activeConfiguration.guid})`
    });
  }

  globalFilter() {
    this.gridApi.setQuickFilter(this.globalfilterValue);
  }
}
