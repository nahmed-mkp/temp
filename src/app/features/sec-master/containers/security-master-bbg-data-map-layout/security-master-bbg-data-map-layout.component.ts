import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromStore from './../../store';
import * as fromModels from './../../models';


@Component({
    selector: 'app-security-master-bbg-data-map-layout',
    templateUrl: './security-master-bbg-data-map-layout.component.html',
    styleUrls: ['./security-master-bbg-data-map-layout.component.scss']
})
export class SecurityMasterBbgDataMapLayoutComponent implements OnInit {

    public bbgDataMap$: Observable<any[]>;
    public bbgDataMapLoading$: Observable<boolean>;
    public bbgDataMapLoaded$: Observable<boolean>;


    constructor(private store: Store<fromStore.SecurityMasterState>) { }

    ngOnInit() {
        this.bbgDataMap$ = this.store.select(fromStore.getBbgDataMap);
        this.bbgDataMapLoading$ = this.store.select(fromStore.getBbgDataMapLoadingStatus);
        this.bbgDataMapLoaded$ = this.store.select(fromStore.getBbgDataMapLoadedStatus);
    }

}
