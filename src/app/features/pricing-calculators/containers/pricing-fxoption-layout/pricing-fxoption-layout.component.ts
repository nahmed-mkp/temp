import { AfterViewInit, ChangeDetectionStrategy, Component, HostBinding, OnInit, ViewChild } from '@angular/core';
import { MatLegacyTabChangeEvent as MatTabChangeEvent, MatLegacyTabGroup as MatTabGroup } from '@angular/material/legacy-tabs';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromStore from './../../store';
import * as fromModels from '../../models';

@Component({
    selector: 'app-pricer-fxoption-layout',
    templateUrl: './pricing-fxoption-layout.component.html',
    styleUrls: ['./pricing-fxoption-layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class PricingCalculatorFXOptionLayoutComponent implements OnInit, AfterViewInit {

    @HostBinding('class') classes = 'vertical-flex-full-height';

    public data$: Observable<any>;
    public fxOutput$: Observable<any>;
    public loading$: Observable<boolean>;
    public calculating$: Observable<boolean>;

    constructor(private store: Store<fromStore.PricingCalculatorsState>) {}

    ngOnInit() {
        this.data$ = this.store.select(fromStore.getFXOptionsInputs);
        this.fxOutput$ = this.store.select(fromStore.getFXOptionsOutputs);
        this.loading$ = this.store.select(fromStore.getFXOptionsInputsLoading);
        this.calculating$ = this.store.select(fromStore.getFXOptionsOutputsLoading);
        this.store.dispatch(new fromStore.LoadInputs);
    }

    ngAfterViewInit(): void {
    }
}
