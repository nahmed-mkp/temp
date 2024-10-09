import { Component } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { IAfterGuiAttachedParams, ICellRendererParams, SelectionChangedEvent } from 'ag-grid-community';
import * as fromStore from '../../store';
import { Store } from '@ngrx/store';
import * as fromModels from '../../models';

@Component({
    selector: 'app-timeseries-axis-cell-renderer',
    template: `
                <mat-form-field *ngIf='isDataRow' appearance="outline" style="width: 160px;margin-top:10px; margin-left:-4px;">
                    <div class="mat-form-field-content-wrap" style="margin-top:5px">
                        <mat-select (selectionChange)="handleAxisChanged($event)" [(value)]="params.data.axis">
                            <mat-option [value]="'auto'">Auto</mat-option>
                            <mat-option [value]="'left'">Left</mat-option>
                            <mat-option [value]="'right'">Right</mat-option>
                        </mat-select>  
                    </div>          
                </mat-form-field>
                `
})

export class TimeseriesAxisCellRendererComponent {

    constructor(private store: Store<fromStore.TimeseriesState>){}

    params!: any
    isDataRow: boolean = false;


    agInit(params: any): void {
        this.isDataRow = params.data.id === -2 ? false : true;
        this.params = params;
    }

    handleAxisChanged(event: MatSelectChange){
        let timeseriesId = this.params.node.data.timeseriesId;
        let val = event.value;
        timeseriesId ? this.params.axisHandler(timeseriesId, val) : this.params.derivedAxisHandler(this.params.node.data.variable, val);
    }

}
