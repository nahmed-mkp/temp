import { Component, Input, Output, OnInit, OnChanges ,OnDestroy, 
    ChangeDetectionStrategy, EventEmitter, ViewChild, AfterViewInit} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AppLineChartComponent } from '../../../../components';


import * as fromModels from '../../models';
import * as fromUtils from '../../../../factories';

@Component({
    selector: 'app-tbareports-timeseries-plot',
    templateUrl: './timeseries-plot.component.html',
    styleUrls: ['./timeseries-plot.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimeseriesPlotComponent implements OnInit, OnDestroy, AfterViewInit, OnChanges {

    @ViewChild('chart') chart: AppLineChartComponent;
    @ViewChild('comparisonChart') comparisonChart: AppLineChartComponent;

    @Input() plotId: number;
    @Input() coupon: fromModels.OASCoupon;
    @Input() coupons: fromModels.OASCoupon[];
    @Input() seriesDescription: string;
    @Input() plotType: string;
    @Input() metricTypes: fromModels.MetricType[];

    @Output() onChartLoad: EventEmitter<fromModels.OASCoupon> = new EventEmitter<fromModels.OASCoupon>();
    @Output() onChartCompareLoad: EventEmitter<fromModels.OASCoupon> = new EventEmitter<fromModels.OASCoupon>();
    @Output() onChartRendered: EventEmitter<fromModels.PlotDataResult> = new EventEmitter<fromModels.PlotDataResult>();
    @Output() onChartCompareRendered: EventEmitter<fromModels.PlotDataResult> = new EventEmitter<fromModels.PlotDataResult>();

    @Output() onChartCompare: EventEmitter<fromModels.OASCoupon[]> = new EventEmitter<fromModels.OASCoupon[]>();
    @Output() onClearComparison: EventEmitter<fromModels.OASCoupon> = new EventEmitter<fromModels.OASCoupon>();

    public options: any;
    public compareOptions: any;

    public loaded$: Subject<boolean> = new Subject<boolean>();
    public loadFail$: Subject<boolean> = new Subject<boolean>();

    public mostRecentData: any[];
    public columns: any[];

    constructor(private chartsService: fromUtils.HighchartsDataService) { }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.loadAndRenderChart();
    }

    ngOnChanges(change) {
    }

    ngOnDestroy() {
        this.loaded$.unsubscribe();
        this.loadFail$.unsubscribe();
    }

    get timeseriesChart(): string {
        return `timeseries-${this.plotId.toString()}`;
    }

    get compareChart(): string {
        return `compare-${this.plotId.toString()}`;
    }

    get couponsToCompare(): fromModels.OASCoupon[] {
        if (this.plotType !== 'OAS' && this.plotType !== 'TSYOAS') {
            this.coupons = this.coupons.filter((coupon: fromModels.OASCoupon) => coupon.isSupportedByTBATracker);
        }
        return this.coupons.filter((coupon: fromModels.OASCoupon) => coupon.id !== this.coupon.id);
    }

    public loadAndRenderChart(): void {
        if (this.coupon) {
            if (this.coupon.couponToCompare) {
                // Plot comparison data
                this.onChartCompareLoad.emit(this.coupon);
            } else {
                // Plot regular data
                this.onChartLoad.emit(this.coupon);
            }
            this.loaded$.next(false);
            this.loadFail$.next(false);
        }
    }

    public chartCompare(e: any): void {
        this.onChartCompare.emit([this.coupon, e.value]);
    }

    public clearComparison(e: any): void {
        this.onClearComparison.emit(this.coupon);
        e.preventDefault();
    }

    public renderChart(plot: fromModels.PlotDataResult, plotType: string): void {
        this.loaded$.next(true);
        if (plot.data.length > 0) {
            this.loadFail$.next(false);
            if (!plot.isComparison) {
                this.renderTimeseriesChart(plot, plotType);
            } else {
                this.renderComparisonChart(plot, plotType);
            }
        } else {
            this.loadFail$.next(true);
        }
    }

    private renderTimeseriesChart(plot: fromModels.PlotDataResult, plotType: string): void {

        let normalizedData = this.chartsService.normalizeData(plot.data, 'Date');
        this.mapMostRecentData(plot);
        
        normalizedData = normalizedData.map((item) => {
            if(plotType!== 'OAS' && plotType !== 'TSYOAS' || this.seriesDescription.includes('CC')) {
                return Object.assign({}, item, { visible: true, zooming:{
                    type: 'x'
                }});
            }

            if (item.name.toLowerCase().startsWith('avg')) {
                return Object.assign({}, item, {zooming:{
                    type: 'x'
                }, 'lineWidth': 3, zIndex: 2});
            } else if (item.name.toLowerCase().startsWith('mkp')) {
                return Object.assign({}, item, { 'color': '#f4a041', zooming:{
                    type: 'x'
                }, 'lineWidth': 3, zIndex: 2});
            } else {
                return Object.assign({}, item, { visible: plot.visible || false, zooming:{
                    type: 'x'
                } });
            }
        });

        this.options = {
            title : { text : this.getChartTitle(this.coupon.coupon, this.seriesDescription, plotType) },
            rangeSelector: {
                selected: 4
            },
            yAxis: {
                crosshair: true,
                plotLines: [{
                    value: 0,
                    width: 2,
                    color: 'silver'
                }]
            },
            legend: {
                enabled: true,
                align: 'right',
                layout: 'vertical',
                y: 100,
                verticalAlign: 'top'
            },
            tooltip: {
                pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b><br/>',
                valueDecimals: 2,
                split: false,
                shared: true
            },
            navigator: {
                series: {
                    includeInCSVExport: false
                }
            },
            exporting: {
                csv: {
                    dateFormat: '%Y-%m-%d'
                }
            },
            series: normalizedData,
            credits: {
                enabled: false
            }
        };

        this.onChartRendered.emit(plot);
    }

    private mapMostRecentData(plot: fromModels.PlotDataResult): void {
        const columns = [];
        const remappedData = [];

        // Add data
        const recentData = plot.data.slice(Math.max(plot.data.length - 7, 0));
        const keys = Object.keys(recentData[0]);
        // This is a workaround because DevExtreme does not allow "." in columns names
        recentData.forEach(item => {
            keys.forEach((key) => {
                const toKey = key.replace(/\./g, '_');
                if (toKey !== key) {
                    this.renameProperty(item, key, toKey);
                } else if (toKey.toLowerCase() === 'date') {
                    item[toKey] = this.adjustUTCDate(item[toKey]);
                }
            });
            remappedData.push(item);
        });
        this.mostRecentData = remappedData;

        columns.push({dataField: 'Date', caption: 'Date', dataType: 'date', format: 'MM/dd/yyyy', sortOrder: 'desc'});
        Object.keys(recentData[0])
              .filter((key) => key.toLowerCase() !== 'date')
              .map((key) => key.replace(/\./g, '_'))
              .forEach((key) => {
                  columns.push({dataField: key, caption: key.replace(/_/g, '.'), dataType: 'number', format: '#,##0.0'});
              });
        this.columns = columns;
    }

    private renameProperty(obj, fromKey, toKey): void {
        obj[toKey] = obj[fromKey];
        delete obj[fromKey];
    }

    private adjustUTCDate(dateValue: string): Date {
        const date = new Date(dateValue);
        return new Date(
            date.getUTCFullYear(),
            date.getUTCMonth(),
            date.getUTCDate(),
            date.getUTCHours(),
            date.getUTCMinutes(),
            date.getUTCSeconds()
          );
    }

    private renderComparisonChart(plot: fromModels.PlotDataResult, plotType: string): void {

        let normalizedData = this.chartsService.normalizeData(plot.data, 'Date');
        this.mapMostRecentData(plot);

        normalizedData = normalizedData.map((item) => {
            if(plotType !== 'OAS' && plotType !== 'TSYOAS') {
                return Object.assign({}, item, { visible: true, zooming:{
                    type: 'x'
                }});
            }

            if (item.name.toLowerCase().startsWith('avg')) {
                return Object.assign({}, item, { visible: plot.visible || false, zooming:{
                    type: 'x'
                }});
            } else if (item.name.toLowerCase().startsWith('mkp')) {
                return Object.assign({}, item, { 'color': '#f4a041',           zooming:{
                    type: 'xy'
                }, 'lineWidth': 3, zIndex: 2});
            } else {
                return Object.assign({}, item, { 'zoomType': 'x', 'lineWidth': 1, zIndex: 2 });
            }
        });

        this.compareOptions = {
            title : { text : this.coupon.coupon +
                    `${this.seriesDescription.includes('CC') ? ' Price' : '% Coupon'} - ${plotType} [${this.coupon.bond}${this.coupon.coupon}
                    vs. ${this.coupon.couponToCompare.bond}${this.coupon.couponToCompare.coupon}]` },
            rangeSelector: {
                selected: 4
            },
            yAxis: {
                crosshair: true,
                plotLines: [{
                    value: 0,
                    width: 2,
                    color: 'silver'
                }]
            },
            legend: {
                enabled: true,
                align: 'right',
                layout: 'vertical',
                y: 100,
                verticalAlign: 'top'
            },
            tooltip: {
                pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b><br/>',
                valueDecimals: 2,
                split: false,
                shared: true
            },
            navigator: {
                series: {
                    includeInCSVExport: false
                }
            },
            exporting: {
                csv: {
                    dateFormat: '%Y-%m-%d'
                }
            },
            series: normalizedData,
            credits: {
                enabled: false
            }
        };

        this.onChartCompareRendered.emit(plot);
    }

    private getChartTitle(coupon: number, seriesDescription: string, plotType: string): string {
        if(seriesDescription.includes('CC')) {
            return coupon.toString() + ` Price - ${seriesDescription} - ${this.getMetricType(plotType)}`;
        } else {
            return coupon.toString() + `% Coupon - ${seriesDescription} - ${this.getMetricType(plotType)}`;
        }
        
    }

    private getMetricType(plotType: string): string {
        if (this.metricTypes && this.metricTypes.length > 0) {
            const selectedMetricType = this.metricTypes.filter(metricType => metricType.mnemonic.toLowerCase() === plotType.toLowerCase());
            if (selectedMetricType.length === 1) {
                return selectedMetricType[0].metricName;
            }
        }
        return plotType;
    }
}
