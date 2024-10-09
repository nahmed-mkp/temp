import { ChangeDetectionStrategy, Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';

import * as moment from 'moment';
import * as fromModels from './../../models/order-book.models';
import { OrderBookEmailDialogLayoutComponent, OrderBookHelpDialogLayoutComponent } from '../../containers';
import { AuthService } from 'src/app/services';

@Component({
    selector: 'app-order-book-params',
    templateUrl: './order-book-params.component.html',
    styleUrls: ['./order-book-params.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderBookParamsComponent implements OnInit, OnChanges {

    @Input() params: fromModels.IOrderBookParams;
    @Input() selectedOrder: fromModels.IOrder;
    @Input() allOrders: fromModels.IOrder[] = [];

    @Output() paramsChanged: EventEmitter<fromModels.IOrderBookParams> = new EventEmitter<fromModels.IOrderBookParams>();
    @Output() addOrder: EventEmitter<void> = new EventEmitter<void>();
    @Output() editOrder: EventEmitter<void> = new EventEmitter<void>();

    public fromDate: Date;
    public toDate: Date;
    public currentUser: any;

    constructor(private dialog: MatDialog, private authService: AuthService) { 
        this.currentUser = this.authService.getUser();
    }

    ngOnInit(): void { }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.params && changes.params.currentValue) {
            this.fromDate = this.params.startDate;
            this.toDate = this.params.endDate;
        }
    }

    public onActiveDateChanged(e: MatDatepickerInputEvent<Date>, type?: string): void {
        if (type === 'start' && this.fromDate) {
            // this.paramsChanged.emit(Object.assign({}, this.params, { 'startDate': moment(e.value).format('MM-DD-YYYY') }));
            this.paramsChanged.emit({startDate: this.fromDate, endDate: this.toDate});
        } else if (type === 'end' && this.toDate) {
            this.paramsChanged.emit({startDate: this.fromDate, endDate: this.toDate});
        }
    }

    public getDate(input: fromModels.IOrderBookParams, type: string): Date {
        if (type === 'start') {
            return new Date();
            // return input && moment(input.fromDate).toDate();
        } else {
            return new Date();
            // return input && moment(input.toDate).toDate();
        }
    }

    public onAddOrder(): void {
        this.addOrder.emit();
    }

    public onEditOrder(): void {
        this.editOrder.emit();
    }

    public onRefreshOrders(): void {}

    public onImportNewOrders(): void {}


    public onSendEmail(): void {
        this.dialog.open(OrderBookEmailDialogLayoutComponent, {
            hasBackdrop: false,
            panelClass: 'event-analysis-pop-up-panel',
            width: '30rem',
            height: '22rem',
            data: this.allOrders.filter(order => order.orderStatus === 'Open')
        });
    }

    public onShowHelp(): void {
        this.dialog.open(OrderBookHelpDialogLayoutComponent, {
            hasBackdrop: false,
            panelClass: 'event-analysis-pop-up-panel',
            width: '35rem',
            height: '25rem',
        });
    }
}
