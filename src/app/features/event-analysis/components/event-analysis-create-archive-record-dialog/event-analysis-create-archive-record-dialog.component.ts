import { Component, OnInit, Inject } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { Store } from '@ngrx/store';

import * as fromModels from './../../models';
import * as fromStore from './../../store';

@Component({
  selector: 'app-event-analysis-create-archive-record-dialog',
  templateUrl: './event-analysis-create-archive-record-dialog.component.html',
  styleUrls: ['./event-analysis-create-archive-record-dialog.component.scss']
})
export class EventAnalysisCreateArchiveRecordDialogComponent implements OnInit {

  public newTimeseriesAnalysis: fromModels.TimeseriesAnalysis;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef:MatDialogRef<EventAnalysisCreateArchiveRecordDialogComponent>,
    private store: Store<fromStore.EventAnalysisState>, 
  ) { }

  ngOnInit() {
    this.newTimeseriesAnalysis = {
      name: undefined,
      description: undefined,
      guid: this.data
    }
  }

  onClose() {
    this.dialogRef.close(false);
  }

  onSave() {
    this.store.dispatch(new fromStore.AddTimeseriesAnalysis(this.newTimeseriesAnalysis));
    this.dialogRef.close(true);
  }

}
