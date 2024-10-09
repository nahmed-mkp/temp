import { Component, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';

@Component({
    selector: 'app-dial-name-dialog',
    templateUrl: './dial-name-dialog.component.html',
    styleUrls: ['./dial-name-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialNameDialogComponent implements OnInit {

    public dialName: string;
    
    constructor(public dialogRef: MatDialogRef<DialNameDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data
    ) { }

    ngOnInit() { }

    onCancel() {
        this.dialogRef.close(false);
    }

    onSubmit() {
        this.dialogRef.close(this.dialName);
    }

}
