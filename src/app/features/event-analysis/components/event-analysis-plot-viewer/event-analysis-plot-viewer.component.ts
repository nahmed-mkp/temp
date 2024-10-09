import { Component, OnInit, Input, Output, ChangeDetectionStrategy,
  EventEmitter, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';

  import * as fromModels from '../../models';
import * as moment from 'moment';

@Component({
  selector: 'app-event-analysis-plot-viewer',
  templateUrl: './event-analysis-plot-viewer.component.html',
  styleUrls: ['./event-analysis-plot-viewer.component.scss']
})
export class EventAnalysisPlotViewerComponent implements OnInit, OnChanges {

  @Input() data: any[];
  @Input() activeConfiguration: fromModels.Configuration;
  @Input() activeMarketDataLoadingStatus: boolean;
  @Input() activeTimeseriesAnalysisRecord: fromModels.TimeseriesAnalysis;
  @Input() displayMode: string;

  public show = true;
  public chartTitle = 'Timeseries plot';
  public chartSubtitle = 'Raw data Plot';
  public optionsPlot = {
    title : { text : this.chartTitle },
    subtitle: { text: this.chartSubtitle },
    rangeSelector: {
        selected: 4
    },
    chart: {
      animation: false,
    },
    // yAxis: this.getAxisLabels(data),
    legend: {
        enabled: true,
        align: 'bottom',
        layout: 'horizontal',
        verticalAlign: 'bottom'
    },
    tooltip: {
        crosshairs: true,
        dateTimeLabelFormats: '%B %A, %Y',
        pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b><br/>',
        valueDecimals: 2,
        split: false,
        formatter: function() {
            let result = '<b>' + moment(this.x).format('MMMM, DD, YYYY') + '</b><br/>';
            this.points.map((point) => {
                result += `<br/><b><span style="color:${point.series.color}">`
                + point.series.name + '</span></b>: ' + (parseFloat(point.y).toFixed(2));
            });
            return result;
        },
        shared: true
    },
    navigator: {
        series: {
            includeInCSVExport: false
        }
    },
    exporting: {
        csv: {
            dateFormat: '%Y-%m-%d'
        }
    },
    credits: {
        enabled: false
    }
  }
  public chart: any;

  constructor() {
      this.callbackFn = this.callbackFn.bind(this);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data && changes.data.currentValue && changes.data.currentValue.length > 0 && this.chart) {
        this.render();
    }

    // Reseting the time ranage to match the new configuration if there is change in time
    if (changes.activeConfiguration && changes.activeConfiguration.currentValue) {


      const currentStartDate = new Date(changes.activeConfiguration.currentValue.startDate);
      const currentEndDate = new Date(changes.activeConfiguration.currentValue.endDate);

      if (changes.activeConfiguration.previousValue !== undefined) {
        const preStartDate = new Date(changes.activeConfiguration.previousValue.startDate);
        const preEndDate = new Date(changes.activeConfiguration.previousValue.endDate);

        if (preStartDate !== currentStartDate || preEndDate !== currentEndDate) {
          setTimeout(() => {
            this.chart.xAxis[0].setExtremes(
              Date.UTC(currentStartDate.getFullYear(), currentStartDate.getMonth(), currentStartDate.getDate()),
              Date.UTC(currentEndDate.getFullYear(), currentEndDate.getMonth(), currentEndDate.getDate()), true);
          });
        }
      }
    }

    //clean up
    if (changes.activeConfiguration && changes.activeConfiguration.currentValue === undefined && this.chart) {
        this.chart = undefined;
    }

    if(changes.activeTimeseriesAnalysisRecord && changes.activeTimeseriesAnalysisRecord.currentValue && this.chart) {
        this.chart.setTitle({text: this.activeTimeseriesAnalysisRecord.name});
    }

    if(changes.displayMode) {
        this.show = false;
        setTimeout(() => this.show = true);
    }
  }

  ngOnInit() {}

//   private plotChart(data: any[]): void {
//     if (this.data) {
//       this.optionsPlot = {
//           title : { text : this.chartTitle },
//           subtitle: { text: this.chartSubtitle },
//           rangeSelector: {
//               selected: 4
//           },
//           yAxis: this.getAxisLabels(data),
//           legend: {
//               enabled: true,
//               align: 'bottom',
//               layout: 'horizontal',
//               verticalAlign: 'bottom'
//           },
//           tooltip: {
//               crosshairs: true,
//               dateTimeLabelFormats: '%B %A, %Y',
//               pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b><br/>',
//               valueDecimals: 2,
//               split: false,
//               formatter: function() {
//                   let result = '<b>' + moment(this.x).format('MMMM, DD, YYYY') + '</b><br/>';
//                   this.points.map((point) => {
//                       result += `<br/><b><span style="color:${point.series.color}">`
//                         + point.series.name + '</span></b>: ' + (parseFloat(point.y).toFixed(2));
//                   });
//                   return result;
//               },
//               shared: true
//           },
//           navigator: {
//               series: {
//                   includeInCSVExport: false
//               }
//           },
//           exporting: {
//               csv: {
//                   dateFormat: '%Y-%m-%d'
//               }
//           },
//         //   series: this.applyAxis(data),
//         series: this.data
//       };
//     }
//   }

  private getAxisLabels(data: any[]): any[] {
      const customAxis = [];
        data.forEach((series, idx) => {
          if(series.customAxis) {
            customAxis.push({
                id: idx+'event-analysis',
                title: { text: series.name.toUpperCase() },
                lineWidth: 2,
                visible: series.customAxis,
                opposite: true,
            })
          }
      });
      return customAxis;
  }

  private render() {
    while(this.chart.series.length > 0) this.chart.series[0].remove(true);
    if(this.chart.yAxis.length > 2) {
        const yAxisNeedToBeDeleted = this.chart.yAxis.filter(axis => {
            if(axis.userOptions.id) return axis.userOptions.id.includes('event-analysis');
            else return false;
        })
        yAxisNeedToBeDeleted.forEach(axis => axis.remove(true));
    }

    const dataWithAxis = this.applyAxis(this.data);
    const customAxis = this.getAxisLabels(this.data);

    customAxis.forEach(axis => this.chart.addAxis(axis));
    dataWithAxis.forEach(plotdata => this.chart.addSeries(plotdata));    
  }

  public applyAxis(data: any[]): any[] {
      return data.map((series, idx) => {
          //idx === 0 ? series : Object.assign({}, series, { yAxis: idx+'event-analysis' })
        if(series.customAxis && idx !== 0) return Object.assign({}, series, { yAxis: idx+'event-analysis' });
        else return Object.assign({}, series, { yAxis: 0});;
    });
  }

  public callbackFn(chart) {
    this.chart = chart;
    if(this.activeTimeseriesAnalysisRecord) this.chart.setTitle({text: this.activeTimeseriesAnalysisRecord.name});
    if(this.data && this.data.length > 0) this.render(); 
  }

  private getMaxDateRange(rawData) {

  }

}
