import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { Subscription } from 'rxjs';
import * as fromStore from '../../store';
import { Store } from '@ngrx/store';
import { GridApi, GridOptions } from 'ag-grid-community';

@Component({
  selector: 'app-rcpm-missing-closes-dialog',
  templateUrl: './rcpm-missing-closes-dialog.component.html',
  styleUrls: ['./rcpm-missing-closes-dialog.component.scss']
})
export class RcpmMissingClosesDialogComponent implements OnInit, OnDestroy  {

  private subscriptions: Subscription[] = [];
  public missingCloses: any[];
  
  private gridApi: GridApi;
  public extraOption = { };

  constructor(@Inject(MAT_DIALOG_DATA) public data, public dialogRef: MatDialogRef<RcpmMissingClosesDialogComponent>, private store: Store<fromStore.RCPM2State>) {

  }

  ngOnInit(): void {
    this.subscriptions.push(this.store.select(fromStore.getMissingCloses).subscribe(closes => {
      this.missingCloses = closes;
    }))
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  public customGridOption: GridOptions = {
    defaultColDef: {
        filter: 'agTextColumnFilter',
        enableCellChangeFlash: false,
        floatingFilter: true
    },
    columnDefs: [
        {
            headerName: 'SID',
            field: 'SID',
            width: 70
        },
        {
            headerName: 'Security',
            field: 'Security',
            sort: 'asc',
            sortedAt: 2,
            width: 250
        },
        {
          headerName: 'Security Type',
          field: 'SecurityType',
          rowGroup: true,
          hide: true,
          sort: 'asc',
          width: 130,
          sortedAt: 1
        },
        {
          headerName: 'Notional',
          field: 'Notional',
          width: 70,
      },
      {
        headerName: 'MDID',
        field: 'MDID',
        width: 70
      },
      {
          headerName: 'Price',
          field: 'Price',
          width: 70
      },
    ],

    getRowNodeId: data => data['MDID'],

    deltaRowDataMode: true,

  };

  customGridCallBack(params) {
    this.gridApi = params.api;
  }

  onToggleChange(e){
    let showClosedPositions = e.checked ? 1 : 0;
    this.store.dispatch(new fromStore.LoadMissingCloses({
      asOfDate: this.data.asOfDate,
      showClosedPositions: showClosedPositions
    }))
  }
}
