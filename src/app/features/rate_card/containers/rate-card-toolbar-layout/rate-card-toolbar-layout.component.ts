import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromStore from '../../store';
import moment from 'moment';
import { FormControl } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-rate-card-toolbar-layout',
  templateUrl: './rate-card-toolbar-layout.component.html',
  styleUrls: ['./rate-card-toolbar-layout.component.scss']
})
export class RateCardToolbarLayoutComponnet implements OnInit, OnChanges {

  @Input() startDate: string;
  @Input() endDate: string;

  @Input() currencies: string[];
  @Input() selectedCurrencies: string[];
  
  @Input() secTypes: string[];
  @Input() selectedSecTypes: string[];
  
  @Input() activeTab: string;

  public formattedStartDate: Date;
  public formattedEndDate: Date;

  public secTypeFormControl = new FormControl();
  public currencyFormControl = new FormControl();

  constructor(private store: Store<fromStore.RateCardState>) { 
   
  }
    
  ngOnChanges(changes: SimpleChanges): void {
    if(changes && changes.startDate && changes.startDate.currentValue){
      this.formattedStartDate = moment(this.startDate).toDate();
    }
    if(changes && changes.endDate && changes.endDate.currentValue){
      this.formattedEndDate = moment(this.endDate).toDate();
    }
    if(changes && changes.selectedSecTypes && changes.selectedSecTypes.currentValue){
      this.secTypeFormControl.setValue(changes.selectedSecTypes.currentValue)
    }
    if(changes && changes.selectedCurrencies && changes.selectedCurrencies.currentValue) {      
      this.currencyFormControl.setValue(changes.selectedCurrencies.currentValue)
    }
  }

  ngOnInit() {

  }

  onSecTypeChanged(event: MatSelectChange){
    this.store.dispatch(fromStore.changeSelectedSecTypes(event.value))
  }

  onCurrencyChanged(event: MatSelectChange){
    this.store.dispatch(fromStore.changeSelectedCurrencies(event.value));
  }

  onStartDateChanged(date: Date){
    this.store.dispatch(fromStore.changeStartDate(date))
  }

  onEndDateChanged(date: Date){
    this.store.dispatch(fromStore.changeEndDate(date))
  }

  onSignOff(){
    this.store.dispatch(fromStore.signOff())
  }


}
