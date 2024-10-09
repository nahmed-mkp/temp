import { ChangeDetectionStrategy, Component, HostBinding, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import moment from 'moment';
import { Observable, Subscription } from 'rxjs';
import * as fromModels from '../../models/factor-exposure.models';
import * as fromStore from '../../store';

@Component({
  selector: 'app-factor-exposure-layout',
  templateUrl: './factor-exposure-layout.component.html',
  styleUrls: ['./factor-exposure-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class FactorExposureLayoutComponent implements OnInit, OnChanges, OnDestroy {

  @HostBinding('class') classes = 'vertical-flex-full-height';

  public userAccessLevel$: Observable<boolean>;

  public activeDate$: Observable<string>;
  public activeGrouping$: Observable<string>;

  public dateDropdown$: Observable<string[]>;
  public dateDropdownLoading$: Observable<boolean>;
  public dateDropdownLoaded$: Observable<boolean>;
  public dateDropdownError$: Observable<string>;

  public groupingDropdown$: Observable<string[]>;
  public groupingDropdownLoading$: Observable<boolean>;
  public groupingDropdownLoaded$: Observable<boolean>;
  public groupingDropdownError$: Observable<string>;

  public factorTab$: Observable<string[]>;
  public factorTabLoading$: Observable<boolean>;
  public factorTabLoaded$: Observable<boolean>;
  public factorTabError$: Observable<string>;

  public groupingTab$: Observable<string[]>;
  public groupingTabLoading$: Observable<boolean>;
  public groupingTabLoaded$: Observable<boolean>;
  public groupingTabError$: Observable<string>;

  public positionsLiteData$: Observable<string[]>;
  public positionsLiteDataLoading$: Observable<boolean>;
  public positionsLiteDataLoaded$: Observable<boolean>;
  public positionsLiteDataError$: Observable<string>;

  public positionsGroupingData$: Observable<string[]>;
  public positionsGroupingDataLoading$: Observable<boolean>;
  public positionsGroupingDataLoaded$: Observable<boolean>;
  public positionsGroupingDataError$: Observable<string>;

  public useUSDFilter$: Observable<boolean>;
  public useBpsToFundFilter$: Observable<boolean>;
  public useBpsToPodFilter$: Observable<boolean>;
  public useNullSecFilter$: Observable<boolean>;

  public userSettings$: Observable<any>;
  public userSettingsLoading$: Observable<boolean>;
  public userSettingsLoaded$: Observable<boolean>;
  public userSettingsError$: Observable<string>;

  public subscriptions$: Subscription[] = [];
  public timestamp$: Observable<string>;
  public tabs$: Observable<string[]>;
  public refreshGroupings: boolean = true;

  public positionsAndGroupingData$: Observable<any[]>;
  public positionsAndGroupingDataLoading$: Observable<boolean>;
  public positionsAndGroupingDataLoaded$: Observable<boolean>;

  public groupingNameAndIdMaping$: Observable<any>;

  public refreshSubscription: any;
  public displayMode: string[] = ['$'];

  constructor(private store: Store<fromStore.FactorExposureState>) {

    this.userAccessLevel$ = this.store.select(fromStore.getUserAccessLevel);

    this.activeDate$ = this.store.select(fromStore.getActiveDate);
    this.activeGrouping$ = this.store.select(fromStore.getActiveGrouping);

    this.dateDropdown$ = this.store.select(fromStore.getDateDropdown);
    this.dateDropdownLoaded$ = this.store.select(fromStore.getDateDropdownLoaded);
    this.dateDropdownLoading$ = this.store.select(fromStore.getDateDropdownLoading);
    this.dateDropdownError$ = this.store.select(fromStore.getDateDropdownError)

    this.groupingDropdown$ = this.store.select(fromStore.getGroupingDropdown);
    this.groupingDropdownLoaded$ = this.store.select(fromStore.getGroupingDropdownLoaded);
    this.groupingDropdownLoading$ = this.store.select(fromStore.getGroupingDropdownLoading);
    this.groupingDropdownError$ = this.store.select(fromStore.getGroupingDropdownError)

    this.factorTab$ = this.store.select(fromStore.getFactorTabData);
    this.factorTabLoaded$ = this.store.select(fromStore.getFactorTabDataLoaded);
    this.factorTabLoading$ = this.store.select(fromStore.getFactorTabDataLoading);
    this.factorTabError$ = this.store.select(fromStore.getFactorTabDataError);

    this.groupingTab$ = this.store.select(fromStore.getGroupingTabData);
    this.groupingTabLoaded$ = this.store.select(fromStore.getGroupingTabDataLoaded);
    this.groupingTabLoading$ = this.store.select(fromStore.getGroupingTabDataLoading);
    this.groupingTabError$ = this.store.select(fromStore.getGroupingTabDataError);

    this.positionsLiteData$ = this.store.select(fromStore.getPositionsLiteData);
    this.positionsLiteDataLoaded$ = this.store.select(fromStore.getPositionsLiteDataLoaded);
    this.positionsLiteDataLoading$ = this.store.select(fromStore.getPositionsLiteDataLoading);
    this.positionsLiteDataError$ = this.store.select(fromStore.getPositionsLiteDataError);

    this.positionsGroupingData$ = this.store.select(fromStore.getPositionsGroupingData);
    this.positionsGroupingDataLoaded$ = this.store.select(fromStore.getPositionsGroupingDataLoaded);
    this.positionsGroupingDataLoading$ = this.store.select(fromStore.getPositionsGroupingDataLoading);
    this.positionsGroupingDataError$ = this.store.select(fromStore.getPositionsGroupingDataError);

    this.positionsAndGroupingData$ = this.store.select(fromStore.getPositionsAndGroupingData);
    this.positionsAndGroupingDataLoading$ = this.store.select(fromStore.getPositionsAndGroupingDataLoading);
    this.positionsAndGroupingDataLoaded$ = this.store.select(fromStore.getPositionsAndGroupingDataLoaded);

    this.useUSDFilter$ = this.store.select(fromStore.getUSDFilter);
    this.useBpsToFundFilter$ = this.store.select(fromStore.getBpsToFundFilter);
    this.useBpsToPodFilter$ = this.store.select(fromStore.getBpsToPodFilter);
    this.useNullSecFilter$ = this.store.select(fromStore.getNullSecFilter);
    
    this.userSettings$ = this.store.select(fromStore.getUserSettingsAndActiveDate);
    this.userSettingsLoading$ = this.store.select(fromStore.getUserSettingsLoading);
    this.userSettingsLoaded$ = this.store.select(fromStore.getUserSettingsLoaded);
    this.userSettingsError$ = this.store.select(fromStore.getUserSettingsError);    

    this.timestamp$ = this.store.select(fromStore.getTimestamp);
    this.groupingNameAndIdMaping$ = this.store.select(fromStore.getGroupingNameAndIdMaping);
    this.tabs$ = this.store.select(fromStore.getTabs);

    // this.subscriptions$.push(this.userSettings$
    //   .subscribe((settings) => {
    //     if (settings.settings && settings.activeDate) { 
    //       const visibleGroupings = settings.settings['visibleGroupings'] || [];
    //       visibleGroupings.forEach((grouping) => {
    //         // load data for every grouping
    //          this.changeParams({ 'activeDate': settings['activeDate'], activeGrouping: grouping });
    //         // this.addNewTab(grouping)
    //       });
    //       // switch to the first grouping
    //       // if (visibleGroupings.length > 0) { 
    //       //   this.changeActiveTab({'activeDate': settings['activeDate'], activeGrouping: visibleGroupings[0]});
    //       // }
    //     }    
    //   }));
  }


  ngOnDestroy(): void {
    this.subscriptions$.forEach((subscription$) => {
        subscription$.unsubscribe();
    });
    clearInterval(this.refreshSubscription)
  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  ngOnInit(): void { 
    this.store.dispatch(new fromStore.LoadDropdownDates());
    this.refreshSubscription = setInterval(() => {
      // refresh data every 90 seconds
      if(this.refreshGroupings){
        this.store.dispatch(new fromStore.LoadGroupingTabGridData())
      } else {
        this.store.dispatch(new fromStore.LoadFactorsTabGridData())
      }
    }, 15000);
  }

  public changeParams(params: fromModels.IFactorExposureParams): void {
    params.activeDate = moment(params.activeDate).format('MM-DD-YYYY');
    this.store.dispatch(new fromStore.ParamsChanged(params));
  }

  public changeActiveTab(params){
    if(params.loadFactors){
      this.store.dispatch(new fromStore.LoadFactorsTabGridData())
      this.refreshGroupings = false;
    } else {
      this.store.dispatch(new fromStore.SetActiveGrouping(params.activeGrouping))
      this.refreshGroupings = true;
    }
  }

  public tabClosed(tabName: string): void {
    // dispatch close tab with tab name here
    // alert(`Close ${tabName}`);
  }

  public updateDisplayFilters(filterObj){
    filterObj.USD ? this.store.dispatch(new fromStore.ApplyUSDFilter()) : this.store.dispatch(new fromStore.RemoveUSDFilter());
    filterObj.bpsToFund ? this.store.dispatch(new fromStore.ApplyBpsToFundFilter()) : this.store.dispatch(new fromStore.RemoveBpsToFundFilter);
    filterObj.bpsToPod ? this.store.dispatch(new fromStore.ApplyBpsToPodFilter()) : this.store.dispatch(new fromStore.RemoveBpsToPodFilter);
  }

  public addNewTab(grouping){
    this.store.dispatch(new fromStore.AddNewTabGrouping(grouping))
  }

  public updateNullSecFilters(useFilter: boolean){
    useFilter ? this.store.dispatch(new fromStore.ApplyNullSecFilter()) : this.store.dispatch(new fromStore.RemoveNullSecFilter());
  }
  
}



