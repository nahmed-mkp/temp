import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { GridApi, ColumnApi, GridOptions, RowSpanParams } from 'ag-grid-community';
import { UtilityService } from 'src/app/services';
import * as _ from 'lodash';
import { OptionVolsFXResultCustomHeaderComponent } from '../option-vols-fx-result-custom-header/option-vols-fx-result-custom-header.component';


@Component({
  selector: 'app-option-vols-fx-result-viewer',
  templateUrl: './option-vols-fx-result-viewer.component.html',
  styleUrls: ['./option-vols-fx-result-viewer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OptionVolsFXResultViewerComponent implements OnInit, OnChanges {

  @Input() result: any;
  @Input() displayMode: string;
  @Input() requestParam: any;
  @Output() adjustSize = new EventEmitter<number>();

  private gridApi: GridApi;
  private gridColumnApi: ColumnApi;
  private callCount: number;
  private putCount: number;

  public uniqueExpiry: string[];
  public targetExpiry: string;
  public mode = 'buy';

  public extraOption = {sizeColumnsToFit: true};

  public customGridOption: GridOptions;

  constructor(private utilityService: UtilityService) {
    this.onFilterExpiry = this.onFilterExpiry.bind(this);
    this.customGridCallBack = this.customGridCallBack.bind(this);
    this.onModeChange = this.onModeChange.bind(this);
  }

  ngOnInit() {
    this.customGridOption = {

      defaultColDef: {
        cellStyle: params => {
          return typeof params.value === 'number' ? {'justify-content': 'flex-end'} : { };
        },
        suppressMenu: true,
        suppressSorting: true,
      },

      columnDefs: [
        {headerName: 'Basic', headerGroupComponent: 'OptionVolsFXResultCustomHeaderComponent',
        children: [
          {headerName: 'Put/Call', field: 'put/call', cellClass: 'right-border', headerTooltip: 'Put/Call', width: 55, sort: 'asc', suppressSizeToFit: true,
            rowSpan: params => {
              if (this.callCount === undefined || this.putCount === undefined) {
                [this.callCount, this.putCount] = this.getCallAndPutCount(params);
              }
              if (params.data['put/call'] === 'C' && params.node.rowIndex === 0) {
                return this.callCount;
              } else if (params.data['put/call'] === 'P' && params.node.rowIndex === this.callCount) {
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
          // { headerName: this.requestParam.ticker, field: 'strike', cellClass: 'right-border', headerTooltip: 'Strike', sort: 'desc', valueFormatter: this.utilityService.formatNumberAdvance(4), tooltip: params => params.data['ccyPair'], width: 65, suppressSizeToFit: true,},
          { headerName: 'Strike', field: 'strike', cellClass: 'right-border', headerTooltip: 'Strike', sort: 'desc', valueFormatter: this.utilityService.formatNumberAdvance(4), tooltip: params => params.data['ccyPair'], width: 60, suppressSizeToFit: true, },
          { headerName: 'Input BS Delta(%)', field: 'delta', cellClass: 'right-border', headerTooltip: 'Delta', valueFormatter: this.utilityService.formatNumberAdvance(2), width: 100, suppressSizeToFit: true, },

          { headerName: 'Expiry', field: 'expiry', cellClass: 'right-border', headerTooltip: 'Expiry', width: 70, suppressSizeToFit: true},
          { headerName: 'Forward', field: 'forward', cellClass: 'right-border', headerTooltip: 'Forward', valueFormatter: this.utilityService.formatNumberAdvance(4), width: 70, suppressSizeToFit: true, },


          { headerName: 'Expiry', field: 'expiry_in_days', hide: true},
        ]},
        {
          headerName: '%OTMF', headerTooltip: '%OTMF', children: [
            { headerName: '%OTMF', field: 'pctOTM', cellClass: 'right-border', headerTooltip: '%OTMF', valueFormatter: this.utilityService.formatPercentNumberAdvance(2), width: 60, suppressSizeToFit: true, }
        ]},

        {
          headerName: 'Vol(%)', headerTooltip: 'Vol(%)', children: [
            { headerName: 'Vol', field: 'vol', cellClass: 'right-border', headerTooltip: 'Vol (%)', valueGetter: this.utilityService.formatNumber(1),  width: 50, suppressSizeToFit: true, }
        ]},

        {
          headerName: 'Prem (bps)', headerClass: 'no-bottom-border', width: 200, children: [
            { headerName: 'Prem (BS)', field: 'bs_prem_bps', cellClass: 'right-border', headerTooltip: 'Premium (Black Scholes)', valueFormatter: this.utilityService.formatNumberAdvance(2), width: 70, suppressSizeToFit: true},
            { headerName: 'Prem (VV)', field: 'vv_prem_bps', cellClass: 'right-border', headerTooltip: 'Premium (Vanna/Volga)', valueFormatter: this.utilityService.formatNumberAdvance(2), width: 70, suppressSizeToFit: true},
        ]},

        {
          headerName: 'Delta(%)', headerTooltip: 'Delta(%)', width: 100, children: [
            { headerName: 'Delta (BS) (%)', field: 'bs_delta', cellClass: 'right-border', headerTooltip: 'Delta(%) BS', valueGetter: this.utilityService.formatNumber(1),  width: 90, suppressSizeToFit: true, },
            { headerName: 'Delta (VV) (%)', field: 'vv_delta', cellClass: 'right-border', headerTooltip: 'Delta(%) VV', valueGetter: this.utilityService.formatNumber(1),  width: 90, suppressSizeToFit: true, }
        ]},


        {headerName: 'Breakeven', headerTooltip: 'Bps to Pod', children: [
          { headerName: 'B/E (BS)', field: 'be_bs', cellClass: 'right-border', headerTooltip: 'Breakeven (Black Scholes)', valueGetter: this.utilityService.formatNumber(4), width: 60, suppressSizeToFit: true},
          { headerName: 'B/E (VV)', field: 'be_vv', cellClass: 'right-border', headerTooltip: 'Breakeven (Vanna/Volga)', valueGetter: this.utilityService.formatNumber(4), width: 60, suppressSizeToFit: true},
        ]},

        {headerName: `Bps To Pod for ${this.result['target_size'].toLocaleString('en-US', { maximumFractionDigits: 2}) } Bps Risk`, headerTooltip: 'Bps To Pod for Risk', groupId: 'targetGroup', children: [
          { headerName: `Notional(${this.requestParam.ticker && this.requestParam.ticker.substring(0, 3)})`, field: 'Target_Notional', cellClass: 'right-border', headerTooltip: 'Target Notional', valueFormatter: this.utilityService.formatNumberWithCommasAndDigit(0), width: 130, suppressSizeToFit: true },
          { headerName: `Current Delta BS (${this.requestParam.ticker && this.requestParam.ticker.substring(0, 3)})`, field: 'bs_Current_Delta', cellClass: 'right-border', headerTooltip: 'Current_Delta BS', valueFormatter: this.utilityService.formatNumberWithCommasAndDigit(0), width: 130, suppressSizeToFit: true },
          { headerName: `Current Delta VV (${this.requestParam.ticker && this.requestParam.ticker.substring(0, 3)})`, field: 'vv_Current_Delta', cellClass: 'right-border', headerTooltip: 'Current_Delta VV', valueFormatter: this.utilityService.formatNumberWithCommasAndDigit(0), width: 130, suppressSizeToFit: true },

          { headerName: 'Premium(BS)($)', field: 'bs_Target_Market_Value', cellClass: 'right-border', width: 130, headerTooltip: 'Target Market Value (BS)', valueFormatter: this.utilityService.formatNumberWithCommasAndDigit(0), suppressSizeToFit: true },
          { headerName: 'Premium(VV)($)', field: 'vv_Target_Market_Value', cellClass: 'right-border', width: 130, headerTooltip: 'Target Market Value (VV)', valueFormatter: this.utilityService.formatNumberWithCommasAndDigit(0), suppressSizeToFit: true },

          { headerName: 'Daily(BS)', field: 'bs_bpsToPodTotalDaily', cellClass: 'right-border', headerTooltip: 'Bps To Pod Daily (Black Scholes)', valueGetter: this.utilityService.formatNumber(2), width: 60, suppressSizeToFit: true},
          { headerName: 'Total(BS)', field: 'bs_bpsToPodTotal', cellClass: 'right-border', headerTooltip: 'Bps To Pod Total (Black Scholes)', valueGetter: this.utilityService.formatNumber(2), width: 60, suppressSizeToFit: true},
          { headerName: 'Daily(VV)', field: 'vv_bpsToPodTotalDaily', cellClass: 'right-border', headerTooltip: 'Bps To Pod Daily (Vanna/Volga)', valueGetter: this.utilityService.formatNumber(2), width: 60, suppressSizeToFit: true},
          { headerName: 'Total(VV)', field: 'vv_bpsToPodTotal', cellClass: 'right-border', headerTooltip: 'Bps To Pod Total (Vanna/Volga)', valueGetter: this.utilityService.formatNumber(2), width: 60, suppressSizeToFit: true},
        ]},
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
        OptionVolsFXResultCustomHeaderComponent: OptionVolsFXResultCustomHeaderComponent
      },
      context: this,
      suppressRowTransform: true,

      onFirstDataRendered: params => {
        // this.columnColorCoding();
      },

      groupHeaderHeight: 50,
      rowHeight: 20,
      headerHeight: 25,
      rowBuffer: 500,
    };

    if (this.gridApi) {
      this.onFilterExpiry(this.targetExpiry);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.result && changes.result.currentValue) {
      this.uniqueExpiry = _.uniqBy(this.result.optionVols, 'expiry_in_days').map(element => element['expiry_in_days'].toString());
      this.uniqueExpiry.sort((a, b) => parseInt(a, 10) - parseInt(b, 10));
      this.targetExpiry = this.uniqueExpiry[0];

      // const targetColGroup: any = this.customGridOption.columnDefs.filter((colDef) => colDef.headerName === 'Basic')[0];
      // const targetColDef = targetColGroup.children.filter(colDef => colDef.field === 'strike')[0];
      // targetColDef.headerName = this.result.ccyPair.split(' ')[0];
      // targetColDef.headerTooltip = targetColDef.headerName + ' Strike';
    }
  }

  customGridCallBack(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    const allColumnIds = this.gridColumnApi.getAllColumns().map(column => column.getColId()).filter(id => id !== 'expiry_in_days');
    const bsColumnIds = allColumnIds.filter(idValue => idValue.includes('bs_') || idValue.includes('_bs'));
    const vvColumnIds = allColumnIds.filter(idValue => idValue.includes('vv_') || idValue.includes('_vv'));
    this.gridColumnApi.setColumnsVisible(vvColumnIds, true);
    this.gridColumnApi.setColumnsVisible(bsColumnIds, false);
    if (this.result && this.result.optionVols) {
      this.gridApi.setRowData(this.result.optionVols);
    } else {
      this.gridApi.setRowData([]);
    }
    this.onAdjustGridSize();

    // const targetColumnGroup = this.gridColumnApi.getColumnGroup('targetGroup');
    // this.gridApi.

    if (this.targetExpiry) {
      this.onFilterExpiry(this.targetExpiry);
    }
  }

  onFilterExpiry(value) {
    this.targetExpiry = value;
    this.callCount = undefined;
    this.putCount = undefined;

    if (this.gridApi) {
      // this.gridApi.setQuickFilter(value);
      const filterInstance = this.gridApi.getFilterInstance('expiry_in_days');
      filterInstance.setModel({
        values: [ this.targetExpiry]
      });
      this.gridApi.onFilterChanged();
      this.gridApi.redrawRows();


      // this.gridApi.setColumnDefs([]);
      // this.gridApi.setColumnDefs(this.customGridOption.columnDefs);
      this.onAdjustGridSize();
      // this.columnColorCoding();

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
    const finalheight = count * 20 + 50 + 25 + 18;
    this.adjustSize.emit(finalheight);
  }

  private getCallAndPutCount(params: RowSpanParams) {
    let putCount = 0;
    let callCount = 0;
    if (this.result && this.result.optionVols) {
      params.api.forEachNodeAfterFilterAndSort(node => {
        if (node.data['put/call'] === 'C') {
          callCount++;
        } else if  (node.data['put/call'] === 'P') {
          putCount++;
        }
      });
      console.log('call and put', callCount, putCount);
    }
    return [callCount, putCount];
  }

  public onSurfaceAdjustSize(finalHeight) {
    this.adjustSize.emit(finalHeight);
  }

  // private columnColorCoding() {
  //   const visibleData = [];
  //   this.gridApi.forEachNodeAfterFilterAndSort(node => visibleData.push(node.data));

  //   const greenYellowAbsoluteCodingColumns = ['delta'];
  //   greenYellowAbsoluteCodingColumns.forEach(field => {
  //     this.generateColorCoder(this.gridApi, field, visibleData, 'greenYellow', true);
  //   });

  //   const redCodingColumns = ['be_bs', 'bs_vv', 'bs_prem', 'vv_prem', 'vol'];
  //   redCodingColumns.forEach(field => {
  //     this.generateColorCoder(this.gridApi, field, visibleData, 'red', false);
  //   });

  //   const redCodingColumnsAbsolute = ['pctOTM'];
  //   redCodingColumnsAbsolute.forEach(field => {
  //     this.generateColorCoder(this.gridApi, field, visibleData, 'red', true);
  //   });

  //   const redGreenCodingColumns = ['terminal_ask_yield', 'terminal_bid_yield'];
  //   redGreenCodingColumns.forEach(field => {
  //     this.generateColorCoder(this.gridApi, field, visibleData, 'redGreen', false);
  //   });

  //   const redGreenCodingLightColumns = ['terminal_5days_ask_yield', 'terminal_5days_bid_yield', 'terminal_10days_ask_yield', 'terminal_10days_bid_yield'];
  //   redGreenCodingLightColumns.forEach(field => {
  //     this.generateColorCoder(this.gridApi, field, visibleData, 'redGreenLight', false);
  //   });


  //   const allTargetColumns =  [...greenYellowAbsoluteCodingColumns, ...redCodingColumns, ...redCodingColumnsAbsolute, ...redGreenCodingColumns, ...redGreenCodingLightColumns];

  //   this.gridApi.refreshCells({columns: allTargetColumns, force: true});
  // }


  // private generateColorCoder(gridApi: GridApi, field: string, data: any[], type: string, absolute?: boolean) {
  //   const targetColDef = gridApi.getColumnDef(field);
  //   const [targetMin, targetMax] = this.getMinMax(field, data, absolute);
  //   let targetColorCoder;
  //   if (type === 'greenYellow') {
  //     if (field === 'pctOTM') {
  //       targetColorCoder = this.utilityService.greenYellowColorCoder(targetMax, targetMin);
  //     } else {
  //       targetColorCoder = this.utilityService.greenYellowColorCoder(targetMin, targetMax);
  //     }
  //   } else if (type === 'red') {
  //     targetColorCoder = this.utilityService.redHueColorCoder(targetMin, targetMax);
  //   } else if (type === 'redGreen') {
  //     targetColorCoder = this.utilityService.redGreenColorCoder(targetMin, targetMax);
  //   } else if (type === 'redGreenLight') {
  //     targetColorCoder = this.utilityService.redGreenLightColorCoder(targetMin, targetMax);
  //   }


  //   if (absolute) {
  //     targetColDef.cellStyle = params => {
  //       return {
  //         background: this.utilityService.getTransparentColorValue(targetColorCoder(Math.abs(params.value))),
  //         'justify-content': 'flex-end'
  //       };
  //     };
  //   } else {
  //     targetColDef.cellStyle = params => {
  //       return {
  //         background: this.utilityService.getTransparentColorValue(targetColorCoder(params.value)),
  //         'justify-content': 'flex-end'
  //       };
  //     };
  //   }
  // }


  // private getMinMax(field, data, absolute?: boolean) {
  //   let valueArray;
  //   if (absolute) {
  //     valueArray = data.map(element => Math.abs(element[field]));
  //   } else {
  //     valueArray = data.map(element => element[field]);
  //   }
  //   return [Math.min(...valueArray), Math.max(...valueArray)];
  // }

  onModeChange(mode) {
    this.mode = mode;
    let colDefs = [];
    this.customGridOption.columnDefs.forEach((colDef: any) => {
      colDefs = colDefs.concat(colDef.children);
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
    // this.columnColorCoding();
    setTimeout(() => {
      this.gridApi.sizeColumnsToFit();
    }, 100);
  }

  onColumnDisplayMode(mode) {
    const allColumnIds = this.gridColumnApi.getAllColumns().map(column => column.getColId()).filter(id => id !== 'expiry_in_days');
    const bsColumnIds = allColumnIds.filter(idValue => idValue.includes('bs_') || idValue.includes('_bs'));
    const vvColumnIds = allColumnIds.filter(idValue => idValue.includes('vv_') || idValue.includes('_vv'));
    if (mode === 'all') {
      this.gridColumnApi.setColumnsVisible(allColumnIds, true);
    } else if (mode === 'bs') {
      this.gridColumnApi.setColumnsVisible(bsColumnIds, true);
      this.gridColumnApi.setColumnsVisible(vvColumnIds, false);
    } else if (mode === 'vv') {
      this.gridColumnApi.setColumnsVisible(vvColumnIds, true);
      this.gridColumnApi.setColumnsVisible(bsColumnIds, false);
    }
  }

}
