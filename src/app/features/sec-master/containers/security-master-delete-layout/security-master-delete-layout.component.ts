import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromStore from './../../store';
import * as fromModels from './../../models';


@Component({
    selector: 'app-security-master-delete-layout',
    templateUrl: './security-master-delete-layout.component.html',
    styleUrls: ['./security-master-delete-layout.component.scss']
})
export class SecurityMasterDeleteLayoutComponent implements OnInit {

    public data$: Observable<any[]>;
    public loading$: Observable<boolean>;
    public deletePending$: Observable<boolean>;

    constructor(private store: Store<fromStore.SecurityMasterState>) { }

    ngOnInit() {
        this.data$ = this.store.select(fromStore.getSecurityForDelete);
        this.loading$ = this.store.select(fromStore.getSecurityForDeleteLoading);
        this.deletePending$ = this.store.select(fromStore.getDeleteSecurityPending);
    }

    public onLoadSecurityForDelete(event: number) {
        this.store.dispatch(new fromStore.LoadSecurityForDelete(event));
    }

    public onDeleteSecurity(event: number) {
        this.store.dispatch(new fromStore.DeleteSecurity(event));
    }

}
