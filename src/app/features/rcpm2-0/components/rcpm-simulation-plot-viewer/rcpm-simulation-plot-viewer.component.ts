import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

import * as noData from 'highcharts/modules/no-data-to-display';

import * as fromModels from './../../models/position.models';

import * as moment from 'moment';

@Component({
  selector: 'app-rcpm-simulation-plot-viewer',
  templateUrl: './rcpm-simulation-plot-viewer.component.html',
  styleUrls: ['./rcpm-simulation-plot-viewer.component.scss']
})
export class RcpmSimulationPlotViewerComponent implements OnInit, OnChanges {

  @Input() data: any[];
  @Input() loading: boolean;
  @Input() dataPath: fromModels.DataPath;
  @Input() showIsSymmetric: boolean;

  public chart: any;
  public IsSymmetricData: any = [];
  public nonSymmetricData: any = [];

  public optionsPlot = {
    subtitle: {},
    // title : { text : this.title + ' ' + this.displayPropety},
    xAxis: {
      gridLineWidth: 0
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
            return s + '<br /><span style="color:' + point.color + '">\u25CF</span> ' + point.series.name + ': ' + point.y.toFixed(0).toLocaleString();
        }, '<b>' + new Date(this.x).toLocaleDateString('en-US', { timeZone: 'UTC'}) + '</b>');
      }
    },
    lang: {
      noData: 'No Data'
    },
    legend: {
        enabled: false,
        align: 'right',
        layout: 'vertical',
        verticalAlign: 'top',
        floating: false,
        y: 100,
    },
    navigator: {
        series: {
          includeInCSVExport: false
        },
        height: 40,
        enabled: false,
    },
    exporting: {
      csv: {
        dateFormat: '%m/%d/%Y'
      }
    },
    credits: {
        enabled: false
    },
    plotOptions: {
      series: {
        showInNavigator: true
      }
    },
    stockTools: {
        gui: {
            enabled: true
        }
    },
    scrollbar: {
      height: 7
    },
    rangeSelector: {
      selected: 4
    },
  };


  constructor() {
    this.callbackFn = this.callbackFn.bind(this);
  }

  ngOnInit() {
    this.optionsPlot.subtitle = {text: (this.dataPath ? this.dataPath.displayName : '') + ' Simulated Returns'};
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.data && changes.data.currentValue && changes.data.currentValue.length > 0) {
      this.nonSymmetricData = [];
      this.IsSymmetricData = [];
      this.data.forEach(element => {
        if (element.IsSymmetric === 'True') {
          this.IsSymmetricData.push([
            (new Date(element.SimulationDate)).getTime(),
            element.PnL
          ]);
        } else {
          this.nonSymmetricData.push([
            (new Date(element.SimulationDate)).getTime(),
            element.PnL
          ]);
        }
      });

      if (this.chart) {
        this.drawPlot();
      }
      // console.log('format data', this.IsSymmetricData, this.nonSymmetricData);
    }

    if (changes.dataPath && changes.dataPath.currentValue && this.chart) {

      this.chart.setTitle(null, {
        text: this.dataPath.displayName + ' Simulated Returns'
      });
    }

    if (changes.showIsSymmetric && this.chart) {
      this.toggleSymmetricSeries(this.showIsSymmetric);
    }
  }

  public callbackFn(chart: any): void {
    this.chart = chart;
    if (this.IsSymmetricData && this.IsSymmetricData.length > 0 || 
      this.nonSymmetricData && this.nonSymmetricData.length > 0) {
      this.drawPlot();
    }

    if (this.dataPath) {
      this.chart.setTitle(null, {
        text: this.dataPath.displayName + ' Simulated Returns'
      });
    }

    setTimeout(() => {
      this.chart.reflow();
    }, 100);
  }

  private drawPlot() {

    while (this.chart.series.length > 0) {
      this.chart.series[0].remove();
    }

    this.chart.animation = false;

    // this.chart.setTitle({
    //   text: this.timeseriesTitle
    // });
    this.chart.addSeries({
      data: this.IsSymmetricData,
      type: 'area',
      name: 'Simulated Returns (Symmetrized)'
    });

    this.chart.addSeries({
      data: this.nonSymmetricData,
      type: 'area',
      name: 'Simulated Returns'
    });
  }

  private toggleSymmetricSeries(mode) {
    const targetSeries = this.chart.series[0];

    if (targetSeries) {
      if (mode === true) {
        targetSeries.update({visible: true});
      } else {
        targetSeries.update({visible: false});
      }
    }
  }

}
