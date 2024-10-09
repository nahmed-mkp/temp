import { Component, OnInit, Inject } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';

@Component({
    selector: 'app-tag-change-reset-confirmation',
    templateUrl: './change-reset-confirmation.component.html',
    styleUrls: ['./change-reset-confirmation.component.scss']
})
export class TagChangeResetConfirmationComponent implements OnInit {

    constructor(@Inject(MAT_DIALOG_DATA) public data,
        public dialogRef: MatDialogRef<TagChangeResetConfirmationComponent>
    ) { }

    ngOnInit() {
    }

    confirm() {
        this.dialogRef.close(true);
    }

    cancel() {
        this.dialogRef.close(false);
    }
}
