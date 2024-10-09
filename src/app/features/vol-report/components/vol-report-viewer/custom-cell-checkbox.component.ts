import {Component} from "@angular/core";
import {ICellRendererAngularComp} from "ag-grid-angular";

@Component({
    selector: 'child-cell',
    template: `
        <span *ngIf="proportionBarMode" class="cell-percent-bar" [ngStyle]="{'width': barWidth }" [ngClass]="{'cell-percent-bar-animation': animationMode}"></span>
        <mat-checkbox [checked]="checked" (click)="invokeParentMethod()">{{value}}</mat-checkbox>`,
})
export class CustomCheckboxComponent implements ICellRendererAngularComp {
    public value: any;
    public checked: boolean;
    public params: any;
    private targetColumn: string;

    public proportionBarMode: boolean = false;
    public barWidth: string;
    public animationMode: boolean;

    agInit(params): void {
        this.params = params;
        this.targetColumn = this.params.column.colId + 'checked';
        this.checked = this.params.data[this.targetColumn]
        this.value = this.params.value;
        const fieldName = params.colDef.field
        const targetMaxValue = params.context.componentParent[fieldName + '_max'];
        
        if(params.proportion && targetMaxValue !== 0) {
            this.proportionBarMode = true;
            this.barWidth = this.value/targetMaxValue * 100 + '%'
            this.animationMode = params.context.componentParent.animationMode;
        }
    }

    refresh(): boolean {
        return false;
    }

    public invokeParentMethod() {
        if(this.checked===undefined || this.checked === false) this.params.data[this.targetColumn] = true
        else  this.params.data[this.targetColumn] = false;
    }
}