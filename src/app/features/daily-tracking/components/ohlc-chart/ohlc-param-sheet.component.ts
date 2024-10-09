
import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { UntypedFormBuilder, Validators } from '@angular/forms';


@Component({
    selector: 'app-ohlc-param-sheet',
    templateUrl: 'ohlc-param-sheet.component.html',
})
export class OHLCParamSheetComponent implements OnInit, OnDestroy {

    public inputForm = this.fb.group({
        selectedTicker: ['', Validators.required],
        selectedMetric: ['', Validators.required]
    });

    constructor(private fb: UntypedFormBuilder, private bottomSheetRef: MatBottomSheetRef<OHLCParamSheetComponent>,
        @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) { }

    ngOnInit() {
    }

    ngOnDestroy(): void {
    }

    applyParams(event: MouseEvent): void {
        event.preventDefault();
        this.bottomSheetRef.dismiss(this.inputForm.value);
    }

    cancel(event: MouseEvent): void {
        event.preventDefault();
        this.bottomSheetRef.dismiss(null);
    }
}
