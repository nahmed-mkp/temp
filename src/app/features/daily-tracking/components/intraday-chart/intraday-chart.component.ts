import { Component, HostListener, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import * as Highcharts from 'highcharts/highstock';

import { HighchartsDataService } from 'src/app/factories';

import * as fromModels from './../../models/daily-tracking.models';
import { UtilityService } from 'src/app/services';

@Component({
    selector: 'app-tracking-intraday-chart',
    templateUrl: './intraday-chart.component.html',
    styleUrls: ['./intraday-chart.component.scss']
})
export class MBSIntradayChartComponent implements OnInit, OnChanges {

    @Input() request: fromModels.IntradayRequest;
    @Input() metaData: fromModels.IntradayMetaData;

    @Input() selectedDates: string[] = [];
    @Input() intradayPlot: any;
    @Input() intradayPlotLoading: boolean;
    @Input() intradayPlotLoaded: boolean;
    @Input() intradayPlotError: string;

    public Highcharts = Highcharts;
    public chart: any;

    public targetData: any[];

    public optionsPlot = {
        title : { text : null},
        legend: {
            enabled: true,
            align: "center",
            layout: "vertical",
            verticalAlign: "top",
            floating: true,
            y:20,
            labelFormatter: function() {
                return this.name;
            }
        },
        time: {
            useUTC: false
        },
        yAxis: {
            labels: {
                align: 'left',
                formatter: (w) => {
                    return this._utils.decimalToTicks(w.value);
                }
            }
        },
        rangeSelector: {
            selected: 3,
            inputEnabled: false,
            buttonTheme: {
                width: 50
            },
            buttons: [{
                type: 'minute',
                count: 30,
                text: '30 min',
                title: 'View 30 min'
            }, {
                type: 'minute',
                count: 60,
                text: '60 min',
                title: 'View 60 min'
            }, {
                type: 'hour',
                count: 2,
                text: '2h',
                title: 'View 2 hours'
            }, {
                type: 'all',
                text: 'All'
            }]
        },
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
        tooltip: {
            valueDecimals: 5, 
            shared: true, 
            split: false, 
            crosshair: [true, true],
            formatter: function() {
                let s = '<b>' + Highcharts.dateFormat('%H:%M', this.x - (new Date().getTimezoneOffset()*60000)) + '</b><br />';

                this.points.forEach((point) => {
                    s += `<span style="color:${point.series.color};">\u25CF ${point.series.name}</span>: <b>${point.point.custom.ticks}</b><br />`;
                });
                return s;
            }
        }
    };

    constructor(private _highcharts:HighchartsDataService, 
        private _utils: UtilityService) {
        this.callbackFn = this.callbackFn.bind(this);
    }

    ngOnInit(): void {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes && changes.intradayPlot && changes.intradayPlot.currentValue) {
            if (changes.intradayPlot.currentValue.data !== undefined) {
                this.targetData = this._parsePlotData(changes.intradayPlot.currentValue);
                console.warn(this.targetData)
                this._drawPlot(this.targetData);
            }
        }
    }

    public callbackFn(chart: any): void {
        this.chart = chart;
        if (this.targetData && this.targetData.length > 0) {
            this._drawPlot(this.targetData);
        }
    }

    private _drawPlot(formattedSeries: any[]) {
        
        let maxTime = new Date(2000, 0, 1);

        formattedSeries.forEach((series, idx) => {
            const formattedData = series.data.map((data) => {
                return {x: data.Timestamp, y: data.Value, custom: {'ticks': this._utils.decimalToTicks(data.Value)}};
            });

            if (formattedData.length > 0) { 
                const latestTime = formattedData[formattedData.length - 1].x;
                const latestDate = new Date(latestTime);
                if (latestDate > maxTime) { 
                    maxTime = latestDate;
                }
            }

            const existingSeries = this.chart.series.filter((s) => s.name === series.name);
            if (existingSeries.length === 1) { 
                existingSeries[0].setData(formattedData);
            } else {
                this.chart.addSeries({
                    dataGrouping: {
                        enabled: false,
                        forced: true
                    },
                    name: series.name,
                    data: [...formattedData]
                });
            }
        });

        this.chart.setTitle({
            'text': null
        }, {
            'text': `As of ${maxTime.toLocaleString('en-US')}`
        });

        this.renderChart(window.innerWidth - 10, window.innerHeight - 60);

        this.chart.reflow();
        
    }

    public clearChart(): void {
        if (this.chart) { 
            
            while (this.chart.series.length > 0) { this.chart.series[0].remove(true); }

            this.chart.reflow();
        }
    }

    private _getDatesString(dates: string[]): string {
        const stringDates: string[] = dates.map((date) => {
            return new Date(date).toLocaleDateString('en-US');
        });
        return stringDates.join(',');
    }

    private _parsePlotData(plotData: any): any {
        const series = [];
        Object.keys(plotData.data).forEach((date) => {
            Object.keys(plotData.data[date]).forEach((seriesName) => {
                const data = plotData.data[date][seriesName];
                const parsedData = this._highcharts.csvToIntradayTimeseries(data, 'Timestamp')
                const curSeries = {
                    'name': `${seriesName}: ${date}`,
                    'data': parsedData
                }
                series.push(curSeries);
            });
        });

        return series;
    }

    @HostListener('window:resize', ['$event.target'])
    public onResize(target) {
        if (this.chart) {
            this.renderChart(target.innerWidth - 10, target.innerHeight - 60);
        }
    }

    private renderChart(width: number, height: number): void {
        if (this.chart) { 
            if (this.chart) {
                this.chart.setSize(width, height, true);
                this.chart.reflow();
            }
        }
    }
}
