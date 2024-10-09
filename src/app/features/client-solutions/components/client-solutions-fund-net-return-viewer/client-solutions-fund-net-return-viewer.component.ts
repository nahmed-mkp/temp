import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { GridOptions, GridApi, ColumnApi } from 'ag-grid-community';

import { UtilityService } from 'src/app/services';
import * as fromModels from '../../models';
import * as moment from 'moment';
import { AppGridCustomStatusBarCellValueComponent } from 'src/app/components';

@Component({
  selector: 'app-client-solutions-fund-net-return-viewer',
  templateUrl: './client-solutions-fund-net-return-viewer.component.html',
  styleUrls: ['./client-solutions-fund-net-return-viewer.component.scss']
})
export class ClientSolutionsFundNetReturnViewerComponent implements OnInit, OnChanges {

  @Input() params: fromModels.IReportParameter;
  @Input() data: any[];
  @Input() loading: boolean;
  @Input() title: string;

  public extraOption = {sizeColumnsToFit: true};
  public customGridOption: GridOptions;
  private gridApi: GridApi;
  private gridColumnApi: ColumnApi;
  private formattedData: any[];

  private gridApi_export: GridApi;
  public formattedData_export: any[];
  public customGridOption_export: GridOptions;

  constructor(private utilityService: UtilityService) { 
    this.customGridCallBack = this.customGridCallBack.bind(this);
    this.customGridCallBack_export = this.customGridCallBack_export.bind(this);
  }

  ngOnInit() {
    this.customGridOption = this._createGridOption();
    this.customGridOption_export = this._createGridOption_export();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.data && changes.data.currentValue && changes.data.currentValue.length && changes.data.currentValue.length > 0) {
      this.formattedData = this.parseResults(changes.data.currentValue || []);
      this.formattedData_export = this._parseExportData(changes.data.currentValue || []);
      if (this.gridApi) {
        this.gridApi.setRowData(this.formattedData);
      }

      if (this.gridApi_export) {
        this.gridApi_export.setRowData(this.formattedData_export);
      }
    }
  }

  customGridCallBack(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    if (this.formattedData) {
      this.gridApi.setRowData(this.formattedData);
    }
  }

  customGridCallBack_export(params) {
    this.gridApi_export = params.api;

    if (this.formattedData_export) {
      this.gridApi_export.setRowData(this.formattedData_export);
    }
  }

  public onDownloadData(): void {
    const startDate = this.params.dateRange.startDate.toLocaleDateString('zh-Hans-CN', {year: 'numeric', month: '2-digit', day: '2-digit'}).split('/').join('');
    const endDate = this.params.dateRange.endDate.toLocaleDateString('zh-Hans-CN', {year: 'numeric', month: '2-digit', day: '2-digit'}).split('/').join('');
    this.gridApi_export.exportDataAsCsv({
      fileName: `${this.params.fund.description}_Net_Returns_${startDate}_${endDate}`,
    });
  }

  public onDownloadPivotedData(): void {
    const startDate = this.params.dateRange.startDate.toLocaleDateString('zh-Hans-CN', {year: 'numeric', month: '2-digit', day: '2-digit'}).split('/').join('');
    const endDate = this.params.dateRange.endDate.toLocaleDateString('zh-Hans-CN', {year: 'numeric', month: '2-digit', day: '2-digit'}).split('/').join('');
    this.gridApi.exportDataAsCsv({
      fileName: `${this.params.fund.description}_Net_Returns_${startDate}_${endDate}`,
    })
  }

  // Utility -----

  private _createGridOption(): GridOptions {
    return {
      defaultColDef: {
        suppressMenu: true,
        valueGetter: params => {
          const value = params.data[params.colDef.field];
          if (typeof value === 'number') {
            const valueString = value.toFixed(6);
            return parseFloat(valueString);
          } else {
            return null;
          }
        },
        valueFormatter: this.utilityService.formatNumberWithCommasAndDigitAdvance(2, {percent: true}),
        cellStyle: params => {
          return typeof params.value === 'number' ? {'justify-content': 'flex-end'} : { };
        },
        cellClass: 'right-border-light',
        headerClass: 'ag-header-wrap'
      },

      columnDefs: [
        {headerName: 'Year', field: 'year', valueFormatter: null, cellStyle: {}},
        {headerName: 'January', field: 'jan'},
        {headerName: 'February', field: 'feb'},
        {headerName: 'March', field: 'mar'},
        {headerName: 'April', field: 'apr'},
        {headerName: 'May', field: 'may'},
        {headerName: 'June', field: 'jun'},
        {headerName: 'July', field: 'jul'},
        {headerName: 'August', field: 'aug'},
        {headerName: 'September', field: 'sep'},
        {headerName: 'October', field: 'oct'},
        {headerName: 'November', field: 'nov'},
        {headerName: 'December', field: 'dec'},
        {headerName: 'YTD', field: 'ytd'},
        {headerName: 'ITD', field: 'itd'},
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

      statusBar: {
        statusPanels: [
          {statusPanel: 'agAggregationComponent'},
          {statusPanel: 'AppGridCustomStatusBarCellValueComponent'},
        ],
      },

      frameworkComponents: {
        'AppGridCustomStatusBarCellValueComponent': AppGridCustomStatusBarCellValueComponent,
      },
      defaultExportParams: {
        suppressQuotes: true,
      },

      getContextMenuItems: params => {

        const startDate = this.params.dateRange.startDate.toLocaleDateString('zh-Hans-CN', {year: 'numeric', month: '2-digit', day: '2-digit'}).split('/').join('');
        const endDate = this.params.dateRange.endDate.toLocaleDateString('zh-Hans-CN', {year: 'numeric', month: '2-digit', day: '2-digit'}).split('/').join('');
        const csvExport = {
          name: 'CSV Export',
          action: () => {
            params.api.exportDataAsCsv({
              fileName: `${this.params.fund.description}_Net_Returns_${startDate}_${endDate}`,
            })
          }
        };

        const excelExport = {
          name: 'Excel Export',
          action: () => {
            params.api.exportDataAsExcel({
              fileName: `${this.params.fund.description}_Net_Returns_${startDate}_${endDate}`,
            })
          }
        };
        return ['copy', 'copyWithHeaders', 'separator', csvExport, excelExport];
      },
    };
  }

  private parseResults(data: any[]): fromModels.IMonthlyReturn[] {
    const allReturns = data;
    const fundReturns = allReturns.filter((series: any) => series.name === this.params.fund.code);
    const rawReturns: fromModels.IReturns = new fromModels.Returns();
    if (fundReturns.length > 0) {
        fundReturns[0].data.map((dateValPair: number[]) => {
            const date = moment(dateValPair[0]).toDate();
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            this.addReturn(rawReturns, year, month, dateValPair[1]);
        });
    }
    return this.calculateITD(this.calculateYTD(rawReturns.getReturns()));
  }

  private addReturn(rawReturns: fromModels.IReturns, year: number, month: any, ret: number) {
    if (!rawReturns.returns[year]) {
        const monthlyReturn = new fromModels.MonthlyReturn(null);
        monthlyReturn.year = year;
        rawReturns.returns[year] = monthlyReturn;
        rawReturns.years.push(year);
    }
    const retrn = rawReturns.returns[year];
    retrn.updateReturn(month, ret);
  }

  private calculateYTD(returns: fromModels.IMonthlyReturn[]): fromModels.IMonthlyReturn[] {
    returns.map((ret: fromModels.IMonthlyReturn) => {
        ret.ytd =  (((1 + (ret.jan || 0.0)) *
                    (1 + (ret.feb || 0.0)) *
                    (1 + (ret.mar || 0.0)) *
                    (1 + (ret.apr || 0.0)) *
                    (1 + (ret.may || 0.0)) *
                    (1 + (ret.jun || 0.0)) *
                    (1 + (ret.jul || 0.0)) *
                    (1 + (ret.aug || 0.0)) *
                    (1 + (ret.sep || 0.0)) *
                    (1 + (ret.oct || 0.0)) *
                    (1 + (ret.nov || 0.0)) *
                    (1 + (ret.dec || 0.0))) - 1);
    });
    return returns;
  }

  private calculateITD(returns: fromModels.IMonthlyReturn[]): fromModels.IMonthlyReturn[] {
    returns.map((ret: fromModels.IMonthlyReturn) => {
        const filteredReturns = returns.filter((retrn: fromModels.IMonthlyReturn) => retrn.year <= ret.year);
        ret.itd = filteredReturns.reduce((result, ret: fromModels.IMonthlyReturn) => {
            return result * (1 + ret.ytd || 0.0);
        }, 1) - 1;
    });
    return returns;
  }




  private _createGridOption_export(): GridOptions {
    return {
      columnDefs: [
        {headerName: 'Date', field: 'date'},
        {headerName: 'Value', field: 'value'},
      ],
      defaultExportParams: {
        suppressQuotes: true
      }
    }
  }

  private _parseExportData(rawData: any[]) {
    const fundReturns = rawData.filter((series: any) => series.name === this.params.fund.code);
    const exportData = fundReturns[0].data.map(element => {
      const dateString = (new Date(element[0])).toLocaleDateString();
      const value = element[1];
      return {
        date: dateString,
        value: value
      }
    })
    return exportData;
  } 
}