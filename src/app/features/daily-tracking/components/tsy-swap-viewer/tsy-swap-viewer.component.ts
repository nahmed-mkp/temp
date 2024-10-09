import { Component, OnInit, Input, OnChanges, SimpleChanges, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { GridOptions, GridApi, ColumnApi } from 'ag-grid-community';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatLegacySlideToggleChange as MatSlideToggleChange } from '@angular/material/legacy-slide-toggle';

import * as moment from 'moment';

import * as fromModels from '../../models';

import { DailyTrackingUtilityService } from '../../services';
import { DelayRendererComponent } from '../delay-renderer/delay-renderer.component';

@Component({
  selector: 'app-tsy-swap-viewer',
  templateUrl: './tsy-swap-viewer.component.html',
  styleUrls: ['./tsy-swap-viewer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TsySwapViewerComponent implements OnInit, OnChanges {

  @Input() metaData: fromModels.IntradayMetaData;

  @Input() data: fromModels.TsySwap[];
  @Input() loading: boolean;
  @Input() mode: string;
  @Input() date: string;
  @Input() streamingStatus: boolean;
  @Input() compaceViewingMode: boolean;
  @Input() useSOFR: boolean;
  @Input() useLegacy: boolean;

  @Output() changeDate = new EventEmitter<string>();
  @Output() toggleStreaming = new EventEmitter<boolean>();
  @Output() changeMode = new EventEmitter<void>();
  @Output() takeSnapshot = new EventEmitter<void>();
  @Output() openCompactMode = new EventEmitter<void>();
  @Output() restartTradewebExcel = new EventEmitter<void>();
  @Output() useSOFRSpreads = new EventEmitter<boolean>();
  @Output() useLegacyMode = new EventEmitter<boolean>();
  @Output() toggleShowDurations = new EventEmitter<boolean>();

  @Output() loadIntradayPlot: EventEmitter<fromModels.IntradayRequestAndMetaData>
    = new EventEmitter<fromModels.IntradayRequestAndMetaData>();

  @Output() loadEODPlot: EventEmitter<fromModels.EODRequestAndMetaData>
    = new EventEmitter<fromModels.EODRequestAndMetaData>();

  private gridApi: GridApi;
  private gridColumnApi: ColumnApi;

  public showDurations = false;

  public size = 25;
  public extraOption = {sizeColumnsToFit: true};
  public customGridOption: GridOptions = {

    defaultColDef: {
      cellStyle: params => {
          return { 'justify-content': 'flex-end' };
          // return typeof params.value === 'number' ? {'justify-content': 'flex-end'} : { };
      },
      filter: 'agTextColumnFilter',
      enableCellChangeFlash: false,
      cellRenderer: 'agAnimateShowChangeCellRenderer',
    },

    getRowNodeId: data => data.Id,
    getRowStyle: params => {
      return { background: (params.node.rowIndex % 2 === 0) ? '#ffff99' : '#ccffff' };
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
                    var name = this.gridApi.getValue('maturity', rowNode);
                    const fieldName = this.metaData.fieldMap['TRSY'][column.getColId()];
                    expressions.push(`dailyTracking:TRSY:${name}:${fieldName.replace('InTicks', '')}`)
                  });
                }
              });
              const request: fromModels.IntradayRequest = { 'dates': null, 'expressions': expressions };
              this.loadIntradayPlot.emit({ request: request, metaData: this.metaData });
            }
          }
        };
        contextMenu.push(viewIntradayPlot);

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
                    var name = this.gridApi.getValue('maturity', rowNode);
                    const fieldName = this.metaData.fieldMap['TRSY'][column.getColId()];
                    expressions.push(`dailyTracking:TRSY:${name}:${fieldName.replace('InTicks', '')}`)
                  });
                }
              });
              const request: fromModels.EODRequest = { 'expressions': expressions, 'startDate': null, 'endDate': null, useCumulative: false};
              this.loadEODPlot.emit({ request: request, metaData: this.metaData });
            }
          }
        };
        contextMenu.push(viewHistory)        
      }

      return contextMenu;
    },
    columnDefs: [
      {
          children: [
            {
              headerName: 'Maturity',
              field: 'maturity',
              cellClass: ['right-border'],
              cellStyle: { 'font-weight': 'bold' },
              cellRenderer: 'DelayRendererComponent',
              valueFormatter: params => params.value && params.value + 'YR',
              minWidth: 60
            },
            {
              headerName: 'Tsy Px',
              field: 'realtime_tsy_px_ticks',
              cellStyle: { 'justify-content': 'flex-end', 'font-weight': 'bold', 'color': '#2c4ff5' },
              minWidth: 60
            },
            {
              headerName: 'Tsy Yld',
              field: 'realtime_tsyyield',
              cellClass: ['right-border', 'cell-bold'],
              cellStyle: { 'justify-content': 'flex-end' }, valueGetter: this.utilityService.formatNumberStrictWithBrackets(3)
            },
            {
              headerName: 'Swap Yld',
              field: 'realtime_swap_yield',
              cellClass: ['cell-bold'],
              cellStyle: { 'justify-content': 'flex-end' },
              valueGetter: this.utilityService.formatNumberStrict(3)
            },
        { headerName: 'Swap Sprd', field: 'realtime_swap_spread', cellClass: ['right-border'], cellStyle: { 'justify-content': 'flex-end', 'font-weight': 'bold', 'color': '#2c4ff5' }, valueGetter: this.utilityService.formatNumberStrict(2)},
      ]},

      {headerName: '', children: [
        {
          headerName: 'Px (Chg)',
          headerTooltip: 'Change in Treasury Px',
          field: 'change_px_ticks',
          cellStyle: params => {
            return params.value && params.value[0] === '(' ?
              { 'color': '#f90000', 'justify-content': 'flex-end', 'font-weight': 'bold' } :
              { 'color': '#289b2a', 'justify-content': 'flex-end', 'font-weight': 'bold' };
          }
        },
        {
          headerName: 'Tsy Yld (Chg)',
          headerTooltip: 'Change in Treasury Yield',
          field: 'change_tsy_yld',
          cellClass: ['right-border'],
          cellStyle: params => {
            return params.value && params.value[0] === '(' ?
              { 'color': '#f90000', 'justify-content': 'flex-end', 'font-weight': 'bold' } :
              { 'color': '#289b2a', 'justify-content': 'flex-end', 'font-weight': 'bold' };
          },
          valueGetter: this.utilityService.formatNumberStrictWithBrackets(1)
        },
        {
          headerName: 'Sw Yld (Chg)',
          headerTooltip: 'Change in Swap Yield',
          field: 'change_swap_yld',
          cellStyle: params => {
            return params.value && params.value[0] === '(' ?
            { 'color': '#f90000', 'justify-content': 'flex-end', 'font-weight': 'bold' } :
            { 'color': '#289b2a', 'justify-content': 'flex-end', 'font-weight': 'bold' };
          },
          valueGetter: this.utilityService.formatNumberStrictWithBrackets(1)
        },
        {
          headerName: 'Sw Sp (Chg)',
          headerTooltip: 'Change in Swap Spread',
          field: 'change_swap_spread',
          cellStyle: params => {
            return params.value && params.value[0] === '(' ?
              { 'color': '#f90000', 'justify-content': 'flex-end', 'font-weight': 'bold' } :
              { 'color': '#289b2a', 'justify-content': 'flex-end', 'font-weight': 'bold' };
          },
          valueGetter: this.utilityService.formatNumberStrictWithBrackets(1)
        },
        {
          headerName: 'Sw Sp Eff',
          field: 'swap_spread_eff',
          cellClass: ['right-border'],
          cellStyle: params => {
            return params.value && params.value[0] === '(' ?
              { 'color': '#f90000', 'justify-content': 'flex-end', 'font-weight': 'bold' } :
              { 'color': '#289b2a', 'justify-content': 'flex-end', 'font-weight': 'bold' };
          },
          valueGetter: this.utilityService.formatNumberStrictWithBrackets(1)
        },
      ]},

      {headerName: 'Close', children: [
        { headerName: 'DV01', field: 'close_dv01', cellClass: ['cell-bold'], valueGetter: this.utilityService.formatNumberStrictWithBrackets(0)},
        {headerName: 'Tsy Px', field: 'close_price_ticks', cellClass: ['cell-bold']},
        { headerName: 'Tsy Yld', field: 'close_tsy_yield', cellClass: ['cell-bold'], valueGetter: this.utilityService.formatNumberStrictWithBrackets(3)},
        { headerName: 'Sw Yld', field: 'close_swap_yield', cellClass: ['cell-bold'], valueGetter: this.utilityService.formatNumberStrictWithBrackets(3)},
        { headerName: 'Sw Sprd', field: 'close_swap_spread', cellClass: ['cell-bold'], valueGetter: this.utilityService.formatNumberStrictWithBrackets(2)},
      ]},
    ],
    headerHeight: this.utilityService.isCompactMode() ? 16 : 24,
    rowClass: this.utilityService.isCompactMode() ? 'ultra-small-row' : 'small-row',
    rowHeight: this.utilityService.isCompactMode() ? 12 : 16
  };

  constructor(public utilityService: DailyTrackingUtilityService) {
    this.customGridCallBack = this.customGridCallBack.bind(this);
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.data && changes.data.currentValue && this.gridApi) {
        this.gridApi.setRowData(changes.data.currentValue);
        this.gridApi.refreshCells({force: true});
    }
  }

  customGridCallBack(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.ColumnApi;
    if (this.data.length > 0) { this.gridApi.setRowData(this.data); }
  }

  onSizeChange(size: number) {
    this.gridApi.refreshCells({columns: ['size']});
  }

    // Utility --------------------------------------------------------------------------

  getRowData() {
      const rowData = [];
      this.gridApi.forEachNode(function(node) {
        rowData.push(node.data);
      });
      return rowData;
  }

  isLive(): boolean {
    if (this.date) {
      const date_mmt = moment(this.date, 'MM/DD/YYYY');
      if (date_mmt >= moment(moment().format('MM/DD/YYYY'), 'MM/DD/YYYY')) {
        return true;
      }
    }
    return false;
  }

  onDateChanged(e: MatDatepickerInputEvent<Date>): void {
    this.changeDate.emit(moment(e.value).format('MM/DD/YYYY'));
  }

  onToggleStreaming() {
    this.setColumnDefs();
    this.toggleStreaming.emit(!this.streamingStatus);
  }

  onModeChanged(e: MatSlideToggleChange): void {
    this.setColumnDefs();
    this.changeMode.emit();
  }

  toggleSOFRSpreads(e: MatSlideToggleChange): void {
    this.useSOFRSpreads.emit(e.checked);
  }

  toggleLegacyMode(e: MatSlideToggleChange): void {
    this.useLegacyMode.emit(e.checked);
  }

  onTakeSnapshot(): void {
    this.takeSnapshot.emit();
  }

  onOpenCompactMode(): void {
    this.openCompactMode.emit();
  }

  onRestartTradewebExcel(): void { 
    this.restartTradewebExcel.emit();
  }

  onShowDurationsChanged(): void { 
    this.showDurations = !this.showDurations;
    this.toggleShowDurations.emit(this.showDurations);
  }

  private setColumnDefs(): void {
    if (this.streamingStatus) {
      this.customGridOption.columnDefs[0].headerName = `(${(new Date()).toLocaleDateString()})`;
    } else {
      this.customGridOption.columnDefs[0].headerName = `(${(new Date()).toLocaleDateString()})`;
    }
    this.gridApi.setColumnDefs([]);
    this.gridApi.setColumnDefs(this.customGridOption.columnDefs);
    this.gridApi.sizeColumnsToFit();
  }

}
