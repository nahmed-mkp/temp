import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

import * as fromModels from './../../models';

@Component({
    selector: 'app-risk-span-filter',
    templateUrl: './risk-span-filter.component.html',
    styleUrls: ['./risk-span-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class RiskSpanFilterComponent implements OnInit {

    @Input() filter: fromModels.IBucketSchema;

    @Output() addToRequest: EventEmitter<fromModels.IFilterSchema> = new EventEmitter<fromModels.IFilterSchema>();
    @Output() removeFromRequest: EventEmitter<fromModels.IFilterSchema> = new EventEmitter<fromModels.IFilterSchema>();

    @Output() factorChanged: EventEmitter<fromModels.IFactorDatesBucket> = new EventEmitter<fromModels.IFactorDatesBucket>();

    constructor() { }

    ngOnInit(): void { }
}
