import { Component, OnInit, Input, SimpleChanges, OnChanges, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { GridOptions, GridApi, ColumnApi } from 'ag-grid-community';
import { DailyTrackingUtilityService } from '../../services';

import * as fromModels from './../../models/daily-tracking.models';

@Component({
  selector: 'app-mbs-risk-viewer',
  templateUrl: './mbs-risk-viewer.component.html',
  styleUrls: ['./mbs-risk-viewer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MbsRiskViewerComponent implements OnInit, OnChanges {

  @Input() metaData: fromModels.IntradayMetaData;
  
  @Input() data: any[];
  @Input() loading: boolean;

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
          return typeof params.value === 'number' ? {'justify-content': 'flex-end'} : { };
      },
      filter: 'agTextColumnFilter',
      enableCellChangeFlash: false,
      cellRenderer: 'agAnimateShowChangeCellRenderer'
    },

    autoGroupColumnDef: {
      cellRendererParams: {
          suppressCount: true,
      },
      headerName: 'Name',
      field: 'Name',
      cellRenderer: 'agGroupCellRenderer',
      valueFormatter: params => params.value && params.value.split(' ')[1],
      cellStyle: { 'font-weight': 'bold' },
      minWidth: 60
    },

    getRowNodeId: data => data.Id,

    getRowStyle: params => {
      if (params.node.leafGroup) {
        return;
      }
      return { background: (params.node.rowIndex % 2 === 1) ? '#ffff99' : '#ccffff' };
    },

    deltaRowDataMode: true,
    getContextMenuItems: (params) => {

      let contextMenu: any[] = [];

      contextMenu = ['copy', 'copyWithHeaders', 'separator', 'csvExport', 'excelExport'];
      const colId = params.column.getColId();
      if (colId !== 'Name') {

        contextMenu.push('separator');

        const viewIntradayPlot = {
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
              this.loadIntradayPlot.emit({request: request, metaData: this.metaData});
            }
          }
        };

        
        if(params.column.getDefinition().headerName !== ""){
          contextMenu.push(viewIntradayPlot)
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
              const request: fromModels.EODRequest = { 'expressions': expressions, 'startDate': null, 'endDate': null, 'useCumulative': false };
              this.loadEODPlot.emit({ request: request, metaData: this.metaData });
            }
          }
        };

        if (!params.column.getDefinition().headerName.includes('Input')) {
          contextMenu.push(viewHistory)
        }

      }

      return contextMenu;
    },

    columnDefs: [
      {
        headerName: 'CustomGroup',
        field: 'customGroup',
        valueFormatter: params => params.value &&  params.value.split('/')[1],
        rowGroup: true,
        hide: true,
        cellStyle: { 'font-weight': 'bold' }
      },
      {
        headerName: 'Name',
        field: 'Name',
        sort: 'asc',
        valueFormatter: params => params.value && params.value.split(' ')[1],
        cellStyle: {'font-weight': 'bold'},
        hide: true
      },
      {
        headerName: 'Cpn Swp',
        headerTooltip: 'Coupon Swap',
        field: 'cpn_swap_ticks',
        cellStyle: { 'justify-content': 'flex-end', 'font-weight': 'bold', 'color': '#1550d7' }
      },
      {
        headerName: 'Cpn fly',
        headerTooltip: 'Coupon Fly',
        field: 'cpn_fly_ticks',
        cellStyle: { 'justify-content': 'flex-end', 'font-weight': 'bold', 'color': '#1550d7' }
      },
      {
        headerName: 'Sw50 pf',
        headerTooltip: 'Swp50 perf.',
        field: 'sw50_perf_ticks',
        cellStyle: params =>  params.value && params.value[0] === '-' ?
          { 'color': '#f90000', 'justify-content': 'flex-end', 'font-weight': 'bold' } :
          { 'color': '#943492', 'justify-content': 'flex-end', 'font-weight': 'bold' }
      },
      {
        headerName: 'Fly pf',
        headerTooltip: 'Fly perf.',
        field: 'fly_perf_ticks',
        cellStyle: params => params.value && params.value[0] === '-' ?
          { 'color': '#f90000', 'justify-content': 'flex-end', 'font-weight': 'bold' } :
          { 'color': '#943492', 'justify-content': 'flex-end', 'font-weight': 'bold' }
      },
      {
        headerName: 'Sw100 pf',
        headerTooltip: 'Swp100 perf.',
        field: 'sw100_perf_ticks',
        valueGetter: params => {
          if (params.data) {
            if (params.data['customGroup'] === 'OTR/FNCL' || params.data['customGroup'] === 'OTR/FNCI') {
              return params.data['sw100_perf_ticks'];
            } else if (params.data['customGroup'] === 'OTR/G2SF') {
              return params.data['g2_fn_ticks'];
            } else {
              return 'N/A';
            }
          } else {
            if (params.node.key.includes('G2SF')) {
              return 'G2/Fn';
            }
          }
        },
        cellStyle: params => {
          if (params.value && typeof params.value === 'string' && params.data) {
            if (params.data['customGroup'] === 'OTR/FNCL' || params.data['customGroup'] === 'OTR/FNCI') {
              return params.value[0] === '-' ?
                { 'color': '#f90000', 'justify-content': 'flex-end', 'font-weight': 'bold' } :
                { 'color': '#943492', 'justify-content': 'flex-end', 'font-weight': 'bold' };
            } else if (params.data['customGroup'] === 'OTR/G2SF') {
              return { 'color': '#1550d7', 'justify-content': 'flex-end', 'font-weight': 'bold' };
            }
          }
        }
      },
      {
        headerName: '',
        field: 'LOAS',
        valueGetter: params => {
          if (params.data) {
            if (params.data['customGroup'] === 'OTR/FNCL') {
              return params.data['LOAS'];
            } else if (params.data['customGroup'] === 'OTR/FNCI') {
              return params.data['N15_30w_ticks'];
            } else if (params.data['customGroup'] === 'OTR/G2SF') {
              return params.data['g2_fn_change_ticks'];
            } else {
              return 'N/A';
            }
          } else {
            if (params.node.key.includes('FNCI')) {
              return '15/30w';
            } else if (params.node.key.includes('G2SF')) {
              return 'Chg';
            }
          }
        },
        cellStyle: params => {
          if (params.value && typeof params.value === 'string' && params.data) {
            if (params.data['customGroup'] === 'OTR/FNCL') {
              return {};
            } else if (params.data['customGroup'] === 'OTR/FNCI' || params.data['customGroup'] === 'OTR/G2SF') {
              return params.value[0] === '-' ?
                { 'color': '#f90000', 'justify-content': 'flex-end', 'font-weight': 'bold' } :
                { 'color': '#943492', 'justify-content': 'flex-end', 'font-weight': 'bold' };
            }
          }
        }
      },
      {
        headerName: '',
        field: 'LZV',
        valueGetter: params => {
          if (params.data) {
            if (params.data['customGroup'] === 'OTR/FNCL') {
              return params.data['LZV'];
            } else if (params.data['customGroup'] === 'OTR/FNCI') {
              return params.data['N15_30_ticks'];
            } else if (params.data['customGroup'] === 'OTR/G2SF') {
              return params.data['vs_hedge_ticks'];
            } else {
              return 'N/A';
            }
          } else {
            if (params.node.key.includes('FNCI')) {
              return '15/30';
            } else if (params.node.key.includes('G2SF')) {
              return 'vs HR';
            }
          }
        },
        cellStyle: params => {
          if (params.value && typeof params.value === 'string' && params.data) {
            if (params.data['customGroup'] === 'OTR/FNCL') {
              return {};
            } else if (params.data['customGroup'] === 'OTR/FNCI') {
              return { 'color': '#1550d7', 'justify-content': 'flex-end', 'font-weight': 'bold' };
            } else if (params.data['customGroup'] === 'OTR/G2SF') {
              return params.value[0] === '-' ?
                { 'color': '#f90000', 'justify-content': 'flex-end', 'font-weight': 'bold' } :
                { 'color': '#943492', 'justify-content': 'flex-end', 'font-weight': 'bold' };
            }
          }
        }
      },
      // {
      //   headerName: '15/30w',
      //   field: 'N15_30w_ticks',
      //   headerTooltip: '15/30w',
      //   width: 200,
      //   cellStyle: params => params.value && params.value[0] === '-' ?
      //     { 'color': '#f90000', 'justify-content': 'flex-end', 'font-weight': 'bold' } :
      //     { 'color': '#943492', 'justify-content': 'flex-end', 'font-weight': 'bold' }
      // },
      // {
      //   headerName: '15/30',
      //   field: 'N15_30_ticks',
      //   width: 200,
      //   headerTooltip: '15/30',
      //   cellStyle: { 'color': '#1550d7', 'justify-content': 'flex-end', 'font-weight': 'bold' }
      // },
      // {
      //   headerName: 'G2/Fn',
      //   headerTooltip: 'G2 vs. Fn',
      //   field: 'g2_fn_ticks',
      //   cellStyle: { 'color': '#1550d7', 'justify-content': 'flex-end', 'font-weight': 'bold' }
      // },
      // {
      //   headerName: 'Chg',
      //   headerTooltip: 'Change',
      //   field: 'g2_fn_change_ticks',
      //   cellStyle: params => params.value[0] === '-' ?
      //     { 'color': '#f90000', 'justify-content': 'flex-end', 'font-weight': 'bold' } :
      //     { 'color': '#943492', 'justify-content': 'flex-end', 'font-weight': 'bold' }
      // },
      // {
      //   headerName: 'vs. Hedge',
      //   headerTooltip: 'vs. Hedge',
      //   field: 'vs_hedge_ticks',
      //   cellStyle: params => params.value[0] === '-' ?
      //     { 'color': '#f90000', 'justify-content': 'flex-end', 'font-weight': 'bold' } :
      //     { 'color': '#943492', 'justify-content': 'flex-end', 'font-weight': 'bold' }
      // },
      {
        headerName: 'Bps Chg',
        headerTooltip: 'Bps Change',
        field: 'bps_change',
        valueGetter: this.utilityService.formatNumberStrictWithBrackets(1),
        cellStyle: params => params.value && params.value[0] === '(' ?
          { 'color': '#f90000', 'justify-content': 'flex-end', 'font-weight': 'bold' } :
          { 'color': '#289b2a', 'justify-content': 'flex-end', 'font-weight': 'bold' }
      },
      {
        headerName: 'Roll',
        headerTooltip: 'Roll',
        field: 'roll_ticks',
        cellStyle: { 'justify-content': 'flex-end', 'font-weight': 'bold', 'color': '#1550d7' }
      },
      {
        headerName: 'Roll Chg',
        headerTooltip: 'Roll change',
        field: 'roll_chg_ticks',
        cellStyle: params => params.value && params.value[0] === '-' ?
          { 'color': '#f90000', 'justify-content': 'flex-end', 'font-weight': 'bold' } :
          { 'color': '#943492', 'justify-content': 'flex-end', 'font-weight': 'bold' }
      }
    ],
    groupUseEntireRow: false,
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

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.data && changes.data.currentValue && this.gridApi) {
      // if(changes.data.previousValue && changes.data.previousValue.length > 0) {
      //     const oldData = this.getRowData();
      //     const [updateRows, removeRows, addRows] = this.utilityService.gridValueUpdater(this.utilityService.deepCopy(changes.data.currentValue), oldData);
      //     this.gridApi.updateRowData({update: updateRows, remove: removeRows, add: addRows});
      //     // console.log('nodeImpacted raw', nodeImpacted)
      // } else {
      //   // console.log('complete reset data, raw')
      //   this.gridApi.setRowData(this.utilityService.deepCopy(this.data));
      // }
      this.gridApi.setRowData(changes.data.currentValue);
    }
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

}
