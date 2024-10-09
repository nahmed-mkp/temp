import { Component, OnInit, HostBinding } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

import * as fromModels from './../../models/rate-card.model';

@Component({
    selector: 'app-rate-card-cell-renderer',
    templateUrl: './rate-card-cell-renderer.component.html',
    styleUrls: ['./rate-card-cell-renderer.component.html']
})
export class RateCardCellRendererComponent implements ICellRendererAngularComp {

    public params: any;
    public editable: boolean = false;
    public value: number;
    public override: number;
    public position: number;
    public hasOverride: boolean = false;
    public isDecimal: boolean = false;
    public isPercent: boolean = false;

    agInit(params: any): void {
        this.params = params;
        this.editable = params.editable;
        this.value = params.val;
        this.position = params.position;
        this.override = params.override
        this.hasOverride = this.override !== null && this.override !== undefined;
        params.isPercent ? this.isPercent = params.isPercent : this.isPercent = false;
        params.isDecimal ? this.isDecimal = params.isDecimal : this.isDecimal = false;
    }

    refresh(): boolean {
        return false;
    }

    onChanged() {
        this.params.onSave(this.params.node);
    }

    generateValue(){
        if(this.isPercent){
            return this.value ?  this.value.toFixed(3) + '%' : '';
        }
        if(this.isDecimal){
            return this.value ?  (this.value * 100).toFixed(3) + '%' : '';
        }
    }
}
