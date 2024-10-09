import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromModels from '../../models';
import * as fromStore from '../../store';
import { MatTabChangeEvent } from '@angular/material/tabs';
import moment from 'moment';

@Component({
  selector: 'app-pnl-adjustments-layout',
  templateUrl: './pnl-adjustments-container.component.html',
  styleUrls: ['./pnl-adjustments-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PnlAdjustmentsLayoutComponent implements OnInit {

  public startDate$: Observable<string>;
  public endDate$: Observable<string>;

  public adjustmentsData$: Observable<fromModels.IPnlAdjustment[]>;
  public adjustmentsDataLoading$: Observable<boolean>;
  
  constructor(private store: Store<fromStore.PnlAdjustmentsState>) {
    this.startDate$ = this.store.select(fromStore.getStartDate);
    this.endDate$ = this.store.select(fromStore.getEndDate);

    this.adjustmentsData$ = this.store.select(fromStore.getAdjustments);
    this.adjustmentsDataLoading$ = this.store.select(fromStore.getAdjustmentsLoading);
  }

  ngOnInit(): void {
    this.store.dispatch(fromStore.loadPnlAdjustments());
  }


  onStartDateChanged(startDate){
    this.store.dispatch(fromStore.changeStartDate(startDate));
  }

  onEndDateChanged(endDate){
    this.store.dispatch(fromStore.changeEndDate(endDate));
  }
}
