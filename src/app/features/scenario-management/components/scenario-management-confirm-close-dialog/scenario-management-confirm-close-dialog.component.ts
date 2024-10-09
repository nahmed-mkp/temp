import { Component, Inject } from '@angular/core';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { Store } from '@ngrx/store';
import * as fromModels from '../../models';
import * as fromStore from '../../store';

@Component({
  selector: 'app-scenario-management-confirm-close-dialog',
  templateUrl: './scenario-management-confirm-close-dialog.component.html',
  styleUrls: ['./scenario-management-confirm-close-dialog.component.scss']
})
export class ScenarioManagementConfirmCloseDialog {

  constructor(@Inject(MAT_DIALOG_DATA) public data, public dialogRef: MatDialogRef<ScenarioManagementConfirmCloseDialog>, private store: Store<fromStore.State> ) {}

  save() {
   
  }

  cancel() {
    this.dialogRef.close(true);
  }



}
