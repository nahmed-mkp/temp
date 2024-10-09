import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { HighchartsFactory } from 'src/app/factories';

@Component({
  selector: 'app-market-data-futures-basis-plot-viewer',
  templateUrl: './market-data-futures-basis-plot-viewer.component.html',
  styleUrls: ['./market-data-futures-basis-plot-viewer.component.scss']
})
export class MarketDataFuturesBasisPlotViewerComponent implements OnInit, OnChanges {

  @Input() data: any[];
  @Input() mode: string;
  @Input() title: string;
  @Input() plotType: 'stock' | 'basic' = 'stock';

  @Input() selectedPeriod: string;
  private rangeButtonCollection = ['1m', '3m', '6m', 'YTD', '1y', 'All'];

  private plotDataCollection: any[];
  private chart: any;
  public Highcharts: any;

  public optionsPlot: any;

  constructor(public chartFactory: HighchartsFactory) { 
    this.callbackFn = this.callbackFn.bind(this);
    this.Highcharts = this.chartFactory.Highcharts;

  }

  ngOnInit() {
    this.optionsPlot = this._createPlotOption();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.data && changes.data.currentValue) {
      // this.timeStamp = changes.data.currentValue['timestamp'] || '';
      const rawData = changes.data.currentValue['data'] || changes.data.currentValue || [];
      this.plotDataCollection = this._formatPlotData(rawData);

      if (this.chart) {
        this._drawPlot(this.plotDataCollection);
        this._setTitle();
      }
    }

    if (changes.selectedPeriod && changes.selectedPeriod.isFirstChange() === false && this.chart && this.plotType !== 'basic') {
      this._changeRange(this.selectedPeriod);
    } 
  }

  public callbackFn(chart: any): void {
    this.chart = chart;

    if (this.plotDataCollection) {
      this._drawPlot(this.plotDataCollection);
      this._setTitle();
    }

    setTimeout(() => {
      this.chart.reflow();
    }, 100);
  }






  // Utility ----------------------------------------------
  private _formatPlotData(data: any[]) {
    const dataCollection: any = {};

    if (data && data.length && data.length > 0) {
      data.forEach(element => {
        let index;
        if (this.plotType === 'stock') {
          index = (new Date(element['Date'])).getTime();
        } else {
          index = element['DaysToDelivery'];
        }
        Object.keys(element).filter(key => key !== 'Date').forEach(key => {
          if (key !== 'index' && key !== 'DaysToDelivery') {
            if (dataCollection[key] === undefined) {
              dataCollection[key] = {name: key, data: [], type: this.mode};
            }
            let dataPoint;
            if (element[key] === '' || element[key] === undefined) {
              dataPoint = [index, null];
            } else {
              dataPoint = [index, element[key]];
            }
            dataCollection[key].data.push(dataPoint);
          }
        });
      });
    }

    return Object.keys(dataCollection).map(key => dataCollection[key]);
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

  private _setTitle() {
    this.chart.setTitle({
      text: this.title.toUpperCase()
    });

    if (this.data['close'] !== undefined || this.data['prior'] !== undefined) {
      const change = (this.data['close'] - this.data['prior']).toFixed(2);
      const subtitle = `Close: ${this.data['close'].toFixed(2)}, Prev: ${this.data['prior'].toFixed(2)}, Change: ${change}`;
      this.chart.setSubtitle({
        text: subtitle
      });
    }
  }




  private _createPlotOption() {

    const plotType = this.plotType;
    return {
      // subtitle: { text: (this.dataPath ? this.dataPath.displayName : '') + ' Simulated Returns' },
      // title : { text : this.title + ' ' + this.displayPropety},
      chart: {
        zooming:{
          type: 'xy'
        },
        animation: false,
      },
      colors: ['#2f7ed8', '#bd37b6', '#8bbc21', '#c70000', '#1aadce',
        '#864acf', '#f28f43', '#77a1e5', '#c42525', '#a6c96a'],
      xAxis: {
        gridLineWidth: 0.5
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
        split: false,
        formatter: function() {

          if (this.points) {
            if (plotType === 'stock') {
              return this.points.reduce(function(s, point) {
                  return s + '<br /><span style="color:' + point.color + '">\u25CF</span> ' + point.series.name + ': ' + point.y.toLocaleString(undefined, {maximumFractionDigits: 3});
              }, '<b>' + new Date(this.x).toLocaleDateString('en-US', { timeZone: 'UTC'}) + '</b>');
            } else {
              return this.points.reduce(function(s, point) {
                  return s + '<br /><span style="color:' + point.color + '">\u25CF</span> ' + point.series.name + ': ' + point.y.toLocaleString(undefined, {maximumFractionDigits: 3});
              }, '<b>' + 'DaysToDelivery: ' + this.x + '</b>');
            }
          } else if (this.point) {
            return `
              <b>${new Date(this.x).toLocaleDateString('en-US', { timeZone: 'UTC'})}</b>
              <br/>
              <span style="color:'${this.point.color}'">\u25CF</span> ${this.point.series.name}: ${this.point.y.toLocaleString(undefined, {maximumFractionDigits: 3})}
            `;
          }
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
            includeInCSVExport: false
          },
          height: 80,
          enabled: this.plotType === 'stock' ? true : false,
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
        },
        scatter: {
          marker: {
            radius: 3
          },
          opacity: 0.7
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
        selected: 1
      },
    }
  }

  private _changeRange(selectedPeriod: string) {
    const targetIndex =  this.rangeButtonCollection.indexOf(selectedPeriod);
    this.chart.rangeSelector.buttons[targetIndex].element.onclick();
  }
}
