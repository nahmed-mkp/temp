import { AfterViewInit, ChangeDetectionStrategy, Component, HostBinding, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromStore from './../../store';
import * as fromModels from '../../models';

@Component({
    selector: 'app-pricer-options-layout',
    templateUrl: './pricing-options-layout.component.html',
    styleUrls: ['./pricing-options-layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class PricingCalculatorOptionsLayoutComponent implements OnInit, AfterViewInit {

    @HostBinding('class') classes = 'vertical-flex-full-height';

    public data$: Observable<any>;
    public loading$: Observable<boolean>;

    constructor(private store: Store<fromStore.PricingCalculatorsState>) {
    }

    ngOnInit() {
        this.data$ = this.store.select(fromStore.getOptionInputs);
        this.loading$ = this.store.select(fromStore.getOptionsInputsLoading);
        this.store.dispatch(new fromStore.OptionsLoadInputs);
    }

    ngAfterViewInit(): void {
    }
}
