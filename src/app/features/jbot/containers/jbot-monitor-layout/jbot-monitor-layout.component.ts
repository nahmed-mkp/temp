import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import * as fromModels from '../../models';
import * as fromStore from '../../store';
import { MatSelectChange } from '@angular/material/select';


@Component({
  selector: 'app-jbot-monitor-layout',
  templateUrl: './jbot-monitor-layout.component.html',
  styleUrls: ['./jbot-monitor-layout.component.scss']
})
export class JbotMonitorLayoutComponent implements OnInit {

  public asOfDates$: Observable<string[]>;
  public activeAsOfDate$: Observable<string>;
  public jbotMonitorScores$: Observable<fromModels.JbotMonitorScore[]>;
  public jbotMonitorTimeRange$: Observable<number>;

  public jbotMonitorScoresLoadingStatus$: Observable<boolean>;
  public asOfDatesLoadedStatus$: Observable<boolean>;
  public asOfDatesLoadingStatus$: Observable<boolean>;

  public deltaMode: boolean = false;

  public routeDirectInstrument: string;
  public routeDirectAsOfDate: string;

  constructor(private store: Store<fromStore.JbotState>, private route: ActivatedRoute) { }

  ngOnInit() {
    this.asOfDates$ = this.store.select(fromStore.getJbotMonitorAsOfDates);
    this.activeAsOfDate$ = this.store.select(fromStore.getJbotMonitorActiveAsOfDate);
    this.jbotMonitorScores$ = this.store.select(fromStore.getJbotMonitorScore);
    this.jbotMonitorTimeRange$ = this.store.select(fromStore.getJbotMonitorReverseTimeRange);

    this.jbotMonitorScoresLoadingStatus$ = this.store.select(fromStore.getJbotMonitorScoreLoading);
    this.asOfDatesLoadingStatus$ = this.store.select(fromStore.getJbotMonitorAsOfDateLoading);
    this.asOfDatesLoadedStatus$ = this.store.select(fromStore.getJbotMonitorAsOfDateLoaded);

    this.routeDirectInstrument = this.route.snapshot.params['instrument'];
    this.routeDirectAsOfDate = this.route.snapshot.params['activeAsOfDate'];
    console.log('this.routeDirectInstrument', this.routeDirectInstrument);

    if (this.routeDirectAsOfDate) {
      const date = this.routeDirectAsOfDate.split('-').join('/');
      this.store.dispatch(new fromStore.SetJbotMonitorActiveAsOfDate(date));
      this.store.dispatch(new fromStore.LoadJbotMonitorScore(date));
    }
  }

  onAsOfDateChange(event: MatSelectChange) {
    this.store.dispatch(new fromStore.SetJbotMonitorActiveAsOfDate(event.value));
    this.store.dispatch(new fromStore.LoadJbotMonitorScore(event.value));
  }

  onTimeRangeChange(event: MatSelectChange) {
    this.store.dispatch(new fromStore.SetJbotMonitorReverseTimeRange(event.value));
    this.store.dispatch(new fromStore.LoadJbotMonitorScore());
  }

}
