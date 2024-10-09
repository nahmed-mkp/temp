import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromModels from '../../models';
import * as fromStore from '../../store';
import { MatTabChangeEvent } from '@angular/material/tabs';
import moment from 'moment';
import { ExecutionTaggingReasonCellRenderer } from '../execution-tagging-reason-cell-renderer/execution-tagging-reason-cell-renderer.component';
import { ColumnApi, GridApi, GridOptions } from 'ag-grid-community';
import { on } from 'events';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-execution-tagging-grid-viewer',
  templateUrl: './execution-tagging-grid-viewer.component.html',
  styleUrls: ['./execution-tagging-grid-viewer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExecutionTaggingGridViewer {

  @Input() data: any[];
  @Input() loading: boolean;
  @Input() reasons: fromModels.IReason[];
  @Input() showReasonEditor: boolean;

  @Output() onTagUpdated = new EventEmitter<fromModels.ITagsUpdateReq>();

  public extraOption = {};

  private gridApi: GridApi;
  private gridColumnApi: ColumnApi;

  public customGridOption: GridOptions = {
    defaultColDef: {
      cellClass: 'right-border-light',
      headerClass: 'ag-header-wrap',
      filter: 'agSetColumnFilter',
      editable: false,
      enableCellChangeFlash: false,
      suppressToolPanel: true,
      cellStyle: params => {
        if(typeof params.value === 'number'){
          return {'justify-content': 'right'};
        }
      }
    },
    columnDefs: [
      { headerName: 'Trade Date', field: 'TradeDate', filter: 'agSetColumnFilter', sortable: true, width: 100, maxWidth: 100},
      { headerName: 'Settle Date', field: 'SettleDate', filter: 'agSetColumnFilter', sortable: true,  width: 100, maxWidth: 100},
      { headerName: 'Trade Name', field: 'TradeName', filter: 'agSetColumnFilter', sortable: true, minWidth: 300},
      { headerName: 'Sec Name', field: 'SecName', filter: 'agSetColumnFilter', sortable: true, minWidth: 400},

      { headerName: 'Buy / Sell', field: 'Buy/Sell', filter: 'agSetColumnFilter', sortable: true, width: 70, maxWidth: 70, minWidth: 70},
      { headerName: 'Exec Price', field: 'ExecPrice', valueFormatter: params => params.value ? params.value.toFixed(2) : null, width: 100, maxWidth: 100},
      { headerName: 'Qty', field: 'Qty',   valueFormatter: this.utilityService.formatNumberWithCommasAndDigit(2), width: 150, maxWidth: 150},

      { headerName: 'Reason', field: 'Reason', cellClass: 'yellow-cell', cellRenderer: 'ExecutionTaggingReasonCellRenderer', width: 120, maxWidth: 120, cellRendererParams: (params) => {
        return {
            reasons: this.reasons,
            onTagSelectionChanged: this.onTagSelectionChanged.bind(this)
        };
      }},
      { headerName: 'Portfolio Manager', field: 'PortfolioManager', width: 150, maxWidth: 150},
    
    
      { headerName: 'Trader', field: 'Trader', filter: 'agSetColumnFilter', sortable: true},
      { headerName: 'Order Id', field: 'OrderId', filter: 'agSetColumnFilter', sortable: true,},
      { headerName: 'Reason Id', field: 'ReasonId', hide: true},
      { headerName: 'Sec Id', field: 'SecId', filter: 'agSetColumnFilter', sortable: true, }
    ],
    floatingFilter: true,
    rowHeight: 22,
    getRowNodeId: node => node['id'],
    frameworkComponents: {
      'ExecutionTaggingReasonCellRenderer': ExecutionTaggingReasonCellRenderer
    },
  };

  constructor(private store: Store<fromStore.ExecutionTaggingState>, private utilityService: UtilityService) {
    this.customGridCallBack = this.customGridCallBack.bind(this);
  }

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes && changes.data && changes.data.currentValue) {
      this.gridApi.setRowData(changes.data.currentValue);
      this.gridApi.sizeColumnsToFit(); 
    }
    if(changes && changes.showReasonEditor && changes.showReasonEditor.currentValue && this.gridApi){
      this.gridApi.sizeColumnsToFit();
    }
  }

  customGridCallBack(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.sizeColumnsToFit();
  }

  onTagSelectionChanged(payload: fromModels.ITagsUpdateReq){
    this.onTagUpdated.emit(payload);
  }
  


}
