import {Component} from "@angular/core";
import {ICellRendererAngularComp} from "ag-grid-angular";

@Component({
    selector: 'child-cell',
    template: `<mat-checkbox [checked]="params.data[params.key]" (change)="onValueChange($event)"></mat-checkbox>`,
})
export class YieldbookCustomCheckboxComponent implements ICellRendererAngularComp {
    public params: any;
    public checked: boolean;
    public show: boolean;

    agInit(params: any): void {
        this.params = params;
        // this.params.data[params.key] = params.defaultValue;
        // console.log('params.data[params.key]', params.key, params.data);
        // this.checked = params.data[params.key] === 'True';
    }

    onValueChange(event) {
        this.params.data[this.params.key] = event.checked;
    }

    refresh(): boolean {
        return false;
    }
}