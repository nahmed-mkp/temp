import {Component} from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
    selector: 'app-custom-grid-cell-checkbox',
    template: `<mat-checkbox [checked]="value" [disabled]="disabled" (change)="onValueChange($event)"></mat-checkbox>`,
})
export class AppCustomGridCellCheckboxComponent implements ICellRendererAngularComp {

    public params: any;
    public checked: boolean;
    public disabled: boolean;
    public show: boolean;

    public value: boolean;

    agInit(params: any): void {
        this.params = params;
        if (this.params.key) { 
            this.value = params.data[this.params.key]
        } else { 
            this.value = params.getValue();
        }
        this.disabled = this.params.editable === false ? true : false;
    }

    onValueChange(event) {
        // this.params.data[this.params.key] = event.checked;

        // This is how we offically let the parent grid know that the cell value has changed
        // this will trigger associated cell value event
        // rather than change the value silently like above
        const checked = event.checked;
        const colId = this.params.key;
        if (this.params.key) { 
            this.params.node.setDataValue(colId, checked);
        } else { 
            this.params.setValue(checked);
            // this.params.setDataValue(checked);
        }
        
    }

    refresh(): boolean {
        return false;
    }

}
