import { ChangeDetectionStrategy, Component, Inject, Input, OnInit } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';

@Component({
    selector: 'app-process-restart-confirm',
    templateUrl: './process-restart-confirmation.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProcessRestartConfirmationComponent implements OnInit {

    
    constructor(public dialogRef: MatDialogRef<ProcessRestartConfirmationComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

    ngOnInit(): void { }


    confirm() {
        this.dialogRef.close(true);
    }

    cancel() {
        this.dialogRef.close(false);
    }

}
