import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

import * as moment from 'moment';
import * as highcharts from 'highcharts';

@Component({
  selector: 'app-snr-macro-general-plot-viewer',
  templateUrl: './snr-macro-general-plot-viewer.component.html',
  styleUrls: ['./snr-macro-general-plot-viewer.component.scss']
})
export class SnrMacroGeneralPlotViewerComponent implements OnInit, OnChanges {

  @Input() plotRawData: any;
  @Input() loading: boolean;
  @Input() loaded: boolean;

  public chart: any;
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
      align: 'center',
      layout: 'horizontal',
      verticalAlign: 'bottom',
      maxHeight: 60
    },
    navigator: {
      series: {
        includeInCSVExport: false,
      },
      height: 40,
    },
    credits: {
      enabled: false
    },
    plotOptions: {
      series: {
        showInNavigator: true,
        fillOpacity: 1
      },
      area: {
        fillOpacity: 1
      }
    },
    scrollbar: {
      enabled: true
    },
    xAxis: {
      type: 'datetime',
      min: new Date(1970, 3, 31),      
      labels: {
        formatter: function() {
          var dateObj: Date = new Date(this.value) ;  
          
          // This is done to handle timezones when picking up quarters
          dateObj.setDate(dateObj.getDate() - 2);

          const month = dateObj.getUTCMonth() + 1;
          const year = dateObj.getUTCFullYear();
          if (this.tickPositionInfo.unitName === 'year') {
            return year;
          } else if (this.tickPositionInfo.unitName === 'month') {
            let quarterMark: string;
            if (month === 1 || month === 2 || month === 3) { 
              quarterMark = 'Q1';
            } else if (month === 4 || month === 5 || month === 6) { 
              quarterMark = 'Q2';
            } else if (month === 7 || month === 8 || month === 9) {
              quarterMark = 'Q3';
            } else if (month === 10 || month === 11 || month === 12) {
              quarterMark = 'Q4';
            } 
            return highcharts.dateFormat(quarterMark + ':' + year.toString(), this.value);
          }
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
        }, '<b>' + moment(new Date(this.x)).format('MM/DD/YYYY') + '</b>');

        
      }
    },
  };

  private formattedData: any[];
  private presetPlotColor = [
    '#00bcd45c',
    '#00bcd4c7',
    '#2196f3',
  ];

  constructor() {
    this.callbackFn = this.callbackFn.bind(this);
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.plotRawData && changes.plotRawData.currentValue) {
      const plotData = this.plotRawData.data;
      const plotTypes = this.plotRawData.plotTypes;
      const multipleAxes = this.plotRawData.multipleAxes || false;
      this.formattedData = this.plotRawData.data && this._formatPlotData(plotData, plotTypes, multipleAxes);
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

  private _formatPlotData(data: any, plotTypes: any, useMultipleAxes: boolean) {
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
        const acutalDataPoint = element[key] === '' ? null : element[key];
        const dataPoint = [time, acutalDataPoint];
        dataCollection[key].data.push(dataPoint);
      });
    });

    let finalResult = [];
    if (this.plotRawData.plotType === 'area') {
      finalResult = [
        {
          name: '75% Confidence Bands',
          type: 'arearange',
          color: this.presetPlotColor[0],
          data: this._mergeConfidenceBandsPlot(
            dataCollection['75pct Confidence Bands (upper)'].data,
            dataCollection['75pct Confidence Bands (lower)'].data)
        }, {
          name: '50% Confidence Bands',
          type: 'arearange',
          color: this.presetPlotColor[1],
          data: this._mergeConfidenceBandsPlot(
            dataCollection['50pct Confidence Bands (upper)'].data,
            dataCollection['50pct Confidence Bands (lower)'].data)
        }, {
          name: '25% Confidence Bands',
          type: 'arearange',
          color: this.presetPlotColor[2],
          data: this._mergeConfidenceBandsPlot(
            dataCollection['25pct Confidence Bands (upper)'].data,
            dataCollection['25pct Confidence Bands (lower)'].data)
        },
      ];
    }

    let yAxis = 0;
    const nonPctConfidenceKey = Object.keys(dataCollection).filter(key => key.includes('pct') === false);
    nonPctConfidenceKey.forEach(key => {

      let style = null;

      if (key.toLowerCase().includes('actual and model')) {
        style = {
          color: 'black'
        };
      }

      if (key.toLowerCase().includes('consensus')) {
        style = {
          color: 'black',
          dashStyle: 'ShortDash'
        };
      }

      let series = {
        name: key,
        data: dataCollection[key].data,
        type: dataCollection[key].type
      };

      if (style !== null) {
        series = Object.assign({}, series, style);
      }

      // if (useMultipleAxes && yAxis > 0) {
      //   series = Object.assign({}, series, { 'yAxis': yAxis, 'visible': true });
      // }

      yAxis += 1;

      finalResult.push(series);
    });
    return finalResult;
  }


  private _mergeConfidenceBandsPlot(lowerPlot, upperPlot) {
    const result = [];
    lowerPlot.forEach((dataPoint, index) => {
      const dateValue = dataPoint[0];
      const lowerBandValue = dataPoint[1];
      const upperBandValue = upperPlot[index][1];
      result.push([dateValue, lowerBandValue, upperBandValue]);
    });
    return result;
  }

  private _drawPlot(plotData) {
    plotData.forEach(series => {
      const originSeries = {...series};
      this.chart.addSeries(originSeries);
    });

    const fileType = this.plotRawData.fileType;
    let plotName;
    if (fileType.includes('{country}')) {
      plotName = fileType.split('{country}')[1];
    } else {
      plotName = fileType;
    }

    const subTitle = `${this.plotRawData.country} | Created On: ${this.plotRawData.creationTs}`;
    this.chart.setTitle({text: plotName}, {text: subTitle});

    if (this.plotRawData && this.plotRawData.minAxisValue !== undefined && this.plotRawData.maxAxisValue !== undefined) {
      this.chart.yAxis[0].update({
        startAtTick: false,
        endAtTick: false,
        tickPositioner: () => { 
          const minValue = Math.round(this.plotRawData.minAxisValue);
          const maxValue = Math.round(this.plotRawData.maxAxisValue);

          let interval = 1;

          if (maxValue - minValue < 4) { 
            interval = .2;            
          }
          if (maxValue - minValue > 10) { 
            interval = 2;
          }
          
          const result = [];
          for (let i = minValue; i <= maxValue;) {
            if (interval < 1) { 
              result.push(Math.round(i * 100) / 100)
            } else {
              result.push(i);
            }            
            i += interval; 
          }
          
          return result;
        }
      })      
    }

    this.chart.reflow();

    setTimeout(() => this._setDateRangeDynamically(this.plotRawData.lookback), 100);
  }

  private _setDateRangeDynamically(lookback) {
    const toDate = new Date();
    if (lookback <= 1) {
      toDate.setFullYear(toDate.getFullYear() + lookback);
    }
    const fromDate = new Date();
    fromDate.setFullYear(fromDate.getFullYear() - lookback);
    this.chart.xAxis[0].setExtremes(fromDate.getTime(), toDate.getTime());
  }

}
