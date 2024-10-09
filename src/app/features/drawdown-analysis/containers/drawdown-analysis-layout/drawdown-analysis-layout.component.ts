import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription, combineLatest } from 'rxjs';

import * as fromModels from './../../models';
import * as fromStore from './../../store';
import { UntypedFormControl } from '@angular/forms';
import { startWith, debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-drawdown-analysis-layout',
  templateUrl: './drawdown-analysis-layout.component.html',
  styleUrls: ['./drawdown-analysis-layout.component.scss']
})
export class DrawdownAnalysisLayoutComponent implements OnInit, OnDestroy {

  private drawdownAnalysisSecurityList$: Observable<fromModels.DrawDownSecurity[]>;
  private drawdownAnalysisSecurityList: fromModels.DrawDownSecurity[];
  public filteredDrawdownAnalysisSecurityList$: Observable<fromModels.DrawDownSecurity[]>;
  public drawdownAnalysisTableItems$: Observable<fromModels.DrawDownAnalysisResponse[]>;
  public drawdownAnalysisTimeseries$: Observable<fromModels.DrawDownTimeSeriesResponse[]>;

  public drawdownAnalysisTableLoadingStatus$: Observable<boolean>;
  public drawdownAnalysisTableLoadedStatus$: Observable<boolean>;

  public drawdownAnalysisTimeseriesLoadingStatus$: Observable<boolean>;
  public drawdownAnalysisTimeseriesLoadedStatus$: Observable<boolean>;

  public requestDisable = false;
  public myControl = new UntypedFormControl();

  private subscriptions: Subscription[] = [];

  public drawdownAnalysisRequest: fromModels.DrawDownAnalysisRequest;

  public pointSelected: {
    date: string;
    value: number;
  };
  public drawdownAnalysisItemSelected: fromModels.DrawDownAnalysisResponse;

  constructor(private store: Store<fromStore.state>) { }

  ngOnInit() {
    this.store.dispatch(new fromStore.LoadDrawdownAnalysisSecurity());  // action will be moved to route guard in the future

    this.drawdownAnalysisSecurityList$ = this.store.select(fromStore.getAgencyAnalyticsDrawdownSecuritiesEntitiesFlat);
    this.drawdownAnalysisTableItems$ = this.store.select(fromStore.getAgencyAnalyticsDrawdownTableActiveResponse);
    this.drawdownAnalysisTimeseries$ = this.store.select(fromStore.getAgencyAnalyticsDrawdownTimeseriesActiveResponse);

    this.drawdownAnalysisTableLoadingStatus$ = this.store.select(fromStore.getAgencyAnalyticsDrawdownTableResponsesLoadingStatus);
    this.drawdownAnalysisTableLoadedStatus$ = this.store.select(fromStore.getAgencyAnalyticsDrawdownTableResponsesLoadedStatus);
    this.drawdownAnalysisTimeseriesLoadingStatus$ = this.store.select(fromStore.getAgencyAnalyticsDrawdownTimeseriesResponsesLoadingStatus);
    this.drawdownAnalysisTimeseriesLoadedStatus$ = this.store.select(fromStore.getAgencyAnalyticsDrawdownTimeseriesResponsesLoadedStatus);

    this.subscriptions.push(
      combineLatest(this.drawdownAnalysisTableLoadingStatus$, this.drawdownAnalysisTimeseriesLoadingStatus$).subscribe(
        ([tableLoadingStatus, timeseriesLoadingStatus]) => {
          if (tableLoadingStatus || timeseriesLoadingStatus ) { this.requestDisable = true; } else { this.requestDisable = false; }
      })
    );

    this.subscriptions.push(
      this.drawdownAnalysisSecurityList$.subscribe(drawdownAnalysisSecurityList =>
        this.drawdownAnalysisSecurityList = drawdownAnalysisSecurityList)
    );

    this.filteredDrawdownAnalysisSecurityList$ = this.myControl.valueChanges
      .pipe(
        startWith(null),
        debounceTime(200),
        distinctUntilChanged(),
        switchMap( value => {

          return this.filter(value);
        })
      );

    const today = new Date();
    let dd: any = today.getDate();
    let mm: any = today.getMonth() + 1; // January is 0!
    const yyyy = today.getFullYear();
    if (dd < 10) { dd = '0' + dd; }
    if (mm < 10) { mm = '0' + mm; }
    const todayFormat = yyyy + '-' + mm + '-' + dd;
    this.drawdownAnalysisRequest = {
      start_date: '2010-01-01',
      end_date: todayFormat,
      sec_id: 28653,
      securityName: 'EURUSD',
      report_num: 30,
      observe_window: 21,
      calc_method: 'pct',
      direction: 'long'
    };
  }


  // Event function ----------------------------------------------------------------------------------------------------

  onRequestDrawdownAnalysis() {
    if (this.drawdownAnalysisSecurityList) {
      for (let i = 0; i < this.drawdownAnalysisSecurityList.length; i++) {
        if (this.drawdownAnalysisSecurityList[i].Name === this.drawdownAnalysisRequest.securityName) {
          this.drawdownAnalysisRequest.sec_id = this.drawdownAnalysisSecurityList[i].sec_id;
        }
      }
    }
    const temp = Object.assign({}, this.drawdownAnalysisRequest);
    temp.start_date = this.formatDate(temp.start_date);
    temp.end_date = this.formatDate(temp.end_date);
    const drawdownAnalysisRequestWithId = new fromModels.DrawDownAnalysisRequestWithID(temp);

    this.store.dispatch(new fromStore.LoadDrawdownAnalysis(drawdownAnalysisRequestWithId));
  }

  onClean() {
    for (const key in this.drawdownAnalysisRequest) { this.drawdownAnalysisRequest[key] = undefined; }
  }

  onPointSelected(point) {
    this.pointSelected = point;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  onDrawdownAnalysisItemSelected(item: fromModels.DrawDownAnalysisResponse) {
    this.drawdownAnalysisItemSelected = item;
  }




  // Utility function --------------------------------------------------------------------------------------------------

  filter(value: string): Observable<fromModels.DrawDownSecurity[]> {
    return this.drawdownAnalysisSecurityList$
      .pipe(
        map((securityList: fromModels.DrawDownSecurity[]) => securityList.filter(security => security.Name.toLowerCase().includes(value))
      ));
  }

  formatDate(dateString) {
    let date: any = new Date(dateString);
    date = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    return date;
  }
}
