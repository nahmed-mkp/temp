import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromModels from '../../models';
import * as fromStore from '../../store';
import { MatTabChangeEvent } from '@angular/material/tabs';
import moment from 'moment';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-execution-tagging-toolbar-layout',
  templateUrl: './execution-tagging-toolbar-layout.component.html',
  styleUrls: ['./execution-tagging-toolbar-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExecutionTaggingToolbarLayout implements OnChanges {

  @Input() startDate: string;
  @Input() endDate: string;

  @Input() portfolioManagers: fromModels.IPortfolioManager[];


  @Output() startDateChanged = new EventEmitter<string>();
  @Output() endDateChanged = new EventEmitter<string>();
  @Output() portfolioManagerChanged = new EventEmitter<fromModels.IPortfolioManager>();
  @Output() toggleReasonEditor = new EventEmitter<any>();

  public formattedStartDate: Date;
  public formattedEndDate: Date;

  constructor(private store: Store<fromStore.ExecutionTaggingState>) {}

  
  ngOnChanges(changes: SimpleChanges): void {
    if(changes && changes.startDate && changes.startDate.currentValue){
      this.formattedStartDate = moment(changes.startDate.currentValue).toDate();
    }

    if(changes && changes.endDate && changes.endDate.currentValue){
      this.formattedEndDate = moment(changes.endDate.currentValue).toDate();
    }
  }

  public onStartDateChanged(date: Date): void {
    this.startDateChanged.emit(moment(date).format('MM-DD-YYYY'));
  }

  public onEndDateChanged(date: Date): void {
    this.endDateChanged.emit(moment(date).format('MM-DD-YYYY'));
  }

  public onPortfolioManagerChanged(event: MatSelectChange): void {
    let selectedPm = this.portfolioManagers.filter(pm => pm.NTName === event.value)[0];
    this.portfolioManagerChanged.emit(selectedPm);
  }

  public onToggleReasonEditor(){
    this.toggleReasonEditor.emit();
  }
}
