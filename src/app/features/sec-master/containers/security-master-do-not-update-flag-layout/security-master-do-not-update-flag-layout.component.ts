import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromStore from './../../store';
import * as fromModels from './../../models';

@Component({
    selector: 'app-security-master-do-not-update-flag-layout',
    templateUrl: './security-master-do-not-update-flag-layout.component.html',
    styleUrls: ['./security-master-do-not-update-flag-layout.component.scss']
})
export class SecurityMasterDoNotUpdateFlagLayoutComponent implements OnInit {

    public data$: Observable<any[]>;
    public loading$: Observable<boolean>;
    public setDoNotUpdateFlagPending$: Observable<boolean>;
    public manualSetDoNotUpdateFlagPending$: Observable<boolean>;

    constructor(private store: Store<fromStore.SecurityMasterState>) { }

    ngOnInit() {
        this.data$ = this.store.select(fromStore.getSecurityDoNotUpdateList);
        this.loading$ = this.store.select(fromStore.getSecurityDoNotUpdateListLoading);
        this.setDoNotUpdateFlagPending$ = this.store.select(fromStore.getSetSecurityDoNotUpdatePending);
        this.manualSetDoNotUpdateFlagPending$ = this.store.select(fromStore.getManualSetSecurityDoNotUpdatePending);
    }

    public onSetDoNoteUpdateFlag(event: fromModels.ISetDoNotUpdateFlag) {
        this.store.dispatch(new fromStore.SetSecurityDoNotUpdateFlag(event));
    }

    public onManualSetDoNotUpdateFlag(event: number) {
        this.store.dispatch(new fromStore.ManualSetSecurityDoNotUpdateFlag(event));
    }

    public onSetDoNotUpdateFlag(event: fromModels.ISetDoNotUpdateFlag) {
        this.store.dispatch(new fromStore.SetSecurityDoNotUpdateFlag(event));
    }

}
