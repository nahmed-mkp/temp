import {Component} from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
    selector: 'app-pricing-engine-bval-renderer',
    styleUrls: ['./pricing-engine-bval-score-renderer.component.scss'],
    template: `<span [ngClass]="{'score--negative': score < 7}">{{value | number:'1.2-3'}}</span>&nbsp;&nbsp;<sup *ngIf="score" class="score" [ngClass]="{'score--negative': score < 7}">{{score | number:'1.0'}}</sup>`,
})
export class PricingEngineBVALRendererComponent implements ICellRendererAngularComp {

    public params: any;
    public value: number;
    public score: number;

    agInit(params: any): void {
        this.params = params;

        if (this.params.value)
            this.value = this.params.value

        if (this.params.score)
            this.score = this.params.score
    }

    refresh(): boolean {
        return false;
    }

}
