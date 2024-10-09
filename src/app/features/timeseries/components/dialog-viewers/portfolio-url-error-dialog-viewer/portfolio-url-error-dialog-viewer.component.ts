import { Component, Inject } from '@angular/core';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { Store } from '@ngrx/store';
import * as fromModels from '../../../models';
import * as fromStore from '../../../store';

@Component({
  selector: 'app-portfolio-url-dialog-viewer',
  templateUrl: './portfolio-url-error-dialog-viewer.component.html',
  styleUrls: ['./portfolio-url-error-dialog-viewer.component.scss']
})
export class PortfolioUrlErrorDialogViewerComponent {

  public portfolioName: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: TAB_DIALOG_DATA, 
    public dialogRef: MatDialogRef<PortfolioUrlErrorDialogViewerComponent>, 
    private store: Store<fromStore.State> 
  ) {}

  cancel() {
    this.dialogRef.close(true);
  }
}

type TAB_DIALOG_DATA = {
  portfolio: fromModels.IPortfolio;
} 