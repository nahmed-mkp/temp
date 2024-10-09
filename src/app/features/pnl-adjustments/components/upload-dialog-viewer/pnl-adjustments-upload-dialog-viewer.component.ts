import { Component, Inject, OnInit } from '@angular/core';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store';

@Component({
  selector: 'app-pnl-adjustments-upload-dialog-viewer',
  templateUrl: './pnl-adjustments-upload-dialog-viewer.component.html',
  styleUrls: ['./pnl-adjustments-upload-dialog-viewer.component.scss']
})
export class PnlAdjustmentsUploadDialogViewerComponent implements OnInit {

  public selectedRowIds: any = {
    ids: []
  }

  constructor(
      @Inject(MAT_DIALOG_DATA) public data, 
      public dialogRef: MatDialogRef<PnlAdjustmentsUploadDialogViewerComponent>, 
      private store: Store<fromStore.State> 
  ) {}

  ngOnInit(): void {
    this.selectedRowIds.ids = this.data.selectedRowIds;
  }

  uploadFailure(ev){
    this.store.dispatch(fromStore.uploadAdjustmentAttachmentsFailed('Failed to upload file'))
  }

  uploadSuccess(ev){
    this.store.dispatch(fromStore.uploadAdjustmentAttachmentsComplete('File uploaded successfully'))
  }
}
