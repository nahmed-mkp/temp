import { Component, OnInit, ChangeDetectionStrategy, ViewChild, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromStore from '../../store';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-tracking-history-charts-layout',
    templateUrl: './tracking-history-charts-layout.component.html',
    styleUrls: ['./tracking-history-charts-layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrackingHistoryChartsLayoutComponent implements OnInit, OnChanges {

    @Input() chartType: string;

    // OHLC
    public ohlc$: Observable<any[]>;
    public ohlcLoading$: Observable<boolean>;
    public ohlcLoaded$: Observable<boolean>;
    public ohlcError$: Observable<string>;

    // Median by time of day
    public medianByTimeOfDay$: Observable<any[]>;
    public medianByTimeOfDayLoading$: Observable<boolean>;
    public medianByTimeOfDayLoaded$: Observable<boolean>;
    public medianByTimeOfDayError$: Observable<string>;

    constructor(private store: Store<fromStore.DailyTrackingState>) {

        // OHLC
        this.ohlc$ = this.store.select(fromStore.getOHLC);
        this.ohlcLoading$ = this.store.select(fromStore.getOHLCLoading);
        this.ohlcLoaded$ = this.store.select(fromStore.getOHLCLoaded);
        this.ohlcError$ = this.store.select(fromStore.getOHLCError);

        // Median by time of day
        this.medianByTimeOfDay$ = this.store.select(fromStore.getMedianByTimeOfDay);
        this.medianByTimeOfDayLoading$ = this.store.select(fromStore.getMedianByTimeOfDayLoading);
        this.medianByTimeOfDayLoaded$ = this.store.select(fromStore.getMedianByTimeOfDayLoaded);
        this.medianByTimeOfDayError$ = this.store.select(fromStore.getMedianByTimeOfDayError);
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes && changes.chartType && changes.chartType.currentValue) {
            switch (changes.chartType.currentValue) {
                case 'OHLC':
                    this.store.dispatch(new fromStore.LoadOHLC());
                    break;
                case 'Median levels (hourly)':
                    this.store.dispatch(new fromStore.LoadMedianByTimeOfDay());
                    break;
                default:
                    break;
            }
        }
    }

    ngOnInit() {
    }
}
