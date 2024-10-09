import { Component } from '@angular/core';

@Component({
    selector: 'app-timeseries-favorite-cell-renderer',
    template: `<span *ngIf='isDataRow'  class="material-icons" style="font-size:20px;margin-top:5px;">delete_forever</span>`
})

export class TimeseriesDeleteCellRendererComponent {

    isDataRow: boolean = false;

    agInit(params: any): void {
        this.isDataRow = params.data.id === -1 || params.data.id === -2 ? false : true;
    }

}
