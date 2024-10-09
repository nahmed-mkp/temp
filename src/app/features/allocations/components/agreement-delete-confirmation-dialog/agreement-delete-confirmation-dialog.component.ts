import { Component, OnInit, Inject } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';

@Component({
  selector: 'app-agreement-delete-confirmation-dialog',
  templateUrl: './agreement-delete-confirmation-dialog.component.html',
  styleUrls: ['./agreement-delete-confirmation-dialog.component.scss']
})
export class AgreementDeleteConfirmationDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<AgreementDeleteConfirmationDialogComponent>
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
