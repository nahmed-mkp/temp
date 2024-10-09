import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
    selector: 'app-tradename-cell',
    styleUrls: ['./tradename-renderer.component.scss'],
    template: `<span [ngClass]="{'fxHedged': IsFxHedged, 'notFxHedged': !IsFxHedged}">[FX]</span>{{TradeName}}`
})
export class TradenameRendererComponent implements ICellRendererAngularComp {

    public TradeName: string;
    public IsFxHedged: boolean;

    constructor() {
    }

    agInit(params: any): void {
        this.TradeName = params.data[`TradeName`];
        this.IsFxHedged = params.data[`IsFxHedged`];
    }

    refresh(params: any): boolean {
        this.TradeName = params.data[`TradeName`];
        this.IsFxHedged = params.data[`IsFxHedged`];
        return true;
    }
}
