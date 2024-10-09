import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs'
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { MatSelectChange } from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';

import * as fromModels from '../../models';
import * as fromStore from '../../store';


@Component({
  selector: 'app-jbot-layout',
  templateUrl: './jbot-layout.component.html',
  styleUrls: ['./jbot-layout.component.scss']
})
export class JbotLayoutComponent implements OnInit {

  public asOfDates$: Observable<string[]>;
  public activeAsOfDate$: Observable<string>;
  public activeAsOfDateJbotResult$: Observable<fromModels.JbotGridData[]>;

  public jbotResultLoadingStatus$: Observable<boolean>;
  public asOfDatesLoadedStatus$: Observable<boolean>;
  public asOfDatesLoadingStatus$: Observable<boolean>;

  public deltaMode = false;

  public routeDirectInstrument: string;
  public routeDirectAsOfDate: string;

  constructor(private store: Store<fromStore.JbotState>, private route: ActivatedRoute) { }

  ngOnInit() {
    this.asOfDates$ = this.store.select(fromStore.getAsOfDates);
    this.activeAsOfDate$ = this.store.select(fromStore.getActiveAsOfDate);
    this.activeAsOfDateJbotResult$ = this.store.select(fromStore.getActiveJbotResult);

    this.jbotResultLoadingStatus$ = this.store.select(fromStore.getJbotResultLoadingStatus);
    this.asOfDatesLoadingStatus$ = this.store.select(fromStore.getAsOfDateLoadingStatus);
    this.asOfDatesLoadedStatus$ = this.store.select(fromStore.getAsOfDateLoadedStatus);

    this.routeDirectInstrument = this.route.snapshot.params['instrument'];
    this.routeDirectAsOfDate = this.route.snapshot.params['activeAsOfDate'];
    console.log('this.routeDirectInstrument', this.routeDirectInstrument);

    if (this.routeDirectAsOfDate) {
      const date = this.routeDirectAsOfDate.split('-').join('/');
      this.store.dispatch(new fromStore.SetActiveAsOfDate(date));
      this.store.dispatch(new fromStore.LoadJbotResult(date));
    }
  }

  onAsOfDateChange(event: MatSelectChange) {
    this.store.dispatch(new fromStore.SetActiveAsOfDate(event.value));
    this.store.dispatch(new fromStore.LoadJbotResult(event.value));
  }

}
