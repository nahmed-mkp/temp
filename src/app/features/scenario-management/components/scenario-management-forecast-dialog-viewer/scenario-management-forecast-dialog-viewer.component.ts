import { Component, Inject } from '@angular/core';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { Store } from '@ngrx/store';
import * as fromModels from '../../models';
import * as fromStore from '../../store';

@Component({
  selector: 'app-scenario-management-forecast-dialog-viewer',
  templateUrl: './scenario-management-forecast-dialog-viewer.component.html',
  styleUrls: ['./scenario-management-forecast-dialog-viewer.component.scss']
})
export class ScenarioManagementForecastDialogViewer {

  public scenarioList: fromModels.IScenario[];
  public selectedScenarioId: number;

  public forecastPeriodList: fromModels.IEconomicVariable[];
  public selectedForecastPeriodId: number;

  public mkpValue: number;
  public consensusValue: number;

  public submitDisabled = true;

  constructor(@Inject(MAT_DIALOG_DATA) public data, public dialogRef: MatDialogRef<ScenarioManagementForecastDialogViewer>, private store: Store<fromStore.State> ) {
    this.forecastPeriodList = this.data.forecastPeriods;
    this.scenarioList = this.data.scenarios;
  }

  save() {
    let payload:fromModels.IForecastCreateReq = {
      scenarioId: this.selectedScenarioId,
      forecastPeriodId: this.selectedForecastPeriodId,
      mkpValue: this.mkpValue,
      consensusValue: this.consensusValue
    }
    this.store.dispatch(fromStore.createForecast(payload))
    this.dialogRef.close(true);
  }

  cancel() {
    this.dialogRef.close(true);
  }

  handleInputChange(event){
    if(this.selectedForecastPeriodId === undefined || this.selectedScenarioId === undefined || this.mkpValue === undefined || this.consensusValue === undefined){
      this.submitDisabled = true
    } else {
      this.submitDisabled = false
    }
  }

}
