import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, combineLatest } from 'rxjs';
// import { timer } from 'rxjs/observable/timer';
// import 'rxjs/add/observable/combineLatest';

import * as fromModels from '../../models';
import * as fromStore from '../../store';

@Component({
    selector: 'app-tbareports-parser-container',
    templateUrl: './parser-container.component.html',
    styleUrls: ['./parser-container.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ParserContainerComponent implements OnInit {

    public missingDates$: Observable<fromModels.MissingDate[]>;
    public request$: Observable<fromModels.ParserRequest>;
    public results$: Observable<fromModels.ParserResult>;
    public error$: Observable<string>;
    public isRequestValid$: Observable<boolean>;
    public cacheKey$: Observable<string>;
    public completionStatus$: Observable<string>;

    public steps$: Observable<fromModels.Step[]>;
    public currentStep$: Observable<fromModels.Step>;

    public oasCacheSuccessStatus$: Observable<string>;
    public oasCacheFailedStatus$: Observable<string>;
    public tsyCacheSuccessStatus$: Observable<string>;
    public tsyCacheFailedStatus$: Observable<string>;
    public oasCacheRefreshingStatus$: Observable<boolean>;
    public tsyOasCacheRefreshingStatus$: Observable<boolean>;

    constructor(private store: Store<fromStore.TBAReportsState>) {
        this.missingDates$ = store.select(fromStore.getMissingDates);
        this.request$ = store.select(fromStore.getParserRequest);
        this.results$ = store.select(fromStore.getParserResults);
        this.error$ = store.select(fromStore.getParserError);
        this.isRequestValid$ = store.select(fromStore.isRequestValid);
        this.steps$ = store.select(fromStore.getSteps);
        this.currentStep$ = store.select(fromStore.getCurrentStep);
        this.cacheKey$ = store.select(fromStore.getCacheKey);
        this.completionStatus$ = store.select(fromStore.getCompletionStatus);

        this.oasCacheSuccessStatus$ = store.select(fromStore.getOASCacheSuccess);
        this.oasCacheFailedStatus$ = store.select(fromStore.getOASCacheError);
        this.oasCacheRefreshingStatus$ = store.select(fromStore.getOASCacheRefreshing);

        this.tsyCacheSuccessStatus$ = store.select(fromStore.getTSYCacheSuccess);
        this.tsyCacheFailedStatus$ = store.select(fromStore.getTSYCacheError);
        this.tsyOasCacheRefreshingStatus$ = store.select(fromStore.getTsyOASCacheRefreshing);

        combineLatest(this.oasCacheSuccessStatus$, this.oasCacheFailedStatus$,
            this.tsyCacheSuccessStatus$, this.tsyCacheFailedStatus$)
            .subscribe(([oasSuccess, oasFailed, tsySuccess, tsyFailed]) => {
                setTimeout(() => {
                    if (oasSuccess) { this.store.dispatch(new fromStore.ClearCacheStatus('oasSuccess')); }
                    if (oasFailed) { this.store.dispatch(new fromStore.ClearCacheStatus('oasFailed')); }
                    if (tsySuccess) { this.store.dispatch(new fromStore.ClearCacheStatus('tsySuccess')); }
                    if (tsyFailed) { this.store.dispatch(new fromStore.ClearCacheStatus('tsyFailed')); }
                }, 5000);
    
            });

        // const combined$ = Observable.combineLatest(this.oasCacheSuccessStatus$, this.oasCacheFailedStatus$,
        //     this.tsyCacheSuccessStatus$, this.tsyCacheFailedStatus$, );

        // combined$.subscribe(([oasSuccess, oasFailed, tsySuccess, tsyFailed]) => {
        //     setTimeout(() => {
        //         if (oasSuccess) { this.store.dispatch(new fromStore.ClearCacheStatus('oasSuccess')); }
        //         if (oasFailed) { this.store.dispatch(new fromStore.ClearCacheStatus('oasFailed')); }
        //         if (tsySuccess) { this.store.dispatch(new fromStore.ClearCacheStatus('tsySuccess')); }
        //         if (tsyFailed) { this.store.dispatch(new fromStore.ClearCacheStatus('tsyFailed')); }
        //     }, 5000);

        // });
    }

    ngOnInit() { }

    public updateStep(step: fromModels.Step): void {
        this.store.dispatch(new fromStore.UpdateStep(step));
    }

    public uploadSuccess(cacheKey: string): void {
        this.store.dispatch(new fromStore.SaveCacheKey(cacheKey));
    }

    public uploadError(error: string): void {
        this.store.dispatch(new fromStore.InvalidRequest(`Failed to upload file - ${error}`));
    }

    public gotoNextStep(): void {
        this.store.dispatch(new fromStore.NextStep());
    }

    public gotoPreviousStep(): void {
        this.store.dispatch(new fromStore.PreviousStep());
    }

    public saveResults(cacheKey: string): void {
        this.store.dispatch(new fromStore.SaveResults(cacheKey));
    }

    public refreshCache(plotType: string): void {
        this.store.dispatch(new fromStore.RefreshCache(plotType));
    }

    public clearStatus(status: string): void {
        this.store.dispatch(new fromStore.ClearCacheStatus(status));
    }
}
