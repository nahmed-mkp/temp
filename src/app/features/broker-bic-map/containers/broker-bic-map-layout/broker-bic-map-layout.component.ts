import { Component, OnInit, HostBinding } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromStore from './../../store';
import * as fromModel from './../../models';

@Component({
    selector: 'app-broker-bic-map-layout',
    templateUrl: './broker-bic-map-layout.component.html',
    styleUrls: ['./broker-bic-map-layout.component.scss']
})
export class BrokerBicMapLayoutComponent implements OnInit {

    @HostBinding('class') classes = 'vertical-flex-full-height';

    public selectedBroker: any;
    public brokerList$: Observable<fromModel.IBroker[]>;
    public loading$: Observable<boolean>;
    public updating$: Observable<boolean>;

    constructor(private store: Store<fromStore.BrokerBicMapState>) { }

    ngOnInit() {
        this.brokerList$ = this.store.select(fromStore.getBrokerListFlat);
        this.loading$ = this.store.select(fromStore.getBrokerListLoading);
        this.updating$ = this.store.select(fromStore.getBrokerDetailUpdating);
    }

    // public onLoadBrokerDetail() {
    //     this.store.dispatch(new fromStore.LoadBrokerDetail(this.selectedBroker));
    // }

}
