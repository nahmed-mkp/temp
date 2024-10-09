import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import moment from 'moment';
import { Observable } from 'rxjs';
import * as fromStore from '../../store';
import * as fromModels from '../../models';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-jpm-agency-deliverables-layout',
  templateUrl: './jpm-agency-deliverables-layout.component.html',
  styleUrls: ['./jpm-agency-deliverables-layout.component.scss']
})
export class JpmAgencyDeliverablesLayoutComponent implements OnInit {

  @ViewChild('sidenav') sidenav: MatSidenav;

  public latestPortfolioDate$: Observable<string>;
  public portfolioDates$: Observable<string[]>;
  public deliverableConfigData$: Observable<any>;

  public deliverableData$: Observable<fromModels.IAgencyData[]>;
  public deliverableDataLoading$: Observable<boolean>;
  
  public cashData$: Observable<fromModels.IAgencyData[]>;
  public cashDataLoading$: Observable<boolean>;

  constructor(private store: Store<fromStore.AgencyDeliverablesState>) {   
    this.latestPortfolioDate$ = this.store.select(fromStore.getLatestPortfolioDate);
    this.portfolioDates$ = this.store.select(fromStore.getPortfolioDates);
    this.deliverableConfigData$ = this.store.select(fromStore.getDeliverableConfigData);
    this.deliverableData$ = this.store.select(fromStore.getDeliverableData);
    this.deliverableDataLoading$ = this.store.select(fromStore.getDeliverableDataLoading);
    this.cashData$ = this.store.select(fromStore.getCashData);
    this.cashDataLoading$ = this.store.select(fromStore.getCashDataLoading);

    this.store.dispatch(fromStore.loadPortfolioDates());
    this.store.dispatch(fromStore.loadLatestPortfolioDate());
    this.store.dispatch(fromStore.loadDeliverableConfigData());
  }

  ngOnInit() {
  }

  onDateChanged(event){
    this.store.dispatch(fromStore.changeLatestPortfolioDate(event.value));
  }

  onOpenSideNav(){
    this.sidenav.open();
  }

}
