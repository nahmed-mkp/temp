import { Component, Inject, OnInit } from '@angular/core';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { Store } from '@ngrx/store';
import * as fromModels from '../../models';
import * as fromStore from '../../store';

@Component({
  selector: 'app-scenario-management-scenario-period-dialog-viewer',
  templateUrl: './scenario-management-scenario-dialog-viewer.component.html',
  styleUrls: ['./scenario-management-scenario-dialog-viewer.component.scss']
})
export class ScenarioManagementScenarioDialogViewer {

  public scenarioName: string;
  public scenarioDescription: string;
  public scenarioSortOrder: number;
  public scenarioSet: 'FV' | 'ST' = 'FV'
  public submitDisabled: boolean = true; 
  public countryList: fromModels.ICountry[];
  public selectedCountryName: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data, public dialogRef: MatDialogRef<ScenarioManagementScenarioDialogViewer>, private store: Store<fromStore.State> ) {
    this.countryList = this.data.countries;
  }

  save() {
    let payload: fromModels.IScenarioCreateReq = {
      countryCode: this.selectedCountryName,
      scenarioDescription: this.scenarioDescription, 
      scenarioName: this.scenarioName, 
      scenarioSet: this.scenarioSet,
      scenarioSortOrder: this.scenarioSortOrder
    }
    this.store.dispatch(fromStore.createScenario(payload))
    this.dialogRef.close(true);
  }

  cancel() {
    this.dialogRef.close(true);
  }

  handleInputChange(event){
    if(this.scenarioName === undefined || this.scenarioDescription === undefined 
      || this.scenarioSortOrder === undefined || this.selectedCountryName === undefined){
      this.submitDisabled = true
    } else {
      this.submitDisabled = false
    }
  }


}
