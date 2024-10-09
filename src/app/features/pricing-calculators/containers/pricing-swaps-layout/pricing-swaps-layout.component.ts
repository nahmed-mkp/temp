import { AfterViewInit, ChangeDetectionStrategy, Component, HostBinding, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromStore from './../../store';
import * as fromModels from '../../models';

@Component({
    selector: 'app-pricer-swap-layout',
    templateUrl: './pricing-swaps-layout.component.html',
    styleUrls: ['./pricing-swaps-layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class PricingCalculatorSwapsLayoutComponent implements OnInit, AfterViewInit {

    @HostBinding('class') classes = 'vertical-flex-full-height';

    public data$: Observable<any>;
    public loading$: Observable<boolean>;

    constructor(private store: Store<fromStore.PricingCalculatorsState>) {
    }

    ngOnInit() {
        this.data$ = this.store.select(fromStore.getSwapsInputs);
        this.loading$ = this.store.select(fromStore.getSwapsInputsLoading);

        this.store.dispatch(new fromStore.LoadSwapsInputs);
    }

    ngAfterViewInit(): void {
    }
}
