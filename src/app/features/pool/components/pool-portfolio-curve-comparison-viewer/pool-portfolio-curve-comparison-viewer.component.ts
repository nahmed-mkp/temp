import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { UtilityService } from 'src/app/services';

@Component({
  selector: 'app-pool-portfolio-curve-comparison-viewer',
  templateUrl: './pool-portfolio-curve-comparison-viewer.component.html',
  styleUrls: ['./pool-portfolio-curve-comparison-viewer.component.scss']
})
export class PoolPortfolioCurveComparisonViewerComponent implements OnInit, OnChanges {

  @Input() detail: any[];
  @Input() summary: any[];
  @Input() selectedCusip: {Cusip: string; BlbgName: string};

  public customGridOption_details: GridOptions = {
    defaultColDef: {
      cellStyle: params => {
          return typeof params.value === 'number' ? {'justify-content': 'flex-end'} : { };
      },
    },
    columnDefs: [
      {headerName: 'AsOfDate', field: 'AsOfDate', cellClass: 'right-border'},
      {headerName: 'Act', field: 'Act', cellClass: 'right-border', valueGetter: this.utilityService.formatNumber(2)},
      {headerName: 'Proj', field: 'Proj', valueGetter: this.utilityService.formatNumber(2)},
    ],
  }

  public customGridOption_summaries: GridOptions = {
    defaultColDef: {
      cellStyle: params => {
          return typeof params.value === 'number' ? {'justify-content': 'flex-end'} : { };
      },
    },
    columnDefs: [
      {headerName: 'LookBack', field: 'LookBack', cellClass: 'right-border'},
      {headerName: 'Act', field: 'Act', cellClass: 'right-border', valueGetter: this.utilityService.formatNumber(2)},
      {headerName: 'Proj', field: 'Proj', cellClass: 'right-border', valueGetter: this.utilityService.formatNumber(2)},
      {headerName: 'RATIO', field: 'RATIO', cellClass: 'right-border', valueGetter: this.utilityService.formatNumber(2)},
      {headerName: 'ERROR', field: 'ERROR', cellClass: 'right-border', valueGetter: this.utilityService.formatNumber(2)},
      {headerName: 'sortOrder', field: 'sortOrder', sort: 'asc'},
    ]
  }
  public extraOption = {sizeColumnsToFit: true};

  public chart: any;
  public optionsPlot = {
    // title : { text : this.title + ' ' + this.displayPropety},
    // xAxis: {
    //   type: 'datetime',
    //   labels: {
    //     format: '{value:%m/%d/%y}',
    //     align: 'right',
    //     rotation: -30
    //   },
    // },

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
        height: 80,
        enabled: false
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
    scrollbar: {
      height: 10,
      barBackgroundColor: '#80808021',
      trackBackgroundColor: '#00000008',
    }
  }

  private plotData: any[];


  constructor(private utilityService: UtilityService) {
    this.customGridCallBack = this.customGridCallBack.bind(this);
    this.callbackFn = this.callbackFn.bind(this);
  }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.detail && changes.detail.currentValue && changes.detail.currentValue.length > 0) {
      console.log('rendering', this.chart);
      this.plotData = this.formatPlotdata(changes.detail.currentValue);
      if (this.chart) {
        this.drawPlot(this.plotData);
      }
    }
  }

  customGridCallBack(params) {}

  public callbackFn(chart) {
    this.chart = chart;
    if (this.plotData) {
      this.drawPlot(this.plotData);
    }
  }

  private formatPlotdata(data): any[] {
    const actualSeries = [];
    const projectSeries = [];
    data.forEach(element => {
      const dateTime =  (new Date(element['AsOfDate'])).getTime();
      actualSeries.push([dateTime, element['Act']]);
      projectSeries.push([dateTime, element['Proj']]);
    });
    return [
      {name: 'Actual', data: actualSeries},
      {name: 'Project', data: projectSeries},
    ]
  }

  private drawPlot(plotData)  {
    while (this.chart.series.length > 0) {
      this.chart.series[0].remove(false, false);
    }
    plotData.forEach(series => {
      this.chart.addSeries(series);
    });
    this.chart.setTitle({}, {text: this.selectedCusip.BlbgName});
  }

}
