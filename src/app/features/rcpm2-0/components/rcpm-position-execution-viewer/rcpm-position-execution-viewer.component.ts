import { Component, OnInit, ChangeDetectionStrategy, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { GridApi, GridOptions, ColDef } from 'ag-grid-community';
import * as _ from 'lodash';

import { UtilityService } from 'src/app/services';

@Component({
  selector: 'app-rcpm-position-execution-viewer',
  templateUrl: './rcpm-position-execution-viewer.component.html',
  styleUrls: ['./rcpm-position-execution-viewer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RcpmPositionExecutionViewerComponent implements OnInit, OnChanges {

  @Input() data: any[];
  @Input() loadingStatus: boolean;
  @Input() filters: {[property: string]: number}[] = [];
  @Input() targetTrader: string;

  @Output() setTradersName = new EventEmitter<string[]>();

  private gridApi: GridApi;

  public customGridOption: GridOptions = {
    defaultColDef: {
      filter: 'agTextColumnFilter',
      enableRowGroup: true,
      // sortable: false,
      suppressSorting: true,
      cellStyle: params => {
        if (typeof params.value === 'number') {
          return {'justify-content': 'flex-end'}
        }
      },
      cellClass: 'righ-border-ag-cell',
      filterParams: {
        newRowsAction: 'keep'
      }
    },
    columnDefs: [
      {headerName: 'SecurityName', field: 'securityName', enablePivot: true},
      {headerName: 'BuySell', field: 'longShort', enablePivot: true},
      {headerName: 'Trade Notional', field: 'tradeNotional', aggFunc: 'sum', enableValue: true,
        valueFormatter: this.utilityService.formatNumberWithCommasAndDigit(0)},
      {headerName: 'ExecPrice', field: 'tradePrice', aggFunc: 'avg', enableValue: true,
        valueFormatter: this.utilityService.formatNumberWithCommasAdvance},
      {headerName: 'TicketCharges', field: 'ticketCharges',
        valueFormatter: this.utilityService.formatNumberWithCommasAndDigit(2)},
      {headerName: 'HairCut', field: 'hairCut'},
      {headerName: 'Trader', field: 'trader', enablePivot: true},
      {headerName: 'Broker', field: 'broker', enablePivot: true},
      {headerName: 'Custodian', field: 'custodian', enablePivot: true},
      {headerName: 'ExecFxRate', field: 'execFxRate'},
      {headerName: 'TradeDate', field: 'tradeDate', enablePivot: true,
        valueFormatter: params => params.value && params.value.split(" ")[0]
      },
      {headerName: 'SettleDate', field: 'settleDate', enablePivot: true,
        valueFormatter: params => params.value && params.value.split(" ")[0]
      }
      ,
      {headerName: 'LastUpdated', field: 'lastUpdated', sort: 'desc', sortable: true, suppressSorting: false, comparator: (valueA, valueB) => {
        const timeA = (new Date(valueA)).getTime();
        const timeB = (new Date(valueB)).getTime();
        return timeA - timeB;
      }},
      {headerName: 'Notional', field: 'notional', aggFunc: 'sum', enableValue: true,
        valueFormatter: this.utilityService.formatNumberWithCommasAndDigit(2)},
      {headerName: 'tradeVenue', field: 'tradeVenue', enablePivot: true},
      {headerName: 'sid', field: 'sid', hide: false, enablePivot: true},
      {headerName: 'tid', field: 'tid', hide: false, enablePivot: true},
      {headerName: 'fundID', field: 'fundID', hide: false, enablePivot: true},
      {headerName: 'podID', field: 'podID', hide: false, enablePivot: true},
      {headerName: 'positionId', field: 'positionId', hide: true, enablePivot: true},
      {headerName: 'crorderid', field: 'crorderid', hide: true, enablePivot: true},
      {headerName: 'executionId', field: 'executionId', hide: true, enablePivot: true},
    ],

    getRowNodeId: data => data['executionId'],

    statusBar: {
      statusPanels: [
      {statusPanel: 'agAggregationComponent'}
      ]
    },
    floatingFilter: true,
    rowClass: 'medium-row',
    rowHeight: 22,
    groupHeaderHeight: 24,
    headerHeight: 24,
    floatingFiltersHeight: 28,
    showToolPanel: true,
    suppressAggFuncInHeader: true,
    suppressColumnVirtualisation: true,
  };

  public extraOption = {autoSizeColumns: true};

  constructor(private utilityService: UtilityService) {
    this.customGridCallBack = this.customGridCallBack.bind(this);
  }

  ngOnInit() {}

  ngOnChanges (changes: SimpleChanges) {
    if (changes.filters && changes.filters.currentValue && this.gridApi && this.data) {
      if (this.filters.length === 0) {
        this.gridApi.setRowData(this.data);
        this.setTradersName.emit(this.getUniqueTradersName(this.data));
      } else {
        const filteredData = this.filterValue(this.filters);
        this.gridApi.setRowData(filteredData);
        this.setTradersName.emit(this.getUniqueTradersName(filteredData));
      }
    }

    if (changes.targetTrader && changes.targetTrader.currentValue && this.gridApi && this.data) {
      if (changes.targetTrader.currentValue === 'all') {
        this.gridApi.setQuickFilter('');
      } else {
        this.gridApi.setQuickFilter(changes.targetTrader.currentValue);
      }
    }

    if (changes.data && changes.data.currentValue) {

      if (this.gridApi && this.filters.length === 0) {
        this.gridApi.setRowData(this.data);
        this.setTradersName.emit(this.getUniqueTradersName(this.data));
      } else if (this.gridApi && this.filters.length > 0) {
        const filteredData = this.filterValue(this.filters);
        this.gridApi.setRowData(filteredData);
        this.setTradersName.emit(this.getUniqueTradersName(filteredData));
      }
    }
  }

  customGridCallBack(params) {
    this.gridApi = params.api;
    this.gridApi.closeToolPanel();

    if (this.data && this.filters.length === 0) {
      this.gridApi.setRowData(this.data);
      this.setTradersName.emit(this.getUniqueTradersName(this.data));
    } else if (this.gridApi && this.filters.length > 0) {
      const filteredData = this.filterValue(this.filters);
      this.gridApi.setRowData(filteredData);
      this.setTradersName.emit(this.getUniqueTradersName(filteredData));
    }
  }

  filterValue(filters: {[property: string]: number}[]) {
    let tempData = this.data;
    this.filters.forEach(filter => {
      const key = Object.keys(filter)[0];
      const value = filter[key];
      tempData = tempData.filter(item => item[key] === value);
    });
    return tempData;
  }

  getUniqueTradersName(data: any[]): string[] {
    const tradersName = _.uniqBy(data, 'trader').map(item => item.trader);
    return tradersName;
  }
}
