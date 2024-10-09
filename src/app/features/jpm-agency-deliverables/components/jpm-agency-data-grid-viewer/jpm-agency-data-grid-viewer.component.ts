import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { GridApi, ColumnApi, GridOptions, CellValueChangedEvent } from 'ag-grid-community';
import * as fromStore from '../../store';
import * as fromModels from '../../models';
import { AppCustomGridCellCheckboxComponent } from 'src/app/components';
import moment from 'moment';
import { isNumber } from 'highcharts';

@Component({
  selector: 'app-jpm-agency-data-grid-viewer',
  templateUrl: './jpm-agency-data-grid-viewer.component.html',
  styleUrls: ['./jpm-agency-data-grid-viewer.component.scss']
})
export class JpmAgencyDataGridViewerComponent implements OnChanges {

  @Input() data: any;
  @Input() dataLoading: boolean;

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
        flex: 1,
        cellStyle: params => {
          if(isNumber(params.value)) {
            return {justifyContent: 'flex-end'};
          }
        }
    },
    context: this,
    rowHeight: 20,
    floatingFilter: true,
    rowClass:'medium-row',
    rowSelection: 'single',
    columnDefs: [
        { 
          headerName: 'As of Date', 
          field: 'asOfDate',
          valueFormatter: (params) => {
            return params.value ? moment.utc(params.value).format('MM-DD-YYYY') : '';
          }
        },
        { 
          headerName: 'Valuation Date', 
          field: 'valuationDate',
          valueFormatter: (params) => {
            return params.value ? moment.utc(params.value).format('MM-DD-YYYY') : '';
          }
        },
        { 
          headerName: 'Instrument Code', 
          field: 'instrumentCode',
          filter: 'agSetColumnFilter'
        },
        { 
          headerName: 'Alias', 
          field: 'alias',
            filter: 'agSetColumnFilter'
        },
        { 
          headerName: 'Input Type', 
          field: 'inputType',
            filter: 'agSetColumnFilter'
        },
        { 
          headerName: 'Input Value', 
          field: 'inputValue',
          valueFormatter: (params) => {
            return params.value ? params.value.toFixed(2) : '';
              filter: 'agSetColumnFilter'
          }
        },
        { 
          headerName: 'Settle Date', 
          field: 'settleDate',
          valueFormatter: (params) => {
            return params.value ? moment.utc(params.value).format('MM-DD-YYYY') : '';
          },
            filter: 'agSetColumnFilter'
        },
        { 
          headerName: 'Scenario', 
          field: 'scenario',
            filter: 'agSetColumnFilter'
        },
        { 
          headerName: 'Spread Type', 
          field: 'spreadType',
            filter: 'agSetColumnFilter'
        },
        { 
          headerName: 'Field', 
          field: 'field',
            filter: 'agSetColumnFilter'
        },
        { 
          headerName: 'Value', 
          field: 'value',
          valueFormatter: (params) => {
            if(params.value){
              return params.value.toFixed(2);
            }
            else {
              if(params.data['valueDate']){
                return moment.utc(params.data['valueDate']).format('MM-DD-YYYY')
              } else{
                return null
              }
            }
          }
        },
        { 
          headerName: 'Version', 
          field: 'version',
        },
        { 
          headerName: 'Update Date', 
          field: 'UpdateDate',
          valueFormatter: (params) => {
            return params.value ? moment.utc(params.value).format('MM-DD-YYYY HH:MM:SS') : '';
          }
        },
        { 
          headerName: 'Instrument Id', 
          field: 'instrId',
          hide: true,
        },
  
        { 
          headerName: 'Portfolio Id', 
          field: 'portfolioId',
          hide: true
        },
        { 
          headerName: 'Portfolio Name', 
          field: 'portfolioName',
          hide: true
        },
        { 
          headerName: 'Update Name', 
          field: 'updateName',
          hide: true
        },
    ],
    frameworkComponents:{
      'AppCustomGridCellCheckboxComponent': AppCustomGridCellCheckboxComponent
    }
  };
  
  constructor(private store: Store<fromStore.AgencyDeliverablesState>) { 
    this.customGridCallBack = this.customGridCallBack.bind(this);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data && changes.data.currentValue && this.gridApi) {
      this.populateGridData();
    }
  }

  populateGridData() {
    this.gridApi.setRowData([])
    this.gridApi.setRowData(this.data);
  }

  customGridCallBack(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.populateGridData();
  }

}
