import { Component, OnInit, Input, EventEmitter, Output, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { Subscription, Observable, of } from 'rxjs';
import { MatLegacyDialog as MatDialog, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { startWith, debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';


import * as fromModels from './../../models';
import { ICalendar } from './../../models';
import { EventCalendarManagementLayoutDialogComponent, EventAnalysisRecordsLayoutDialogComponent } from '../../containers';
import { EventAnalysisCreateArchiveRecordDialogComponent } from '../event-analysis-create-archive-record-dialog/event-analysis-create-archive-record-dialog.component';


@Component({
  selector: 'app-event-analysis-configuration-panel',
  templateUrl: './event-analysis-configuration-panel.component.html',
  styleUrls: ['./event-analysis-configuration-panel.component.scss']
})
export class EventAnalysisConfigurationPanelComponent implements OnInit, OnChanges, OnDestroy {

  @Input() preprocessingOptions: fromModels.PreprocessOption[]
  @Input() eventCalenders: fromModels.ICalendar[];
  @Input() activeConfiguration: any;
  @Input() activeTab: string;

  @Output() updateConfiguration: EventEmitter<fromModels.Configuration> =
  new EventEmitter<fromModels.Configuration>();
  @Output() restoreConfiguration: EventEmitter<boolean> = new EventEmitter<boolean>();

  public eventCalenderFormControl = new UntypedFormControl();
  public filteredEventCalenders$: Observable<fromModels.ICalendar[]>;

  public startDayFormatted: Date;
  public endDateFormatted: Date;
  public bounceAnimation: boolean = false;

  private subscription: Subscription;

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
    // AutoComplete
    this.filteredEventCalenders$ = this.eventCalenderFormControl
      .valueChanges
      .pipe(
        startWith(''),
        debounceTime(200),
        distinctUntilChanged(),
        switchMap(value => {
          return this._filter(value);
        })
      );
  }


  ngOnChanges(changes: SimpleChanges) {
    // console.log('changes in configuaration again', changes);
    if(changes.activeConfiguration && changes.activeConfiguration.currentValue) {
      this.activeConfiguration = Object.assign({}, this.activeConfiguration); // input should never be muted
      this.startDayFormatted = new Date(this.activeConfiguration.startDate);
      this.endDateFormatted = new Date(this.activeConfiguration.endDate);
      this.eventCalenderFormControl.setValue(this.activeConfiguration.eventCalender);
    }
  }

  ngOnDestroy() {
    if(this.subscription) this.subscription.unsubscribe();
  }

  // Ui feature ----------------

  openEventAnalysisRecordsDialog() {
    this.dialog.open(EventAnalysisRecordsLayoutDialogComponent, {
      hasBackdrop: false,
      panelClass: 'event-analysis-pop-up-panel',
      width: '50rem',
      height: '40rem',
    })
  }

  openCalenderManagement() {
    const selectedCalenderName = this.eventCalenderFormControl.value;
    this.dialog.open(EventCalendarManagementLayoutDialogComponent, {
      hasBackdrop: false,
      panelClass: 'event-analysis-pop-up-panel',
      width: '50rem',
      height: '40rem',
      data: {
        selectedCalenderName: selectedCalenderName ? selectedCalenderName : undefined,
        activeConfiguration: this.activeConfiguration,
      }
    });
  }

  openCreateNewAnalysesRecord() {
    const dialogRef = this.dialog.open(EventAnalysisCreateArchiveRecordDialogComponent, {
      hasBackdrop: false,
      panelClass: 'event-analysis-pop-up-panel',
      width: '20rem',
      height: '13rem',
      data: this.activeConfiguration.guid
    });
    this.subscription = dialogRef.afterClosed().subscribe(result => {
      if(result) {
        setTimeout(() => this.bounceAnimation = true, 1000);
        setTimeout(() => this.bounceAnimation = false, 4000);
      }
    })
  }

  onRestoreConfigurationToBlankState() {
    this.restoreConfiguration.emit(true);
  }

  onUpdateStartAndEndDate() {
    this.activeConfiguration.startDate = this.startDayFormatted.toLocaleDateString().split('/').join('-');
    this.activeConfiguration.endDate = this.endDateFormatted.toLocaleDateString().split('/').join('-');;
    this.updateConfiguration.emit(this.activeConfiguration);
  }

  onUpdateEventCalenderName(event) {
    this.activeConfiguration.eventCalender = event.option.value;
    if(this.activeConfiguration.daysBefore === undefined && this.activeConfiguration.daysAfter === undefined) {
      this.activeConfiguration.daysBefore = 10;
      this.activeConfiguration.daysAfter = 10;
    }
    this.updateConfiguration.emit(this.activeConfiguration);
  }

  onUpdateEventDaysBeforeAndAfter() {
    this.updateConfiguration.emit(this.activeConfiguration)
  }

  onUpdateConfiguration() {
    const startDate = this.activeConfiguration.startDate.toLocaleDateString().split('/').join('-');
    const endDate = this.activeConfiguration.endDate.toLocaleDateString().split('/').join('-');
    this.activeConfiguration.startDate = startDate;
    this.activeConfiguration.endDate = endDate;
    this.activeConfiguration.eventCalender = this.eventCalenderFormControl.value;

    this.updateConfiguration.emit(this.activeConfiguration);
  }

  onUpdatePreprocessOption() {
    this.updateConfiguration.emit(this.activeConfiguration);
  }

  // Utility -----------

  private _filter(value: string) {
    return of(this.eventCalenders.filter(eventCalender => 
      eventCalender.name.toLowerCase().includes(value.toLowerCase())
    ))
  }

  displayFn(eventCalender?: fromModels.ICalendar): string | undefined {
    return eventCalender ? eventCalender.name : undefined;
  }

}
