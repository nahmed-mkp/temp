import { Component, OnInit, SimpleChanges, OnChanges, Input } from '@angular/core';
import { HighchartsFactory } from 'src/app/factories';

import * as fromModels from '../../models';

@Component({
  selector: 'app-client-solutions-fund-histogram-viewer',
  templateUrl: './client-solutions-fund-histogram-viewer.component.html',
  styleUrls: ['./client-solutions-fund-histogram-viewer.component.scss']
})
export class ClientSolutionsFundHistogramViewerComponent implements OnInit, OnChanges {

  @Input() histogram: fromModels.IHistogram[];
  @Input() loading: boolean;
  @Input() title: string;



  public chart: any;
  public optionsPlot;
  public Highcharts: any;
  private formattedData: any;

  constructor(public chartFactory: HighchartsFactory) { 
    this.callbackFn = this.callbackFn.bind(this);
    this.Highcharts = this.chartFactory.Highcharts;
  }

  ngOnInit() {
    this.optionsPlot = {
      series: []
    };
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.histogram && changes.histogram.currentValue && changes.histogram.currentValue.length && changes.histogram.currentValue.length > 0) {
      this.optionsPlot = this._createPlotOption(this.histogram);
      this.formattedData = this.getChartContent(this.histogram);
      if (this.chart) {
        this.chart.update(this.optionsPlot);

        this.chart.animation = false;
        while (this.chart.series.length > 0) {
          this.chart.series[0].remove();
        }
        
        this.chart.addSeries({
          name: `% monthly return`,
          data: this.formattedData.data,
          // type: 'column'
        });
        this._setTitle();
      }
    }
  }

  public callbackFn(chart: any): void {
    this.chart = chart;
  }

  private _createPlotOption(histogram: fromModels.IHistogram[]) {

    const content = this.getChartContent(histogram);
    return {
      chart: {
        // renderTo: 'container',
        type: 'column',
        options3d: {
            enabled: true,
            alpha: 10,
            beta: 10,
            depth: 100,
            viewDistance: 25
        }
      },
      // title: {
      //   text: `${this.fund ? this.fund.description : ''} Distribution of Returns`
      // },
      subtitle: {
        text: 'Percent Monthly Return'
      },
      xAxis: {
        categories: content.categories
      },
      // plotOptions: {
      //   column: {
      //       depth: 25
      //   }
      // },
      series: [{
        name: `% monthly return`,
        data: content.data,
        type: 'column'
      }],
      credits: {
        enabled: false
      },
    }
  }

  public getChartContent(histogram: fromModels.IHistogram[]): any {
    const result: any = { code: null, categories: [], data: [] };
    if (histogram) {
      histogram.map((item: fromModels.IHistogram) => {
        result.code = item.code;
        item.hist.map((bar: fromModels.IHistbar) => {
          const category: string = bar.lowerBound.toFixed(2).toString() + '-' + bar.upperBound.toFixed(2).toString();
          const data = bar.count;
          result.categories.push(category);
          result.data.push(data);
        });
      });
    }
    return result;
  }

  private _setTitle() {
    this.chart.setTitle({
      text: this.title + ' - Distribution of Returns'
    });
    this.chart.setSubtitle({
      text: 'Percent Monthly Return'
    })
  }

}
