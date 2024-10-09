import { Component, OnInit, Input, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';

import * as noData from 'highcharts/modules/no-data-to-display';

import * as fromModels from '../../models';

import * as moment from 'moment';
import { ColumnApi, GridApi, GridOptions } from 'ag-grid-community';
import { RCPMMonthlyPnLCellComponent } from '../../renderers/rcpm-monthly-pnl-cell.component';

@Component({
  selector: 'app-rcpm-pnl-monthly-viewer',
  templateUrl: './rcpm-pnl-monthly-viewer.component.html',
  styleUrls: ['./rcpm-pnl-monthly-viewer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RcpmPnlMonthlyViewerComponent implements OnInit, OnChanges {

  @Input() data: any[];
  @Input() request: fromModels.IReturnsRequest;
  @Input() loading: boolean;
  @Input() dataPath: fromModels.DataPath;
  @Input() divideBy: 'FundCapital' | 'CrossPodCapital' | 'PodCapital' | 'NoCapital';

  @Input() capitals: any;

  private gridApi: GridApi;
  private gridColumnApi: ColumnApi;

  public MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  public extraOption = {
    autoSizeColumns: true
  };

  public customGridOption: GridOptions = {

    columnDefs: [
      { headerName: 'Metric', field: 'Metric', maxWidth: 100 },
      {
        headerName: 'YTD',
        field: 'YTD',
        maxWidth: 80,
        cellStyle: (params) => {
          const result = { 'justify-content': 'flex-end' };
          if (params.data['ColType'] !== 'Capital') {
            if (params.data['YTD'] >= 0) {
              result['background-color'] = '#c4ecca';
            } else if (params.data['July'] < 0) {
              result['background-color'] = '#fab6a3';
            }
          }
          return result;
        },
        cellRenderer: 'RCPMMonthlyPnLCellComponent',
        cellRendererParams: { ColType: 'ColType' }
      },
      { headerName: 'January', field: 'January', maxWidth: 80,
        cellStyle: (params) => {
          const result = { 'justify-content': 'flex-end'};
          if (params.data['ColType'] !== 'Capital') {
            if (params.data['January'] >= 0) {
              result['background-color'] = '#c4ecca';
            } else if (params.data['January'] < 0) {
              result['background-color'] = '#fab6a3';
            }
          }
          return result;
        },
        cellRenderer: 'RCPMMonthlyPnLCellComponent',
        cellRendererParams: { ColType: 'ColType' }
      },
      {
        headerName: 'February', field: 'February', maxWidth: 80,
        cellStyle: (params) => {
          const result = { 'justify-content': 'flex-end'};
          if (params.data['ColType'] !== 'Capital') {
            if (params.data['February'] >= 0) {
              result['background-color'] = '#c4ecca';
            } else if (params.data['February'] < 0) {
              result['background-color'] = '#fab6a3';
            }
          }
          return result;
        },
        cellRenderer: 'RCPMMonthlyPnLCellComponent',
        cellRendererParams: { ColType: 'ColType' }
      },
      {
        headerName: 'March', field: 'March', maxWidth: 80,
        cellStyle: (params) => {
          const result = { 'justify-content': 'flex-end'};
          if (params.data['ColType'] !== 'Capital') {
            if (params.data['March'] >= 0) {
              result['background-color'] = '#c4ecca';
            } else if (params.data['March'] < 0) {
              result['background-color'] = '#fab6a3';
            }
          }
          return result;
        },
        cellRenderer: 'RCPMMonthlyPnLCellComponent',
        cellRendererParams: { ColType: 'ColType' }
      },
      {
        headerName: 'April', field: 'April', maxWidth: 80,
        cellStyle: (params) => {
          const result = { 'justify-content': 'flex-end'};
          if (params.data['ColType'] !== 'Capital') {
            if (params.data['April'] >= 0) {
              result['background-color'] = '#c4ecca';
            } else if (params.data['April'] < 0) {
              result['background-color'] = '#fab6a3';
            }
          }
          return result;
        },
        cellRenderer: 'RCPMMonthlyPnLCellComponent',
        cellRendererParams: { ColType: 'ColType' }
      },
      {
        headerName: 'May', field: 'May', maxWidth: 80,
        cellRenderer: 'RCPMMonthlyPnLCellComponent',
        cellRendererParams: { ColType: 'ColType' },
        cellStyle: (params) => {
          const result = { 'justify-content': 'flex-end' };
          if (params.data['ColType'] !== 'Capital') {
            if (params.data['May'] >= 0) {
              result['background-color'] = '#c4ecca';
            } else if (params.data['May'] < 0) {
              result['background-color'] = '#fab6a3';
            }
          }
          return result;
        }
      },
      {
        headerName: 'June', field: 'June', maxWidth: 80,
        cellStyle: (params) => {
          const result = { 'justify-content': 'flex-end'};
          if (params.data['ColType'] !== 'Capital') {
            if (params.data['June'] >= 0) {
              result['background-color'] = '#c4ecca';
            } else if (params.data['June'] < 0) {
              result['background-color'] = '#fab6a3';
            }
          }
          return result;
        },
        cellRenderer: 'RCPMMonthlyPnLCellComponent',
        cellRendererParams: { ColType: 'ColType' }
      },
      {
        headerName: 'July', field: 'July', maxWidth: 80,
        cellStyle: (params) => {
          const result = { 'justify-content': 'flex-end' };
          if (params.data['ColType'] !== 'Capital') {
            if (params.data['July'] >= 0) {
              result['background-color'] = '#c4ecca';
            } else if (params.data['July'] < 0) {
              result['background-color'] = '#fab6a3';
            }
          }
          return result;
        },
        cellRenderer: 'RCPMMonthlyPnLCellComponent',
        cellRendererParams: { ColType: 'ColType' }
      },
      {
        headerName: 'August', field: 'August', maxWidth: 80,
        cellStyle: (params) => {
          const result = { 'justify-content': 'flex-end' };
          if (params.data['ColType'] !== 'Capital') {
            if (params.data['August'] >= 0) {
              result['background-color'] = '#c4ecca';
            } else if (params.data['August'] < 0) {
              result['background-color'] = '#fab6a3';
            }
          }
          return result;
        },
        cellRenderer: 'RCPMMonthlyPnLCellComponent',
        cellRendererParams: { ColType: 'ColType' }
      },
      {
        headerName: 'September', field: 'September', maxWidth: 80,
        cellStyle: (params) => {
          const result = { 'justify-content': 'flex-end'};
          if (params.data['ColType'] !== 'Capital') {
            if (params.data['September'] >= 0) {
              result['background-color'] = '#c4ecca';
            } else if (params.data['September'] < 0) {
              result['background-color'] = '#fab6a3';
            }
          }
          return result;
        },
        cellRenderer: 'RCPMMonthlyPnLCellComponent',
        cellRendererParams: { ColType: 'ColType' }
      },
      {
        headerName: 'October', field: 'October', maxWidth: 80,
        cellStyle: (params) => {
          const result = { 'justify-content': 'flex-end' };
          if (params.data['ColType'] !== 'Capital') {
            if (params.data['October'] >= 0) {
              result['background-color'] = '#c4ecca';
            } else if (params.data['October'] < 0) {
              result['background-color'] = '#fab6a3';
            }
          }
          return result;
        },
        cellRenderer: 'RCPMMonthlyPnLCellComponent',
        cellRendererParams: { ColType: 'ColType' }
      },
      {
        headerName: 'November', field: 'November', maxWidth: 80,
        cellStyle: (params) => {
          const result = { 'justify-content': 'flex-end'};
          if (params.data['ColType'] !== 'Capital') {
            if (params.data['November'] >= 0) {
              result['background-color'] = '#c4ecca';
            } else if (params.data['November'] < 0) {
              result['background-color'] = '#fab6a3';
            }
          }
          return result;
        },
        cellRenderer: 'RCPMMonthlyPnLCellComponent',
        cellRendererParams: { ColType: 'ColType' }
      },
      {
        headerName: 'December', field: 'December', maxWidth: 80,
        cellStyle: (params) => {
          const result = { 'justify-content': 'flex-end'};
          if (params.data['ColType'] !== 'Capital') {
            if (params.data['December'] >= 0) {
              result['background-color'] = '#c4ecca';
            } else if (params.data['December'] < 0) {
              result['background-color'] = '#fab6a3';
            }
          }
          return result;
        },
        cellRenderer: 'RCPMMonthlyPnLCellComponent',
        cellRendererParams: { ColType: 'ColType' }
      }
    ],
    frameworkComponents: {
      RCPMMonthlyPnLCellComponent: RCPMMonthlyPnLCellComponent
    },
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
    if (changes.divideBy && changes.divideBy.currentValue) {
      setTimeout(() => this.setRowData(), 100);
    }
    if (changes.request && changes.request.currentValue) {
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
      const series = this.dataPath.displayName;

      const months = [];
      this.data.map((ret) => {
        const month = this.getMonthIndexFromDateString(ret['Date']);
        if (months.indexOf(month) < 0) {
          months.push(month);
        }
      });

      const pivotedData = [];

      // Add Returns row
      pivotedData.push(this.buildMTDPnlRow(months, this.data));

      // Add Capitals
      if (this.capitals['fundCapitals'] && this.capitals['fundCapitals'].length > 0) {
        pivotedData.push(this.buildCapitalRow(months, this.capitals['fundCapitals'], 'SOPCapital', 'Fund Capital'));
      }

      if (this.capitals['crossPodCapitals'] && this.capitals['crossPodCapitals'].length > 0) {
        pivotedData.push(this.buildCapitalRow(months, this.capitals['crossPodCapitals'], 'SOPCapital', 'CrossPod Capital'));
      }

      if (this.capitals['podCapitals'] && this.capitals['podCapitals'].length > 0) {
        pivotedData.push(this.buildCapitalRow(months, this.capitals['podCapitals'], 'SOPCapital', 'Pod Capital'));
      }

      // Add % to Cap
      if (this.capitals['fundCapitals'] && this.capitals['fundCapitals'].length > 0) {
        pivotedData.push(this.buildReturnsRow(months, this.data, this.capitals['fundCapitals'], 'SOPCapital', '% to Fund'));
      }

      if (this.capitals['crossPodCapitals'] && this.capitals['crossPodCapitals'].length > 0) {
        pivotedData.push(this.buildReturnsRow(months, this.data, this.capitals['crossPodCapitals'], 'LeveredSOPCapital', '% to CrossPod'));
      }

      if (this.capitals['podCapitals'] && this.capitals['podCapitals'].length > 0) {
        pivotedData.push(this.buildReturnsRow(months, this.data, this.capitals['podCapitals'], 'LeveredSOPCapital', '% to Pod'));
      }

      // pivotedData.push(this.buildHitRatioRow(months, this.data, 'Hit Ratio'));

      this.gridApi.setRowData(pivotedData);

    }
  }

  private buildMTDPnlRow(months: number[], returns: any[]): any {
    const gridData = {
      0: { 'TotalPl': null },
      1: { 'TotalPl': null },
      2: { 'TotalPl': null },
      3: { 'TotalPl': null },
      4: { 'TotalPl': null },
      5: { 'TotalPl': null },
      6: { 'TotalPl': null },
      7: { 'TotalPl': null },
      8: { 'TotalPl': null },
      9: { 'TotalPl': null },
      10: { 'TotalPl': null },
      11: { 'TotalPl': null }
    };

    returns.map((ret) => {
      const month = this.getMonthIndexFromDateString(ret['Date']);
      if (months.indexOf(month) < 0) {
        months.push(month);
      }
      gridData[month]['TotalPl'] = ret['TotalPl'] + (gridData[month]['TotalPl'] ? gridData[month]['TotalPl'] : 0.0);
    });

    // Add rows to the grid
    const result = {
      'Metric': 'Dollar P&L',
      'YTD': gridData[0]['TotalPl'] + gridData[1]['TotalPl'] + gridData[2]['TotalPl'] + gridData[3]['TotalPl'] +
             gridData[4]['TotalPl'] + gridData[5]['TotalPl'] + gridData[6]['TotalPl'] + gridData[7]['TotalPl'] +
             gridData[8]['TotalPl'] + gridData[9]['TotalPl'] + gridData[10]['TotalPl'] + gridData[11]['TotalPl'],
      'January': gridData[0]['TotalPl'],
      'February': gridData[1]['TotalPl'],
      'March': gridData[2]['TotalPl'],
      'April': gridData[3]['TotalPl'],
      'May': gridData[4]['TotalPl'],
      'June': gridData[5]['TotalPl'],
      'July': gridData[6]['TotalPl'],
      'August': gridData[7]['TotalPl'],
      'September': gridData[8]['TotalPl'],
      'October': gridData[9]['TotalPl'],
      'November': gridData[10]['TotalPl'],
      'December': gridData[11]['TotalPl'],
      'ColType': 'DollarPnl'
    };

    return result;
  }

  private buildCapitalRow(pnlMonths: number[], capitals: any[], type: string, metric: string): any {
    const result = {
      'Metric': metric,
      'YTD': null,
      'January': null,
      'February': null,
      'March': null,
      'April': null,
      'May': null,
      'June': null,
      'July': null,
      'August': null,
      'September': null,
      'October': null,
      'November': null,
      'December': null,
      'ColType': 'Capital'};

    capitals.forEach((capital) => {
      const month = this.getMonthIndexFromDateString(capital['Date']);
      if (pnlMonths.indexOf(month) >= 0) {
        const monthName = this.MONTHS[month];
        const value = capital[type];
        if (value) {
          if (result[monthName] === null) {
            result[monthName] = [];
          }
          if (result[monthName].indexOf(value) < 0) {
            result[monthName].push(value);
          }
        }
      }
    });
    return result;
  }

  private buildReturnsRow(months: number[], returns: number[], capitals: any[], type: string, metric: string): any {
    const gridData = {
      0: { },
      1: { },
      2: { },
      3: { },
      4: { },
      5: { },
      6: { },
      7: { },
      8: { },
      9: { },
      10: { },
      11: { }
    };

    returns.map((ret) => {
      const month = this.getMonthIndexFromDateString(ret['Date']);
      const capital = this.getCapitalOnDate(ret['Date'], capitals, type);
      if (capital) {
        if (!Object.keys(gridData[month]).includes(capital.toString())) {
          gridData[month] = Object.assign({}, gridData[month], { [capital.toString()]: { 'Capital': capital, 'TotalPl': null } });
        }
        gridData[month][capital.toString()]['TotalPl'] = ret['TotalPl'] +
          (gridData[month][capital.toString()]['TotalPl'] ? gridData[month][capital.toString()]['TotalPl'] : 0.0);
      }
    });

    const pctReturns = {};

    Object.keys(gridData).forEach((month) => {
      const monthName = this.MONTHS[month];
      let pctReturn = 1.0;
      Object.keys(gridData[month]).forEach((returnData) => {
        pctReturn = pctReturn * (1 + gridData[month][returnData]['TotalPl'] / gridData[month][returnData]['Capital']);
      });
      pctReturns[monthName] = (pctReturn - 1.0) * 100.0;
    });

    let annualRet = 1;
    Object.keys(pctReturns).forEach((monthName) => {
        annualRet = annualRet * (1 + (pctReturns[monthName] / 100.0));
    });
    annualRet = (annualRet - 1) * 100.0;

    const result = {
      'Metric': metric,
      'YTD': annualRet,
      'January': months.includes(0) ? pctReturns['January'] : null,
      'February': months.includes(1) ? pctReturns['February'] : null,
      'March': months.includes(2) ? pctReturns['March'] : null,
      'April': months.includes(3) ? pctReturns['April'] : null,
      'May': months.includes(4) ? pctReturns['May'] : null,
      'June': months.includes(5) ? pctReturns['June'] : null,
      'July': months.includes(6) ? pctReturns['July'] : null,
      'August': months.includes(7) ? pctReturns['August'] : null,
      'September': months.includes(8) ? pctReturns['September'] : null,
      'October': months.includes(9) ? pctReturns['October'] : null,
      'November': months.includes(10) ? pctReturns['November'] : null,
      'December': months.includes(11) ? pctReturns['December'] : null,
      'ColType': 'PctReturn'
    };
    return result;
  }

  // private buildHitRatioRow(months: number[], returns: any[], metric: string): any {
  //   const hitRatio = {
  //     0: { 'Hits': 0, 'Observations': 0 },
  //     1: { 'Hits': 0, 'Observations': 0 },
  //     2: { 'Hits': 0, 'Observations': 0 },
  //     3: { 'Hits': 0, 'Observations': 0 },
  //     4: { 'Hits': 0, 'Observations': 0 },
  //     5: { 'Hits': 0, 'Observations': 0 },
  //     6: { 'Hits': 0, 'Observations': 0 },
  //     7: { 'Hits': 0, 'Observations': 0 },
  //     8: { 'Hits': 0, 'Observations': 0 },
  //     9: { 'Hits': 0, 'Observations': 0 },
  //     10: { 'Hits': 0, 'Observations': 0 },
  //     11: { 'Hits': 0, 'Observations': 0}
  //   };

  //   let globalHitRatio = 0;
  //   returns.map((ret) => {
  //     const month = this.getMonthIndexFromDateString(ret['Date']);
  //     if (ret['TotalPl'] >= 0) {
  //       hitRatio[month]['Hits'] += 1;
  //       globalHitRatio += 1;
  //     }
  //     hitRatio[month]['Observations'] += 1;
  //   });

  //   console.log(hitRatio);

  //   // Add rows to the grid
  //   const result = {
  //     'Metric': 'Hit Ratio',
  //     'YTD': (globalHitRatio / returns.length) * 100.0,
  //     'January': months.includes(0) ? (hitRatio[0]['Hits'] / hitRatio[0]['Observations']) * 100 : null,
  //     'February': months.includes(1) ? (hitRatio[1]['Hits'] / hitRatio[1]['Observations']) * 100 : null,
  //     'March': months.includes(2) ? (hitRatio[2]['Hits'] / hitRatio[2]['Observations']) * 100 : null,
  //     'April': months.includes(3) ? (hitRatio[3]['Hits'] / hitRatio[3]['Observations']) * 100 : null,
  //     'May': months.includes(4) ? (hitRatio[4]['Hits'] / hitRatio[4]['Observations']) * 100 : null,
  //     'June': months.includes(5) ? (hitRatio[5]['Hits'] / hitRatio[5]['Observations']) * 100 : null,
  //     'July': months.includes(6) ? (hitRatio[6]['Hits'] / hitRatio[6]['Observations']) * 100 : null,
  //     'August': months.includes(7) ? (hitRatio[7]['Hits'] / hitRatio[7]['Observations']) * 100 : null,
  //     'September': months.includes(8) ? (hitRatio[8]['Hits'] / hitRatio[8]['Observations']) * 100 : null,
  //     'October': months.includes(9) ? (hitRatio[9]['Hits'] / hitRatio[9]['Observations']) * 100 : null,
  //     'November': months.includes(10) ? (hitRatio[10]['Hits'] / hitRatio[10]['Observations']) * 100 : null,
  //     'December': months.includes(11) ? (hitRatio[11]['Hits'] / hitRatio[11]['Observations']) * 100 : null,
  //     'ColType': 'HitRatio'
  //   };

  //   console.log(result);

  //   return result;
  // }

  private getMonthIndexFromDateString(dateString: string): number {
    // This function assumes dates are in the format YYYY-MM-DD;
    return parseInt(dateString.substring(5, 7), 10) - 1;
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
