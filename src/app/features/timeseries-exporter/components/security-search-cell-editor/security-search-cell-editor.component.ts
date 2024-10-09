import { AfterViewInit, ChangeDetectionStrategy, Component, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ICellEditorAngularComp } from 'ag-grid-angular';
import { RowNode, GridApi } from 'ag-grid-community';

import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ElementRef } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as fromModels from '../../models/search.models';
import * as fromStore from './../../store';


@Component({
  selector: 'app-security-search-cell-editor',
  templateUrl: './security-search-cell-editor.component.html',
  styleUrls: ['./security-search-cell-editor.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class SecuritySearchCellEditorComponent implements ICellEditorAngularComp, OnInit, OnDestroy {

  private params: any;
  public origValue: any;
  public value: any;
  public mode: string;
  private gridApi: GridApi;

  public searchResult$: Observable<any[]>;
  public searchLoading$: Observable<boolean>;
  public searchLoaded$: Observable<boolean>;
  public searchError$: Observable<string>;

  public marketDataTypes$: Observable<any[]>;

  public rowData: any;
  public rowNode: RowNode;

  public subscriptions: Subscription[] = [];

  constructor(private store: Store<fromStore.TimeseriesExporterState>) {
    this.searchResult$ = this.store.select(fromStore.getSecuritySearchResults);
    this.searchLoading$ = this.store.select(fromStore.getSecuritySearchLoadingStatus);
    this.searchLoaded$ = this.store.select(fromStore.getSecuritySearchLoadedStatus);
    this.searchError$ = this.store.select(fromStore.getSecuritySearchError);

    this.marketDataTypes$ = this.store.select(fromStore.getMarketDataTypes);

    this.subscriptions.push(this.marketDataTypes$.subscribe((data) => {
      if (data) {
        if (data.length === 1) {
          this.rowData['mdid'] = data[0]['mdid'];
          // this.rowData['displayType'] = data[0]['type'];
          this.rowData['marketDataType'] = data[0]['type'];
        }
      }
    }));
  }

  agInit(params: any): void {
    this.rowData = params.data;
    this.params = params;
    this.origValue = this.params.origValue;
    this.value = this.params.value;
    this.mode = this.params.mode;
    this.gridApi = this.params.api;
    this.rowNode = this.params.node;

    this.store.dispatch(new fromStore.ResetSearch());

    // if (this.params.value) {
    //   this.store.dispatch(new fromStore.LoadMarketDataTypes(this.params.value));
    // }
  }

  getValue(): any {
    return this.value;
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  searchSecurities(payload: string): void {
    this.store.dispatch(new fromStore.SearchSecurity({'text': payload, 'numCount': 10}));
  }

  selectSecurity(payload: {'name': string, 'sid': number}): void {
    this.setValue(payload.name, payload.sid);
  }

  setValue(name: string, sid: number): void {
    this.value = name;
    this.rowData['mdid'] = null;
    this.rowData['marketDataType'] = null;

    this.rowData['displayName'] = name;

    this.store.dispatch(new fromStore.LoadMarketDataTypes({securityName: name, sid: sid}));
    this.store.dispatch(new fromStore.SetActiveSecurityName(name));
    this.gridApi.stopEditing();
  }

}
