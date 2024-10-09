import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-timeseries-statistics-range-cell-viewer',
  template: `
    <highcharts-chart 
      *ngIf="params.node.group === false"
      style="width: 100%; height: 100%; display: flex;" 
      [Highcharts]="Highcharts"
      [options]="optionsPlot || {}"
      [callbackFunction]="callbackFn">
    </highcharts-chart>
  `
})
export class TimeseriesStatisticsRangeCellViewerComponent implements ICellRendererAngularComp {

  public params: any;
  public Highcharts = Highcharts;

  private max: number;
  private min: number;
  private mean: number;
  private spot: number;
  private stdev: number;
  private chart: any;

  public optionsPlot = {
    chart: {
      type: 'columnrange',
      inverted: true,
      width: 200,
      height: 30,
      backgroundColor: 'transparent'
    },
    plotOptions: {
      series: {
        pointWidth: 20,
        animation: false,
        states: {
          hover: {
              enabled: false
          }
        }
      }
    },
    legend: {
      enabled: false,
    },
    exporting: {
      enabled: false
    },
    title:{
      text: null
    },
    credits: {
      enabled: false
    },
    xAxis: {
      visible: true,
      plotLines: [{
        color: '#d3d9de',
        value: 1,
        width: 2
      }],
      labels: {
        enabled: false
      }
    },
    yAxis: {
      visible: false,
      min: 0,
      max: 100
    },
    tooltip:{
      enabled: false
    }
  };

  constructor() {
    this.callbackFn = this.callbackFn.bind(this);
  }

  agInit(params: any): void {
    this.params = params;
    if (params.node.group === false) {
      this.max = params.max;
      this.min = params.min;
      this.mean = params.mean;
      this.spot = params.spot;
      this.stdev = params.stdev;
    }
  }

  refresh(): boolean {
    return false;
  }

  callbackFn(chart) {
    this.chart = chart;
    this.chart.update({yAxis: {
      min: this.min - (2 * this.stdev),
      max: this.max + (2 * this.stdev)
    }}, true, true);
    this.drawSeries()
  }

  drawSeries() {
    this.chart.addSeries({
      data: [{
        x: 1,
        low: this.min,
        high: this.max,
        color: '#7cb6ec'
      }]
    }, false, false);
    this.chart.addSeries({
      marker: {
        fillColor: '#FFC107',
        radius: 5
      },
      type: 'scatter',
      data: [[1, this.spot]]
    }, false, false);

    this.chart.addSeries({
      marker: {
        fillColor: '#ff000070',
        radius: 5,
        symbol: 'diamond'
      },
      type: 'scatter',
      data: [[1, this.mean]]
    });
  }

}
