import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-equities-column-range-cell-viewer',
  templateUrl: './equities-column-range-cell-viewer.component.html',
  styleUrls: ['./equities-column-range-cell-viewer.component.scss']
})
export class EquitiesColumnRangeCellViewerComponent implements ICellRendererAngularComp {

  public params: any;
  public Highcharts = Highcharts;

  private max: number;
  private min: number;
  private previous: number;
  private spot: number;
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
      // plotLines: [{
      //   color: 'red',
      //   value: 1,
      //   width: 2
      // }]
    },
    tooltip: {
      enabled: false,
    }
  }

  constructor() {
    this.callbackFn = this.callbackFn.bind(this);
  }

  agInit(params: any): void {
    this.params = params;

    if (params.node.group === false) {
      const valueLocator = params.valueLocator;
      this.max = params.data[valueLocator + 'PercentileMax1M'];
      this.min = params.data[valueLocator + 'PercentileMin1M'];
      this.previous = params.data[valueLocator + 'Percentile1W'];
      this.spot = params.data[valueLocator + 'Percentile'];
      // this.max = Math.random()*100;
      // this.min = Math.random()*this.max;
      // this.spot = Math.random()*100;
      if (this.chart) {
        this.drawSeries();
      }
    }

  }

  callbackFn(chart) {
    this.chart = chart;
    if (this.spot) {
      this.drawSeries();
    }
  }

  drawSeries() {
    this.chart.addSeries({
      data: [{
        x: 1,
        low: this.min,
        high: this.max,
        color: '#7cb6ec'
        // color: {
        //   linearGradient: {
        //     x1: 0,
        //     x2: 0,
        //     y1: 0,
        //     y2: 1
        //   },
        //   stops: [
        //     [0, '#5bc0de'],
        //     [1, '#428bca']
        //   ]
        // }
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
      data: [[1, this.previous]]
    });
  }

  refresh(): boolean {
    return false;
  }

}
