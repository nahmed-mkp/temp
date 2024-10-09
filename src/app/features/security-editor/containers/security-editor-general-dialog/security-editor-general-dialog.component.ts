import { Component, OnInit, Inject, HostBinding } from '@angular/core';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';

@Component({
    selector: 'app-security-editor-general-dialog',
    templateUrl: './security-editor-general-dialog.component.html',
    styleUrls: ['./security-editor-general-dialog.component.scss']
})
export class SecurityEditorGeneralDialogComponent implements OnInit {

    @HostBinding('class') classes = 'vertical-flex-full-height';

    public mode: 'compact' | 'normal' = 'normal';
    public targetSid;
    public rowData: any = {}

    constructor(
        @Inject(MAT_DIALOG_DATA) public data,
        public dialogRef: MatDialogRef<SecurityEditorGeneralDialogComponent>
    ) { }

    ngOnInit() {

        if (this.data && this.data.sid) {
            this.mode = 'compact';
            this.targetSid = this.data.sid;
            this.rowData = this.data.rowData;
        }
    }

    onClose() {
        this.dialogRef.close();
    }

}
