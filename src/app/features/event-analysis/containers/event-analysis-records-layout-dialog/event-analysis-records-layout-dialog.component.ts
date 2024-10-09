import { Component, OnInit, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';

import * as fromModels from '../../models';
import * as fromStore from '../../store';

@Component({
  selector: 'app-event-analysis-records-layout-dialog',
  templateUrl: './event-analysis-records-layout-dialog.component.html',
  styleUrls: ['./event-analysis-records-layout-dialog.component.scss']
})
export class EventAnalysisRecordsLayoutDialogComponent implements OnInit {

  public analysesRecords$: Observable<fromModels.TimeseriesAnalysis[]>

  constructor(
    private store: Store<fromStore.EventAnalysisState>,
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<EventAnalysisRecordsLayoutDialogComponent>
  ) { }

  ngOnInit() {
    //Load Data
    this.analysesRecords$ = this.store.select(fromStore.getTimesseriesAnalyses);
  }

  onClose() {
    this.dialogRef.close();
  }

  // CRUD ----------------------------------------------------------------------

  addNewAnalysisRecord(analysisRecord: fromModels.TimeseriesAnalysis) {
    this.store.dispatch(new fromStore.AddTimeseriesAnalysis(analysisRecord));
  }

  updateAnalysisRecord(analysisRecord: fromModels.TimeseriesAnalysis) {
    this.store.dispatch(new fromStore.UpdateTimeseriesAnalysis(analysisRecord));
  }

  deleteAnalysisRecord(analysisRecord: fromModels.TimeseriesAnalysis) {
    this.store.dispatch(new fromStore.DeleteTimeseriesAnalysis(analysisRecord.guid));
  }

  loadConfiguration(guid: string) {
    this.store.dispatch(new fromStore.LoadConfiguration(guid));
    this.onClose();
  }

}
