import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef, MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { MatSelectChange } from '@angular/material/select';
import { Observable, Subscription } from 'rxjs';

import { Store } from '@ngrx/store';

import * as fromStore from './../../store';

@Component({
    selector: 'app-credit-package-layout',
    templateUrl: './credit-package-layout.component.html',
    styleUrls: ['./credit-package-layout.component.scss']
})
export class CreditPackageLayoutComponent implements OnInit, OnDestroy {

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

        this.dates$ = this.store.select(fromStore.getCreditAnalyticsDates);
        this.datesLoading$ = this.store.select(fromStore.getCreditAnalyticsDatesLoadingStatus);
        this.datesLoaded$ = this.store.select(fromStore.getCreditAnalyticsDatesLoadedStatus);
        this.datesError$ = this.store.select(fromStore.getCreditAnalyticsDatesError);
        this.selectedDate$ = this.store.select(fromStore.getCreditAnalyticsSelectedDate);
        this.uniqueColumnSetNames$ = this.store.select(fromStore.getCreditAnalyticsUniqueColumnSetNames);

        this.analytics$ = this.store.select(fromStore.getCreditAnalytics);
        this.analyticsLoading$ = this.store.select(fromStore.getCreditAnalyticsLoadingStatus);
        this.analyticsLoaded$ = this.store.select(fromStore.getCreditAnalyticsLoadedStatus);
        this.analyticsError$ = this.store.select(fromStore.getCreditAnalyticsError);

        this.subscription = this.selectedDate$.subscribe(selectedDate => this.selectedDate = selectedDate);
    }

    ngOnInit(): void { }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    dateSelected(event: MatSelectChange) {
        this.store.dispatch(new fromStore.LoadCreditAnalytics(event.value));
        this.store.dispatch(new fromStore.LoadCreditTimeseries(event.value));
    }

    viewTimeSeries(): void {
        this.store.dispatch(new fromStore.LoadCreditTimeseries(this.selectedDate));
    }
}
