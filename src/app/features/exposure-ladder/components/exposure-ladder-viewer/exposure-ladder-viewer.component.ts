import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, 
        OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { GridOptions, GridApi, ColumnApi } from 'ag-grid-community';
import moment from 'moment';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-exposure-ladder-viewer',
  templateUrl: './exposure-ladder-viewer.component.html',
  styleUrls: [ './exposure-ladder-viewer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ExposureLadderViewerComponent implements OnInit, OnDestroy, OnChanges {

  @Input() data: any[];

  public filteredData: any[] = [];
  public filteredCrossPods: any[] = [];
  public isFilterChecked: boolean = true;

  private gridApi: GridApi;
  private gridColumnApi: ColumnApi;
  private subscription: Subscription;

  public customGridOption: GridOptions = {
    columnDefs: [
      {
        headerName: 'IsFxHedged',
        field: 'IsFxHedged',
        enableValue: true,
        width: 115,
        rowGroup: true,
        enableRowGroup: true,
        cellStyle: { 'justify-content': "center" }
      },
      {
        headerName: 'Trade Name With Id',
        field: 'TradeNameWithId',
        rowGroup: true,
        hide: true,
        enableRowGroup: true,
        enableValue: true
      },
      {
        headerName: 'Currency',
        field: 'Currency',
        rowGroup: true,
        enableRowGroup: true,
        enableValue: true,
        width: 95 
      },

      { headerName: 'Fund Name',
        field: 'FundName',
        rowGroup: true,
        enableValue: true,
        enableRowGroup: true,
        width: 275
      },
      {
        headerName: 'Security Name',
        field: 'SecurityName',
        rowGroup: true,
        enableValue: true,
        enableRowGroup: true,
        width: 390
      },
      {
        headerName: 'CrossPod',
        field: 'CrossPodName',
        enableValue: true,
        rowGroup: true,
        enableRowGroup: true,
        width: 125
      },
      {
        headerName: 'AsOfDate',
        field: 'AsOfDate',
        enableValue: true,
        enableRowGroup: true,
        width: 100,
        valueFormatter: (params) => {
          if(params.value){
            return moment(params.value).format('MM/DD/YYYY')
          }
        }
      },
      {
        headerName: 'Maturity Date',
        field: 'MaturityDate',
        enableRowGroup: true,
        enableValue: true,
        width: 130,
        valueFormatter: (params) => {
          if(params.value){
            return moment(params.value).format('MM/DD/YYYY')
          }
        }
      },
      {
        headerName: 'Settle Date',
        field: 'SettleDate',
        pivot: true,
        enableValue: true,
        width: 105,
        enableRowGroup: true,
        valueFormatter: (params) => {
          if(params.value){
            return moment(params.value).format('MM/DD/YYYY')
          }
        },
        keyCreator: (params) => moment(params.value).format('MM/DD/YYYY')
      },
      {
        headerName: 'Native Exposure',
        field: 'NativeExposure',
        aggFunc: 'sum',
        enableValue: true,
        width: 110,
        maxWidth: 110,
        minWidth: 110
      },
      {
        headerName: 'USD Exposure',
        field: 'USDExposure',
        aggFunc: 'sum',
        enableValue: true,
        width: 100,
        maxWidth: 100,
        minWidth: 100
      }
    ],
    rowHeight: 16,
    rowClass:'small-row',
    onColumnPivotModeChanged: (params) => this.onPivotModeChanged(params),
    groupMultiAutoColumn: false,
    suppressAggFuncInHeader: true,
    floatingFilter: false,
    sideBar: 'columns',
    autoGroupColumnDef: {
      colId: 'grouping',
      pinned: 'left',
      headerName: '',
      width: 500,
      minWidth: 500,
      cellRendererParams: {
        suppressDoubleClickExpand: true,
        suppressEnterExpand: true,
        suppressCount: true,
      },
      cellClass: (params) => {
        if (params.node.field === 'SecurityName') {
          return 'no-row-expansion';
        } else {
          return '';
        }
      },
    },

    getContextMenuItems: (params) => {
      return [
        'copy',
        'copyWithHeaders',
        'separator',
        'csvExport',
        'excelExport'
      ];
    },
    
  };

  public extraOption = {};

  customGridCallBack(params: {api: GridApi, columnApi: ColumnApi}) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridColumnApi.setPivotMode(true);
  }

  constructor() {
    this.customGridCallBack = this.customGridCallBack.bind(this);
  }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges){
    if(changes.data.currentValue.length > 0){
      this.filteredData = changes.data.currentValue;
      this.filteredData.map(item => {
        if(!this.filteredCrossPods.includes(item.CrossPodName)){
          this.filteredCrossPods.push(item.CrossPodName);
        }
      })
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onToogleFxHedgeMode() {
    if(this.isFilterChecked){
      this.filteredData = this.filteredData.filter(val => val.IsFxHedged === 'FX Hedged')
    } else {
      this.filteredData = this.data;
    }
    this.isFilterChecked = !this.isFilterChecked;
  }

  onPodChange(params){
    if(params.value){
      if(this.isFilterChecked){
        this.filteredData = this.data;
      } else {
        this.filteredData = this.data.filter(val => val.IsFxHedged === 'Fx Hedged')
      }
    }
    if(!params.value.includes("any")){
      this.filteredData = this.filteredData.filter(item => params.value.includes(item.CrossPodName))
    }
  }

  onPivotModeChanged(params: {type: string, api: GridApi, columnApi: ColumnApi}){
    if(!params.columnApi.isPivotMode()){
      params.api.sizeColumnsToFit();
    }
  }

}
