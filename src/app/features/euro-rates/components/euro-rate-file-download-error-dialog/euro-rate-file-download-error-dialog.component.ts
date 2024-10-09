import { Component, OnInit, Inject } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';

@Component({
  selector: 'app-euro-rate-file-download-error-dialog',
  templateUrl: './euro-rate-file-download-error-dialog.component.html',
  styleUrls: ['./euro-rate-file-download-error-dialog.component.scss']
})
export class EuroRateFileDownloadErrorDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data,
              public dialogRef: MatDialogRef<EuroRateFileDownloadErrorDialogComponent>) { }

  ngOnInit() {}

  onClose() {
    this.dialogRef.close();
  }

}
