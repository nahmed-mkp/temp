import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { GridApi, ColumnApi, GridOptions, RowSpanParams } from 'ag-grid-community';
import { UtilityService } from 'src/app/services';
import * as _ from 'lodash';
import { OptionVolsCommodityResultCustomHeaderComponent } from '../option-vols-commodity-result-custom-header/option-vols-commodity-result-custom-header.component';


@Component({
  selector: 'app-option-vols-commodity-result-viewer',
  templateUrl: './option-vols-commodity-result-viewer.component.html',
  styleUrls: ['./option-vols-commodity-result-viewer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OptionVolsCommodityResultViewerComponent implements OnInit, OnChanges {

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
      suppressMenu: true,
      suppressSorting: true,
    },

    columnDefs: [
      {headerName: 'Basic', headerGroupComponent: 'OptionVolsCommodityResultCustomHeaderComponent',
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
        {headerName: 'κ', field: 'Strike_ticks', cellClass: 'right-border', headerTooltip: 'Strike Ticks', sort: 'desc', tooltip: params => params.data['OptionTicker'], width: 65, suppressSizeToFit: true,},
        {headerName: 'δ', field: 'Delta', cellClass: 'right-border', headerTooltip: 'Delta', valueFormatter: this.utilityService.formatPercentNumberAdvance(2), width: 65, suppressSizeToFit: true,},

        {headerName: '64ths', field: 'Ask_64th', cellClass: 'right-border', headerTooltip: 'Ask_64th', valueGetter: this.utilityService.formatNumber(1)},
        {headerName: 'Bps yield', field: 'BpsAskYield', cellClass: 'right-border', headerTooltip: 'BpsAskYield', valueGetter: this.utilityService.formatNumber(1)},
        {headerName: '64ths', field: 'Bid_64th', cellClass: 'right-border', headerTooltip: 'Bid_64th', valueGetter: this.utilityService.formatNumber(1), hide: true},
        {headerName: 'Bps yield', field: 'BpsBidYield', cellClass: 'right-border', headerTooltip: 'BpsAskYield', valueGetter: this.utilityService.formatNumber(1), hide: true},
      ]},

      {headerName: 'OTM (pts)', headerTooltip: 'OTM pts', children: [
        {headerName: '', field: 'OTM_pts', cellClass: 'right-border', headerTooltip: 'OTM pts', valueGetter: this.utilityService.formatNumber(1)}
      ]},

      {headerName: 'OTM', headerTooltip: 'OTM pts', children: [
        {headerName: 'bps yield', field: 'OTM_bps_yield', cellClass: 'right-border', headerTooltip: 'bps yield', valueGetter: this.utilityService.formatNumber(1)}
      ]},

      {headerName: 'All-in B/E', headerTooltip: 'All-in B/E', children: [
        {headerName: 'bps yield', field: 'break_even_ask_bps_yield', cellClass: 'right-border', headerTooltip: 'break even bps yield ask', valueGetter: this.utilityService.formatNumber(2)},
        {headerName: 'bps yield', field: 'break_even_bid_bps_yield', cellClass: 'right-border', headerTooltip: 'break even bps yield bid', valueGetter: this.utilityService.formatNumber(2), hide: true}
      ]},

      {headerName: '', headerClass: 'no-bottom-border', children: [
        {headerName: 'σ', field: 'Vol', cellClass: 'right-border', headerTooltip: 'Vol', valueGetter: this.utilityService.formatNumber(1)},
      ]},

      {headerName: 'Bps to Pod', headerTooltip: 'Bps to Pod', children: [
        {headerName: 'Day', field: 'bpsToPodDailyAsk', cellClass: 'right-border', headerTooltip: 'bpsToPodDailyAsk', valueGetter: this.utilityService.formatNumber(1)},
        {headerName: 'Day', field: 'bpsToPodDailyBid', cellClass: 'right-border', headerTooltip: 'bpsToPodDailyBid', valueGetter: this.utilityService.formatNumber(1), hide: true},
        {headerName: 'Total', field: 'bpsToPodTotalAsk', cellClass: 'right-border', headerTooltip: 'bpsToPodTotalAsk', valueGetter: this.utilityService.formatNumber(1)},
        {headerName: 'Total', field: 'bpsToPodTotalBid', cellClass: 'right-border', headerTooltip: 'bpsToPodTotalBid', valueGetter: this.utilityService.formatNumber(1), hide: true},
      ]},

      {headerName: 'Terminal', headerTooltip: 'Terminal',  children: [
        {headerName: '5 Days', field: 'terminal_5days_ask_yield', cellClass: 'right-border', headerTooltip: 'Terminal 5days AsK Yield', valueGetter: this.utilityService.formatNumber(3)},
        {headerName: '5 Days', field: 'terminal_5days_bid_yield', cellClass: 'right-border', headerTooltip: 'Terminal 5days Bid Yield', hide: true, valueGetter: this.utilityService.formatNumber(3)},
        {headerName: '10 Days', field: 'terminal_10days_ask_yield', cellClass: 'right-border', headerTooltip: 'Terminal 10days AsK Yield', valueGetter: this.utilityService.formatNumber(3)},
        {headerName: '10 Days', field: 'terminal_10days_bid_yield', cellClass: 'right-border', headerTooltip: 'Terminal 5days Bid Yield', hide: true, valueGetter: this.utilityService.formatNumber(3)},
        {headerName: 'Yield', field: 'terminal_ask_yield', cellClass: 'right-border', headerTooltip: 'Terminal AsK Yield', valueGetter: this.utilityService.formatNumber(3)},
        {headerName: 'Yield', field: 'terminal_bid_yield', cellClass: 'right-border', headerTooltip: 'Terminal Bid Yield', hide: true, valueGetter: this.utilityService.formatNumber(3)},

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
      OptionVolsCommodityResultCustomHeaderComponent: OptionVolsCommodityResultCustomHeaderComponent
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
      const targetColDef = targetColGroup.children.filter(colDef => colDef.field === 'Strike_ticks')[0];
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
      this.gridApi.setRowData(this.result.optionVols)
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

    const greenYellowAbsoluteCodingColumns = ['Delta'];
    greenYellowAbsoluteCodingColumns.forEach(field => {
      this.generateColorCoder(this.gridApi, field, visibleData, 'greenYellow', true);
    });

    const redCodingColumns = ['Ask_64th', 'BpsAskYield', 'Bid_64th', 'BpsBidYield', 'break_even_ask_bps_yield',
                              'break_even_bid_bps_yield', 'Vol', 'bpsToPodDailyAsk', 'bpsToPodDailyBid', 'bpsToPodTotalAsk', 'bpsToPodTotalBid'];
    redCodingColumns.forEach(field => {
      this.generateColorCoder(this.gridApi, field, visibleData, 'red', false);
    });

    const redCodingColumnsAbsolute = ['OTM_bps_yield'];
    redCodingColumnsAbsolute.forEach(field => {
      this.generateColorCoder(this.gridApi, field, visibleData, 'red', true);
    });

    const redGreenCodingColumns = ['terminal_ask_yield', 'terminal_bid_yield'];
    redGreenCodingColumns.forEach(field => {
      this.generateColorCoder(this.gridApi, field, visibleData, 'redGreen', false);
    });

    const redGreenCodingLightColumns = ['terminal_5days_ask_yield', 'terminal_5days_bid_yield', 'terminal_10days_ask_yield', 'terminal_10days_bid_yield'];
    redGreenCodingLightColumns.forEach(field => {
      this.generateColorCoder(this.gridApi, field, visibleData, 'redGreenLight', false);
    });


    const allTargetColumns =  [...greenYellowAbsoluteCodingColumns, ...redCodingColumns, ...redCodingColumnsAbsolute, ...redGreenCodingColumns, ...redGreenCodingLightColumns];

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
    } else if (type === 'redGreenLight') {
      targetColorCoder = this.utilityService.redGreenLightColorCoder(targetMin, targetMax);
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
