import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';

@Component({
  selector: 'app-market-data-timeseries-plot-viewer',
  templateUrl: './market-data-timeseries-plot-viewer.component.html',
  styleUrls: ['./market-data-timeseries-plot-viewer.component.scss']
})
export class MarketDataTimeseriesPlotViewerComponent implements OnInit, OnChanges {

    @Input() rawData: any;
    @Input() loading: boolean;

    @Input() title: string;
    @Input() subtitle: string;
    @Input() seriesName = 'eod_value';

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
        }
    
        if (this.chart) {
            this._drawPlot(this.plotDataCollection);
            // this._setTitle();
        }
    }

    public callbackFn(chart: any): void {
        this.chart = chart;

        if (this.plotDataCollection) {
          this._drawPlot(this.plotDataCollection);
          // this._setTitle();
        }

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
                        return s + '<br /><span style="color:' + point.color + '">\u25CF</span> ' + point.series.name + ': ' + point.y.toFixed(2).toLocaleString();
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
                floating: true,
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
        const sortedData = [...data];
        sortedData.sort((a, b) => {
            const value_a = (new Date(a['date'])).getTime();
            const value_b = (new Date(b['date'])).getTime();
            return value_a - value_b;
        });
        sortedData.forEach(element => {
            const time = (new Date(element['date'])).getTime();
            Object.keys(element).filter(key => key === 'eod_value').forEach((key) => {
                if (dataCollection[key] === undefined) {
                    dataCollection[key] = {name: this.seriesName, data: []};
                }
                const dataPoint = [time, element[key]];
                dataCollection[key].data.push(dataPoint);
            });
        });
        return Object.keys(dataCollection).map(key => dataCollection[key]);
    }

    private _drawPlot(plotData: any[]) {

        // console.log('plot data', plotData);
        this.chart.animation = false;
        while (this.chart.series.length > 0) {
          this.chart.series[0].remove();
        }
    
        plotData.forEach(series => {
            this.chart.addSeries(series);
        });

        this._setTitle();
    }

    private _setTitle() {
        this.chart.setTitle({
            text: this.title
        });
        this.chart.setSubtitle({
             text: this.subtitle
        })
    }
}
