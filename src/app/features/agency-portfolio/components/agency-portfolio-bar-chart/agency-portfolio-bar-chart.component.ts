import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as Highcharts from 'highcharts';

import * as fromModels from './../../models';

@Component({
  selector: 'app-agency-portfolio-bar-chart',
  templateUrl: './agency-portfolio-bar-chart.component.html',
  styleUrls: ['./agency-portfolio-bar-chart.component.scss']
})
export class AgencyPortfolioBarChartComponent implements OnInit, OnChanges {

  @Input() data: fromModels.Benchmark[];

  public sortMode = 'long';
  public Highcharts = Highcharts;
  private chart: any;

  public optionsPlot = {
    chart: {
      type: 'bar'
    },
    title: {
      text: 'Benchmark'
    },
    subtitle: {
      text: 'Long Vs Short'
    },
    plotOptions: {
      bar: {
        dataLabels: {
            enabled: true
        }
      }
    },
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'top',
      x: -40,
      y: 80,
      floating: true,
      borderWidth: 1,
      backgroundColor:
          Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
      shadow: true
    },
    xAxis: {
      type: 'category',
      title: {
          text: null
      },
      min: 0,
      max: 25,
      scrollbar: {
          enabled: true
      },
      tickLength: 0
    },
    scrollbar: {
      minWidth: 20
    },
    credits: {
      enabled: false
    },
  };

  constructor() {
    this.callbackFn = this.callbackFn.bind(this);
  }

  ngOnInit() {
    if (this.data && this.data.length > 0 && this.chart) { this.renderValue(); }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.data && changes.data.currentValue && this.chart) {
      this.renderValue();
    }
  }

  public callbackFn(chart) {
    this.chart = chart;
    if (this.data && this.data.length > 0) { this.renderValue(); }
  }

  onSortBy(mode) {
    this.sortMode = mode;
    this.renderValue();
  }

  // Uitility ------------------------------------------------------------------------------

  renderValue() {
    const statisticsFlat = this.dataStatisics();
    // const keys = Object.keys(statisticsFlat);

    const keys = statisticsFlat.map(item => item[0]);
    const currentLongs = statisticsFlat.map(item => item[1]);
    const currentShorts = statisticsFlat.map(item => item[2]);

    this.chart.xAxis[0].update({
      categories: keys
    });

    // Clean up previous render
    while (this.chart.series.length > 0) { this.chart.series[0].remove(true); }
    this.chart.addSeries({
      name: 'Current Long',
      data: currentLongs
    });
    this.chart.addSeries({
      name: 'Current Short',
      data: currentShorts
    });
    this.chart.redraw();
  }

  dataStatisics() {
    const statistics: {[benchmark: string]: any[]} = {};
    this.data.forEach(item => {

      const longValue = item.BMCurFaceLong ? item.BMCurFaceLong : 0;
      const shortValue = item.BMCurFaceShort ? item.BMCurFaceShort : 0;

      if (statistics[item.Benchmark] === undefined) {
        statistics[item.Benchmark] = [
          item.Benchmark,
          parseInt(longValue.toFixed(0), 10),
          -parseInt(shortValue.toFixed(0), 10)
        ];
      } else {
        statistics[item.Benchmark][1] += parseInt(longValue.toFixed(0), 10);
        statistics[item.Benchmark][2] += -parseInt(shortValue.toFixed(0), 10);
      }
    });
    // console.log('statistics', statistics);
    const statisticsFlat = Object.keys(statistics).map(key => statistics[key]);

    if (this.sortMode === 'long') {
      statisticsFlat.sort((a, b) => b[1] - a[1]);
    } else {
      statisticsFlat.sort((a, b) => b[2] - a[2]);
    }

    return statisticsFlat;
  }

}
