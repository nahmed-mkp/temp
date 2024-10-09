
import { Component, OnInit, Input, OnDestroy, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { GridApi, GridOptions, ColDef, RowNode, ColumnApi, DetailGridInfo, ColumnState } from 'ag-grid-community';
import { AppGridCustomStatusBarCellValueComponent } from 'src/app/components';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import * as _ from 'lodash';

import * as fromModels from './../../models';
@Component({
  selector: 'app-pnl-attribution-detail-grid-viewer',
  templateUrl: './pnl-attribution-detail-grid-viewer.component.html',
  styleUrls: ['./pnl-attribution-detail-grid-viewer.component.scss']
})
export class PnlAttributionDetailGridViewerComponent implements OnInit, OnDestroy, OnChanges {

  @Input() gridUniqueId: string;
  @Input() masterGridApi: GridApi;
  @Input() colDefs: any;
  @Input() pinnedStatus: string;
  @Input() masterNode: RowNode;
  @Input() gridDisplayMode: any;
  @Input() gridColumnStateChangeSubject: Subject<{columnStates: ColumnState[], source: any, type: string}>;
  @Input() detailGridRowSelectedSubject: Subject<string>;
  @Input() singleCellValueSubject$: Subject<number>;
  @Input() guid: string;

  @Input() data: any[];
  @Input() loadingStatus: boolean;

  @Output() loadTimeseries = new EventEmitter<fromModels.IAttributionDailyTimeseriesRequest>();
  @Output() loadDetails = new EventEmitter<fromModels.IAttributionDetailsRequest>();

  private gridApi: GridApi;
  private gridColumnApi: ColumnApi;
  private siblingGrid: DetailGridInfo;
  public extraOption = {};
  public customGridOption: GridOptions;
  private MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  private subscriptions: Subscription[] = [];


  constructor() {
    this.customGridCallBack = this.customGridCallBack.bind(this);
    this._registerSilbingDetailGridEvent = this._registerSilbingDetailGridEvent.bind(this);
  }

  ngOnInit() {
    this.customGridOption = {
      defaultColDef: {
        filter: 'agTextColumnFilter',
        width: 100,
        suppressMenu: true,
        cellStyle: params => {
          let styleObj: any = {};
          if (typeof params.value === 'number') {
              styleObj = Object.assign(styleObj, {'justify-content': 'flex-end'});
          }
          const fieldName = params.colDef.field;
          if (fieldName.includes('TotalPL')) {
              styleObj = Object.assign(styleObj, {'font-weight': 'bolder', 'color': '#424242de'});
          }

          if (fieldName.includes('quarterSummary')) {
            styleObj = Object.assign(styleObj, {'background': '#00800024'});
          }

          if (fieldName.includes('yearlySummary')) {
            styleObj = Object.assign(styleObj, {'background': '#8000803d'});
          }
          return styleObj;
        },

        cellClass: params => {
          const fieldName = params.colDef.field;
          let isOddColumn: boolean;

          const month = fieldName.split('_')[0];
          const monthIndex = params.context.MONTHS.indexOf(month);

          if (monthIndex !== -1) {
              isOddColumn = (monthIndex + 1) % 2 === 0 ? false : true;
          }
          if (isOddColumn) {
              return ['ag-grid-column-light-height'];
          }
        },
        comparator: (valueA, valueB, nodeA, nodeB) => {
          if (typeof valueA === 'string') {
            return  valueA.charCodeAt(0) - valueA.charCodeAt(0);
          } else {
            if (valueA === 0) {
                  return -1;
            } else if (valueB === 0) {
                return 1;
            }
            return valueA - valueB; 
          }
        }
      },
      getRowNodeId: data => data['Id'],
      columnDefs: this._createCustomColDefsBaseOnPinnedStatus(this.colDefs, this.pinnedStatus),

      getContextMenuItems: params => {
        const clearRangeSelection = {
          name: 'Clear Range Selection',
          action: () => this._removeAllRangeSelection(this.masterGridApi)
        };
        return ['copy', 'copyWithHeaders', 'separator', 'csvExport', 'excelExport', 'separator', clearRangeSelection];
      },

      rowClass: 'medium-row',
      rowHeight: 22,
      groupHeaderHeight: 24,
      headerHeight: 24,
      floatingFiltersHeight: 28,
      context: this,
      rowSelection: 'single',

      frameworkComponents: {
        AppGridCustomStatusBarCellValueComponent: AppGridCustomStatusBarCellValueComponent
      },

      //Event
      onRowClicked: params => {
        // const nodeId = params.api.getValue('Id', params.node);
        // const nodeKey = params.node.key;
        // params.context.loadTimeseries.emit({ 'id': nodeId, 'guid': this.guid, 'name': nodeKey});
        const nodeId = params.node.data['Id'];
        this.detailGridRowSelectedSubject.next(nodeId);
        this.masterGridApi.clearFocusedCell();
      },
      onCellClicked: params => {
        const nodeId = params.api.getValue('Id', params.node);
        const colId = params.column.getColId();
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const month = colId.substring(0, 3);
        const monthIdx = months.indexOf(month);
        if (monthIdx >= 0) {
          const year = parseInt('20' + colId.split('_')[1], 10);
          params.context.loadDetails.emit({ 'id': nodeId, 'guid': this.guid, 'month': monthIdx + 1, 'year': year });
        }

        // update status bar cell value
        let cellValue;
        if (typeof(params.value) === 'number') {
          cellValue = params.value.toLocaleString(undefined, {maximumFractionDigits: 3});
        } else {
          cellValue = null;
        }
        this.singleCellValueSubject$.next(cellValue);
      },

      onRowSelected: params => {
        if (params.node.isSelected() && this.pinnedStatus === 'left') {
          const nodeId = params.node.data['Id'];
          const nodeKey = params.node.key;
          params.context.loadTimeseries.emit({ 'id': nodeId, 'guid': this.guid, 'name': nodeKey});
        }
      },

      // Event -------------------------------------
      onColumnResized: params => {
        const currentColumnState: ColumnState[] = this.gridColumnApi.getColumnState();
        this.gridColumnStateChangeSubject.next({columnStates: currentColumnState, source: this.gridUniqueId, type: 'fromDetailGrid'})
      },

      onRangeSelectionChanged: params => {
        this.masterGridApi.dispatchEvent({type: 'rangeSelectionChanged'});
      }
    };

    if (this.pinnedStatus === null) {
      this.subscriptions.push(this.gridColumnStateChangeSubject.pipe(
        debounceTime(500)
      ).subscribe(event => {
        if (event.source !== this.gridUniqueId) {
          console.log('gridColumnStateChangeSubject', event);
          this._syncCurrentGridStateWithSourceGridState(event.columnStates, this.gridColumnApi.getColumnState());
        }
      }));
    }

    this.detailGridRowSelectedSubject.subscribe(selectedNodeId => {
      const currentSelectedNode = this.gridApi.getRowNode(selectedNodeId.toString());
      currentSelectedNode.setSelected(true, true);
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.data && changes.data.currentValue && this.gridApi) {
      this._adjustRowHeight(changes.data.currentValue);
    }

    if (changes.gridDisplayMode && changes.gridDisplayMode.currentValue && this.gridApi) {
      this._onDisplayModeChange();
    }
  }

  ngOnDestroy() {
    // console.log('removing grid', this.gridUniqueId + this.pinnedStatus, this.masterGridApi)
    this.masterGridApi.removeDetailGridInfo(this.gridUniqueId + this.pinnedStatus);
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  public customGridCallBack(params) {

    this.gridColumnApi = params.columnApi;
    this.gridApi = params.api;
    this._registerDetailGrid();
    setTimeout(() => this._registerSilbingDetailGridEvent(), 100);
    setTimeout(() => this._setInitialSorting(), 400);
  
    if (this.data) {
      this._adjustRowHeight(this.data);
    }
  }











  
  // Utility --------------------------------------------------------------------------------------------

  private _createCustomColDefsBaseOnPinnedStatus(colDefs: ColDef[], pinnedStatus) {
    if (pinnedStatus === 'left') {
      const result = colDefs.filter(col => col.headerName === 'SecurityName');
      return result;
    } else if (pinnedStatus === 'right') {
      return [];
    } else {
      const result = colDefs.filter(col => col.headerName !== 'SecurityName');
      return result;
    }
  }

  private _adjustRowHeight(data) {
    const numberOfItems = data.length;
    const offSet = 100;
    const allDetailRowHeight = numberOfItems * 22 + offSet;
    this.masterNode.setRowHeight(allDetailRowHeight);
    this.masterGridApi.onRowHeightChanged();
  }

  private _onDisplayModeChange() {

    if (this.pinnedStatus === null) {
      const currentColumnState = this.gridColumnApi.getColumnState();
      const showCols = [];
      const hideCols = [];
      currentColumnState.forEach(col => {
        const headerName = this.gridApi.getColumnDef(col.colId).headerName;
        if (this.gridDisplayMode[headerName]) {
            if (headerName === '% to Fund(qr)') {
                this.gridDisplayMode['% to Fund'] ? showCols.push(col.colId) : hideCols.push(col.colId);
            } else if (headerName === 'P/L($)(qr)') {
                this.gridDisplayMode['P/L($)'] ? showCols.push(col.colId) : hideCols.push(col.colId);
            } else if (headerName === '% to Fund(yr)') {
                this.gridDisplayMode['% to Fund'] ? showCols.push(col.colId) : hideCols.push(col.colId);
            } else if (headerName === 'P/L($)(yr)') {
                this.gridDisplayMode['P/L($)'] ? showCols.push(col.colId) : hideCols.push(col.colId);
            } else {
                showCols.push(col.colId);
            }
        } else {
            hideCols.push(col.colId);
        }
    });
  
      this.gridColumnApi.setColumnsVisible(showCols, true);
      this.gridColumnApi.setColumnsVisible(hideCols, false);
    }
  }

  private _registerDetailGrid() {
    const detailGridInfo = {
      id: this.gridUniqueId + this.pinnedStatus,
      api: this.gridApi,
      columnApi: this.gridColumnApi,
    };
    this.masterGridApi.addDetailGridInfo(this.gridUniqueId + this.pinnedStatus, detailGridInfo);
  }

  private _registerSilbingDetailGridEvent() {
    if (this.pinnedStatus === 'left') {
      this.siblingGrid = this.masterGridApi.getDetailGridInfo(this.gridUniqueId + null);
    } else if (this.pinnedStatus === null) {
      this.siblingGrid = this.masterGridApi.getDetailGridInfo(this.gridUniqueId + 'left');
    }

    if (this.siblingGrid) {
      this.siblingGrid.api.addEventListener('sortChanged', event => {
        // console.log('main grid sorting change', event);
        const sortedRowData = [];
        event.api.forEachNodeAfterFilterAndSort(node => {
          sortedRowData.push(node.data);
        });
        const currentDataCopy = [...this.data];
        currentDataCopy.sort((valueA, valueB) => {
          const indexA = sortedRowData.indexOf(valueA);
          const indexB = sortedRowData.indexOf(valueB);
          return indexA - indexB;
        });

        // this.gridApi.setColumnDefs([...this._createCustomColDefsBaseOnPinnedStatus(this.colDefs, this.pinnedStatus)])
        this.gridApi.setColumnDefs([]);
        this.gridApi.setColumnDefs([...this._createCustomColDefsBaseOnPinnedStatus(this.colDefs, this.pinnedStatus)]);
        this._onDisplayModeChange();

        // const currentSortMode = this.gridApi.getSortModel().map(model => );
        // this.gridApi.setSortModel([]);
        this.gridApi.setRowData(currentDataCopy);
      })
    }
  }

  private _setInitialSorting() {
    if (this.pinnedStatus === 'left') {
      this.gridApi.setSortModel([{colId: "Position", sort: "asc"}])
    }
  }

  private _syncDetailGridStateWithDetialGridState (sourceGridState: ColumnState[], currentGridState: ColumnState[]) {
    const hashMapOfSourceGridState = _.keyBy(sourceGridState, 'colId');
    const resultState = currentGridState.map(currentColumnState => {
      const colId = currentColumnState.colId;
      const sourceGridColumnState = hashMapOfSourceGridState[colId];
      return Object.assign({}, currentColumnState, sourceGridColumnState);
    })
  }

  private _syncCurrentGridStateWithSourceGridState(sourceGridState: ColumnState[], currentGridState: ColumnState[]) {
    const hashMapOfSourceGridState = _.keyBy(sourceGridState, 'colId');
    const resultState: ColumnState[] = [];
    currentGridState.forEach(currentGridColumnState => {
        const colId = currentGridColumnState.colId;
        const sourceGridColumnState = hashMapOfSourceGridState[colId];
        if (hashMapOfSourceGridState[colId]) {
            const newColumnState: ColumnState = Object.assign({}, currentGridColumnState, sourceGridColumnState);
            resultState.push(newColumnState); 
        } else {
            resultState.push(currentGridColumnState);
        }
    });
    this.gridColumnApi.setColumnState(resultState);
  } 

  private _removeAllRangeSelection(masterGridApi: GridApi) {
    masterGridApi.clearRangeSelection();
    masterGridApi.forEachDetailGridInfo(gridInfo => {
        gridInfo.api.clearRangeSelection();
  });
}

}
