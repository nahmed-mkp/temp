import { Component, OnInit, Inject } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { Store } from '@ngrx/store';

import * as fromStore from './../../store';
import * as fromModels from './../../models/pool-viewer.models';

@Component({
  selector: 'app-create-new-portfolio-popup',
  templateUrl: './create-new-portfolio-popup.component.html',
  styleUrls: ['./create-new-portfolio-popup.component.scss']
})
export class CreateNewPortfolioPopupComponent implements OnInit {

  public displayedColumns: string[];
  public showTable: boolean = false;
  public newPortFolio;

  constructor(
    public dialogRef: MatDialogRef<CreateNewPortfolioPopupComponent>, 
    private store: Store<fromStore.State>,
    @Inject(MAT_DIALOG_DATA) public data?: fromModels.Security[]) {}

  ngOnInit() {
    const currentDate = new Date();
    this.newPortFolio = {
      portfolioId: '',
      name: '',
      owner: '',
      source: 'MAP',
      visibility: '',
      portfolioDate: `${currentDate.getMonth()+1}/${currentDate.getDate()}/${currentDate.getFullYear()}`
    }

    if(this.data) {
      this.showTable = true;
      this.displayedColumns = Object.keys(this.data[0]);
      this.newPortFolio.cusips = this.data.map(Security => Security.cusip);
    }
  }

  onCloseClick() {
    this.dialogRef.close();
  }

  onCreateNewPortfolio() {
    this.store.dispatch(new fromStore.CreatePortfolio(this.newPortFolio));
    this.onCloseClick();
  }

}
