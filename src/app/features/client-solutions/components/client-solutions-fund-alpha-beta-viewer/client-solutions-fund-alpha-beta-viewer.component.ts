import { Component, OnInit, Input } from '@angular/core';
import * as fromModels from '../../models';
import { GridOptions, GridApi, ColumnApi } from 'ag-grid-community';

import { UtilityService } from 'src/app/services';
import { AppGridCustomStatusBarCellValueComponent, AppGridCustomStatusBarCellRangesStatisticComponent } from 'src/app/components';

@Component({
  selector: 'app-client-solutions-fund-alpha-beta-viewer',
  templateUrl: './client-solutions-fund-alpha-beta-viewer.component.html',
  styleUrls: ['./client-solutions-fund-alpha-beta-viewer.component.scss']
})
export class ClientSolutionsFundAlphaBetaViewerComponent implements OnInit {

  @Input() data: any[];
  @Input() loading: boolean;
  @Input() title: string;

  @Input() benchmarks: fromModels.Benchmark[];
  @Input() benchmarkLoading: boolean;

  public extraOption = {sizeColumnsToFit: true};
  public customGridOption: GridOptions;
  private gridApi: GridApi;
  private gridColumnApi: ColumnApi;

  public selectedBenchmark: fromModels.Benchmark;

  constructor(private utilityService: UtilityService) {
    this.customGridCallBack = this.customGridCallBack.bind(this);
  }

  ngOnInit() {
    this.customGridOption = this._createGridOption();
  }

  customGridCallBack(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  public selectedBenchmarkChange() {
    const targetFilter = this.gridApi.getFilterInstance('benchmark');
    if (targetFilter) {
      this.gridApi.setRowData(this.data);
      targetFilter.setModel({values: [this.selectedBenchmark.code]});
      this.gridApi.onFilterChanged();

    }
  }

  // Utility -------------------------------

  private _createGridOption(): GridOptions {
    return {
      defaultColDef: {
        suppressMenu: true,
        valueFormatter: this.utilityService.formatNumberWithCommasAndDigitAdvance(2, {percent: true}),
        cellStyle: params => {
          return typeof params.value === 'number' ? {'justify-content': 'flex-end'} : { };
        },
        cellClass: 'right-border-light',
        headerClass: 'ag-header-wrap'
      },

      columnDefs: [
        {headerName: 'Benchmark', field: 'benchmark', hide: true},
        {headerName: 'Time Period', field: 'timePeriod', valueFormatter: null, sort: 'desc'},
        {headerName: 'Annualized Return', field: 'annual_return'},
        {headerName: 'Annualized Alpha', field: 'alpha'},
        {headerName: 'Annualized Beta (Return - Alpha)', field: 'beta'},
        {headerName: 'Adjusted R Squared', field: 'adjustedRSquared'},
        {headerName: '# of Observation', field: 'obs', valueFormatter: null},
      ],

      getRowClass: params => {
        if (params.node.rowIndex % 2 === 0) {
          return ['even-row-shaded-effect', 'ultra-small-row'];
        } else {
          return ['ultra-small-row'];
        }
      },
      rowHeight: 18,
      sideBar: false,
      showToolPanel: false,
      // headerHeight: 50

      statusBar: {
        statusPanels: [
          {statusPanel: 'agAggregationComponent'},
          {statusPanel: 'AppGridCustomStatusBarCellValueComponent'},
        ],
      },

      frameworkComponents: {
        'AppGridCustomStatusBarCellValueComponent': AppGridCustomStatusBarCellValueComponent,
      }
    }
  }

}
