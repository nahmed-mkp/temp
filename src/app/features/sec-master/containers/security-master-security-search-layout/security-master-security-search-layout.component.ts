import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as _ from 'lodash';

import * as fromStore from './../../store';
import * as fromModels from './../../models';


@Component({
    selector: 'app-security-master-security-search-layout',
    templateUrl: './security-master-security-search-layout.component.html',
    styleUrls: ['./security-master-security-search-layout.component.scss']
})
export class SecurityMasterSecuritySearchLayoutComponent implements OnInit {

    public supportedAssetClasses$: Observable<string[]>;
    public securitySearchResult$: Observable<fromModels.ISecuritySearchResult[]>;

    public onSearch_debounce: any;
    public securitySearchReq: fromModels.ISecuritySearchReq = {
        secName: null,
        secType: null,
    };
    private requestPayload: fromModels.ISecurityDetailReq;
    private selectedSearchOption: fromModels.ISecuritySearchResult;


    constructor(private store: Store<fromStore.SecurityMasterState>) { 
        this.onSearch_debounce = _.debounce(this.onSearch.bind(this), 500);
    }

    ngOnInit() {
        this.supportedAssetClasses$ = this.store.select(fromStore.getGlobalSecMasterSupportedAssetClasses);
        this.securitySearchResult$ = this.store.select(fromStore.getSecuritySearchResult);
    }

    public onSearch() {
        console.log('model change', this.securitySearchReq);
        if (this.securitySearchReq.secName && this.securitySearchReq.secName.length >= 3) {
            this.store.dispatch(new fromStore.LoadSecuritySearchResult(this.securitySearchReq));
        }
    }

    public onOptionSelected(value) {
        this.selectedSearchOption = value;
        console.log('onOptionSelected', this.selectedSearchOption);

        this.requestPayload = {
            secType: this.selectedSearchOption.SecurityType,
            bbgGlobalID: this.selectedSearchOption.BBGGlobalId,
            id: this.selectedSearchOption.BBGGlobalId + '|' + this.selectedSearchOption.SecurityType
        };
        this.store.dispatch(new fromStore.LoadSecurityDetailFromSearch(this.requestPayload));
        this.store.dispatch(new fromStore.SetActiveSecType({
            display: 'edit',
            data: this.selectedSearchOption.SecurityType
        }));
        this.store.dispatch(new fromStore.SetActiveSecurityDetailId({
            display: 'edit',
            data: this.requestPayload.id
        }));
    }

    public onLoadSecurityDetail() {
        if (this.requestPayload) {
            this.store.dispatch(new fromStore.LoadSecurityDetailFromSearch(this.requestPayload));
            this.store.dispatch(new fromStore.SetActiveSecType({
                display: 'edit',
                data: this.selectedSearchOption.SecurityType
            }));
            this.store.dispatch(new fromStore.SetActiveSecurityDetailId({
                display: 'edit',
                data: this.requestPayload.id
            }));
        }
    }

    public displayFn(result?: fromModels.ISecuritySearchResult): string | undefined {
        return result ? result.RCPMName : undefined;
    }

}
