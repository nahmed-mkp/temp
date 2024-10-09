import { Component, Inject } from '@angular/core';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { Store } from '@ngrx/store';
import * as fromModels from '../../../models';
import * as fromStore from '../../../store';
import uuidv1 from 'uuid/v1';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-scenario-analysis-new-portfolio-dialog-viewer',
  templateUrl: './scenario-analysis-new-portfolio-dialog-viewer.component.html',
  styleUrls: ['./scenario-analysis-new-portfolio-dialog-viewer.component.scss']
})
export class ScenarioAnalysisNewPortfolioDialogViewerComponent {

  public isDisabled: boolean;

  private tabName: string;
  private isShared: boolean = false;

  constructor(
      @Inject(MAT_DIALOG_DATA) public data: TAB_DIALOG_DATA, 
      public dialogRef: MatDialogRef<ScenarioAnalysisNewPortfolioDialogViewerComponent>, 
      private store: Store<fromStore.State> 
  ) {
  }

  handleInput(e: InputEvent){
    
    this.isDisabled = false;
    this.tabName = (e.target as HTMLInputElement).value;
    
    let tabs = this.data.tabs;
    let currTabName = this.tabName;

    tabs.map( tab => {
      if(tab.scenario.Name === currTabName){
        this.isDisabled = true;
      }
    })
  }

  save() {

    let newTab: fromModels.ITab = {
      scenario: {
          Name: this.tabName,
          // below needs to be dynamic
          CreatedBy: 'nahmed',
          Shared: false,
          CustomShocks: [],
          Dates: [],
          GeneralShocks: [],
          guid: uuidv1()
      }
    }

    this.dialogRef.close(true);
    this.store.dispatch(fromStore.saveScenario(newTab.scenario))
  }

  handleCheckbox(event: MatCheckboxChange){
    this.isShared = event.checked;
  }
}

type TAB_DIALOG_DATA = {
  tabs: fromModels.ITab[],
} 