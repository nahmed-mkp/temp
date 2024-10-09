import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { GridApi, ColumnApi, GridOptions } from 'ag-grid-community';
import * as Highcharts from 'highcharts';

import * as fromModels from './../../models';
import { UtilityService } from 'src/app/services';


@Component({
  selector: 'app-rcpm-directionality-plot-grid-viewer',
  templateUrl: './rcpm-directionality-plot-grid-viewer.component.html',
  styleUrls: ['./rcpm-directionality-plot-grid-viewer.component.scss']
})
export class RcpmDirectionalityPlotGridViewerComponent implements OnInit, OnChanges {

  @Input() dataPath: fromModels.DataPath;
  @Input() data: any;
  @Input() loading: any;
  @Input() screen: string;
  @Input() factor: string;

  public mode: 'chart' | 'raw' = 'chart';
  public Highcharts = Highcharts;

  private chart: any;
  private formattedPlotData: any;
  public optionsPlot = {
    subtitle: { text: ''},
    title : { text: ''},
    xAxis: {
      gridLineWidth: 1,
      plotLines: [{
        color: '#8080807d',
        width: 3,
        value: 0
      }]
    },

    yAxis: {
      plotLines: [{
        color: '#8080807d',
        width: 3,
        value: 0
      }]
    },
    tooltip: {
      shared: true,
      crosshairs: [true],
      borderColor: 'gray',
      borderRadius: 10,
      borderWidth: 1,
      split: false,
    },
    lang: {
      noData: 'No Data'
    },
    legend: {
      enabled: false
    },
    navigator: {
        enabled: false,
    },
    exporting: {
      csv: {
        dateFormat: '%m/%d/%Y'
      }
    },
    credits: {
        enabled: false
    },
    plotOptions: {
      scatter: {
        tooltip: {
          headerFormat: '<b>{series.name}</b><br>',
          pointFormatter: function () {
            const seriesParts = this.series.name.split('vs.');
            if (this.x && this.y && seriesParts.length === 2) {
              const xSeries = seriesParts[0].trim();
              const ySeries = seriesParts[1].trim();
              return `<br />
                      <span style="color:rgba(223, 83, 83, 1)">Date</span>: ${this.options.Date}<br />
                      <span style="color:rgba(223, 83, 83, 1)">${xSeries}</span>: ${this.x.toFixed(2)} <br />
                      <span style="color:rgba(223, 83, 83, 1)">${ySeries}</span>: ${this.y.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
            } else {
              return false;
            }
          },
        }
      }
    },
    scrollbar: {
      enabled: false
    },
    rangeSelector: {
      enabled: false
    }
  };

  private gridApi: GridApi;
  private gridColumnApi: ColumnApi;
  public extraOption = {
    sizeColumnsToFit: true
  };
  public customGridOption: GridOptions = {
    columnDefs: [
      {headerName: 'Date', field: 'Date', sort: 'desc',
        comparator: (valueA, valueB, nodeA, nodeB) => {
          const dateA = (new Date(valueA)).getTime();
          const dateB = (new Date(valueB)).getTime();
          return dateA - dateB;
        }
      },
      { headerName: 'Y', field: 'y' },
      { headerName: 'X Value', field: 'x', valueFormatter: this.utilities.formatPercentNumberDivide100Formatter(2) },
      { headerName: 'X ($ returns)', field: 'x ($)', valueFormatter: this.utilities.formatPercentNumberDivide100Formatter(2) },
      { headerName: 'X (% returns)', field: 'x (%)', valueFormatter: this.utilities.formatPercentNumberFormatterMultiply100OrZero(2)},
    ]
  };

  constructor(private utilities: UtilityService) {
    this.callbackFn = this.callbackFn.bind(this);
    this.customGridCallBack = this.customGridCallBack.bind(this);
  }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges) {

    if (changes.data && changes.data.currentValue) {

      console.warn(this.data)

      this.formattedPlotData = this._formatData(this.data.scatter, this.data.usePctReturns);

      if (this.chart && this.mode === 'chart') {
        this._cleanPlot();
        this._drawPlot(this.formattedPlotData);
        this._generateRegressionLine(this.data.regLine);
      }
    }

    // if (changes.factor && changes.factor.currentValue && this.chart) {
    //   this.chart.setTitle(null, {
    //     text: this.factor
    //   });
    // }

    if (changes.dataPath && changes.dataPath.previousValue && changes.dataPath.currentValue ) {
      this.factor = undefined;

      if (this.chart && this.mode === 'chart') {
        this._cleanPlot();
      }

      if (this.gridApi && this.mode === 'raw') {
        this.gridApi.setRowData([]);
      }
    }
  }

  public callbackFn(chart: any): void {
    this.chart = chart;

    if (this.formattedPlotData && this.mode === 'chart') {
      this._drawPlot(this.formattedPlotData);
      this._generateRegressionLine(this.data.regLine);
    }

    // if (this.factor) {
    //   this.chart.setTitle(null, {
    //     text: this.factor
    //   });
    // }
    setTimeout(() => {
      this.chart.reflow();
    }, 100);
  }

  public customGridCallBack(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.ColumnApi;
  }

  private _formatData(data: any[], usePctReturns: boolean) {
    const result = data.map(element => {
      const x = parseFloat(usePctReturns ? element['x (%)'] : element['x ($)']);
      const y = parseFloat(element.y);
      return [x, y, element.Date];
    });
    return result;
  }

  private _drawPlot(data: any[]) {

    // const xArray = data.map(element => element['x ($)']);
    // const yArray = data.map(element => element['y'] / 1000);

    // const min_x = Math.min(...xArray);
    // const max_x = Math.max(...xArray);

    // const min_y = Math.min(...yArray);
    // const max_y = Math.max(...yArray);

    // const mid_x = Math.abs((min_x + max_x) / 2);
    // const mid_y = Math.abs((min_y + max_y) / 2);

    // this.chart.yAxis.min = min_y - 2 * mid_y;
    // this.chart.yAxis.max = max_y + 2 * mid_y;

    // this.chart.xAxis.min = min_x - 2 * mid_x;
    // this.chart.xAxis.max = max_x + 2 * mid_x;

    if (this.chart.series) {
      while (this.chart.series.length > 0) {
        this.chart.series[0].remove();
      }
    }

    const yAxisLabel = this.dataPath.displayName ? `${this.dataPath.displayName} ($ Returns)` : 'Values';
    const xAxisLabel = this.factor ? `${this.factor} (${this.data.usePctReturns ? '% Returns' : '$ Returns'} )` : 'Factor';

    this.chart.yAxis[0].setTitle({'text': yAxisLabel});
    this.chart.xAxis[0].setTitle({ 'text': xAxisLabel});

    const plotData = data.map((point) => {
      return {
        'x': point[0], 'y': point[1], 'Date': point[2]
      };
    });

    this.chart.addSeries({
      data: plotData,
      type: 'scatter',
      color: 'rgba(223, 83, 83, .5)',
      name: `${this.factor} vs. ${this.dataPath.displayName}`
    });

  }

  private _cleanPlot() {
    // this.chart.setTitle(null, {
    //   text: ''
    // });
    while (this.chart.series.length > 0) {
      this.chart.series[0].remove();
    }
  }

  private _generateRegressionLine(regLine: any) {
    this.chart.addSeries({
      name: 'regression',
      data: regLine,
      type: 'line',
      color: '#FF0000',
      marker: {
        enabled: false
      }
    });
  }

  public getTitle(): string {
    if ((this.dataPath !== null && this.dataPath !== undefined) &&
        (this.factor !== null && this.factor !== undefined)) {
          return `${this.dataPath.displayName} vs. ${this.factor}`;
    }
    return 'Scatter Plot';
  }

  public getRegressionEquationString(data: any): string {
    if (data !== undefined) {
      if (data.alpha !== undefined && data.regressionBeta !== undefined) {
        if (data.alpha < 0) {
          return `${data.regressionBeta.toLocaleString(undefined, { maximumFractionDigits: 3 })} * X - ` +
            `${Math.abs(data.alpha).toLocaleString(undefined, { maximumFractionDigits: 3})}`;
        } else {
          return `${data.regressionBeta.toLocaleString(undefined, { maximumFractionDigits: 3 })} * X + ` +
            `${data.alpha.toLocaleString(undefined, { maximumFractionDigits: 3 })}`;
        }
      }
    }
    return 'a * X + b';
  }
}


