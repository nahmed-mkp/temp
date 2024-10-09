import { Component, OnInit, ChangeDetectionStrategy, Input, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import * as Highcharts from 'highcharts/highstock';

import { BehaviorSubject } from 'rxjs';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { DailyParamSheetComponent } from './daily-param-sheet.component';


@Component({
    selector: 'app-tracking-daily-chart',
    templateUrl: './daily-chart.component.html',
    styleUrls: ['./daily-chart.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DailyChartComponent implements OnInit, OnChanges, OnDestroy {

    @Input() chartData: any[];
    @Input() chartLoading: boolean;
    @Input() chartLoaded: boolean;
    @Input() chartError: string;

    public Highcharts = Highcharts;
    public chart: any;
    private targetData: any[];
    private timeseriesTitle: string;

    // chartOptions: Options = {
    //     series: [
    //         {
    //             type: 'line',
    //             pointInterval: 24 * 3600 * 1000,
    //             data: [1, 2, 3, 4, 5]
    //         }
    //     ]
    // };


    public optionsPlot = {
        // title : { text : this.title + ' ' + this.displayPropety},
        subtitle: { text: 'Tracking Closing Plots (Daily)' },

        legend: {
            enabled: false,
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
            valueDecimals: 5
        }
    };

    public tickers: string[];
    public metrics: string[];
    public fromDate: string;
    public toDate: string;

    public loaded = false;

    public selectedTicker: string;
    public selectedMetric: string;
    public selectedStartDate: string;
    public selectedEndDate: string;

    public plotData$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

    constructor(private bottomSheet: MatBottomSheet) {
        this.callbackFn = this.callbackFn.bind(this);
    }

    ngOnInit(): void {

    }

    ngOnDestroy(): void {
        // throw new Error("Method not implemented.");
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes && changes.chartData && changes.chartData.currentValue && changes.chartData.currentValue.length > 0) {
            const chartData = changes.chartData.currentValue;
            const tickers = chartData.map((chart) => chart.ticker).sort();
            const ticker = chartData.filter((chart) => chart.ticker === tickers[0])[0];
            if (ticker) {
                const metrics = ticker.series.map((series) => series.type).sort();
                this.tickers = [...tickers];
                this.metrics = [...metrics];
                this.loaded = true;
            }
        }
    }

    openParams(): void {
        const res = this.bottomSheet.open(DailyParamSheetComponent, { data: { 'tickers': this.tickers, 'metrics': this.metrics } });
        res.afterDismissed().subscribe((data) => {
            if (data) {
                this.selectedTicker = data.selectedTicker;
                this.selectedMetric = data.selectedMetric;
                this.selectedStartDate = data.startDate;
                this.selectedEndDate = data.endDate;
                if (this.chartData) {
                    const selectedSeries = this.chartData.filter((tickers) => tickers.ticker === this.selectedTicker)
                        .map((series) => series.series);
                    if (selectedSeries.length > 0) {
                        const selectedTimeseries = selectedSeries[0].filter((series) => series.type === this.selectedMetric);
                        if (selectedTimeseries.length > 0) {
                            this.plotData$.next(selectedTimeseries[0].data);
                            this.targetData = selectedTimeseries[0].data;
                            this.timeseriesTitle = `${data.selectedTicker} - ${data.selectedMetric}`;
                            this.drawPlot(this.targetData);
                        }
                    }
                }
            }
        });
    }

    public callbackFn(chart: any): void {
        this.chart = chart;
        if (this.targetData && this.targetData.length > 0) {
            this.drawPlot(this.targetData);
        }
    }

    private drawPlot(formattedData) {
        if (this.chart.series.length > 0) {
            this.chart.series[0].remove();
        }
        this.chart.setTitle({
            text: this.timeseriesTitle
        });

        this.chart.addSeries({
            data: formattedData,
            type: 'daily',
        });
    }

}
