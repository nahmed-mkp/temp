import { Component, OnInit, OnDestroy, Output, EventEmitter, ChangeDetectionStrategy, HostBinding } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription, Subject, combineLatest } from 'rxjs';
import { FormControl } from '@angular/forms';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';

import * as fromStore from '../../store';
import * as fromModels from '../../models';


@Component({
    selector: 'app-simulator-layout',
    templateUrl: './simulator-layout.component.html',
    styleUrls: ['./simulator-layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SimulatorLayoutComponent implements OnInit, OnDestroy {

    @HostBinding('class') classes = 'vertical-flex-full-height';

    public allocationCache$: Observable<fromModels.ITradeAgreementAllocationCache[]>;
    public allocationCacheLoading$: Observable<boolean>;
    public allocationCacheLoaded$: Observable<boolean>;
    public allocationCacheError$: Observable<string>;

    constructor(private store: Store<fromStore.AllocationsState>) {

        this.allocationCache$ = this.store.select(fromStore.getTradeAgreementAllocationCache);
        this.allocationCacheLoading$ = this.store.select(fromStore.getTradeAgreementAllocationCacheLoadingStatus);
        this.allocationCacheLoaded$ = this.store.select(fromStore.getTradeAgreementAllocationCacheLoadedStatus);
        this.allocationCacheError$ = this.store.select(fromStore.getTradeAgreementAllocationCacheError);
    }

    ngOnInit() {
    }

    ngOnDestroy() {
    }

}
