import { Component, OnInit, Inject } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';

@Component({
  selector: 'app-investor-delete-confirmation-dialog',
  templateUrl: './investor-delete-confirmation-dialog.component.html',
  styleUrls: ['./investor-delete-confirmation-dialog.component.scss']
})
export class InvestorDeleteConfirmationDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<InvestorDeleteConfirmationDialogComponent>
  ) {}

  ngOnInit() {
  }

  confirm() {
    this.dialogRef.close(true);
  }

  onCloseClick(e: any): void {
    this.dialogRef.close(false);
  }

  cancel() {
    this.dialogRef.close(false);
  }
}
