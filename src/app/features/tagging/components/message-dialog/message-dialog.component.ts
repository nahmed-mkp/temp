import { Component, OnInit, Inject } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';

@Component({
    selector: 'app-message-dialog',
    templateUrl: './message-dialog.component.html',
    styleUrls: ['./message-dialog.component.scss']
})
export class MessageDialogConfirmationComponent
 implements OnInit {

    public text: string;

    constructor(@Inject(MAT_DIALOG_DATA) public data,
        public dialogRef: MatDialogRef<MessageDialogConfirmationComponent>
    ) {
        this.text = data.text;
    }

    ngOnInit() {
    }

    close() {
        this.dialogRef.close(true);
    }
}
