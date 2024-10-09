import { Component, Inject } from '@angular/core';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { Store } from '@ngrx/store';
import * as fromModels from '../../models';
import * as fromStore from '../../store';

@Component({
  selector: 'app-scenario-management-forecast-period-dialog-viewer',
  templateUrl: './scenario-management-forecast-period-dialog-viewer.component.html',
  styleUrls: ['./scenario-management-forecast-period-dialog-viewer.component.scss']
})
export class ScenarioManagementForecastPeriodDialogViewer {

  public forecastPeriodName: string;
  public econVariableList: fromModels.IEconomicVariable[];
  public selectedEconVariableId: number;

  public submitDisabled = true;

  constructor(@Inject(MAT_DIALOG_DATA) public data, public dialogRef: MatDialogRef<ScenarioManagementForecastPeriodDialogViewer>, private store: Store<fromStore.State> ) {
    this.econVariableList = this.data.econVars;
  }

  save() {
    let payload:fromModels.IForecastPeriodCreateReq = {
      forecastPeriod: this.forecastPeriodName,
      variableId: this.selectedEconVariableId
    }
    this.store.dispatch(fromStore.createForecastPeriod(payload))
    this.dialogRef.close(true);
  }

  cancel() {
    this.dialogRef.close(true);
  }

  handleInputChange(event){
    if(this.selectedEconVariableId === undefined || this.forecastPeriodName === undefined){
      this.submitDisabled = true
    } else {
      this.submitDisabled = false
    }
  }

}
