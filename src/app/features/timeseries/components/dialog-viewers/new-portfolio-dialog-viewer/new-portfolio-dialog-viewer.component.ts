import { Component, Inject } from '@angular/core';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { Store } from '@ngrx/store';
import * as fromModels from '../../../models';
import * as fromStore from '../../../store';
import uuidv1 from 'uuid/v1';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-new-portfolio-tab-dialog-viewer',
  templateUrl: './new-portfolio-dialog-viewer.component.html',
  styleUrls: ['./new-portfolio-dialog-viewer.component.scss']
})
export class TimeseriesNewPortfolioDialogViewerComponent {

  public isDisabled: boolean;

  private tabName: string;
  private isShared: boolean = false;

  constructor(
      @Inject(MAT_DIALOG_DATA) public data: TAB_DIALOG_DATA, 
      public dialogRef: MatDialogRef<TimeseriesNewPortfolioDialogViewerComponent>, 
      private store: Store<fromStore.State> 
  ) {
  }

  handleInput(e: InputEvent){
    
    this.isDisabled = false;
    this.tabName = (e.target as HTMLInputElement).value;
    
    let tabs = this.data.tabs;
    let currTabName = this.tabName;

    tabs.map( tab => {
      if(tab.portfolio.name === currTabName){
        this.isDisabled = true;
      }
    })
  }

  save() {

    let newTab: fromModels.ITab = {
      portfolio: {
        name: this.tabName,
        timeseries: [],
        derivedTimeseries: [],
        guid: uuidv1(),
        isShared: this.isShared
      },
      regressionViewMode: 'regression',
    }

    // create new tab
    this.store.dispatch(fromStore.addTab(newTab))
    this.dialogRef.close(true);
  }

  handleCheckbox(event: MatCheckboxChange){
    this.isShared = event.checked;
  }
}

type TAB_DIALOG_DATA = {
  tabs: fromModels.ITab[],
} 