import { Component, OnInit, Input, OnChanges, SimpleChanges, ElementRef } from '@angular/core';
import * as moment from 'moment';
import { HighchartsFactory } from 'src/app/factories';

@Component({
  selector: 'app-rates-inflation-swap-plot-viewer',
  templateUrl: './rates-inflation-swap-plot-viewer.component.html',
  styleUrls: ['./rates-inflation-swap-plot-viewer.component.scss']
})
export class RatesInflationSwapPlotViewerComponent implements OnInit, OnChanges {

  @Input() data: any;
  @Input() loading: boolean;

  private timeStamp: string;
  private plotDataCollection: any[];
  private chart: any;
  public optionsPlot: any;

  private six_month_prior = moment().subtract(6, 'M').valueOf();
  private curr_date = moment().valueOf();

  constructor( private dom: ElementRef) {
    this.callbackFn = this.callbackFn.bind(this);
  }

  ngOnInit() {
    this.optionsPlot = this._createPlotOption();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.data && changes.data.currentValue) {
      console.log('You can ignore the following error that arises from inflation swaps (changes.data.currentValue.map is not a function) - Niaz A.');
      changes.data.currentValue.map(val => {
        val.data.map(item => {
          const date = moment(item[0]);
          item[0] = moment(date).valueOf();
        });
      });
      this.plotDataCollection = [...changes.data.currentValue];
    }

    if (this.chart && this.plotDataCollection) {
      this._drawPlot(this.plotDataCollection);
    }
  }

  public callbackFn(chart: any): void {
    this.chart = chart;
    setTimeout(() => {
      this.chart.reflow();
    }, 100);
  }

  private _drawPlot(plotData: any[]) {
    this.chart.animation = false;
    while (this.chart.series.length > 0) {
      this.chart.series[0].remove();
    }
    plotData.forEach(series => {
      this.chart.addSeries(series);
    });
  }
  private _createPlotOption() {

    const context = this;
    return {
      chart: {
        zooming:{
          type: 'xy'
        }
      },
      colors: ['#2f7ed8', '#0d233a', '#8bbc21', '#910000'],
      xAxis: {
        gridLineWidth: 0.5,

      },
      yAxis: {
        gridLineWidth: 0.5
      },
      tooltip: {
        shared: true,
        crosshairs: [true],
        borderColor: 'gray',
        borderRadius: 10,
        borderWidth: 1,
        split: true,
        formatter: function() {
          return this.points.reduce(function(s, point) {
              return s + '<br /><span style="color:' + point.color + '">\u25CF</span> ' + point.series.name + ': ' + point.y.toFixed(2).toLocaleString();
          }, '<b>' + new Date(this.x).toLocaleDateString('en-US', { timeZone: 'UTC'}) + '</b>');
        }
      },
      lang: {
        noData: 'No Data'
      },
      legend: {
          enabled: true,
          align: 'left',
          layout: 'vertical',
          verticalAlign: 'top',
          floating: true,
          y: 100,
      },
      navigator: {
          series: {
            includeInCSVExport: false,
          },
          height: 80,
          enabled: true,
          xAxis: {
            ceiling: this.curr_date,
            maxPadding: 0.05
          }
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
        selected: 2
      },
    };
  }
}
