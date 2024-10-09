import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { IAfterGuiAttachedParams, ICellRendererParams, SelectionChangedEvent } from 'ag-grid-community';
import * as fromStore from '../../store';
import { Store } from '@ngrx/store';
import * as fromModels from '../../models';

@Component({
    selector: 'app-timeseries-regression-cell-renderer',
    template: `
                   <mat-form-field *ngIf='isDataRow' appearance="outline" style="width: 250px ;margin-top:10px;border:1px solid black;margin-left:-4px">
                        <div class="mat-form-field-content-wrap" style="margin-top:5px">
                            <mat-select (selectionChange)="handleRegressionAttribuateChangedChanged($event)" [(value)]="params.data.regression">
                                <mat-option [value]=null></mat-option>
                                <mat-option [value]="'y'">y</mat-option>
                                <mat-option *ngFor="let ts of this.tsArr" [value]="ts.value">{{ts.text}}</mat-option>
                            </mat-select>  
                        </div>          
                    </mat-form-field>
                `
})

export class TimeseriesRegressionCellRendererComponent {

    public tsArr = [];

    constructor(private store: Store<fromStore.TimeseriesState>){}

    params!: any
    isDataRow: boolean = false;

    agInit(params: any): void {
        this.params = params;
        this.isDataRow = params.data.id === -2 ? false : true;
        let temp = params.api.getRenderedNodes();
        temp.pop()
        temp.map( (ts,idx) => {
            this.tsArr.push({
                value: `x${idx + 1}`,
                text:  `x${idx + 1}`
            })
        })
    }

    handleRegressionAttribuateChangedChanged(event: MatSelectChange){
        if(this.params.node.data.expression){
            let variable = this.params.node.data.variable;
            let val = event.value;
            this.params.derivedTimeseriesRegressionHandler(variable, val)
        } 
        else {
            let timeseriesId = this.params.node.data.timeseriesId;
            let val = event.value;
            this.params.regressionHandler(timeseriesId, val)
        }
    }

}
