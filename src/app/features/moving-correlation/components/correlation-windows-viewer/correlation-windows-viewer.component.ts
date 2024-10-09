import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-correlation-windows-viewer',
  templateUrl: './correlation-windows-viewer.component.html',
  styleUrls: ['./correlation-windows-viewer.component.scss']
})
export class CorrelationWindowsViewerComponent implements OnInit, OnChanges {

  @Input() movingWindowsCorrelation: any[];
  @Input() correlationLoadingStatus: boolean;
  @Input() correlationLoadedStatus: boolean;
  @Input() correlationResponseError: string;

  private pendingTaskUntilChartReady: any[] = [];
  private plotData: any;

  public chartTitle: 'Moving Windows Correlations';
  public chart: any;
  public callback: any
  public Highcharts = Highcharts;

  public chartOptions = {
    chart: {
      zooming:{
        type: 'xy'
      }
    },
    series: [],
    scrollbar: {
      enabled: true
    },
    navigation: {
      buttonOptions: {
          enabled: true
      }
    },
    legend: {
      enabled: true,
      layout: 'proximate',
      align: 'right',
      floating: true,
    },


    title: {
      text: 'Moving Windows Correlations'
    },

    yAxis: {
      title: {
        text: "Value"
      },
      crosshair: true
    },
    xAxis: {
      crosshair: true,
      type: 'datetime',
      labels: {
        format: '{value:%m/%d/%y}',
        align: 'right',
        rotation: -30
      },
    },
    credits: {
      enabled: false
    },

    exporting: {
      csv: {
          dateFormat: '%m/%d/%Y'
      }
    },
  }

  constructor() {
    this.chartCallBack = this.chartCallBack.bind(this);
    this.drawTimeseries = this.drawTimeseries.bind(this);
  }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if(changes.movingWindowsCorrelation && changes.movingWindowsCorrelation.currentValue) {
      if(this.chart) this.drawTimeseries();
      else this.pendingTaskUntilChartReady.push(this.drawTimeseries); 
    }
  }

  drawTimeseries() {
    this.normalizePlotData();
    let keys = Object.keys(this.plotData);
    if(this.chart.series[0] !== undefined) {  
      while(this.chart.series.length > 0) {   //remove previous series           
        this.chart.series[0].remove(true);                 
      }
    }
    keys.forEach(key => {
      this.chart.addSeries(this.plotData[key]);
    });
  }

  normalizePlotData() {
    this.plotData = {};
    let keys = Object.keys(this.movingWindowsCorrelation[0]);
    keys.splice(keys.indexOf('Date'), 1);  // remove the 'Date' key and left only the security keys

    keys.forEach(key => {
        this.plotData[key] = {name: key, data: []}
    });

    this.movingWindowsCorrelation.forEach(item => {
      let dateTime = new Date(item['Date']).getTime();
      keys.forEach(key => {
        this.plotData[key].data.push([dateTime, item[key]])
      })
    });
  }

  // the chart is ready to be interact
  chartCallBack(chart) {
    this.chart = chart;
    this.pendingTaskUntilChartReady.forEach(task => task());
  }
}
