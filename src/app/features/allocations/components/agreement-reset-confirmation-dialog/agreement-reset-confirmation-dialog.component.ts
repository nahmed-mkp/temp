import { Component, OnInit, Inject } from '@angular/core';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';

@Component({
  selector: 'app-agreement-reset-confirmation-dialog',
  templateUrl: './agreement-reset-confirmation-dialog.component.html',
  styleUrls: ['./agreement-reset-confirmation-dialog.component.scss']
})
export class AgreementResetConfirmationDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<AgreementResetConfirmationDialogComponent>
  ) {}

  ngOnInit() {
  }

  confirm() {
    this.dialogRef.close(true);
  }

  cancel() {
    this.dialogRef.close(false);
  }

}
