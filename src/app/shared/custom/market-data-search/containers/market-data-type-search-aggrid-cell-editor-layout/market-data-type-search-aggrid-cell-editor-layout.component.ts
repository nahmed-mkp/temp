import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ICellEditorAngularComp } from 'ag-grid-angular';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromStore from '../../store';
import * as fromModels from '../../models';
import { MatSelectChange, MatSelect } from '@angular/material/select';
import { GridApi } from 'ag-grid-community';

@Component({
  selector: 'app-market-data-type-search-aggrid-cell-editor-layout',
  templateUrl: './market-data-type-search-aggrid-cell-editor-layout.component.html',
  styleUrls: ['./market-data-type-search-aggrid-cell-editor-layout.component.scss']
})
export class MarketDataTypeSearchAggridCellEditorLayoutComponent implements ICellEditorAngularComp, OnDestroy {

  @ViewChild('mySelect', {static: true}) mySelect: MatSelect;

  private params: any;
  public value: any;
  private mdid_targetField: string;
  private gridApi: GridApi;

  public marketDataTypes$: Observable<any[]>;
  public marketDataTypesLoading$: Observable<boolean>;
  public marketDataTypesLoaded$: Observable<boolean>;
  public marketDataTypesError$: Observable<string>;

  public rowData: any;
  public marketData: any[] = [];

  public marketData$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public subscriptions: Subscription[] = [];

  constructor(private store: Store<fromStore.MarketDataSearchState>) { 
    this.marketDataTypes$ = this.store.select(fromStore.getMarketDataTypes);
    this.marketDataTypesLoading$ = this.store.select(fromStore.getMarketDataTypesLoading);
    this.marketDataTypesLoaded$ = this.store.select(fromStore.getMarketDataTypesLoaded);
    this.marketDataTypesError$ = this.store.select(fromStore.getMarketDataTypesError);
  }

  agInit(params: any): void {
    this.rowData = params.data;
    this.params = params;
    this.value = this.params.value;
    this.mdid_targetField = this.params.mdid_targetField;
    this.gridApi = params.api;

    // if (this.rowData['securityName'] === null) {
    //     this.marketData$.next([]);
    // } else {
    //     this.store.dispatch(new fromStore.LoadMarketDataTypes(this.rowData['securityName']));
    // }

    this.subscriptions.push(this.marketDataTypes$.subscribe((data) => {
        if (data) {
            this.marketData$.next(data);
            this.marketData = [...data];
            if (data.length === 1) {
                this.setValue(data[0]['type']);
            }
        }
    }));

    // this.gridApi.startEditingCell({
    //   colKey: 'marketDataType',
    //   rowIndex: params.rowIndex
    // });
    // setTimeout(() => {
    //     this.mySelect.open();
    // }, 200);
    // setTimeout(() => {
    //     this.mySelect.focus();
    // }, 300);
  }

  getValue(): any {
    return this.value;
  }

  setValue(type: string): void {
    this.value = type;
    const md = this.marketData && this.marketData.filter((d) => d.type === type) || [];
    if (md && md.length === 1) {
        this.rowData[this.mdid_targetField] = md[0]['mdid'];
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
        subscription.unsubscribe();
    });
  }

  selectMarketData(e: MatSelectChange): void {
    this.setValue(e.value);
    this.params.api.stopEditing(false);
  }

}
