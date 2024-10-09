import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import * as fromStore from './../../store';
import * as fromModels from './../../models/snr-dashboard.models';
import { Store } from '@ngrx/store';

@Component({
    selector: 'app-snr-macro-dashboards-layout',
    templateUrl: './snr-macro-dashboards-layout.component.html',
    styleUrls: ['./snr-macro-dashboards-layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SNRMacroDashboardsLayoutComponent implements OnInit, OnDestroy {

    @Input() macroRun: Observable<fromModels.IMacroRun>;

    public subscriptions: Subscription[] = [];

    // public macroRunLoading$: Observable<boolean>;
    // public macroRunLoaded$: Observable<boolean>;
    // public macroRunQuarterlyGDP$: Observable<any[]>;
    // public macroRunMonthlyGDP$: Observable<any[]>;
    // public macroRunMonthlyInflation$: Observable<any[]>;

    constructor(private store: Store<fromStore.State>) {
        this.macroRun = this.store.select(fromStore.getSNRMacroRunSelectedMacroRun);

        // this.subscriptions.push(this.macroRun
        //     .subscribe((macroRun) => {
        //         if (macroRun) {
        //              this.store.dispatch(new fromStore.LoadMacroRunResults(macroRun));
        //         }
        // }));
    }

    ngOnInit(): void {
        // this.macroRunLoading$ = this.store.select(fromStore.getSNRMacroRunResultsLoading);
        // this.macroRunLoaded$ = this.store.select(fromStore.getSNRMacroRunResultsLoaded);
        // this.macroRunQuarterlyGDP$ = this.store.select(fromStore.getSNRMacroRunQuarterlyGDP);
        // this.macroRunMonthlyGDP$ = this.store.select(fromStore.getSNRMacroRunMonthlyGDP);
        // this.macroRunMonthlyInflation$ = this.store.select(fromStore.getSNRMacroRunMonthlyInflation);
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((subscription) => {
            subscription.unsubscribe();
        });
    }
}
