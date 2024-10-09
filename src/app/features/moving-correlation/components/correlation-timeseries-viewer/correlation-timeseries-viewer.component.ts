import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-correlation-timeseries-viewer',
  templateUrl: './correlation-timeseries-viewer.component.html',
  styleUrls: ['./correlation-timeseries-viewer.component.scss']
})
export class CorrelationTimeseriesViewerComponent implements OnInit, OnChanges {

  @Input() correlationTimeseries: any[];
  @Input() correlationLoadingStatus: boolean;
  @Input() correlationLoadedStatus: boolean;
  @Input() correlationResponseError: string;

  private pendingTaskUntilChartReady: any[] = [];
  private plotData = {
    securityA: {name: '', data: [], yAxis: 0},
    securityB: {name: '', data: [], yAxis: 1}
  }

  public chartTitle: 'Securities Timeseries';
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
      text: 'Securities Timeseries'
    },

    yAxis: [{
      title: {
        text: "Value",
        style: {color: Highcharts.getOptions().colors[0]}
      },
      labels: {
        style: {color: Highcharts.getOptions().colors[0]}
      },
      crosshair: true
    },{
      title: {
        text: "Value",
        style: {color: Highcharts.getOptions().colors[1]}
      },
      labels: {
        style: {color: Highcharts.getOptions().colors[1]}
      },
      crosshair: true,
      opposite: true
    }],

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
    if(changes.correlationTimeseries && changes.correlationTimeseries.currentValue) {
      if(this.chart) this.drawTimeseries();
      else this.pendingTaskUntilChartReady.push(this.drawTimeseries); 
    }
  }

  drawTimeseries() {
    this.normalizePlotData();

    if(this.chart.series[0] !== undefined || this.chart.series[1] !== undefined) {  
      this.chart.series[0].remove(true);                  //overwrite previous series
      this.chart.series[0].remove(true);
      this.chart.addSeries(this.plotData.securityA);
      this.chart.addSeries(this.plotData.securityB);
    } else {
      this.chart.addSeries(this.plotData.securityA);
      this.chart.addSeries(this.plotData.securityB);
    }
  }

  normalizePlotData() {
    this.cleanPlotData();
    let keys = Object.keys(this.correlationTimeseries[0]);
    keys.splice(keys.indexOf('Date'),1);  // remove the 'Date' key and left only the security keys

    this.plotData.securityA.name = keys[0];
    this.plotData.securityB.name = keys[1];
    this.correlationTimeseries.forEach(item => {
      let dateTime = new Date(item['Date']).getTime();
      let securityA = item[keys[0]];
      let securityB = item[keys[1]];
      this.plotData.securityA.data.push([dateTime, securityA]);
      this.plotData.securityB.data.push([dateTime, securityB]);
    });
  }

  cleanPlotData() {
    this.plotData = {
      securityA: {name: '', data: [], yAxis: 0},
      securityB: {name: '', data: [], yAxis: 1}
    }
  }

  // the chart is ready to be interact
  chartCallBack(chart) {
    this.chart = chart;
    this.pendingTaskUntilChartReady.forEach(task => task());
  }
}
