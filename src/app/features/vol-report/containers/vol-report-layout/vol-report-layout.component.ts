import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { MatLegacySelectChange as MatSelectChange } from '@angular/material/legacy-select';
import { Observable, Subscription } from 'rxjs'

import { VolReportInfoDialogComponent } from '../../components';
import * as fromModels from '../../models';
import * as fromStore from '../../store';

@Component({
  selector: 'app-vol-report-layout',
  templateUrl: './vol-report-layout.component.html',
  styleUrls: ['./vol-report-layout.component.scss']
})
export class VolReportLayoutComponent implements OnInit {

  public asOfDates$: Observable<string[]>;
  public activeAsOfDate$: Observable<string>;
  public activeAsOfDateVolReport$: Observable<fromModels.VolReportData[]>;

  public volReportLoadingStatus$: Observable<boolean>;
  public asOfDatesLoadedStatus$: Observable<boolean>;
  public asOfDatesLoadingStatus$: Observable<boolean>;


  constructor(private dialog: MatDialog, private store: Store<fromStore.VolReportState>) { }

  ngOnInit() {
    this.asOfDates$ = this.store.select(fromStore.getAsOfDates);
    this.activeAsOfDate$ = this.store.select(fromStore.getActiveAsOfDate);
    this.activeAsOfDateVolReport$ = this.store.select(fromStore.getActiveVolReport);

    this.volReportLoadingStatus$ = this.store.select(fromStore.getVolReportLoadingStatus);
    this.asOfDatesLoadedStatus$ = this.store.select(fromStore.getAsOfDateLoadedStatus);
    this.asOfDatesLoadingStatus$ = this.store.select(fromStore.getAsOfDateLoadingStatus);
  }

  onOpenInfoDialog() {
    this.dialog.open(VolReportInfoDialogComponent, {
      hasBackdrop: false,
      panelClass: 'event-analysis-pop-up-panel',
      width: '65rem',
      height: '13rem',
    })
  }

  onAsOfDateChange(event: MatSelectChange) {
    this.store.dispatch(new fromStore.SetActiveAsOfDate(event.value));
    this.store.dispatch(new fromStore.LoadVolReport(event.value));
  }
}
