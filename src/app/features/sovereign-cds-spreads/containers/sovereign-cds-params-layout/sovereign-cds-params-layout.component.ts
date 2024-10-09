import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromStore from '../../store';
import { MatTabChangeEvent } from '@angular/material/tabs';
import moment from 'moment';

@Component({
  selector: 'app-soverign-cds-spreads-params-layout',
  templateUrl: './sovereign-cds-params-layout.component.html',
  styleUrls: ['.//sovereign-cds-params-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SovereignCdsSpreadsParamsLayout implements OnChanges {

  @Input() selectedDate: string;
  public formattedDate: Date;

  constructor(private store: Store<fromStore.SovereignCdsFeedsState>) {}

  ngOnChanges(changes: SimpleChanges) {
    if(changes && changes.selectedDate && changes.selectedDate !== null){
      this.formattedDate = moment(this.selectedDate).toDate();
    }
  }

  onDateChanged(dateInput: Date){
    this.store.dispatch(fromStore.changeAsOfDate(
      moment(dateInput).format('MM-DD-YYYY')
    ));
  }

}

