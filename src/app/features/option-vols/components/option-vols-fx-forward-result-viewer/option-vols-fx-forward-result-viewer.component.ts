import { Component, OnInit, Input } from '@angular/core';
import * as Highcharts from 'highcharts/highstock';

@Component({
  selector: 'app-option-vols-fx-forward-result-viewer',
  templateUrl: './option-vols-fx-forward-result-viewer.component.html',
  styleUrls: ['./option-vols-fx-forward-result-viewer.component.scss']
})
export class OptionVolsFxForwardResultViewerComponent implements OnInit {

  @Input() result;

  public formattedData: any[];
  public optionsPlot: any;
  public chart: any;
  public Highcharts = Highcharts;

  constructor() {
    this.callbackFn = this.callbackFn.bind(this);
  }

  ngOnInit() {
    if (this.result.fwdPoints && this.result.fwdPoints.length > 0) {
      this.formattedData = this.result.fwdPoints.map(item => {
        return [
          (new Date(item[0])).getTime(),
          item[1]
        ];
      });
    }

    this.optionsPlot = {
      title: {text: `${this.result.ccyPair} Forward`},
      legend: {enable: false},
      navigator: {
        series: {
          includeInCSVExport: false
        },
        height: 40,
      },
      exporting: {
        csv: {
            dateFormat: '%Y-%m-%d'
        }
      },
      credits: {
          enabled: false
      },
      tooltip: {
        valueDecimals: 2
      }
    }

    if (this.chart) {
      this.drawPlot(this.formattedData);
    }
  }

  public callbackFn(chart: any): void {
    this.chart = chart;
    if (this.formattedData && this.formattedData.length > 0) {
      this.drawPlot(this.formattedData);
    }
  }

  private drawPlot(formattedData) {
    if (this.chart.series.length > 0) {
        this.chart.series[0].remove();
    }

    this.chart.addSeries({
        data: formattedData,
    });
  }

}
