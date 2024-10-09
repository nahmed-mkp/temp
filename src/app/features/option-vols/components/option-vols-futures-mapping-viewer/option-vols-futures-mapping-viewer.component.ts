import { Component, OnInit, Input, OnChanges, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { GridApi, ColumnApi, GridOptions, RowNode } from 'ag-grid-community';
import { AppCustomGridCellCrudOperationComponent } from 'src/app/components';

import * as fromModel from '../../models';

@Component({
  selector: 'app-option-vols-futures-mapping-viewer',
  templateUrl: './option-vols-futures-mapping-viewer.component.html',
  styleUrls: ['./option-vols-futures-mapping-viewer.component.scss']
})
export class OptionVolsFuturesMappingViewerComponent implements OnInit, OnChanges{

  @Input() data: any;
  @Output() addFutureMapping = new EventEmitter<fromModel.IFutureMapping>();
  @Output() deleteFutureMapping = new EventEmitter<fromModel.IFutureMapping>();
  @Output() updateFutureMapping = new EventEmitter<fromModel.IFutureMapping>();

  private gridApi: GridApi;
  private gridColumnApi: ColumnApi;

  public formatData: any[];

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
      {headerName: 'futureRoot', field: 'futureRoot', filter: 'agTextColumnFilter', editable: params => params.data['newRow']},
      {headerName: 'benchmarkMnemonic', field: 'benchmarkMnemonic', filter: 'agTextColumnFilter', editable: true},
      {headerName: 'Action', cellRenderer: 'AppCustomGridCellCrudOperationComponent', headerClass: 'flex-end-header', 
        cellRendererParams: {basicMode: true, onSave: this.onSaveRow.bind(this), onDelete: this.onDeleteRow.bind(this)}}
    ],
    // floatingFilter: true,
    sideBar: false,
    frameworkComponents: {
      AppCustomGridCellCrudOperationComponent: AppCustomGridCellCrudOperationComponent
    },

    onCellEditingStarted: params => {
      // params.context.tempRowData = params.data['ticker'];
      params.data['oldBenchmarkMnemonic'] = params.data['benchmarkMnemonic'];
    },
    onCellEditingStopped: params => {
      const targetData = params.data['benchmarkMnemonic'];
      if (targetData !== params.data['oldBenchmarkMnemonic'] || params.data['newRow']) {
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
      this.formatData = JSON.parse(JSON.stringify(this.data));
    }
  }

  customGridCallBack(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  public onAdd() {
    const newRow = {futureRoot: '', benchmarkMnemonic: '', newRow: true};
    this.formatData.push(newRow);
    this.gridApi.setRowData(this.formatData);
  }

  public onSaveRow(node: RowNode) {
    if (node.data['newRow']) {
      this.addFutureMapping.emit({
        futureRoot: node.data['futureRoot'],
        benchmarkMnemonic: node.data['benchmarkMnemonic']
      });
    } else {
      this.updateFutureMapping.emit({
        futureRoot: node.data['futureRoot'],
        benchmarkMnemonic: node.data['benchmarkMnemonic']
      });
    }
  }

  public onDeleteRow(node: RowNode) {

    if (node.data['newRow']) {
      const targetIndex = this.formatData.indexOf(node.data);
      this.formatData.splice(targetIndex, 1);
      this.gridApi.setRowData([...this.formatData]);
    } else {
      this.deleteFutureMapping.emit({
        futureRoot: node.data['futureRoot'],
        benchmarkMnemonic: node.data['benchmarkMnemonic']
      });
    }
  }

}
