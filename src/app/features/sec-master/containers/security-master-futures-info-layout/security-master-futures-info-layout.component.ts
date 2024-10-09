import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import * as fromStore from './../../store';
import * as fromModels from './../../models/futures-root.models';

@Component({
    selector: 'app-security-master-futures-info-layout',
    templateUrl: './security-master-futures-info-layout.component.html',
    styleUrls: ['./security-master-futures-info-layout.component.scss']
})
export class SecurityMasterFuturesInfoLayoutComponent implements OnInit {

    public futureRoots$: Observable<fromModels.IFutureRoot[]>;
    public countries$: Observable<any[]>;
    public loading$: Observable<boolean>;

    constructor(private store: Store<fromStore.SecurityMasterState>) { }

    ngOnInit() {
        this.futureRoots$ = this.store.select(fromStore.getFuturesRoots);
        this.countries$ = this.store.select(fromStore.getGlobalSecMasterCountries);
        this.loading$ = this.store.select(fromStore.getFuturesRootLoadingStatus);
    }

    createFutureInfo(payload: fromModels.IFutureRoot): void {
        this.store.dispatch(new fromStore.AddFuturesRoot(payload));
    }

}
