import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
    selector: 'app-crosspod-matrix-cell',
    template: `
        <span *ngIf="!showPct">{{formattedValue}}</span>
        <span *ngIf="showPct">{{pctOfFund}}</span>
    `,
})
export class CrossPodMatrixCellRendererComponent implements ICellRendererAngularComp {

    public params: any;
    public formattedValue: string;
    public pctOfFund: number;
    public showPct: boolean;

    agInit(params: any): void {
        this.params = params;        
        this.setPodPercentage(params);
    }

    refresh(params: any): boolean {
        this.params = params;
        this.setPodPercentage(params);
        return true;
    }

    private setPodPercentage(params) {
        const fundComplex = params.complex;
        const fund = params.fund;  
        this.showPct = params.showPct;
        let fundTotal = 0.0;        
        params.api.forEachNode((node) => {
            const crossPodName = node.data['CrossPodName'];
            if (crossPodName !== fundComplex && !this.isPctColumn(crossPodName)) {
                // console.log(node.data['CrossPodName']);
                fundTotal += node.data[fund];
            }            
        });
        if (fundTotal !== 0) { 
            this.pctOfFund = (params.value / fundTotal) * 100.0;
        } else {
            this.pctOfFund = 0.0;
        }
        this.formattedValue = params.valueFormatted;
    }

    private isPctColumn(crossPodName: string): boolean {
        return crossPodName.endsWith('(%)');
    }
}
