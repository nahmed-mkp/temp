import { Component, OnInit } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { IAfterGuiAttachedParams } from 'ag-grid-community';
import { GeographiesComponent } from './geographies.component';

import { IBond, IStateDistribution } from './../../../../models/renderer.models';

@Component({
    template: `<button mat-raised-button (click)="showStateDistribution()">...</button>`
})
export class GeographiesRendererComponent implements ICellRendererAngularComp {

    public params: any;
    public bond: IBond[] = [];
    public geographies: IStateDistribution[] = [];

    constructor(private dialog: MatDialog) { }

    refresh(params: any): boolean {
        return true;
    }

    afterGuiAttached?(params?: IAfterGuiAttachedParams): void {
    }

    agInit(params: any): void {
        this.params = params;
        this.bond = params.bond || null;
        this.geographies = params.geographies || [];
    }

    showStateDistribution(): void {
        this.dialog.open(GeographiesComponent, {
            panelClass: ['event-analysis-pop-up-panel', 'tool-bar-border-radius'],
            hasBackdrop: true,
            data: { 'geographies': this.geographies, 'bond': this.bond },
            width: '50rem',
            height: '50rem'
        });
    }
}
