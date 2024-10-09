import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-snr-macro-monthly-inflation-plot-viewer',
  templateUrl: './snr-macro-monthly-inflation-plot-viewer.component.html',
  styleUrls: ['./snr-macro-monthly-inflation-plot-viewer.component.scss']
})
export class SnrMacroMonthlyInflationPlotViewerComponent implements OnInit, OnChanges {

  @Input() plotRawData: any;
  @Input() loading: boolean;
  @Input() loaded: boolean;
  @Input() displayMode: any;

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
        fillOpacity: 0.05
      },
      height: 20,
      enabled: true,
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
      dateTimeLabelFormats: {
        month: '%e. %b',
      },
      gridLineWidth: 0.5,
    },
    // tooltip: {
    //   headerFormat: '<span style="font-size: 12px">{point.key}</span><br/>',
    //   shared: true,
    //   valueDecimals: 3
    // }
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
        }, '<b>' + new Date(this.x).toLocaleDateString(undefined, { timeZone: 'UTC'}) + '</b>');
      }
    },
  }

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
      this.formattedData = this.plotRawData.data && this._formatPlotData(this.plotRawData.data);
      // this.categoriesCollection = this._constructDateCategories(this.plotRawData.data);
      // console.log('this.formattedData', this.formattedData);
      if (this.chart) {
        this._drawPlot(this.formattedData);
      }
    }

    if (changes.displayMode && changes.displayMode.currentValue && changes.displayMode.firstChange === false) {
      // console.log('display mode change', this.displayMode);
      this.adjustSeriesVisbility();
    }
  }

  public callbackFn(chart) {
    this.chart = chart;
    if (this.formattedData) {
      this._drawPlot(this.formattedData);
    }
  }

  private _formatPlotData(data: any) {
    const dataCollection: any = {};
    data.forEach(element => {
      const time = element['DateValue'];
      Object.keys(element).filter(key => key !== 'Date' && key !== 'DateValue').forEach(key => {
        if (dataCollection[key] === undefined) {
          const formattedName = key.replace('pct', '%');
          dataCollection[key] = {name: key, data: []};
        }
        const acutalDataPoint = element[key] === '' ? null : element[key];
        const dataPoint = [time, acutalDataPoint];
        dataCollection[key].data.push(dataPoint);
        // dataCollection[key].data.push(acutalDataPoint);
      });
    });

    const finalResult = [];
    if (dataCollection[' 75pct Confidence Bands (upper)'] && dataCollection[' 75pct Confidence Bands (lower)']) {
      finalResult .push({
        name: '75% Confidence Bands',
        type: 'arearange',
        // color: '#ff4b4b',
        color: this.presetPlotColor[0],
        data: this._mergeConfidenceBandsPlot(
          dataCollection[' 75pct Confidence Bands (upper)'].data,
          dataCollection[' 75pct Confidence Bands (lower)'].data)
      })
    };

    if (dataCollection[' 50pct Confidence Bands (upper)'] && dataCollection[' 50pct Confidence Bands (lower)']) {
      finalResult .push({
        name: '50% Confidence Bands',
        type: 'arearange',
        // color: '#00c0c7',
        color: this.presetPlotColor[1],
        data: this._mergeConfidenceBandsPlot(
          dataCollection[' 50pct Confidence Bands (upper)'].data,
          dataCollection[' 50pct Confidence Bands (lower)'].data)
      });
    };

    if (dataCollection[' 25pct Confidence Bands (upper)'] && dataCollection[' 25pct Confidence Bands (lower)']) {
      finalResult .push({
        name: '25% Confidence Bands',
        type: 'arearange',
        // color: '#9089fa',
        color: this.presetPlotColor[2],
        data: this._mergeConfidenceBandsPlot(
          dataCollection[' 25pct Confidence Bands (upper)'].data,
          dataCollection[' 25pct Confidence Bands (lower)'].data)
      });
    };

    // if (dataCollection[' Actual and MKP model forecast']) {
    //   finalResult.push({...dataCollection[' Actual and MKP model forecast']});
    // }

    // if (dataCollection[' Consensus forecast']) {
    //   finalResult.push({...dataCollection[' Consensus forecast']});
    // }

    const nonPctConfidenceKey = Object.keys(dataCollection).filter(key => key.includes('pct') === false);
    nonPctConfidenceKey.forEach(key => {

      let style;
      if (key.toLowerCase().includes('mkp')) {
        style = {
          color: '#2647fc'
        };
      } else if (key.toLowerCase().includes('consensus')) {
        style = {
          color: '#8bc34a',
          dashStyle: 'ShortDash'
        }
      }
      finalResult.push({
        name: key,
        data: dataCollection[key].data,
        ...style
      });
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

    this.chart.setTitle({ text: this.plotRawData.country }, { text: `Created On: ${this.plotRawData.creationTs}`});

    setTimeout(() => this._setDateRangeDynamically(), 100);
  }

  private adjustSeriesVisbility() {
    const visibleList = Object.keys(this.displayMode).filter(key => this.displayMode[key]);
    this.chart.series.forEach(plot => {
      if (visibleList.some(name => plot.name.includes(name))) {
        plot.show();
      } else {
        plot.hide();
      }
    });
  }

  private _setDateRangeDynamically() {
    const toDate = new Date();
    toDate.setFullYear(toDate.getFullYear() + 1);
    const fromDate = new Date();
    fromDate.setFullYear(fromDate.getFullYear() - 2);
    this.chart.xAxis[0].setExtremes(fromDate.getTime(), toDate.getTime());
  }

}
