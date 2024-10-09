import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription, combineLatest } from 'rxjs';

// import { timer } from 'rxjs/observable/timer';
// import 'rxjs/add/observable/combineLatest';

import * as fromModels from '../../models';
import * as fromStore from '../../store';

@Component({
    selector: 'app-tbareports-timeseries-container',
    templateUrl: './timeseries-container.component.html',
    styleUrls: ['./timeseries-container.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class TimeseriesContainerComponent implements OnInit, OnDestroy {

    public mode$: Observable<string>;

    public series$: Observable<fromModels.OASTimeseries[]>;
    public coupons$: Observable<fromModels.OASCoupon[]>;
    public metricTypes$: Observable<fromModels.MetricType[]>;

    public selectedSeries$: Observable<fromModels.OASTimeseries>;
    public selectedCoupons$: Observable<fromModels.OASCoupon[]>;
    public selectedMetricType$: Observable<string>;
    public selectedMetricType: string;
    public trackerMode = false;
    public trackerDialedMode = false;

    public oasCacheSuccessStatus$: Observable<string>;
    public oasCacheFailedStatus$: Observable<string>;
    public tsyCacheSuccessStatus$: Observable<string>;
    public tsyCacheFailedStatus$: Observable<string>;
    public oasCacheRefreshingStatus$: Observable<boolean>;
    public tsyOasCacheRefreshingStatus$: Observable<boolean>;

    public trackerTimestamp$: Observable<string>;

    private selectedSeries: string;
    private subscriptions: Subscription[] = [];

    private selectedPlotType: string;

    constructor(private store: Store<fromStore.TBAReportsState>) {

        this.mode$ = store.select(fromStore.getActiveMode);

        this.series$ = store.select(fromStore.getTimeseries);
        this.coupons$ = store.select(fromStore.getCoupons);
        this.metricTypes$ = store.select(fromStore.getMetricTypesEntities);
        this.trackerTimestamp$ = store.select(fromStore.getTrackerTimestamp);

        this.selectedSeries$ = store.select(fromStore.getSelectedTimeseries);
        this.selectedCoupons$ = store.select(fromStore.getSelectedCoupons);
        this.selectedMetricType$ = store.select(fromStore.getSelectedMetricType);
        this.subscriptions.push(
            this.selectedMetricType$.subscribe(selectedMetricType => this.selectedMetricType = selectedMetricType)
        );

        this.oasCacheSuccessStatus$ = store.select(fromStore.getOASCacheSuccess);
        this.oasCacheFailedStatus$ = store.select(fromStore.getOASCacheError);
        this.oasCacheRefreshingStatus$ = store.select(fromStore.getOASCacheRefreshing);

        this.tsyCacheSuccessStatus$ = store.select(fromStore.getTSYCacheSuccess);
        this.tsyCacheFailedStatus$ = store.select(fromStore.getTSYCacheError);
        this.tsyOasCacheRefreshingStatus$ = store.select(fromStore.getTsyOASCacheRefreshing);


        this.subscriptions.push(combineLatest(this.oasCacheSuccessStatus$, this.oasCacheFailedStatus$,
            this.tsyCacheSuccessStatus$, this.tsyCacheFailedStatus$)
            .subscribe(([oasSuccess, oasFailed, tsySuccess, tsyFailed]) => {
                setTimeout(() => {
                    if (oasSuccess) { this.store.dispatch(new fromStore.ClearCacheStatus('oasSuccess')); }
                    if (oasFailed) { this.store.dispatch(new fromStore.ClearCacheStatus('oasFailed')); }
                    if (tsySuccess) { this.store.dispatch(new fromStore.ClearCacheStatus('tsySuccess')); }
                    if (tsyFailed) { this.store.dispatch(new fromStore.ClearCacheStatus('tsyFailed')); }
                }, 5000);

            })
        );

        // const combined$ = Observable.combineLatest(this.oasCacheSuccessStatus$, this.oasCacheFailedStatus$,
        //     this.tsyCacheSuccessStatus$, this.tsyCacheFailedStatus$, );

        // combined$.subscribe(([oasSuccess, oasFailed, tsySuccess, tsyFailed]) => {
        //     setTimeout(() => {
        //         if (oasSuccess) { this.store.dispatch(new fromStore.ClearCacheStatus('oasSuccess')); }
        //         if (oasFailed) { this.store.dispatch(new fromStore.ClearCacheStatus('oasFailed')); }
        //         if (tsySuccess) { this.store.dispatch(new fromStore.ClearCacheStatus('tsySuccess')); }
        //         if (tsyFailed) { this.store.dispatch(new fromStore.ClearCacheStatus('tsyFailed')); }
        //     }, 5000);
        // });
    }

    ngOnInit() { }

    ngOnDestroy() {
        if (this.subscriptions.length > 1) {
            this.subscriptions.forEach(subscription => subscription.unsubscribe());
        }
    }

    selectSeries(series: fromModels.OASTimeseries): void {
        this.store.dispatch(new fromStore.SelectTimeseries(series));
    }

    changePlotType(plotType: string): void {
        this.store.dispatch(new fromStore.ChangePlotType({type: plotType}));
    }

    changeMetricType(metricType: string): void {
        this.store.dispatch(new fromStore.SelectMetricType(metricType));
    }

    // trackerModeChanged(trackerMode: boolean) {
    //     this.trackerMode = trackerMode;
    //     if (this.trackerMode) {
    //         this.store.dispatch(new fromStore.LoadTrackerTimestamp());
    //     }
    // }
    modeChanged(mode: string) {
        this.store.dispatch(new fromStore.SetActiveMode(mode));
        if(mode==='trackerTypeMode' || mode === 'dialedTypeMode' || mode=== 'v99TypeMode') {
            this.store.dispatch(new fromStore.LoadTrackerTimestamp());
        }
    }

    reloadCharts(e: any): void {
        this.store.dispatch(new fromStore.LoadCoupons());
        if (e) {
            e.preventDefault();
        }
    }

    refreshData(e: any): void {
        this.store.dispatch(new fromStore.RefreshCache('OAS'));
        this.store.dispatch(new fromStore.RefreshCache('TSYOAS'));
        if (e) {
            e.preventDefault();
        }
    }

    clearStatus(status: string): void {
        this.store.dispatch(new fromStore.ClearCacheStatus(status));
    }

    downloadTracker(): void {
        this.store.dispatch(new fromStore.DownloadTrackers());
    }
}
