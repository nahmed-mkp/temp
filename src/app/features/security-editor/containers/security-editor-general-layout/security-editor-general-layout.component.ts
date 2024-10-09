import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromModels from '../../models';
import * as fromStore from '../../store';


@Component({
    selector: 'app-security-editor-general-layout',
    templateUrl: './security-editor-general-layout.component.html',
    styleUrls: ['./security-editor-general-layout.component.scss']
})
export class SecurityEditorGeneralLayoutComponent implements OnInit, OnChanges {

    @Input() targetSid: number = null;
    @Input() mode: 'compact' | 'normal' = 'normal';

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

    constructor(private store: Store<fromStore.SecurityEditorMasterState>) { }

    ngOnInit() {

        this.store.dispatch(new fromStore.LoadSecurityTags());

        // Security Search
        this.searchTerm$ = this.store.select(fromStore.getSecurityEditorSearchTerm);
        this.searching$ = this.store.select(fromStore.getSecurityEditorSearchingStatus);
        this.searched$ = this.store.select(fromStore.getSecurityEditorSearchedStatus);
        this.searchError$ = this.store.select(fromStore.getSecurityEditorSearchError);
        this.searchResults$ = this.store.select(fromStore.getSecurityEditorSearchResults);

        // Security Details
        this.selectedSID$ = this.store.select(fromStore.getSecurityEditorSelectedSID);
        this.selectedSecurity$ = this.store.select(fromStore.getSecurityEditorSelectedSecurity);
        this.securityLoading$ = this.store.select(fromStore.getSecurityEditorSecurityLoading);
        this.securityLoaded$ = this.store.select(fromStore.getSecurityEditorSecurityLoaded);
        this.securityError$ = this.store.select(fromStore.getSecurityEditorSecurityError);

        // Security Market Data
        this.marketData$ = this.store.select(fromStore.getSecurityEditorSelectedSecurityMarketData);
        this.marketDataLoading$ = this.store.select(fromStore.getSecurityEditorMarketDataLoading);
        this.marketDataLoaded$ = this.store.select(fromStore.getSecurityEditorMarketDataLoaded);
        this.marketDataError$ = this.store.select(fromStore.getSecurityEditorMarketDataError);

        // Market Data Points
        this.selectedMarketData$ = this.store.select(fromStore.getSecurityEditorSelectedMDID);
        this.marketDataPoints$ = this.store.select(fromStore.getSecurityEditorSelectedMarketDataPoints);
        this.marketDataPointsLoaded$ = this.store.select(fromStore.getSecurityEditorMarketDataPointsLoaded);
        this.marketDataPointsLoading$ = this.store.select(fromStore.getSecurityEditorMarketDataPointsLoading);
        this.marketDataPointsError$ = this.store.select(fromStore.getSecurityEditorMarketDataPointsError);

        // Security Tags
        this.securityTags$ = this.store.select(fromStore.getSecurityEditorSecurityTags);
        this.securityTagsLoading$ = this.store.select(fromStore.getSecurityEditorSecurityTagsLoading);
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.targetSid && changes.targetSid.currentValue) {
            this.securitySelected(changes.targetSid.currentValue);
        }
    }


    // Event -------------------------------------------------------------------------

    public searchSecurities(searchTerm: string): void {
        if (searchTerm && searchTerm.length >= 3) {
            this.store.dispatch(new fromStore.SearchSecurities({ searchTerm: searchTerm }));
        } else {
            this.store.dispatch(new fromStore.LoadRecentSecurities());
        }
    }

    public securitySelected(sid: number): void {
        this.store.dispatch(new fromStore.LoadSecurity(sid));
        this.store.dispatch(new fromStore.LoadSecurityMarketData(sid));
    }

    public selectMarketData(marketData: fromModels.IMarketData): void {
        this.store.dispatch(new fromStore.LoadMarketDataPoints(marketData.mdid));
    }

    public updateTags(event: fromModels.ISecurityTagUpdateReq[]) {
        event.forEach((payload, index) => {
            setTimeout(() => this.store.dispatch(new fromStore.UpdateSecurityTag(payload)), index * 2000);
            if (index === event.length - 1) {
                setTimeout(() => this.store.dispatch(new fromStore.LoadSecurity(payload.sid)), 1000);
            }
        });
    }

    public deleteTag(event: fromModels.ISecurityTagDeleteReq) {
        this.store.dispatch(new fromStore.DeleteSecurityTag(event));
    }

}
