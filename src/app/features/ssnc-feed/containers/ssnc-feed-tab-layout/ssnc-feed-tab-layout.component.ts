import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromModels from '../../models';
import * as fromStore from '../../store';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-ssnc-tab-layout',
  templateUrl: './ssnc-feed-tab-layout.component.html',
  styleUrls: ['./ssnc-feed-tab-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SSNCFeedTabLayout {

  assetClassMapping = {
    'Futures': 'futures',
    'Bonds': 'bonds',
    'Swaps': 'swaps',
    'Equities': 'equities',
    'Mortgage': 'mortgage',
    'Options': 'options',
    'Forward': 'forward',
    'Spot': 'spot',
    'Repo': 'repo',
    'Swaptions': 'swaptions',
    'FRA': 'fra',
    'CDX': 'cdx',
    'CAP Floor': 'cap_floor',
    'Bond TRS': 'bond_trs',
    'Equity TRS': 'equity_trs',
    'Equity OTC Options': 'equity_otc_options',
    'Bond OTC Options': 'bond_otc_options',
    'FX OTC Options': 'fx_otc_options'    
  }

  public assetClasses = Object.keys(this.assetClassMapping)

  @Input() summaryData: any[];
  @Input() selectedTab: string;
  @Input() feedData: any[];
  @Input() selectedColumn: string;
  @Input() additionalFeedData: any[];
  @Input() selectedOrderId: number;
  
  constructor(private store: Store<fromStore.SSNCFeedState>) {}
 
  changeTab(event: MatTabChangeEvent){
    let tabName = event.tab['textLabel'];
    this.store.dispatch(fromStore.changeTab(tabName));
  }

  loadAdditionalFeedData(client_ref: string){
    this.store.dispatch(fromStore.loadAdditionalSSNCFeedData(client_ref))
  }

  tabMapping(){
    return Object.keys(this.assetClassMapping).indexOf(this.selectedTab)
  }

}
 