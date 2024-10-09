import { AfterViewInit, Component, OnDestroy } from '@angular/core';

import { ICellRendererAngularComp } from 'ag-grid-angular';
import { IAfterGuiAttachedParams } from 'ag-grid-community';

@Component({
    selector: 'app-checkbox-renderer',
    template: `
    <span *ngIf="!editable">
        <i class="material-icons" style="font-size:14px;color:#555555" *ngIf="value">done</i>
    </span>
    <span *ngIf="editable">
        <input type="checkbox" [checked]="value" (change)="onChange($event)">
    </span>
`,
})
export class CheckboxCellRendererComponent implements ICellRendererAngularComp {

    private params: any;
    public value: boolean;
    public disabled: boolean;
    public editable: boolean;

    agInit(params: any): void {
        this.params = params;
        this.value = params.value;
        this.disabled = params.disabled || false;
        this.editable = params.editable || false;
    }

    checkedHandler(event) {
        this.value = event.target.checked;
        const colId = this.params.column.colId;
        this.params.node.setDataValue(colId, this.value);
    }

    refresh(params: any): boolean {
        this.params = params;
        this.value = params.value;
        this.disabled = params.disabled || false;
        this.editable = params.editable || false;
        return true;
    }

    getValue(): boolean {
        return this.value;
    }

    public onChange(e): void {
        this.params.data[this.params.colDef.field] = e.currentTarget.checked ? true : false;
    }
}
