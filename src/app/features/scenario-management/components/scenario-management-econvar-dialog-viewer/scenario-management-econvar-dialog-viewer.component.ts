import { Component, Inject } from '@angular/core';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { Store } from '@ngrx/store';
import * as fromModels from '../../models';
import * as fromStore from '../../store';

@Component({
  selector: 'app-scenario-management-econvar-dialog-viewer',
  templateUrl: './scenario-management-econvar-dialog-viewer.component.html',
  styleUrls: ['./scenario-management-econvar-dialog-viewer.component.scss']
})
export class ScenarioManagementEconvarDialogViewer {

  public variableName: string;
  public countryList: fromModels.ICountry[];
  public selectedCountryName: string;
  public submitDisabled: boolean = true;

  constructor(@Inject(MAT_DIALOG_DATA) public data, public dialogRef: MatDialogRef<ScenarioManagementEconvarDialogViewer>, private store: Store<fromStore.State> ) {
    this.countryList = this.data.countries;
  }

  save() {
    let payload: fromModels.IEconomicVariableCreateReq = {
      countryCode: this.selectedCountryName,
      variableName: this.variableName
    }
    this.store.dispatch(fromStore.createEconomicVariable(payload))
    this.dialogRef.close(true);
  }

  cancel() {
    this.dialogRef.close(true);
  }


  handleInputChange(event){
    if(this.variableName === undefined || this.selectedCountryName === undefined){
      this.submitDisabled = true
    } else {
      this.submitDisabled = false
    }
  }

}
