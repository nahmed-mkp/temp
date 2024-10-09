import { Component, OnInit, Inject, HostBinding } from '@angular/core';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { Store } from '@ngrx/store';
import { UntypedFormBuilder, FormControl, UntypedFormGroup, Validators } from '@angular/forms';

import * as fromStore from './../../store';
import * as fromModel from './../../models';
import { NonNullAssert } from '@angular/compiler';

@Component({
    selector: 'app-order-book-email-dialog-layout',
    templateUrl: './order-book-email-dialog-layout.component.html',
    styleUrls: ['./order-book-email-dialog-layout.component.scss']
})
export class OrderBookEmailDialogLayoutComponent implements OnInit {

    @HostBinding('class') classes = 'vertical-flex-full-height';

    public receivers: string;
    public emailSubject: string;
    public emailComment: string;
    public newForm: UntypedFormGroup;

    public emailSendReq: fromModel.ISendEmailReq = {
        to: null,
        subject: null,
        comment: null,
        orderIds: null,
    }

    constructor(@Inject(MAT_DIALOG_DATA) public data = [],
                private fb: UntypedFormBuilder,
                private store: Store<fromStore.OrderBookState>,
                private dialogRef: MatDialogRef<OrderBookEmailDialogLayoutComponent>) { }

    ngOnInit() {
        this.newForm = this._createForm();
    }

    onClose() {
        this.dialogRef.close();
    }

    onSend() {
        // this.store.dispatch(new fromStore.SendOrderBookEmail({
        //     to: this.emailSendReq.to.split(','),
        //     subject: this.emailSendReq.subject,
        //     comment: this.emailSendReq.comment,
        //     orderIds: this.data.map(element => element.orderId)
        // }));

        const rawValue: any = this.newForm.getRawValue();

        this.store.dispatch(new fromStore.SendOrderBookEmail({
            to: rawValue.to.split(','),
            subject: rawValue.subject,
            comment: rawValue.comment,
            orderIds: rawValue.orderIds
        }));

        this.onClose();
    }

    private _createForm() {
        const form = this.fb.group({
            to: [null, Validators.required],
            subject: [null, Validators.required],
            comment: [null, Validators.required],
            orderIds: [this.data.map(element => element.orderId)]
        });
        return form;
    }

}
