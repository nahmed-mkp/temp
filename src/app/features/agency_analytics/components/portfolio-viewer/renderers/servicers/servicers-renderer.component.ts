import { Component, OnInit } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { IAfterGuiAttachedParams } from 'ag-grid-community';

import { ServicersChartComponent } from './servicers-chart.component';

import { IBond, IServicer } from './../../../../models/renderer.models';

@Component({
    template: `<button mat-raised-button (click)="showServicers()">...</button>`
})
export class ServicersRendererComponent implements ICellRendererAngularComp {

    public params: any;
    public bond: IBond[] = [];
    public servicers: IServicer[] = [];

    constructor(private dialog: MatDialog) { }

    refresh(params: any): boolean {
       return true;
    }
    
    afterGuiAttached?(params?: IAfterGuiAttachedParams): void {
    }

    agInit(params: any): void {
        this.params = params;
        const servicers = params.servicers || [];
        this.bond = params.bond || null;
        this.servicers = [...servicers];
    }

    showServicers(): void {
        this.dialog.open(ServicersChartComponent, {
            panelClass: ['event-analysis-pop-up-panel', 'tool-bar-border-radius'],
            hasBackdrop: true,
            data: {'servicers': this.servicers, 'bond': this.bond },
            width: '50rem',
            height: '50rem'
        });
    }
}
