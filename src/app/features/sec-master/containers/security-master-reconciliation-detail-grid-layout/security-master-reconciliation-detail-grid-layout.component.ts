import { Component, OnInit, OnDestroy } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import * as fromStore from './../../store';
import { GridApi, RowNode } from 'ag-grid-community';


@Component({
    selector: 'app-security-master-reconciliation-detail-grid-layout',
    templateUrl: './security-master-reconciliation-detail-grid-layout.component.html',
    styleUrls: ['./security-master-reconciliation-detail-grid-layout.component.scss']
})
export class SecurityMasterReconciliationDetailGridLayoutComponent implements ICellRendererAngularComp, OnDestroy {


    private params: any;
    private nodeId: any;
    private parentNode: RowNode;
    private masterGridApi: GridApi
    private subscription: Subscription;

    public match: boolean;
    public pinStatus: string;
    public rawData$: Observable<any>;
    public loading$: Observable<boolean>;
    public loaded$: Observable<boolean>;

    constructor(private store: Store<fromStore.SecurityMasterState>) { }

    agInit(params: any): void {
        console.log('detail grid params', params);
        this.params = params;
        this.pinStatus = params.pinned;
        this.nodeId = params['nodeId'];
        this.match = params['match'];
        this.parentNode = params.node;
        this.masterGridApi = params.api;

        if (this.pinStatus === null) {
            this.store.dispatch(new fromStore.PrepareLoadReconciliationSecurityDetail({
                securityName: this.nodeId,
                match: this.match
            }));
            this.rawData$ = this.store.select(fromStore.getSecurityDetailBySecurityName(this.nodeId, this.match));
            this.loading$ = this.store.select(fromStore.getSecurityDetailLoadingStatusBySecurityName(this.nodeId, this.match));
            this.loaded$ = this.store.select(fromStore.getSecurityDetailLoadedStatusBySecurityName(this.nodeId, this.match));

             this.rawData$.subscribe(data => {
                if (data && data.length && data.length > 0) {
                    if (data.length === 2) {
                        this.parentNode. setRowHeight(215);
                    } else {
                        this.parentNode.setRowHeight(120);
                    }
                    setTimeout(() => this.masterGridApi.onRowHeightChanged(), 100);
                }
            });
        }
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    refresh(params: any): boolean {
        return false;
    }

}
