import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ICellEditorAngularComp } from 'ag-grid-angular';

@Component({
    selector: 'app-grid-cell-date-picker',
    templateUrl: './grid-cell-date-picker.component.html',
    styleUrls: ['./grid-cell-date-picker.component.scss']
})
export class GridCellDatePickerComponent implements ICellEditorAngularComp, AfterViewInit  {


    private params: any;
    public targetDate: Date;

    ngAfterViewInit() {
    }

    agInit(params: any): void {
        this.params = params;
        this.targetDate = new Date(this.params.value);
    }

    getValue() {
        const result = this.targetDate.toLocaleDateString('en-CA');
        return result;
    }

    isCancelBeforeStart() {
        return false;
    }

    isCancelAfterEnd() {
        // Check Valid Date
        return false;
    }

}
