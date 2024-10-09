import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ICellEditorAngularComp } from 'ag-grid-angular';

import { MatSelectChange, MatSelect } from '@angular/material/select';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromStore from './../../store';
import { GridApi } from 'ag-grid-community';


@Component({
    selector: 'app-market-data-type-cell-editor',
    templateUrl: './market-data-type-cell-editor.component.html',
    styleUrls: ['./market-data-type-cell-editor.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarketDataTypeCellEditorComponent implements ICellEditorAngularComp, OnDestroy {

    @ViewChild('mySelect', {static: true}) mySelect: MatSelect;

    private params: any;
    private gridApi: GridApi;
    public value: any;
    public origValue: any;
    public mode: string;

    public marketDataTypes$: Observable<any[]>;
    public marketDataTypesLoading$: Observable<boolean>;
    public marketDataTypesLoaded$: Observable<boolean>;
    public marketDataTypesError$: Observable<string>;

    public marketDataTypesOfActiveSecurityName$: Observable<any[]>;
    public marketDataTypesLoadingOfActiveSecurityName$: Observable<boolean>;
    public marketDataTypesLoadedOfActiveSecurityName$: Observable<boolean>;
    public marketDataTypesErrorOfActiveSecurityName$: Observable<string>;

    public rowData: any;
    public marketData: any[] = [];

    public marketData$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
    public subscriptions: Subscription[] = [];

    constructor(private store: Store<fromStore.TimeseriesExporterState>) {
        this.marketDataTypes$ = this.store.select(fromStore.getMarketDataTypes);
        this.marketDataTypesLoading$ = this.store.select(fromStore.getMarketDataTypesLoading);
        this.marketDataTypesLoaded$ = this.store.select(fromStore.getMarketDataTypesLoaded);
        this.marketDataTypesError$ = this.store.select(fromStore.getMarketDataTypesError);

        this.marketDataTypesOfActiveSecurityName$ = this.store.select(fromStore.getMarketDataTypesWithActiveSecurityName);
        this.marketDataTypesLoadingOfActiveSecurityName$ = this.store.select(fromStore.getMarketDataTypesLoadingWithActiveSecurityName);
        this.marketDataTypesLoadedOfActiveSecurityName$ = this.store.select(fromStore.getMarketDataTypesLoadedWithActiveSecurityName);
        this.marketDataTypesErrorOfActiveSecurityName$ = this.store.select(fromStore.getMarketDataTypesErrorWithActiveSecurityName);
    }

    agInit(params: any): void {
        this.rowData = params.data;
        this.params = params;
        this.origValue = this.params.value;
        this.value = this.params.value;
        this.mode = this.params.mode;
        this.gridApi =  params.api;



        // if (this.rowData['securityName'] === null) {
        //     this.marketData$.next([]);
        // } else {
        //     this.store.dispatch(new fromStore.LoadMarketDataTypes(this.rowData['securityName']));
        // }

        // this.subscriptions.push(this.marketDataTypes$.subscribe((data) => {
        //     if (data) {
        //         this.marketData$.next(data);
        //         this.marketData = [...data];
        //         if (data.length === 1) {
        //             this.setValue(data[0]['type']);
        //         }
        //     }
        // }));

        this.subscriptions.push(this.marketDataTypesOfActiveSecurityName$.subscribe((data) => {
            if (data) {
                this.marketData = [...data];
            }
        }));



        this.gridApi.startEditingCell({
            colKey: 'marketDataType',
            rowIndex: params.rowIndex
        });
        setTimeout(() => {
            this.mySelect.open();
        }, 200);
        setTimeout(() => {
            this.mySelect.focus();
        }, 300);
    }


    getValue(): any {
        return this.value;
    }

    setValue(type: string): void {
        this.value = type;
        const md = this.marketData && this.marketData.filter((d) => d.type === type) || [];
        if (md && md.length === 1) {
            this.rowData['mdid'] = md[0]['mdid'];
        }
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((subscription) => {
            subscription.unsubscribe();
        });
    }

    selectMarketData(e: MatSelectChange): void {
        this.setValue(e.value);
        this.params.api.stopEditing();
    }

}
