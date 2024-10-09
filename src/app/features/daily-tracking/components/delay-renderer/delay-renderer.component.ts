import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

import * as moment from 'moment';
import { DailyTrackingUtilityService } from '../../services';

@Component({
    selector: 'app-tracking-delay',
    styleUrls: ['./delay-renderer.component.scss'],
    template: `<span class="pointer" [title]="getLastUpdateString()">{{name}}</span>&nbsp;&nbsp;
        <a class="material-icons" [ngClass]="{'md-10': utilityService.isCompactMode(), 'md-12': !utilityService.isCompactMode()}" *ngIf="isDelayed()" [title]="getLastUpdateString()">schedule</a>
    `,
})
export class DelayRendererComponent implements ICellRendererAngularComp {

    public name: string;
    public params: ICellRendererParams;

    public DELAY_CUTOFF = 120;

    constructor(public utilityService: DailyTrackingUtilityService) {
    }

    agInit(params: ICellRendererParams): void {
        this.name = params.valueFormatted;
        this.params = params;
    }

    isDelayed(): boolean {
        const now = new Date().valueOf();
        const lastUpdate = this.getLastUpdateValue();
        const diffSecs = Math.abs((now - lastUpdate)) / 1000.0;
        if (diffSecs > this.DELAY_CUTOFF) {
            return true;
        }
        return false;
    }

    getLastUpdateString(): string {
        if (this.params.data['last_update']) {
            return new Date(this.params.data['last_update'].replace(' ', 'T')).toLocaleTimeString();
        }
        return null;
    }

    getLastUpdateValue(): number {
        if (this.params.data['last_update']) {
            return new Date(this.params.data['last_update'].replace(' ', 'T')).valueOf();
        }
    }

    refresh(params: ICellRendererParams): boolean {
        return false;
    }

}
