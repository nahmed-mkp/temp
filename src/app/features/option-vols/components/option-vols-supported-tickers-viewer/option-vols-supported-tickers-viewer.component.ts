import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { GridApi, ColumnApi, GridOptions, RowNode } from 'ag-grid-community';
import { AppCustomGridCellCrudOperationComponent } from 'src/app/components';

@Component({
  selector: 'app-option-vols-supported-tickers-viewer',
  templateUrl: './option-vols-supported-tickers-viewer.component.html',
  styleUrls: ['./option-vols-supported-tickers-viewer.component.scss']
})
export class OptionVolsSupportedTickersViewerComponent implements OnInit, OnChanges {

  @Input() data: any;
  @Output() addTicker = new EventEmitter<string>();
  @Output() deleteTicker = new EventEmitter<string>();
  @Output() updateTicker = new EventEmitter<any>();

  public formatData: any[];

  private gridApi: GridApi;
  private gridColumnApi: ColumnApi;
  private tempRowData: any;

  public extraOption = {sizeColumnsToFit: true};

  public customGridOption: GridOptions = {
    defaultColDef: {
      cellStyle: params => {
        return typeof params.value === 'number' &&
                params.colDef.field.toLowerCase().includes('id') === false ?
                {'justify-content': 'flex-end', 'border-right': '1px solid #80808045'} : { 'border-right': '1px solid #80808045'};
      },
    },

    columnDefs: [
      {headerName: 'Ticker', field: 'ticker', filter: 'agTextColumnFilter', editable: true},
      {headerName: 'Action', cellRenderer: 'AppCustomGridCellCrudOperationComponent', headerClass: 'flex-end-header', 
        cellRendererParams: {basicMode: true, onSave: this.onSaveRow.bind(this), onDelete: this.onDeleteRow.bind(this),}}
    ],

    // floatingFilter: true,
    sideBar: false,
    frameworkComponents: {
      AppCustomGridCellCrudOperationComponent: AppCustomGridCellCrudOperationComponent
    },

    onCellEditingStarted: params => {
      // params.context.tempRowData = params.data['ticker'];
      params.data['oldTicker'] = params.data['ticker'];
    },
    onCellEditingStopped: params => {
      const targetData = params.data['ticker'];
      if (targetData !== params.data['oldTicker']) {
          params.data['_notSave'] = true;
          params.api.redrawRows({rowNodes: [params.node]});
      }
    },

    getRowStyle: params => {
      if (params.data['_notSave']) {
          return {
              'font-weight': 'bolder',
              'color': '#6e8eeccc',
              'font-style': 'italic',
          };
      }
    },

    context: this
  }

  constructor() {
    this.customGridCallBack = this.customGridCallBack.bind(this);
  }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.data && changes.data.currentValue) {
      this.formatData = this.data.map(element => {
        return {ticker: element};
      });
      this.formatData = JSON.parse(JSON.stringify(this.formatData));
    }
  }

  customGridCallBack(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  public onAdd() {
    const newRow = {ticker: '', newRow: true};
    this.formatData.push(newRow);
    this.gridApi.setRowData(this.formatData);
  }

  public onSaveRow(node: RowNode) {
    if (node.data['newRow']) {
      this.addTicker.emit(node.data['ticker']);
    } else {
      this.updateTicker.emit({
        newTicker: node.data['ticker'],
        oldTicker: node.data['oldTicker']
      });
    }
  }

  public onDeleteRow(node: RowNode) {
    if (node.data['newRow']) {
      const targetIndex = this.formatData.indexOf(node.data);
      this.formatData.splice(targetIndex, 1);
      this.gridApi.setRowData([...this.formatData]);
    } else {
      this.deleteTicker.emit(node.data['ticker']);
    }
  }
}
