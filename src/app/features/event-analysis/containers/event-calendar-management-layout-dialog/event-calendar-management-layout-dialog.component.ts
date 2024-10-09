import { Component, OnInit, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';


import * as fromModels from '../../models';
import * as fromStore from '../../store';


@Component({
  selector: 'app-event-calendar-management-layout-dialog',
  templateUrl: './event-calendar-management-layout-dialog.component.html',
  styleUrls: ['./event-calendar-management-layout-dialog.component.scss']
})
export class EventCalendarManagementLayoutDialogComponent implements OnInit {

  public eventCalendars$: Observable<fromModels.ICalendar[]>;
  public activeEventCalenderDates$: Observable<Date[]>;

  constructor(
    private store: Store<fromStore.EventAnalysisState>,
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<EventCalendarManagementLayoutDialogComponent>
    ) { }

  ngOnInit() {

    // Load Data
    this.eventCalendars$ = this.store.select(fromStore.getEventCalendars);
    this.activeEventCalenderDates$ = this.store.select(fromStore.getActiveCalenderDate);
  }

  
  onClose() {
    this.store.dispatch(new fromStore.SetActiveCalenderId(null));
    this.dialogRef.close();
  }

  // CRUD ----------------------------------------------------------------------

  updateSelectedCalendar(calendar: fromModels.ICalendar) {
    this.store.dispatch(new fromStore.UpdateEventCalendar(calendar));
  }

  deleteSelectedCalendar(calendar: fromModels.ICalendar) {
    this.store.dispatch(new fromStore.DeleteEventCalendar(calendar));
  }

  loadSelectedCalenderDate(calendar: fromModels.ICalendar) {
    this.store.dispatch(new fromStore.SetActiveCalenderId(calendar.id));
    this.store.dispatch(new fromStore.LoadCalendarDates(calendar));
  }

  addNewDate(newDate: fromModels.ICalendarDate) {
    this.store.dispatch(new fromStore.AddCalendarDate(newDate));
  }

  deleteDate(date: fromModels.ICalendarDate) {
    this.store.dispatch(new fromStore.DeleteCalendarDate(date));
  }

  updateConfiguration(configuration: fromModels.Configuration) {
    this.store.dispatch(new fromStore.UpdateConfiguration(configuration));
    this.onClose();
  }
}
