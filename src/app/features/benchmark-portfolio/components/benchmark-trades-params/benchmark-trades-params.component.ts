import { Component, OnInit, Input, Output, ChangeDetectionStrategy, EventEmitter } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { MatSelectChange } from '@angular/material/select';

import { BenchmarkFileUploadLayoutComponent } from '../../containers/benchmark-file-upload-layout/benchmark-file-upload-layout.component';

import * as fromModels from './../../models/trades.models';

@Component({
    selector: 'app-benchmark-trades-params',
    templateUrl: './benchmark-trades-params.component.html',
    styleUrls: ['./benchmark-trades-params.component.scss']
})
export class BenchmarkTradeParamsComponent implements OnInit {

    @Input() tradeDates: string[];
    @Input() selectedTradeDate: string;
    @Input() activeTab: string;

    @Output() tradeDateChanged: EventEmitter<string> = new EventEmitter<string>();
    @Output() fxTradesLoaded: EventEmitter<fromModels.IFXTrade[]> = new EventEmitter<fromModels.IFXTrade[]>();
    @Output() sendFxTrades: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(private dialog: MatDialog) {
        this.openFXFileUploadDialog = this.openFXFileUploadDialog.bind(this);
        this.openFuturesFileUploadDialog = this.openFuturesFileUploadDialog.bind(this);
    }

    ngOnInit(): void { }

    openFXFileUploadDialog() {
        const dialogRef = this.dialog.open(BenchmarkFileUploadLayoutComponent, {
            hasBackdrop: true,
            panelClass: 'event-analysis-pop-up-panel',
            width: '65rem',
            height: '40rem'
        });

        const sub = dialogRef.componentInstance.uploadSucceeded.subscribe((trades: fromModels.IFXTrade[]) => {
            this.fxTradesLoaded.emit(trades);
            dialogRef.close();
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (sub) {
                sub.unsubscribe();
            }
        });
    }

    openFuturesFileUploadDialog() {
        alert('Not implemented yet!');
    }

    changeTradeDate(event: MatSelectChange) {
        if (event.source.value) {
            this.tradeDateChanged.emit(event.source.value);
        }
    }

    onSendFxTrades() {
        this.sendFxTrades.emit(true);
    }
}
