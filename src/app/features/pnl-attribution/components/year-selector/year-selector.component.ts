import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
    selector: 'app-year-selector',
    templateUrl: './year-selector.component.html',
    styleUrls: ['./year-selector.component.scss']
})
export class YearSelectorComponent implements OnInit {

    constructor(private _bottomSheetRef: MatBottomSheetRef<YearSelectorComponent>) { }

    ngOnInit(): void { }

    public onYearSelected(year: number): void {
        this._bottomSheetRef.dismiss(year);
    }

    public getYears(): number[] {
        const result = [];
        const startYear = 2010;
        let curYear = new Date().getUTCFullYear();
        while (curYear >= startYear) {
            result.push(curYear);
            curYear -= 1;
        }
        return result;
    }
}
