import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
    selector: 'app-strategy-cell',
    template: `<span>{{strategy}}</span>`,
})
export class StrategyRendererComponent implements ICellRendererAngularComp {

    public params: any;
    public strategy: string;

    agInit(params: any): void {
        this.params = params;
        this.setStrategy(params);
    }

    refresh(params: any): boolean {
        this.params = params;
        this.setStrategy(params);
        return true;
    }

    private setStrategy(params) {
        this.strategy = params.data ? params.data.Strategy : null;
    }
}
