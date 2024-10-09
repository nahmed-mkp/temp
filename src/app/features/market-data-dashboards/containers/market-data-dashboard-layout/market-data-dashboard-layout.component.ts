import { Component, OnInit, AfterViewInit, ViewChild, HostBinding, SimpleChanges, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { MatLegacyTabGroup as MatTabGroup, MatLegacyTabChangeEvent as MatTabChangeEvent } from '@angular/material/legacy-tabs';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromStore from './../../store';


@Component({
    selector: 'app-market-data-dashboard-layout',
    templateUrl: './market-data-dashboard-layout.component.html',
    styleUrls: ['./market-data-dashboard-layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class MarketDataDashboardLayoutComponent implements OnInit, AfterViewInit {

    @ViewChild('tabs') tabGroup: MatTabGroup;
    @HostBinding('class') class = 'bond-dashboard';

    public metaData$: Observable<any[]>;
    public metaDataLoading$: Observable<boolean>;
    public metaDataLoaded$: Observable<boolean>;
    public metaDataError$: Observable<string>;

    public selectedDashboard$: Observable<any>;

    public selectedDashboardData$: Observable<any>;
    public selectedDashboardDataLoading$: Observable<boolean>;
    public selectedDashboardDataLoaded$: Observable<boolean>;
    public selectedDashboardDataError$: Observable<string>;

    public chartData$: Observable<any>;
    public chartDataLoading$: Observable<boolean>;
    public chartDataLoaded$: Observable<boolean>;
    public chartDataError$: Observable<string>;

    public chartSpreadData$: Observable<any>;
    public chartSpreadDataLoading$: Observable<boolean>;
    public chartSpreadDataLoaded$: Observable<boolean>;
    public chartSpreadDataError$: Observable<string>;

    public billsShortCouponsChartData$: Observable<any>;
    
    private loadDashboardInterval: any;

    constructor(private store: Store<fromStore.State>, private location: Location, private router: Router, private activatedRoute: ActivatedRoute) {
        this.metaData$ = this.store.select(fromStore.getDashboardMetaData);
        this.metaDataLoading$ = this.store.select(fromStore.getDashboardMetaDataLoading);
        this.metaDataLoaded$ = this.store.select(fromStore.getDashboardMetaDataLoaded);
        this.metaDataError$ = this.store.select(fromStore.getDashboardMetaDataError);

        this.selectedDashboard$ = this.store.select(fromStore.getSelectedDashboard);

        this.selectedDashboardData$ = this.store.select(fromStore.getSelectedDashboardData);
        this.selectedDashboardDataLoading$ = this.store.select(fromStore.getSelectedDashboardDataLoading);
        this.selectedDashboardDataLoaded$ = this.store.select(fromStore.getSelectedDashboardDataLoaded);
        this.selectedDashboardDataError$ = this.store.select(fromStore.getSelectedDashboardDataError);

        this.chartData$ = this.store.select(fromStore.getDashboardChartData);
        this.chartDataLoading$ = this.store.select(fromStore.getDashboardChartDataLoading);
        this.chartDataLoaded$ = this.store.select(fromStore.getDashboardChartDataLoaded);
        this.chartDataError$ = this.store.select(fromStore.getDashboardChartDataError);

        this.chartSpreadData$ = this.store.select(fromStore.getDashboardChartSpreadData);
        this.chartSpreadDataLoading$ = this.store.select(fromStore.getDashboardChartSpreadDataLoading);
        this.chartSpreadDataLoaded$ = this.store.select(fromStore.getDashboardChartSpreadDataLoaded);
        this.chartSpreadDataError$ = this.store.select(fromStore.getDashboardChartSpreadDataError);
    
        this.billsShortCouponsChartData$ = this.store.select(fromStore.getBillsShortCouponsChartData);
    }

    ngOnInit(): void { }

    ngAfterViewInit(): void {
        this.activatedRoute.url.subscribe((route) => {
            if (route && route.length === 1) {
                setTimeout( () => {
                    let assetClass = route[0]['path'].toLowerCase();
                    const currentTabs = this.tabGroup._tabs.map((tab) => tab.textLabel.toLowerCase());
                    if(assetClass === 'bills-short-coupons'){
                        assetClass = 'bills/short coupons'
                    }
                    const curIndex = currentTabs.indexOf(assetClass);
                    if (curIndex >= 0) {
                        this.tabGroup.selectedIndex = curIndex;
                    } else {
                        this.tabGroup.selectedIndex = 0;
                    }
                }, 500)

            }
        });
    }

    public changeTab(e: MatTabChangeEvent): void {
        let assetClass = e.tab.textLabel.toLowerCase();
        if(assetClass === 'bills/short coupons'){
            assetClass = 'bills-short-coupons'
        }
        this.activateRoute(assetClass);
    }

    public activateRoute(assetClass: string): void {
        const url = this.router.createUrlTree([assetClass], { relativeTo: this.activatedRoute.parent, }).toString();
        this.location.go(url);
    }

    public loadDashboard(dashboardName: string): void {

        clearInterval(this.loadDashboardInterval)

        setTimeout( () => 
            this.store.dispatch(new fromStore.LoadDashboardData(dashboardName)), 1000);
            
        if(dashboardName === 'bonds'){
                this.store.dispatch(new fromStore.SubscribeToDashboardData(dashboardName));
        }
        else{
            this.loadDashboardInterval = setInterval( () => this.store.dispatch(new fromStore.LoadDashboardData(dashboardName)), 10000)
        }
    }

    public loadChartData(req_data: []): void {
        this.store.dispatch(new fromStore.LoadChartData(req_data));
    }

    public loadChartSpreadData(req_data: []): void {
        this.store.dispatch(new fromStore.LoadChartSpreadData(req_data));
    }

    public unsubFromDashboard(tabName: string){
        this.store.dispatch(new fromStore.UnsubscribeFromDashboardData());
    }

    public loadBillsShortCouponCharts(params){
        this.store.dispatch(new fromStore.AddBillsChartCouponsChartData(params))
    }

}
