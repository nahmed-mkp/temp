import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromStore from './../../store';


@Component({
  selector: 'app-pool-portfolio-curve-comparison-layout',
  templateUrl: './pool-portfolio-curve-comparison-layout.component.html',
  styleUrls: ['./pool-portfolio-curve-comparison-layout.component.scss']
})
export class PoolPortfolioCurveComparisonLayoutComponent implements OnInit, OnChanges {

  @Input() selectedCusip: {Cusip: string; BlbgName: string};
  @Input() openStatus: boolean;

  @Output() closeSideNav = new EventEmitter<boolean>();

  public modelValidationDetail$: Observable<any[]>;
  public modelValidationSummary$: Observable<any[]>;

  constructor(private store: Store<fromStore.State>) { }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.selectedCusip && changes.selectedCusip.currentValue) {
      if (this.openStatus === true) {
        this.loadModelValidation(changes.selectedCusip.currentValue);
      }
    }

    if (changes.openStatus && changes.openStatus.currentValue === true) {
      if (this.selectedCusip !== undefined) {
        this.loadModelValidation(this.selectedCusip);
      }
    }
  }

  loadModelValidation(selectedCusip) {
    this.store.dispatch(new fromStore.LoadPortfolioModelValidationDetail({
      cusip: selectedCusip.Cusip,
      detail_summary: 1
    }));

    this.store.dispatch(new fromStore.LoadPortfolioModelValidationSummary({
      cusip: selectedCusip.Cusip,
      detail_summary: 2
    }));
    this.modelValidationDetail$ = this.store.select(fromStore.getActivePortfolioCusipModelValidationDetails, selectedCusip.Cusip);
    this.modelValidationSummary$ = this.store.select(fromStore.getActivePortfolioCusipModelValidationSummaries, selectedCusip.Cusip);
  }

  onclose() {
    this.closeSideNav.emit(true);
  }

}
