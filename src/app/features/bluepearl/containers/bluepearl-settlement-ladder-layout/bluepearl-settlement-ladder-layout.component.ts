import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromStore from '../../store';
import * as fromModels from '../../models';

@Component({
  selector: 'app-bluepearl-settlement-ladder-layout',
  templateUrl: './bluepearl-settlement-ladder-layout.component.html',
  styleUrls: ['./bluepearl-settlement-ladder-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class BluePearlSettlementLadderLayout {

  public settlementDate$: Observable<string>;
  public migrationDate$: Observable<string>;
  public selectedFund$: Observable<fromModels.IFundRes>;
  public funds$: Observable<{fundId: number, fundName: string}[]>;
  public settlementLadderData$: Observable<any>;
  public settlementLadderDataLoading$: Observable<boolean>;
  public repoGovs$: Observable<any>;

  constructor(private store: Store<fromStore.BluePearlState>) {
    this.settlementDate$ = this.store.select(fromStore.getSettlementDate);
    this.migrationDate$ = this.store.select(fromStore.getMigrationDate);
    this.selectedFund$ = this.store.select(fromStore.getSelectedFund);
    this.funds$ = this.store.select(fromStore.getFunds);
    this.settlementLadderData$ = this.store.select(fromStore.getBluePearlSettlementLadder);
    this.settlementLadderDataLoading$ = this.store.select(fromStore.getBluePearlSettlementLadderLoading);
    this.repoGovs$ = this.store.select(fromStore.getRepoGovs);
  }

  ngOnInit(): void {
    
  }


}

