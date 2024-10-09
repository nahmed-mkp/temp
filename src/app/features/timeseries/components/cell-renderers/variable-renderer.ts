import { Component } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { IAfterGuiAttachedParams, ICellRendererParams, SelectionChangedEvent } from 'ag-grid-community';
import * as fromStore from '../../store';
import { Store } from '@ngrx/store';
import * as fromModels from '../../models';
import { isString } from 'highcharts';

@Component({
    selector: 'app-timeseries-variable-cell-renderer',
    template: `
                <div>
                    <div *ngIf="showBadge" matBadge="x" matBadgeOverlap="false">{{params.value}}</div>
                    <div *ngIf="!showBadge" >{{params.value}} </div>
                </div>
                `
})

export class TimeseriesVariableCellRendererComponent {

    constructor(private store: Store<fromStore.TimeseriesState>){}

    params!: any
    showBadge: boolean = false;


    agInit(params: any): void {
        this.params = params;
        if(params.chartData && params.chartData.length > 0 && params.data.label !== undefined){
            let chartRow = params.chartData[0];
            let label = params.data.label;
            if(isString(chartRow[label]) && chartRow[label].includes('invalid')){
                this.showBadge = true;
            }
        }
    }

}
