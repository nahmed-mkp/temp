import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { UtilityService } from 'src/app/services';

@Component({
    selector: 'app-rcpm-monthly-pnl-cell',
    styleUrls: ['./rcpm-monthly-pnl-cell.component.scss'],
    template: `{{FormattedValue}}`
})
export class RCPMMonthlyPnLCellComponent implements ICellRendererAngularComp {

    public ColType: string;
    public Value: any;
    public FormattedValue: string;

    constructor() {
    }

    agInit(params: any): void {
        this.ColType = params.data.ColType;
        this.Value = params.value;
        if (this.ColType === 'Capital') {
            if (this.Value) {
                if (this.Value.length === 1) {
                    this.FormattedValue = Math.round(this.Value[0]).toLocaleString();
                } else {
                    this.FormattedValue = 'MULTI';
                }
            } else {
                this.FormattedValue = null;
            }
        } else if (this.ColType === 'PctReturn') {
            this.FormattedValue = params.value ? params.value.toFixed(2) + '%' : null;
        } else {
            this.FormattedValue = params.valueFormatted;
        }
    }

    refresh(params: any): boolean {
        this.ColType = params.data.ColType;
        this.Value = params.value;
        if (this.ColType === 'Capital') {
            if (this.Value.length === 1) {
                this.FormattedValue = Math.round(this.Value[0]).toLocaleString();
            } else {
                this.FormattedValue = 'MULTI';
            }
        } else if (this.ColType === 'PctReturn' || this.ColType === 'HitRatio') {
            this.FormattedValue = params.value.toFixed(2) + '%';
        } else {
            this.FormattedValue = params.valueFormatted;
        }
        return true;
    }

    private formatValue(val: number): string {
        if (val !== undefined) {
            return val.toFixed(0);
        }
        return null;
    }
}
