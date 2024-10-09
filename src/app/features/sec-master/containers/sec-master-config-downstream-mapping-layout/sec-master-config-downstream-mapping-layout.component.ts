import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromStore from './../../store';
import * as fromModels from './../../models';

@Component({
    selector: 'app-sec-master-config-downstream-mapping-layout',
    templateUrl: './sec-master-config-downstream-mapping-layout.component.html',
    styleUrls: ['./sec-master-config-downstream-mapping-layout.component.scss']
})
export class SecMasterConfigDownstreamMappingLayoutComponent implements OnInit {

    public downstreamMapping$: Observable<any[]>;
    public downstreamMappingLoading$: Observable<boolean>;
    public downstreamMappingLoaded$: Observable<boolean>;

    constructor(private store: Store<fromStore.SecurityMasterState>) { }

    ngOnInit() {
        this.downstreamMapping$ = this.store.select(fromStore.getDownstreamMapping);
        this.downstreamMappingLoading$ = this.store.select(fromStore.getDownstreamMappingLoadingStatus);
        this.downstreamMappingLoaded$ = this.store.select(fromStore.getDownstreamMappingLoadedStatus);
    }
}
