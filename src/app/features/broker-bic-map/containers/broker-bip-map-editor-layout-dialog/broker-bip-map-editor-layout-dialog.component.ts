import { Component, OnInit, Inject, HostBinding } from '@angular/core';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { Store } from '@ngrx/store';

import * as fromStore from './../../store';
import * as fromModel from './../../models';

@Component({
    selector: 'app-broker-bip-map-editor-layout-dialog',
    templateUrl: './broker-bip-map-editor-layout-dialog.component.html',
    styleUrls: ['./broker-bip-map-editor-layout-dialog.component.scss']
})
export class BrokerBipMapEditorLayoutDialogComponent implements OnInit {

    @HostBinding('class') classes = 'vertical-flex-full-height';

    public rowData: fromModel.IBroker;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data,
        public dialogRef: MatDialogRef<BrokerBipMapEditorLayoutDialogComponent>,
        private store: Store<fromStore.BrokerBicMapState>
    ) { }

    ngOnInit() {
        if (this.data) {
            this.rowData = {...this.data};
        }
    }

    onClose() {
        this.dialogRef.close();
    }

    onSave() {
        this.store.dispatch(new fromStore.UpdateBrokerDetail(this.rowData));
        this.dialogRef.close();
    }

}
