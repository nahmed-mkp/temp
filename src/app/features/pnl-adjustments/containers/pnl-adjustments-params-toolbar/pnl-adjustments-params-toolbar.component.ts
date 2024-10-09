import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromModels from '../../models';
import * as fromStore from '../../store';
import { MatTabChangeEvent } from '@angular/material/tabs';
import moment from 'moment';

@Component({
  selector: 'app-pnl-adjustments-params-toolbar',
  templateUrl: './pnl-adjustments-params-toolbar.component.html',
  styleUrls: ['./pnl-adjustments-params-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PnlAdjustmentsParamsToolbarLayoutComponent implements OnChanges {

  @Input() startDate: string;
  @Input() endDate: string;

  public formattedStartDate: Date;
  public formattedEndDate: Date;

  @Output() onStartDateChanged = new EventEmitter<string>();
  @Output() onEndDateChanged = new EventEmitter<string>();

  constructor(private store: Store<fromStore.PnlAdjustmentsState>) {

  }

  ngOnChanges(changes): void {
    this.formattedStartDate = moment(this.startDate).toDate();
    this.formattedEndDate = moment(this.endDate).toDate();
  }



  startDateChanged(startDate: Date){
    this.onStartDateChanged.emit(moment(startDate).format('MM-DD-YYYY'));
  }

  endDateChanged(endDate: Date){
    this.onEndDateChanged.emit(moment(endDate).format('MM-DD-YYYY'));
  }
}
