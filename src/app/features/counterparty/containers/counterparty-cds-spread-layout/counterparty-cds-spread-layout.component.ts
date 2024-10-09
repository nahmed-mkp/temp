import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromStore from '../../store';

@Component({
    selector: 'app-counterparty-cds-spread-layout',
    templateUrl: './counterparty-cds-spread-layout.component.html',
    styleUrls: ['./counterparty-cds-spread-layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CounterpartyCDSSpreadLayoutComponent implements OnInit, OnDestroy {

    @ViewChild('sidenav') sidenav: MatSidenav;

    public cdsSpreads$: Observable<any[]>;
    public cdsSpreadsLoading$: Observable<boolean>;
    public cdsSpreadsLoaded$: Observable<boolean>;
    public cdsSpreadsError$: Observable<string>;

    public sidePane = '';
    public mode = 'over';

    private refreshTimer: any;

    constructor(private store: Store<fromStore.ExposuresState>) {
        this.cdsSpreads$ = this.store.select(fromStore.getCounterpartyCDSSpreads);
        this.cdsSpreadsLoading$ = this.store.select(fromStore.getCounterpartyCDSSpreadsLoadingStatus);
        this.cdsSpreadsLoaded$ = this.store.select(fromStore.getCounterpartyCDSSpreadsLoadedStatus);
        this.cdsSpreadsError$ = this.store.select(fromStore.getCounterpartyCDSSpreadsErrorStatus);
    }

    ngOnInit(): void {
        this.refreshTimer = setInterval(() => {
            this.store.dispatch(new fromStore.LoadCounterpartyCDSSpreads());
        }, 5000);
    }

    ngOnDestroy(): void {
        this.clearTimer();
    }

    showSidePane(view: string): void {
    }

    hideSidePane(): void {
        this.sidenav.close();
    }

    clearTimer(): void {
        clearInterval(this.refreshTimer);
    }
}
