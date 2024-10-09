import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription, Subject } from 'rxjs';
import { UntypedFormControl } from '@angular/forms';
import { startWith, debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';

import * as fromStore from './../../store';
import * as fromModels from './../../models';

@Component({
  selector: 'app-portfolio-analysis-layout',
  templateUrl: './portfolio-analysis-layout.component.html',
  styleUrls: ['./portfolio-analysis-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PortfolioAnalysisLayoutComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];

  public portfolioAnalysisSecurityList$: Observable<fromModels.PortfolioAnalysisSecurity[]>;
  public filteredPortfolioAnalysisSecurityList$: Observable<fromModels.PortfolioAnalysisSecurity[]>;
  public myControl = new UntypedFormControl();
  public newSecurity: fromModels.PortfolioAnalysisSecurity;

  // public portfolioAnalysisTimeseries$: Subject<fromModels.PortfolioAnalysisTimeseriesPlot>
  //   = new Subject<fromModels.PortfolioAnalysisTimeseriesPlot>();

  public portfolioAnalysisTimeseries$: Observable<fromModels.PortfolioAnalysisTimeseriesPlot>;
  public portfolioAnalysisStats$: Observable<fromModels.PortfolioAnalysisStats[]>;
  public portfolioAnalysisCorrMatrix$: Observable<fromModels.PortfolioAnalysisCorrMatrix>;

  public portfolioAnalysisLoadingStatus$: Observable<boolean>;
  public portfolioAnalysisLoadedStatus$: Observable<boolean>;
  public portfolioAnalysisResponseError$: Observable<string>;

  public portfolioAnalysisRequest: fromModels.PortfolioAnalysisRequest = {
    start_date: undefined,
    end_date: undefined,
    definition: [
      // {
      //   name: 'EURUSD',
      //   sec_id: 0,
      //   factor: 0.15,
      // }
    ]
  }

  constructor(private store: Store<fromStore.state>) {
    // this.subscriptions.push(this.store.select(fromStore.getAgencyAnalyticsPortfolioAnalysisActiveResponse).subscribe(portfolioAnalysisResponse => {
    //   //console.log('portfolioAnalysisResponse', portfolioAnalysisResponse)
    //   if(portfolioAnalysisResponse) {
        
    //     this.portfolioAnalysisTimeseries$.next(portfolioAnalysisResponse.payload.plot);
    //     // this.portfolioAnalysisStats = portfolioAnalysisResponse.payload.stats;
    //     // this.portfolioAnalysisCorrMatrix = portfolioAnalysisResponse.payload.corr_matrix;
    //     
    //     // console.log('getting portfolioAnalysisResponse', this.portfolioAnalysisTimeseries);
    //   }
    // }));
  }

  ngOnInit() {
    this.store.dispatch(new fromStore.LoadPortfolioAnalysisSecurityList());

    // Source Data fetching
    this.portfolioAnalysisSecurityList$ = this.store.select(fromStore.getAgencyAnalyticsPortfolioAnalysisSecurityListEntities)
    this.filteredPortfolioAnalysisSecurityList$ = this.myControl.valueChanges
      .pipe(
        startWith(''),
        debounceTime(200),
        distinctUntilChanged(),
        switchMap( value => this.filter(value))
      );

    this.portfolioAnalysisTimeseries$ = this.store.select(fromStore.getAgencyAnalyticsPortfolioAnalysisActiveResponseTimeseries);
    this.portfolioAnalysisStats$ = this.store.select(fromStore.getAgencyAnalyticsPortfolioAnalysisActiveResponseStats);
    this.portfolioAnalysisCorrMatrix$ = this.store.select(fromStore.getAgencyAnalyticsPortfolioAnalysisActiveResponseCorrMatrix);
    
    // Data Fetching Status
    this.portfolioAnalysisLoadingStatus$ = this.store.select(fromStore.getAgencyAnalyticsPortfolioAnalysisResponsesLoadingStatus);
    this.portfolioAnalysisLoadedStatus$ = this.store.select(fromStore.getAgencyAnalyticsPortfolioAnalysisResponsesLoadedStatus);
    this.portfolioAnalysisResponseError$ = this.store.select(fromStore.getAgencyAnalyticsPortfolioAnalysisResponsesError);
  }

  ngOnDestroy() {
    if(this.subscriptions.length >=1) {
      this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }
  }


  // User Interaction Function ----------------------------------------------------------------------------------------------------------------------

  addNewSecurity() {
    this.portfolioAnalysisRequest.definition.push({
      name: this.newSecurity.Name,
      sec_id: this.newSecurity.sec_id,
      factor: undefined,
    });
    this.newSecurity = undefined;
  }

  deleteSecurity(index) {
    this.portfolioAnalysisRequest.definition.splice(index, 1);
  }

  submit() {
    const portfolioAnalysisRequestWithID = new fromModels.PortfolioAnalysisRequestWithID(this.portfolioAnalysisRequest);
    this.store.dispatch(new fromStore.LoadPortfolioAnalysis(portfolioAnalysisRequestWithID));
  }



  // Utility function -----------------------------------------------------------------------------------------------------------------------------------

  filter(value: string): Observable<fromModels.PortfolioAnalysisSecurity[]> {
    return this.portfolioAnalysisSecurityList$
      .pipe(
        map((securityList:fromModels.PortfolioAnalysisSecurity[]) => securityList.filter(security => security.Name.toLowerCase().includes(value) || security.Name.toUpperCase().includes(value))
      ))
  }

  displayFn(security?: fromModels.PortfolioAnalysisSecurity): string | undefined {
    return security ? security.Name : undefined;
  }
}
