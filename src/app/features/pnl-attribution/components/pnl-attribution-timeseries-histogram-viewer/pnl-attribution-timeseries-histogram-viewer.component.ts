import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { HighchartsFactory } from 'src/app/factories';

@Component({
  selector: 'app-pnl-attribution-timeseries-histogram-viewer',
  templateUrl: './pnl-attribution-timeseries-histogram-viewer.component.html',
  styleUrls: ['./pnl-attribution-timeseries-histogram-viewer.component.scss']
})
export class PnlAttributionTimeseriesHistogramViewerComponent implements OnInit, OnChanges {

  @Input() attributionTimeseriesData;
  @Input() loading: boolean;
  @Input() loaded: boolean;
  @Input() darkTheme: boolean;


  private seriesColorSet = ['#9dc7f1', '#727276', '#a5d6a7'];

  public notEnoughDataPointwarning = false;

  public chart: any;
  public Highcharts: any;
  private formattedValue;
  public optionsPlot;

  constructor(public chartFactory: HighchartsFactory) { 
    this.callbackFn = this.callbackFn.bind(this);
    this.Highcharts = this.chartFactory.Highcharts;
  }

  ngOnInit() {
    this.optionsPlot = this._createPlotOption();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.attributionTimeseriesData && changes.attributionTimeseriesData.currentValue) {
      this.formattedValue = this._formatPlotData(changes.attributionTimeseriesData.currentValue);
      if (this.chart && this.notEnoughDataPointwarning === false) {
        this._drawPlot();
      }
    }

    if (changes.darkTheme && this.chart) {
      this.optionsPlot = this._createPlotOption();
      this.chart.update(this.optionsPlot);
    }
  }

  public callbackFn(chart: any): void {
    this.chart = chart;
    if (this.formattedValue && this.notEnoughDataPointwarning === false) {
      this._drawPlot();
    }
  }

  // Utility ---------------------------------------------------

  private _formatPlotData(rawData) {
  let seriesName: string[] = rawData.columns || [];
  seriesName = seriesName.filter(name => name !== 'Date');
  const formattedSeriesCollection = seriesName.map((name, index) => {
    return {
      name: name,
      data: [],
      type: 'scatter',
      id: 's' + index,
      visible: false,
    }
  });

  const data = rawData.data || [];
  if (data.length === 1) {
    this.notEnoughDataPointwarning = true;
  } else {
    this.notEnoughDataPointwarning = false;
  }

  data.forEach(element => {
    const dateTime = (new Date(element[0])).getTime();
    for (let index = 1; index < element.length; index++) {
      const point = element[index];
      formattedSeriesCollection[index-1].data.push(point)
    }
  });

    //console.log('Historygram format', formattedSeriesCollection);
    return formattedSeriesCollection;
  }

  private _drawPlot() {
    while (this.chart.series.length > 0) {
      this.chart.series[0].remove();
    }
    // this.chart.setTitle({
    //   text: this.timeseriesTitle
    // });

    this.formattedValue.forEach((series, index) => {

      if (!series.name.includes('_acc')) {
        this.chart.addSeries(series);
        if (index === 0) {
          this.chart.addSeries({
            type: 'histogram',
            name: series.name + '(Hist)',
            baseSeries: 's' + index,
            xAxis: 1,
            yAxis: 1,
            color: this.seriesColorSet[index]
          })
        } else {
          this.chart.addSeries({
            type: 'histogram',
            name: series.name + '(Hist)',
            baseSeries: 's' + index,
            xAxis: 2,
            yAxis: 2,
            color: this.seriesColorSet[index],
            visible: false
          })
        }
      }
    });
  }

  private _createPlotOption() {
    return {
      title: { text: ''},
      subtitle: { text: 'Histogram', style: {color: this.darkTheme ? 'white' : '#666666'} },
  
      xAxis: [{
        title: { text: 'Data' },
        alignTicks: false,
        visible: false
      }, {
          title: { text: '' },
          alignTicks: false,
          opposite: false,
          gridLineWidth: 0.5,
          labels: {
            style: {
              color: this.darkTheme && 'white'
            }
          }
      }, {
        title: { text: '' },
        alignTicks: false,
        opposite: true,
        gridLineWidth: 0.5,
        labels: {
          style: {
            color: this.darkTheme && 'white'
          }
        }
      }],
  
      yAxis: [{
        title: { text: 'Data' },
        opposite: false,
        visible: false
      }, {
          title: { text: '' },
          opposite: false,
          labels: {
            style: {
              color: this.darkTheme && 'white'
            }
          }
      },{
        title: { text: '' },
        opposite: true,
        labels: {
          style: {
            color: this.darkTheme && 'white'
          }
        }
      }],

      colors: ['#9dc7f1', '#727276', '#a5d6a7'],
  
      legend: {
          enabled: true,
          align: 'right',
          layout: 'vertical',
          verticalAlign: 'top',
          floating: true,
          y: 0,
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
              dateFormat: '%Y-%m-%d'
          }
      },
      credits: {
          enabled: false
      },
      plotOptions: {
        series: {
          showInNavigator: true
        },
        histogram: {
          tooltip: {
            valueDecimals: 0
          },
          binsNumber: 20 
        },
      },
      stockTools: {
        gui: {
            enabled: true
        }
      },
    };
  }

}
