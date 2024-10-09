import { Component, OnInit, OnDestroy, Input,
    Output, ChangeDetectionStrategy, EventEmitter, ViewChildren, QueryList, SimpleChanges, AfterViewInit, OnChanges } from '@angular/core';

import { Observable, Subject, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromModels from '../../models';
import * as fromStore from '../../store';

import * as fromPlotView from '../../components/timeseries-plot/timeseries-plot.component';

@Component({
    selector: 'app-tbareports-timeseries-plots',
    templateUrl: './timeseries-plots.component.html',
    styleUrls: ['./timeseries-plots.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimeseriesPlotsComponent implements OnInit, OnDestroy, AfterViewInit, OnChanges {

    @Input() timeseries: fromModels.OASTimeseries;
    @Input() selectedCoupons: fromModels.OASCoupon[];
    @Input() allCoupons: fromModels.OASCoupon[];
    @Input() mode: string;

    public selectedCouponFiltered: fromModels.OASCoupon[];
    public plots$: Observable<fromModels.PlotDataResult[]>;
    public selectedPlotType$: Observable<{type: string}>;
    public selectedMetricType$: Observable<string>;
    public metricTypes$: Observable<fromModels.MetricType[]>;

    @ViewChildren(fromPlotView.TimeseriesPlotComponent) plotViews: fromPlotView.TimeseriesPlotComponent[];

    public plotSubject = new Subject();
    public plotTypeSubject = new Subject();

    public plotType: string;
    public metricType: fromModels.MetricType;
    public plots: fromModels.PlotDataResult[];

    public plotsSubscription = new Subscription();
    public plotTypeSubscription = new Subscription();
    public metricTypeSubscription = new Subscription();

    constructor(private store: Store<fromStore.TBAReportsState>) {
        this.plots$ = store.select(fromStore.getPlots);
        this.selectedPlotType$ = store.select(fromStore.getSelectedPlotType);
        this.selectedMetricType$ = store.select(fromStore.getSelectedMetricType);
        this.metricTypes$ = store.select(fromStore.getMetricTypesEntities);
    }

    ngOnInit(): void {
        this.selectedCouponFiltered = this.selectedCoupons;
    }

    ngAfterViewInit() {
        this.plotsSubscription = this.plots$.subscribe((results: fromModels.PlotDataResult[]) => {
            this.plots = results;

            // Don't re-render charts

            // non-comparison
            const nonRenderedCharts = results.filter((result) => result.rendered === false && result.isComparison === false);
            if (nonRenderedCharts.length > 0) {
                this.plotSubject.next(this.renderCharts(nonRenderedCharts));
            }

            const nonRenderedComparisonCharts = results.filter((result) => result.rendered === false && result.isComparison === true);
            if (nonRenderedComparisonCharts.length > 0) {
                this.plotSubject.next(this.renderCharts(nonRenderedComparisonCharts));
            }
        });

        this.plotTypeSubscription = this.selectedPlotType$.subscribe((plotType: {type: string}) => {
            this.plotType = plotType.type;
            this.loadAndRenderCharts();
        });
    }

    ngOnChanges(changes: SimpleChanges) {
        if((changes.mode && changes.mode.currentValue) || (changes.selectedCoupons && changes.selectedCoupons.currentValue)) {
            // if(this.mode==='dialedTypeMode' || this.mode === 'v99TypeMode') this.selectedCouponFiltered = this.selectedCoupons.filter(coupon => coupon.bond.includes('CC')===false)
            if((this.mode === 'v99TypeMode' || this.mode === 'regularTypeMode') && this.selectedCoupons) this.selectedCouponFiltered = this.selectedCoupons.filter(coupon => coupon.bond.includes('CC')===false)
            else if(this.mode === 'dialedTypeMode') this.selectedCouponFiltered = this.selectedCoupons.filter(coupon => coupon.bond.includes('Dialed') || coupon.bond.includes('CC')===false)
            else if(this.mode === 'trackerTypeMode') this.selectedCouponFiltered = this.selectedCoupons.filter(coupon => coupon.bond.includes('Dialed')===false)
            else this.selectedCouponFiltered = this.selectedCoupons;
        }

        // if(changes.selectedCoupons && changes.selectedCoupons.currentValue) {
        //     if(this.mode==='dialedTypeMode') this.selectedCouponFiltered = this.selectedCoupons.filter(coupon => coupon.bond.includes('CC')===false)
        //     else this.selectedCouponFiltered = this.selectedCoupons;
        // }
    }

    ngOnDestroy() {
        if (this.plotsSubscription) {
            this.plotsSubscription.unsubscribe();
        }
        if (this.plotTypeSubscription) {
            this.plotTypeSubscription.unsubscribe();
        }
        if (this.metricTypeSubscription) {
            this.metricTypeSubscription.unsubscribe();
        }
    }

    public loadChart(coupon: fromModels.OASCoupon): void {
        this.store.dispatch(new fromStore.LoadChartData({requestType: this.plotType, coupon: coupon}));
    }

    public loadChartComparison(coupon: fromModels.OASCoupon): void {
        this.store.dispatch(new fromStore.LoadComparisonChartData({requestType: this.plotType, coupon: coupon}));
    }

    public chartRendered(result: fromModels.PlotDataResult): void {
        this.store.dispatch(new fromStore.RenderChartComplete(result));
    }

    public comparisonChartRendered(result: fromModels.PlotDataResult): void {
        this.store.dispatch(new fromStore.RenderComparisonChartComplete(result));
    }

    public chartCompare(coupons: fromModels.OASCoupon[]): void {
        this.store.dispatch(new fromStore.CompareCoupons(coupons));
    }

    public clearComparison(coupon: fromModels.OASCoupon): void {
        this.store.dispatch(new fromStore.ClearComparison(coupon));
    }

    private renderCharts(results: fromModels.PlotDataResult[]): fromModels.PlotDataResult[] {
        results.map((result) => {
            if (this.plotViews) {
                this.plotViews.filter((plotView: fromPlotView.TimeseriesPlotComponent) => {
                    if (plotView.coupon.coupon === result.coupon) {
                        plotView.renderChart(result, this.plotType);
                    }
                });
            }
        });
        return results;
    }

    private loadAndRenderCharts(): void {
        if (this.plotViews) {
            this.plotViews.map((plotView: fromPlotView.TimeseriesPlotComponent) => {
                plotView.loadAndRenderChart();
            });
        }
    }
}
