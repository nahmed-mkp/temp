import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromStore from '../../store';
import * as fromModels from '../../models';


@Component({
  selector: 'app-market-data-enhanced-search-layout',
  templateUrl: './market-data-enhanced-search-layout.component.html',
  styleUrls: ['./market-data-enhanced-search-layout.component.scss']
})
export class MarketDataEnhancedSearchLayoutComponent implements OnInit {

  @Input() customClass: string = '';
  @Input() placeholder: string;

  @Output() onSelectedSecurity = new EventEmitter<fromModels.SecuritySearchResult>();
  @Output() onValueEnter = new EventEmitter<string>();

  public enhancedSearchResult$: Observable<fromModels.SecuritySearchResult[]>;
  public enhancedSearchLoading$: Observable<boolean>;
  public enhancedSearchLoaded$: Observable<boolean>;
  public enhancedSearchError$: Observable<string>;

  constructor(private store: Store<fromStore.MarketDataSearchState>) {}

  ngOnInit() {
    this.enhancedSearchResult$ = this.store.select(fromStore.getEnhancedSecuritySearchResults);
    this.enhancedSearchLoading$ = this.store.select(fromStore.getEnhancedSecuritySearchLoadingStatus);
    this.enhancedSearchLoaded$ = this.store.select(fromStore.getEnhancedSecuritySearchLoadedStatus);
    this.enhancedSearchError$ = this.store.select(fromStore.getEnhancedSecuritySearchError);
  }

  public onSearchSecurities(payload: string) {
    if (payload.length >= 3) {
      this.store.dispatch(new fromStore.EnhanceSearchSecurity({
        searchCriteria: payload,
        count: 10
      }));
    }

    if (payload.length ===0) {
      this.store.dispatch(new fromStore.ResetSearch)
    }
    this.onValueEnter.emit(payload);
  }

  public selectSecurity(payload: fromModels.SecuritySearchResult) {
    this.onSelectedSecurity.emit(payload);
  }
}
