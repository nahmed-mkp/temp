import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromStore from '../../store';

@Component({
    selector: 'app-counterparty-exposure-layout',
    templateUrl: './counterparty-exposure-layout.component.html',
    styleUrls: ['./counterparty-exposure-layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CounterpartyExposureLayoutComponent implements OnInit, OnDestroy {

    @ViewChild('sidenav') sidenav: MatSidenav;

    public cdsSpreads$: Observable<any[]>;
    public cdsSpreadsLoading$: Observable<boolean>;
    public cdsSpreadsLoaded$: Observable<boolean>;
    public cdsSpreadsError$: Observable<string>;

    public sidePane = '';
    public mode = 'over';

    private refreshTimer: any;

    constructor(private store: Store<fromStore.ExposuresState>) {
    }

    ngOnInit(): void {

    }

    ngOnDestroy(): void {
    }

    showSidePane(view: string): void {
    }

    hideSidePane(): void {
        this.sidenav.close();
    }
}
