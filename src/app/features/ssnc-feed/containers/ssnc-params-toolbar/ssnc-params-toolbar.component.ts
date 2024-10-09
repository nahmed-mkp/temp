import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromModels from '../../models';
import * as fromStore from '../../store';
import { MatTabChangeEvent } from '@angular/material/tabs';
import moment from 'moment';

@Component({
  selector: 'app-ssnc-params-toolbar',
  templateUrl: './ssnc-params-toolbar.component.html',
  styleUrls: ['./ssnc-params-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SSNCParamsToolbarLayout implements OnChanges {

  @Input() selectedDate: any;
  @Input() feedData: any;
  @Input() fromDate: string;
  @Input() toDate: string;
  @Output() dateChanged = new EventEmitter<Date>(); 

  public colFilterText = '';
  public cols: string[] = [];
  public formattedToDate: Date;
  public formattedFromDate: Date;

  constructor(private store: Store<fromStore.SSNCFeedState>) {}

  ngOnChanges(changes: SimpleChanges) {
    if(changes && changes.fromDate && changes.fromDate !== null){
      this.formattedFromDate = moment(this.fromDate).toDate();
    }
    if(changes && changes.toDate && changes.toDate !== null){
      this.formattedToDate = moment(this.toDate).toDate();
    }
    if(changes && changes.feedData && changes.feedData.currentValue.length > 0){
      this.cols = Object.keys(this.feedData[0])
    }
  }

  onFromDateChanged(event){
    let date = moment(event).format('MM-DD-YYYY');
    this.store.dispatch(fromStore.changeFromDate(date))
  }

  onToDateChanged(event){
    let date = moment(event).format('MM-DD-YYYY');
    this.store.dispatch(fromStore.changeToDate(date))
  }

  onTextFilterChange(event){
    this.store.dispatch(fromStore.changeFilterText(event))
  }

  onColumnFilterChange(event){
    this.colFilterText = '';
    this.cols = Object.keys(this.feedData[0])
    this.store.dispatch(fromStore.changeSelectedColumn(event))
  }

  onColumnFilterTextChange(event){
    if(event === ''){
      this.cols = Object.keys(this.feedData[0])
    } else {
      this.cols = this.cols.filter( col => col.toLowerCase().includes(event))
    }
  }

}
 