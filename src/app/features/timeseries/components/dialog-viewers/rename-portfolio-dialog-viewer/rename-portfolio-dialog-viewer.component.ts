import { Component, Inject } from '@angular/core';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { Store } from '@ngrx/store';
import * as fromModels from '../../../models';
import * as fromStore from '../../../store';

@Component({
  selector: 'app-rename-portfolio-dialog-viewer',
  templateUrl: './rename-portfolio-dialog-viewer.component.html',
  styleUrls: ['./rename-portfolio-dialog-viewer.component.scss']
})
export class TimeseriesRenamePortfolioDialogViewerComponent {

  public portfolioName: string = '';

  constructor(
      @Inject(MAT_DIALOG_DATA) public data: TAB_DIALOG_DATA, 
      public dialogRef: MatDialogRef<TimeseriesRenamePortfolioDialogViewerComponent>, 
      private store: Store<fromStore.State> 
  ) {}

  save() {
    let newPortfolio = Object.assign({}, this.data.portfolio);
    newPortfolio.name = this.portfolioName;

    this.store.dispatch(fromStore.updatePortfolioName(newPortfolio));
    this.dialogRef.close(true);
  }

  cancel() {
    this.dialogRef.close(true);
  }
  
}

type TAB_DIALOG_DATA = {
  portfolio: fromModels.IPortfolio;
} 