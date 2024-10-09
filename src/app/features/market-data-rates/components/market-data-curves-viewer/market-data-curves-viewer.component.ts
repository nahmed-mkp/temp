import { Component, OnInit, Input, OnChanges, SimpleChanges, ElementRef } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-market-data-curves-viewer',
  templateUrl: './market-data-curves-viewer.component.html',
  styleUrls: ['./market-data-curves-viewer.component.scss']
})
export class MarketDataCurvesViewerComponent implements OnInit, OnChanges {

  @Input() rawData: any;
  @Input() loading: boolean;

  private timeStamp: string;
  private plotDataCollection: any[];
  private title: string;
  private chart: any;

  public optionsPlot: any;

  constructor( private dom: ElementRef) {
    this.callbackFn = this.callbackFn.bind(this);
    this._setDateRangeDynamically = this._setDateRangeDynamically.bind(this);
  }

  ngOnInit() {
    this.optionsPlot = this._createPlotOption();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.rawData && changes.rawData.currentValue) {
      this.timeStamp = changes.rawData.currentValue['timestamp'] || '';
      this.plotDataCollection = this._formatPlotData(changes.rawData.currentValue['data'] || []);
      this.title = changes.rawData.currentValue['title'];

      if (this.chart) {
        this._drawPlot(this.plotDataCollection);
        this._setTitle();
      }

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
    data.forEach(element => {
      const time = (new Date(element['Date'])).getTime();
      Object.keys(element).filter(key => key !== 'Date').forEach(key => {
        if (dataCollection[key] === undefined) {
          dataCollection[key] = {name: key, data: []};
        }
        const dataPoint = [time, element[key]];
        dataCollection[key].data.push(dataPoint);
      });
    });
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
    this.chart.setSubtitle({
      text: this.timeStamp
    });
  }

  private _createPlotOption() {

    let context = this;
    return {
      // subtitle: { text: (this.dataPath ? this.dataPath.displayName : '') + ' Simulated Returns' },
      // title : { text : this.title + ' ' + this.displayPropety},
      chart: {
        zooming:{
          type: 'xy'
        }
      },
      colors: ['#2f7ed8', '#0d233a', '#8bbc21', '#910000', '#1aadce',
        '#492970', '#f28f43', '#77a1e5', '#c42525', '#a6c96a'],
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
          return this.points.reduce(function(s, point) {
              return s + '<br /><span style="color:' + point.color + '">\u25CF</span> ' + point.series.name + ': ' + point.y.toFixed(0).toLocaleString();
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
            includeInCSVExport: false
          },
          height: 80,
          enabled: true,
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
        allButtonsEnabled: true,
        selected: 5,
        buttons: [{
          type: 'month',
          text: '1m',
          events: {
            click: function(params: PointerEvent) {
              // alert('Clicked button 1m');
              context._setDateRangeDynamically('1m');
            }
          }
        }, {
          type: 'month',
          text: '3m',
          events: {
            click: function(params: PointerEvent) {
              context._setDateRangeDynamically('3m');
            }
          }
        }, {
          type: 'month',
          text: '6m',
          events: {
            click: function(params: PointerEvent) {
              context._setDateRangeDynamically('6m');
            }
          }
        }, {
          type: 'year',
          text: '1y',
          events: {
            click: function(params: PointerEvent) {
              context._setDateRangeDynamically('1y');
            }
          }
        }, {
          type: 'year',
          text: '3y',
          events: {
            click: function(params: PointerEvent) {
              context._setDateRangeDynamically('3y');
            }
          }
        }, {
          type: 'all',
          text: 'All'
        }]
      },
    }
  }

  private _setDateRangeDynamically(type: string) {

    const beginningTime = this.chart.xAxis[0].min;
    const beginningDate = moment(beginningTime);
    if (type === '1m') {
      const targetEndDate = beginningDate.add(1, 'M');
      this.chart.xAxis[0].setExtremes(beginningDate.valueOf(), targetEndDate.valueOf());
      this._highlightDateRangeButton('1m');
    } else if (type === '3m') {
      const targetEndDate = beginningDate.add(3, 'M');
      this.chart.xAxis[0].setExtremes(beginningDate.valueOf(), targetEndDate.valueOf());
      this._highlightDateRangeButton('3m');
    } else if (type === '6m') {
      const targetEndDate = beginningDate.add(6, 'M');
      this.chart.xAxis[0].setExtremes(beginningDate.valueOf(), targetEndDate.valueOf());
      this._highlightDateRangeButton('6m');
    } else if (type === '1y') {
      const targetEndDate = beginningDate.add(1, 'years');
      this.chart.xAxis[0].setExtremes(beginningDate.valueOf(), targetEndDate.valueOf());
      this._highlightDateRangeButton('1y');
    } else if (type === '3y') {
      const targetEndDate = beginningDate.add(3, 'years');
      this.chart.xAxis[0].setExtremes(beginningDate.valueOf(), targetEndDate.valueOf());
      this._highlightDateRangeButton('3y');
    }
  }

  private _highlightDateRangeButton(duration: string) {
    const durationCollection = ['1m', '3m', '6m', '1y', '3y'];
    const targetParent = this.dom.nativeElement.querySelector('.highcharts-range-selector-buttons');
    const targetElements = targetParent.querySelectorAll('.highcharts-button');
    const targetIndex = durationCollection.indexOf(duration);
    targetElements.forEach((element, index) => {
      if (index === targetIndex) {
        element.classList.add('highcharts-button-pressed-force');
      } else {
        element.classList.remove('highcharts-button-pressed-force');
      }
    })



  }

}

