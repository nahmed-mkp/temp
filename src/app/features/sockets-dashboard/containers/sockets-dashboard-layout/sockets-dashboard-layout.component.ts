import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromStore from '../../store';
import * as fromSocketActions from '../../../../shared/custom/sockets/store/actions';

@Component({
    selector: 'app-sockets-dashboards-layout',
    templateUrl: './sockets-dashboard-layout.component.html',
    styleUrls: ['./sockets-dashboard-layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class SocketsLayoutComponent implements OnInit, OnDestroy {

    public socketDashboardData$: Observable<any>;

    constructor(private store: Store<fromStore.SocketDashboardState>) {
        this.socketDashboardData$ = this.store.select(fromStore.getDashboardData);
    }

    ngOnInit(): void {
        this.store.dispatch(new fromStore.SubscribeToSocketDashboardData());
    }

    ngOnDestroy(): void {
        this.store.dispatch(new fromStore.UnsubscribeFromSocketDashboardData());
    }
}
