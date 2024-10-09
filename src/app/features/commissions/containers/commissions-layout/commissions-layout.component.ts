import { HttpEventType, HttpResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FileUploadService } from 'src/app/services';

import * as fromModels from './../../models/commissions.models';
import * as fromStore from './../../store';

@Component({
    selector: 'app-commissions-layout',
    templateUrl: './commissions-layout.component.html',
    styleUrls: ['./commissions-layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommissionsLayoutComponent implements OnInit {

    @ViewChild('sidenav') sidenav: MatSidenav;

    public commissions$: Observable<fromModels.ICommission[]>;
    public commissionsLoading$: Observable<boolean>;
    public commissionsLoaded$: Observable<boolean>;
    public commissionsError$: Observable<string>;

    public sideNavVisible = false;

    constructor(private store: Store<fromStore.CommissionsState>) {
        this.commissions$ = this.store.select(fromStore.getCommissions);
        this.commissionsLoading$ = this.store.select(fromStore.getCommissionsLoadingStatus);
        this.commissionsLoaded$ = this.store.select(fromStore.getCommissionsLoadedStatus);
        this.commissionsError$ = this.store.select(fromStore.getCommissionsError);
    }

    ngOnInit(): void { }
}
