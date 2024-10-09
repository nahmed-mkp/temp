import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import * as fromStore from './../../store';
import * as fromModels from './../../models/fx-options-grid.models';
import { MatLegacyTabChangeEvent as MatTabChangeEvent } from '@angular/material/legacy-tabs';

@Component({
    selector: 'app-fx-options-grid-layout',
    templateUrl: './fx-options-grid-layout.component.html',
    styleUrls: ['./fx-options-grid-layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FXOptionsGridLayoutComponent implements OnInit {

    public currencies$: Observable<string[]>;
    public snapTimes$: Observable<{[ccyPair: string]: string}>;
    public fxOptionsGrid$: Observable<any>;
    public fxOptionsGridLoading$: Observable<boolean>;
    public fxOptionsGridLoaded$: Observable<boolean>;
    public fxOptionsGridError$: Observable<string>;

    public asOfDate: Date = new Date();

    constructor(private store: Store<fromStore.FXOptionsGridState>) {
        this.currencies$ = this.store.select(fromStore.getCurrencies);
        this.fxOptionsGrid$ = this.store.select(fromStore.getGrids);
        this.snapTimes$ = this.store.select(fromStore.getSnapTimes);
    }

    ngOnInit(): void {
        this.store.dispatch(new fromStore.LoadLatest());
    }

    changeTab(e: MatTabChangeEvent): void {
        const currencyPair = e.tab.textLabel;
    }

    onDateChanged(): void {
        const formattedDate = this.asOfDate.toLocaleDateString().split('/').join('-');
        this.store.dispatch(new fromStore.LoadAsOfDate(formattedDate));
    }
}
