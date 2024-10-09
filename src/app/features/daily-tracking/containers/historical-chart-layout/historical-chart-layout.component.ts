import { ChangeDetectionStrategy, Component, HostBinding, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import * as fromModels from '../../models/daily-tracking.models';
import * as fromStore from '../../store';
import { Observable, Subscription } from 'rxjs';
import { MatDatepicker, MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatSidenav } from '@angular/material/sidenav';
import { MBSHistoricalChartComponent } from '../../components/historical-chart/historical-chart.component';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
    selector: 'app-mbs-historical-chart-layout',
    templateUrl: './historical-chart-layout.component.html',
    styleUrls: ['./historical-chart-layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MBSHistoricalChartLayoutComponent implements OnInit, OnDestroy {

    @HostBinding('class') class = 'vertical-flex-full-height';
    @ViewChild('picker', { static: true }) _picker: MatDatepicker<Date>;
    @ViewChild('sidenav', { static: false }) sidenav: MatSidenav;
    @ViewChild('chart', { static: false }) _chart: MBSHistoricalChartComponent;

    public request: fromModels.EODRequest;
    public metaData: fromModels.EODMetaData;
    
    public historicalPlot$: Observable<any>;
    public historicalPlotLoading$: Observable<boolean>;
    public historicalPlotLoaded$: Observable<boolean>;
    public historicalPlotError$: Observable<string>;

    public start6m: Date = this.addMonths(new Date(), -6) ;
    public start3m: Date = this.addMonths(new Date(), -3);
    public end: Date = new Date();

    public CLOSE_ON_SELECTED = false;

    public dateRange = new FormGroup({
        start: new FormControl(this.start6m),
        end: new FormControl(this.end),
    });

    public subscriptions$: Subscription[]= [];

    constructor(private store: Store<fromStore.DailyTrackingState>) {

        var data: string = window.localStorage.getItem('dailyTrackingChartEOD');
        if (data) {
            // Get this from the window params
            debugger;
            const param: fromModels.EODRequestAndMetaData = JSON.parse(data)
            this.request = param.request;
            this.metaData = param.metaData;
            if (this.request.useCumulative !== undefined && this.request.useCumulative === true) { 
                this.dateRange.setControl('start', new FormControl(this.start3m));
            } else { 
                this.dateRange.setControl('start', new FormControl(this.start6m));
            }
        }
        
        this.historicalPlot$ = this.store.select(fromStore.getTrackingHistoricalPlot);
        this.historicalPlotLoading$ = this.store.select(fromStore.getTrackingHistoricalPlotLoading);
        this.historicalPlotLoaded$ = this.store.select(fromStore.getTrackingHistoricalPlotLoaded);
        this.historicalPlotError$ = this.store.select(fromStore.getTrackingHistoricalPlotError);
    }

    ngOnInit(): void {
        this.loadHistoricalTimeseries(this.request);
    }

    ngOnDestroy(): void {        
    }

    onCloseClick(event: any) {
        // this.dialogRef.close();
    }

    onShowTimeseriesSelector(): void { 
        this.sidenav.open();
    }

    public dateChanged(event: MatDatepickerInputEvent<Date>): void {
        if (event.value && this.request) {            
            const start = this.dateRange.value.start;
            const end = this.dateRange.value.end;

            let startDate: string = '';
            let endDate: string = '';

            if (start) { 
                startDate = start.toLocaleDateString();                
            }
            if (end) { 
                endDate = end.toLocaleDateString();
            }

            if (startDate !== '' && endDate !== '') { 
                this._chart.clearChart();
                const newRequest = Object.assign({}, this.request, { startDate: startDate, endDate: endDate })
                this.loadHistoricalTimeseries(newRequest);
            }
        }        
    }

    private loadHistoricalTimeseries(param: fromModels.EODRequest): void {
        if (param) { 
            this.store.dispatch(new fromStore.LoadHistoricalPlot(param));
        }
    }

    private addMonths(date: Date, n: number): Date { 
        date.setMonth(date.getMonth() + n);
        return date;
    }
}
