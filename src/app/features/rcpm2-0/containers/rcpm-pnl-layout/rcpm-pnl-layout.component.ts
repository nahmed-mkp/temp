import { Component, OnInit, Input, OnChanges, SimpleChanges, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

import { MatSelectChange } from '@angular/material/select';
import { combineLatest, Observable, BehaviorSubject, Subscription } from 'rxjs';

import * as fromModels from './../../models';
import * as fromStore from '../../store';


@Component({
    selector: 'app-rcpm-pnl-layout',
    templateUrl: './rcpm-pnl-layout.component.html',
    styleUrls: ['./rcpm-pnl-layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RcpmPnLLayoutComponent implements OnInit, OnChanges, OnDestroy {

    @Input() dataPath$: Observable<fromModels.DataPath>;
    @Input() layout: string;
    @Input() isOpen = false;

    public hasCrosspodCap = false;
    public hasPodCap = false;
    public showPctFund = false;
    public showPctCap = false;
    public divideBy: 'FundCapital' | 'CrossPodCapital' | 'PodCapital' | 'NoCapital' = 'NoCapital';

    public showToolBar = true;
    public mode: 'timeseries' | 'raw' = 'timeseries';

    public plotMode: 'Daily' | 'Cumulative' = 'Cumulative';
    public plotModes: string[] = ['Daily', 'Cumulative'];

    public selectedLayoutReturnsData$: Observable<any[]>;
    public selectedLayoutReturnsLoading$: Observable<boolean>;
    public selectedLayoutReturnsLoaded$: Observable<boolean>;
    public selectedLayoutReturnsError$: Observable<string>;

    public selectedLayoutCapitals$: Observable<any>;
    public selectedLayoutCapitalsLoading$: Observable<boolean>;
    public selectedLayoutCapitalsLoaded$: Observable<boolean>;
    public selectedLayoutCapitalsError$: Observable<string>;

    public dataPath: fromModels.DataPath;
    public loadedCapitals: string[] = [];
    public returnsChangesSubscribed = false;
    public yearsChangesSubscribed = false;

    public dataPathSubscription$: Subscription;

    public request: fromModels.IReturnsRequest;
    private MIN_YEAR = 2009;

    public selectedYear = new Date().getFullYear();

    constructor(private store: Store<fromStore.RCPM2State>) {
    }

    ngOnInit() {
        this.dataPathSubscription$ = this.dataPath$
            .subscribe((dataPath) => {
                if (dataPath !== undefined && dataPath !== null) {
                    this.dataPath = dataPath;
                    this.checkPodCrossPodLevels();
                    if (this.isOpen) {
                        this.loadPnl(dataPath);
                    }
                }
            });

        this.selectedLayoutReturnsData$ = this.store.select(fromStore.getSelectedLayoutReturns(), this.layout);
        this.selectedLayoutCapitals$ = this.store.select(fromStore.getSelectedLayoutCapitals(), this.layout);
    }

    ngOnDestroy(): void {
        if (this.dataPathSubscription$) {
            this.dataPathSubscription$.unsubscribe();
        }
    }

    ngOnChanges(changes: SimpleChanges) {

        if (changes.isOpen && changes.isOpen.currentValue && this.dataPath) {
            this.loadPnl(this.dataPath);
        }
    }

    private getDivideBy(): 'FundCapital' | 'CrossPodCapital' | 'PodCapital' | 'NoCapital' {
        let result: 'FundCapital' | 'CrossPodCapital' | 'PodCapital' | 'NoCapital' = 'NoCapital';
        if (this.showPctFund) {
            result = 'FundCapital';
        } else if (this.showPctCap) {
            if (this.hasCrosspodCap) {
                result = 'CrossPodCapital';
            } else if (this.hasPodCap) {
                result = 'PodCapital';
            } else {
                result = 'FundCapital';
            }
        }
        return result;
    }

    get years(): number[] {
        let curYear = new Date().getFullYear();
        const result = [];
        while (curYear >= this.MIN_YEAR) {
            result.push(curYear);
            curYear -= 1;
        }
        return result;
    }

    private loadPnl(dataPath: fromModels.DataPath) {
        this.request = { grouping: dataPath.grouping, key: dataPath.key, year: this.selectedYear};
        this.store.dispatch(new fromStore.LoadReturns(this.request, this.layout));
    }

    private checkPodCrossPodLevels(): void {
        const groupParts = this.dataPath.grouping.toLowerCase().split('|');
        const keyParts = this.dataPath.key.split('_');
        const slicedLevels = groupParts.slice(0, keyParts.length);
        const crossPodIdx = slicedLevels.indexOf('crosspod');
        const podIdx = slicedLevels.indexOf('pod');
        if (crossPodIdx >= 0) {
            if (podIdx < 0) {
                this.hasCrosspodCap = true;
            } else if (crossPodIdx > podIdx) {
                this.hasCrosspodCap = true;
            } else {
                this.hasCrosspodCap = false;
                this.hasPodCap = true;
            }
        } else if (podIdx >= 0) {
            this.hasCrosspodCap = false;
            this.hasPodCap = true;
        } else {
            this.hasCrosspodCap = false;
            this.hasPodCap = false;
        }
        this.divideBy = this.getDivideBy();
    }

    public onYearSelected(e: MatSelectChange): void {
        if (this.dataPath) {
            this.selectedYear = e.value;
            this.loadPnl(this.dataPath);
        }
    }

    public onPlotModeChanged(e: MatSelectChange): void {
        this.plotMode = e.value;
    }

    public onToggleToolbar() {
        this.showToolBar = !this.showToolBar;
    }

    public onTogglePctFund() {
        this.showPctFund = !this.showPctFund;
        this.showPctCap = false;
        this.divideBy = this.getDivideBy();
    }

    public onTogglePctCap() {
        this.showPctCap = !this.showPctCap;
        this.showPctFund = false;
        this.divideBy = this.getDivideBy();
    }

}
