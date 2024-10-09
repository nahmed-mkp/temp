import { Component, OnInit, Inject } from '@angular/core';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';

import * as fromModels from './../../models';

@Component({
    selector: 'app-tradename-reinstate-confirmation-dialog',
    templateUrl: './tradename-reinstate-confirmation.component.html',
    styleUrls: ['./tradename-reinstate-confirmation.component.scss']
})
export class TradeNameReinstateConfirmationDialogComponent implements OnInit {

    public tradename: fromModels.ITradeName;

    constructor(@Inject(MAT_DIALOG_DATA) public data,
        public dialogRef: MatDialogRef<TradeNameReinstateConfirmationDialogComponent>
    ) {
        this.tradename = data.tradename;
    }

    ngOnInit() {
    }

    confirm() {
        this.dialogRef.close(true);
    }

    cancel() {
        this.dialogRef.close(false);
    }

}
