import { Component, OnInit, Input, OnDestroy, HostBinding } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromStore from './../../store';
import * as fromModels from './../../models/snr-dashboard.models';


@Component({
  selector: 'app-snr-macro-dashboard-summary-layout',
  templateUrl: './snr-macro-dashboard-summary-layout.component.html',
  styleUrls: ['./snr-macro-dashboard-summary-layout.component.scss']
})
export class SnrMacroDashboardSummaryLayoutComponent implements OnInit, OnDestroy {

  @HostBinding('class') classes = 'full-strech-block';

  // @Input() macroRun: Observable<fromModels.IMacroRun>;

  @Input() country: string;

  public subscriptions: Subscription[] = [];

  public macroRunLoading$: Observable<boolean>;
  public macroRunLoaded$: Observable<boolean>;
  public macroRunQuarterlyGDP$: Observable<any[]>;
  public macroRunMonthlyGDP$: Observable<any[]>;
  public macroRunMonthlyInflation_core$: Observable<any[]>;
  public macroRunMonthlyInflation_headline$: Observable<any[]>;
  public macroRunQuarterlyGDPDecomposition$: Observable<any[]>;
  public macroRunMonthlyInflationDecomposition$: Observable<any[]>;

  public displayMode = {
    '75%': true,
    '50%': true,
    '25%': true,
    'Actual': true,
    'Consensus': true,
  }

  constructor(private store: Store<fromStore.State>) { }

  ngOnInit() {
    // this.macroRun = this.store.select(fromStore.getSNRMacroRunSelectedMacroRun);
    // this.subscriptions.push(this.macroRun
    //   .subscribe((macroRun) => {
    //     if (macroRun) {
    //       this.store.dispatch(new fromStore.LoadMacroRunResults(macroRun));
    //     }
    // }));

    this.macroRunLoading$ = this.store.select(fromStore.getSNRMacroRunResultsLoading);
    this.macroRunLoaded$ = this.store.select(fromStore.getSNRMacroRunResultsLoaded);
    this.macroRunQuarterlyGDP$ = this.store.select(fromStore.getSNRMacroRunQuarterlyGDP);
    this.macroRunMonthlyGDP$ = this.store.select(fromStore.getSNRMacroRunMonthlyGDP);
    this.macroRunMonthlyInflation_core$ = this.store.select(fromStore.getSNRMacroRunMonthlyInflation_core);
    this.macroRunMonthlyInflation_headline$ = this.store.select(fromStore.getSNRMacroRunMonthlyInflation_headline);
    this.macroRunQuarterlyGDPDecomposition$ = this.store.select(fromStore.getSNRMacroRunQuarterlyGDPDecomposition);
    this.macroRunMonthlyInflationDecomposition$ = this.store.select(fromStore.getSNRMacroRunMonthlyInflationDecomposition);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  public onDisplayModeChange() {
    this.displayMode = {...this.displayMode};
    // console.log('display mode', this.displayMode)
  }

}
