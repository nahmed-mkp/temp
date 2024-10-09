import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import * as fromStore from './../../store';
import * as fromModels from './../../models/sec-master-history.models';
import * as moment from 'moment';

@Component({
    selector: 'app-security-master-create-history-layout',
    templateUrl: './security-master-create-history-layout.component.html',
    styleUrls: ['./security-master-create-history-layout.component.scss']
})
export class SecurityMasterCreateHistoryLayoutComponent implements OnInit {

    public data$: Observable<any[]>;
    public loading$: Observable<boolean>;
    public addDoNoteUpdateFlagPending$: Observable<boolean>;

    public startDate = moment().subtract(5, 'd').toDate();
    public endDate = moment().toDate();

    constructor(private store: Store<fromStore.SecurityMasterState>) { }

    ngOnInit() {
        this.data$ = this.store.select(fromStore.getCreateHistory);
        this.loading$ = this.store.select(fromStore.getCreateHistoryLoading);
        this.addDoNoteUpdateFlagPending$ = this.store.select(fromStore.getAddDoNotUpdateFlagPending);

        this.store.dispatch(new fromStore.LoadCreateHistory({'startDate': this.startDate, 'endDate': this.endDate}));
    }

    public onLoadCreationHistory(event: fromModels.ISecurityHistoryReq) {
        this.store.dispatch(new fromStore.LoadCreateHistory(event));
    }

    public onAddDoNotUpdateFlag(event: number) {
        this.store.dispatch(new fromStore.AddDoNotUpdateFlagFromCreationHistory(event));
    }

    public onDeleteSecurity(event: number) {
        this.store.dispatch(new fromStore.DeleteSecurity(event));
    }

    public onRetryCreateSecurity(payload: string): void {
        this.store.dispatch(new fromStore.RetryCreateNewSecurity(payload));
    }

}
