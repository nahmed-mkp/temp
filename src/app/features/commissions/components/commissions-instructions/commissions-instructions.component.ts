import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';

@Component({
    selector: 'app-commissions-instructions-dialog',
    templateUrl: './commissions-instructions.component.html',
    styleUrls: ['./commissions-instructions.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommissionsInstructionsDialogComponent implements OnInit {

    constructor(
        @Inject(MAT_DIALOG_DATA) public data,
        private dialogRef: MatDialogRef<CommissionsInstructionsDialogComponent>
    ) { }

    onClose() {
        this.dialogRef.close();
    }

    ngOnInit(): void { }
}
