import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-macro-package-timeseries-viewer',
  templateUrl: './macro-package-timeseries-viewer.component.html',
  styleUrls: ['./macro-package-timeseries-viewer.component.scss']
})
export class MacroPackageTimeseriesViewerComponent implements OnInit, OnChanges {

  @Input() data: any[];
  @Input() displayPropety: string;
  @Input() title: string;
  @Input() loadingStatus: boolean;
  @Input() subTitle: string;

  public chart: any;
  public optionsPlot = {
    chart: {
      animation: false,
    },
    legend: {
        enabled: true,
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
        showInNavigator: true,
        animation: false,
      }
    },
    tooltip: {
      valueDecimals: 2,
    }
  };
  private columnKeys: string[];


  constructor() {
    this.callbackFn = this.callbackFn.bind(this);
  }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.data && changes.data.currentValue && changes.data.currentValue && this.chart) {
      // const formattedPlotData = this.formatData(changes.data.currentValue);
      this.drawPlot(changes.data.currentValue);
    }
  }

  public callbackFn(chart) {
    this.chart = chart;

    if (this.data) {
      // const formattedPlotData = this.formatData(this.data);
      this.drawPlot(this.data);
    }
  }

  // Utility -----------------------------------------------------

  // formatData(data: any) {
  //   const plotData: any = {};
  //   data.forEach(element => {
  //     element['Date'] = (new Date(element['Date'])).getTime();
  //   });
  //   this.columnKeys = Object.keys(data[0]).filter(key => key !== 'Date');
  //   this.columnKeys.forEach(key => plotData[key] = []);
  //   data.forEach(item => {
  //     this.columnKeys.forEach(key => {
  //       plotData[key].push([item['Date'], item[key] === '' ? undefined : item[key]]);
  //     });
  //   });
  //   return plotData;
  // }

  drawPlot(data) {
    // console.log('formattedPlotData', formattedPlotData)
    Object.keys(data).forEach(key => {
      this.chart.addSeries({
        name: key,
        data: data[key],
        visible: key === this.displayPropety ? true : false,
      }, false, false);
    });

    if (this.subTitle) {
      this.chart.setTitle({
        text: this.title
      }, {
        text: this.subTitle
      }, false);
    } else {
      this.chart.setTitle({
        text: this.title
      }, null, false);
    }

    this.chart.redraw();
  }

}
