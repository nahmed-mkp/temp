import { Component, OnInit, Inject } from '@angular/core';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-equities-data-timeseries-viewer-dialog',
  templateUrl: './equities-data-timeseries-viewer-dialog.component.html',
  styleUrls: ['./equities-data-timeseries-viewer-dialog.component.scss']
})
export class EquitiesDataTimeseriesViewerDialogComponent implements OnInit {

  public chart: any;
  public Highcharts = Highcharts;
  public optionsPlot = {
    // title : { text : this.title + ' ' + this.displayPropety},
    subtitle: { text: 'Timeseries Plot' },

    legend: {
        enabled: true,
        align: 'right',
        layout: 'vertical',
        verticalAlign: 'top',
        floating: false,
        y: 100,
    },

    xAxis: {
      type: 'category',
    },
    
    navigator: {
        series: {
          includeInCSVExport: false
        },
        height: 80,
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
  }

  constructor(@Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<EquitiesDataTimeseriesViewerDialogComponent>,) {
    this.callbackFn = this.callbackFn.bind(this);
  }

  ngOnInit() {
    // console.log('data', this.data);
  }

  onClose() {
    this.dialogRef.close();
  }

  public callbackFn(chart) {
    this.chart = chart;
    if(this.data && this.data.plotData.length > 0) {

      this.data.plotData.forEach(series => {
        this.chart.addSeries({
          name: series.name,
          data: this.formatData(series.data),
          visible: series.visible
        })
      })

      // const formatedPlotData = this.formatData(this.data.plotData);
      // this.chart.addSeries({
      //   data: formatedPlotData
      // });
      this.chart.setTitle({
        text: this.data.title
      });
      this.chart.setSubtitle({
        text: this.data
      })
    }
    
  }

  // Uitility -----------------------------------------
  formatData(data) {
    return data.map(item => [(new Date(item.date)).getTime(), item.value])
  }

}
