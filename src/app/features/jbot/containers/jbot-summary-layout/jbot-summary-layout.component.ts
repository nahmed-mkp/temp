import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscribable, Subscription } from 'rxjs';
import { MatSelectChange } from '@angular/material/select';
import { MatLegacySlideToggleChange as MatSlideToggleChange } from '@angular/material/legacy-slide-toggle';

import * as fromStore from './../../store';
import * as fromModels from '../../models';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-jbot-summary-layout',
    templateUrl: './jbot-summary-layout.component.html',
    styleUrls: ['./jbot-summary-layout.component.scss']
})
export class JBotSummaryLayoutComponent implements OnInit, OnDestroy {

    public asOfDates$: Observable<string[]>;
    public asOfDatesLoadingStatus$: Observable<boolean>;
    public asOfDatesLoadedStatus$: Observable<boolean>;
    public activeAsOfDate$: Observable<string>;
    private activeAsOfDate: string;

    public sortBy = 'Instrument';
    public showHeatMap = false;

    public jbotSummary$: Observable<fromModels.JbotSummaryGridData[]>;
    public jbotSummaryLoadingStatus$: Observable<boolean>;

    private subscription: Subscription;

    constructor(private store: Store<fromStore.JbotState>, private route: ActivatedRoute, private router: Router) { }

    ngOnInit(): void {
        this.asOfDates$ = this.store.select(fromStore.getJbotSummaryAsOfDates);
        this.asOfDatesLoadingStatus$ = this.store.select(fromStore.getJbotSummaryAsOfDateLoadingStatus);
        this.asOfDatesLoadedStatus$ = this.store.select(fromStore.getJbotSummaryAsOfDateLoadedStatus);
        this.activeAsOfDate$ = this.store.select(fromStore.getJbotSummaryActiveAsOfDate);
        this.subscription = this.activeAsOfDate$.subscribe(activeAsOfDate => {
            if (activeAsOfDate) {
                this.activeAsOfDate = activeAsOfDate.split('/').join('-');
            }
        });

        this.jbotSummary$ = this.store.select(fromStore.getActiveJbotSummary);
        this.jbotSummaryLoadingStatus$ = this.store.select(fromStore.getJbotSummaryLoadingStatus);
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    onAsOfDateChange(event: MatSelectChange) {
        this.store.dispatch(new fromStore.SetJbotSummaryActiveAsOfDate(event.value));
        this.store.dispatch(new fromStore.LoadJbotSummary(event.value));
    }

    onSortChanged(event: MatSelectChange) {
        this.sortBy = event.value;
    }

    onShowHeatMapChanged(event: MatSlideToggleChange) {
        this.showHeatMap = event.checked;
    }

    onSelectItem(payload: {instrument: string; signal: string}) {
        console.log('try to jump to route', payload);
        let link;
        if (payload.signal === 'JBotSignal') {
            link = 'general';
        } else if (payload.signal === 'JBotTechSignal') {
            link = 'tech';
        } else if (payload.signal === 'JDataMonitorSignal') {
            link = 'monitor';
        };
        this.router.navigate([`/app/jbot/${link}`, {activeAsOfDate: this.activeAsOfDate, instrument: payload.instrument, }]);
    }
}
