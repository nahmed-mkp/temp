import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromStore from './../../store';
import { MatLegacyTabChangeEvent as MatTabChangeEvent } from '@angular/material/legacy-tabs';

@Component({
    selector: 'app-security-master-security-viewer-tab-layout',
    templateUrl: './security-master-security-viewer-tab-layout.component.html',
    styleUrls: ['./security-master-security-viewer-tab-layout.component.scss']
})
export class SecurityMasterSecurityViewerTabLayoutComponent implements OnInit, OnDestroy {

    @Input() displayMode: 'create' | 'edit';

    public showSaveButton: boolean;

    public activeTabs$: Observable<any[]>;
    public ActiveRequestIdSecurityDetail$: Observable<any>;

    public activeSecurityDetailFromSearch$: Observable<any>;
    public activeSecurityDetailFromSearchLoading$: Observable<boolean>;

    public dateSource$: Observable<any>;
    public loading$: Observable<boolean>;
    public dynamicTabLayoutLoading$: Observable<boolean>

    private valueGetterCallBackCollector: any[] = [];
    private subscription: Subscription;


    constructor(private store: Store<fromStore.SecurityMasterState>) { }

    ngOnInit() {
        this.activeTabs$ = this.store.select(fromStore.getActiveSecTypeSecurityTabsByDisplay(this.displayMode));
        this.dynamicTabLayoutLoading$ = this.store.select(fromStore.getSecurityViewerDynamicTabDictLoading);
        this.dateSource$ = this.store.select(fromStore.getActiveSecurityDetailFromSearchByDisplay(this.displayMode));
        this.loading$ = this.store.select(fromStore.getActiveSecurityDetailFromSearchLoadingByDisplay(this.displayMode));

        // if (this.sourceMode === 'activity') {
        //     this.loading$ = this.store.select(fromStore.getSecurityViewerDynamicTabDictLoading);
        //     this.dateSource$ = this.store.select(fromStore.getActiveRequestIdSecurityDetail);
        // } else if (this.sourceMode === 'search') {
        //     this.loading$ = this.store.select(fromStore.getActiveSecurityDetailFromSearchLoading);
        //     this.dateSource$ = this.store.select(fromStore.getActiveSecurityDetailFromSearch);
        // }

        this.subscription = this.activeTabs$.subscribe(result => {
            this.valueGetterCallBackCollector = [];
        });
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    public onTabChanged(event: MatTabChangeEvent) {
        const tabLabel = event.tab.textLabel;

        if (tabLabel === 'Rules' || tabLabel === 'Error' || tabLabel === 'Raw') {
            this.showSaveButton = false;
        } else {
            this.showSaveButton = true;
        }
    }

    public valueGetterCallBack(valueGetter: any) {
        this.valueGetterCallBackCollector.push(valueGetter);
        // console.log('valueGetterCallBackCollector', this.valueGetterCallBackCollector);
    }

    public onSave() {
        let resultObj = {};
        this.valueGetterCallBackCollector.forEach(valueGetter => {
            const formValue = valueGetter();
            resultObj = {...resultObj, ...formValue};
        });

        this.store.dispatch(new fromStore.UpdateSecurityDetail(resultObj));
    }

}
