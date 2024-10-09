import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { Observable, Subscription } from 'rxjs';
import { GridOptions, GridApi } from 'ag-grid-community';

import * as fromStore from './../../store';
import * as fromModels from './../../models';


@Component({
  selector: 'app-risk-span-records-viewer-dialog',
  templateUrl: './risk-span-records-viewer-dialog.component.html',
  styleUrls: ['./risk-span-records-viewer-dialog.component.scss']
})
export class RiskSpanRecordsViewerDialogComponent implements OnInit, OnDestroy {

  public records$: Observable<fromModels.ReportRecord[]>;
  private activeRecordId: number;
  private subscription: Subscription;

  public customGridOption: GridOptions = {
    columnDefs: [
      {headerName: 'Report Name', field: 'reportName', checkboxSelection: true},
      {headerName: 'Upload Date', field: 'uploadDate', valueFormatter: params => (new Date(params.value)).toLocaleDateString()},
      {headerName: 'File Path', field: 'filePath'},
    ],
    onRowSelected: params => {
      const selectedRow = params.api.getSelectedRows();
      if(selectedRow.length > 0) {
        this.store.dispatch(new fromStore.SetActiveReportId(selectedRow[0].reportId));
      }
    }
  };
  public extraOption = {
    sizeColumnsToFit: true
  };
  private gridApi: GridApi;

  constructor(private store: Store<fromStore.RiskSpanState>,
              public dialogRef: MatDialogRef<RiskSpanRecordsViewerDialogComponent>
  ) {
    this.customGridCallBack = this.customGridCallBack.bind(this);
  }

  ngOnInit() {
    this.records$ = this.store.select(fromStore.getReports);
    this.store.select(fromStore.getActiveReportId).subscribe(recordId => {
      if(recordId) this.activeRecordId = recordId;
    })
    
  }

  ngOnDestroy() {
    if(this.subscription) this.subscription.unsubscribe();
  }

  onClose() {
    this.dialogRef.close();
  }

  customGridCallBack(params) {
    this.gridApi = params.api;
    this.gridApi.forEachNode(node => {
      node.setSelected(node.data.reportId === this.activeRecordId)
    })
  }

  // onSelectRecord() {
  //   const selectedRow = this.gridApi.getSelectedRows();
  //   if(selectedRow.length > 0) {
  //     this.store.dispatch(new fromStore.SetActiveReportId(selectedRow[0].reportId));
  //     this.onClose();
  //   }
  // }
}
