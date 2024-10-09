import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef, MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { MatSelectChange } from '@angular/material/select';
import { Observable, Subscription } from 'rxjs';

import { Store } from '@ngrx/store';

import * as fromStore from '../../store';

@Component({
    selector: 'app-commodities-package-layout',
    templateUrl: './commodities-package-layout.component.html',
    styleUrls: ['./commodities-package-layout.component.scss']
})
export class CommoditiesPackageLayoutComponent implements OnInit, OnDestroy {

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

        this.dates$ = this.store.select(fromStore.getCommoditiesAnalyticsDates);
        this.datesLoading$ = this.store.select(fromStore.getCommoditiesAnalyticsDatesLoadingStatus);
        this.datesLoaded$ = this.store.select(fromStore.getCommoditiesAnalyticsDatesLoadedStatus);
        this.datesError$ = this.store.select(fromStore.getCommoditiesAnalyticsDatesError);
        this.selectedDate$ = this.store.select(fromStore.getCommoditiesAnalyticsSelectedDate);
        this.uniqueColumnSetNames$ = this.store.select(fromStore.getCommoditiesAnalyticsUniqueColumnSetNames);

        this.analytics$ = this.store.select(fromStore.getCommoditiesAnalytics);
        this.analyticsLoading$ = this.store.select(fromStore.getCommoditiesAnalyticsLoadingStatus);
        this.analyticsLoaded$ = this.store.select(fromStore.getCommoditiesAnalyticsLoadedStatus);
        this.analyticsError$ = this.store.select(fromStore.getCommoditiesAnalyticsError);

        this.subscription = this.selectedDate$.subscribe(selectedDate => this.selectedDate = selectedDate);
    }

    ngOnInit(): void { }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    dateSelected(event: MatSelectChange) {
        this.store.dispatch(new fromStore.LoadCommoditiesAnalytics(event.value));
    }

    viewTimeSeries(): void {
        this.store.dispatch(new fromStore.LoadCommoditiesTimeseries(this.selectedDate));
    }
}
