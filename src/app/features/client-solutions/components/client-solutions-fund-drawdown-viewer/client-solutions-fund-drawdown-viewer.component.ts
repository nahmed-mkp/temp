import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';

import * as fromModels from './../../models';

@Component({
  selector: 'app-client-solutions-fund-drawdown-viewer',
  templateUrl: './client-solutions-fund-drawdown-viewer.component.html',
  styleUrls: ['./client-solutions-fund-drawdown-viewer.component.scss']
})
export class ClientSolutionsFundDrawdownViewerComponent implements OnInit, OnChanges {

  @Input() rawData: any;
  @Input() loading: boolean;
  @Input() title: string;

  @Input() benchmarkCodeMap: any;
  @Input() fundEntity: {[id: string]: fromModels.IFund};
  @Input() filteredBenchmark: fromModels.IBenchmark[];

  private chart: any;
  public optionsPlot: any;
  private plotDataCollection: any[];

  constructor() { 
    this.callbackFn = this.callbackFn.bind(this);
  }

  ngOnInit() {
    this.optionsPlot = this._createPlotOption();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.rawData && changes.rawData.currentValue) {
      this.plotDataCollection = this._formatPlotData(changes.rawData.currentValue);

      if (this.chart) {
        this._drawPlot(this.plotDataCollection);
        this._setTitle();
        if (this.filteredBenchmark) {
          this._toogleSeriesVisibility();
        }
      }
    }

    if (changes.filteredBenchmark && changes.filteredBenchmark.currentValue && changes.filteredBenchmark.firstChange === false) {
      this._toogleSeriesVisibility();
    }
  }

  public callbackFn(chart: any): void {
    this.chart = chart;

    // if (this.plotDataCollection) {
    //   this._drawPlot(this.plotDataCollection);
    //   this._setTitle();
    // }

    setTimeout(() => {
      this.chart.reflow();
    }, 100);
  }


  // Utility ----------------------------------------------
  private _createPlotOption() {
    return {
      // subtitle: { text: (this.dataPath ? this.dataPath.displayName : '') + ' Simulated Returns' },
      // title : { text : this.title + ' ' + this.displayPropety},
      chart: {
        zooming:{
          type: 'xy'
        }
      },
      colors: ['#2f7ed8', '#0d233a', '#8bbc21', '#910000', '#1aadce',
        '#492970', '#f28f43', '#77a1e5', '#c42525', '#a6c96a'],
      xAxis: {
        gridLineWidth: 0.5
      },
      yAxis: {
        gridLineWidth: 0.5
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
              const formattedValue = (point.y * 100).toFixed(2) + '%'
              return s + '<br /><span style="color:' + point.color + '">\u25CF</span> ' + point.series.name + ': ' + formattedValue;
          }, '<b>' + new Date(this.x).toLocaleDateString('en-US', { timeZone: 'UTC'}) + '</b>');
        }
      },
      lang: {
        noData: 'No Data'
      },
      legend: {
        width: '20%',
        enabled: true,
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'top',
        y: 80,
        navigation: {
            activeColor: '#3E576F',
            animation: true,
            arrowSize: 12,
            inactiveColor: '#CCC',
            style: {
                fontWeight: 'bold',
                color: '#333',
                fontSize: '12px'
          }
        }
      },
      navigator: {
          series: {
            includeInCSVExport: false
          },
          height: 80,
          enabled: true,
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
        selected: 5
      },
    }
  }


  private _formatPlotData(data: any[]) {
    const dataCollection: any = {};
    data.forEach(element => {
      const time = (new Date(element['Date'])).getTime();
      Object.keys(element).filter(key => key !== 'Date').forEach((key, index) => {
        if (dataCollection[key] === undefined) {

          if (key.startsWith('MKP')) {
            dataCollection[key] = {name: this.fundEntity[key]['description'], data: []};
          } else {
            dataCollection[key] = {name: this.benchmarkCodeMap[key]['description'], data: []};
          }

          if (index > 4) {
            dataCollection[key]['visible'] = false;
          }
        }
        const dataPoint = [time, element[key]];
        dataCollection[key].data.push(dataPoint);
      });
    });
    return Object.keys(dataCollection).map(key => dataCollection[key]);
  }

  private _drawPlot(plotData: any[]) {
    this.chart.animation = false;
    while (this.chart.series.length > 0) {
      this.chart.series[0].remove();
    }

    plotData.forEach(series => {
      this.chart.addSeries(series);
    });
  }

  private _setTitle() {
    this.chart.setTitle({
      text: this.title + ' vs. Benchmarks**'
    });
    this.chart.setSubtitle({
      text: 'Drawdown Analysis'
    })
  }

  private _toogleSeriesVisibility() {
    const targetVisibleSeriesName = this.filteredBenchmark.map(benchmark => benchmark.description);
    const targetSeriesCollection = this.chart.series.filter(line => line.type !== 'areaspline');
    targetSeriesCollection.forEach(series => {
      if (targetVisibleSeriesName.length === 0) {
        series.show();
      } else {
        if (targetVisibleSeriesName.includes(series.name)) {
          series.show();
        } else {
          series.hide();
        }
      }
    });
  }
}
