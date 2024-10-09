import { Component, OnInit } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { IAfterGuiAttachedParams } from 'ag-grid-community';
import { PPMProjectionsComponent } from './ppmprojections.component';

import { IBond, } from '../../../../models/renderer.models';

@Component({
    template: `<button mat-raised-button (click)="showOASPaths()">...</button>`
})
export class PPMProjectionsRendererComponent implements ICellRendererAngularComp {

    public params: any;
    public bond: IBond[] = [];
    public ppmProjections: any[] = [];

    constructor(private dialog: MatDialog) { }

    refresh(params: any): boolean {
        return true;
    }

    afterGuiAttached?(params?: IAfterGuiAttachedParams): void {
    }

    agInit(params: any): void {
        this.params = params;
        this.bond = params.bond || null;
        this.ppmProjections = params.ppmProjections || [];
    }

    showOASPaths(): void {
        this.dialog.open(PPMProjectionsComponent, {
            panelClass: ['event-analysis-pop-up-panel', 'tool-bar-border-radius'],
            hasBackdrop: true,
            data: { 'ppmProjections': this.ppmProjections, 'bond': this.bond },
            width: '70rem',
            height: '50rem'
        });
    }
}
