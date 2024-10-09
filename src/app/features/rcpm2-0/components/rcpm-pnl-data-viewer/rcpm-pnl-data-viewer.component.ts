import { Component, OnInit, Input, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';

import * as noData from 'highcharts/modules/no-data-to-display';

import * as fromModels from '../../models';

import * as moment from 'moment';
import { ColumnApi, GridApi, GridOptions } from 'ag-grid-community';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-rcpm-pnl-data-viewer',
  templateUrl: './rcpm-pnl-data-viewer.component.html',
  styleUrls: ['./rcpm-pnl-data-viewer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RcpmPnlDataViewerComponent implements OnInit, OnChanges {

  @Input() data: any[];
  @Input() request: fromModels.IReturnsRequest;
  @Input() loading: boolean;
  @Input() dataPath: fromModels.DataPath;
  @Input() plotMode: '$ Return' | 'Cumulative';

  @Input() capitals: any;

  private gridApi: GridApi;
  private gridColumnApi: ColumnApi;

  public extraOption = {
    autoSizeColumns: true
  };

  public customGridOption: GridOptions = {
    columnDefs: [
      {
        headerName: 'Date',
        headerTooltip: 'Date',
        field: 'Date',
        sort: 'desc',
        maxWidth: 70,
        comparator: (valueA, valueB, nodeA, nodeB) => {
          const dateTimeA = (new Date(valueA)).getTime();
          const dateTimeB = (new Date(valueB)).getTime();
          return dateTimeA - dateTimeB;
        }
      },
      {
        headerName: 'Total P&L',
        headerTooltip: 'Total P&L',
        field: 'TotalPl',
        maxWidth: 80,
        cellStyle: (params) => {
          const result = { 'justify-content': 'flex-end' };
          if (params.data['TotalPl'] >= 0) {
            result['background-color'] = '#c4ecca';
          } else if (params.data['TotalPl'] < 0) {
            result['background-color'] = '#fab6a3';
          }
          return result;
        }
      },
      {
        headerName: 'YTD P&L',
        headerTooltip: 'YTD P&L',
        field: 'CumulativePl',
        maxWidth: 80,
        cellStyle: (params) => {
          const result = { 'justify-content': 'flex-end' };
          if (params.data['CumulativePl'] >= 0) {
            result['background-color'] = '#c4ecca';
          } else if (params.data['CumulativePl'] < 0) {
            result['background-color'] = '#fab6a3';
          }
          return result;
        }
      },
      { headerName: 'Fund Capital (Daily)', headerTooltip: 'Fund Capital', field: 'FundCapital', maxWidth: 80 },
      { headerName: 'Fund Capital (Period)', headerTooltip: 'Fund Capital used for compounding period %age returns', field: 'FundCapital_Period', maxWidth: 80 },
      { headerName: 'Pod Capital (Daily)', headerTooltip: 'Pod Capital w/ Leverage', field: 'PodCapital', maxWidth: 80 },
      { headerName: 'Pod Capital (Period)', headerTooltip: 'Pod Capital used for compounding period %age returns', field: 'PodCapital_Period', maxWidth: 80 },
      { headerName: 'CrossPod Capital (Daily)', headerTooltip: 'CrossPod Capital w/ Leverage', field: 'CrossPodCapital', maxWidth: 80 },
      { headerName: 'CrossPod Capital (Period)', headerTooltip: 'CrossPod Capital used for compounding period %age returns', field: 'CrossPodCapital_Period', maxWidth: 80 },
    ],
    sideBar: false,
  };

  constructor() {
    this.customGridCallBack = this.customGridCallBack.bind(this);
  }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.data && changes.data.currentValue) {
      setTimeout(() => this.setRowData(), 100);
    }
    if (changes.capitals && changes.capitals.currentValue) {
      setTimeout(() => this.setRowData(), 100);
    }
  }

  customGridCallBack(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.ColumnApi;
    this.setRowData();
  }

  private setRowData() {

    this.gridApi.setRowData([]);

    if (this.data && this.data.length > 0 && this.dataPath) {
      let curTotal = 0;
      const gridData = [];
      this.data.map((ret) => {
        const totalPl = ret['TotalPl'].toFixed(0);
        curTotal += ret['TotalPl'];
        gridData.push({
          'Series': this.dataPath.displayName,
          'Date': ret['Date'],
          'TotalPl': ret['TotalPl'],
          'CumulativePl': curTotal,
          'FundCapital': this.getCapitalOnDate(ret['Date'], this.capitals['fundCapitals'], 'SODCapital'),
          'CrossPodCapital': this.getCapitalOnDate(ret['Date'], this.capitals['crossPodCapitals'], 'LeveredSODCapital'),
          'PodCapital': this.getCapitalOnDate(ret['Date'], this.capitals['podCapitals'], 'LeveredSODCapital'),
          'FundCapital_Period': this.getCapitalOnDate(ret['Date'], this.capitals['fundCapitals'], 'SOPCapital'),
          'CrossPodCapital_Period': this.getCapitalOnDate(ret['Date'], this.capitals['crossPodCapitals'], 'LeveredSOPCapital'),
          'PodCapital_Period': this.getCapitalOnDate(ret['Date'], this.capitals['podCapitals'], 'LeveredSOPCapital'),
        });
      });
      this.gridApi.setRowData(gridData);
    }
  }

  private getCapitalOnDate(date: any, capitals: any[], capitalType: string): number {
    if (capitals && capitals.length > 0) {
      const selectedCapital = capitals.find((capital) => {
        return capital['Date'] === date;
      });
      if (selectedCapital !== null && selectedCapital !== undefined) {
        return selectedCapital[capitalType];
      }
    }
    return null;
  }
}
