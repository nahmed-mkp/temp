
import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { UntypedFormBuilder, Validators } from '@angular/forms';


@Component({
    selector: 'app-median-hourly-param-sheet',
    templateUrl: 'median-hourly-chart-param-sheet.component.html',
})
export class MedianHourlyParamSheetComponent implements OnInit, OnDestroy {

    public inputForm = this.fb.group({
        selectedTickers: [[], Validators.required],
        selectedSlots: [[], Validators.required],
        selectedMetric: ['', Validators.required]
    });

    constructor(private fb: UntypedFormBuilder, private bottomSheetRef: MatBottomSheetRef<MedianHourlyParamSheetComponent>,
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
