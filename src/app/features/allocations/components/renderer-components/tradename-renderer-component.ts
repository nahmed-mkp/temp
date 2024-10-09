import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
    selector: 'app-tradename-cell',
    template: `<span>{{tradename}}</span>`,
})
export class TradenameRendererComponent implements ICellRendererAngularComp {

    public params: any;
    public tradename: string;

    agInit(params: any): void {
        this.params = params;
        this.setTradename(params);
    }

    refresh(params: any): boolean {
        this.params = params;
        this.setTradename(params);
        return true;
    }

    private setTradename(params) {
        this.tradename = params.data ? params.data.tradeName : null;
    }
}
