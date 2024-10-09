import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject, combineLatest,  } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';

import * as fromModels from './../../models';
import * as fromStore from './../../store';


@Component({
  selector: 'app-pool-layout',
  templateUrl: './pool-layout.component.html',
  styleUrls: ['./pool-layout.component.scss']
})
export class PoolLayoutComponent implements OnInit, OnDestroy {

  private ngUnsubscribe = new Subject<boolean>();

  constructor(private store: Store<fromStore.State>, private snackBar: MatSnackBar) {}

  ngOnInit() {

    combineLatest(
      this.store.select(fromStore.getAgencyAnalyticsPoolViewerPortfoliosError),
      this.store.select(fromStore.getAgencyAnalyticsPoolPortfoliosSecuritiesError),
      this.store.select(fromStore.getAgencyAnalyticsCreatedPortfolioError)
    ).pipe(takeUntil(this.ngUnsubscribe))
    .subscribe( errors => {

      errors.forEach(error => {
        if (error) {
          this.snackBar.open(error, 'none', {
            duration: 3000
          });
        }
      });
    });



  }

  ngOnDestroy() {
    this.ngUnsubscribe.next(true);
    this.ngUnsubscribe.complete();
  }
}
