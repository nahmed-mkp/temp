import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';


@Component({
  selector: 'app-vol-report-timeseries-viewer',
  templateUrl: './vol-report-timeseries-viewer.component.html',
  styleUrls: ['./vol-report-timeseries-viewer.component.scss']
})
export class VolReportTimeseriesViewerComponent implements OnInit, OnChanges {

  @Input() data: any[];

  public chart: any;
  public optionsPlot = {
    title : { text : 'SPX Timeseries Plot' },
    subtitle: { text: 'Timeseries Plot Sample' },

    legend: {
        enabled: true,
        align: 'right',
        layout: 'vertical',
        verticalAlign: 'top',
        floating: true,
        y: 100,
    },
    navigator: {
        series: {
          includeInCSVExport: false
        },
        height: 80
    },
    exporting: {
        csv: {
            dateFormat: '%Y-%m-%d'
        }
    },
    credits: {
        enabled: false
    },
  }

  constructor() {
    this.callbackFn = this.callbackFn.bind(this);
  }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    // console.log('data in onchanges', this.data, this.chart);
    // if(changes.data && changes.data.currentValue && this.chart) {
      
    //   this.chart.addSeries({
    //     name: 'sample',
    //     data: this.data
    //   })
    // } 
  }

  public callbackFn(chart) {
    this.chart = chart;
    console.log('data in callback', this.data, this.chart);
    if(this.data) {
      this.chart.addSeries({
        name: 'sample',
        data: this.data
      })
    }
  }

}
