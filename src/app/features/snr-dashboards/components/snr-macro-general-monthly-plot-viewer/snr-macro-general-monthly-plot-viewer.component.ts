import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-snr-macro-general-monthly-plot-viewer',
  templateUrl: './snr-macro-general-monthly-plot-viewer.component.html',
  styleUrls: ['./snr-macro-general-monthly-plot-viewer.component.scss']
})
export class SnrMacroGeneralMonthlyPlotViewerComponent implements OnInit, OnChanges {

  @Input() plotRawData: any;
  @Input() loading: boolean;
  @Input() loaded: boolean;

  public chart: any;
  public optionsPlot = {
    chart: {
      zoomType: 'xy',
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
      min: new Date(1970, 9, 30),      
      labels: {
        formatter: function() {
          const dateObj: Date = new Date(this.value);
          const month = dateObj.getUTCMonth() + 1;
          const year = dateObj.getUTCFullYear();
          if (this.tickPositionInfo.unitName === 'year') {
            return year;
          } else if (this.tickPositionInfo.unitName === 'month') {
            return dateObj.getUTCFullYear() + 'M' + month;
          }
        }
      }, 
      tickInterval: (24 * 3600 * 1000) * 1 * 30
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
        }, '<b>' + new Date(this.x).toLocaleDateString('en-US', { timeZone: 'UTC'}) + '</b>');
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
      Object.keys(element).filter(key => key !== 'Date' && key !== 'DateValue').forEach(key => {
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
    // let printChart = false;
    // let clearYAxis = true;
    plotData.forEach(series => {
      const originSeries = {...series};
      // if (series.yAxis !== undefined) {
      //   if (clearYAxis) {
      //     this.chart.options.yAxis = [];
      //     clearYAxis = false;
      //   }
      //   // this.chart.options.yAxis.push({
      //   //   opposite: true,
      //   //   visible: true,
      //   //   id: `${series.name}-${series.yAxis}`,
      //   //   title: {text: series.name}
      //   // });
      //   printChart = true;
      // }
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
