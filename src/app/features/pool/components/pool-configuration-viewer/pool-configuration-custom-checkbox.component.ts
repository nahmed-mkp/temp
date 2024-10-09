import {Component} from "@angular/core";
import {ICellRendererAngularComp} from "ag-grid-angular";

@Component({
    selector: 'child-cell',
    template: `<mat-checkbox *ngIf="show" [checked]="checked" (click)="invokeParentMethod()"></mat-checkbox>`,
})
export class PoolConfigurationCustomCheckboxComponent implements ICellRendererAngularComp {
    public params: any;
    public checked: boolean;
    public show: boolean;

    agInit(params: any): void {
        this.params = params;
        this.show = params.data.type === 'Boolean';
        this.checked = params.data.value === 'True';
    }

    public invokeParentMethod() {
        this.params.context.componentParent.toggleValue(this.params.node);
    }

    refresh(): boolean {
        return false;
    }
}