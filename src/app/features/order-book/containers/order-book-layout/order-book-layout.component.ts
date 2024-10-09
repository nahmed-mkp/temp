
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild, HostBinding } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { Store } from '@ngrx/store';
import { Observable, pipe, Subscription } from 'rxjs';
import { switchMap, withLatestFrom } from 'rxjs/operators';
import * as moment from 'moment';

import * as fromModels from './../../models';
import * as fromStore from './../../store';

@Component({
    selector: 'app-order-book-layout',
    templateUrl: './order-book-layout.component.html',
    styleUrls: ['./order-book-layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderBookLayoutComponent implements OnInit, OnDestroy {

    @ViewChild('sidenav') sidenav: MatSidenav;
    @HostBinding('class') class = 'full-strech-block';

    public params$: Observable<fromModels.IOrderBookParams>;

    public lookups$: Observable<any>;

    public orders$: Observable<fromModels.IOrder[]>;
    public ordersLoading$: Observable<boolean>;
    public ordersLoaded$: Observable<boolean>;
    public ordersError$: Observable<string>;

    public orderHistory$: Observable<fromModels.IOrderHistory[]>;
    public orderHistoryLoading$: Observable<boolean>;
    public orderHistoryLoaded$: Observable<boolean>;
    public orderHistoryError$: Observable<string>;

    public orderNotes$: Observable<fromModels.IOrderHistory[]>;
    public orderNotesLoading$: Observable<boolean>;
    public orderNotesLoaded$: Observable<boolean>;
    public orderNotesError$: Observable<string>;

    public securityCurrentLevel$: Observable<number>;
    public securityCurrentLevelLoading$: Observable<boolean>;
    public securityCurrentLevelLoaded$: Observable<boolean>;


    public selectedOrder$: Observable<fromModels.IOrder>;

    public subscriptions$: Subscription[] = [];

    public mode: 'Add' | 'Edit';

    private timer: any;

    constructor(private store: Store<fromStore.OrderBookState>, private dialog: MatDialog) {
    }

    ngOnInit(): void {
        this.params$ = this.store.select(fromStore.getOrderBookParams);
        this.lookups$ = this.store.select(fromStore.getLookups);
        this.orders$ = this.store.select(fromStore.getOrderBookOrders);
        this.ordersLoading$ = this.store.select(fromStore.getOrderBookLoadingStatus);

        this.orderHistory$ = this.store.select(fromStore.getOrderHistory);
        this.orderHistoryLoading$ = this.store.select(fromStore.getOrderHistoryLoading);

        this.selectedOrder$ = this.store.select(fromStore.getOrderBookSelectedOrder);

        this.securityCurrentLevel$ = this.store.select(fromStore.getSecurityCurrentLevel);
        this.securityCurrentLevelLoading$ = this.store.select(fromStore.getSecurityCurrentLevelLoading);
        this.securityCurrentLevelLoaded$ = this.store.select(fromStore.getSecurityCurrentLevelLoaded);


        this._livePullingOrders();
    }

    ngOnDestroy(): void {
        this.subscriptions$.forEach(subscription => {
            subscription.unsubscribe();
        });

        clearInterval(this.timer)
    }

    addOrder(): void {
        if (!this.sidenav.opened) {
            this.sidenav.open();
            this.mode = 'Add';
        } else {
            this.sidenav.close();
        }
    }

    public editOrder(): void {
        this.store.dispatch(new fromStore.StartEditOrder);
        if (!this.sidenav.opened) {
            this.mode = 'Edit';
            this.sidenav.open();
        } else {
            this.sidenav.close();
        }
    }

    public onParamsChanged(payload: fromModels.IOrderBookParams) {
        this.store.dispatch(new fromStore.LoadOrders(payload));

        this._livePullingOrders();
    }

    public onOrderSelected(payload: number) {
        this.store.dispatch(new fromStore.LoadOrderHistory(payload));
    }

    public onOrderLocked(payload: fromModels.ILockOrderReq) {
        this.store.dispatch(new fromStore.LockOrder(payload));
    }

    public onSaveOrder(event: fromModels.ISaveOrderReq) {
        this.store.dispatch(new fromStore.SaveOrder(event));
        this.sidenav.close();
    }

    public onLoadSecurityCurrentLevel(event: number) {
        this.store.dispatch(new fromStore.LoadSecurityMarketData(event));
    }

    public close(event) {
        this.sidenav.close();
    }

    // ------------------------------------------------------------------------------

    private _livePullingOrders() {
        if (this.timer) {
            clearInterval(this.timer);
        }
        this.timer = setInterval(() => this.store.dispatch(new fromStore.LiveLoadOrders), 10000);
    }
}
