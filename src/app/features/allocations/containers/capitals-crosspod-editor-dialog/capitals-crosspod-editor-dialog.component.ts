import { Component, OnInit, HostBinding, Inject, OnDestroy } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { Store } from '@ngrx/store';

import * as fromStore from './../../store';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-capitals-crosspod-editor-dialog',
    templateUrl: './capitals-crosspod-editor-dialog.component.html',
    styleUrls: ['./capitals-crosspod-editor-dialog.component.scss']
})
export class CapitalsCrosspodEditorDialogComponent implements OnInit, OnDestroy {

    @HostBinding('class') class = 'vertical-flex-full-height';

    public crossPodMapping: any;

    public currentLevel: number;
    public currentLevelFormatted: string;

    public newLevel: number;
    public newLevelFormatted: string;

    public changeAmount: number;
    public changeAmountFormat: any = '';
    public changeType: 'ChangeTo' | 'ChangeBy' = 'ChangeTo';

    private subscription: Subscription;

    constructor(
        public dialogRef: MatDialogRef<CapitalsCrosspodEditorDialogComponent>,
        private store: Store<fromStore.AllocationsState>,
        @Inject(MAT_DIALOG_DATA) public data
    ) { }

    ngOnInit() {
        this.currentLevel = this.data.rowData['Total'];
        if (typeof this.data.rowData['Total'] === 'number') {
            this.currentLevel = this.data.rowData['Total'];
            this.currentLevelFormatted = this.data.rowData['Total'].toLocaleString('en-US', { maximumFractionDigits: 2});
            this.newLevel = this.currentLevel;
            this.newLevelFormatted = this.currentLevelFormatted;
        }

        this.subscription = this.store.select(fromStore.getCrossPodMapping).subscribe(result => {
            this.crossPodMapping = result;
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }


    // Event========================================================================

    public onClose() {
        this.dialogRef.close();
    }

    public onSave() {
        this.store.dispatch(new fromStore.UpdateCrosspodCapital({
            guid: this.data.guid,
            // crossPodName: this.data.rowData['CrossPodName'],
            crossPodID: this.crossPodMapping[this.data.rowData['CrossPodName']],
            oldOverage: this.data.rowData['Overage'],
            oldCapital:  this.data.rowData['Total'],
            changeType: this.changeType,
            newCapital: this.newLevel,
            change: this.changeAmount
        }));
        this.onClose();
    }

    public onValueChange(changeAmount) {
        if (this.changeType === 'ChangeTo') {
            this.newLevel = changeAmount;
        } else if (this.changeType === 'ChangeBy') {
            const changeBy = !isNaN(Number(this.data.rowData['Total'])) ? this.data.rowData['Total'] : 0;
            this.newLevel = this.changeAmount + changeBy;
        }
        this.newLevelFormatted = this.newLevel.toLocaleString('en-US', { maximumFractionDigits: 2 });
    }

    public onSelectionChanged(event) {
        this.onValueChange(this.changeAmount);
    }

    public onKeyup(event) {
        const sourceElement = event.srcElement;
        const inputValue = sourceElement.value;
        const inputValue_remove_comma = inputValue.split(',').join('');

        if (event.key === 'Backspace' || !isNaN(event.key) || event.key === "-") {
            if(event.key !== "-"){
                this.changeAmount = inputValue_remove_comma !== '' ? parseFloat(inputValue_remove_comma) : 0;
                this.changeAmountFormat = this.changeAmount.toLocaleString('en-US', { maximumFractionDigits: 2 });
                this.onValueChange(this.changeAmount);
            }
        } else {
            const temp = this.changeAmountFormat;
            this.changeAmountFormat = undefined;
            setTimeout(() => {
                this.changeAmountFormat = temp;
            }, 10);
           
        }

    }



}
