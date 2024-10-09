import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromModels from '../../models';
import * as fromStore from '../../store';
import { MatTabChangeEvent } from '@angular/material/tabs';
import moment from 'moment';

@Component({
  selector: 'app-ssnc-feed-layout',
  templateUrl: './ssnc-feed-layout.component.html',
  styleUrls: ['./ssnc-feed-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SSNCFeedLayout implements OnInit {

  public selectedTab$: Observable<string>;
  public selectedDate$: Observable<any>;
  public summaryData$: Observable<any>;
  public failedTradeData$: Observable<any>;
  public feedData$: Observable<any>;
  public additionalFeedData$: Observable<any>;
  public selectedOrderId$: Observable<number>;
  public fromDate$: Observable<string>;
  public toDate$: Observable<string>;
  public filterText$: Observable<string>;
  public selectedColumn$: Observable<string>;
  
  constructor(private store: Store<fromStore.SSNCFeedState>) {
    this.selectedTab$ = this.store.select(fromStore.getSelectedTab)
    this.selectedDate$ = this.store.select(fromStore.getSelectedDate);
    this.summaryData$ = this.store.select(fromStore.getSSNCSummaryData);
    // this.failedTradeData$ = this.store.select(fromStore.getSSNCFailedTradeData);
    this.feedData$ = this.store.select(fromStore.getSSNCFeedData);
    this.additionalFeedData$ = this.store.select(fromStore.getAdditionalSSNCFeedData)
    this.selectedOrderId$ = this.store.select(fromStore.getSelectedOrderId);
    this.fromDate$ = this.store.select(fromStore.getFromDate)
    this.toDate$ = this.store.select(fromStore.getToDate)
    this.filterText$ = this.store.select(fromStore.getFilterText);
    this.selectedColumn$ = this.store.select(fromStore.getSelectedColumn);
  }

  ngOnInit(): void {
    this.store.dispatch(fromStore.loadSummary())
    this.store.dispatch(fromStore.changeTab('Futures'))
  }

  changeDate(date: string){
    date = moment(date).format('MM-DD-YYYY');
    this.store.dispatch(fromStore.changeSelectedDate(date))
  }

  handleOrderIdClicked(payload: { orderId: number, tabName: string}){
    this.store.dispatch(fromStore.changeTab(payload.tabName))
    this.store.dispatch(fromStore.selectOrderId(payload.orderId))
  }
  
  loadAdditionalFeedData(client_ref: string){
    this.store.dispatch(fromStore.loadAdditionalSSNCFeedData(client_ref))
  }

}
 