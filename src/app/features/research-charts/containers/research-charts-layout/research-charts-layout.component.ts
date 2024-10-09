import { Component, OnInit, ChangeDetectionStrategy, ViewChild, OnDestroy } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import * as fromModels from './../../models/chart.models';
import * as fromStore from './../../store';

@Component({
    selector: 'app-research-charts-layout',
    templateUrl: './research-charts-layout.component.html',
    styleUrls: ['./research-charts-layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResearchChartsLayoutComponent implements OnInit, OnDestroy {

    @ViewChild('sidenav') sidenav: MatSidenav;

    public chartPacks$: Observable<fromModels.IChartPack[]>;
    public chartPacksLoading$: Observable<boolean>;
    public chartPacksLoaded$: Observable<boolean>;
    public chartPacksError$: Observable<string>;

    public selectedChartPack$: Observable<fromModels.IChartPack>;

    public selectedChartPackCharts$: Observable<fromModels.ISubChart[]>;
    public selectedChartPackChartsLoading$: Observable<boolean>;
    public selectedChartPackChartsLoaded$: Observable<boolean>;
    public selectedChartPackChartsError$: Observable<string>;

    public selectedChartPackImages$: Observable<fromModels.IChartPackImage[]>;

    public panelOpenState = false;

    constructor(private store: Store<fromStore.ResearchChartsState>) {
        
        this.chartPacks$ = store.select(fromStore.getChartPacks);
        this.chartPacksLoading$ = store.select(fromStore.getChartPacksLoading);
        this.chartPacksLoaded$ = store.select(fromStore.getChartPacksLoaded);
        this.chartPacksError$ = store.select(fromStore.getChartPacksError);

        this.selectedChartPack$ = store.select(fromStore.getSelectedChartPack);

        this.selectedChartPackCharts$ = store.select(fromStore.getSelectedChartPackCharts);        
        this.selectedChartPackChartsLoading$ = store.select(fromStore.getSelectedChartPackChartsLoading);
        this.selectedChartPackChartsLoaded$ = store.select(fromStore.getSelectedChartPackChartsLoaded);
        this.selectedChartPackChartsError$ = store.select(fromStore.getSelectedChartPackChartsError);

        this.selectedChartPackImages$ = store.select(fromStore.getSelectedChartPackImagesFlatten);
    }

    ngOnInit(): void { }

    ngOnDestroy(): void { }

    onShowList(): void {
        this.sidenav.open();
    }

    loadChartPack(chartPack: fromModels.IChartPack): void {
        this.store.dispatch(new fromStore.LoadChartPack(chartPack.feature));
    }
}
