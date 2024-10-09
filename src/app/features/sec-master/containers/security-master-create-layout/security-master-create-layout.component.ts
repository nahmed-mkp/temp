import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromStore from './../../store';
import * as fromModels from './../../models';
import { Observable } from 'rxjs';
@Component({
    selector: 'app-sec-master-create-layout',
    templateUrl: './security-master-create-layout.component.html',
    styleUrls: ['./security-master-create-layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SecurityMasterCreateLayoutComponent implements OnInit {

    public supportedAssetClasses$: Observable<string[]>;
    public identifiers$: Observable<string[]>;
    public activeBrokers$: Observable<string[]>;
    public lookupsLoading$: Observable<boolean>;
    public lookupsLoaded$: Observable<boolean>;
    public lookupsError$: Observable<string>;

    public userActivity$: Observable<any>;
    public userActivityLoading$: Observable<boolean>;
    public showUserActivity$: Observable<boolean>;

    constructor(private store: Store<fromStore.SecurityMasterState>) {
        this.supportedAssetClasses$ = this.store.select(fromStore.getGlobalSecMasterSupportedAssetClasses);
        this.identifiers$ = this.store.select(fromStore.getGlobalSecMasterIdentifiers);
        this.activeBrokers$ = this.store.select(fromStore.getGlobalSecMasterActiveBrokers);
        this.lookupsLoading$ = this.store.select(fromStore.getGlobalSecMasterLookupsLoadingStatus);
        this.lookupsLoaded$ = this.store.select(fromStore.getGlobalSecMasterLookupsLoadedStatus);
        this.lookupsError$ = this.store.select(fromStore.getGlobalSecMasterLookupsErrorStatus);

        this.userActivity$ = this.store.select(fromStore.getSecMasterUserActivity);
        this.userActivityLoading$ = this.store.select(fromStore.getSecMasterUserActivityLoading);

        this.showUserActivity$ = this.store.select(fromStore.getShowUserActivityViewer);
    }

    ngOnInit(): void { }

    createNewSecurity(newSecurity: fromModels.INewSecurity): void {
        if (newSecurity !== null) {
            if (!newSecurity.isOTC) {
                newSecurity.contractSize = 0;
                newSecurity.counterparty = '';
            }
            this.store.dispatch(new fromStore.CreateNewSecurity(newSecurity));
        }
    }

    public onSelectActiveUserActivity(event: fromModels.IUserActivity) {
        this.store.dispatch(new fromStore.SetActiveSecType({
            display: 'create',
            data: event['secType']
        }));

        
        // Use load from Search API for now
        const requestPayload: fromModels.ISecurityDetailReq = {
            secType: event.secType,
            bbgGlobalID: event.bbg_global_id,
            id: event.bbg_global_id + '|' + event.secType
        };
        this.store.dispatch(new fromStore.LoadSecurityDetailFromSearch(requestPayload));
        this.store.dispatch(new fromStore.SetActiveSecurityDetailId({
            display: 'create',
            data: requestPayload.id
        }));

        // this.store.dispatch(new fromStore.SetActiveRequestId(event['requestId']));
        // this.store.dispatch(new fromStore.LoadSecurityDetail(event['requestId']));
    }

    public onToggleUserActivityViewer() {
        this.store.dispatch(new fromStore.ToggleUserActivityViewer);
    }

    public onDeleteSecurity(event: number) {
        this.store.dispatch(new fromStore.DeleteSecurity(event));
    }

    public onRetryCreateSecurity(payload: string): void {
        this.store.dispatch(new fromStore.RetryCreateNewSecurity(payload));
    }
}
