import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef, MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { MatSelectChange } from '@angular/material/select';
import { Observable, Subscription } from 'rxjs';

import { Store } from '@ngrx/store';

import * as fromStore from '../../store';

@Component({
    selector: 'app-inflation-package-layout',
    templateUrl: './inflation-package-layout.component.html',
    styleUrls: ['./inflation-package-layout.component.scss']
})
export class InflationPackageLayoutComponent implements OnInit, OnDestroy {

    @HostBinding('class') classes = 'standard-grid-layout';

    public dates$: Observable<string[]>;
    public datesLoading$: Observable<boolean>;
    public datesLoaded$: Observable<boolean>;
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

        this.dates$ = this.store.select(fromStore.getInflationAnalyticsDates);
        this.datesLoading$ = this.store.select(fromStore.getInflationAnalyticsDatesLoadingStatus);
        this.datesLoaded$ = this.store.select(fromStore.getInflationAnalyticsDatesLoadedStatus);
        this.datesError$ = this.store.select(fromStore.getInflationAnalyticsDatesError);
        this.selectedDate$ = this.store.select(fromStore.getInflationAnalyticsSelectedDate);
        this.uniqueColumnSetNames$ = this.store.select(fromStore.getInflationAnalyticsUniqueColumnSetNames);

        this.analytics$ = this.store.select(fromStore.getInflationAnalytics);
        this.analyticsLoading$ = this.store.select(fromStore.getInflationAnalyticsLoadingStatus);
        this.analyticsLoaded$ = this.store.select(fromStore.getInflationAnalyticsLoadedStatus);
        this.analyticsError$ = this.store.select(fromStore.getInflationAnalyticsError);

        this.subscription = this.selectedDate$.subscribe(selectedDate => this.selectedDate = selectedDate);
    }

    ngOnInit(): void { }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    dateSelected(event: MatSelectChange) {
        this.store.dispatch(new fromStore.LoadInflationAnalytics(event.value));
    }

    viewTimeSeries(): void {
        this.store.dispatch(new fromStore.LoadInflationTimeseries(this.selectedDate));
    }
}
