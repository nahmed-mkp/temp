import { Component, OnInit, Inject, HostBinding } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { MatSelectChange } from '@angular/material/select';
import { Store } from '@ngrx/store';

import * as fromStore from '../../store';
import * as fromModel from '../../models';
import { UntypedFormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-security-master-futures-info-clone-dialog-layout',
    templateUrl: './security-master-futures-info-clone-dialog-layout.component.html',
    styleUrls: ['./security-master-futures-info-clone-dialog-layout.component.scss']
})
export class SecurityMasterFuturesInfoCloneDialogLayoutComponent implements OnInit {

    @HostBinding('class') classes = 'vertical-flex-full-height';

    public selectedFuture: fromModel.IFutureRoot;
    public futures: fromModel.IFutureRoot[];

    constructor(
        @Inject(MAT_DIALOG_DATA) public data,
        public dialogRef: MatDialogRef<SecurityMasterFuturesInfoCloneDialogLayoutComponent>,
        private store: Store<fromStore.SecurityMasterState>,
        private fb: UntypedFormBuilder) { }

    ngOnInit() {
        this.futures = this.data['futures'];
    }

    onClose() {
        this.dialogRef.close(null);
    }

    onRootSelected(event: MatSelectChange) {
        this.selectedFuture = event.value;
        this.dialogRef.close(this.selectedFuture);
    }

}
