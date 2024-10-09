import { Component, OnInit, ChangeDetectionStrategy, Input, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import * as Highcharts from 'highcharts/highstock';

import { BehaviorSubject } from 'rxjs';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MedianHourlyParamSheetComponent } from './median-hourly-chart-param-sheet.component';


@Component({
    selector: 'app-tracking-median-hourly-chart',
    templateUrl: './median-hourly-chart.component.html',
    styleUrls: ['./median-hourly-chart.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MedianHourlyChartComponent implements OnInit, OnChanges, OnDestroy {

    @Input() chartData: any[];
    @Input() chartLoading: boolean;
    @Input() chartLoaded: boolean;
    @Input() chartError: string;

    public Highcharts = Highcharts;
    public chart: any;
    private targetData: any[];

    public optionsPlot = {
        // title : { text : this.title + ' ' + this.displayPropety},
        subtitle: { text: 'Median (Hourly) Plot' },

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
        tooltip: {
            xDateFormat: '%m/%d/%Y',
            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b><br/>',
            valueDecimals: 2,
            split: false,
            shared: true
        },
        plotOptions: {
            series: {
                showInNavigator: true
            }
        },
    };

    public slots: string[];
    public metrics: string[];
    public tickers: string[];

    public loaded = false;
    public timeseriesTitle = 'Median (Hourly) Plot';

    public selectedSlots: string[];
    public selectedTickers: string[];
    public selectedMetric: string;

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
            const slots = changes.chartData.currentValue.map((record) => record.slot);
            const metrics = Object.keys(changes.chartData.currentValue[0]).filter(key => key !== 'slot');
            if (metrics.length > 0 && slots.length > 0) {
                const tickers = changes.chartData.currentValue[0][metrics[0]].map((item) => item.name);
                this.slots = [...slots];
                this.metrics = [...metrics];
                this.tickers = [...tickers];
                this.loaded = true;
            }
        }
    }

    openParams(): void {
        const res = this.bottomSheet.open(MedianHourlyParamSheetComponent, { data:
            { 'tickers': this.tickers, 'slots': this.slots, 'metrics': this.metrics, 'selectedTickers': this.selectedTickers } });
        res.afterDismissed().subscribe((data) => {
            if (data) {
                this.selectedSlots = data.selectedSlots;
                this.selectedTickers = data.selectedTickers;
                this.selectedMetric = data.selectedMetric;
                if (this.chartData) {
                    const selectedTimeseries = [];
                    const selectedSlots = this.chartData.filter((slot) => this.selectedSlots.indexOf(slot.slot) >= 0);
                    selectedSlots.forEach((selectedSlot, idx) => {
                        selectedSlot[this.selectedMetric].forEach((series, idx1) => {
                            if (this.selectedTickers.indexOf(series.name) >= 0) {
                                selectedTimeseries.push({'name': `${series.name}:${selectedSlot.slot}`, 'data': series.data});
                            }

                        });
                    });
                    if (selectedSlots.length > 0) {
                        if (selectedTimeseries.length > 0) {
                            this.plotData$.next(selectedTimeseries);
                            this.targetData = selectedTimeseries;
                            let title = '';
                            if (this.selectedTickers.length > 1) {
                                title += `Multiple tickers`;
                            } else {
                                title += `${this.selectedTickers[0]}`;
                            }
                            if (this.selectedSlots.length > 0) {
                                title += `: Multiple slots`;
                            } else {
                                title += `${this.selectedSlots[0]}`;
                            }
                            this.timeseriesTitle = `${title} Median ${data.selectedMetric}`;
                            this.drawPlot([...this.targetData]);
                        }
                    }
                }
            }
        });
    }

    public callbackFn(chart) {
        this.chart = chart;
        if (this.targetData && this.targetData.length > 0) {
            this.drawPlot(this.targetData);
        }
    }

    private drawPlot(targetData: any[]): void {

        if (this.chart.series.length > 0) {
            while (this.chart.series.length) {
                this.chart.series[0].remove();
            }
        }

        this.chart.setTitle({
            text: this.timeseriesTitle
        });

        targetData.forEach((data, idx) => {
            this.chart.addSeries({
                data: data.data,
                name: data.name
            });
        });
    }

}
