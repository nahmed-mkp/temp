import { Component, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';

@Component({
    selector: 'app-dial-delete-dialog',
    templateUrl: './dial-delete-dialog.component.html',
    styleUrls: ['./dial-delete-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialDeleteDialogComponent implements OnInit {

    public dialName: string;
    
    constructor(public dialogRef: MatDialogRef<DialDeleteDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data
    ) {
        this.dialName = data.dialName;
    }

    ngOnInit() { }

    onCancel() {
        this.dialogRef.close(false);
    }

    onSubmit() {
        this.dialogRef.close(this.dialName);
    }

}
