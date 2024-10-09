import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromModels from '../../models';
import * as fromStore from '../../store';
import { MatTabChangeEvent } from '@angular/material/tabs';
import moment from 'moment';

@Component({
  selector: 'app-execution-tagging-layout',
  templateUrl: './execution-tagging-layout.component.html',
  styleUrls: ['./execution-tagging-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ExecutionTaggingLayout implements OnInit {
  
  public showReasonEditor$: Observable<boolean>;

  public startDate$: Observable<string>;
  public endDate$: Observable<string>;

  public currentPortfolioManager$: Observable<fromModels.IPortfolioManager>;
  public portfolioManagers$: Observable<fromModels.IPortfolioManager[]>;

  public executionTaggingData$: Observable<fromModels.IExecutionData[]>;
  public executionTaggingDataLoading$: Observable<boolean>;

  public reasons$: Observable<fromModels.IReason[]>;
  public reasonsLoading$: Observable<boolean>;

  constructor(private store: Store<fromStore.ExecutionTaggingState>) {
    this.showReasonEditor$ = this.store.select(fromStore.getShowReasonEditor);
    this.startDate$ = this.store.select(fromStore.getStartDate);
    this.endDate$ = this.store.select(fromStore.getEndDate);
    this.portfolioManagers$ = this.store.select(fromStore.getPortfolioManagers);
    this.executionTaggingData$ = this.store.select(fromStore.getExecutionsTaggingData);
    this.executionTaggingDataLoading$ = this.store.select(fromStore.getExecutionsTaggingDataLoading);
    this.reasons$ = this.store.select(fromStore.getReasons);
    this.reasonsLoading$ = this.store.select(fromStore.getReasonsLoading);
  }
  
  ngOnInit(): void {
    this.store.dispatch(fromStore.loadPortfolioManagers());
    this.store.dispatch(fromStore.loadExecutionsTaggingData());
    this.store.dispatch(fromStore.loadReasons());
  }

  public startDateChanged(date: string): void {
    this.store.dispatch(fromStore.changeStartDate(date));
  }

  public endDateChanged(date: string): void {
    this.store.dispatch(fromStore.changeEndDate(date));
  }

  public portfolioManagerChanged(portfolioManager: fromModels.IPortfolioManager): void {
    this.store.dispatch(fromStore.changeCurrentPortfolioManager(portfolioManager));
  }

  tagUpdated(payload: fromModels.ITagsUpdateReq){
    console.warn(payload)
    this.store.dispatch(fromStore.updateTag(payload));
  }

  reasonUpdated(payload: fromModels.IReasonsUpdateReq){
    console.warn(payload)
    this.store.dispatch(fromStore.updateReason(payload));
  }

  toggleReasonEditor(){
    this.store.dispatch(fromStore.toggleReasonEditor());
  }
  
}
