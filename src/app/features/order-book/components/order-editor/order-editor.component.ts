
import { EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ChangeDetectionStrategy, Component, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

import * as fromModels from './../../models/order-book.models';

@Component({
    selector: 'app-order-editor',
    templateUrl: './order-editor.component.html',
    styleUrls: ['./order-editor.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderEditorComponent implements OnInit, OnChanges {

    @Input() order: fromModels.IOrder;
    @Input() mode: 'Add' | 'Edit';
    @Input() securityDetails: any;
    @Input() lookups: any;
    @Input() opened: boolean;
    @Input() currentLevel: number;

    @Output() updateOrderBookAssetType: EventEmitter<fromModels.ISecurityAssetType> = new EventEmitter<fromModels.ISecurityAssetType>();
    @Output() onSaveOrder = new EventEmitter<fromModels.ISaveOrderReq>();
    @Output() onLoadSecurityCurrentLevel = new EventEmitter<number>();
    @Output() close = new EventEmitter<boolean>();

    public orderCopy: fromModels.IOrder | any = {};
    private selectedSecurity: string;
    public newForm: UntypedFormGroup = this._createForm();
    
    public disabled = true;

    constructor(private fb: UntypedFormBuilder) { }

    ngOnInit(): void {
        this.newForm = this._createForm();
    }

    ngOnChanges(changes: SimpleChanges) {
        // if (changes.order && changes.order.currentValue) {
        //     if (this.mode === 'Add') {
        //         return;
        //     }
        //     console.log('selected order', changes.order.currentValue);
        //     this.orderCopy = JSON.parse(JSON.stringify(this.order));

        //     this.orderCopy.orderDate = new Date(this.orderCopy.orderDate.slice(0, -1));
        // }

        // if (changes.mode && changes.mode.currentValue && changes.mode.currentValue === 'Add') {
        //     this.orderCopy = {};
        //     this.orderCopy.orderDate = new Date();
        // }

        if (changes.opened) {
            if (this.opened === true && this.mode === 'Add') {
                this._createForm();
            }

            if (this.opened === true && this.mode === 'Edit') {
                this._setFormValue();
            }
        }

        if (changes.currentLevel && changes.currentLevel.currentValue !== undefined && changes.currentLevel.currentValue !== null ) {

            if (typeof this.currentLevel === 'number') {
                const formatValue = this.currentLevel.toLocaleString('en-US', { maximumFractionDigits: 4});
                this.newForm.controls['currentLevel'].setValue(formatValue);
            } else {
                this.newForm.controls['currentLevel'].setValue(null);
            }
        }
    }


    // Event -------------------------------------------------------------------------------------------------------

    public onSelectedSecurity(event) {
        console.log('onSelectedSecurity', event);
        this.newForm.controls['security'].setValue(event['SecurityName']);
        this.newForm.controls['securityType'].setValue(event['SecurityType']);
        this.onLoadSecurityCurrentLevel.emit(event['SID']);
    }

    public onValueEnter(event) {
        console.log('onValueEnter', event);
        this.newForm.controls['security'].setValue(event);
        this.newForm.controls['currentLevel'].setValue(null);
        this.selectedSecurity = event;
    }

    public saveOrder() {
        // const formateReq: fromModels.ISaveOrderReq = this._formatSaveOrderCopy();

        const rawValue = this.newForm.getRawValue();
        const formateReqValue = this._formatSaveOrderCopy(rawValue);
        this.onSaveOrder.emit(formateReqValue);

    }

    public onClose() {
        this.newForm = this._createForm();
        this.close.emit(true);
    }




    private _formatSaveOrderCopy(rawValue: fromModels.IOrder | any): fromModels.ISaveOrderReq {
        const saveOrderReq: fromModels.ISaveOrderReq = {
            secName: rawValue.security || null,
            podName: rawValue.pod || null,
            buySell: rawValue.buySell || null,
            orderDate: rawValue.orderDate.toISOString() || null,
            displayType: rawValue.displayType || null,
            expiry: rawValue.expiry || null,
            orderType: rawValue.orderType || null,
            orderStatus: rawValue.orderStatus || null,
            inWithNotIn: rawValue.inWith || null,
            orderId: rawValue.orderId || null,
            notes: rawValue.notes || null,
            qtyType: rawValue.type || null,
            assetType: null,
            orderLevel: rawValue.orderLevel || null,
            contact: rawValue.contact || null,
            qty: rawValue.quantity || null
        }

        return saveOrderReq;
    }

    private _createForm() {
        const form = this.fb.group({
            security: new UntypedFormControl({value: null, disabled: false}, Validators.required),
            securityType:  new UntypedFormControl({value: null, disabled: true}),
            pod: [null, Validators.required],
            buySell: [null],
            orderDate: [new Date(), Validators.required],
            displayType: ['price', Validators.required],
            expiry: [null, Validators.required],
            orderType: [null, Validators.required],
            orderStatus: [null, Validators.required],
            inWith: [null, Validators.required],
            orderId: [null],
            notes: [null],
            type: [null],
            assetType: [null],
            orderLevel: [null],
            distanceToLevel: [null],
            currentLevel: [null],
            contact: [null],
            quantity: [null],
        });
        return form;
    }

    private _setFormValue() {
        this.newForm.controls['security'].setValue(this.order.security);
        this.newForm.controls['securityType'].setValue(this.order.securityType);
        this.newForm.controls['pod'].setValue(this.order.pod);
        this.newForm.controls['buySell'].setValue(this.order.buySell);
        this.newForm.controls['displayType'].setValue(this.order.displayType);
        this.newForm.controls['expiry'].setValue(this.order.expiry);
        this.newForm.controls['orderType'].setValue(this.order.orderType);
        this.newForm.controls['orderStatus'].setValue(this.order.orderStatus);
        this.newForm.controls['inWith'].setValue(this.order.inWith);
        this.newForm.controls['orderId'].setValue(this.order.orderId);
        this.newForm.controls['notes'].setValue(this.order.notes);
        this.newForm.controls['type'].setValue(this.order.type);
        this.newForm.controls['orderLevel'].setValue(this.order.orderLevel);
        this.newForm.controls['distanceToLevel'].setValue(this.order.distanceToLevel);
        this.newForm.controls['currentLevel'].setValue(this.order.currentLevel);
        this.newForm.controls['contact'].setValue(this.order.contact);
        this.newForm.controls['quantity'].setValue(this.order.quantity);

        this.newForm.controls['orderDate'].setValue(new Date(this.order.orderDate.slice(0, -1)));
    }

}
