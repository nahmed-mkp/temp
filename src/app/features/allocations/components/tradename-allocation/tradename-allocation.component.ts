import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import * as fromModels from '../../models/capitals.models';


@Component({
    selector: 'app-tradename-allocation',
    templateUrl: './tradename-allocation.component.html',
    styleUrls: ['./tradename-allocation.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TradeNameAllocationComponent {

    @Input() tradeNameAllocations: any[];
    @Input() tradeNameAllocationsLoading: boolean;
    @Input() tradeNameAllocationsLoaded: boolean;
    @Input() tradeNameAllocationsError: string;

    constructor() {
    }

}
