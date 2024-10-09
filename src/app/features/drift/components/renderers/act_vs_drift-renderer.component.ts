import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { UtilityService } from 'src/app/services';

@Component({
    selector: 'app-actualvsdrift-cell',
    styleUrls: ['./act_vs_drift-renderer.component.scss'],
    template: `
        <span [ngClass]="{'break': outsideThreshold, 'no-break': !outsideThreshold}">{{drift}}</span>&nbsp;&nbsp;<span style="color:gray;font-size:10px;font-style:italic">{{actual}} vs. {{ideal}}</span>
    `
})
export class ActualVsDriftRendererComponent implements ICellRendererAngularComp {

    public fund: string;
    public threshold: number;
    public type: string;
    public outsideThreshold: boolean;
    public actual: string;
    public ideal: string;
    public drift: string;

    constructor() {
    }

    agInit(params: any): void {
        this.fund = params.fund;
        this.type = params.type;
        if (params.context.componentParent !== null && params.context.componentParent.request !== null) {
            this.threshold = params.context.componentParent.request.threshold / 100.0;
        } else {
            this.threshold = 0.01;
        }
        this.setCellValues(params.data, this.fund, this.threshold, this.type);
    }

    refresh(params: any): boolean {
        this.fund = params.fund;
        this.type = params.type;
        if (params.context.componentParent !== null && params.context.componentParent.request !== null) {
            this.threshold = params.context.componentParent.request.threshold / 100.0;
        } else {
            this.threshold = 0.01;
        }
        this.setCellValues(params.data, this.fund, this.threshold, this.type);
        return true;
    }

    private setCellValues(data: any, fund: string, threshold: number, type: string) {
        if (type === 'Position') {
            const drift = data[`${fund}_Drift_Pct`];
            this.outsideThreshold = false;
            this.actual = data ? this.formatValue(data[`${fund}_Act_Pct`]) : null;
            this.ideal = data ? this.formatValue(data[`${fund}_Tgt_Pct`]) : null;
            this.drift = data ? this.formatValue(drift) : null;
            if (Math.abs(drift) > threshold) {
                this.outsideThreshold = true;
            }
        } else {
            const fundName = data['FundName'].replace(/ /g, '');
            const actual = data['AllocPct'] || 0.0;
            const target = data[`${fundName}_Tgt_Pct`] || 0.0;
            const drift = Math.abs(actual - target);
            this.actual = data ? this.formatValue(actual) : null;
            this.ideal = data ? this.formatValue(target) : null;
            this.drift = drift ? this.formatValue(drift) : null;
            if (Math.abs(drift) > threshold) {
                this.outsideThreshold = true;
            }
        }
    }

    private formatValue(val: number): string {
        val = val ? val : 0.0;
        return (val * 100).toFixed(2) + '%';
    }
}
