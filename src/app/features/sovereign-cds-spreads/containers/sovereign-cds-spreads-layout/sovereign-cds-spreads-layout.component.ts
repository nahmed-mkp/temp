import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromStore from '../../store';

@Component({
    selector: 'app-sovereign-cds-spread-layout',
    templateUrl: './sovereign-cds-spreads-layout.component.html',
    styleUrls: ['./sovereign-cds-spreads-layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SovereignCDSSpreadsLayoutComponent implements OnInit {

    public selectedDate$: Observable<string>;

    public sovereignCdsSpreads$: Observable<any[]>;
    public sovereignCdsSpreadsLoading$: Observable<boolean>;

    constructor(private store: Store<fromStore.SovereignCdsFeedsState>) {
      this.selectedDate$ = this.store.select(fromStore.getAsOfDate);
      this.sovereignCdsSpreads$ = this.store.select(fromStore.getSovereignCdsSpreads);
      this.sovereignCdsSpreadsLoading$ = this.store.select(fromStore.getSovereignCdsSpreadsLoading);
    }

    ngOnInit(): void {
      this.store.dispatch(fromStore.loadSovereignSpreadData());
    }

}
