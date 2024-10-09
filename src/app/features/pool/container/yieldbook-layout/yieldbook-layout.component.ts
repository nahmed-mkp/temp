import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import * as fromStore from './../../store';
import * as fromModels from './../../models/yieldbook.models';

@Component({
    selector: 'app-yieldbook-layout',
    templateUrl: './yieldbook-layout.component.html',
    styleUrls: ['./yieldbook-layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class YieldbookLayoutComponent implements OnInit, OnDestroy {

    public selectedDate$: Observable<string>;
    public selectedRequestedLog$: Observable<number>;

    public requestLogs$: Observable<fromModels.IYieldbookRequestLog[]>;
    public requestLogsLoading$: Observable<boolean>;
    public requestLogsLoaded$: Observable<boolean>;
    public requestLogsError$: Observable<string>;

    public loadedRequests: number[];
    public loadedResponses: number[];

    public loadedRequestSubscription$: Subscription;
    public loadedResponseSubscription$: Subscription;

    constructor(private store: Store<fromStore.AgencyAnalyticsState>) {

        this.selectedDate$ = this.store.select(fromStore.getYieldbookSelectedDate);
        this.selectedRequestedLog$ = this.store.select(fromStore.getYieldbookSelectedRequestLog);

        this.requestLogs$ = this.store.select(fromStore.getYieldbookRequestLogs);
        this.requestLogsLoading$ = this.store.select(fromStore.getYieldbookRequestLogsLoadingStatus);
        this.requestLogsLoaded$ = this.store.select(fromStore.getYieldbookRequestLogsLoadedStatus);
        this.requestLogsError$ = this.store.select(fromStore.getYieldbookRequestLogsError);

        this.loadedRequestSubscription$ = this.store.select(fromStore.getYieldbookRequestIds)
            .subscribe((requests) => {
                this.loadedRequests = [...requests];
            });

        this.loadedResponseSubscription$ = this.store.select(fromStore.getYieldbookResponseIds)
            .subscribe((responses) => {
                this.loadedResponses = [...responses];
            });
    }

    ngOnInit(): void { }

    ngOnDestroy(): void {
        if (this.loadedRequestSubscription$) {
            this.loadedRequestSubscription$.unsubscribe();
        }

        if (this.loadedResponseSubscription$) {
            this.loadedResponseSubscription$.unsubscribe();
        }
    }

    selectDate(date: string): void {
        if (date) {
            this.store.dispatch(new fromStore.LoadYieldbookRequestLogsByDate(date));
        }
    }

    selectRequestLog(requestLog: fromModels.IYieldbookRequestLog): void {
        if (requestLog) {
            if (!this.loadedRequests.includes(requestLog.yieldBookRequestID)) {
                this.store.dispatch(new fromStore.LoadYieldbookRequestById(requestLog.yieldBookRequestID));
            }
            if (!this.loadedResponses.includes(requestLog.yieldBookRequestID)) {
                this.store.dispatch(new fromStore.LoadYieldbookResponseById(requestLog.yieldBookRequestID));
            }
        }
    }
}
