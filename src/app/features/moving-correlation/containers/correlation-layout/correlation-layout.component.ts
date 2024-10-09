import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription, Observable, of } from 'rxjs';
import { UntypedFormControl } from '@angular/forms';
import { startWith, debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';

import { CorrelationRequest } from '../../models';
import * as fromStore from './../../store';
import * as fromModels from './../../models';



@Component({
  selector: 'app-correlation-layout',
  templateUrl: './correlation-layout.component.html',
  styleUrls: ['./correlation-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CorrelationLayoutComponent implements OnInit, OnDestroy {

  private movingCorrelationSecurityList$: string[];
  private subscriptions: Subscription[] = [];

  public correlationRequest: CorrelationRequest = {
    sec_y: '',
    sec_y_method: 'pct',
    sec_x: '',
    sec_x_method: 'pct',
    start_date: '2017-01-02',
    end_date: this.getCurrentDay(),
    window: [21,63],
  }
  public avaliableSecurityListX: string[];
  public avaliableSecurityListY: string[];
  public newWindow: number;
  public allowNewWindow: boolean = true;

  public securityOneFormControl = new UntypedFormControl();
  public securityTwoFormControl = new UntypedFormControl();
  public filteredSecurityListOne$: Observable<string[]>;
  public filteredSecurityListTwo$: Observable<string[]>;

  //ploting data
  public correlationTimeseries: any[];
  public movingWindowsCorrelation: any[];
  public correlationLoadingStatus$: Observable<boolean>;
  public correlationLoadedStatus$: Observable<boolean>;
  public correlationResponseError$: Observable<string>;

  constructor(private store: Store<fromStore.state>) { }

  ngOnInit() {
    this.store.dispatch(new fromStore.LoadMovingCorrelationSecurityList()); // action will be moved to route guard in the future

    //Source Data fetching
    this.subscriptions.push(this.store.select(fromStore.getAgencyAnalyticsMovingCorrelationSecurityListEntities).subscribe(securityList => {
      this.movingCorrelationSecurityList$ = securityList;
      this.avaliableSecurityListX = securityList.filter(security =>  security !== this.correlationRequest.sec_y);
      this.avaliableSecurityListY = securityList.filter(security =>  security !== this.correlationRequest.sec_x);
    }));

    this.subscriptions.push(this.store.select(fromStore.getAgencyAnalyticsMovingCorrelationActiveResponse).subscribe(correlationAnalysis => {
      if(correlationAnalysis) {
        this.movingWindowsCorrelation = correlationAnalysis.correlation;
        this.correlationTimeseries = correlationAnalysis.timeseries;
      }
    }));
    
    //Data Fetching Status
    this.correlationLoadingStatus$ = this.store.select(fromStore.getAgencyAnalyticsMovingCorrelationResponsesLoadingStatus);
    this.correlationLoadedStatus$ = this.store.select(fromStore.getAgencyAnalyticsMovingCorrelationResponsesLoadedStatus);
    this.correlationResponseError$ = this.store.select(fromStore.getAgencyAnalyticsMovingCorrelationResponsesError);

    //AutoComplete
    this.filteredSecurityListOne$ = this.securityOneFormControl
      .valueChanges
      .pipe(
        startWith(''),
        debounceTime(200),
        distinctUntilChanged(),
        switchMap( value => {
          console.log('already')
          return this.filter(value);
        })
      );

    this.filteredSecurityListTwo$ = this.securityTwoFormControl
    .valueChanges
    .pipe(
      startWith(''),
      debounceTime(200),
      distinctUntilChanged(),
      switchMap( value => {
        return this.filter(value);
      })
    );    
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }


  // User interaction Function ----------------------------------------------------------------------------------------

  onSecuritySelection(selectedSecurity, selection) {
    if(selection === 'sec_x') {
      this.avaliableSecurityListY = this.movingCorrelationSecurityList$.filter(security => security !== selectedSecurity)
    }
    if(selection === 'sec_y') {
      this.avaliableSecurityListX = this.movingCorrelationSecurityList$.filter(security => security !== selectedSecurity)
    }
  }

  addNewWindow() {
    this.correlationRequest.window.push(this.newWindow);
    this.newWindow = undefined;
    this.allowNewWindow = this.correlationRequest.window.length < 9;
  }

  deleteWindow(index) {
    this.correlationRequest.window.splice(index, 1);
    this.allowNewWindow = this.correlationRequest.window.length < 9;
  }

  submit() {
    const loadCorrelationWithId = new fromModels.CorrelationRequestWithID(this.correlationRequest)
    this.store.dispatch(new fromStore.LoadMovingCorrelationRollingCorrelation(loadCorrelationWithId));
  }

  getCurrentDay() {
    const today = new Date();
    let dd:any = today.getDate();
    let mm:any = today.getMonth() + 1; //January is 0!
    let yyyy = today.getFullYear();
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    return yyyy + '-' + mm + '-' + dd;
  }

  filter(value: string): Observable<string[]> {
    return of(this.movingCorrelationSecurityList$.filter(security => 
      security.toLowerCase().includes(value) || security.toUpperCase().includes(value)));
  }

}
