import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ColumnApi, GridApi, GridOptions } from 'ag-grid-community';

@Component({
  selector: 'app-process-monitor',
  templateUrl: './process-monitor.component.html',
  styleUrls: ['./process-monitor.component.scss'],
})
export class ProcessMonitorComponent implements OnInit, OnChanges {

  @Input() data: any[];
  @Input() loading: boolean;

  private gridApi: GridApi;
  private gridColumnApi: ColumnApi;

  public customGridOption: GridOptions = {

    defaultColDef: {
      filter: 'agTextColumnFilter',
      enableCellChangeFlash: false,
    },

    getRowNodeId: data => data.name,

    columnDefs: [
      {
        headerName: 'Process Name',
        field: 'name',
        cellStyle: { 'font-weight': 'bold' },
        sort: 'asc'
      },
      {
        headerName: 'Executing Machine',
        field: 'machine',
        cellStyle: { 'font-weight': 'bold' },
      },
      {
        headerName: 'Status',
        field: 'status',
        cellStyle: { 'font-weight': 'bold' },
      },
      {
        headerName: 'Time Last Updated',
        field: 'time',
        cellStyle: { 'font-weight': 'bold' },
      }
    ]

  };

  public extraOption = {
    autoSizeColumns: false
  };

  constructor() {
    this.customGridCallBack = this.customGridCallBack.bind(this);
   }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.data && changes.data.currentValue && this.gridApi) {
      this.gridApi.setRowData(changes.data.currentValue);
      this.gridApi.sizeColumnsToFit();
    }
  }

  customGridCallBack(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.ColumnApi;
  }

}
