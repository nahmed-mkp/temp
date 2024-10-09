import { Component, OnInit, HostBinding, Inject, OnDestroy } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import * as fromStore from './../../store';


@Component({
    selector: 'app-capitals-fund-editor-dialog',
    templateUrl: './capitals-fund-editor-dialog.component.html',
    styleUrls: ['./capitals-fund-editor-dialog.component.scss']
})
export class CapitalsFundEditorDialogComponent implements OnInit, OnDestroy {

    @HostBinding('class') class = 'vertical-flex-full-height';

    public asOfDate: string;
    public fundMapping: any;

    public oldCapital: number;
    public oldCapitalFormat: string;

    public newCapital: number;
    public newCapitalFormat: string;

    public capitalChange: number;
    public capitalChangeFormat: any = '';

    public oldLeverage: number;
    public newLeverage: number;
    public changeType: 'ChangeTo' | 'ChangeBy' = 'ChangeTo';

    private subscription: Subscription;


    constructor(
        public dialogRef: MatDialogRef<CapitalsFundEditorDialogComponent>,
        private store: Store<fromStore.AllocationsState>,
        @Inject(MAT_DIALOG_DATA) public data
    ) { }

    ngOnInit() {
        const targetField = this.data.params.colDef.field;
        this.oldCapital = this.data.rowData.targetFundData[targetField];
        this.asOfDate = this.data.asOfDate;        
        if (typeof this.data.rowData.targetFundData[targetField] === 'number') {
            this.oldCapitalFormat = this.oldCapital.toLocaleString('en-US', { maximumFractionDigits: 2});
            this.newCapitalFormat = this.oldCapital.toLocaleString('en-US', { maximumFractionDigits: 2 });
            this.newCapital = this.oldCapital;

            this.oldLeverage = this.data.rowData.targetLeverageData[targetField];
            this.newLeverage = this.oldLeverage;
        }

        this.subscription = this.store.select(fromStore.getFundMapping).subscribe(result => {
            this.fundMapping = result;
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    // Event ========================================================================
    public onClose() {
        this.dialogRef.close();
    }

    public onSave() {
        const payload = {
            guid: this.data.guid,
            asOfDate: this.asOfDate,
            // fundName: this.data.params.colDef.field,
            fundId: this.fundMapping[this.data.params.colDef.field],
            oldCapital: this.oldCapital,
            oldLeverage: this.oldLeverage,
            newLeverage: this.newLeverage,
            newCapital: this.newCapital,
            changeType: this.changeType,
            change: this.capitalChange
        };
        this.store.dispatch(new fromStore.UpdateFundCapital(payload));
        this.onClose();
    }

    public onValueChange(capitalChange) {
        if (this.changeType === 'ChangeTo') {
            this.newCapital = capitalChange;
        } else if (this.changeType === 'ChangeBy') {
            const capitalChangeResult = !isNaN(Number(capitalChange)) ? capitalChange : 0;
            this.newCapital = capitalChangeResult + this.oldCapital;
        }
        if (this.newCapital) {
            this.newCapitalFormat = this.newCapital.toLocaleString('en-US', { maximumFractionDigits: 2 });
        }
    }

    public onSelectionChanged(event) {
        this.onValueChange(this.capitalChange);
    }

    public onKeyup(event) {
        const sourceElement = event.srcElement;
        const inputValue = sourceElement.value;
        const inputValue_remove_comma = inputValue.split(',').join('');

        if (event.key === 'Backspace' || !isNaN(event.key) || event.key === "-") {
            if(event.key !== "-"){
                if(! (inputValue_remove_comma === "-")){
                    this.capitalChange = inputValue_remove_comma !== '' ? parseFloat(inputValue_remove_comma) : 0;
                    this.capitalChangeFormat = this.capitalChange.toLocaleString('en-US', { maximumFractionDigits: 2 });
                    this.onValueChange(this.capitalChange);
                }
            }
        } else {
            const temp = this.capitalChangeFormat;
            this.capitalChangeFormat = undefined;
            setTimeout(() => {
                this.capitalChangeFormat = temp;
            }, 10);
           
        }

        // if (event.key === 'Backspace') {
        //     this.capitalChange = inputValue_remove_comma !== '' ? parseFloat(inputValue_remove_comma) : 0;
        //     this.capitalChangeFormat = this.capitalChange.toLocaleString('en-US', { maximumFractionDigits: 2 });

        //     // this.capitalChange = Math.floor(this.capitalChange / 10);
        //     // this.capitalChangeFormat = this.capitalChangeFormat.split(',').join('');
        //     // this.capitalChangeFormat = this.capitalChangeFormat.substring(0, this.capitalChangeFormat.length - 1);
        //     // this.capitalChangeFormat = parseFloat(this.capitalChangeFormat);
        //     // this.capitalChangeFormat = this.capitalChangeFormat.toLocaleString('en-US', { maximumFractionDigits: 2 });

        //     this.onValueChange(this.capitalChange);
        // } else {
        //     const enterValue = parseFloat(event.key);
        //     if (!isNaN(enterValue)) {
        //         this.capitalChangeFormat = this.capitalChangeFormat.split(',').join('');
        //         this.capitalChangeFormat += enterValue;

        //         this.capitalChange = parseFloat(this.capitalChangeFormat);
        //         this.capitalChangeFormat = this.capitalChange.toLocaleString('en-US', { maximumFractionDigits: 2 });
        //         this.onValueChange(this.capitalChange);
        //     }
        // }

    }

}
