import { Component, OnInit } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';

@Component({
  selector: 'app-vol-report-info-dialog',
  templateUrl: './vol-report-info-dialog.component.html',
  styleUrls: ['./vol-report-info-dialog.component.scss']
})
export class VolReportInfoDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<VolReportInfoDialogComponent>,) { }

  ngOnInit() {}

  onClose() {
    this.dialogRef.close();
  }
}
