import { Component, OnInit, Input, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import * as Highcharts from 'highcharts';

import * as fromModels from './../../models';

@Component({
  selector: 'app-portfolio-analysis-timeseries-viewer',
  templateUrl: './portfolio-analysis-timeseries-viewer.component.html',
  styleUrls: ['./portfolio-analysis-timeseries-viewer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PortfolioAnalysisTimeseriesViewerComponent implements OnInit, OnChanges {

  @Input() portfolioAnalysisTimeseries: fromModels.PortfolioAnalysisTimeseriesPlot;
  @Input() portfolioAnalysisLoadingStatus: boolean;
  @Input() portfolioAnalysisLoadedStatus: boolean;
  @Input() portfolioAnalysisResponseError: string;

  private pendingTaskUntilChartReady: any[] = [];
  private plotDatas: any[];
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
    if(changes.portfolioAnalysisTimeseries && changes.portfolioAnalysisTimeseries.currentValue && changes.portfolioAnalysisTimeseries.currentValue.timeseries.length >1) {
      if(this.chart) this.drawTimeseries();
      else this.pendingTaskUntilChartReady.push(this.drawTimeseries); 
    }
  }

  drawTimeseries() {
    const date = this.portfolioAnalysisTimeseries.date;
    this.plotDatas = Object.assign(this.portfolioAnalysisTimeseries.timeseries);
    this.plotDatas.forEach(plotData => {
      plotData.data = plotData.value.map((item, index) => {
        let dateTime = new Date(date[index]).getTime();
        return [dateTime, parseFloat(item.toFixed(2))];
      })
      if(plotData.name !== 'total') plotData.visible = false;
      // delete plotData.value;
    });
    // console.log('plot data', this.plotDatas);

    if(this.chart.series[0] !== undefined) {  
      while(this.chart.series.length > 0) {   //remove previous series           
        this.chart.series[0].remove(true);                 
      }
    }

    this.plotDatas.forEach(plotData => this.chart.addSeries(plotData));
  }

  normalizePlotData() {

  }

  // the chart is ready to be interact
  chartCallBack(chart) {
    this.chart = chart;
    this.pendingTaskUntilChartReady.forEach(task => task());
  }
}
