import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import uuidv1 from 'uuid/v1';
import { MatLegacySelectChange as MatSelectChange } from '@angular/material/legacy-select';

import * as fromModels from './../../models';


@Component({
    selector: 'app-risk-span-request',
    templateUrl: './risk-span-request.component.html',
    styleUrls: ['./risk-span-request.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RiskSpanRequestComponent implements OnInit, OnChanges {

    @Input() dataSets: fromModels.IDataSetSchema[];
    @Input() filters: fromModels.IFilterSchema[];
    @Input() buckets: fromModels.IBucketSchema[];

    @Input() loading: boolean;
    @Input() loaded: boolean;
    @Input() error: string;

    @Input() request: fromModels.IDetailRequest;

    @Output() addRequest: EventEmitter<fromModels.IDetailRequest> = new EventEmitter<fromModels.IDetailRequest>();
    @Output() updateDataSet: EventEmitter<fromModels.IDataSetSchema[]> = new EventEmitter<fromModels.IDataSetSchema[]>();
    @Output() submitRequest: EventEmitter<fromModels.IDetailRequest> = new EventEmitter<fromModels.IDetailRequest>();

    // @Output() addDataSet: EventEmitter<fromModels.IDataSetSchema> = new EventEmitter<fromModels.IDataSetSchema>();
    // @Output() removeDataSet: EventEmitter<fromModels.IDataSetSchema> = new EventEmitter<fromModels.IDataSetSchema>();

    // @Output() changeFactorDate: EventEmitter<fromModels.IFactorDatesBucket> = new EventEmitter<fromModels.IFactorDatesBucket>();

    // @Output() addFilter: EventEmitter<fromModels.IFilterSchema> = new EventEmitter<fromModels.IFilterSchema>();
    // @Output() removeFilter: EventEmitter<fromModels.IFilterSchema> = new EventEmitter<fromModels.IFilterSchema>();

    // @Output() addBucket: EventEmitter<fromModels.IBucketSchema> = new EventEmitter<fromModels.IBucketSchema>();
    // @Output() removeBucket: EventEmitter<fromModels.IBucketSchema> = new EventEmitter<fromModels.IBucketSchema>();

    public dateRangeFilter: fromModels.IFilterSchema;
    public poolTermFilter: fromModels.IFilterSchema;
    public poolTypeFilter: fromModels.IFilterSchema;
    public bucketCollectionIndexed: {
        [name: string]: fromModels.IInputBucket
    } = {};

    constructor() { }

    ngOnInit(): void {
        if (this.request === undefined) {
            this.request = {
                id: uuidv1(),
                dataSets: [],
                factorDates: {
                    valuesMin: undefined,
                    valuesMax: undefined,
                    stepSize: undefined,
                },
                buckets: [],
                fieldList: [],
            };
            this.addRequest.emit(this.request);
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.filters && changes.filters.currentValue && changes.filters.currentValue.length > 1) {
            this.filters.forEach(filter => {
                if (filter.name === 'FactorDate') {
                  this.dateRangeFilter = filter;
                } else if (filter.name === 'Term') {
                  this.poolTermFilter = filter;
                } else if (filter.name === 'PoolType') {
                  this.poolTypeFilter = filter;
                }
            });
        }

        if (changes.request && changes.request.currentValue) {
            this.request = JSON.parse(JSON.stringify(changes.request.currentValue));
            this.request.buckets.forEach(bucket => {
                this.bucketCollectionIndexed[bucket.inputName] = bucket;
            });
        }

        if (changes.buckets && changes.buckets.currentValue && changes.buckets.currentValue.length > 0) {
            this.buckets.sort((a, b) => {
                if (a.name < b.name) {
                    return -1;
                } else if (a.name < b.name) {
                    return 1;
                } else {
                    return 0;
                }
            });
        }
    }

    requestAdded(payload: fromModels.IRequest | fromModels.IDetailRequest): void {
        this.addRequest.emit(payload);
    }

    // dataSetAdded(payload: fromModels.IDataSetSchema): void {
    //     this.addDataSet.emit(payload);
    // }

    // dataSetRemoved(payload: fromModels.IDataSetSchema): void {
    //     this.removeDataSet.emit(payload);
    // }

    // filterAdded(payload: fromModels.IFilterSchema): void {
    //     // this.addFilter.emit(payload);
    // }

    // filterRemoved(payload: fromModels.IFilterSchema): void {
    //     // this.removeFilter.emit(payload);
    // }

    // factorChanged(payload: fromModels.IFactorDatesBucket): void {
    //     // this.changeFactorDate.emit(payload);
    // }



    bucketAdded(payload: fromModels.IInputBucket): void {
        // this.addBucket.emit(payload);
        console.log('about to add to bucket', payload);
        this.bucketCollectionIndexed = Object.assign({}, this.bucketCollectionIndexed, {[payload.inputName]: payload});
    }

    bucketRemoved(payload: fromModels.IInputBucket): void {
        // this.removeBucket.emit(payload);
        const {[payload.inputName]: removed, ...remain} = this.bucketCollectionIndexed;
        this.bucketCollectionIndexed = remain;
    }

    bucketUpdated(payload: fromModels.IInputBucket): void {
        this.bucketCollectionIndexed = Object.assign({}, this.bucketCollectionIndexed, {[payload.inputName]: payload});
    }

    onSubmitRequest(): void {
        this.request.buckets = Object.keys(this.bucketCollectionIndexed).map(key => this.bucketCollectionIndexed[key]);
        this.submitRequest.emit(this.request);
    }

    onUploadReport() {}

}

