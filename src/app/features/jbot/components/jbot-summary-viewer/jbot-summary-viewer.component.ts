import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { GridOptions, GridApi, ColumnApi, ColDef } from 'ag-grid-community';

import * as fromModels from '../../models';

@Component({
  selector: 'app-jbot-summary-viewer',
  templateUrl: './jbot-summary-viewer.component.html',
  styleUrls: ['./jbot-summary-viewer.component.scss']
})
export class JbotSummaryViewerComponent implements OnInit {

  @Input() plotData: fromModels.JbotSummaryGridData[];
  @Input() loadingStatus: boolean;

  @Output() onSelectItem = new EventEmitter<{instrument: string; signal: string}>();

  private gridApi: GridApi;
  private gridColumnApi: ColumnApi;

  public extraOption = {autoSizeColumns: true};
  public customGridOption: GridOptions = {

    columnDefs: [
      {headerName: 'Instrument', field: 'Instrument', cellClass: 'right-border', filter: 'agTextColumnFilter'},
      {headerName: 'JBotSignal', field: 'JBotSignal', cellClass: 'right-border', cellRenderer: this.customCellRender, cellStyle: this.customCellStyle},
      {headerName: 'JBotTechSignal', field: 'JBotTechSignal', cellClass: 'right-border', cellRenderer: this.customCellRender, cellStyle: this.customCellStyle},
      {headerName: 'JDataMonitorSignal', field: 'JDataMonitorSignal', cellClass: 'right-border', cellRenderer: this.customCellRender, cellStyle: this.customCellStyle},
    ],

    floatingFilter: true,
    sideBar: true,

    getContextMenuItems: (params) => {
      return ['copy', 'copyWithHeaders', 'separator', 'csvExport', 'excelExport'];
    },

    onCellDoubleClicked: params => {
      if (params.colDef.field !== 'Instrument') {
        this.onSelectItem.emit({instrument: params.data['Instrument'], signal: params.colDef.field});
      }
    }
  };


  constructor() {
    this.customGridCallBack = this.customGridCallBack.bind(this);
  }

  ngOnInit() {
  }

  customGridCallBack(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.ColumnApi;
    this.gridApi.closeToolPanel();
  }

  customCellRender(params) {
    if (params.value === 'NoSignal') {
      return '';
    } else if (params.value === 'Neutral') {
      return '-';
    } else {
      return params.value;
    }
  }

  customCellStyle(params) {
    if (params.value === 'Up') {
      return {'background': '#00ff0054'}
    } else if (params.value === 'Down') {
      return {'background': '#ff000075'}
    }
  }
}
