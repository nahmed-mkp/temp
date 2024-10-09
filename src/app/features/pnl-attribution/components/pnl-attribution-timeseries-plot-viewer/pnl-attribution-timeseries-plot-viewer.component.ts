import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pnl-attribution-timeseries-plot-viewer',
  templateUrl: './pnl-attribution-timeseries-plot-viewer.component.html',
  styleUrls: ['./pnl-attribution-timeseries-plot-viewer.component.scss'],
})
export class PnlAttributionTimeseriesPlotViewerComponent implements OnInit, OnChanges {

  @Input() attributionTimeseriesData;
  @Input() loading: boolean;
  @Input() loaded: boolean;
  @Input() darkTheme: boolean;

  private formattedValue;
  public chart: any;
  public optionsPlot: any;

  private nameMapping = {
    'TotalPL_acc': '$P/L',
    'bpsToFund_acc': 'BpsToFund',
    'bpsToCap_acc': 'BpsToCap',
  }

  constructor() {
    this.callbackFn = this.callbackFn.bind(this);
  }

  ngOnInit() {
    this.optionsPlot = this._createPlotOption();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.attributionTimeseriesData && changes.attributionTimeseriesData.currentValue) {
      this.formattedValue = this._formatPlotData(changes.attributionTimeseriesData.currentValue);
      if (this.chart) {
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

    if (this.formattedValue) {
      this._drawPlot();
    }

    // if (this.dataPath) {
    //   this.chart.setTitle(null, {
    //     text: this.dataPath.displayName + ' Simulated Returns'
    //   });
    // }

    // setTimeout(() => {
    //   this.chart.reflow();
    // }, 100);
  }
  

  // Utility --------------------------------------------------------

  

  private _formatPlotData(rawData) {
    let seriesName: string[] = rawData.columns || [];
    seriesName = seriesName.filter(name => name !== 'Date');
    const formattedSeriesCollection = seriesName.map((name, index) => {
      return {
        name: this.nameMapping[name] ? this.nameMapping[name] : name,
        data: [],
        type: 'area',
        visible: name.includes('acc'),
        // yAxis: name.toLowerCase().includes('bps') ? 1 : 0
      };
    });

    const data = rawData.data || [];
    data.forEach(element => {
      const dateTime = (new Date(element[0])).getTime();
      for (let index = 1; index < element.length; index++) {
        const point = element[index];
        const dataPoint = [dateTime, point];
        formattedSeriesCollection[index-1].data.push(dataPoint)
      }
    });

    console.log('formattedSeriesCollection', formattedSeriesCollection);
    return formattedSeriesCollection;
  }

  private _drawPlot() {
    while (this.chart.series.length > 0) {
      this.chart.series[0].remove();
    }
    this.chart.animation = false;

    this.formattedValue.forEach((series, index) => {
      if (series.visible) {
        this.chart.addSeries(series);
      }
    });

    setTimeout(() => this._strecthRange(), 100)
  }

  private _strecthRange() {
    const {dataMin, dataMax} = this.chart.xAxis[0].getExtremes();
    console.log('extremet', dataMin, dataMax)
    this.chart.xAxis[0].setExtremes(dataMin, dataMax);
  }

  private _createPlotOption() {
    return {
      subtitle: { text: 'P/L History', style: {color: this.darkTheme ? 'white' : '#666666'}},
      // title : { text : this.title + ' ' + this.displayPropety},
      xAxis: {
        gridLineWidth: 0.5,
        style: {
          color: 'white'
        },
        labels: {
          style: {
            color: this.darkTheme && 'white'
          }
        }
      },
      yAxis: [
        {
          gridLineWidth: 0.5,
          title: {text: '$P/L'},
          labels: {
            style: {
              color: this.darkTheme && 'white'
            }
          }
        },
        // {
        //   gridLineWidth: 0.5,
        //   title: {text: 'Bps'},
        //   labels: {
        //     style: {
        //       color: this.darkTheme && 'white'
        //     }
        //   },
        //   opposite: false
        // },
      ],
      colors: ['#9dc7f1', '#727276', '#a5d6a7'],
      tooltip: {
        shared: true,
        crosshairs: [true],
        borderColor: 'gray',
        borderRadius: 10,
        borderWidth: 1,
        split: false,
        formatter: function() {
          return this.points.reduce(function(s, point) {
              return s + '<br /><span style="color:' + point.color + '">\u25CF</span> ' + point.series.name + ': ' + point.y.toLocaleString('en-US', {maximumFractionDigits: 0, minimumFractionDigits: 0});
          }, '<b>' + new Date(this.x).toLocaleDateString('en-US', { timeZone: 'UTC'}) + '</b>');
        }
      },
      lang: {
        noData: 'No Data'
      },
      legend: {
          enabled: true,
          align: 'center',
          layout: 'horizontal',
          verticalAlign: 'top',
          floating: true,
          y: 50,
          itemStyle: {'opacity': 0.7, 'fontWeight': 'normal', color: this.darkTheme ? 'white' : 'black'}
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
        },
        buttons: {
          contextButton: {
            enabled: false
          }
        }
      },
      credits: {
        enabled: false
      },
      plotOptions: {
        series: {
          showInNavigator: true
        },
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
        selected: 4,
        inputBoxBorderColor: this.darkTheme && 'gray',
        inputStyle: this.darkTheme && {
          color: 'white',
          fontWeight: 'bold'
        },
        labelStyle: this.darkTheme && {
          color: 'silver',
          fontWeight: 'bold'
        },
      },
    }
  }

}
