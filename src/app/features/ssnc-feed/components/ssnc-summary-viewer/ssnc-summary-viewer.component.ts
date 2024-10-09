import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';

import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { ColumnApi, GridApi, GridOptions } from 'ag-grid-community';
import moment from 'moment';
import * as fromStore from '../../store';
import { FileDownloadCellRenderer } from '../file-download-cell-renderer/file-download-cell-renderer.component';
import { SSNCFeedDialogInfoViewer } from '../ssnc-feed-info-dialog-viewer/ssnc-feed-info-dialog-viewer.component';


@Component({
  selector: 'app-ssnc-summary-viewer',
  templateUrl: './ssnc-summary-viewer.component.html',
  styleUrls: ['./ssnc-summary-viewer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SSNCSummaryViewer implements OnChanges {

  @Input() summaryData: any[];
  @Input() additionalFeedData: any;
  @Input() filterText: string;
  @Output() onOrderIdClicked: EventEmitter<{tabName: string, orderId: number}> = new EventEmitter<{tabName: string, orderId: number}>();
  @Output() onLoadAdditionalFeedData = new EventEmitter<string>();

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
          cellStyle : { 'text-overflow':'ellipsis','white-space':'nowrap', 'overflow': 'hidden', 'padding': 0 },
          getQuickFilterText: () => ''
      },        
      floatingFilter: true,
      rowHeight: 20,
      enableCellTextSelection: true,
      ensureDomOrder: true,
      rowClass: 'small-row',
      getRowStyle: params => {
        if(params.data['Errors']){
          return {'background-color': '#FF9A98'}
        }
      },
      onRowClicked: params => this.handleIdClick(params),
      frameworkComponents: {
        'FileDownloadRenderer': FileDownloadCellRenderer,
      },
      getContextMenuItems: (params:any) => {
        const submissionDetail = {
            name: 'More Info',
            action: () => this.showSubmissionDetail(params)
          }
  
        return ['copy', 'copyWithHeaders', 'separator','csvExport', 'excelExport', 'separator', submissionDetail] 
      },
      columnDefs: [
          { headerName: 'Trade Date', field: 'TradeDate', valueFormatter: (params) => moment(params.value).format('MM-DD-YYYY'), width: 80},
          { headerName: 'Cusip', field: 'Cusip', width: 80, getQuickFilterText: (params) => params.value },
          { headerName: 'Security Name', field: 'SecurityName', width: 400},
          { headerName: 'Order Id', field: 'OrderId', width: 80, getQuickFilterText: (params) => params.value },
          { headerName: 'Load Status', field: 'LoadStatus', width: 70},
          { headerName: 'Errors', field: 'Errors', sort: 'desc', width: 300, filter: 'agTextColumnFilter'},
          { headerName: 'Trade Id', field: 'TradeId', width: 90,  getQuickFilterText: (params) => params.value},
          { headerName: 'Security Type', field: 'SecurityType', width: 80},
          { headerName: 'Asset Class', field: 'tab_name', width: 80},
          { headerName: 'Trade File', field: 'TradeFile', width: 100, cellRenderer: 'FileDownloadRenderer',  cellRendererParams: {buttonText: 'Trade File', bgColor:'blue', type: 'trade'}, cellStyle: {'justify-content': 'center', 'align-content': 'center'}},
          { headerName: 'Ack File', field: 'AckFile', width: 100, cellRenderer: 'FileDownloadRenderer',  cellRendererParams: {buttonText: 'Ack File', bgColor:'green', type: 'ack'}, cellStyle: {'justify-content': 'center', 'align-content': 'center'}}
      ],
  };

  constructor(private store: Store<fromStore.SSNCFeedState>, private dialog: MatDialog, ) {
      this.customGridCallBack = this.customGridCallBack.bind(this);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes && changes.filterText){
      if(changes.filterText.currentValue !== ''){
        this.gridApi.setQuickFilter(this.filterText);
      } else {
        this.gridApi.setQuickFilter(null);
      }
    }
  }

  customGridCallBack(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
  }

  handleIdClick(params){

    let tradeDate = moment(params.node.data['TradeDate']).format('MM-DD-YYYY')
    this.store.dispatch(fromStore.changeSelectedDate(tradeDate))

    const tabMapping = {
      'futures': 'Futures',
      'bonds': 'Bonds',
      'swaps': 'Swaps',
      'equities': 'Equities',
      'mortgage': 'Mortgage',
      'options': 'Options',
      'forward': 'Forward',
      'spot': 'Spot',
      'repo': 'Repo',
      'swaptions': 'Swaptions',
      'fra': 'FRA',
      'cdx': 'CDX',
      'cap_floor': 'CAP Floor',
      'bond_trs': 'Bond TRS',
      'equity_trs': 'Equity TRS',
      'equity_otc_options': 'Equity OTC Options',
      'bond_otc_options': 'Bond OTC Options',
      'fx_otc_options': 'FX OTC Options'   
    }
  
    let tabName = params.node.data['tab_name']
    let orderId = params.data['OrderId'];

    this.onOrderIdClicked.emit({
      orderId: orderId,
      tabName: tabMapping[tabName]
    })

  }

  showSubmissionDetail(params){
    let client_ref = params.node.data['TradeId'];
    this.onLoadAdditionalFeedData.emit(client_ref)
    this.dialog.open(SSNCFeedDialogInfoViewer, {
      data: { feedData: this.additionalFeedData },
      width: '50rem',
      height: '50rem'
    });
  }

}
 