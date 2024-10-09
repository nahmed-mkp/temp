import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as Highcharts from 'highcharts';

import * as fromModels from '../../models';

@Component({
  selector: 'app-risk-span-plot-viewer',
  templateUrl: './risk-span-plot-viewer.component.html',
  styleUrls: ['./risk-span-plot-viewer.component.scss']
})
export class RiskSpanPlotViewerComponent implements OnInit, OnChanges {

  @Input() plotRawData: fromModels.PlotObject;
  @Input() targetSeries: string[];
  @Input() viewMode: string;

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
      enabled: false,
      align: 'left',
      layout: 'horizontal',
      verticalAlign: 'bottom',
      maxHeight: 60
    },
    navigator: {
      series: {
        includeInCSVExport: false
      },
      height: 80,
    },
    credits: {
      enabled: false
    },
    plotOptions: {
      series: {
        showInNavigator: true
      }
    },
    xAxis: {
      labels: {
        format: '{value}'
      },
      type: 'category',
    },
    tooltip: {
      headerFormat: '<span style="font-size: 12px">{point.key}</span><br/>',
      shared: true,
      valueDecimals: 3
    }
  }

  constructor() {
    this.callbackFn = this.callbackFn.bind(this);
  }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges) {

    if(changes.plotRawData && changes.plotRawData.currentValue && this.chart) {
      this.createPlot(changes.plotRawData.currentValue);
    }

    if(changes.targetSeries && changes.targetSeries.currentValue && this.chart) {
      this.chart.series.forEach(series => series.hide());
      this.chart.series.forEach(series => {
        if(this.targetSeries.indexOf(series.name) !== -1) series.show();
      })
      // const targetSeriesPlotObject = this.chart.series.filter(series => this.targetSeries.indexOf(series.name) === -1)
      // targetSeriesPlotObject.forEach(series => {
      //   series.hide();
      // });
    }

    if(changes.viewMode && changes.viewMode.currentValue && this.chart) {
      this.chart.reflow();
    }
  }

  public callbackFn(chart) {
    this.chart = chart;
    if(this.plotRawData) {
      this.createPlot(this.plotRawData);
    }
  }

  // Utility -----------------------------------------------------\

  formatData(plotRawData: fromModels.PlotObject) {
    const categories: any = {}

    const plotData = plotRawData.plot.map(plotData => {
      const seriesData = {name: '', data: undefined};
      seriesData.name = plotData.series.name;
      seriesData.data = plotData.series.data.map(item => {

        if(categories[item[0]] === undefined) categories[item[0]] = true;
        return {
          name: item[0],
          y: item[1]
        }
      });
      return seriesData
    });

    const categoriesSorted = Object.keys(categories).sort((a,b) => {
      return parseFloat(a.split('~')[0]) - parseFloat(b.split('~')[0])
    })
    return {plotData, categoriesSorted}
  }

  drawPlot(plotData) {
    plotData.forEach(series => {
      this.chart.addSeries(series)
    })
  }

  createPlot(plotRawData) {
    const {plotData, categoriesSorted} = this.formatData(plotRawData);
      this.drawPlot(plotData);
      this.chart.xAxis[0].setCategories(categoriesSorted);
      this.chart.xAxis[0].update({
        visible: plotRawData.xAxisVisiblity
      })
      this.chart.setTitle({text: plotRawData.title}, {text: plotRawData.subTitle})
  }
}
