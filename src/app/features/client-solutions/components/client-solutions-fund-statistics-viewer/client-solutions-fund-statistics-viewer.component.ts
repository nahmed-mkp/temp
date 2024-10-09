import { Component, OnInit, Input } from '@angular/core';
import { GridOptions, GridApi, ColumnApi } from 'ag-grid-community';

import { UtilityService } from 'src/app/services';
import { AppGridCustomStatusBarCellValueComponent } from 'src/app/components';

@Component({
  selector: 'app-client-solutions-fund-statistics-viewer',
  templateUrl: './client-solutions-fund-statistics-viewer.component.html',
  styleUrls: ['./client-solutions-fund-statistics-viewer.component.scss']
})
export class ClientSolutionsFundStatisticsViewerComponent implements OnInit {

  @Input() data: any[];
  @Input() loading: boolean;
  @Input() title: string;

  public extraOption = {sizeColumnsToFit: true};
  public customGridOption: GridOptions;
  private gridApi: GridApi;
  private gridColumnApi: ColumnApi;

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

  onDownloadData() {
    this.gridApi.exportDataAsCsv({
      fileName: `${this.title} vs Benchmarks (Statistics)`
    });
  }

  // Utility -------------------------------

  private _createGridOption(): GridOptions {
    return {
      defaultColDef: {
        suppressMenu: true,
        valueFormatter: this.utilityService.formatNumberWithCommasAndDigitAdvance(2),
        cellStyle: params => {
          return typeof params.value === 'number' ? {'justify-content': 'flex-end'} : { };
        },
        cellClass: 'right-border-light',
        headerClass: 'ag-header-wrap'
      },

      columnDefs: [
        {headerName: 'Description', field: 'description', width: 300, suppressSizeToFit: true},
        {headerName: 'Compound ROR(A)', field: 'compoundROR', valueFormatter: this.utilityService.formatNumberWithCommasAndDigitAdvance(2, {percent: true})},
        {headerName: 'Cumulative Return', field: 'cumulativeReturn', valueFormatter: this.utilityService.formatNumberWithCommasAndDigitAdvance(2, {percent: true})},
        {headerName: 'Standard Deviation(A)', field: 'standardDeviationAnnualized', valueFormatter: this.utilityService.formatNumberWithCommasAndDigitAdvance(2, {percent: true})},
        {headerName: 'Max Drawdown', field: 'maxDrawdown', valueFormatter: this.utilityService.formatNumberWithCommasAndDigitAdvance(2, {percent: true})},
        {headerName: 'Sharpe Ratio', field: 'sharpeRatio'},
        {headerName: 'Correlation To Fund', field: 'correlationWithFund'},
        {headerName: 'Percent Profitable Period', field: 'pctProfitablePeriods', valueFormatter: this.utilityService.formatNumberWithCommasAndDigitAdvance(2, {percent: true})},
        {headerName: 'Sortino Ratio', field: 'sortinoRatio'},
        {headerName: 'Information Ratio', field: 'informationRatio'},
        {headerName: 'Risk Free Rate', field: 'riskFreeRate', valueFormatter: this.utilityService.formatNumberWithCommasAndDigitAdvance(2, {percent: true})},
        {headerName: 'Skew', field: 'skew'},
        {headerName: 'Kurtosis', field: 'kurtosis'},

        // {headerName: '', field: 'isBenchmark'},
        // {headerName: '', field: 'isError'},
      ],
      getRowClass: params => {
        const rowClass = ['ultra-small-row'];
        if (params.node.rowIndex % 2 === 0) {
          rowClass.push('even-row-shaded-effect');
        }
        if (params.node.data['description'] === this.title) {
          rowClass.push('yellow-background');
        }
        return rowClass;
      },

      rowHeight: 18,
      sideBar: false,
      showToolPanel: false,

      statusBar: {
        statusPanels: [
          {statusPanel: 'agAggregationComponent'},
          {statusPanel: 'AppGridCustomStatusBarCellValueComponent'},
        ],
      },

      frameworkComponents: {
        'AppGridCustomStatusBarCellValueComponent': AppGridCustomStatusBarCellValueComponent,
      }
    };
  }

}
