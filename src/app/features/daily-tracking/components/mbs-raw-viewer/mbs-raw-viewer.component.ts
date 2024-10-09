import { Component, OnInit, Input, OnChanges, SimpleChanges, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { GridOptions, GridApi, ColumnApi } from 'ag-grid-community';
import { DailyTrackingUtilityService } from '../../services';
import { group } from '@angular/animations';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DelayRendererComponent } from '../delay-renderer/delay-renderer.component';

import * as fromModels from './../../models/daily-tracking.models';

@Component({
  selector: 'app-mbs-raw-viewer',
  templateUrl: './mbs-raw-viewer.component.html',
  styleUrls: ['./mbs-raw-viewer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MbsRawViewerComponent implements OnInit, OnChanges {

  @Input() metaData: fromModels.IntradayMetaData;

  @Input() data: any[];
  @Input() loading: boolean;

  @Output() cellEditingStarted: EventEmitter<void> = new EventEmitter<void>();
  @Output() updateUserInputs: EventEmitter<any> = new EventEmitter<any>();

  @Output() loadIntradayPlot: EventEmitter<fromModels.IntradayRequestAndMetaData>
    = new EventEmitter<fromModels.IntradayRequestAndMetaData>();

  @Output() loadEODPlot: EventEmitter<fromModels.EODRequestAndMetaData>
    = new EventEmitter<fromModels.EODRequestAndMetaData>();

  private gridApi: GridApi;
  private gridColumnApi: ColumnApi;

  public extraOption = {sizeColumnsToFit: true};
  public customGridOption: GridOptions = {
    defaultColDef: {
      cellStyle: params => {
          return typeof params.value === 'number' ? {'justify-content': 'flex-end'} : {};
      },
      filter: 'agTextColumnFilter',
      enableCellChangeFlash: false,
      cellRenderer: 'agAnimateShowChangeCellRenderer'
    },

    groupRowRendererParams: {
      suppressCount: true
    },
    getRowNodeId: data => data.Id,
    getRowStyle: params => {
      if (params.node.leafGroup) {
        return {};
      }
      return { background: (params.node.rowIndex % 2 === 1) ? '#ffff99' : '#ccffff' };
    },
    deltaRowDataMode: true,
    frameworkComponents: {
      DelayRendererComponent: DelayRendererComponent
    },
    getContextMenuItems: (params) => {

      let contextMenu: any[] = [];

      contextMenu = ['copy', 'copyWithHeaders', 'separator', 'csvExport', 'excelExport'];
      const colId = params.column.getColId();
      if (colId !== 'Name') { 

        contextMenu.push('separator');

        const viewIntraday = {
          name: 'View Intraday Plot',
          icon: '<i class="material-icons small-menu-icon">list</i>',
          action: () => {
            const cellRanges = params.api.getCellRanges()
            if (!cellRanges || cellRanges.length === 0) {
              return;
            } else {
              const expressions: string[] = [];
              cellRanges.map((range) => {
                var startRow = Math.min(range.startRow!.rowIndex, range.endRow!.rowIndex);
                var endRow = Math.max(range.startRow!.rowIndex, range.endRow!.rowIndex);
                for (var rowIndex = startRow; rowIndex <= endRow; rowIndex++) {
                  range.columns.forEach((column) => {
                    var rowModel = this.gridApi.getModel();
                    var rowNode = rowModel.getRow(rowIndex)!;
                    var name = this.gridApi.getValue('Name', rowNode);
                    const fieldName = this.metaData.fieldMap['TBA'][column.getColId()];
                    expressions.push(`dailyTracking:TBA:${name}:${fieldName.replace('InTicks', '')}`)
                  });
                }
              });
              const request: fromModels.IntradayRequest = { 'dates': null, 'expressions': expressions };
              this.loadIntradayPlot.emit({ request: request, metaData: this.metaData });
            }
          }
        };

        if(!params.column.getDefinition().headerName.includes('Input')){
          contextMenu.push(viewIntraday)
        }

        const viewHistory = {
          name: 'View History',
          icon: '<i class="material-icons small-menu-icon">timer</i>',
          action: () => {
            const cellRanges = params.api.getCellRanges()
            if (!cellRanges || cellRanges.length === 0) {
              return;
            } else {
              const expressions: string[] = [];
              cellRanges.map((range) => {
                var startRow = Math.min(range.startRow!.rowIndex, range.endRow!.rowIndex);
                var endRow = Math.max(range.startRow!.rowIndex, range.endRow!.rowIndex);
                for (var rowIndex = startRow; rowIndex <= endRow; rowIndex++) {
                  range.columns.forEach((column) => {
                    var rowModel = this.gridApi.getModel();
                    var rowNode = rowModel.getRow(rowIndex)!;
                    var name = this.gridApi.getValue('Name', rowNode);
                    const fieldName = this.metaData.fieldMap['TBA'][column.getColId()];
                    expressions.push(`dailyTracking:TBA:${name}:${fieldName.replace('InTicks', '')}`)
                  });
                }
              });
              const request: fromModels.EODRequest = {'expressions': expressions, 'startDate': null, 'endDate': null, useCumulative: false };
              this.loadEODPlot.emit({ request: request, metaData: this.metaData });
            }
          }
        };

        if (!params.column.getDefinition().headerName.includes('Input')) {
          contextMenu.push(viewHistory)
        }

        if (colId === 'swap_perf_ticks' || colId === 'tsy_perf_ticks') { 


          const viewHistoryCumulative = {
            name: 'View History (Cumulative)',
            icon: '<i class="material-icons small-menu-icon">timer</i>',
            action: () => {
              const cellRanges = params.api.getCellRanges()
              if (!cellRanges || cellRanges.length === 0) {
                return;
              } else {
                const expressions: string[] = [];
                cellRanges.map((range) => {
                  var startRow = Math.min(range.startRow!.rowIndex, range.endRow!.rowIndex);
                  var endRow = Math.max(range.startRow!.rowIndex, range.endRow!.rowIndex);
                  for (var rowIndex = startRow; rowIndex <= endRow; rowIndex++) {
                    range.columns.forEach((column) => {
                      var rowModel = this.gridApi.getModel();
                      var rowNode = rowModel.getRow(rowIndex)!;
                      var name = this.gridApi.getValue('Name', rowNode);
                      const fieldName = this.metaData.fieldMap['TBA'][column.getColId()];
                      expressions.push(`dailyTracking:TBA:${name}:${fieldName.replace('InTicks', '')}`)
                    });
                  }
                });
                const request: fromModels.EODRequest = { 'expressions': expressions, 'startDate': null, 'endDate': null, 'useCumulative': true };
                this.loadEODPlot.emit({ request: request, metaData: this.metaData });
              }
            }
          };

          if (!params.column.getDefinition().headerName.includes('Input')) {
            contextMenu.push(viewHistoryCumulative)
          }
        }

      }

      return contextMenu;
    },
    columnDefs: [
      {
        headerName: 'Group',
        field: 'customGroup',
        valueFormatter: params => params.value &&  params.value.split('/')[1],
        rowGroup: true,
        hide: true,
        minWidth: 60
      },
      {
        headerName: 'Name',
        field: 'Name', sort: 'asc',
        valueFormatter: params => params.value && params.value.split(' ')[1],
        cellStyle: {'font-weight': 'bold'},
        cellRenderer: 'DelayRendererComponent',
        minWidth: 60
      },
      {
        headerName: 'LivePx',
        headerTooltip: 'Live Price',
        field: 'realtime_price_ticks',
        cellStyle: { 'justify-content': 'flex-end', 'font-weight': 'bold', 'color': '#1550d7', 'text-align': 'right' },
        minWidth: 60
      },
      {
        headerName: 'Sw Perf',
        headerTooltip: 'Swap performance',
        field: 'swap_perf_ticks',
        maxWidth: 150,
        cellStyle: params => params.value[0] === '-' ?
          { 'color': '#f90000', 'justify-content': 'flex-end', 'font-weight': 'bold' } :
          { 'color': '#943492', 'justify-content': 'flex-end', 'font-weight': 'bold' }
      },
      {
        headerName: 'Tsy Perf',
        headerTooltip: 'Tsy performance',
        field: 'tsy_perf_ticks',
        cellStyle: params => params.value[0] === '-' ?
          { 'color': '#f90000', 'justify-content': 'flex-end', 'font-weight': 'bold' } :
          { 'color': '#943492', 'justify-content': 'flex-end', 'font-weight': 'bold' }
      },
      {
        headerName: 'Act Chg',
        headerTooltip: 'Actual Change',
        field: 'actual_change_ticks',
        cellStyle: params => params.value[0] === '-' ?
          { 'color': '#a24909', 'justify-content': 'flex-end', 'font-weight': 'bold' } :
          { 'color': '#289b2a', 'justify-content': 'flex-end', 'font-weight': 'bold' }
      },
      {
        headerName: 'HR10',
        field: 'HR10_calc',
        headerTooltip: 'HR10 (Implied)',
        valueFormatter: params => params.value && (params.value * 100.0).toFixed(0)  + '%',
        cellStyle: { 'justify-content': 'flex-end', 'font-weight': 'bold' },
        suppressCellFlash: true
      },
      {
        headerName: 'HR5',
        headerTooltip: 'HR5 (Implied)',
        field: 'HR5_calc',
        valueFormatter: params => params.value && (params.value * 100.0).toFixed(0) + '%',
        cellStyle: { 'justify-content': 'flex-end', 'font-weight': 'bold' },
        suppressCellFlash: true
      },
      {
        headerName: '102 (Imp)',
        headerTooltip: '102Cpn (Implied)',
        field: '102Coupon_calc',
        valueFormatter: params => params.value && params.value.toFixed(2),
        cellStyle: { 'justify-content': 'flex-end', 'font-weight': 'bold' }
      },
      {
        headerName: 'HR10 (Input)',
        headerTooltip: 'HR10 (Input)',
        field: 'HR10',
        editable: true,
        valueFormatter: params => params.value && (params.value * 100.0).toFixed(0) + '%',
        cellStyle: { 'background': '#cdfac7', 'justify-content': 'flex-end' },
        valueSetter: params => {
          return this.setInput(params, 'HR10', false);
        },
        hide: this.utilityService.isCompactMode()
      },
      {
        headerName: 'CV01 (Input)',
        headerTooltip: 'Convexity Adj. (Input)',
        field: 'CV01',
        editable: true,
        valueFormatter: params => params.value && params.value.toFixed(0),
        cellStyle: { 'background': '#cdfac7', 'justify-content': 'flex-end' },
        valueSetter: params => {
          return this.setInput(params, 'CV01', false);
        },
        hide: this.utilityService.isCompactMode()
      },
      {
        headerName: '10YrDV01 (Input)',
        headerTooltip: '10Yr DV01 (Input)',
        field: '10YrDV01',
        editable: true,
        valueFormatter: params => params.value && params.value.toFixed(0),
        cellStyle: { 'background': '#cdfac7', 'justify-content': 'flex-end' },
        valueSetter: params => {
          return this.setInput(params, '10YrDV01', true);
        },
        hide: this.utilityService.isCompactMode()
      },
      {
        headerName: '102 (Input)',
        headerTooltip: '102 Coupon (Input)',
        field: '102Coupon',
        editable: true,
        valueFormatter: params => params.value && params.value.toFixed(2),
        cellStyle: { 'background': '#cdfac7', 'justify-content': 'flex-end' },
        valueGetter: params => {
          if(params.data === undefined){
            return ''
          } 
          return params.data['102Coupon'];
        },
        valueSetter: params => {
          return this.setInput(params, '102Coupon', true);
        },
        hide: this.utilityService.isCompactMode()
      },
    ],
    groupUseEntireRow: true,
    onRowDataChanged: event => {
      event.api.expandAll();
    },
    onFirstDataRendered: event => {
      event.api.expandAll();
    },


    headerHeight: this.utilityService.isCompactMode() ? 16 : 24,
    rowClass: this.utilityService.isCompactMode() ? 'ultra-small-row' : 'small-row',
    rowHeight: this.utilityService.isCompactMode() ? 12 : 16
  };

  constructor(private utilityService: DailyTrackingUtilityService) {
    this.customGridCallBack = this.customGridCallBack.bind(this);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.data && changes.data.currentValue && this.gridApi) {
        this.gridApi.setRowData(changes.data.currentValue);
        this.gridApi.refreshCells({force: true});
    }
  }

  ngOnInit() {
  }

  customGridCallBack(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.ColumnApi;
    if (this.data.length > 0) { this.gridApi.setRowData(this.data); }

  }

  // Utility --------------------------------------------------------------------------

  getRowData() {
    const rowData = [];
    this.gridApi.forEachNode(function(node) {
      rowData.push(node.data);
    });
    return rowData;
  }

  getInputs(): any {
    const result = {};
    result['hedgeRatios'] = [];
    result['10YrDV01'] = this.data.length > 0 ? this.data[0]['10YrDV01'] : null;
    result['102Coupon'] = this.data.length > 0 ? this.data[0]['102Coupon'] : null;
    this.data.map((item: any) => {
      result['hedgeRatios'].push({'name': item.Name, 'HR10': item.HR10, 'CV01': item.CV01});
    });
    return result;
  }

  setInput(params: any, property: string, updateAll: boolean): boolean {
    // this.cellEditingStarted.emit();
    if (isNaN(parseFloat(params.newValue))) {
      return false;
    } else {
      const newValue = parseFloat(params.newValue);
      if (updateAll) {
        this.data = this.data.map((item => {
          item[property] = newValue;
          return item;
        }));
      } else {
        params.data[property] = newValue;
      }
      const userInputs = this.getInputs();
      this.updateUserInputs.emit(userInputs);
      return true;
    }
  }
}
