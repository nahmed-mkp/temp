import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef, MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { MatSelectChange } from '@angular/material/select';
import { Observable, Subscription } from 'rxjs';

import { Store } from '@ngrx/store';

import * as fromStore from './../../store';
import * as fromModels from './../../models/equities.models';

@Component({
    selector: 'app-equities-package-layout',
    templateUrl: './equities-package-layout.component.html',
    styleUrls: ['./equities-package-layout.component.scss'],
})
export class EquitiesPackageLayoutComponent implements OnInit, OnDestroy {

    @HostBinding('class') classes = 'standard-grid-layout';

    public dates$: Observable<string[]>;
    public datesLoaded$: Observable<boolean>;
    public datesLoading$: Observable<boolean>;
    public datesError$: Observable<string>;
    public selectedDate$: Observable<string>;

    public uniqueColumnSetNames$: Observable<string[]>;
    public selectedColumnSet = 'all';

    public analytics$: Observable<any[]>;
    public analyticsLoading$: Observable<boolean>;
    public analyticsLoaded$: Observable<boolean>;
    public analyticsError$: Observable<string>;

    private subscription: Subscription;
    private selectedDate: string;

    constructor(private store: Store<fromStore.MacroAnalyticsState>) {
        this.dates$ = this.store.select(fromStore.getEquitiesAnalyticsDates);
        this.datesLoading$ = this.store.select(fromStore.getEquitiesAnalyticsDatesLoading);
        this.datesLoaded$ = this.store.select(fromStore.getEquitiesAnalyticsDatesLoaded);
        this.datesError$ = this.store.select(fromStore.getEquitiesAnalyticsDatesError);
        this.selectedDate$ = this.store.select(fromStore.getEquitiesAnalyticsSelectedDate);
        this.uniqueColumnSetNames$ = this.store.select(fromStore.getEquitiesAnalyticsUniqueColumnSetNames);

        this.analytics$ = this.store.select(fromStore.getEquitiesAnalytics);
        this.analyticsLoading$ = this.store.select(fromStore.getEquitiesAnalyticsLoadingStatus);
        this.analyticsLoaded$ = this.store.select(fromStore.getEquitiesAnalyticsLoadedStatus);
        this.analyticsError$ = this.store.select(fromStore.getEquitiesAnalyticsError);

        this.subscription = this.selectedDate$.subscribe(selectedDate => this.selectedDate = selectedDate);
    }

    ngOnInit(): void { }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    dateSelected(event: MatSelectChange) {
        this.store.dispatch(new fromStore.LoadEquityAnalytics(event.value));
    }

    viewTimeSeries(ticker: string): void {
        this.store.dispatch(new fromStore.LoadEquityIndexTimeseries({
            asOfDate: this.selectedDate,
            index: ticker,
        }));
    }

    viewTimeSeriesSector(payload: {index: string; sector: string}) {
        this.store.dispatch(new fromStore.LoadEquitySectorTimeseries({
            asOfDate: this.selectedDate,
            index: payload.index,
            sector: payload.sector
        }));
    }

}
