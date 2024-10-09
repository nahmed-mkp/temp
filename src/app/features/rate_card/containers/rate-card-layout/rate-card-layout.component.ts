import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromStore from '../../store';
import * as fromModels from '../../models';
import moment from 'moment';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-rate-card-layout',
  templateUrl: './rate-card-layout.component.html',
  styleUrls: ['./rate-card-layout.component.scss']
})
export class RateCardLayoutComponnet implements OnInit {

  public startDate$: Observable<Date>;
  public endDate$: Observable<Date>;

  public currencies$: Observable<string[]>;
  public selectedCurrencies$: Observable<string[]>;

  public secTypes$: Observable<string[]>;
  public selectedSecTypes$: Observable<string[]>;

  public rateCard$: Observable<fromModels.IRateCard[]>;
  public rateCardLoading$: Observable<boolean>;

  public rateCardAdminFundSecName$: Observable<string>;
  public rateCardAdminFundSecTimeseriesData$: Observable<any>;
  public rateCardAdminFundSecTimeseriesDataLoading$: Observable<boolean>;

  public rateCardAdminFundBucketSecName$: Observable<string>;
  public rateCardAdminFundBucketTimeseriesData$: Observable<any>;
  public rateCardAdminFundBucketTimeseriesDataLoading$: Observable<boolean>;

  public rateCardTimeseriesSecName$: Observable<string>;
  public rateCardTimeseriesData$: Observable<any>;
  public rateCardTimeseriesDataLoading$: Observable<boolean>; 

  public fundingCharges$: Observable<fromModels.IFundingCharge[]>;
  public fundingChargesLoading$: Observable<boolean>;

  public ratesByFundAndSecurity$: Observable<fromModels.IRateByFundAndSecurity[]>;
  public ratesByFundAndSecurityLoading$: Observable<boolean>;

  public ratesByEquity$: Observable<fromModels.IRateByEquity[]>;
  public ratesByEquityLoading$: Observable<boolean>;

  public ratesByEquityTimeseriesSecName$: Observable<string>;
  public ratesByEquityTimeseriesData$: Observable<any>;
  public ratesByEquityTimeseriesDataLoading$: Observable<boolean>;

  public ratesByFundAndBucket$: Observable<fromModels.IRateByFundAndBucket[]>;
  public ratesByFundAndBucketLoading$: Observable<boolean>;

  public editable = true;
  public activeTab = 'RateCard';

  public longShortToggle = 'Long';

  constructor(private store: Store<fromStore.RateCardState>) { 

    this.startDate$ = this.store.select(fromStore.getStartDate);
    this.endDate$ = this.store.select(fromStore.getEndDate);

    this.currencies$ = this.store.select(fromStore.getCurrencies);
    this.selectedCurrencies$ = this.store.select(fromStore.getSelectedCurrencies);
    
    this.secTypes$ = this.store.select(fromStore.getSecTypes);
    this.selectedSecTypes$ = this.store.select(fromStore.getSelectedSecTypes);

    this.ratesByFundAndBucket$ = this.store.select(fromStore.getRateByFundAndBucket);
    this.ratesByFundAndBucketLoading$ = this.store.select(fromStore.getRateByFundAndBucketLoading);

    this.ratesByFundAndSecurity$ = this.store.select(fromStore.getRateByFundAndSecurity);
    this.ratesByFundAndSecurityLoading$ = this.store.select(fromStore.getRateByFundAndSecurityLoading);

    this.rateCard$ = this.store.select(fromStore.getRateCard);
    this.rateCardLoading$ = this.store.select(fromStore.getRateCardLoading);

    this.rateCardAdminFundBucketSecName$ = this.store.select(fromStore.getRateCardAdminFundBucketSecName);
    this.rateCardAdminFundBucketTimeseriesData$ = this.store.select(fromStore.getRateCardAdminFundBucketTimeseriesData);
    this.rateCardAdminFundBucketTimeseriesDataLoading$ = this.store.select(fromStore.getRateCardAdminFundBucketTimeseriesDataLoading);
    
    this.rateCardAdminFundSecName$ = this.store.select(fromStore.getRateCardAdminFundSecName);
    this.rateCardAdminFundSecTimeseriesData$ = this.store.select(fromStore.getRateCardAdminFundSecTimeseriesData);
    this.rateCardAdminFundSecTimeseriesDataLoading$ = this.store.select(fromStore.getRateCardAdminFundSecTimeseriesDataLoading);

    this.rateCardTimeseriesSecName$ = this.store.select(fromStore.getRateCardTimeseriesSecName);
    this.rateCardTimeseriesData$ = this.store.select(fromStore.getRateCardTimeseriesData);
    this.rateCardTimeseriesDataLoading$ = this.store.select(fromStore.getRateCardTimeseriesDataLoading);

    this.ratesByEquity$ = this.store.select(fromStore.getRateByEquity);
    this.ratesByEquityLoading$ = this.store.select(fromStore.getRateByEquityLoading);

    this.ratesByEquityTimeseriesSecName$ = this.store.select(fromStore.getRateSecurityEquityTimeseriesSecName);
    this.ratesByEquityTimeseriesData$ = this.store.select(fromStore.getRateSecurityEquityTimeseriesData);
    this.ratesByEquityTimeseriesDataLoading$ = this.store.select(fromStore.getRateSecurityEquityTimeseriesDataLoading);

    this.fundingCharges$ = this.store.select(fromStore.getFundingCharges);
    this.fundingChargesLoading$ = this.store.select(fromStore.getFundingChargesLoading);

    this.store.dispatch(fromStore.loadGroupingData(moment(new Date()).format('MM-DD-YYYY')))
    this.store.dispatch(fromStore.loadRateByFundAndBucket(new Date()));
    this.store.dispatch(fromStore.loadRateByFundAndSecurity(new Date()));
    this.store.dispatch(fromStore.loadRateCard({
      start_date: moment(new Date()).format('MM-DD-YYYY'),
      end_date: moment(new Date()).format('MM-DD-YYYY'),
      sid: null
    }));
    this.store.dispatch(fromStore.loadFundingCharges({
      start_date: moment(new Date()).format('MM-DD-YYYY'),
      end_date: moment(new Date()).format('MM-DD-YYYY'),
      sid: null
    }))
  
    this.store.dispatch(fromStore.loadRateByEquity(new Date()))
  }

  ngOnInit() {

  }

  onSaveFundSecurityRateOverride(payload: fromModels.ISecurityRateUpdate): void { 
    this.store.dispatch(fromStore.saveFundAndSecurityRate(payload));
  }

  onSaveFundBucketRateOverride(payload: fromModels.IBucketRateUpdate): void {
    this.store.dispatch(fromStore.saveFundAndBucketRate(payload));
  }

  onSaveSecurityEquityRateOverride(payload: fromModels.ISecurityEquityRateUpdate): void {
    this.store.dispatch(fromStore.saveSecurityEquityRate(payload))
  }

  onRequestRateTimeseriesData(payload: fromModels.ITimeseriesRequest): void {
    this.store.dispatch(fromStore.loadRateCardTimeseriesData(payload));
  }

  onRequestRateAdminFundBucketTimeseriesData(payload: fromModels.ITimeseriesRequest): void {
    this.store.dispatch(fromStore.loadRateCardAdminFundBucketTimeseriesData(payload))
  }

  onRequestRateAdminFundSecTimeseriesData(payload: fromModels.ITimeseriesRequest): void {
    this.store.dispatch(fromStore.loadRateCardAdminFundSecTimeseriesData(payload))
  }

  onRequestSecurityEquityTimeseriesData(payload: fromModels.ITimeseriesRequest): void {
    this.store.dispatch(fromStore.loadSecurityEquityTimeseriesData(payload))
  }


  onTabChanged(event: MatTabChangeEvent){
    this.activeTab = event.tab.textLabel
  }

  onLongShortToggle(event){
    if(event.checked){
      this.longShortToggle = 'Long'
    } 
    else {
      this.longShortToggle = 'Short'
    }
  }
}
