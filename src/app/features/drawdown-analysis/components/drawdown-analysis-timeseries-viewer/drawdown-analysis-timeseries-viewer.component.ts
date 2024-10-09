import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import * as Highcharts from 'highcharts';

import * as fromModels from './../../models';

@Component({
  selector: 'app-drawdown-analysis-timeseries-viewer',
  templateUrl: './drawdown-analysis-timeseries-viewer.component.html',
  styleUrls: ['./drawdown-analysis-timeseries-viewer.component.scss']
})
export class DrawdownAnalysisTimeseriesViewerComponent implements OnInit, OnChanges {

  @Input() drawdownAnalysisTimeseries: fromModels.DrawDownTimeSeriesResponse[]; 
  @Input() drawdownAnalysisTableItems: fromModels.DrawDownAnalysisResponse[];
  @Input() drawdownAnalysisTimeseriesLoadingStatus: boolean;
  @Input() drawdownAnalysisTimeseriesLoadedStatus: boolean;
  @Input() chartTitle: string;
  @Input() drawdownAnalysisItemSelected: fromModels.DrawDownAnalysisResponse;

  @Output() pointedSelected = new EventEmitter();

  private pendingTaskUntilChartReady: any[] = [];
  private currentActivePlotBandID: string;
  private currentPlotBandIDs: string[] = [];


  //@ViewChild('chart')
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
      enabled: false
    },


    title: {
      text: 'Drawdown Analysis'
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


    plotOptions: {
      series: {
          allowPointSelect: true,
          point: {
            events: {
              select: point => {
                this.pointedSelected.emit({date: point.target.x, value: point.target.y});
              }
            }
          }
      }
    },

    exporting: {
      csv: {
        dateFormat: '%m/%d/%Y'
      }
    },
  };
  public lineData: {data: any[]; name: string} = {data: [], name: undefined}; 

  constructor() {
    this.chartCallBack = this.chartCallBack.bind(this);
    this.drawTimeSeries = this.drawTimeSeries.bind(this);
  }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges) {

    if(changes.drawdownAnalysisTimeseries && changes.drawdownAnalysisTimeseries.currentValue) {
      if(this.chart) {
        this.drawTimeSeries();
        if(this.drawdownAnalysisTableItems) this.plotBand();
      }
      else this.pendingTaskUntilChartReady.push(this.drawTimeSeries);
    }

    if(changes.chartTitle) {
      if(this.chart) this.setChartTitle()
      else this.pendingTaskUntilChartReady.push(this.setChartTitle.bind(this));
    }

    if(changes.drawdownAnalysisTableItems && changes.drawdownAnalysisTableItems.currentValue) {
      if(this.chart) this.plotBand();
      else this.pendingTaskUntilChartReady.push(this.plotBand.bind(this));
    }

    if(changes.drawdownAnalysisItemSelected && changes.drawdownAnalysisItemSelected.currentValue) {
      if(this.currentActivePlotBandID) this.chart.xAxis[0].removePlotBand(this.currentActivePlotBandID);
      const startDate = new Date(changes.drawdownAnalysisItemSelected.currentValue.drawdown_start);
      const endDate = new Date(changes.drawdownAnalysisItemSelected.currentValue.drawdown_end);
      const bandId =  `${changes.drawdownAnalysisItemSelected.currentValue.drawdown_start}:${changes.drawdownAnalysisItemSelected.currentValue.drawdown_end}`;
      this.chart.xAxis[0].addPlotBand({
        from: startDate.getTime(),
        to: endDate.getTime(),
        color: '#b7e4ff4d',
        id: bandId+'+'
      });
      this.currentActivePlotBandID = bandId+'+';
    }
  }

  // Set Chart Title
  setChartTitle() {
    this.chart.setTitle({text: this.chartTitle + ' Drawdown Analysis'});
  }

  //Plot chart bands for each drawdown period
  plotBand() {
    let bandSections = [];
    this.drawdownAnalysisTableItems.forEach(analysisItem => {
      const startDate = new Date(analysisItem.drawdown_start);
      const endDate = new Date(analysisItem.drawdown_end);

      this.chart.xAxis[0].addPlotBand({
        from: startDate.getTime(),
        to: endDate.getTime(),
        color: '#e7e7e7',
        id: `${analysisItem.drawdown_start}:${analysisItem.drawdown_end}` 
      })
      this.currentPlotBandIDs.push(`${analysisItem.drawdown_start}:${analysisItem.drawdown_end}`);
    });    
  }

  //Draw time series once getting the data and clean existing plot bands
  drawTimeSeries() {
    this.lineData.data = this.drawdownAnalysisTimeseries.map(datapoint => {
      let dateTime = new Date(datapoint.Date);
      return [dateTime.getTime(), datapoint.Value]
    });
    this.lineData.name = this.chartTitle;

    if(this.chart.series[0] !== undefined) this.chart.series[0].setData(this.lineData.data)
    else this.chart.addSeries(this.lineData);

    this.chart.xAxis[0].removePlotBand(this.currentActivePlotBandID);
    this.currentPlotBandIDs.forEach(id => this.chart.xAxis[0].removePlotBand(id))
    this.currentActivePlotBandID = undefined;
    this.currentPlotBandIDs = [];
  }
  
  // the chart is ready to be interact
  chartCallBack(chart) {
    this.chart = chart;
    this.pendingTaskUntilChartReady.forEach(task => task());
  }
}