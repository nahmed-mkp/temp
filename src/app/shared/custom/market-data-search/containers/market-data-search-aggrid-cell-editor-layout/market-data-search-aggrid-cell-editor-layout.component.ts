import {Component, OnDestroy, OnInit} from '@angular/core';
import { ICellEditorAngularComp } from 'ag-grid-angular';
import { RowNode, GridApi } from 'ag-grid-community';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromStore from '../../store';
import * as fromModels from '../../models';


@Component({
  selector: 'app-market-data-search-aggrid-cell-editor-layout',
  templateUrl: './market-data-search-aggrid-cell-editor-layout.component.html',
  styleUrls: ['./market-data-search-aggrid-cell-editor-layout.component.scss']
})
export class MarketDataSearchAggridCellEditorLayoutComponent implements ICellEditorAngularComp, OnDestroy {

  private params: any;
  private rowData: any;
  private subscriptions: Subscription[] = [];
  private mdid_targetField: string;
  private gridApi: GridApi;

  public value: any;

  public searchResult$: Observable<any[]>;
  public searchLoading$: Observable<boolean>;
  public searchLoaded$: Observable<boolean>;
  public searchError$: Observable<string>;

  public marketDataTypes$: Observable<any[]>;

  constructor(private store: Store<fromStore.MarketDataSearchState>) {
    this.searchResult$ = this.store.select(fromStore.getSecuritySearchResults);
    this.searchLoading$ = this.store.select(fromStore.getSecuritySearchLoadingStatus);
    this.searchLoaded$ = this.store.select(fromStore.getSecuritySearchLoadedStatus);
    this.searchError$ = this.store.select(fromStore.getSecuritySearchError);

    this.marketDataTypes$ = this.store.select(fromStore.getMarketDataTypes);

    this.subscriptions.push(this.marketDataTypes$.subscribe((data) => {
      if (data) {
        if (data.length === 1) {
          this.rowData[this.mdid_targetField] = data[0]['mdid'];
          // this.rowData['displayType'] = data[0]['type'];
          this.rowData['marketDataType'] = data[0]['type'];
        }
      }
    }));
  }

  agInit(params: any): void {
    this.rowData = params.data;
    this.params = params;
    this.value = this.params.value;
    this.mdid_targetField = this.params.mdid_targetField;
    this.store.dispatch(new fromStore.ResetSearch());
    this.gridApi = params.api;

    if (this.params.value !== null) {
      this.store.dispatch(new fromStore.LoadMarketDataTypes(this.params.value));
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  public getValue(): any {
    return this.value;
  }

  public setValue(name: string, sid: number): void {
    this.value = name;
    this.rowData[this.mdid_targetField] = null;
    this.rowData['marketDataType'] = null;
    this.store.dispatch(new fromStore.LoadMarketDataTypes(sid));
  }

  public searchSecurities(payload: string): void {
    this.store.dispatch(new fromStore.SearchSecurity({'text': payload, 'numCount': 10}));
  }

  public selectSecurity(payload: {'name': string, 'sid': number}): void {
    this.setValue(payload.name, payload.sid);
    this.gridApi.stopEditing();
  }
}
