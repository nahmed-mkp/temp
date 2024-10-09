import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromStore from './../../store';
import * as fromModels from './../../models/sec-master-history.models';
import * as moment from 'moment';

@Component({
    selector: 'app-security-master-update-history-layout',
    templateUrl: './security-master-update-history-layout.component.html',
    styleUrls: ['./security-master-update-history-layout.component.scss']
})
export class SecurityMasterUpdateHistoryLayoutComponent implements OnInit {

    public data$: Observable<any[]>;
    public loading$: Observable<boolean>;

    // public startDate = moment().subtract(5, 'd').toDate();
    public startDate = moment().toDate();
    public endDate = moment().toDate();


    constructor(private store: Store<fromStore.SecurityMasterState>) { }

    ngOnInit() {
        this.data$ = this.store.select(fromStore.getUpdateHistory);
        this.loading$ = this.store.select(fromStore.getUpdateHistoryLoading);

        this.store.dispatch(new fromStore.LoadUpdateHistory({'startDate': this.startDate, 'endDate': this.endDate}));
    }

    public onLoadUpdateHistory(event: fromModels.ISecurityHistoryReq) {
        this.store.dispatch(new fromStore.LoadUpdateHistory(event));
    }

}
