import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Store } from '@ngrx/store';
import { Observable, Subject, Subscription } from 'rxjs';

import * as fromModels from './../../models';
import * as fromStore from './../../store';

@Component({
    selector: 'app-drift-layout',
    templateUrl: './drift-layout.component.html',
    styleUrls: ['./drift-layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DriftLayoutComponent implements OnInit, OnDestroy {

    @ViewChild('sidenav') sidenav: MatSidenav;

    public portfolioDriftRequest$: Observable<fromModels.PositionsDriftRequest>;
    public positionDriftLoading$: Observable<boolean>;
    public positionDriftLoaded$: Observable<boolean>;
    public positionDriftError$: Observable<string>;

    public fundDrifts$: Observable<any[]>;
    public tradeNameDrifts$: Observable<any[]>;
    public positionDrifts$: Observable<any[]>;

    public positionDriftRequest$: Observable<fromModels.PositionDriftRequest>;
    public executionDriftLoading$: Observable<boolean>;
    public executionDriftLoaded$: Observable<boolean>;
    public executionDriftError$: Observable<string>;
    public executionDrifts$: Observable<any[]>;

    public searchTerm$: Subject<string> = new Subject<string>();

    public sidePane = 'fundDrift';
    public mode = 'over';

    constructor(private store: Store<fromStore.DriftState>) {

        this.portfolioDriftRequest$ = this.store.select(fromStore.getPositionDriftRequest);
        this.positionDriftLoading$ = this.store.select(fromStore.getPositionDriftLoading);
        this.positionDriftLoaded$ = this.store.select(fromStore.getPositionDriftLoaded);
        this.positionDriftError$ = this.store.select(fromStore.getPositionDriftError);

        this.fundDrifts$ = this.store.select(fromStore.getFundDriftEntities);
        this.tradeNameDrifts$ = this.store.select(fromStore.getTradeNameDriftEntities);
        this.positionDrifts$ = this.store.select(fromStore.getPositionDriftEntities);

        this.positionDriftRequest$ = store.select(fromStore.getExecutionDriftRequest);
        this.executionDriftLoading$ = store.select(fromStore.getExecutionDriftLoading);
        this.executionDriftLoaded$ = store.select(fromStore.getExecutionDriftLoaded);
        this.executionDriftError$ = store.select(fromStore.getExecutionDriftError);
        this.executionDrifts$ = store.select(fromStore.getExecutionDriftEntities);
    }

    ngOnInit(): void { }

    ngOnDestroy(): void {
    }

    changePortfolioDriftRequest(request: fromModels.PositionsDriftRequest): void {
        this.store.dispatch(new fromStore.LoadPositionsDrift(request));
    }

    changeClientSideParameter(request: fromModels.PositionsDriftRequest): void {
        this.store.dispatch(new fromStore.ClientSideParameterChanged(request));
    }

    positionSelected(request: fromModels.PositionDriftRequest): void {
        this.store.dispatch(new fromStore.LoadPositionDrift(request));
    }

    searchPositionsGrid(searchTerm: string): void {
        this.searchTerm$.next(searchTerm);
    }

    showSidePane(view: string): void {
        this.sidenav.open();
        this.sidePane = view;
        if (view === 'TradeNameDrift') {
            this.mode = 'push';
        } else {
            this.mode = 'over';
        }
    }

    hideSidePane(): void {
            this.sidenav.close();
    }
}
