import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild, HostBinding } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, combineLatest, Observable, Subscription } from 'rxjs';

import * as moment from 'moment';
import * as fromModels from './../../models';
import * as fromStore from './../../store';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
    selector: 'app-timeseries-exporter-layout',
    templateUrl: './timeseries-exporter-layout.component.html',
    styleUrls: ['./timeseries-exporter-layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimeseriesExporterLayoutComponent implements OnInit, OnDestroy {

    @ViewChild('sidenav') sidenav: MatSidenav;
    @HostBinding('class') class = 'full-strech-block';

    public params$: Observable<fromModels.IDateRange>;
    public monitors$: Observable<fromModels.IMonitor[]>;
    public monitorsLoading$: Observable<boolean>;
    public monitorsLoaded$: Observable<boolean>;
    public monitorsError$: Observable<string>;

    public selectedMonitor$: Observable<fromModels.IMonitor>;

    public timeseries$: Observable<any[]>;
    public timeseriesLoading$: Observable<boolean>;
    public timeseriesLoaded$: Observable<boolean>;
    public timeseriesError$: Observable<String>;

    public viewMode$: BehaviorSubject<'table' | 'chart'> = new BehaviorSubject<'table' | 'chart'>('table');

    public Subscriptions$: Subscription[] = [];

    public sidePaneView = 'items';

    constructor(private store: Store<fromStore.TimeseriesExporterState>) {

        this.params$ = this.store.select(fromStore.getParams);

        this.monitors$ = this.store.select(fromStore.getMonitors);
        this.monitorsLoading$ = this.store.select(fromStore.getMonitorsLoadingStatus);
        this.monitorsLoaded$ = this.store.select(fromStore.getMonitorsLoadedStatus);
        this.monitorsError$ = this.store.select(fromStore.getMonitorsErrorStatus);

        this.selectedMonitor$ = this.store.select(fromStore.getSelectedMonitorEntity);

        this.timeseries$ = this.store.select(fromStore.getTimeseries);
        this.timeseriesLoading$ = this.store.select(fromStore.getTimeseriesLoading);
        this.timeseriesLoaded$ = this.store.select(fromStore.getTimeseriesLoaded);
        this.timeseriesError$ = this.store.select(fromStore.getTimeseriesError);

        this.Subscriptions$.push(
            combineLatest(this.params$, this.selectedMonitor$).subscribe(
                ([params, selectedMonitor]) => {
                    if (params && selectedMonitor) {
                        const startDate = moment(params.startDate).format('MM-DD-YYYY');
                        const endDate = moment(params.endDate).format('MM-DD-YYYY');
                        const request: fromModels.ITimeseriesRequest = {
                            'startDate': startDate,
                            'endDate': endDate,
                            'monitorName': selectedMonitor.name
                        };
                        this.store.dispatch(new fromStore.LoadTimeseries(request));
                    }
                })
        );
    }

    ngOnInit(): void { }

    ngOnDestroy(): void {
        this.Subscriptions$.forEach(subscription => {
            subscription.unsubscribe();
        });
    }

    changeParams(params: fromModels.IDateRange): void {
        this.store.dispatch(new fromStore.ChangeParams(params));
    }

    selectMonitor(monitor: string): void {
        this.store.dispatch(new fromStore.SelectMonitor(monitor));
    }

    changeViewMode(viewMode: 'table' | 'chart'): void {
        this.viewMode$.next(viewMode);
    }

    toggleSidePane(view: 'items'): void {
        this.sidenav.open();
        this.sidePaneView = view;
    }
}
