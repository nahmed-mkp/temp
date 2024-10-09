import { Component, OnInit, HostBinding, Inject } from '@angular/core';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import * as fromStore from './../../store';
import * as fromModels from '../../models';



@Component({
    selector: 'app-market-data-backfill-dialog',
    templateUrl: './market-data-backfill-dialog.component.html',
    styleUrls: ['./market-data-backfill-dialog.component.scss']
})
export class MarketDataBackfillDialogComponent implements OnInit {

    @HostBinding('class') classes = 'vertical-flex-full-height';

    public fromDate = new Date();
    public toDate = new Date();
    public backFilling$: Observable<boolean>;
    public backFillingStatus: boolean;
    private subscription: Subscription;

    constructor(
        private store: Store<fromStore.State>,
        @Inject(MAT_DIALOG_DATA) public data,
        public dialogRef: MatDialogRef<MarketDataBackfillDialogComponent>
    ) { }

    ngOnInit() {
        this.backFilling$ = this.store.select(fromStore.getMarketDataBackFillPending);
        this.backFilling$.subscribe(result => {
            if (result === true) {
                this.backFillingStatus = true;
            } else {
                if (this.backFillingStatus === true) {
                    this.onCloseClick();
                }
            }
        })
    }

    public onCloseClick() {
        this.dialogRef.close();
    }

    public onSave() {
        this.store.dispatch(new fromStore.BackfillMarketData({
            mdid: this.data,
            fromDate: this.fromDate,
            toDate: this.toDate
        }));
    }

}
