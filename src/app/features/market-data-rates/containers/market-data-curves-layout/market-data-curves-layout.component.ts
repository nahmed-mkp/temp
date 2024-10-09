import { Component, OnInit, HostBinding } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromStore from './../../store';

@Component({
  selector: 'app-market-data-curves-layout',
  templateUrl: './market-data-curves-layout.component.html',
  styleUrls: ['./market-data-curves-layout.component.scss']
})
export class MarketDataCurvesLayoutComponent implements OnInit {

  public curves$: Observable<any[]>;
  public loading$: Observable<boolean>;
  public loaded$: Observable<boolean>;
  public error$: Observable<string>;

  constructor(private store: Store<fromStore.MarketDataRatesState>) { }

  ngOnInit() {
    this.curves$ = this.store.select(fromStore.getSelectedDateCurvesFalt);
    this.loading$ = this.store.select(fromStore.getCurveLoadingStatus);
    this.loaded$ = this.store.select(fromStore.getCurveLoadedStatus);
    this.error$ = this.store.select(fromStore.getCurveError);
  }

}
