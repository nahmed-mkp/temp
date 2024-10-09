import { Component, OnInit, Input, ElementRef, Output, EventEmitter, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { GridApi, ColumnApi, GridOptions, RowSpanParams } from 'ag-grid-community';
import { OptionVolsEquityResultCustomHeaderComponent } from '../option-vols-equity-result-custom-header/option-vols-equity-result-custom-header.component';
import * as _ from 'lodash';
import { UtilityService } from 'src/app/services';
import { FirstDataRenderedEvent } from 'ag-grid-community/dist/lib/events';

@Component({
  selector: 'app-option-vols-equity-result-viewer',
  templateUrl: './option-vols-equity-result-viewer.component.html',
  styleUrls: ['./option-vols-equity-result-viewer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OptionVolsEquityResultViewerComponent implements OnInit, OnChanges {

  @Input() result: any;
  @Output() adjustSize = new EventEmitter<number>();

  private gridApi: GridApi;
  private gridColumnApi: ColumnApi;
  private callCount: number;
  private putCount: number;

  public uniqueExpiry: string[];
  public targetExpiry: string;
  public mode = 'buy';

  public extraOption = {sizeColumnsToFit: true};

  public customGridOption: GridOptions = {

    defaultColDef: {
      cellStyle: params => {
        return typeof params.value === 'number' ? {'justify-content': 'flex-end'} : { };
      },
      suppressMenu: true
    },

    columnDefs: [
      {headerName: 'Basic', headerGroupComponent: 'OptionVolsEquityResultCustomHeaderComponent',
      children: [
        {headerName: 'Put/Call', field: 'Put/Call', cellClass: 'right-border', headerTooltip: 'Put/Call', width: 25, sort: 'asc', suppressSizeToFit: true,
          rowSpan: params => {
            [this.callCount, this.putCount] = this.getCallAndPutCount(params);
            if (params.data['Put/Call'] === 'C' && params.node.rowIndex === 0) {
              return this.callCount;
            } else if (params.data['Put/Call'] === 'P' && params.node.rowIndex === this.callCount) {
              return this.putCount;
            } else {
              return 1;
            }
          },
          cellClassRules: {
            'call-cell-span': 'value==="C"',
            'put-cell-span': 'value==="P"',
          },
          valueFormatter: params => params.value === 'C' ? 'CALLS' : 'PUTS',
        },
        {headerName: 'κ', field: 'Strike', cellClass: 'right-border', headerTooltip: 'Strike', suppressSorting: true, sort: 'desc',
          valueFormatter: params => params.value, tooltip: params => params.data['OptionTicker']},
        {headerName: 'δ', field: 'Delta', cellClass: 'right-border', headerTooltip: 'Delta', suppressSorting: true, valueFormatter: this.utilityService.formatPercentNumberAdvance(0)},
        {headerName: '%OTM', field: 'pctOTM', cellClass: 'right-border', headerTooltip: 'pctOTM', suppressSorting: true, valueFormatter: this.utilityService.formatPercentNumberAdvance(1)},
        {headerName: '%pxAsk', field: 'pxPctAsk', cellClass: 'right-border', headerTooltip: 'pxPctAsk', suppressSorting: true, valueFormatter: this.utilityService.formatPercentNumberAdvance(2)},
        {headerName: '%pxBid', field: 'pxPctBid', cellClass: 'right-border', headerTooltip: 'pxPctBid', suppressSorting: true, valueFormatter: this.utilityService.formatPercentNumberAdvance(2), hide: true},
        {headerName: 'σ', field: 'Vol', cellClass: 'right-border', headerTooltip: 'Vol', suppressSorting: true, valueGetter: this.utilityService.formatNumber(1)},
      ]},

      {headerName: 'Bps to Pod', children: [
        {headerName: 'DailyAsk', field: 'bpsToPodDailyAsk', cellClass: 'right-border', headerTooltip: 'bpsToPodDailyAsk', suppressSorting: true, valueGetter: this.utilityService.formatNumber(1)},
        {headerName: 'DailyBid', field: 'bpsToPodDailyBid', cellClass: 'right-border', headerTooltip: 'bpsToPodDailyBid', suppressSorting: true, valueGetter: this.utilityService.formatNumber(1), hide: true},
        {headerName: 'TotalAsk', field: 'bpsToPodTotalAsk', cellClass: 'right-border', headerTooltip: 'bpsToPodTotalAsk', suppressSorting: true, valueGetter: this.utilityService.formatNumber(1)},
        {headerName: 'TotalBid', field: 'bpsToPodTotalBid', cellClass: 'right-border', headerTooltip: 'bpsToPodTotalBid', suppressSorting: true, valueGetter: this.utilityService.formatNumber(1), hide: true},
      ]},
      {headerName: 'B/E', children: [
        {headerName: 'Ask', field: 'break_even_ask', cellClass: 'right-border', headerTooltip: 'break_even_ask', suppressSorting: true, valueGetter: this.utilityService.formatNumber(2)},
        {headerName: 'Bid', field: 'break_even_bid', cellClass: 'right-border', headerTooltip: 'break_even_bid', suppressSorting: true, hide: true, valueGetter: this.utilityService.formatNumber(2)},
        {headerName: 'Expiry', field: 'Expiry', cellClass: 'right-border', headerTooltip: 'Expiry', hide: true, width: 1},
      ]},
      // {headerName: 'Ask', field: 'Ask', cellClass: 'right-border', headerTooltip: 'Ask'},
      // {headerName: 'Bid', field: 'Bid', cellClass: 'right-border', headerTooltip: 'Bid'},

    ],

    getRowStyle: params => {
      if (params.node.rowIndex === this.callCount) {
        return {'border-top': '2px solid grey'};
      } else {
        return undefined;
      }
    },

    getContextMenuItems: (params) => {
      return ['copy', 'copyWithHeaders', 'separator', 'csvExport', 'excelExport'];
    },

    frameworkComponents: {
      OptionVolsEquityResultCustomHeaderComponent: OptionVolsEquityResultCustomHeaderComponent
    },
    context: this,
    suppressRowTransform: true,

    onFirstDataRendered: params => {
      this.columnColorCoding();
    },

    groupHeaderHeight: 50,
    rowHeight: 20,
    headerHeight: 25,
  };

  constructor(private utilityService: UtilityService) {
    this.onFilterExpiry = this.onFilterExpiry.bind(this);
    this.customGridCallBack = this.customGridCallBack.bind(this);
    this.onModeChange = this.onModeChange.bind(this);
  }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.result && changes.result.currentValue) {
      this.uniqueExpiry = _.uniqBy(this.result.optionVols, 'Expiry').map(element => element['Expiry']);
      this.uniqueExpiry.sort((a, b) => (new Date(b).getTime()) - (new Date(a).getTime()));
      this.targetExpiry = this.uniqueExpiry[0];

      const targetColGroup: any = this.customGridOption.columnDefs.filter((colDef) => colDef.headerName === 'Basic')[0]
      const targetColDef = targetColGroup.children.filter(colDef => colDef.field === 'Strike')[0];
      targetColDef.headerName = this.result.underlyingTicker.split(' ')[0];
      targetColDef.headerTooltip = this.result.underlyingTicker + ' Strike';

      if (this.gridApi) {
        this.onFilterExpiry(this.targetExpiry);
      }
    }
  }

  customGridCallBack(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    if (this.result && this.result.optionVols) {
      this.gridApi.setRowData(this.result.optionVols);
    } else {
      this.gridApi.setRowData([]);
    }
    this.onAdjustGridSize();

    if (this.targetExpiry) {
      this.onFilterExpiry(this.targetExpiry);
    }
  }

  onFilterExpiry(value) {
    this.targetExpiry = value;

    if (this.gridApi) {
      this.gridApi.setQuickFilter(value);
      this.gridApi.setColumnDefs([]);
      this.gridApi.setColumnDefs(this.customGridOption.columnDefs);

      this.onAdjustGridSize();
      this.columnColorCoding();

      setTimeout(() => {
        this.gridApi.sizeColumnsToFit();
      }, 100);
    }
  }

  private onAdjustGridSize() {
    let count = 0;
    this.gridApi.forEachNodeAfterFilterAndSort(node => {
      count++;
    });
    const finalheight = count * 20 + 50 + 25 + 15;
    this.adjustSize.emit(finalheight);
  }

  private getCallAndPutCount(params: RowSpanParams) {
    let putCount = 0;
    let callCount = 0;
    if (this.result && this.result.optionVols) {
      params.api.forEachNodeAfterFilterAndSort(node => {
        if (node.data['Put/Call'] === 'C') {
          callCount++;
        } else if  (node.data['Put/Call'] === 'P') {
          putCount++;
        }
      });
    }
    return [callCount, putCount];
  }

  private columnColorCoding() {
    const visibleData = [];
    this.gridApi.forEachNodeAfterFilterAndSort(node => visibleData.push(node.data));

    const greenYellowAbsoluteCodingColumns = ['Delta', 'pctOTM', 'pxPctAsk', 'pxPctBid'];
    greenYellowAbsoluteCodingColumns.forEach(field => {
      this.generateColorCoder(this.gridApi, field, visibleData, 'greenYellow', true);
    });

    const redCodingColumns = ['Vol', 'bpsToPodDailyAsk', 'bpsToPodDailyBid', 'bpsToPodTotalAsk', 'bpsToPodTotalBid'];
    redCodingColumns.forEach(field => {
      this.generateColorCoder(this.gridApi, field, visibleData, 'red', false);
    });

    const redGreenCodingColumns = ['break_even_ask', 'break_even_bid'];
    redGreenCodingColumns.forEach(field => {
      this.generateColorCoder(this.gridApi, field, visibleData, 'redGreen', false);
    });

    const allTargetColumns =  [...greenYellowAbsoluteCodingColumns, ...redCodingColumns, ...redGreenCodingColumns];

    this.gridApi.refreshCells({columns: allTargetColumns, force: true});
  }

  private generateColorCoder(gridApi: GridApi, field: string, data: any[], type: string, absolute?: boolean) {
    const targetColDef = gridApi.getColumnDef(field);
    const [targetMin, targetMax] = this.getMinMax(field, data, absolute);
    let targetColorCoder;
    if (type === 'greenYellow') {
      if (field === 'pctOTM') {
        targetColorCoder = this.utilityService.greenYellowColorCoder(targetMax, targetMin);
      } else {
        targetColorCoder = this.utilityService.greenYellowColorCoder(targetMin, targetMax);
      }
    } else if (type === 'red') {
      targetColorCoder = this.utilityService.redHueColorCoder(targetMin, targetMax);
    } else if (type === 'redGreen') {
      targetColorCoder = this.utilityService.redGreenColorCoder(targetMin, targetMax);
    }


    if (absolute) {
      targetColDef.cellStyle = params => {
        return {
          background: this.utilityService.getTransparentColorValue(targetColorCoder(Math.abs(params.value))),
          'justify-content': 'flex-end'
        };
      };
    } else {
      targetColDef.cellStyle = params => {
        return {
          background: this.utilityService.getTransparentColorValue(targetColorCoder(params.value)),
          'justify-content': 'flex-end'
        };
      };
    }
  }

  private getMinMax(field, data, absolute?: boolean) {
    let valueArray;
    if (absolute) {
      valueArray = data.map(element => Math.abs(element[field]));
    } else {
      valueArray = data.map(element => element[field]);
    }
    return [Math.min(...valueArray), Math.max(...valueArray)];
  }

  onModeChange(mode) {
    this.mode = mode;
    let colDefs = [];
    this.customGridOption.columnDefs.forEach((colDef: any) => {
      colDefs = colDefs.concat(colDef.children)
    });

    if (mode === 'buy') {
      colDefs.forEach(colDef => {
        if (colDef.field.toLowerCase().includes('ask')) {
          colDef.hide = false;
        } else if (colDef.field.toLowerCase().includes('bid')) {
          colDef.hide = true;
        }
      });
    } else if (mode === 'sell') {
      colDefs.forEach(colDef => {
        if (colDef.field.toLowerCase().includes('ask')) {
          colDef.hide = true;
        } else if (colDef.field.toLowerCase().includes('bid')) {
          colDef.hide = false;
        }
      });
    }

    this.gridApi.setColumnDefs([]);
    this.gridApi.setColumnDefs(this.customGridOption.columnDefs);
    this.columnColorCoding();

    setTimeout(() => {
      this.gridApi.sizeColumnsToFit();
    }, 100);
  }

}
