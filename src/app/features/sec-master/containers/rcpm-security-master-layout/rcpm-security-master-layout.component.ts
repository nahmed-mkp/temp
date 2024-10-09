import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { Store } from '@ngrx/store';

import * as fromModels from '../../models';
import * as fromStore from '../../store';
import { Observable } from 'rxjs';


@Component({
    selector: 'app-rcpm-sec-master-layout',
    templateUrl: './rcpm-security-master-layout.component.html',
    styleUrls: ['./rcpm-security-master-layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RCPMSecurityMasterLayoutComponent implements OnInit {

    // Search Results
    public searchTerm$: Observable<string>;
    public searchResults$: Observable<any[]>;
    public searching$: Observable<boolean>;
    public searched$: Observable<boolean>;
    public searchError$: Observable<string>;

    // Selected Security
    public selectedSID$: Observable<number>;
    public selectedSecurity$: Observable<fromModels.ISecurity>;
    public securityLoading$: Observable<boolean>;
    public securityLoaded$: Observable<boolean>;
    public securityError$: Observable<string>;

    // Market Data
    public marketData$: Observable<fromModels.IMarketData[]>;
    public marketDataLoading$: Observable<boolean>;
    public marketDataLoaded$: Observable<boolean>;
    public marketDataError$: Observable<string>;

    // Market Data Point
    public selectedMarketData$: Observable<number>;
    public marketDataPointsLoading$: Observable<boolean>;
    public marketDataPointsLoaded$: Observable<boolean>;
    public marketDataPointsError$: Observable<string>;
    public marketDataPoints$: Observable<fromModels.IMarketDataPoint[]>;


    // Security Tags
    public securityTags$: Observable<any[]>;
    public securityTagsLoading$:  Observable<boolean>;


    constructor(private store: Store<fromStore.SecurityMasterState>, private router: Router, private location: Location) {

        // Security Search
        this.searchTerm$ = this.store.select(fromStore.getSecMasterSearchTerm);
        this.searching$ = this.store.select(fromStore.getSecMasterSearchingStatus);
        this.searched$ = this.store.select(fromStore.getSecMasterSearchedStatus);
        this.searchError$ = this.store.select(fromStore.getSecMasterSearchError);
        this.searchResults$ = this.store.select(fromStore.getSecMasterSearchResults);

        // Security Details
        this.selectedSID$ = this.store.select(fromStore.getSecMasterSelectedSID);
        this.selectedSecurity$ = this.store.select(fromStore.getSecMasterSelectedSecurity);
        this.securityLoading$ = this.store.select(fromStore.getSecMasterSecurityLoading);
        this.securityLoaded$ = this.store.select(fromStore.getSecMasterSecurityLoaded);
        this.securityError$ = this.store.select(fromStore.getSecMasterSecurityError);

        // Security Market Data
        this.marketData$ = this.store.select(fromStore.getSecMasterSelectedSecurityMarketData);
        this.marketDataLoading$ = this.store.select(fromStore.getSecMasterMarketDataLoading);
        this.marketDataLoaded$ = this.store.select(fromStore.getSecMasterMarketDataLoaded);
        this.marketDataError$ = this.store.select(fromStore.getSecMasterMarketDataError);

        // Market Data Points
        this.selectedMarketData$ = this.store.select(fromStore.getSecMasterSelectedMDID);
        this.marketDataPoints$ = this.store.select(fromStore.getSecMasterSelectedMarketDataPoints);
        this.marketDataPointsLoaded$ = this.store.select(fromStore.getSecMasterMarketDataPointsLoaded);
        this.marketDataPointsLoading$ = this.store.select(fromStore.getSecMasterMarketDataPointsLoading);
        this.marketDataPointsError$ = this.store.select(fromStore.getSecMasterMarketDataPointsError);

        // Security Tags
        this.securityTags$ = this.store.select(fromStore.getSecMasterSecurityTags);
        this.securityTagsLoading$ = this.store.select(fromStore.getSecMasterSecurityTagsLoading);
    }

    ngOnInit(): void { }

    searchSecurities(searchTerm: string): void {
        if (searchTerm && searchTerm.length >= 3) {
            this.store.dispatch(new fromStore.SearchSecurities({ searchTerm: searchTerm }));
        } else {
            this.store.dispatch(new fromStore.LoadRecentSecurities());
        }
    }

    securitySelected(sid: number): void {
        this.store.dispatch(new fromStore.LoadSecurity(sid));
        this.store.dispatch(new fromStore.LoadSecurityMarketData(sid));
    }

    selectMarketData(marketData: fromModels.IMarketData): void {
        this.store.dispatch(new fromStore.LoadMarketDataPoints(marketData.mdid));
    }

    public updateTags(event: fromModels.ISecurityTagUpdateReq[]) {

        event.forEach((payload, index) => {
            setTimeout(() => this.store.dispatch(new fromStore.UpdateSecurityTag(payload)), index * 2000)
        })
    }
}
