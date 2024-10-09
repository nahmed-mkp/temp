import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { HighchartsFactory } from 'src/app/factories';

@Component({
  selector: 'app-rcpm-simulation-histogram-viewer',
  templateUrl: './rcpm-simulation-histogram-viewer.component.html',
  styleUrls: ['./rcpm-simulation-histogram-viewer.component.scss']
})
export class RcpmSimulationHistogramViewerComponent implements OnInit, OnChanges {

  @Input() data: any[];
  @Input() loading: boolean;
  @Input() showIsSymmetric: boolean;

  public chart: any;
  public IsSymmetricData: any = [];
  public nonSymmetricData: any = [];

  public Highcharts: any;
  public optionsPlot = {
    title: { text: ''},
    subtitle: { text: 'Histogram' },

    xAxis: [{
      title: { text: 'Data' },
      alignTicks: false,
      visible: false
    }, {
        title: { text: 'Histogram' },
        alignTicks: false,
        opposite: false,
        gridLineWidth: 1,
    }],

    yAxis: [{
      title: { text: 'Data' },
      opposite: false,
      visible: false
    }, {
        title: { text: 'Histogram' },
        opposite: false
    }],

    legend: {
        enabled: true,
        align: 'right',
        layout: 'vertical',
        verticalAlign: 'top',
        floating: true,
        y: 0,
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
            dateFormat: '%Y-%m-%d'
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
  };

  constructor(public chartFactory: HighchartsFactory) {
    this.callbackFn = this.callbackFn.bind(this);
    this.Highcharts = this.chartFactory.Highcharts;
  }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.data && changes.data.currentValue && changes.data.currentValue.length > 0) {
      this.nonSymmetricData = [];
      this.IsSymmetricData = [];
      this.data.forEach(element => {
        if (element.IsSymmetric === "True") {
          this.IsSymmetricData.push(parseInt(element.PnL, 10))
        } else {
          this.nonSymmetricData.push(parseInt(element.PnL, 10))
        }
      });

      if (this.chart) {
        this.drawPlot();
      }
      // console.log('format data', this.IsSymmetricData, this.nonSymmetricData);
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

    setTimeout(() => {
      this.chart.reflow();
    }, 100)
  }

  private drawPlot() {
    while (this.chart.series.length > 0) {
      this.chart.series[0].remove();
    }
    // this.chart.setTitle({
    //   text: this.timeseriesTitle
    // });

    this.chart.addSeries({
      data: this.IsSymmetricData,
      name: 'Symmetric True Raw',
      type: 'scatter',
      id: 's1',

      visible: false,
    });

    this.chart.addSeries({
      type: 'histogram',
      name: 'Symmetric True',
      baseSeries: 's1',
      xAxis: 1,
      yAxis: 1,
      color: '#9dc7f1'
    });

    this.chart.addSeries({
      data: this.nonSymmetricData,
      name: 'Symmetric False Raw',
      type: 'scatter',
      id: 's2',
      visible: false,
    });

    this.chart.addSeries({
      type: 'histogram',
      name: 'Symmetric False',
      baseSeries: 's2',
      xAxis: 1,
      yAxis: 1,
      color: '#727276'
    });

    this.toggleSymmetricSeries(true);
  }


  private toggleSymmetricSeries(mode) {

    const targetSeries = this.chart.series[1];

    if (targetSeries) {
      if (mode === true) {
        targetSeries.update({visible: true});
      } else {
        targetSeries.update({visible: false});
      }
    }
  }

}
