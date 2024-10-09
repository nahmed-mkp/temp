import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild, Output, EventEmitter } from '@angular/core';
import { GridOptions, GridApi, ColumnApi, ValueFormatterParams, ValueGetterParams, ColDef, RowNode } from 'ag-grid-community';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { MatLegacyTabChangeEvent as MatTabChangeEvent, MatLegacyTabGroup as MatTabGroup } from '@angular/material/legacy-tabs';

import { JbotTimeseriesDialogLayoutComponent } from '../../containers/jbot-timeseries-dialog-layout/jbot-timeseries-dialog-layout.component';
import * as fromModels from '../../models';
import { ColorCodingService } from '../../services';
import { FirstDataRenderedEvent } from 'ag-grid-community/dist/lib/events';

@Component({
  selector: 'app-jbot-viewer',
  templateUrl: './jbot-viewer.component.html',
  styleUrls: ['./jbot-viewer.component.scss']
})
export class JbotViewerComponent implements OnInit, OnChanges {

  @Input() plotData: fromModels.JbotGridData[];
  @Input() jbotResultLoadingStatus = false;
  @Input() deltaMode: boolean;
  @Input() routeDirectInstrument: string;

  @Output() loadTimeSeries: EventEmitter<{category: string, seriesName: string}> =
    new EventEmitter<{category: string, seriesName: string}>();

  @ViewChild('tabs') tabGroup: MatTabGroup;

  private gridApi: GridApi;
  private gridColumnApi: ColumnApi;
  private activeTab = 'cbs';

  private plotDataGroupingStatistic: {
    [category: string]: {
      [field: string]: number[];
    }
  } = {};

  public extraOption = {};
  public categories: string[] = [];
  public plotDataGrouping: {
    [category: string]: fromModels.JbotGridData[]
  };
  public dataRendering = false;

  public customGridOption: GridOptions = {
    defaultColDef: {
      cellStyle: params => {
          return typeof params.value === 'number' ? {'justify-content': 'flex-end'} : { };
      },
      filter: 'agNumberColumnFilter',
      width: 90
    },

    columnDefs: [
      {headerName: 'Name', field: 'seriesName', pinned: 'left', width: 200, suppressAutoSize: true, filter: 'agTextColumnFilter'},
      {headerName: 'Percentile%', field: 'percentile', width: 100, valueFormatter: this.wholePercentRoundOff},
      {headerName: 'Positive%', field: 'pctPositive', width: 100,  valueFormatter: this.wholePercentRoundOff},
      {headerName: 'Negative%', field: 'pctNegative', width: 100, cellClass: 'right-border', valueFormatter: this.wholePercentRoundOff},
      {headerName: 'Count', field: 'count', cellClass: 'right-border'},
      {headerName: 'Mean', field: 'mean' , valueFormatter: this.percentCellFormatter.bind(this)},
      {headerName: 'Median', field: 'median', valueFormatter: this.percentCellFormatter.bind(this)},
      {headerName: 'Since', field: 'since', cellClass: 'right-border', valueFormatter: this.percentCellFormatter.bind(this)},
      {headerName: 'When', field: 'when', filter: 'agDateColumnFilter',
        filterParams: { comparator: this.dateComparator}
      },
      {headerName: 'Mean C', field: 'mean_C', valueFormatter: this.percentCellFormatter.bind(this)},
      {headerName: 'Median C', field: 'median_C', valueFormatter: this.percentCellFormatter.bind(this)},
      {headerName: 'Low', field: 'low', valueFormatter: this.percentCellFormatter.bind(this)},
      {headerName: 'High', field: 'high', cellClass: 'right-border', valueFormatter: this.percentCellFormatter.bind(this)},
      {headerName: 'Faux Sharpe', field: 'fauxSharpe', valueFormatter: this.regularRoundOff(2)},
      {headerName: 'Spearman', field: 'spearman', valueFormatter: this.regularRoundOff(2)},
      {headerName: 'Avg Sigs', field: 'av_Sigs', width: 100, valueFormatter: this.regularRoundOff(0)},
      {headerName: 'Now Sigs', field: 'now_Sigs', width: 100, valueFormatter: this.regularRoundOff(0)},
      {headerName: 'NoPrinct%', field: 'noPrint_Pct', width: 100,
        valueFormatter: params => typeof params.value === 'number' ? Math.round(params.value * 100).toFixed(0) + '%' : params.value},
      {headerName: 'Trade Sig', field: 'highRiskReward', width: 100, filter: 'agTextColumnFilter'},
    ],

    floatingFilter: true,

     // Basic Context Menu Setup
    getContextMenuItems: (params) => {
      const viewTimeSeries = {
        name: 'View Timeseries',
        action: this.openTimeseriesPlot(params.column.getColId(), params.node.data['seriesName'])
      };

      return ['copy', 'copyWithHeaders', 'separator', 'csvExport', 'excelExport', 'separator', viewTimeSeries];
    },
    sideBar: true,

    onFirstDataRendered: (params) => {
      this.dataRendering = false;
      this.columnColorCoding(params);
    },

    onRowDataChanged: this.locateInstrument.bind(this),

    getRowStyle: params => {
      if (params.data['highRiskReward']) { return {'font-weight': 'bolder'}; }
    },

    rowBuffer: 500,
  };

  public customGridOption_delta: GridOptions = {
    defaultColDef: {
      cellStyle: params => {
          return typeof params.value === 'number' ? {'justify-content': 'flex-end'} : { };
      },
      filter: 'agNumberColumnFilter',
      width: 90
    },

    columnDefs: [
      {headerName: 'Name', field: 'seriesName', pinned: 'left', width: 200, suppressAutoSize: true, filter: 'agTextColumnFilter'},

      {headerName: 'Percentile%(D)', field: 'percentile_chg_dod', width: 100, valueFormatter: this.wholePercentRoundOff},
      {headerName: 'Percentile%(W)', field: 'percentile_chg_wow', width: 100, cellClass: 'right-border', valueFormatter: this.wholePercentRoundOff},
      {headerName: 'Positive%(D)', field: 'pctPositive_chg_dod', width: 100,  valueFormatter: this.wholePercentRoundOff, hide: true},
      {headerName: 'Positive%(W)', field: 'pctPositive_chg_wow', width: 100, cellClass: 'right-border', valueFormatter: this.wholePercentRoundOff, hide: true},
      {headerName: 'Negative%(D)', field: 'pctNegative_chg_dod', width: 100,  valueFormatter: this.wholePercentRoundOff, hide: true},
      {headerName: 'Negative%(W)', field: 'pctNegative_chg_wow', width: 100, cellClass: 'right-border', valueFormatter: this.wholePercentRoundOff, hide: true},
      {headerName: 'Count(D)', field: 'count_chg_dod', hide: true},
      {headerName: 'Count(W)', field: 'count_chg_wow', cellClass: 'right-border', hide: true},
      {headerName: 'Mean(D)', field: 'mean_chg_dod' , valueFormatter: this.percentCellFormatter.bind(this), hide: true},
      {headerName: 'Mean(W)', field: 'mean_chg_wow', cellClass: 'right-border', valueFormatter: this.percentCellFormatter.bind(this), hide: true},
      {headerName: 'Median(D)', field: 'median_chg_dod', valueFormatter: this.percentCellFormatter.bind(this), hide: true},
      {headerName: 'Median(W)', field: 'median_chg_wow', cellClass: 'right-border', valueFormatter: this.percentCellFormatter.bind(this), hide: true},
      {headerName: 'Since(D)', field: 'since_chg_dod', valueFormatter: this.percentCellFormatter.bind(this), hide: true},
      {headerName: 'Since(W)', field: 'since_chg_wow', cellClass: 'right-border', valueFormatter: this.percentCellFormatter.bind(this), hide: true},
      {headerName: 'Mean C(D)', field: 'mean_C_chg_dod', valueFormatter: this.percentCellFormatter.bind(this), hide: true},
      {headerName: 'Mean C(W)', field: 'mean_C_chg_wow', cellClass: 'right-border', valueFormatter: this.percentCellFormatter.bind(this), hide: true},
      {headerName: 'Median C(D)', field: 'median_C_chg_dod', valueFormatter: this.percentCellFormatter.bind(this), hide: true},
      {headerName: 'Median C(W)', field: 'median_C_chg_wow', cellClass: 'right-border', valueFormatter: this.percentCellFormatter.bind(this), hide: true},
      {headerName: 'Low(D)', field: 'low_chg_dod', valueFormatter: this.percentCellFormatter.bind(this), hide: true},
      {headerName: 'Low(W)', field: 'low_chg_wow', cellClass: 'right-border', valueFormatter: this.percentCellFormatter.bind(this), hide: true},
      {headerName: 'High(D)(W)', field: 'high_chg_dod', valueFormatter: this.percentCellFormatter.bind(this), hide: true},
      {headerName: 'High(W)', field: 'high_chg_wow', cellClass: 'right-border', valueFormatter: this.percentCellFormatter.bind(this), hide: true},
      {headerName: 'Faux Sharpe(D)', field: 'fauxSharpe_chg_dod', valueFormatter: this.regularRoundOff(2), hide: true},
      {headerName: 'Faux Sharpe(W)', field: 'fauxSharpe_chg_wow', cellClass: 'right-border', valueFormatter: this.regularRoundOff(2), hide: true},
      {headerName: 'Spearman(D)', field: 'spearman_chg_dod', valueFormatter: this.regularRoundOff(2), hide: true},
      {headerName: 'Spearman(W)', field: 'spearman_chg_wow', cellClass: 'right-border', valueFormatter: this.regularRoundOff(2), hide: true},
      {headerName: 'Avg Sigs(D)', field: 'av_Sigs_chg_dod', width: 100, valueFormatter: this.regularRoundOff(0), hide: true},
      {headerName: 'Avg Sigs(W)', field: 'av_Sigs_chg_wow', cellClass: 'right-border', width: 100, valueFormatter: this.regularRoundOff(0), hide: true},
      {headerName: 'Now Sigs(D)', field: 'nowSigs_chg_dod', width: 100, valueFormatter: this.regularRoundOff(0), hide: true},
      {headerName: 'Now Sigs(W)', field: 'nowSigs_chg_wow', cellClass: 'right-border', width: 100, valueFormatter: this.regularRoundOff(0), hide: true},
      {headerName: 'NoPrinct%(D)', field: 'noPrint_Pct_chg_dod', width: 100,
        valueFormatter: params => typeof params.value === 'number' ? Math.round(params.value * 100).toFixed(0) + '%' : params.value, hide: true},
      {headerName: 'NoPrinct%(W)', field: 'noPrint_Pct_chg_wow', width: 100,  cellClass: 'right-border',
        valueFormatter: params => typeof params.value === 'number' ? Math.round(params.value * 100).toFixed(0) + '%' : params.value, hide: true},
      {headerName: 'When(D)', field: 'when_chg_dod',  width: 100, valueFormatter: params => params.value ? 'Changed' : '', cellStyle: {color: '#27c000d1'}},
      {headerName: 'When(W)', field: 'when_chg_wow',  width: 100, valueFormatter: params => params.value ? 'Changed' : '', cellStyle: {color: '#27c000d1'}},
    ],

    floatingFilter: true,

    sideBar: true,

    onFirstDataRendered: (params) => {
      this.dataRendering = false;
      this.columnColorCoding(params);
    },

    getRowStyle: params => {
      if (params.data['highRiskReward']) { return {'font-weight': 'bolder'}; }
    },

    getContextMenuItems: (params) => {
      return ['copy', 'copyWithHeaders', 'separator', 'csvExport', 'excelExport'];
    },

    rowBuffer: 500,
  };

  constructor(private dialog: MatDialog, private colorCoding: ColorCodingService) {
    this.customGridCallBack = this.customGridCallBack.bind(this);
    this.openTimeseriesPlot = this.openTimeseriesPlot.bind(this);
    this.findMinMax = this.findMinMax.bind(this);
    this.columnColorCoding = this.columnColorCoding.bind(this);
  }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.plotData && changes.plotData.currentValue) {
      this.plotDataGrouping = {};
      this.plotData.forEach(data => {
        if (this.plotDataGrouping[data.category] === undefined) {
          this.plotDataGrouping[data.category] = [data];
        } else {
          this.plotDataGrouping[data.category].push(data);
        }
      });
      this.categories = Object.keys(this.plotDataGrouping);

      this.categories.forEach(category => {
        this.plotDataGroupingStatistic[category] = {
          percentile: this.findMinMax('percentile', this.plotDataGrouping[category]),
          fauxSharpe: this.findMinMax('fauxSharpe', this.plotDataGrouping[category]),
          spearman: this.findMinMax('spearman', this.plotDataGrouping[category]),
        };
      }, this);


      if (this.routeDirectInstrument && this.gridApi) {
        this.switchToCorrectTab();
      }
    }

    if (changes.routeDirectInstrument && changes.routeDirectInstrument.currentValue && this.plotData && this.gridApi) {
      this.switchToCorrectTab();
    }
  }

  customGridCallBack(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.ColumnApi;
    this.gridApi.closeToolPanel();
  }

  openTimeseriesPlot(column, seriesName) {
    return () => {
      this.dialog.open(JbotTimeseriesDialogLayoutComponent, {
        hasBackdrop: false,
        panelClass: 'event-analysis-pop-up-panel',
        width: '65rem',
        height: '40rem',
        data: {
          column: column,
          seriesName: seriesName,
          category: this.activeTab
        }
      });
    };
  }

  selectedTabChange(event: MatTabChangeEvent) {
    this.dataRendering = true;
    this.activeTab = event.tab.textLabel.toLowerCase();
  }

  // Utility Fun -------------------------------
  findMinMax(field: string, dataArray: fromModels.JbotGridData[]) {
    let min = Number.POSITIVE_INFINITY;
    let max = Number.NEGATIVE_INFINITY;

    dataArray.forEach(data => {
      if (data[field] !== null) {
        if (data[field] > max) { max = data[field]; }
        if (data[field] < min) { min = data[field]; }
      }
    });
    return [min, max];
  }

  columnColorCoding(params: FirstDataRenderedEvent) {
    const percentileColorCoder = this.colorCoding.redYellowGreenColorCoder(
      this.plotDataGroupingStatistic[this.activeTab]['percentile'][0],
      this.plotDataGroupingStatistic[this.activeTab]['percentile'][1],
    );
    const fauxSharpeColorCoder = this.colorCoding.greenHueColorCoder(
      this.plotDataGroupingStatistic[this.activeTab]['fauxSharpe'][0],
      this.plotDataGroupingStatistic[this.activeTab]['fauxSharpe'][1],
    );
    const spearmanColorCoder = this.colorCoding.redYellowGreenColorCoder(
      this.plotDataGroupingStatistic[this.activeTab]['spearman'][0],
      this.plotDataGroupingStatistic[this.activeTab]['spearman'][1],
    );

    const percentileColDef = this.gridApi.getColumnDef('percentile');
    const fauxSharpeColDef = this.gridApi.getColumnDef('fauxSharpe');
    const spearmanColDef = this.gridApi.getColumnDef('spearman');

    percentileColDef.cellStyle = (params) => {
      return {background: this.getColorValue(percentileColorCoder(params.value))};
    };
    fauxSharpeColDef.cellStyle = (params) => {
      return {background: this.getColorValue(fauxSharpeColorCoder(params.value))};
    };
    spearmanColDef.cellStyle = (params) => {
      return {background: this.getColorValue(spearmanColorCoder(params.value))};
    };

    this.gridApi.refreshCells({columns: ['percentile', 'fauxSharpe', 'spearman'], force: true});
  }

  getColorValue(rgbString: string): string {
    const result = `rgba(${rgbString.slice(4, rgbString.length - 1)}, 0.6)`;
    return result;
  }

  percentCellFormatter(params: ValueFormatterParams) {
    const targetCategories = ['eco', 'fx', 'comdty', 'stocks'];
    if (params.value === null) { return null; }
    if (targetCategories.indexOf(this.activeTab) !== -1) {
      const result = params.value * 100;
      if (this.activeTab === 'eco' || this.activeTab === 'fx' || this.activeTab === 'stocks') { return result.toFixed(1) + '%'; } else { return result.toFixed(0) + '%'; }
    } else {
      if (this.activeTab === 'surveys') { return params.value.toFixed(1); } else { return params.value.toFixed(2); }
    }
  }

  dateComparator(filterLocalDateAtMidnight, cellValue) {
    const dateAsString = cellValue;
    if (dateAsString == null) { return 0; }

    const cellDate = new Date(dateAsString);
    if (cellDate < filterLocalDateAtMidnight) {
        return -1;
    } else if (cellDate > filterLocalDateAtMidnight) {
        return 1;
    } else {
        return 0;
    }
  }

  wholePercentRoundOff(params: ValueFormatterParams) {
    return Math.round(params.value * 100) + '%';
  }

  regularRoundOff(digit: number) {
    return (params: ValueFormatterParams) => {
      if (typeof params.value === 'number') { return params.value.toFixed(digit); } else { return params.value; }
    };
  }

  locateInstrument() {
    this.dataRendering = false;
    let targetNode: RowNode;
    if (this.gridApi && this.routeDirectInstrument) {
      this.gridApi.forEachNode(node => {
        if (node.data['seriesName'] && node.data['seriesName'].includes(this.routeDirectInstrument)) {
          targetNode = node;
          this.gridApi.ensureNodeVisible(targetNode, 'middle');
          targetNode.setSelected(true)
        }
      });

    }
  }

  switchToCorrectTab() {
    for (const item of this.plotData) {
      if (item.seriesName.includes(this.routeDirectInstrument)) {
        const targetCategory = item.category;
        console.log('category', this.categories);
        const tabIndex = this.categories.indexOf(targetCategory);
        this.tabGroup.selectedIndex = tabIndex;
        break;
      }
    }
  }
}
