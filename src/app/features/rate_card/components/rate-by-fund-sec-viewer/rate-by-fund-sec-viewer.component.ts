import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { GridApi, ColumnApi, GridOptions, ValueSetterParams } from 'ag-grid-community';
import { RateCardCellRendererComponent } from '../rate-card-cell-renderer/rate-card-cell-renderer.component';

import * as fromStore from '../../store';
import * as fromModels from '../../models';
import moment from 'moment';

@Component({
  selector: 'app-rate-by-fund-sec-viewer',
  templateUrl: './rate-by-fund-sec-viewer.component.html',
  styleUrls: ['./rate-by-fund-sec-viewer.component.scss']
})
export class RateByFundSecurityViewerComponent implements OnChanges {

  @Input() editable: boolean;
  @Input() data: fromModels.IRateByFundAndSecurity[];
  @Input() dataLoading: boolean;
  @Input() selectedCurrencies: string[];
  @Input() selectedSecTypes: string[];

  @Output() saveSecurityEquityRateOverride: EventEmitter<fromModels.ISecurityEquityRateUpdate> = new EventEmitter<fromModels.ISecurityEquityRateUpdate>();
  @Output() requestRateAdminTimeseriesData: EventEmitter<fromModels.ITimeseriesRequest> = new EventEmitter<fromModels.ITimeseriesRequest>();

  private filteredData = [];
  private gridApi: GridApi;
  private gridColumnApi: ColumnApi;

  public extraOption = {sizeColumnsToFit: true};
  public customGridOption: GridOptions = {
    defaultColDef: {
        suppressMenu: true,
        cellClass: 'right-border-light',
        headerClass: 'ag-header-wrap',
        filter: 'agTextColumnFilter',
        editable: false,
        enableCellChangeFlash: false,
        flex: 1
    },
    frameworkComponents: {
      'RateCardCellRendererComponent': RateCardCellRendererComponent
    },
    context: this,
    floatingFilter: true,
    rowSelection: 'single',
    rowHeight: 16,
    rowClass:'small-row',
    getRowNodeId: data => `${data['SID']}${data['FundID']}`,
    getContextMenuItems: params => {
      const showRateHistory = {
        name: 'Show Rate History',
        action: () => this.showRateHistory(params)
      };
      return ['copy', 'copyWithHeaders'];
    },
    onRowClicked: (event) => {
      this.showRateHistory(event)
    },
    columnDefs: [
  
        { 
          headerName: 'As Of Date', 
          field: 'AsOfDate',
          maxWidth:80,
          // hide: true
        },
        { 
          headerName: 'Currency', 
          field: 'Currency',
          maxWidth:80,
          hide: true
        },
        {
          headerName: 'SID', 
          field: 'SID',
          hide: true,
        },
        { 
          headerName: 'Sec Name', 
          field: 'SecurityName'
        },
        { 
          headerName: 'Sec Type', 
          field: 'SecurityType',
          maxWidth: 80,
          hide: true          
        },
        {
          headerName: 'Alpha Port',
          field: 'Alpha Port',
          editable: (params) => params.context.editable,
          cellClass: ['yellow-background', 'right-border-light'],
          cellStyle: { 'justify-content': 'flex-end' },
          cellRenderer: 'RateCardCellRendererComponent',
          cellRendererParams: (params) => {
            return {
              'val': params.data[params.colDef.field],
              'override': params.data[params.colDef.field + '_override'],
              'position': params.data[params.colDef.field + '_position'],
              'isPercent': true
            }
          },
          valueGetter: params => {
            let value = params.data[params.colDef.field];
            let override = params.data[params.colDef.field + '_override'];
            return override || value;
          },
          valueFormatter: params => {
            return params.value ? params.value.toFixed(3) : '';
          },
          valueSetter: params => { 
            return this.setValue(params);
          }
        },
        {
          headerName: 'BluePearl',
          field: 'BluePearl',
          editable: (params) => params.context.editable,
          cellClass: ['yellow-background', 'right-border-light'],
          cellStyle: { 'justify-content': 'flex-end' },
          cellRenderer: 'RateCardCellRendererComponent',
          cellRendererParams: (params) => {
            return {
              'val': params.data[params.colDef.field],
              'override': params.data[params.colDef.field + '_override'],
              'position': params.data[params.colDef.field + '_position'],
              'isPercent': true
            }
          },
          valueGetter: params => {
            let value = params.data[params.colDef.field];
            let override = params.data[params.colDef.field + '_override'];
            return override || value;
          },
          valueFormatter: params => {
            return params.value ? params.value.toFixed(3) : '';
          },
          valueSetter: params => {
            return this.setValue(params);
          }
        },
        {
          headerName: 'Enhanced Opp',
          field: 'Enhanced Opportunity Master Fund',
          editable: (params) => params.context.editable,
          cellClass: ['yellow-background', 'right-border-light'],
          cellStyle: { 'justify-content': 'flex-end' },
          cellRenderer: 'RateCardCellRendererComponent',
          cellRendererParams: (params) => {
            return {
              'val': params.data[params.colDef.field],
              'override': params.data[params.colDef.field + '_override'],
              'position': params.data[params.colDef.field + '_position'],
              'isPercent': true
            }
          },
          valueGetter: params => {
            let value = params.data[params.colDef.field];
            let override = params.data[params.colDef.field + '_override'];
            return override || value;
          },
          valueFormatter: params => {
            return params.value ? params.value.toFixed(3) : '';
          },
          valueSetter: params => {
            return this.setValue(params);
          }
        },
        {
          headerName: 'GMMK',
          field: 'GMMK',
          editable: (params) => params.context.editable,
          cellClass: ['yellow-background', 'right-border-light'],
          cellStyle: { 'justify-content': 'flex-end' },
          cellRenderer: 'RateCardCellRendererComponent',
          cellRendererParams: (params) => {
            return {
              'val': params.data[params.colDef.field],
              'override': params.data[params.colDef.field + '_override'],
              'position': params.data[params.colDef.field + '_position'],
              'isPercent': true
            }
          },
          valueGetter: params => {
            let value = params.data[params.colDef.field];
            let override = params.data[params.colDef.field + '_override'];
            return override || value;
          },
          valueFormatter: params => {
            return params.value ? params.value.toFixed(3) : '';
          },
          valueSetter: params => {
            return this.setValue(params);
          }
        },
        {
          headerName: 'Opp Master',
          field: 'Opportunity Master Fund',
          editable: (params) => params.context.editable,
          cellClass: ['yellow-background', 'right-border-light'],
          cellStyle: { 'justify-content': 'flex-end' },
          cellRenderer: 'RateCardCellRendererComponent',
          cellRendererParams: (params) => {
            return {
              'val': params.data[params.colDef.field],
              'override': params.data[params.colDef.field + '_override'],
              'position': params.data[params.colDef.field + '_position'],
              'isPercent': true
            }
          },
          valueGetter: params => {
            let value = params.data[params.colDef.field];
            let override = params.data[params.colDef.field + '_override'];            
            return override || value;
          },
          valueFormatter: params => {
            return params.value ? params.value.toFixed(3) : '';
          },
          valueSetter: params => {
            return this.setValue(params);
          }
        }
    ],
  };
  
  constructor(private store: Store<fromStore.RateCardState>) { 
    this.customGridCallBack = this.customGridCallBack.bind(this);
  }
  ngOnChanges(changes: SimpleChanges): void {

    if(changes && changes.data && changes.data.currentValue && changes.data.currentValue.length > 0 && this.gridApi){
      this.filteredData = this.data;
      console.warn(this.data)
      this.applyFilters()
    }

    if (changes && changes.selectedCurrencies && changes.selectedCurrencies.currentValue && this.gridApi){
      this.filteredData = this.data;
      this.applyFilters()
    }

    if(changes && changes.selectedSecTypes && changes.selectedSecTypes.currentValue && changes.selectedSecTypes.currentValue.length > 0 && this.gridApi){
      this.filteredData = this.data;
      this.applyFilters()
    }
  }

  applyFilters() { 
    if (this.selectedCurrencies && this.selectedCurrencies.length > 0) {
      this.filterByCurrency();
    }
    if (this.selectedSecTypes && this.selectedSecTypes.length > 0) { 
      this.filterBySecTypes();
    }
  }

  filterBySecTypes() {
    if (this.filteredData) { 
      this.filteredData = this.filteredData.filter((row: fromModels.IRateByFundAndSecurity) => this.selectedSecTypes.includes(row.SecurityType));
      this.gridApi.setRowData([]);
      this.gridApi.setRowData(this.filteredData)
    }
  }

  filterByCurrency() {
    if (this.filteredData) { 
      this.filteredData = this.filteredData.filter((row: fromModels.IRateByFundAndSecurity) => this.selectedCurrencies.includes(row.Currency));
      this.gridApi.setRowData([]);
      this.gridApi.setRowData(this.filteredData);
    }
  }

  customGridCallBack(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  setValue(params: ValueSetterParams): boolean {
    const newVal = params.newValue;
    const oldVal = params.oldValue;
    const fundName = params.colDef.field;

    if (!newVal) {
      params.data[fundName + '_override'] = null;
      let payload: fromModels.ISecurityEquityRateUpdate = {
        "AsOfDate": params.data['AsOfDate'],
        'FundName': fundName,
        'SID': params.data['SID'],
        'RateOverride': null,
        LongShort: params.data['LongShort']
      };
      this.saveSecurityEquityRateOverride.emit(payload);
    } else {
      params.data[fundName + '_override'] = parseFloat(newVal);
      let payload: fromModels.ISecurityEquityRateUpdate = {
        "AsOfDate": params.data['AsOfDate'],
        'FundName': fundName,
        'SID': params.data['SID'],
        'RateOverride': parseFloat(newVal),
        LongShort: params.data['LongShort']
      };      
      this.saveSecurityEquityRateOverride.emit(payload);
    }
    return true;
  }

  showRateHistory(params){
    let payload: fromModels.ITimeseriesRequest = {
      end_date: moment(new Date()).format('MM-DD-YYYY'),
      start_date: moment(new Date()).subtract(3, 'months').format('MM-DD-YYYY'),
      sid: params.data['SID'],
      secName: params.data['SecurityName']
    }
    this.requestRateAdminTimeseriesData.emit(payload)
  }

}