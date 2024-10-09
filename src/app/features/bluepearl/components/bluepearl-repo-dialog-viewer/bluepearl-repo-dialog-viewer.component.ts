import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import * as fromStore from '../../store';
import * as fromUtilityService from '../../services/utility.service';
import { Store } from '@ngrx/store';
import { ColDef, ColumnApi, GridApi, GridOptions } from 'ag-grid-community';
import moment from 'moment';

@Component({
  selector: 'app-bluepearl-repo-dialog-viewer',
  templateUrl: './bluepearl-repo-dialog-viewer.component.html',
  styleUrls: ['./bluepearl-repo-dialog-viewer.component.scss']
})
export class BluePearlRepoDialogViewerComponent implements OnInit, OnDestroy  {

  private gridApi: GridApi;
  private gridColumnApi: ColumnApi;
  public extraOption = { };

  public repoData: any[] = [];
  public secName: string = '';
  public colDefs: ColDef[] = [];
  
  public customGridOption: GridOptions = {
    defaultColDef: {
        filter: 'agTextColumnFilter',
        enableCellChangeFlash: false,
        floatingFilter: true,
        cellClass: "right-border-light",
        headerClass: "ag-header-wrap",
        sortable: true,
        editable: false,
    },
    columnDefs: this.generateColDefs(),
    getRowNodeId: data => data['SID'],
    deltaRowDataMode: true
  };

  constructor(@Inject(MAT_DIALOG_DATA) public data, public dialogRef: MatDialogRef<BluePearlRepoDialogViewerComponent>, private store: Store<fromStore.BluePearlState>) {
    this.repoData = this.data.repos;
    this.secName = this.data.secName
    this.colDefs = this.data.colDefs;
  }

  ngOnInit(): void {

  }
 
  ngOnDestroy(): void {
   
  }


  customGridCallBack(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.setColumnDefs(this.data.colDefs)
  }

  generateColDefs(): ColDef[]{
    let cols = this.data.colDefs;
    cols.map(col => {
      if(col.field === 'AvailableToTransfer' || col.field === 'FundId' || col.field === 'SID'){
        col.hide = true;
      }
      if(col.field === 'MaturityDate'){
        col.cellStyle = params => {return{'justify-content': 'flex-end', 'background-color': '#ffffce'}}
      }
    })
    return this.data.colDefs
  }

}
