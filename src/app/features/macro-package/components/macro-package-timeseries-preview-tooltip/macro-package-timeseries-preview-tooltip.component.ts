import { Component, OnInit, Inject, OnDestroy, HostBinding } from '@angular/core';
import { Subscription } from 'rxjs';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { MacroPackageTimeseriesDialogLayoutComponent } from '../../containers';
import { Store } from '@ngrx/store';
import * as Highcharts from 'highcharts';

import * as fromStore from '../../store';

@Component({
  selector: 'app-macro-package-timeseries-preview-tooltip',
  templateUrl: './macro-package-timeseries-preview-tooltip.component.html',
  styleUrls: ['./macro-package-timeseries-preview-tooltip.component.scss']
})
export class MacroPackageTimeseriesPreviewTooltipComponent implements OnInit, OnDestroy {

  @HostBinding('class') classes = 'vertical-flex-full-height';

  private subscriptions: Subscription[] = [];
  public loadingStatus = true;
  public targetTimeseries: any;
  public Highcharts = Highcharts;
  public dateRange = 'max'

  public chart: any;
  public optionsPlot = {
    chart: {
      animation: false,
      type: 'line',
      zooming:{
        type: 'xy'
      }
    },
    legend: {
        enabled: false,
    },
    title: {
      text: null
    },
    exporting: {
      enabled: false
    },
    credits: {
        enabled: false
    },
    plotOptions: {
      series: {
          animation: false,
          fillColor: {
              linearGradient: [0, 0, 0, 350],
              stops: [
                  [0, '#428bca'],
                  [1, '#ffffff00']
              ]
          },
          lineWidth: 2,
          // states: {
          //     hover: {
          //         lineWidth: 1
          //     }
          // },
      }
    },
    xAxis: {
      type: 'datetime',
      dateTimeLabelFormats: {
        month: '%b \'%y',
      }
    },
    yAxis: {
      labels: {
        enabled: true
      },
      title: {
        text: undefined
      },
      gridLineColor: '#f6f6f6'
    },
    tooltip: {
      valueDecimals: 2,
    }
  };

  constructor(@Inject(MAT_DIALOG_DATA) public data,
              public dialogRef: MatDialogRef<MacroPackageTimeseriesDialogLayoutComponent>,
              private store: Store<fromStore.MacroAnalyticsState>) {
    this.callbackFn = this.callbackFn.bind(this);
  }

  ngOnInit() {
    if (this.data.type === 'credit') {
      this.subscriptions.push(this.store.select(fromStore.getCreditAnalyticsTimeseriesLoadingStatus).subscribe(loadingstatus => {
        this.loadingStatus = loadingstatus;
      }));

      this.subscriptions.push(this.store.select(fromStore.getCreditAnalyticsSelectedDateTimeseriesPreview, {target: this.data.target})
      .subscribe(targetTimeseries => {
        this.targetTimeseries = targetTimeseries;
      }));
    } else if (this.data.type === 'commodities') {
      this.subscriptions.push(this.store.select(fromStore.getCommoditiesAnalyticsTimeseriesLoadingStatus).subscribe(loadingstatus => {
        this.loadingStatus = loadingstatus;
      }));

      this.subscriptions.push(this.store.select(fromStore.getCommoditiesAnalyticsSelectedDateTimeseriesPreview, {target: this.data.target})
      .subscribe(targetTimeseries => {
        this.targetTimeseries = targetTimeseries;
      }));
    } else if (this.data.type === 'inflation') {
      this.subscriptions.push(this.store.select(fromStore.getInflationAnalyticsTimeseriesLoadingStatus).subscribe(loadingstatus => {
        this.loadingStatus = loadingstatus;
      }));

      this.subscriptions.push(this.store.select(fromStore.getInflationAnalyticsSelectedDateTimeseriesPreview, {target: this.data.target})
      .subscribe(targetTimeseries => {
        this.targetTimeseries = targetTimeseries;
      }));
    } else if (this.data.type === 'equity') {
      this.subscriptions.push(this.store.select(fromStore.getIndexTimeseriesLoadingStatus).subscribe(loadingstatus => {
        this.loadingStatus = loadingstatus;
      }));

      this.subscriptions.push(this.store.select(fromStore.getEquitySelectedTimeseriesPreview, {target: this.data.target, mode: this.data.mode, ticker: this.data.ticker})
      .subscribe(targetTimeseries => {
        this.targetTimeseries = targetTimeseries;
      }));
    }
  }

  ngOnDestroy() {
    if (this.subscriptions.length > 0) {
      this.subscriptions.forEach(sub => sub.unsubscribe());
    }
  }

  public callbackFn(chart) {
    this.chart = chart;

    if (this.data) {
      // const formattedPlotData = this.formatData(this.data);
      this.drawPlot(this.data);
    }
  }

  drawPlot(data) {
    this.chart.addSeries({
      name: this.data.target,
      data: this.targetTimeseries
    }, true, false);
  }

  onClose() {
    this.dialogRef.close();
  }

  onChangeDateRange(dateRange: string) {
    this.dateRange = dateRange;
    let targetData, targetTime;
    const date = new Date();

    if (dateRange === '1M') {
      date.setMonth(date.getMonth() - 1);
      targetTime = date.getTime();
      targetData = this.targetTimeseries.filter(datapoint => datapoint[0] >= targetTime);
    } else if (dateRange === '5M') {
      date.setMonth(date.getMonth() - 5);
      targetTime = date.getTime();
      targetData = this.targetTimeseries.filter(datapoint => datapoint[0] >= targetTime);
    } else if (dateRange === '1Y') {
      date.setFullYear(date.getFullYear() - 1);
      targetTime = date.getTime();
      targetData = this.targetTimeseries.filter(datapoint => datapoint[0] >= targetTime);
    } else if (dateRange === '3Y') {
      date.setFullYear(date.getFullYear() - 3);
      targetTime = date.getTime();
      targetData = this.targetTimeseries.filter(datapoint => datapoint[0] >= targetTime);
    } else {
      targetData = this.targetTimeseries;
    }

    const headData = targetData[0][1];
    const tailData = targetData[targetData.length - 1][1];
    let gradient;
    if (tailData > headData) {
      gradient = '#00bf00';
    } else if (tailData < headData) {
      gradient = '#ff000096';
    } else {
      gradient = '#428bca';
    }

    this.chart.series[0].remove(false, false);
    this.chart.addSeries({
      name: this.data.target,
      data: targetData,
      fillColor: {
        linearGradient: [0, 0, 0, 350],
        stops: [
          [0, gradient],
          [1, '#ffffff00']
        ]
      },
      color: gradient
    }, true, false);
  }

}
