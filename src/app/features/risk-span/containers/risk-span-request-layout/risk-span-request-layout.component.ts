import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, Output, EventEmitter } from '@angular/core';
import uuidv1 from 'uuid/v1';

import { Store } from '@ngrx/store';

import * as fromStore from '../../store';
import * as fromModels from '../../models';
import { Observable, Subscription, combineLatest, BehaviorSubject } from 'rxjs';

@Component({
    selector: 'app-risk-span-request-layout',
    templateUrl: './risk-span-request-layout.component.html',
    styleUrls: ['./risk-span-request-layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RiskSpanRequestLayoutComponent implements OnInit, OnDestroy {

    // Ui
    @Output() closeSideNav = new EventEmitter<boolean>();
    public mode: 'configuration' | 'reports' = 'configuration';


    public schema$: Observable<fromModels.IRequestSchema>;
    public schemaLoading$: Observable<boolean>;
    public schemaLoaded$: Observable<boolean>;
    public schemaError$: Observable<string>;

    public schemaSubscription$: Subscription;
    public availableDataSets$: BehaviorSubject<fromModels.IDataSetSchema[]>
        = new BehaviorSubject<fromModels.IDataSetSchema[]>([]);
    public availableFilters$: BehaviorSubject<fromModels.IFilterSchema[]>
        = new BehaviorSubject<fromModels.IFilterSchema[]>([]);
    public availableBuckets$: BehaviorSubject<fromModels.IBucketSchema[]>
        = new BehaviorSubject<fromModels.IBucketSchema[]>([]);

    public request$: Observable<fromModels.IDetailRequest>;

    constructor(private store: Store<fromStore.RiskSpanState>) {
        this.schema$ = store.select(fromStore.getRiskSpanSchema);
        this.schemaLoading$ = store.select(fromStore.getRiskSpanSchemaLoadingStatus);
        this.schemaLoaded$ = store.select(fromStore.getRiskSpanSchemaLoadedStatus);
        this.schemaError$ = store.select(fromStore.getRiskSpanSchemaError);

        this.request$ = store.select(fromStore.getRiskSpanCurrentRequest);

        this.schemaSubscription$ = combineLatest(this.schema$, this.request$).subscribe(
            ([schema, request]) => {

                if (schema) {

                    // const selectedDataSets = request ? request.dataSets.map((dataSet) => dataSet.code) : ['agency'];

                    const selectedDataSets = ['agency'];

                    // Build DataSets
                    const dataSets = [...schema.dataSets];

                    // Build Filters
                    const filters = this._get_buckets_and_filters(schema, selectedDataSets, 'filter');

                    // Build Buckets...
                    const buckets = this._get_buckets_and_filters(schema, selectedDataSets, 'bucket');

                    const sorted_filters = filters.sort(this._sort_by_description);
                    const sorted_buckets = buckets.sort(this._sort_by_description);

                    this.availableDataSets$.next(dataSets);
                    this.availableFilters$.next(sorted_filters);
                    this.availableBuckets$.next(sorted_buckets);
                }
        });
    }

    ngOnInit(): void { }

    ngOnDestroy(): void {
        if (this.schemaSubscription$) {
            this.schemaSubscription$.unsubscribe();
        }
    }

    addRequest(payload: fromModels.IRequest): void {
        this.store.dispatch(new fromStore.AddRequest(payload));
    }

    submitRequest(payload: fromModels.IRequest | fromModels.IDetailRequest | any) {
        this.store.dispatch(new fromStore.UpdateRequest(payload));
        this.store.dispatch(new fromStore.SubmitRequest(payload));
        // if(payload.clusterKey) this.store.dispatch(new fromStore.SubmitDetailRequest(payload));
        // else this.store.dispatch(new fromStore.SubmitRequest(payload));

    }

    updateDataSet(payload) {

    }

    // updateDataSet(payload: string): void {
    //     this.store.dispatch(new fromStore.AddDataSet(payload));
    // }

    // removeDataSet(payload: string): void {
    //     this.store.dispatch(new fromStore.RemoveDataSet(payload));
    // }

    // addFilter(payload: fromModels.IFilterSchema): void {
    //     this.store.dispatch(new fromStore.AddFilter(payload));
    // }

    // removeFilter(payload: fromModels.IFilterSchema): void {
    //     this.store.dispatch(new fromStore.RemoveFilter(payload));
    // }

    // addFactorDate(payload: fromModels.IFactorDatesBucket): void {
    //     this.store.dispatch(new fromStore.AddFactorDate(payload));
    // }

    // updateFactorDate(payload: fromModels.IFactorDatesBucket): void {
    //     this.store.dispatch(new fromStore.UpdateFactorDate(payload));
    // }

    // addBucket(payload: fromModels.IInputBucket): void {
    //     this.store.dispatch(new fromStore.AddBucket(payload));
    // }

    // removeBucket(payload: fromModels.IInputBucket): void {
    //     this.store.dispatch(new fromStore.RemoveBucket(payload));
    // }

    onclose() {
        this.closeSideNav.emit(true);
    }





    /**  Helper Methods **/

    _get_buckets_and_filters(schema: any, selectedDataSets: string[], type: string): any[] {
        let itemMap = {};
        selectedDataSets.map((dataSet) => {
            itemMap = schema.fields[dataSet].reduce((entities: { [name: string]: any }, item: any) => {
                return (item.type === type) ?  Object.assign({}, entities, { [item.name]: item }) : entities;
            }, {});
        });
        console.log('itemMap step 1' , itemMap);

        // enrich buckets
        // if (request && type === 'bucket') {
        //     request.buckets.map((bucket) => {
        //         itemMap = Object.assign({}, itemMap, { [bucket.name]: bucket});
        //     });
        // }


        return Object.keys(itemMap).map((key) => itemMap[key]);
    }

    _sort_by_description(a: any, b: any): number  {
        const A = a.description.toUpperCase();
        const B = b.description.toUpperCase();

        let comparison = 0;
        if (A > B) {
            comparison = 1;
        } else if (A < B) {
            comparison = -1;
        }
        return comparison;
    }

    _sort_by_name(a: any, b: any): number {
        const A = a.name.toUpperCase();
        const B = b.name.toUpperCase();

        let comparison = 0;
        if (A > B) {
            comparison = 1;
        } else if (A < B) {
            comparison = -1;
        }
        return comparison;
    }

}
