import { Component, OnInit, HostBinding, Inject } from '@angular/core';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { Store } from '@ngrx/store';

import * as fromStore from './../../store';
import * as fromModels from '../../models';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-blotter-dividend-allocation-modifier-dialog',
    templateUrl: './blotter-dividend-allocation-modifier-dialog.component.html',
    styleUrls: ['./blotter-dividend-allocation-modifier-dialog.component.scss']
})
export class BlotterDividendAllocationModifierDialogComponent implements OnInit {

    @HostBinding('class') classes = 'vertical-flex-full-height';

    public data$: Observable<fromModels.DividendAllocationInfo[]>;
    public loading$: Observable<boolean>;
    
    private getGridData: any;

    constructor(
        private store: Store<fromStore.State>,
        @Inject(MAT_DIALOG_DATA) public data,
        public dialogRef: MatDialogRef<BlotterDividendAllocationModifierDialogComponent>) { }

    ngOnInit() {
        this.store.dispatch(new fromStore.LoadDividendAllocationInfo);
        this.data$ = this.store.select(fromStore.getDividendAllocationInfo);
        this.loading$ = this.store.select(fromStore.getDividendAllocationInfoLoading);
    }

    public onCloseClick() {
        this.dialogRef.close();
    }

    getSaveDataHandler(handler) {
        this.getGridData = handler;
    }

    public onSave() {
        const finalSavedData = this.getGridData();
        // console.log('final saved data', finalSavedData);
        this.store.dispatch(new fromStore.UpdateDividendAllocationInfo(finalSavedData));
    }

}
