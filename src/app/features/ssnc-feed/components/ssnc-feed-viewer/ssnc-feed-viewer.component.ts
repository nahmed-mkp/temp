import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store';

import { ColDef, ColumnApi, GridApi, GridOptions } from 'ag-grid-community';
import { UtilityService } from 'src/app/services';
import { SSNCFeedDialogInfoViewer } from '../ssnc-feed-info-dialog-viewer/ssnc-feed-info-dialog-viewer.component';


@Component({
  selector: 'app-ssnc-feed-viewer',
  templateUrl: './ssnc-feed-viewer.component.html',
  styleUrls: ['./ssnc-feed-viewer.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class SSNCFeedViewer implements OnInit, OnChanges {

  @Input() feedData: any[];
  @Input() additionalFeedData: any[];
  @Input() selectedOrderId: number;
  @Input() selectedColumn: string;

  @Output() onLoadAdditionalFeedData = new EventEmitter<string>();

  public extraOption = {};

  private gridApi: GridApi;
  private gridColumnApi: ColumnApi;
  private pinnedCols = [
    "OrderId", 
    "MKP_INTERNAL_SEC_ID", 
  ]

  private orderedCols = [
    "OrderId", 
    "MKP_INTERNAL_SEC_ID", 
    "Counterparty",  
    "Custodian", 
    "CashAccount", 
    "ssnc_NetSettlementAmount",
    "ssnc_GrossSettlementAmount",
    "ssnc_RepoStartCash",
    "ssnc_RepoEndCash"
  ]


  public customGridOption: GridOptions = {
    defaultColDef: {
      cellClass: 'right-border-light',
      headerClass: 'ag-header-wrap',
      filter: 'agSetColumnFilter',
      editable: false,
      valueFormatter: params => {
        if(typeof(params.value) === 'number' && !params.colDef.field.toLowerCase().includes('id')){
          return(this.notionalFormatter(params.value))
        }
        return params.value
      },
      enableCellChangeFlash: false,
      suppressToolPanel: true,
      cellStyle: params => {
          if (typeof params.value === 'number') {
             return { 'text-align': 'right'}; 
          }
      }
    },
    floatingFilter: true,
    getRowStyle: params => {
      if(params.data['OrderId'] === this.selectedOrderId){
        return {'background-color': '#FFF0DB'}
      }
      if(params.data['hide'] === true){
        return {'display': 'none'}
      }
    },
    getContextMenuItems: (params:any) => {
      const submissionDetail = {
          name: 'More Info',
          action: () => this.showSubmissionDetail(params)
        }

      return ['copy', 'copyWithHeaders', 'separator','csvExport', 'excelExport', 'separator', submissionDetail] 
    },
    rowHeight: 16,
    rowClass:'small-row',
    getRowNodeId: node => node ? node['OrderId'] : null
  };

  constructor(private store: Store<fromStore.SSNCFeedState>, private dialog: MatDialog, private utilityService: UtilityService) {
      this.customGridCallBack = this.customGridCallBack.bind(this);
  }

  ngOnInit(): void { }

  notionalFormatter(currency) {
    var sansDec = currency.toFixed(0);
    var formatted = sansDec.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return `${formatted}`;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.feedData){
      if(changes.feedData.currentValue.length > 0){
        const dynamicColumnsDef = this.createDynamicGridColumn(this.feedData);
      
        let pinnedRows: any = this.feedData.filter( data => data['OrderId'] === this.selectedOrderId);
        let nonPinnedRows: any = this.feedData.filter( data => data['OrderId'] !== this.selectedOrderId);
   
        this.gridApi.setColumnDefs([])
        this.gridApi.setColumnDefs(dynamicColumnsDef);
  
        this.gridApi.setPinnedTopRowData(pinnedRows)  

        this.gridApi.setRowData([])
        this.gridApi.setRowData(nonPinnedRows)
      } else {
        this.gridApi.setRowData([])
      }
    }

    if(changes.selectedColumn && changes.selectedColumn.currentValue !== ''){
      this.gridApi.ensureColumnVisible(this.selectedColumn);
      this.gridApi.flashCells({ columns: [this.selectedColumn] });
    }
  }

  createDynamicGridColumn(gridItems) {
    const fields = Object.keys(gridItems[0]);

    const columnDefs: ColDef[] = fields.map((field,i) => {
        if(this.pinnedCols.includes(field)){
          return { 
            headerName: field,
            field: field,
            width: 120,
            pinned: 'left'
          }
        } 
        return {
          headerName: field,
          width: 120,
          field: field,
        };       
    });

    let temp_indexes = [];
    let temp_cols = [];
    let ordered_cols = [];

    columnDefs.map( (col,i) => {
      if( this.orderedCols.includes(col.field) ){
        temp_indexes.push(columnDefs.indexOf(col))
        temp_cols.push(col)
      }
    })
    temp_indexes.reverse().map( index => {
      columnDefs.splice(index,1)
    })

    this.orderedCols.map( (val,idx) => {
      let filteredCol = temp_cols.find( col => col.field === this.orderedCols[idx])
      filteredCol.width = 120
      ordered_cols.push(filteredCol)
    })
    return ordered_cols.concat(columnDefs)
  }

  showSubmissionDetail(params){
    console.warn(params)
    let client_ref = params.node.data['ClientReference'];
    this.onLoadAdditionalFeedData.emit(client_ref)
    this.dialog.open(SSNCFeedDialogInfoViewer, {
      data: { feedData: this.additionalFeedData },
      width: '50rem',
      height: '50rem'
    });
  }

  customGridCallBack(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
  }
  


}
 