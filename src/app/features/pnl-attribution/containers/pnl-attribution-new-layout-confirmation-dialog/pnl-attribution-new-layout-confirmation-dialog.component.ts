import { Component, OnInit, Inject, HostBinding } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { Store } from '@ngrx/store';

import * as fromStore from './../../store';

@Component({
  selector: 'app-pnl-attribution-new-layout-confirmation-dialog',
  templateUrl: './pnl-attribution-new-layout-confirmation-dialog.component.html',
  styleUrls: ['./pnl-attribution-new-layout-confirmation-dialog.component.scss']
})
export class PnlAttributionNewLayoutConfirmationDialogComponent implements OnInit {

  @HostBinding('class') class = 'vertical-flex-full-height';

  public layoutName: string = '';

  constructor(
    public dialogRef: MatDialogRef<PnlAttributionNewLayoutConfirmationDialogComponent>,
    private store: Store<fromStore.PnlAttributionState>,
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {
  }

  // Event

  public onClose() {
    this.dialogRef.close();
  }

  public onConfirm() {
    this.store.dispatch(new fromStore.CreateNewLayout(this.layoutName));
    this.store.dispatch(new fromStore.AddSelectedLayout(this.layoutName));
    this.dialogRef.close(true);
  }

  public onDelete() {
  }

}
