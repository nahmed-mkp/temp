import { ChangeDetectionStrategy, Component, HostBinding, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import * as fromModels from '../../models/daily-tracking.models';
import * as fromStore from './../../store';
import { Observable, Subscription } from 'rxjs';
import { MatDatepicker, MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatSidenav } from '@angular/material/sidenav';
import { MBSIntradayChartComponent } from '../../components/intraday-chart/intraday-chart.component';


@Component({
    selector: 'app-mbs-intraday-chart-layout',
    templateUrl: './intraday-chart-layout.component.html',
    styleUrls: ['./intraday-chart-layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MBSIntradayChartLayoutComponent implements OnInit, OnDestroy {

    @HostBinding('class') class = 'vertical-flex-full-height';
    @ViewChild('picker', { static: true }) _picker: MatDatepicker<Date>;
    @ViewChild('sidenav', { static: false }) sidenav: MatSidenav;
    @ViewChild('chart', { static: false }) _chart: MBSIntradayChartComponent;

    public request: fromModels.IntradayRequest;
    public metaData: fromModels.IntradayMetaData;
    
    public intradayPlot$: Observable<any>;
    public intradayPlotLoading$: Observable<boolean>;
    public intradayPlotLoaded$: Observable<boolean>;
    public intradayPlotError$: Observable<string>;

    public CLOSE_ON_SELECTED = false;
    public resetModel = new Date();
    public selectedDates = [
        new Date()
    ];

    public REFRESH_FREQUENCY = 5 * 1000; // Every N Seconds

    private _interval: any;

    public subscriptions$: Subscription[]= [];

    constructor(private store: Store<fromStore.DailyTrackingState>) {

        var data: string = window.localStorage.getItem('dailyTrackingChart');
        if (data) {
            // Get this from the window params
            const param: fromModels.IntradayRequestAndMetaData = JSON.parse(data)
            this.request = param.request;
            this.metaData = param.metaData;
        }
        
        this.intradayPlot$ = this.store.select(fromStore.getTrackingIntrdayPlot);
        this.intradayPlotLoading$ = this.store.select(fromStore.getTrackingIntrdayPlotLoading);
        this.intradayPlotLoaded$ = this.store.select(fromStore.getTrackingIntrdayPlotLoaded);
        this.intradayPlotError$ = this.store.select(fromStore.getTrackingIntrdayPlotError);
    }

    ngOnInit(): void {
        this.loadIntradayTimeseries(this.request);
        this.startRefresh();        
    }

    ngOnDestroy(): void {
        this.clearRefresh();
    }

    onCloseClick(event: any) {
        // this.dialogRef.close();
    }

    onShowTimeseriesSelector(): void { 
        this.sidenav.open();
    }

    public startRefresh(): void { 
        this.clearRefresh();
        this._interval = setInterval(() => {
            this.loadIntradayTimeseries(this.request)
        }, this.REFRESH_FREQUENCY)
    }

    public clearRefresh(): void { 
        if (this._interval) { 
            clearInterval(this._interval);
        }
    }

    public dateClass = (date: Date) => {
        if (this._findDate(date) !== -1) {
            return ['selected'];
        }
        return [];
    }

    public dateChanged(event: MatDatepickerInputEvent<Date>): void {
        if (event.value) {
            const date = event.value;
            const index = this._findDate(date);
            if (index === -1) {
                this.selectedDates.push(date);
            } else {
                this.selectedDates.splice(index, 1)
            }
            this.resetModel = new Date();
            if (!this.CLOSE_ON_SELECTED) {
                const closeFn = this._picker.close;
                this._picker.close = () => { };
                //this._picker['_popupComponentRef'].instance._calendar.monthView._createWeekCells()
                setTimeout(() => {
                    this._picker.close = closeFn;
                });
            }
        }

        this._chart.clearChart();
        
        const newRequest = Object.assign({}, this.request, {'dates': [...this.selectedDates]})
        this.store.dispatch(new fromStore.LoadIntradayPlot(newRequest));
    }

    public remove(date: Date): void {
        const index = this._findDate(date);
        this.selectedDates.splice(index, 1)
    }

    private _findDate(date: Date): number {
        return this.selectedDates.map((m) => +m).indexOf(+date);
    }

    private loadIntradayTimeseries(param: fromModels.IntradayRequest): void {
        if (param) { 
            this.store.dispatch(new fromStore.LoadIntradayPlot(param));
        }
    }
}
