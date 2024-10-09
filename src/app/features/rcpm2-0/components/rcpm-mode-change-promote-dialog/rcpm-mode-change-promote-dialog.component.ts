import { Component, OnInit, HostBinding, Inject } from '@angular/core';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';

@Component({
  selector: 'app-rcpm-mode-change-promote-dialog',
  templateUrl: './rcpm-mode-change-promote-dialog.component.html',
  styleUrls: ['./rcpm-mode-change-promote-dialog.component.scss']
})
export class RcpmModeChangePromoteDialogComponent implements OnInit {

  @HostBinding('class') class = 'vertical-flex-full-height';

  constructor(@Inject(MAT_DIALOG_DATA) public data,
  public dialogRef: MatDialogRef<RcpmModeChangePromoteDialogComponent>) { }

  ngOnInit() {

  }

  onClose(response?: boolean) {
    if (response) {
      this.dialogRef.close(response);
    } else {
      this.dialogRef.close();
    }
  }

}
