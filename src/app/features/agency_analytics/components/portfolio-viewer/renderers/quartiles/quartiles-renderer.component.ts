import { Component, OnInit } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { IAfterGuiAttachedParams } from 'ag-grid-community';
import { QuartilesComponent } from './quartiles.component';

import { IBond, IQuartile } from '../../../../models/renderer.models';

@Component({
    template: `<button mat-raised-button (click)="showQuartiles()">...</button>`
})
export class QuartilesRendererComponent implements ICellRendererAngularComp {

    public params: any;
    public bond: IBond[] = [];
    public quartiles: IQuartile[] = [];

    constructor(private dialog: MatDialog) { }

    refresh(params: any): boolean {
       return true;
    }
    
    afterGuiAttached?(params?: IAfterGuiAttachedParams): void {
    }

    agInit(params: any): void {
        this.params = params;
        this.bond = params.bond || null;
        this.quartiles = params.quartiles || [];
    }

    showQuartiles(): void {
        this.dialog.open(QuartilesComponent, {
            panelClass: ['event-analysis-pop-up-panel', 'tool-bar-border-radius'],
            hasBackdrop: true,
            data: { 'quartiles': this.quartiles.map((quartile, indx) => {
                return Object.assign({}, quartile, {id: indx})
            }), 'bond': this.bond },
            width: '80rem',
            height: '30rem'
        });
    }
}
