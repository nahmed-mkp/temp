import { Component, Inject } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { Store } from '@ngrx/store';
import * as fromActions from '../../../store/actions';
import * as fromStore from '../../../store';

@Component({
  selector: 'app-timeseries-delete-portfolio-dialog-viewer',
  templateUrl: './delete-portfolio-dialog-viewer.component.html',
  styleUrls: ['./delete-portfolio-dialog-viewer.component.scss']
})
export class TimeseriesDeletePortfolioDialogViewerComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data, 
    public dialogRef: MatDialogRef<TimeseriesDeletePortfolioDialogViewerComponent>, 
    private store: Store<fromStore.State>) {
      
   }

  save() {
    this.store.dispatch(fromActions.deletePortfolio(this.data.portfolio))
    this.dialogRef.close(true);
  }

  cancel() {
    this.dialogRef.close(true);
  }

}
