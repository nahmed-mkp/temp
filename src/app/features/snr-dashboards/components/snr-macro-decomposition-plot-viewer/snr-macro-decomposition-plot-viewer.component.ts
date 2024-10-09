import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as Highcharts from 'highcharts';

import * as moment from 'moment';
import * as highcharts from 'highcharts';

@Component({
  selector: 'app-snr-macro-decomposition-plot-viewer',
  templateUrl: './snr-macro-decomposition-plot-viewer.component.html',
  styleUrls: ['./snr-macro-decomposition-plot-viewer.component.scss']
})
export class SnrMacroDecompositionPlotViewerComponent implements OnInit, OnChanges {

  @Input() plotRawData: any;
  @Input() loading: boolean;
  @Input() loaded: boolean;
  @Input() mode: 'month' | 'quarter';

  public chart: any;
  public Highcharts = Highcharts;
  public optionsPlot = {
    chart: {
      zooming:{
        type: 'xy'
      },
      animation: false,
      events: {
        load: params => {          
          setTimeout(() => params.target.reflow()) ;
        }
      }
    },
    colors: ['#2780eb', '#00c0c7', '#5144d3', '#e8871a', '#da3490', '#9089fa', '#47e26f', ],
    legend: {
      enabled: true,
      layout: 'horizontal',
      verticalAlign: 'bottom',
      maxHeight: 60
    },
    
    navigator: {
      series: {
        includeInCSVExport: false
      },
      height: 20,
    },
    credits: {
      enabled: false
    },
    plotOptions: {
      series: {
        showInNavigator: true,
        fillOpacity: 1,
        stacking: 'normal'
      },
      area: {
        fillOpacity: 1
      },
    },
    scrollbar: {
      enabled: true
    },
    xAxis: {
      type: 'datetime',
      min: new Date(1970, 3, 31),  
      gridLineWidth: 0.5,
      startAtTick: true,
      endAtTick: true,
      labels: {
        formatter: function () {
          var dateObj: Date = new Date(this.value + new Date().getTimezoneOffset() * 60 * 1000);
          // This is done to handle timezones when picking up quarters
          dateObj.setDate(dateObj.getDate() - 2);

          return highcharts.dateFormat('%srM', dateObj.getTime());
        }
      },
      tickInterval: (24 * 3600 * 1000) * 3 * 30
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
            return s + '<br /><span style="color:' + point.color + '">\u25CF</span> ' + point.series.name + ': ' + point.y.toLocaleString('en-US', {maximumFractionDigits: 3, minimumFractionDigits: 3});
        }, '<b>' + highcharts.dateFormat('%srM', this.x) + '</b>');
      }
    },
  };

  private formattedData: any[];

  constructor() {
    this.callbackFn = this.callbackFn.bind(this);
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.plotRawData && changes.plotRawData.currentValue) {
      this.formattedData = this.plotRawData.data && this._formatPlotData(this.plotRawData.data, this.plotRawData.plotTypes);
      if (this.chart) {
        this._drawPlot(this.formattedData);
      }
    }
  }

  public callbackFn(chart) {
    this.chart = chart;
    if (this.formattedData) {
      this._drawPlot(this.formattedData);
    }
  }

  // Utility --------------------------------------------------

  private _formatPlotData(data: any, plotTypes: any) {
    const dataCollection: any = {};
    data.forEach(element => {
      const time = element['DateValue'];
      Object.keys(element).filter(key => key !== 'Date' && key !== 'DateValue' && key !== 'DateValueAsDate').forEach(key => {
        
        if (dataCollection[key] === undefined) {

          let series = {
            name: key,
            data: [],
            type: plotTypes[key]
          };

          if (plotTypes[key] === 'line') {
            series = Object.assign({}, series, {'zIndex': 100});
            series = Object.assign({}, series, {'color': 'black'});
          }
          dataCollection[key] = series;        
        }

        const actualDataPoint = element[key] === '' ? null : element[key];
        const dataPoint = { x: time, y: actualDataPoint, dateLabel: element['DateValueAsDate'], origDateLabel: element['Date']};
        dataCollection[key].data.push(dataPoint);
      });
    });
    return Object.keys(dataCollection).map(key => dataCollection[key]);
  }


  private _drawPlot(plotData) {
    plotData.map((series, idx) => {
      const originSeries = {...series};
      this.chart.addSeries(originSeries);
    });

    this.chart.setTitle({ text: `${this.plotRawData.fileType}` }, { text: `${this.plotRawData.country} | Created On: ${this.plotRawData.creationTs}`});

    this.chart.reflow();

    setTimeout(() => this._setDateRangeDynamically(), 100);
  }

  private _setDateRangeDynamically() {
    const toDate = new Date();
    toDate.setFullYear(toDate.getFullYear() + 1);
    const fromDate = new Date();
    fromDate.setFullYear(fromDate.getFullYear() - 2);
    this.chart.xAxis[0].setExtremes(fromDate.getTime(), toDate.getTime());
  }

}
