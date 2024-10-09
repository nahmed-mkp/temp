
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import * as fromStore from '../../store';
import * as fromModels from '../../models/fx-options-grid.models';

@Component({
    selector: 'app-fx-options-summary',
    templateUrl: './fx-options-summary.component.html',
    styleUrls: ['./fx-options-summary.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FXOptionsSummaryComponent implements OnInit {

    @Input() grid: any;
    @Input() snapTimes: string;

    constructor() {
    }

    ngOnInit(): void {
    }

    getExpiries(grid: any): string[] {
        const result = [];
        if (grid) {
            const optionPricing = grid.option_pricing;
            optionPricing.forEach((row) => {
                const expiry = row.expiry;
                if (result.indexOf(expiry) < 0) {
                    result.push(expiry);
                }
            });
        }
        return result;
    }

    getSurface(grid: any[], expiry: string): any[] {
        return grid.filter((row) => row.expiry === expiry);
    }
}
