import { Component, OnInit, HostBinding, Inject, HostListener, Output, EventEmitter } from '@angular/core';
import * as fromModels from './../../models';
import * as fromStore from './../../store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';

@Component({
  selector: 'app-pool-portfolios-layout',
  templateUrl: './pool-portfolios-layout.component.html',
  styleUrls: ['./pool-portfolios-layout.component.scss']
})
export class PoolPortfoliosLayoutComponent implements OnInit {

  public portfolios$: Observable<fromModels.Portfolio[]>;

  @Output() togglePin = new EventEmitter<boolean>();
  public pinMode = false;

  @HostListener('mouseleave') mouseleave() {
    if (this.pinMode === false) {
    }
  }

  constructor(private store: Store<fromStore.State>,
    ) { }

  ngOnInit() {
    this.portfolios$ = this.store.select(fromStore.getAgencyAnalyticsPoolViewerPortfolios);
  }

  onViewPortfolioDetails(portfolioId) {
    this.store.dispatch(new fromStore.AddActivePortfolio(portfolioId));
    this.store.dispatch(new fromStore.LoadIndicativesFromUserInput({
      portfolioId: portfolioId,
      // cusips: []
    }));
    this.store.dispatch(new fromStore.LoadPortfolioYieldbookResult({
      portfolioId: portfolioId,
      batchIds: []
    }));


    // this.store.dispatch(new fromStore.LoadPoolViewerItems({poolId:'1', portfolioId: portfolioId}));
  }

  // onClose() {
  //   if (this.pinMode === false) {
  //     this.dialogRef.close();
  //   }
  // }
  onTogglePin(event) {
    this.pinMode = event;
    this.togglePin.emit(this.pinMode);
  }

  onSetShortcutPortfolios(event: {cashPortfolio: number; deliverablePortfolio: number; tbaPortfolio: number}) {
    this.store.dispatch(new fromStore.SetShortcutPortfolios(event));
  }
}
