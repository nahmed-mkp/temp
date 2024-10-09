import { Component, OnInit, HostBinding, OnChanges, SimpleChanges, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatLegacyTabChangeEvent as MatTabChangeEvent, MatLegacyTabGroup as MatTabGroup } from '@angular/material/legacy-tabs';
import * as fromStore from '../../store';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import * as moment from 'moment';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker, MatDatepickerInputEvent} from '@angular/material/datepicker';
// tslint:disable-next-line:no-duplicate-imports
import {default as _rollupMoment, Moment} from 'moment';

import * as fromModels from './../../models';
import { ClientSolutionsCapitalFlowsLayoutComponent } from '../client-solutions-capital-flows-layout/client-solutions-capital-flows-layout.component';

const MY_FORMATS = {
  parse: {
    dateInput: 'MMMM YYYY',
  },
  display: {
    dateInput: 'MMMM \'YY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-client-solutions-investor-relations-layout',
  templateUrl: './client-solutions-investor-relations-layout.component.html',
  styleUrls: ['./client-solutions-investor-relations-layout.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})

export class ClientSolutionsInvestorRelationsLayoutComponent implements OnInit, OnDestroy {

  @ViewChild('tabs') tabGroup: MatTabGroup;
  @ViewChild('capitalFlows') capitalFlows: ClientSolutionsCapitalFlowsLayoutComponent;

  public tabs$: Observable<any[]>;
  public tabsLoaded$: Observable<boolean>;
  public tabsLoading$: Observable<boolean>;

  public firmAumBalances$: Observable<any[]>;
  public firmTop10List$: Observable<any[]>;
  public firmRelationshipList$: Observable<any[]>;
  public firmInvestorTypes$: Observable<any[]>;
  public firmRegions$: Observable<any[]>;

  public fundAumBalances$: Observable<any[]>;
  public fundTop10List$: Observable<any[]>;
  public fundInvestorTypes$: Observable<any[]>;
  public fundRegions$: Observable<any[]>;

  public investors$: Observable<any[]>;
  public formData$: Observable<fromModels.CapitalFlowForm>;
  public formDataLoading$: Observable<boolean>;
  public formDataLoaded$: Observable<boolean>;
  public formDataError$: Observable<string>;

  public capitalFlowDateRange$: Observable<fromModels.DateRange>;
  public statementDateRange$: Observable<any>;

  public statements$: Observable<any[]>;
  public statementsLoading$: Observable<boolean>;
  public statementsLoaded$: Observable<boolean>;
  public statementsError$: Observable<string>;

  public exceptions$: Observable<any[]>;
  public exceptionsLoading$: Observable<boolean>;
  public exceptionsLoaded$: Observable<boolean>;
  public exceptionsError$: Observable<string>;

  public canEditInvestorDetails$: Observable<boolean>;
  public canEditCapitalFlows$: Observable<boolean>;

  public subscriptions$: Subscription[] = [];
  public selectedTab$: BehaviorSubject<string> = new BehaviorSubject<string>('Investors');
  public selectedDateRange$: BehaviorSubject<fromModels.DateRange> = new BehaviorSubject<fromModels.DateRange>(null);

  public month = moment(new Date()).month();
  public year = moment(new Date()).year();
  public extraOption = {sizeColumnsToFit: true};

  public varMoment = _rollupMoment || moment;

  public capitalFlowStartDate: Date;
  public capitalFlowEndDate: Date;

  public statementStartDate: Date;
  public statementEndDate: Date;

  public checkAccess = false;

  // Inputs
  public date: UntypedFormControl;

  public capitalFlow = new UntypedFormGroup({
    startDate: new UntypedFormControl(null, Validators.required),
    endDate: new UntypedFormControl(null, Validators.required),
  });

  public statement = new UntypedFormGroup({
    startDate: new UntypedFormControl(null, Validators.required),
    endDate: new UntypedFormControl(null, Validators.required),
  });

  constructor(private store: Store<fromStore.State>) {

    this._setDate();

    this.tabs$ = this.store.select(fromStore.getTabs);
    this.tabsLoaded$ = this.store.select(fromStore.getTabsLoadedStatus);
    this.tabsLoading$ = this.store.select(fromStore.getTabsLoadingStatus);

    this.firmAumBalances$ = this.store.select(fromStore.getFirmAUMBalances);
    this.firmRelationshipList$ = this.store.select(fromStore.getFirmRelationsList);
    this.firmTop10List$ = this.store.select(fromStore.getFirmTop10Investors);
    this.firmInvestorTypes$ = this.store.select(fromStore.getFirmInvestorTypes);
    this.firmRegions$ = this.store.select(fromStore.getFirmRegions);

    this.fundAumBalances$ = this.store.select(fromStore.getFundAUMBalances);
    this.fundTop10List$ = this.store.select(fromStore.getFundTop10Investors);
    this.fundInvestorTypes$ = this.store.select(fromStore.getFundInvestorTypes);
    this.fundRegions$ = this.store.select(fromStore.getFundRegions);
    this.investors$ = this.store.select(fromStore.getInvestors);

    this.statements$ = this.store.select(fromStore.getAdminStatements);
    this.statementsLoading$ = this.store.select(fromStore.getAdminStatementsLoading);
    this.statementsLoaded$ = this.store.select(fromStore.getAdminStatementsLoaded);
    this.statementsError$ = this.store.select(fromStore.getAdminStatementsError);

    this.exceptions$ = this.store.select(fromStore.getAdminStatementExceptions);
    this.exceptionsLoading$ = this.store.select(fromStore.getAdminStatementExceptionsLoading);
    this.exceptionsLoaded$ = this.store.select(fromStore.getAdminStatementExceptionsLoaded);
    this.exceptionsError$ = this.store.select(fromStore.getAdminStatementExceptionsError);

    this.capitalFlowDateRange$ = this.store.select(fromStore.getCapitalFlowDateRange);
    this.statementDateRange$ = this.store.select(fromStore.getStatementDateRange);

    this.formData$ = this.store.select(fromStore.getCapitalFlowFormData);
    this.formDataLoading$ = this.store.select(fromStore.getCapitalFlowFormDataLoading);
    this.formDataLoaded$ = this.store.select(fromStore.getCapitalFlowFormDataLoaded);
    this.formDataError$ = this.store.select(fromStore.getCapitalFlowFormDataError);

    this.canEditInvestorDetails$ = this.store.select(fromStore.getCanEditInvestorDetails);
    this.canEditCapitalFlows$ = this.store.select(fromStore.getCanEditCapitalFlows);

    this.subscriptions$.push(this.selectedTab$.subscribe((selectedTab) => {
      this.loadData(selectedTab);
      this.checkAccess = true;
    }));

    this.subscriptions$.push(this.capitalFlowDateRange$.subscribe((dateRange) => {
      if (dateRange) {

        this.capitalFlowStartDate = moment(dateRange.startDate, 'MM/DD/YYYY').toDate();
        this.capitalFlowEndDate = moment(dateRange.endDate, 'MM/DD/YYYY').toDate();

        this.capitalFlow.get('startDate').setValue(this.capitalFlowStartDate);
        this.capitalFlow.get('endDate').setValue(this.capitalFlowEndDate);
        this._setDateRange();
      }
    }));


    this.subscriptions$.push(this.statementDateRange$.subscribe((dateRange) => {
      if (dateRange) {

        this.statementStartDate = moment(dateRange.startDate, 'MM/DD/YYYY').toDate();
        this.statementEndDate = moment(dateRange.endDate, 'MM/DD/YYYY').toDate();

        this.statement.get('startDate').setValue(this.statementStartDate);
        this.statement.get('endDate').setValue(this.statementEndDate);
        this._setDateRange();
      }
    }));
  }

  ngOnInit() {
    this.store.dispatch(new fromStore.LoadTabs);
    this.store.dispatch(new fromStore.CanEditInvestorDetails());
    this.store.dispatch(new fromStore.CanEditCapitalFlows());
    this.loadInvestors();
  }

  ngOnDestroy(): void {
    this.subscriptions$.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  setMonthAndYear(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value;
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.date.setValue(ctrlValue);
    datepicker.close();
    this.month = moment(ctrlValue).month() + 1;
    this.year = moment(ctrlValue).year();

    this._setTab();
  }

  public changeTab(event: MatTabChangeEvent | string) {
    this._setTab();
  }

  public changeDateRange(startOrEnd: string, event: MatDatepickerInputEvent<Date>) {
    if (startOrEnd === 'start') {
      this.capitalFlowStartDate = event.value;
      this.statementStartDate = event.value;
      this.capitalFlow.get('startDate').setValue(this.capitalFlowStartDate);
      this.statement.get('startDate').setValue(this.statementStartDate);
    } else {
      this.capitalFlowEndDate = event.value;
      this.statementEndDate = event.value;
      this.capitalFlow.get('endDate').setValue(this.capitalFlowEndDate);
      this.statement.get('endDate').setValue(this.statementEndDate);
    }
    this._setDateRange();
    this.loadCapitalFlows(this._getDateRange());
    this.loadAdminStatements(this._getDateRange());
  }

  public loadData(selectedTab: string): void {
    switch (selectedTab.toLowerCase()) {
      case 'firm':
        this.loadFirm(this.month, this.year);
        break;
      case 'investors':
        this.loadInvestors();
        break;
      case 'capitalflows':
        this.capitalFlows.loadCapitalFlows(this._getDateRange());
        break;
      case 'statements':
        this.loadAdminStatements(this._getDateRange());
        break;
      case 'exceptions':
        this.loadStatementExceptions();
        break;
      default:
        this.loadFund(this.month, this.year, selectedTab);
        break;
    }
  }

  public loadFirm(month: any, year: any) {
    this.store.dispatch(new fromStore.LoadFirmAUMBalances( `${year}/${month}`));
    this.store.dispatch(new fromStore.LoadFirmRelationsList( `${year}/${month}`));
    this.store.dispatch(new fromStore.LoadFirmRelationsTop10( `${year}/${month}`));
    this.store.dispatch(new fromStore.LoadFirmInvestorTypes( `${year}/${month}`));
    this.store.dispatch(new fromStore.LoadFirmRegions( `${year}/${month}`));
    // @ts-ignore
    this.lengthRes = this.tabGroup._tabs._results.length;
  }

  public loadInvestors() {
    this.store.dispatch(new fromStore.LoadInvestors);
    this.store.dispatch(new fromStore.LoadCapitalFlowForm());
  }

  public loadFund(month: any, year: any, fundName: string) {
    this.store.dispatch(new fromStore.LoadFundAUMBalances({
      date: `${year}/${month}`,
      fund: fundName
    }));

    this.store.dispatch(new fromStore.LoadFundRelationsTop10({
      date: `${this.year}/${this.month}`,
      fund: fundName
    }));

    this.store.dispatch(new fromStore.LoadFundInvestorTypes({
      date: `${this.year}/${this.month}`,
      fund: fundName
    }));

    this.store.dispatch(new fromStore.LoadFundRegions({
      date: `${this.year}/${this.month}`,
      fund: fundName
    }));
  }

  public loadAdminStatements(payload: fromModels.DateRange): void {
    this.store.dispatch(new fromStore.LoadAdminStatements(payload));
  }

  public loadCapitalFlows(payload: fromModels.DateRange): void {
    this.store.dispatch(new fromStore.LoadCapitalFlows(payload));
  }

  public loadStatementExceptions(): void { 
    this.store.dispatch(new fromStore.LoadAdminStatementExceptions());
  }

  public editInvestor(payload: any): void {
    if (payload) {
      this.store.dispatch(new fromStore.EditInvestor(payload));
    }
  }

  public deleteInvestor(payload: any): void {
    if (payload) {
      this.store.dispatch(new fromStore.DeleteInvestor(payload));
    }
  }

  private _setDate(): void {
    const now = moment();
    let dateToUse = moment().subtract(1, 'months');
    if (now.date() <= 10) {
      dateToUse = moment().subtract(2, 'months');
    }
    this.date = new UntypedFormControl(dateToUse);
    this.month = dateToUse.month() + 1;
    this.year = dateToUse.year();
  }

  private _setDateRange(): void {
    this.selectedDateRange$.next(this._getDateRange());
  }

  private _getDateRange(): fromModels.DateRange {
    const startDate = moment(this.capitalFlowStartDate).format('MM/DD/YYYY');
    const endDate = moment(this.capitalFlowEndDate).format('MM/DD/YYYY');
    return { 'startDate': startDate, 'endDate': endDate };
  }

  private _setTab(): void {
    // @ts-ignore
    const selectedTab = this.tabGroup._tabs._results[this.tabGroup.selectedIndex];
    this.selectedTab$.next(selectedTab.textLabel);
  }

}
