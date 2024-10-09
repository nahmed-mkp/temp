import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA,  MatLegacyDialogRef as MatDialogRef} from '@angular/material/legacy-dialog';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store';


@Component({
    selector: 'app-pricing-engine-popup',
    templateUrl: './value-retention-popup.component.html',
    styleUrls: ['./value-retention-popup.component.scss']
})
export class PricingEnginePopupViewerComponent {

    @Output() uploadSucceeded: EventEmitter<any> = new EventEmitter<any>();

    public pricingData: any;

    constructor(@Inject(MAT_DIALOG_DATA) public data,
        public dialogRef: MatDialogRef<PricingEnginePopupViewerComponent>,
        private store: Store<fromStore.PricingEngineState>) { }

    onClose() {
        this.dialogRef.close();
    }

    public handlePopupCheck(e: any){
        this.pricingData.payload['carryClose'] = e.checked ? true : false;
    }

    public handlePopupBtnClick(e: any){
        this.store.dispatch(this.pricingData.action);
        this.dialogRef.close()
    }
}
