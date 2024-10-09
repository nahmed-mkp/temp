import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

import * as fromModels from './../../models/drift.models';

@Component({
    selector: 'app-drift-params',
    templateUrl: './drift-params.component.html',
    styleUrls: ['./drift-params.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DriftParamsComponent implements OnInit {

    @Input() request: fromModels.PositionsDriftRequest;

    @Output() clientParameterChanged: EventEmitter<fromModels.PositionsDriftRequest> = new EventEmitter<fromModels.PositionsDriftRequest>();

    @Output() paramChanged: EventEmitter<fromModels.PositionsDriftRequest> = new EventEmitter<fromModels.PositionsDriftRequest>();
    @Output() searchGrid: EventEmitter<string> = new EventEmitter<string>();
    @Output() showSidePane: EventEmitter<string> = new EventEmitter<string>();

    public search: string;

    constructor() { }

    ngOnInit(): void { }

    public onActiveDateChanged(e: MatDatepickerInputEvent<Date>): void {
        this.paramChanged.emit(Object.assign({}, this.request, { 'asOfDate': e.value }));
    }

    public onThresholdChanged(e: any): void {
        this.clientParameterChanged.emit(Object.assign({}, this.request, { 'threshold': e.target.value}));
    }

    public onHideFxHedgesChanged(e: MatCheckboxChange): void {
        this.clientParameterChanged.emit(Object.assign({}, this.request, { 'hideFXHedges': e.checked }));
    }

    public onUseDailyDriftChanged(e: MatCheckboxChange): void {
        this.paramChanged.emit(Object.assign({}, this.request, { 'useDailyDrift': e.checked }));
    }

    public onSearch(searchTerm: string): void {
        this.searchGrid.emit(searchTerm);
    }

    public showFundAllocs(): void {
        this.showSidePane.emit('FundAlloc');
    }

    public showTradeNameDrifts(): void {
        this.showSidePane.emit('TradeNameDrift');
    }

}
