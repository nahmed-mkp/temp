import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { CellValueChangedEvent, ColumnApi, GridApi, GridOptions, RowClickedEvent } from 'ag-grid-community';
import { UtilityService } from 'src/app/services';
import { PricingEngineUtilityService } from '../../services';
import * as fromModels from '../../models';
import moment from 'moment';
import { RowNode } from 'ag-grid-community';
import { C } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-pricing-engine-manual-marks-viewer',
  templateUrl: './pricing-engine-manual-marks-viewer.component.html',
  styleUrls: ['./pricing-engine-manual-marks-viewer.component.scss']
})
export class PricingEngineManualMarksViewerComponent implements OnChanges {
  
    @Input() data: any;
    @Input() loading: boolean;

    private gridApi: GridApi;
    private colApi: ColumnApi;
    public extraOption = { autoSizeAllColumns: true };

    public customGridOption: GridOptions = {
        defaultColDef: {
            filter: 'agTextColumnFilter',
            enableCellChangeFlash: false,
            floatingFilter: true,
            editable: false,
            cellClass: ['right-border-light'],
            cellStyle: params => {
              if(!isNaN(params.value)) {
                return { 'justify-content': 'right','padding-left': '10px', 'padding-right': '10px' };
              }
              return {'padding-left': '10px', 'padding-right': '10px'}
            },
        },
        suppressColumnVirtualisation: true,
        columnDefs: [
          {headerName: 'Name', field: 'Name'},
          {headerName: 'Type', field: 'Type', filter: 'agSetColumnFilter'},
          {headerName: 'Date', field: 'Date', valueFormatter: params => params.value ? moment(params.value.split('T')[0]).format('MM/DD/YYYYY') : ''},
          {headerName: 'MDID', field: 'MDID'},
          {headerName: 'Live Value', field: 'LiveValue'},
          {headerName: 'Close Value', field: 'CloseValue'},
          {headerName: 'Live Date Added', field: 'LiveDateAdded', valueFormatter: params => params.value ? moment(params.value.split('T')[0]).format('MM/DD/YYYYY') : ''},
          {headerName: 'Close Date Added', field: 'CloseDateAdded', valueFormatter: params => params.value ? moment(params.value.split('T')[0]).format('MM/DD/YYYYY') : ''},
          {headerName: 'Carry Close', field: 'CarryClose',  filter: 'agSetColumnFilter'},
        ],
        rowSelection: 'single',
        deltaRowDataMode: true,
        getRowNodeId: data => data['id'],
        rowClass: 'medium-row',
        rowHeight: 25,
        groupHeaderHeight: 25,
        headerHeight: 25,
        floatingFiltersHeight: 28,
        
    };

    constructor(private utilityService: UtilityService,private dialog: MatDialog, private pricingEngineUtilityService: PricingEngineUtilityService) { 
        this.customGridCallBack = this.customGridCallBack.bind(this);
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.data && changes.data.currentValue) {
          this.renderGrid(changes.data.currentValue);
        }
    }

    customGridCallBack(params) {
        this.gridApi = params.api;
        this.colApi = params.columnApi;
        this.colApi.autoSizeAllColumns();
    }
  
    renderGrid(data){
      if(this.gridApi){
        this.gridApi.setRowData(data);
      }
      this.colApi.autoSizeAllColumns();
    }
}
