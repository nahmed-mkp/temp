import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import * as fromModels from '../../models';
import * as fromStore from '../../store';
import { MatSelectChange } from '@angular/material/select';


@Component({
  selector: 'app-jbot-tech-layout',
  templateUrl: './jbot-tech-layout.component.html',
  styleUrls: ['./jbot-tech-layout.component.scss']
})
export class JbotTechLayoutComponent implements OnInit {

  public asOfDates$: Observable<string[]>;
  public activeAsOfDate$: Observable<string>;
  public jbotTechScores$: Observable<fromModels.JbotTechScore[]>;
  public jbotTechTimeRange$: Observable<number>;

  public jbotTechScoresLoadingStatus$: Observable<boolean>;
  public asOfDatesLoadedStatus$: Observable<boolean>;
  public asOfDatesLoadingStatus$: Observable<boolean>;

  public routeDirectInstrument: string;
  public routeDirectAsOfDate: string;

  constructor(private store: Store<fromStore.JbotState>, private route: ActivatedRoute) { }

  ngOnInit() {
    this.asOfDates$ = this.store.select(fromStore.getJbotTechAsOfDates);
    this.activeAsOfDate$ = this.store.select(fromStore.getJbotTechActiveAsOfDate);
    this.jbotTechScores$ = this.store.select(fromStore.getJbotTechScore);
    this.jbotTechTimeRange$ = this.store.select(fromStore.getJbotTechReverseTimeRange);

    this.jbotTechScoresLoadingStatus$ = this.store.select(fromStore.getJbotTechScoreLoading);
    this.asOfDatesLoadingStatus$ = this.store.select(fromStore.getJbotTechAsOfDateLoading);
    this.asOfDatesLoadedStatus$ = this.store.select(fromStore.getJbotTechAsOfDateLoaded);

    this.routeDirectInstrument = this.route.snapshot.params['instrument'];
    this.routeDirectAsOfDate = this.route.snapshot.params['activeAsOfDate'];
    console.log('this.routeDirectInstrument', this.routeDirectInstrument);

    if (this.routeDirectAsOfDate) {
      const date = this.routeDirectAsOfDate.split('-').join('/');
      this.store.dispatch(new fromStore.SetJbotTechActiveAsOfDate(date));
      this.store.dispatch(new fromStore.LoadJbotTechScore(date));
    }
  }

  onAsOfDateChange(event: MatSelectChange) {
    this.store.dispatch(new fromStore.SetJbotTechActiveAsOfDate(event.value));
    this.store.dispatch(new fromStore.LoadJbotTechScore(event.value));
  }

  onTimeRangeChange(event: MatSelectChange) {
    this.store.dispatch(new fromStore.SetJbotTechReverseTimeRange(event.value));
    this.store.dispatch(new fromStore.LoadJbotTechScore());
  }

}
