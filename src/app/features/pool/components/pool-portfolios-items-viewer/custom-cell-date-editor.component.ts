import {Component, HostBinding} from '@angular/core';
import { ICellEditorAngularComp } from 'ag-grid-angular';

@Component({
    selector: 'custom-cell-date-editor',
    template: `
        <mat-form-field>
            <input matInput [matDatepicker]="picker" [(ngModel)]="displayValue">
            <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
            <mat-datepicker #picker></mat-datepicker>
        </mat-form-field>
    `,
})
export class CutsomCellDateEditorComponent implements ICellEditorAngularComp {

    @HostBinding('style.width') private width = '100%';

    private params: any;
    public value: any;
    public displayValue: Date;

    agInit(params: any): void {
        this.params = params;
        this.value = this.params.value;
        this.displayValue = this.value ? new Date(this.value) : undefined;
    }

    getValue(): any {
        this.value = this.displayValue ? this.displayValue.toLocaleDateString() : undefined;
        return this.value;
    }
}
