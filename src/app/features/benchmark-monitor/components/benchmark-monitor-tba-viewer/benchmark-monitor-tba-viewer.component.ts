import { Component, OnInit, Input } from '@angular/core';
import { GridApi, ColumnApi, GridOptions } from 'ag-grid-community';

@Component({
  selector: 'app-benchmark-monitor-tba-viewer',
  templateUrl: './benchmark-monitor-tba-viewer.component.html',
  styleUrls: ['./benchmark-monitor-tba-viewer.component.scss']
})
export class BenchmarkMonitorTbaViewerComponent implements OnInit {

  @Input() data: any[];
  
  private gridApi: GridApi;
  private gridColumnApi: ColumnApi;
  public extraOption = {autoSizeColumns: true};

  public customGridOption: GridOptions = {
    defaultColDef: {
        valueFormatter: params => {
          if (params.value) {
            if (typeof params.value === 'number'  && params.colDef.field.toLowerCase().includes('id') === false)  {
              return params.value.toFixed(2)
            } else {
              return params.value;
            }
          }
        },
        cellStyle: params => {
            return typeof params.value === 'number' &&
                    params.colDef.field.toLowerCase().includes('id') === false ?
                    {'justify-content': 'flex-end', 'border-right': '1px solid #80808045'} : { 'border-right': '1px solid #80808045'};
        },
        width: 100
    },

    columnDefs: [

      {headerName: 'Agency', field: 'Agency'},
      {headerName: 'Agency_ref', field: 'Agency_ref'},
      {headerName: 'Coupon', field: 'Coupon'},
      {headerName: 'CouponNum', field: 'CouponNum'},
      {headerName: 'Coupon_ref', field: 'Coupon_ref'},
      {headerName: 'TwSwap', field: 'TwSwap'},
      {headerName: 'MarkAtSwap', field: 'MarkAtSwap', editable: true, cellClass: 'yellow-background'},
      {headerName: 'PriceTicks', field: 'PriceTicks', editable: true, cellClass: 'yellow-background'},
      {headerName: 'DollarRollTicks', field: 'DollarRollTicks'},
      {headerName: 'MarkAtDollarRollTicks', field: 'MarkAtDollarRollTicks', editable: true, cellClass: 'yellow-background'},
      {headerName: 'PriceTicks_f0', field: 'PriceTicks_f0', editable: true, cellClass: 'yellow-background'},

      {headerName: 'DollarRollTicks_f1', field: 'DollarRollTicks_f1'},
      {headerName: 'MarkAtDollarRollTicks_f1', field: 'MarkAtDollarRollTicks_f1', editable: true, cellClass: 'yellow-background'},
      {headerName: 'PriceTicks_f1', field: 'PriceTicks_f1', editable: true, cellClass: 'yellow-background'},

      {headerName: 'DollarRollTicks_f2', field: 'DollarRollTicks_f2'},
      {headerName: 'MarkAtDollarRollTicks_f2', field: 'MarkAtDollarRollTicks_f2', editable: true, cellClass: 'yellow-background'},
      {headerName: 'PriceTicks_f2', field: 'PriceTicks_f2', editable: true, cellClass: 'yellow-background'},

      {headerName: 'Duration', field: 'Duration'},
      {headerName: 'DurationAdjustment', field: 'DurationAdjustment'},
      {headerName: 'AdjDV01', field: 'AdjDV01'},
      {headerName: 'AdjDV01_f0', field: 'AdjDV01_f0'},
      {headerName: 'AdjDV01_f1', field: 'AdjDV01_f1'},
      {headerName: 'AdjDV01_f2', field: 'AdjDV01_f2'},
      {headerName: 'Convexity', field: 'Convexity'},
      {headerName: 'Wal', field: 'Wal'},

      {headerName: 'MaxLastUpdate', field: 'MaxLastUpdate'},
      {headerName: 'T10DV01', field: 'T10DV01', editable: true, cellClass: 'yellow-background'},
      {headerName: 'HedgeRatio', field: 'HedgeRatio', editable: true, cellClass: 'yellow-background'},
      {headerName: 'HedgeRatio_ref', field: 'HedgeRatio_ref'},
      {headerName: 'Price102Coupon', field: 'Price102Coupon', editable: true, cellClass: 'yellow-background'},

      {headerName: 'CV01', field: 'CV01', editable: true, cellClass: 'yellow-background'},


     // Could not find match
      {headerName: 'DV01', field: 'DV01'},
      {headerName: 'RatioOverride', field: 'RatioOverride', },
      {headerName: 'RatioOverride_f1', field: 'RatioOverride_f1'},
      {headerName: 'RatioOverride_f2', field: 'RatioOverride_f2'},
      {headerName: 'RefAgency', field: 'RefAgency'},
      {headerName: 'RefYears', field: 'RefYears'},
      {headerName: 'SID', field: 'SID'},
      {headerName: 'SID_f0', field: 'SID_f0'},
      {headerName: 'SID_f1', field: 'SID_f1'},
      {headerName: 'SID_f2', field: 'SID_f2'},
      {headerName: 'SwapBaseName', field: 'SwapBaseName'},
      {headerName: 'TBAName', field: 'TBAName'},
      {headerName: 'TBASID', field: 'TBASID'},
      {headerName: 'YearsToMaturity', field: 'YearsToMaturity'},
      {headerName: 'f0TBAName', field: 'f0TBAName'},
      {headerName: 'f0TBASID', field: 'f0TBASID'},
      {headerName: 'f1TBAName', field: 'f1TBAName'},
      {headerName: 'f1TBASID', field: 'f1TBASID'},
      {headerName: 'f2TBAName', field: 'f2TBAName'},
      {headerName: 'f2TBASID', field: 'f2TBASID'},
    ],

    sideBar: true,
    // suppressColumnVirtualisation: true,
    // rowMultiSelectWithClick: true,
    // rowSelection: 'multiple',
};


  constructor() {
    this.customGridCallBack = this.customGridCallBack.bind(this);
  }

  ngOnInit() {}

  customGridCallBack(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.ColumnApi;
    this.gridApi.closeToolPanel();
  }

}
