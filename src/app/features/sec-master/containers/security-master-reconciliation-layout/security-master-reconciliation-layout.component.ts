import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as fromStore from './../../store';
import * as fromModels from './../../models';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-security-master-reconciliation-layout',
    templateUrl: './security-master-reconciliation-layout.component.html',
    styleUrls: ['./security-master-reconciliation-layout.component.scss']
})
export class SecurityMasterReconciliationLayoutComponent implements OnInit {

    public createForm: UntypedFormGroup;
    public supportedAssetClasses$: Observable<string[]>;
    public identifiers$: Observable<string[]>;

    public matchData$: Observable<any[]>;
    public unMatchData$: Observable<any[]>;
    public reconciliationLoading$: Observable<boolean>;
    public reconciliationLoaded$: Observable<boolean>;

    public onlyDifferentColumnVisibility: boolean = false;

    public layoutMode = {
        match: true,
        unmatch: true,
    }
    public activeSideScreen = 'unmatch';

    // public expandStyle = {'flex': '1 0 0'};
    // public collapseStyle = {'min-height': '2rem'};

    public activeStyle = {'z-index': 1};
    public nonactiveStyle = {'z-index': 0};

    constructor(private fb: UntypedFormBuilder, private store: Store<fromStore.SecurityMasterState>) {
        this.createForm = this.fb.group({
            startDate: [new Date(), Validators.required],
            endDate: [new Date(), Validators.required],
            target: ['crd', Validators.required],
            secType: ['', Validators.required],
            // securityName: [undefined, null],
        });
    }

    ngOnInit() {
        this.supportedAssetClasses$ = this.store.select(fromStore.getGlobalSecMasterSupportedAssetClasses);
        this.identifiers$ = this.store.select(fromStore.getGlobalSecMasterIdentifiers);

        this.matchData$ = this.store.select(fromStore.getReconciliationMatchData);
        this.unMatchData$ = this.store.select(fromStore.getReconciliationUnMatchData);
        this.reconciliationLoading$ = this.store.select(fromStore.getReconciliationLoadingStatus);
        this.reconciliationLoaded$ = this.store.select(fromStore.getReconciliationLoadedStatus);
    }

    public onLoadSecurity() {
        const target = this.createForm.getRawValue()['target'];
        // const secType = 'GOVT'; // this.createForm.getRawValue()['secType'];
        const secType = this.createForm.getRawValue()['secType'];
        const startDate: string = this.createForm.getRawValue()['startDate'].toLocaleDateString().split('/').join('-');
        const endDate: string = this.createForm.getRawValue()['endDate'].toLocaleDateString().split('/').join('-');
        // const securityName =  this.createForm.getRawValue()['securityName'];
        // if (securityName !== '' && securityName !== null && securityName !== undefined) {
        //     this.store.dispatch(new fromStore.LoadReconciliationSecurityDetail({target, secType, startDate, endDate, securityName}));
        // } else {
        this.store.dispatch(new fromStore.LoadReconciliation({target, secType, startDate, endDate}));
        //}
    }

    public onToggleView(event) {
        this.layoutMode[event] = !this.layoutMode[event];
    }

    public onOnlyDifferentColumnVisibilityChange() {
        this.store.dispatch(new fromStore.SetOnlyDifferentColumnVisibility(this.onlyDifferentColumnVisibility));
    }

    public onChangeScreen(event) {
        this.activeSideScreen = event;
    }
}
