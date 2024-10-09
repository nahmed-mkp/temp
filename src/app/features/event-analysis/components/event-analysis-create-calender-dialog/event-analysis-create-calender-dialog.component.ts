import { Component, OnInit, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';

import * as fromModels from '../../models';
import * as fromStore from '../../store';

@Component({
  selector: 'app-event-analysis-create-calender-dialog',
  templateUrl: './event-analysis-create-calender-dialog.component.html',
  styleUrls: ['./event-analysis-create-calender-dialog.component.scss']
})
export class EventAnalysisCreateCalenderDialogComponent implements OnInit {

  public newCalender: fromModels.ICalendar = {
    name: undefined,
    groupId: undefined,
    type: undefined,
    owner: undefined,
  }

  constructor(
    private store: Store<fromStore.EventAnalysisState>,
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<EventAnalysisCreateCalenderDialogComponent>
  ) { }

  ngOnInit() {
    this.newCalender.groupId = this.data.groupId;
    this.newCalender.type = this.data.type || undefined;
    this.newCalender.owner = this.data.owner || undefined;
  }

  onClose() {
    this.dialogRef.close();
  }

  onSaveNewCalender() {
    // console.log('on saving new calender', this.newCalender);
    this.store.dispatch(new fromStore.AddEventCalendar(this.newCalender));
    this.dialogRef.close();
  }

}
