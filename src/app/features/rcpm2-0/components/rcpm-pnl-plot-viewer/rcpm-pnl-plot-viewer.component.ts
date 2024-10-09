import { Component, OnInit, Input, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';

import * as noData from 'highcharts/modules/no-data-to-display';

import * as fromModels from '../../models';

import * as moment from 'moment';

@Component({
  selector: 'app-rcpm-pnl-plot-viewer',
  templateUrl: './rcpm-pnl-plot-viewer.component.html',
  styleUrls: ['./rcpm-pnl-plot-viewer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RcpmPnlPlotViewerComponent implements OnInit, OnChanges {

  @Input() data: any[];
  @Input() request: fromModels.IReturnsRequest;
  @Input() loading: boolean;
  @Input() dataPath: fromModels.DataPath;
  @Input() plotMode: 'Daily' | 'Cumulative';
  @Input() capitals: any;

  @Input() divideBy: 'FundCapital' | 'CrossPodCapital' | 'PodCapital' | 'NoCapital' = 'NoCapital';

  public chart: any;

  public optionsPlot = {
    subtitle: {},
    // title : { text : this.title + ' ' + this.displayPropety},
    xAxis: {
      gridLineWidth: 0
    },
    yAxis: {
      gridLineWidth: 0,
      plotLines: [{
        color: '#9b9b9b',
        width: 2,
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
      formatter: function() {
        return this.points.reduce(function(s, point) {
            return s + '<br /><span style="color:' + point.color + '">\u25CF</span> ' + point.series.name + ': ' +
            point.y.toLocaleString();
        }, '<b>' + new Date(this.x).toLocaleDateString('en-US', { timeZone: 'UTC'}) + '</b>');
      }
    },
    lang: {
      noData: 'No Data'
    },
    legend: {
        enabled: false,
        align: 'right',
        layout: 'vertical',
        verticalAlign: 'top',
        floating: false,
        y: 100,
    },
    navigator: {
        series: {
          includeInCSVExport: false
        },
        height: 40,
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
      series: {
        showInNavigator: true
      }
    },
    stockTools: {
        gui: {
            enabled: true
        }
    },
    scrollbar: {
      height: 7
    },
    rangeSelector: {
      selected: 4
    },
  };


  constructor() {
    this.callbackFn = this.callbackFn.bind(this);
  }

  ngOnInit() {
    this.optionsPlot.subtitle = { text: (this.dataPath ? this.dataPath.displayName : '') + (this.request ? this.request.year : '') + ' P&L History' };
  }

  ngOnChanges(changes: SimpleChanges) {

    let drawChart = false;

    if (changes.data && changes.data.currentValue && changes.data.currentValue.length > 0 && this.chart) {
      drawChart = true;
    }

    if (changes.request && changes.request.currentValue && this.chart) {
      drawChart = true;
    }

    if (changes.plotMode && changes.plotMode.currentValue) {
      drawChart = true;
    }

    if (changes.dataPath && changes.dataPath.currentValue && this.chart) {
      this.chart.setTitle(null, {
        text: this.getTitle()
      });
    }

    if (changes.divideBy && changes.divideBy.currentValue && this.chart) {
      drawChart = true;
    }

    if (drawChart) {
      if (this.chart) {
        this.drawPlot();
      }
    }
  }

  public callbackFn(chart: any): void {

    this.chart = chart;

    if (this.data && this.data.length > 0) {
      this.drawPlot();
    }

    if (this.dataPath) {
      this.chart.setTitle(null, {
        text: this.getTitle()
      });
    }

    setTimeout(() => {
      this.chart.reflow();
    }, 100);
  }

  private drawPlot() {

    while (this.chart.series.length > 0) {
      this.chart.series[0].remove();
    }

    if (this.data === null || this.data === undefined) {
      return;
    }

    this.chart.animation = false;

    if (this.plotMode === 'Daily') {

      const chartData = [];

      if (this.data && this.divideBy === 'FundCapital' && this.capitals && this.capitals['fundCapitals'] && this.capitals['fundCapitals'].length > 0) {
        this.data.forEach(element => {
          const fundCapitalOnDate = this.getCapitalOnDate(this.capitals['fundCapitals'], element.Date, 'SODCapital');
          chartData.push([
            (new Date(element.Date)).getTime(),
            (element.TotalPl / (fundCapitalOnDate !== 0 ? fundCapitalOnDate : 1.0)) * 100.0
          ]);
        });
      } else if (this.data && this.divideBy === 'CrossPodCapital' && this.capitals && this.capitals['crossPodCapitals'] && this.capitals['crossPodCapitals'].length > 0) {
        this.data.forEach(element => {
          const crossPodCapitalOnDate = this.getCapitalOnDate(this.capitals['crossPodCapitals'], element.Date, 'LeveredSODCapital');
          chartData.push([
            (new Date(element.Date)).getTime(),
            (element.TotalPl / (crossPodCapitalOnDate !== 0 ? crossPodCapitalOnDate : 1.0)) * 100.0
          ]);
        });
      } else if (this.data && this.divideBy === 'PodCapital' && this.capitals && this.capitals['podCapitals'] && this.capitals['podCapitals'].length > 0) {
        this.data.forEach(element => {
          const podCapitalOnDate = this.getCapitalOnDate(this.capitals['podCapitals'], element.Date, 'LeveredSODCapital');
          chartData.push([
            (new Date(element.Date)).getTime(),
            (element.TotalPl / (podCapitalOnDate !== 0 ? podCapitalOnDate : 1.0)) * 100.0
          ]);
        });
      } else {
        this.data.forEach(element => {
          chartData.push([
            (new Date(element.Date)).getTime(),
            element.TotalPl
          ]);
        });
      }

      if (chartData.length > 0) {

        this.chart.xAxis[0].setExtremes(chartData[0]['Date'], chartData[chartData.length - 1]['Date']);

        this.chart.addSeries({
          data: chartData,
          type: 'line',
          name: this.getTitle(),
          zoneAxis: 'y',
          zones: [{
            value: 0,
            color: '#fc2323'
          }, {
            color: '#56ee15'
          }]
        });
      }
    } else if (this.plotMode === 'Cumulative') {
      const chartData = [];
      let curTotalPl = 0;
      this.data.map((ret) => {
        curTotalPl = curTotalPl + ret['TotalPl'];
        chartData.push([(new Date(ret['Date'])).getTime(), curTotalPl]);
      });
      this.chart.addSeries({
        data: chartData,
        type: 'area',
        name: this.getCumulativeModeTitle()
      });

    }
  }

  private getCapitalOnDate(capitals: any[], date: string, capitalType: string): number {
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

  private getTitle(): string {
    let title = this.dataPath.displayName + ` (${(this.request ? this.request.year : '')}) $ Return`;
    if (this.divideBy === 'FundCapital') {
      title = this.dataPath.displayName + ` (${(this.request ? this.request.year : '')}) % to Fund Capital`;
    } else if (this.divideBy === 'CrossPodCapital') {
      title = this.dataPath.displayName + ` (${(this.request ? this.request.year : '')}) % to CrossPod Capital`;
    } else if (this.divideBy === 'PodCapital') {
      title = this.dataPath.displayName + ` (${(this.request ? this.request.year : '')}) % to Pod Capital`;
    }
    return title;
  }

  private getCumulativeModeTitle(): string {
    return this.dataPath.displayName + ` (${(this.request ? this.request.year : '')}) Cumulative P&L`;
  }
}
