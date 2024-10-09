import { ChangeDetectionStrategy, Component, OnChanges, OnInit, SimpleChanges, HostBinding, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromStore from './../../store';
import * as fromModels from './../../models';

@Component({
    selector: 'app-leverage-layout',
    templateUrl: './leverage-layout.component.html',
    styleUrls: ['./leverage-layout.component.scss'],
    // changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeverageLayoutComponent implements OnInit, OnDestroy {

    @HostBinding('class') classes = 'vertical-flex-full-height';

    public activeDate$: Observable<string>;
    public selectedGrouping$: Observable<string>;
    public isLive$: Observable<boolean>;

    public supportedGroupings$: Observable<string[]>;
    public supportedGroupingsLoading$: Observable<boolean>;
    public supportedGroupingsLoaded$: Observable<boolean>;
    public supportedGroupingsError$: Observable<string>;

    public leverage$: Observable<any>;
    public leverageLoading$: Observable<boolean>;
    public leverageLoaded$: Observable<boolean>;
    public leverageError$: Observable<string>;

    public leverageDates$: Observable<string[]>;
    public leverageDatesLoading$: Observable<boolean>;
    public leverageDatesLoaded$: Observable<boolean>;
    public leverageDatesError$: Observable<string>;

    private periodicPullingCycle = 10 * 60 * 1000; // 15 mins
    private refreshTimer: any;

    public maxTimeStamp: string;

    constructor(private store: Store<fromStore.LeverageState>) {
        this.activeDate$ = this.store.select(fromStore.getActiveDate);
        this.selectedGrouping$ = this.store.select(fromStore.getSelectedGrouping);
        this.isLive$ = this.store.select(fromStore.getIsLive);

        this.supportedGroupings$ = this.store.select(fromStore.getSupportedGroupings);
        this.supportedGroupingsLoading$ = this.store.select(fromStore.getSupportedGroupingsLoading);
        this.supportedGroupingsLoaded$ = this.store.select(fromStore.getSupportedGroupingsLoaded);
        this.supportedGroupingsError$ = this.store.select(fromStore.getSupportedGroupingsError);

        this.leverage$ = this.store.select(fromStore.getLeverage);
        this.leverageLoading$ = this.store.select(fromStore.getLeverageLoading);
        this.leverageLoaded$ = this.store.select(fromStore.getLeverageLoaded);
        this.leverageError$ = this.store.select(fromStore.getLeverageError);

        this.leverageDates$ = this.store.select(fromStore.getLeverageDates);
        this.leverageDatesLoading$ = this.store.select(fromStore.getLeverageDatesLoading);
        this.leverageDatesLoaded$ = this.store.select(fromStore.getLeverageDatesLoaded);
        this.leverageDatesError$ = this.store.select(fromStore.getLeverageDatesError);
    }

    ngOnInit(): void { }

    ngOnDestroy() {
        if (this.refreshTimer) {
            clearInterval(this.refreshTimer);
        }
    }

    public changeParameter(param: fromModels.LeverageRequest): void {
        this.store.dispatch(new fromStore.LoadLeverage(param));

        if (this.refreshTimer) {
            clearInterval(this.refreshTimer);
        }

        this.refreshTimer = setInterval(() => {
            this.store.dispatch(new fromStore.LoadLeverage(param));
        }, this.periodicPullingCycle);
    }

    public onReceiveTimeStamp(event) {
        this.maxTimeStamp = event;
    }
}
