import { Component, OnInit, Inject } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';

@Component({
  selector: 'app-update-risk-free-rate-dialog',
  templateUrl: './update-risk-free-rate-dialog.component.html',
  styleUrls: ['./update-risk-free-rate-dialog.component.scss']
})
export class UpdateRiskFreeRateDialogComponent implements OnInit {

  public riskFreeRate: number;

  constructor(
    public dialogRef: MatDialogRef<UpdateRiskFreeRateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {}

  onClose() {
    this.dialogRef.close();
  }

  onUpdate() {
    this.dialogRef.close(this.riskFreeRate);
  }

}
