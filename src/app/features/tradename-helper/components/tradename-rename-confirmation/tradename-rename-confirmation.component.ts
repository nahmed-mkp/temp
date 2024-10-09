import { Component, OnInit, Inject } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';

import * as fromModels from '../../models';

@Component({
    selector: 'app-tradename-rename-confirmation-dialog',
    templateUrl: './tradename-rename-confirmation.component.html',
    styleUrls: ['./tradename-rename-confirmation.component.scss']
})
export class TradeNameRenameConfirmationDialogComponent implements OnInit {

    public tradename: fromModels.ITradeName;
    public newTradeNameForm: UntypedFormGroup;

    constructor(@Inject(MAT_DIALOG_DATA) public data,
        public dialogRef: MatDialogRef<TradeNameRenameConfirmationDialogComponent>,
        private fb: UntypedFormBuilder
    ) {
        this.tradename = data.tradename;
        this.newTradeNameForm = this.fb.group({
            newTradeName: ['', [Validators.required]]
        });
    }

    ngOnInit() {
    }

    confirm() {
        const newTradeName = this.newTradeNameForm.value['newTradeName'];
        if (newTradeName !== null) {
            this.tradename = Object.assign({}, this.tradename, {'NewTradeName': newTradeName});
        }
        this.dialogRef.close(this.tradename);
    }

    cancel() {
        this.dialogRef.close(null);
    }

}
