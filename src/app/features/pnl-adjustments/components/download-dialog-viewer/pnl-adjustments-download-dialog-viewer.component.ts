import { Component, Inject, OnInit } from '@angular/core';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store';

@Component({
  selector: 'app-pnl-adjustments-download-dialog-viewer',
  templateUrl: './pnl-adjustments-download-dialog-viewer.component.html',
  styleUrls: ['./pnl-adjustments-download-dialog-viewer.component.scss']
})
export class PnlAdjustmentsDownloadDialogViewerComponent implements OnInit {

  public attachmentsArr: string[] = [];
  public rowId: number;

  constructor(
      @Inject(MAT_DIALOG_DATA) public data, 
      public dialogRef: MatDialogRef<PnlAdjustmentsDownloadDialogViewerComponent>, 
      private store: Store<fromStore.State> 
  ) {}

  ngOnInit(): void {
    this.attachmentsArr = this.data.attachments;
    this.rowId = this.data.rowId;
  }

  getFileName(attachment: string){
    let fileName = attachment.split('/').pop();
    return fileName;
  }

  onDownload(filePath: string){
    this.store.dispatch(fromStore.downloadAdjustmentAttachments({rowId: this.rowId, filePath: filePath}))
  }
}
