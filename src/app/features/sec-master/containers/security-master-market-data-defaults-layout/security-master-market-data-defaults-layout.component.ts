import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromStore from './../../store';
import * as fromModels from './../../models';

@Component({
    selector: 'app-security-master-market-data-defaults-layout',
    templateUrl: './security-master-market-data-defaults-layout.component.html',
    styleUrls: ['./security-master-market-data-defaults-layout.component.scss']
})
export class SecurityMasterMarketDataDefaultsLayoutComponent implements OnInit {

    public marketDataMap$: Observable<any>;
    public marketDataMapLoading$: Observable<boolean>;
    public marketDataMapLoaded$: Observable<boolean>;

    constructor(private store: Store<fromStore.SecurityMasterState>) { }

    ngOnInit() {
        this.marketDataMap$ = this.store.select(fromStore.getMarketDataDefaultsEntities);
        this.marketDataMapLoading$ = this.store.select(fromStore.getMarketDataDefaultsLoadingStatus);
        this.marketDataMapLoaded$ = this.store.select(fromStore.getMarketDataDefaultsLoadedStatus);
    }

}
