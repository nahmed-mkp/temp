import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ViewChild, Input, SimpleChanges, OnChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromStore from '../../store';
import { MatSelectChange } from '@angular/material/select';
import moment from 'moment';

@Component({
  selector: 'app-bluepearl-settlement-ladder-toolbar-layout',
  templateUrl: './bluepearl-settlement-ladder-toolbar-layout.component.html',
  styleUrls: ['./bluepearl-settlement-ladder-toolbar-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class BluePearlSettlementLadderToolbarLayout implements OnInit, OnChanges{

  @Input() settlementDate;
  @Input() migrationDate;
  @Input() selectedFund;
  @Input() funds;

  public formattedSettlementDate;
  public formattedMigrationDate;
  
  constructor(private store: Store<fromStore.BluePearlState>) {
   
  }

  ngOnInit(): void {
    this.store.dispatch(fromStore.loadSettlementLadder({
      asOfDate: this.settlementDate,
      migrationDate: this.migrationDate, 
      fundId: this.selectedFund.FundID
    }))
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.formattedMigrationDate = moment(this.migrationDate).toDate();
    this.formattedSettlementDate = moment(this.settlementDate).toDate();
  }

  onSettlementDateChanged(e){
    this.store.dispatch(fromStore.changeSettlementDate (e.value))
    this.store.dispatch(fromStore.loadSettlementLadder({
      asOfDate: moment(e.value).format('MM-DD-YYYY'),
      migrationDate: moment(this.migrationDate).format('MM-DD-YYYY'),
      fundId: this.selectedFund.FundID
    }))

  }

  
  onMigrationDateChanged(e){
    this.store.dispatch(fromStore.changeMigrationDate (e.value))
    this.store.dispatch(fromStore.loadSettlementLadder({
      asOfDate: moment(this.settlementDate).format('MM-DD-YYYY'),
      migrationDate: moment(e.value).format('MM-DD-YYYY'),
      fundId: this.selectedFund.FundID
    }))
  }

  onFundChanged(e: MatSelectChange){
    let matchingFund = this.funds.find(fund => fund.FundID === e.value)
    this.store.dispatch(fromStore.changeSelectedFund(matchingFund))
    this.store.dispatch(fromStore.loadSettlementLadder({
      asOfDate: moment(this.settlementDate).format('MM-DD-YYYY'),
      migrationDate: moment(e.value).format('MM-DD-YYYY'),
      fundId: this.selectedFund.FundID
    }))
  }
}

